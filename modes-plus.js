// =========================================================================
// ERWEITERUNG II: WAHRE GRÖSSE (TRUE SIZE), WELT-ATLAS & WEB-AUDIO-SOUNDS
// Einbinden nach modes-extra.js: <script src="modes-plus.js"></script>
// =========================================================================

// -------------------------------------------------------------------------
// 1. WEB-AUDIO-SOUND-ENGINE & SONAR-PING (OHNE EXTERNE MP3s)
// -------------------------------------------------------------------------
let soundMuted = localStorage.getItem("brainpulse_sound_muted") === "true";
let audioCtx = null;

function getAudioContext() {
  if (soundMuted) return null;
  if (!audioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (Ctx) audioCtx = new Ctx();
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playTone(freq, duration = 0.14, type = "sine", gainVal = 0.12, delay = 0) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  gain.gain.setValueAtTime(gainVal, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + duration);
}

function playSuccessSound(currentStreak = 1) {
  const step = Math.min(8, Math.max(0, currentStreak - 1));
  const base = 440 * Math.pow(1.06, step);
  playTone(base, 0.12, "triangle", 0.14, 0);
  playTone(base * 1.25, 0.18, "triangle", 0.14, 0.08);
}

function playErrorSound() {
  playTone(210, 0.16, "sawtooth", 0.09, 0);
  playTone(165, 0.24, "sawtooth", 0.09, 0.11);
}

function playBuzzerSound() {
  playTone(580, 0.09, "square", 0.11, 0);
  playTone(880, 0.18, "square", 0.11, 0.06);
}

function playRadarSonarPing(distKm) {
  // Je näher (0 km -> 980 Hz), desto höher der Sonar-Ton (8000 km -> 240 Hz)
  const clamped = Math.max(0, Math.min(8000, distKm));
  const ratio = 1 - clamped / 8000;
  const freq = Math.round(240 + ratio * 740);
  playTone(freq, 0.22, "sine", 0.16, 0);
  playTone(freq * 1.5, 0.28, "sine", 0.07, 0.06);
}

function injectPlusStyles() {
  if (document.getElementById("brainpulse-plus-styles")) return;
  const style = document.createElement("style");
  style.id = "brainpulse-plus-styles";
  style.textContent = `
    .sound-toggle-btn {
      background: #1e293b;
      border: 1px solid #334155;
      color: #f8fafc;
      border-radius: 999px;
      padding: 5px 11px;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      margin-right: 8px;
      transition: all 0.15s ease;
    }
    .sound-toggle-btn:hover {
      border-color: #38bdf8;
    }
    .truesize-stage {
      background: radial-gradient(circle at center, #1e293b 0%, #0f172a 100%);
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 14px;
      margin: 12px auto 16px;
      max-width: 520px;
      text-align: center;
    }
    .truesize-legend {
      display: flex;
      justify-content: center;
      gap: 16px;
      flex-wrap: wrap;
      font-size: 0.85rem;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .atlas-explorer-card {
      background: #1e293b;
      border: 1.5px solid #334155;
      border-radius: 16px;
      padding: 16px;
      margin-top: 12px;
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 14px;
      align-items: center;
    }
    @media (max-width: 560px) {
      .atlas-explorer-card {
        grid-template-columns: 1fr;
        text-align: center;
      }
    }
    .atlas-explorer-flag {
      width: 112px;
      height: 74px;
      object-fit: cover;
      border-radius: 8px;
      border: 1px solid #475569;
      margin: 0 auto;
    }
    .atlas-status-pill {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 999px;
      font-size: 0.76rem;
      font-weight: 800;
    }
    .atlas-neighbors-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }
    .atlas-neighbor-chip {
      background: #0f172a;
      border: 1px solid #334155;
      color: #cbd5e1;
      border-radius: 999px;
      padding: 3px 10px;
      font-size: 0.76rem;
      cursor: pointer;
    }
    .atlas-neighbor-chip:hover {
      border-color: #38bdf8;
      color: #38bdf8;
    }
  `;
  document.head.appendChild(style);
}

function renderSoundButton() {
  injectPlusStyles();
  const btnEn = document.getElementById("btn-en");
  if (!btnEn || !btnEn.parentElement) return;

  let sBtn = document.getElementById("btn-sound-toggle");
  if (!sBtn) {
    sBtn = document.createElement("button");
    sBtn.id = "btn-sound-toggle";
    sBtn.className = "sound-toggle-btn";
    btnEn.parentElement.insertBefore(sBtn, btnEn);
  }
  sBtn.textContent = soundMuted ? "🔇" : "🔊";
  sBtn.title = currentLang === "de"
    ? (soundMuted ? "Ton einschalten" : "Ton ausschalten")
    : (soundMuted ? "Unmute sound" : "Mute sound");
  sBtn.onclick = () => {
    soundMuted = !soundMuted;
    localStorage.setItem("brainpulse_sound_muted", String(soundMuted));
    renderSoundButton();
    if (!soundMuted) playTone(660, 0.12, "sine", 0.12);
  };
}

// -------------------------------------------------------------------------
// 2. NEUE MODI IN NAVIGATION & ÜBERSETZUNGEN EINTRAGEN
// -------------------------------------------------------------------------
const triviaGrp = MODE_GROUPS.find(g => g.id === "trivia");
if (triviaGrp && !triviaGrp.modes.includes("truesize")) {
  triviaGrp.modes.push("truesize");
}
const globeGrp = MODE_GROUPS.find(g => g.id === "globe");
if (globeGrp && !globeGrp.modes.includes("explorer")) {
  globeGrp.modes.push("explorer");
}

Object.assign(UI_STRINGS.en.tabs, {
  truesize: "📐 True Size Overlay",
  explorer: "🧭 Free World Atlas"
});
Object.assign(UI_STRINGS.de.tabs, {
  truesize: "📐 Wahre Größe",
  explorer: "🧭 Freier Welt-Atlas"
});

Object.assign(UI_STRINGS.en.modeShortDesc, {
  truesize: "Compare true area with overlaid shapes",
  explorer: "Browse countries, flags, facts & progress"
});
Object.assign(UI_STRINGS.de.modeShortDesc, {
  truesize: "Silhouetten maßstabsgetreu übereinander vergleichen",
  explorer: "Entspannt Länder, Flaggen & Lernstatus entdecken"
});

Object.assign(UI_STRINGS.en.modes, {
  truesize: {
    title: "📐 True Size Comparison (Overlay)",
    sub: "Both country silhouettes are projected at the exact same kilometer scale on top of each other. Which one actually has more area?"
  },
  explorer: {
    title: "🧭 Free World Atlas (Explorer Mode)",
    sub: "Click any country on the interactive globe to inspect its flag, capital, population, area, neighbors, and mastery status."
  }
});
Object.assign(UI_STRINGS.de.modes, {
  truesize: {
    title: "📐 Wahre Größe (True-Size-Vergleich)",
    sub: "Beide Länder-Silhouetten werden im exakt gleichen Kilometer-Maßstab übereinandergelegt. Welches Land hat wirklich mehr Fläche?"
  },
  explorer: {
    title: "🧭 Freier Welt-Atlas (Entdecker-Modus)",
    sub: "Klicke beliebig auf ein Land der Weltkarte, um Flagge, Hauptstadt, Einwohner, Fläche, Nachbarn und deinen Lernstatus zu sehen."
  }
});

UI_STRINGS.en.truesizePrompt = "Which country actually has a larger total area (km²)?";
UI_STRINGS.de.truesizePrompt = "Welches Land hat tatsächlich mehr Quadratkilometer Fläche?";
UI_STRINGS.en.explorerStartBtn = "Open Free World Atlas";
UI_STRINGS.de.explorerStartBtn = "Freien Welt-Atlas öffnen";
UI_STRINGS.en.explorerClickHint = "Click any country on the map to inspect its dossier!";
UI_STRINGS.de.explorerClickHint = "Klicke auf ein beliebiges Land der Karte, um seinen Steckbrief zu öffnen!";

// -------------------------------------------------------------------------
// 3. WAHRE GRÖSSE (TRUE-SIZE-SCALER) – UMRISS AUF ECHTEN MAßSTAB ZIEHEN
// -------------------------------------------------------------------------
function getTrueSizePool() {
  const holList = typeof HOL_COUNTRIES !== "undefined" ? HOL_COUNTRIES : [];
  const worldList = typeof getAllCountries195 === "function" ? getAllCountries195() : [];
  const validIds = new Set(worldList.map(c => c.id));
  return holList.filter(hc => {
    const id = typeof getHolCountryNumericId === "function" ? getHolCountryNumericId(hc) : null;
    if (!id || !validIds.has(id)) return false;
    const meta = worldList.find(c => c.id === id);
    return selectedDifficulty === "all" || (meta && meta.difficulty === selectedDifficulty);
  });
}

function generateTrueSizeQuestions(count) {
  const pool = getTrueSizePool();
  if (pool.length < 2) return [];

  const questions = [];
  const used = new Set();

  for (let i = 0; i < count; i++) {
    let best = null;
    for (let attempt = 0; attempt < 160; attempt++) {
      const a = pool[Math.floor(Math.random() * pool.length)];
      const b = pool[Math.floor(Math.random() * pool.length)];
      if (!a || !b || a.code === b.code || a.area === b.area) continue;

      const pairKey = [a.code, b.code].sort().join("-");
      if (used.has(pairKey)) continue;

      const ratio = Math.max(a.area, b.area) / Math.min(a.area, b.area);
      let ok = true;
      if (selectedDifficulty === "easy") ok = ratio <= 3.5;
      else if (selectedDifficulty === "medium") ok = ratio <= 6.5;
      else ok = ratio <= 12.0;

      best = { a, b, pairKey };
      if (ok) break;
    }

    if (best) {
      used.add(best.pairKey);
      const idA = getHolCountryNumericId(best.a);
      const idB = getHolCountryNumericId(best.b);
      // Zufälliger Start-Faktor (entweder deutlich zu klein 0.35-0.65 oder zu groß 1.55-2.35)
      const startSmaller = Math.random() < 0.5;
      const initialFactor = startSmaller
        ? Number((0.35 + Math.random() * 0.3).toFixed(2))
        : Number((1.55 + Math.random() * 0.8).toFixed(2));

      questions.push({
        isTrueSize: true,
        refCountry: { ...best.a, numId: idA },
        targetCountry: { ...best.b, numId: idB },
        initialFactor,
        userFactor: initialFactor,
        en: { fact: best.b.factEn },
        de: { fact: best.b.factDe }
      });
    }
  }
  return questions;
}

function updateTrueSizeTargetScale(factor) {
  const item = activeQuestions[currentIndex];
  if (!item || !item.isTrueSize) return;
  item.userFactor = Number(factor);

  const targetGroup = document.getElementById("truesize-target-group");
  if (targetGroup) {
    targetGroup.setAttribute("transform", `translate(230, 135) scale(${item.userFactor})`);
  }
  const label = document.getElementById("truesize-scale-label");
  if (label) {
    label.textContent = `${Math.round(item.userFactor * 100)}%`;
  }
}

function stepTrueSizeFactor(delta) {
  if (answered) return;
  const item = activeQuestions[currentIndex];
  const slider = document.getElementById("truesize-slider");
  if (!item || !slider) return;
  const nextVal = Math.max(0.25, Math.min(2.75, Number((item.userFactor + delta).toFixed(2))));
  slider.value = String(nextVal);
  updateTrueSizeTargetScale(nextVal);
}

function renderTrueSizeStage(item) {
  injectPlusStyles();
  const t = UI_STRINGS[currentLang];
  let box = document.getElementById("truesize-stage");
  if (!box) {
    box = document.createElement("div");
    box.id = "truesize-stage";
    box.className = "truesize-stage";
    const optionsList = document.getElementById("options-list");
    optionsList.parentNode.insertBefore(box, optionsList);
  }
  box.classList.remove("hidden");

  const refC = item.refCountry;
  const tarC = item.targetCountry;

  const lockBtnLabel = currentLang === "de" ? "🎯 Größe einloggen" : "🎯 Lock In Size";
  const sliderHint = currentLang === "de"
    ? `Ziehe ${tarC.de} auf den echten Maßstab von ${refC.de}:`
    : `Scale ${tarC.en} to match ${refC.en}'s true scale:`;

  box.innerHTML = `
    <div class="truesize-legend">
      <span style="color:#38bdf8;">🟦 ${refC[currentLang]} (100% Referenz)</span>
      <span style="color:#f59e0b;">🟧 ${tarC[currentLang]}</span>
    </div>
    <svg id="truesize-svg" viewBox="0 0 460 270" style="width:100%;height:255px;display:block;touch-action:none;"></svg>
    <div style="margin-top:10px;padding-top:10px;border-top:1px solid #334155;">
      <div style="font-size:0.84rem;color:#cbd5e1;margin-bottom:8px;font-weight:600;">${sliderHint}</div>
      <div style="display:flex;align-items:center;gap:10px;justify-content:center;">
        <button type="button" class="pill-btn" style="padding:4px 11px;font-weight:800;" ${answered ? "disabled" : ""} onclick="stepTrueSizeFactor(-0.05)">−</button>
        <input id="truesize-slider" type="range" min="0.25" max="2.75" step="0.01" value="${item.userFactor}"
          ${answered ? "disabled" : ""}
          oninput="updateTrueSizeTargetScale(this.value)"
          style="flex:1;max-width:250px;accent-color:#f59e0b;cursor:pointer;">
        <button type="button" class="pill-btn" style="padding:4px 11px;font-weight:800;" ${answered ? "disabled" : ""} onclick="stepTrueSizeFactor(0.05)">+</button>
        <span id="truesize-scale-label" style="min-width:48px;font-weight:800;color:#f59e0b;font-size:0.9rem;">${Math.round(item.userFactor * 100)}%</span>
      </div>
      ${!answered ? `<button type="button" class="primary-btn" style="margin-top:12px;padding:10px 22px;font-size:0.95rem;" onclick="submitTrueSizeGuess()">${lockBtnLabel}</button>` : ""}
    </div>
  `;

  const rawRef = mapFeatures.find(f => String(f.id).padStart(3, "0") === refC.numId);
  const rawTar = mapFeatures.find(f => String(f.id).padStart(3, "0") === tarC.numId);
  if (!rawRef || !rawTar) return;

  const cleanRef = getCleanSilhouetteGeometry(rawRef);
  const cleanTar = getCleanSilhouetteGeometry(rawTar);

  const centerRef = d3.geoCentroid(cleanRef);
  const centerTar = d3.geoCentroid(cleanTar);

  const unitProjRef = d3.geoAzimuthalEqualArea().rotate([-centerRef[0], -centerRef[1]]).scale(1).translate([0, 0]);
  const unitProjTar = d3.geoAzimuthalEqualArea().rotate([-centerTar[0], -centerTar[1]]).scale(1).translate([0, 0]);

  const bRef = d3.geoPath().projection(unitProjRef).bounds(cleanRef);
  const bTar = d3.geoPath().projection(unitProjTar).bounds(cleanTar);

  const maxSpanX = Math.max(bRef[1][0] - bRef[0][0], bTar[1][0] - bTar[0][0], 0.001);
  const maxSpanY = Math.max(bRef[1][1] - bRef[0][1], bTar[1][1] - bTar[0][1], 0.001);
  const sharedScale = Math.min(340 / maxSpanX, 195 / maxSpanY);

  // Beide Länder im exakt identischen Maßstab um (0,0) projizieren
  const projRef = d3.geoAzimuthalEqualArea().rotate([-centerRef[0], -centerRef[1]]).scale(sharedScale).translate([0, 0]);
  const projTar = d3.geoAzimuthalEqualArea().rotate([-centerTar[0], -centerTar[1]]).scale(sharedScale).translate([0, 0]);

  const svg = d3.select("#truesize-svg");

  // 1. Referenzland (fest bei 1.0)
  svg.append("g")
    .attr("transform", "translate(230, 135)")
    .append("path")
    .datum(cleanRef)
    .attr("d", d3.geoPath().projection(projRef))
    .style("fill", "rgba(56, 189, 248, 0.30)")
    .style("stroke", "#38bdf8")
    .style("stroke-width", "1.8px");

  // 2. Falls aufgelöst: Wahre Größe als gestrichelte grüne Ziellinie einblenden
  if (answered) {
    svg.append("g")
      .attr("transform", "translate(230, 135) scale(1)")
      .append("path")
      .datum(cleanTar)
      .attr("d", d3.geoPath().projection(projTar))
      .style("fill", "rgba(34, 197, 94, 0.16)")
      .style("stroke", "#22c55e")
      .style("stroke-width", "2.2px")
      .style("stroke-dasharray", "5,4");
  }

  // 3. Vom Spieler skalierter Umriss
  svg.append("g")
    .attr("id", "truesize-target-group")
    .attr("transform", `translate(230, 135) scale(${item.userFactor})`)
    .append("path")
    .datum(cleanTar)
    .attr("d", d3.geoPath().projection(projTar))
    .style("fill", "rgba(245, 158, 11, 0.34)")
    .style("stroke", "#f59e0b")
    .style("stroke-width", `${(1.8 / item.userFactor).toFixed(2)}px`)
    .style("cursor", answered ? "default" : "ew-resize");

  // Direktes Ziehen am SVG erlauben (links/rechts oder hoch/runter ziehen skaliert mit)
  if (!answered) {
    const svgNode = document.getElementById("truesize-svg");
    let dragStart = null;
    svgNode.onpointerdown = (ev) => {
      if (answered) return;
      dragStart = { x: ev.clientX, y: ev.clientY, startFactor: item.userFactor };
      svgNode.setPointerCapture(ev.pointerId);
    };
    svgNode.onpointermove = (ev) => {
      if (!dragStart || answered) return;
      const dx = ev.clientX - dragStart.x;
      const dy = dragStart.y - ev.clientY;
      const delta = (dx + dy) * 0.006;
      const nextVal = Math.max(0.25, Math.min(2.75, Number((dragStart.startFactor + delta).toFixed(2))));
      const slider = document.getElementById("truesize-slider");
      if (slider) slider.value = String(nextVal);
      updateTrueSizeTargetScale(nextVal);
    };
    svgNode.onpointerup = () => { dragStart = null; };
    svgNode.onpointercancel = () => { dragStart = null; };
  }

  document.getElementById("options-list").innerHTML = "";
}

function submitTrueSizeGuess() {
  if (answered) return;
  answered = true;

  const t = UI_STRINGS[currentLang];
  const item = activeQuestions[currentIndex];
  // Flächen-Abweichung berechnen (da Fläche quadratisch mit dem Längen-Faktor wächst)
  const areaScaleGuess = item.userFactor * item.userFactor;
  const errorPct = Math.round(Math.abs(areaScaleGuess - 1) * 100);

  let earned = 0;
  let verdict = "";
  if (errorPct <= 12) {
    earned = 150;
    correctCount++;
    streak++;
    playSuccessSound(streak);
    verdict = currentLang === "de" ? `🎯 Volltreffer! (${errorPct}% Abweichung, +150 Pkt.)` : `🎯 Bullseye! (${errorPct}% off, +150 pts)`;
  } else if (errorPct <= 30) {
    earned = 100;
    correctCount++;
    streak++;
    playSuccessSound(streak);
    verdict = currentLang === "de" ? `✅ Stark geschätzt! (${errorPct}% Abweichung, +100 Pkt.)` : `✅ Great estimate! (${errorPct}% off, +100 pts)`;
  } else if (errorPct <= 55) {
    earned = 50;
    streak = 0;
    playTone(420, 0.16, "triangle", 0.12);
    verdict = currentLang === "de" ? `🟡 Knapp daneben (${errorPct}% Abweichung, +50 Pkt.)` : `🟡 Close (${errorPct}% off, +50 pts)`;
  } else {
    earned = 0;
    streak = 0;
    playErrorSound();
    const hintDir = areaScaleGuess > 1
      ? (currentLang === "de" ? "viel zu groß" : "way too big")
      : (currentLang === "de" ? "viel zu klein" : "way too small");
    verdict = currentLang === "de" ? `❌ ${hintDir} (${errorPct}% Abweichung)` : `❌ ${hintDir} (${errorPct}% off)`;
  }

  if (streak > (window.bestRunStreak || 0)) window.bestRunStreak = streak;
  totalPoints += earned;

  renderTrueSizeStage(item);

  document.getElementById("ui-score").textContent = t.pointsBadge(totalPoints);
  document.getElementById("ui-streak").textContent = `🔥 ${streak}`;
  document.getElementById("progress-fill").style.width = `${((currentIndex + 1) / activeQuestions.length) * 100}%`;

  const refAreaStr = formatHolValue("area", item.refCountry.area, currentLang);
  const tarAreaStr = formatHolValue("area", item.targetCountry.area, currentLang);
  const ratioStr = (item.targetCountry.area / item.refCountry.area).toFixed(2);

  const areaSummary = currentLang === "de"
    ? `${item.targetCountry.de} (${tarAreaStr}) ist <strong>${ratioStr}×</strong> so groß wie ${item.refCountry.de} (${refAreaStr}).`
    : `${item.targetCountry.en} (${tarAreaStr}) is <strong>${ratioStr}×</strong> the area of ${item.refCountry.en} (${refAreaStr}).`;

  const expBox = document.getElementById("explanation-box");
  expBox.innerHTML = `<strong>${verdict}</strong><br>${areaSummary}<br><span style="opacity:0.9;"><strong>${t.didYouKnow}</strong> ${item[currentLang].fact}</span>`;
  expBox.style.display = "block";

  const nextBtn = document.getElementById("btn-next");
  nextBtn.textContent = currentIndex < activeQuestions.length - 1 ? t.nextBtn : t.finishBtn;
  document.getElementById("next-wrap").style.display = "block";
}

// -------------------------------------------------------------------------
// 4. FREIER WELT-ATLAS (ENTDECKER-MODUS)
// -------------------------------------------------------------------------
let exploredCountryId = null;

function inspectCountryInExplorer(countryId) {
  exploredCountryId = String(countryId).padStart(3, "0");
  if (mapG) {
    mapG.selectAll(".country-path, .micro-hit")
      .classed("correct", d => String(d.id).padStart(3, "0") === exploredCountryId);
  }
  playTone(540, 0.08, "sine", 0.09);
  renderExplorerPanel();
}

function renderExplorerPanel() {
  injectPlusStyles();
  const t = UI_STRINGS[currentLang];
  let panel = document.getElementById("explorer-panel");
  if (!panel) {
    panel = document.createElement("div");
    panel.id = "explorer-panel";
    const mapWrapper = document.getElementById("map-wrapper");
    mapWrapper.appendChild(panel);
  }
  panel.classList.remove("hidden");

  if (!exploredCountryId) {
    panel.innerHTML = `
      <div class="atlas-explorer-card" style="grid-template-columns:1fr;text-align:center;">
        <div style="color:#94a3b8;font-weight:700;">🧭 ${t.explorerClickHint}</div>
      </div>
    `;
    return;
  }

  const allCountries = typeof getAllCountries195 === "function" ? getAllCountries195() : [];
  const worldMeta = allCountries.find(c => c.id === exploredCountryId);
  if (!worldMeta) return;

  const holList = typeof HOL_COUNTRIES !== "undefined" ? HOL_COUNTRIES : [];
  const holMatch = holList.find(h => getHolCountryNumericId(h) === exploredCountryId);

  const iso2 = holMatch
    ? holMatch.code.toLowerCase()
    : Object.keys(ISO2_TO_NUM).find(k => ISO2_TO_NUM[k] === exploredCountryId);

  const capitals = typeof PINPOINT_CITIES !== "undefined" ? PINPOINT_CITIES.filter(c => c.type === "capital") : [];
  const capMatch = capitals.find(cap =>
    cap.countryEn.toLowerCase() === worldMeta.en.toLowerCase() ||
    cap.countryDe.toLowerCase() === worldMeta.de.toLowerCase()
  );

  // Lernstatus aus localStorage
  const cProg = typeof userProgress !== "undefined" ? userProgress?.atlas?.countries?.[exploredCountryId] : null;
  let statusText = currentLang === "de" ? "Unbekannt" : "Unknown";
  let statusStyle = "background:#334155;color:#cbd5e1;";
  if (cProg?.mastered) {
    statusText = currentLang === "de" ? "✓ Gemeistert" : "✓ Mastered";
    statusStyle = "background:rgba(34,197,94,0.2);color:#4ade80;border:1px solid #22c55e;";
  } else if ((cProg?.seen || 0) > 0) {
    statusText = currentLang === "de" ? "👁️ Gesehen" : "👁️ Seen";
    statusStyle = "background:rgba(56,189,248,0.2);color:#38bdf8;border:1px solid #38bdf8;";
  }

  const flagHtml = iso2
    ? `<img class="atlas-explorer-flag" src="https://flagcdn.com/w320/${iso2}.png" alt="${worldMeta[currentLang]}">`
    : `<div style="font-size:3rem;">🌍</div>`;

  const popLine = holMatch
    ? `<span>👥 ${formatHolValue("population", holMatch.pop, currentLang)}</span>`
    : "";
  const areaLine = holMatch
    ? `<span>📐 ${formatHolValue("area", holMatch.area, currentLang)}</span>`
    : "";
  const capLine = capMatch
    ? `<span>🏛️ ${currentLang === "de" ? capMatch.de : capMatch.en}</span>`
    : "";

  const nIds = [...(countryNeighborsMap[exploredCountryId] || [])];
  const neighborChips = nIds.map(nid => {
    const nObj = allCountries.find(c => c.id === nid);
    if (!nObj) return "";
    return `<button class="atlas-neighbor-chip" onclick="inspectCountryInExplorer('${nid}');focusCountryOnMap('${nid}');">${nObj[currentLang]}</button>`;
  }).join("");

  const factText = currentLang === "de" ? worldMeta.factDe : worldMeta.factEn;

  panel.innerHTML = `
    <div class="atlas-explorer-card">
      <div>${flagHtml}</div>
      <div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
          <h3 style="margin:0;font-size:1.18rem;color:#f8fafc;">${worldMeta[currentLang]}</h3>
          <span class="atlas-status-pill" style="${statusStyle}">${statusText}</span>
        </div>
        <div style="display:flex;gap:14px;flex-wrap:wrap;font-size:0.86rem;color:#cbd5e1;margin-top:6px;font-weight:600;">
          ${capLine} ${popLine} ${areaLine}
        </div>
        <p style="font-size:0.84rem;color:#94a3b8;margin:8px 0 0;line-height:1.45;">${factText}</p>
        ${neighborChips ? `<div class="atlas-neighbors-wrap">${neighborChips}</div>` : ""}
      </div>
    </div>
  `;
}

// -------------------------------------------------------------------------
// 5. HOOKS FÜR STARTBILDSCHIRM, SPIELSTART, FRAGEN & SOUNDEFFEKTE
// -------------------------------------------------------------------------
const _plusOrigGetPool = getPool;
getPool = function () {
  if (currentMode === "truesize") {
    return getTrueSizePool();
  }
  if (currentMode === "explorer") {
    return typeof getAllCountries195 === "function" ? getAllCountries195() : [];
  }
  return _plusOrigGetPool.apply(this, arguments);
};

const _plusOrigRenderHome = renderHome;
renderHome = function () {
  renderSoundButton();
  _plusOrigRenderHome.apply(this, arguments);
  const t = UI_STRINGS[currentLang];

  if (currentMode === "truesize") {
    document.getElementById("category-section").classList.add("hidden");
    document.getElementById("ui-diff-label").textContent = `1. ${t.diffLabel}`;
    document.getElementById("ui-len-label").textContent = `2. ${t.lenLabel}`;
  }

  if (currentMode === "explorer") {
    document.getElementById("category-section").classList.add("hidden");
    ["ui-diff-label", "diff-row", "ui-len-label", "len-row"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add("hidden");
    });
    const startBtn = document.getElementById("btn-start");
    startBtn.textContent = t.explorerStartBtn;
    startBtn.disabled = false;
  }
};

const _plusOrigStartQuiz = startQuiz;
startQuiz = async function () {
  if (currentMode === "truesize") {
    stopTimer();
    window.isDailySession = false;
    window.dailySeedValue = null;
    window.isWeaknessSession = false;

    const count = selectedLength === "all" ? 20 : Math.min(20, selectedLength);
    currentIndex = 0;
    correctCount = 0;
    totalPoints = 0;
    streak = 0;
    window.bestRunStreak = 0;

    document.getElementById("screen-home").classList.add("hidden");
    document.getElementById("screen-result").classList.add("hidden");
    document.getElementById("screen-quiz").classList.remove("hidden");

    await ensureWorldDataLoaded();
    activeQuestions = generateTrueSizeQuestions(count);
    renderQuestion(false);
    return;
  }

  if (currentMode === "explorer") {
    stopTimer();
    exploredCountryId = null;

    document.getElementById("screen-home").classList.add("hidden");
    document.getElementById("screen-result").classList.add("hidden");
    document.getElementById("screen-quiz").classList.remove("hidden");

    await ensureMapLoaded();
    clearMapLayers();
    if (mapSvg) mapSvg.classed("pinpoint-mode", false).classed("blind-mode", false);
    resetMapZoom();
    renderExplorerQuestion();
    return;
  }

  return _plusOrigStartQuiz.apply(this, arguments);
};

function renderExplorerQuestion() {
  const t = UI_STRINGS[currentLang];
  ["hol-arena", "silhouette-box", "radar-hud", "chrono-arena", "flag-zoom-wrap", "dossier-arena", "missing-box", "flight-controls", "truesize-stage"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });
  document.getElementById("timer-wrap").classList.add("hidden");
  document.getElementById("flag-box").classList.add("hidden");
  document.getElementById("options-list").innerHTML = "";
  document.getElementById("explanation-box").style.display = "none";
  document.getElementById("next-wrap").style.display = "none";

  const mapWrapper = document.getElementById("map-wrapper");
  mapWrapper.classList.remove("hidden");
  document.getElementById("ui-map-hint").textContent = t.mapHint;
  document.getElementById("q-meta").textContent = t.tabs.explorer;
  document.getElementById("q-text").textContent = t.explorerClickHint;
  document.getElementById("ui-q-counter").textContent = "195 🌍";
  document.getElementById("progress-fill").style.width = "100%";

  renderExplorerPanel();
}

const _plusOrigHandleMapGuess = handleMapGuess;
handleMapGuess = function (clickedId, clickedFeature) {
  if (currentMode === "explorer") {
    inspectCountryInExplorer(clickedId);
    return;
  }
  const prevCorrect = correctCount;
  _plusOrigHandleMapGuess.apply(this, arguments);
  if (currentMode !== "sweep") {
    if (correctCount > prevCorrect) playSuccessSound(streak);
    else playErrorSound();
  }
};

const _plusOrigRenderQuestion = renderQuestion;
renderQuestion = function (keepState) {
  const tsBox = document.getElementById("truesize-stage");
  if (tsBox) tsBox.classList.add("hidden");
  const expPanel = document.getElementById("explorer-panel");
  if (expPanel) expPanel.classList.add("hidden");

  if (currentMode === "explorer") {
    renderExplorerQuestion();
    return;
  }

  const item = activeQuestions[currentIndex];
  if (item && item.isTrueSize) {
    const t = UI_STRINGS[currentLang];
    if (!keepState) {
      answered = false;
      lastStatusHtml = "";
    }
    document.getElementById("ui-q-counter").textContent = t.questionCount(currentIndex + 1, activeQuestions.length);
    document.getElementById("ui-score").textContent = t.pointsBadge(totalPoints);
    document.getElementById("ui-streak").textContent = `🔥 ${streak}`;
    document.getElementById("progress-fill").style.width = `${((answered ? currentIndex + 1 : currentIndex) / activeQuestions.length) * 100}%`;
    document.getElementById("timer-wrap").classList.add("hidden");
    document.getElementById("flag-box").classList.add("hidden");
    document.getElementById("map-wrapper").classList.add("hidden");
    document.getElementById("q-meta").textContent = `${t.tabs.truesize} • ${t.difficulties[selectedDifficulty]}`;
    document.getElementById("q-text").textContent = t.truesizePrompt;
    renderTrueSizeStage(item);

    if (!keepState) {
      document.getElementById("explanation-box").style.display = "none";
      document.getElementById("next-wrap").style.display = "none";
    }
    return;
  }

  return _plusOrigRenderQuestion.apply(this, arguments);
};

// Audio-Hooks für bestehende Modi
const _plusOrigHandleAnswer = handleAnswer;
handleAnswer = function (selectedIdx) {
  const prevCorrect = correctCount;
  _plusOrigHandleAnswer.apply(this, arguments);
  if (correctCount > prevCorrect) playSuccessSound(streak);
  else playErrorSound();
};

const _plusOrigHandleHolGuess = handleHolGuess;
handleHolGuess = function (selectedIdx) {
  const prevCorrect = correctCount;
  _plusOrigHandleHolGuess.apply(this, arguments);
  if (correctCount > prevCorrect) playSuccessSound(streak);
  else playErrorSound();
};

const _plusOrigHandleChronoSlot = handleChronoSlot;
handleChronoSlot = function (slotIdx) {
  const prevCorrect = correctCount;
  _plusOrigHandleChronoSlot.apply(this, arguments);
  if (correctCount > prevCorrect) playSuccessSound(streak);
  else playErrorSound();
};

const _plusOrigTriggerFlagBuzzer = triggerFlagBuzzer;
triggerFlagBuzzer = function () {
  playBuzzerSound();
  _plusOrigTriggerFlagBuzzer.apply(this, arguments);
};

const _plusOrigHandleRadarClick = handleRadarClick;
handleRadarClick = function (event) {
  const item = activeQuestions[currentIndex];
  const prevLen = item && item.pings ? item.pings.length : 0;
  _plusOrigHandleRadarClick.apply(this, arguments);
  if (item && item.pings && item.pings.length > prevLen) {
    const latestPing = item.pings[item.pings.length - 1];
    playRadarSonarPing(latestPing.distKm);
  }
};

// Initialisieren
renderSoundButton();
renderHome();