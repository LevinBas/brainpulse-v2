// =========================================================================
// ERWEITERUNG: GRAUSTUFEN-FLAGGEN, KARTEN-SWEEP & IMPRESSUM
// =========================================================================

// 1. Impressum & Datenschutzerklärung aktualisieren
UI_STRINGS.en.legal = {
  imprintTitle: "Legal Notice / Impressum",
  imprintBody: `
    <p><strong>Information pursuant to § 5 DDG (Germany):</strong></p>
    <p>Levin Bastians<br>Jettbergskamp 10b<br>22397 Hamburg, Germany</p>
    <p><strong>Contact:</strong><br>Email: marklevin.bastians@gmail.com</p>
  `,
  privacyTitle: "Privacy Policy / Datenschutzerklärung",
  privacyBody: `
    <p><strong>1. General Information</strong><br>This quiz website runs directly in your browser. We do not require user accounts or store personal profiles on external servers.</p>
    <p><strong>2. External Content (Maps & Flag Images)</strong><br>Flag images are loaded via FlagCDN (flagcdn.com) and world map vector data via jsDelivr (cdn.jsdelivr.net). Technically, your IP address is transmitted to deliver these files.</p>
  `
};

UI_STRINGS.de.legal = {
  imprintTitle: "Impressum",
  imprintBody: `
    <p><strong>Angaben gemäß § 5 DDG:</strong></p>
    <p>Levin Bastians<br>Jettbergskamp 10b<br>22397 Hamburg, Deutschland</p>
    <p><strong>Kontakt:</strong><br>E-Mail: marklevin.bastians@gmail.com</p>
  `,
  privacyTitle: "Datenschutzerklärung",
  privacyBody: `
    <p><strong>1. Datenschutz auf einen Blick</strong><br>Dieses Quiz läuft lokal in deinem Browser. Es werden keine Benutzerkonten oder Spielstände auf eigenen Servern gespeichert.</p>
    <p><strong>2. Einbindung von Karten- & Flaggen-Daten</strong><br>Flaggenbilder werden über FlagCDN (flagcdn.com) und Weltkarten-Vektordaten über jsDelivr (cdn.jsdelivr.net) geladen. Dabei wird technisch bedingt deine IP-Adresse an diese Server übermittelt.</p>
  `
};

// 2. Neue Modi in Gruppen & Texte eintragen
const flagsGroup = MODE_GROUPS.find(g => g.id === "flags_shapes");
if (flagsGroup && !flagsGroup.modes.includes("grayscale")) {
  flagsGroup.modes.push("grayscale");
}
const globeGroup = MODE_GROUPS.find(g => g.id === "globe");
if (globeGroup && !globeGroup.modes.includes("sweep")) {
  globeGroup.modes.push("sweep");
}

Object.assign(UI_STRINGS.en.tabs, {
  grayscale: "🏴‍☠️ Grayscale Flags",
  sweep: "⚡ Continent Sweep"
});
Object.assign(UI_STRINGS.de.tabs, {
  grayscale: "🏴‍☠️ Graustufen-Flaggen",
  sweep: "⚡ Karten-Sweep"
});

Object.assign(UI_STRINGS.en.modeShortDesc, {
  grayscale: "Identify flags in black & white",
  sweep: "Conquer an entire continent on the clock"
});
Object.assign(UI_STRINGS.de.modeShortDesc, {
  grayscale: "Nationalflaggen komplett in Schwarz-Weiß",
  sweep: "Erobere einen ganzen Kontinent auf Bestzeit"
});

Object.assign(UI_STRINGS.en.modes, {
  grayscale: {
    title: "🏴‍☠️ Grayscale Flag Challenge",
    sub: "All colors are stripped away! Distinguish tricolors and emblems purely by contrast and design."
  },
  sweep: {
    title: "⚡ Map Sweep (Continent Conquest)",
    sub: "Pick a continent and click every country as fast as possible against the stopwatch!"
  }
});
Object.assign(UI_STRINGS.de.modes, {
  grayscale: {
    title: "🏴‍☠️ Graustufen-Flaggen (Schwarz-Weiß)",
    sub: "Alle Farben wurden entfernt! Erkenne Trikoloren und Wappen allein an Kontrast und Muster."
  },
  sweep: {
    title: "⚡ Karten-Sweep (Kontinent-Eroberung)",
    sub: "Wähle einen Kontinent und klicke alle Länder nacheinander so schnell wie möglich auf Bestzeit an!"
  }
});

UI_STRINGS.en.grayscalePrompt = "Which country does this black-and-white flag belong to?";
UI_STRINGS.de.grayscalePrompt = "Zu welchem Land gehört diese Schwarz-Weiß-Flagge?";
UI_STRINGS.en.sweepCatLabel = "1. Choose Continent to Conquer";
UI_STRINGS.de.sweepCatLabel = "1. Kontinent zur Eroberung wählen";
UI_STRINGS.en.sweepStartBtn = (n) => `Start Conquest (${n} Countries)`;
UI_STRINGS.de.sweepStartBtn = (n) => `Eroberung starten (${n} Länder)`;
UI_STRINGS.en.sweepPrompt = (name) => `Click on: ${name}`;
UI_STRINGS.de.sweepPrompt = (name) => `Klicke auf: ${name}`;
UI_STRINGS.en.sweepSkipBtn = "Skip (+5.0s)";
UI_STRINGS.de.sweepSkipBtn = "Überspringen (+5,0s)";

// 3. Kontinent-Zuordnung für alle 195 Länder (ISO Numeric IDs)
const SWEEP_CONTINENTS = [
  { id: "europe", icon: "🇪🇺", en: "Europe", de: "Europa" },
  { id: "asia", icon: "🌏", en: "Asia", de: "Asien" },
  { id: "africa", icon: "🌍", en: "Africa", de: "Afrika" },
  { id: "north_america", icon: "🌎", en: "North America", de: "Nordamerika" },
  { id: "south_america", icon: "🦙", en: "South America", de: "Südamerika" },
  { id: "oceania", icon: "🏝️", en: "Oceania", de: "Ozeanien" }
];

const COUNTRY_CONTINENT_BY_ID = {
  // Europa
  "008":"europe","020":"europe","040":"europe","112":"europe","056":"europe","070":"europe","100":"europe",
  "191":"europe","196":"europe","203":"europe","208":"europe","233":"europe","246":"europe","250":"europe",
  "276":"europe","300":"europe","348":"europe","352":"europe","372":"europe","380":"europe","428":"europe",
  "438":"europe","440":"europe","442":"europe","470":"europe","498":"europe","492":"europe","499":"europe",
  "528":"europe","807":"europe","578":"europe","616":"europe","620":"europe","642":"europe","643":"europe",
  "674":"europe","688":"europe","703":"europe","705":"europe","724":"europe","752":"europe","756":"europe",
  "804":"europe","826":"europe","336":"europe","-99":"europe",
  // Asien
  "004":"asia","051":"asia","031":"asia","048":"asia","050":"asia","064":"asia","096":"asia","116":"asia",
  "156":"asia","268":"asia","356":"asia","360":"asia","364":"asia","368":"asia","376":"asia","392":"asia",
  "400":"asia","398":"asia","414":"asia","417":"asia","418":"asia","422":"asia","458":"asia","462":"asia",
  "496":"asia","104":"asia","524":"asia","408":"asia","512":"asia","586":"asia","275":"asia","608":"asia",
  "634":"asia","682":"asia","702":"asia","410":"asia","144":"asia","760":"asia","158":"asia","762":"asia",
  "764":"asia","626":"asia","792":"asia","795":"asia","784":"asia","860":"asia","704":"asia","887":"asia",
  // Afrika
  "012":"africa","024":"africa","204":"africa","072":"africa","854":"africa","108":"africa","132":"africa",
  "120":"africa","140":"africa","148":"africa","174":"africa","178":"africa","180":"africa","384":"africa",
  "262":"africa","818":"africa","226":"africa","232":"africa","748":"africa","231":"africa","266":"africa",
  "270":"africa","288":"africa","324":"africa","624":"africa","404":"africa","426":"africa","430":"africa",
  "434":"africa","450":"africa","454":"africa","466":"africa","478":"africa","480":"africa","504":"africa",
  "508":"africa","516":"africa","562":"africa","566":"africa","646":"africa","678":"africa","686":"africa",
  "690":"africa","694":"africa","706":"africa","710":"africa","728":"africa","729":"africa","834":"africa",
  "768":"africa","788":"africa","800":"africa","894":"africa","716":"africa",
  // Nordamerika
  "028":"north_america","044":"north_america","052":"north_america","084":"north_america","124":"north_america",
  "188":"north_america","192":"north_america","212":"north_america","214":"north_america","222":"north_america",
  "308":"north_america","320":"north_america","332":"north_america","340":"north_america","388":"north_america",
  "484":"north_america","558":"north_america","591":"north_america","659":"north_america","662":"north_america",
  "670":"north_america","780":"north_america","840":"north_america",
  // Südamerika
  "032":"south_america","068":"south_america","076":"south_america","152":"south_america","170":"south_america",
  "218":"south_america","328":"south_america","600":"south_america","604":"south_america","740":"south_america",
  "858":"south_america","862":"south_america",
  // Ozeanien
  "036":"oceania","242":"oceania","296":"oceania","584":"oceania","583":"oceania","520":"oceania","554":"oceania",
  "585":"oceania","598":"oceania","882":"oceania","090":"oceania","776":"oceania","798":"oceania","548":"oceania"
};

let selectedSweepContinent = "europe";
let sweepState = null;

function stopSweepTimer() {
  if (sweepState && sweepState.timerId) {
    clearInterval(sweepState.timerId);
    sweepState.timerId = null;
  }
}

function normalizeCountryId(rawId) {
  const s = String(rawId ?? "");
  return s === "-99" ? "-99" : s.padStart(3, "0");
}

function getSweepCountriesList() {
  const all = typeof getAllCountries195 === "function"
    ? getAllCountries195()
    : (typeof COUNTRIES_WORLD_195 !== "undefined"
        ? COUNTRIES_WORLD_195
        : (typeof COUNTRIES_DATA !== "undefined" ? COUNTRIES_DATA : []));
  return Array.isArray(all) ? all : [];
}

function getSweepBestTime(contId) {
  try {
    const raw = localStorage.getItem("brainpulse_sweep_records_v1");
    const data = raw ? JSON.parse(raw) : {};
    return typeof data[contId] === "number" ? data[contId] : null;
  } catch (e) {
    return null;
  }
}

function saveSweepBestTime(contId, sec) {
  try {
    const raw = localStorage.getItem("brainpulse_sweep_records_v1");
    const data = raw ? JSON.parse(raw) : {};
    const prev = data[contId];
    if (typeof prev !== "number" || sec < prev) {
      data[contId] = sec;
      localStorage.setItem("brainpulse_sweep_records_v1", JSON.stringify(data));
      return true;
    }
  } catch (e) {}
  return false;
}

function setSweepControlsHidden(hide) {
  ["ui-diff-label", "diff-row", "ui-len-label", "len-row"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle("hidden", hide);
  });
}

// 4. Pool & Startbildschirm erweitern
const _origGetPool = getPool;
getPool = function () {
  if (currentMode === "grayscale") {
    const list = typeof FLAGS_DATA !== "undefined" ? FLAGS_DATA : [];
    return list.filter(f => selectedDifficulty === "all" || f.difficulty === selectedDifficulty);
  }
  if (currentMode === "sweep") {
    return getSweepCountriesList().filter(c => COUNTRY_CONTINENT_BY_ID[normalizeCountryId(c.id)] === selectedSweepContinent);
  }
  return _origGetPool.apply(this, arguments);
};

const _origRenderHome = renderHome;
renderHome = function () {
  const screenHome = document.getElementById("screen-home");
  if (screenHome) screenHome.classList.remove("hidden");
  setSweepControlsHidden(false);

  _origRenderHome.apply(this, arguments);
  const t = UI_STRINGS[currentLang];

  if (currentMode === "grayscale") {
    document.getElementById("category-section").classList.add("hidden");
    document.getElementById("ui-diff-label").textContent = `1. ${t.diffLabel}`;
    document.getElementById("ui-len-label").textContent = `2. ${t.lenLabel}`;
  }

  if (currentMode === "sweep") {
    const catSection = document.getElementById("category-section");
    catSection.classList.remove("hidden");
    document.getElementById("ui-cat-label").textContent = t.sweepCatLabel;

    const allCountries = getSweepCountriesList();
    const catGrid = document.getElementById("category-grid");
    catGrid.innerHTML = "";
    SWEEP_CONTINENTS.forEach(cont => {
      const count = allCountries.filter(c => COUNTRY_CONTINENT_BY_ID[normalizeCountryId(c.id)] === cont.id).length;
      const best = getSweepBestTime(cont.id);
      const bestTag = best ? `<div style="font-size:0.74rem;color:#38bdf8;margin-top:2px;">🏆 ${best.toFixed(1)}s</div>` : "";
      const btn = document.createElement("button");
      btn.className = "cat-card" + (selectedSweepContinent === cont.id ? " selected" : "");
      btn.innerHTML = `<span class="cat-icon">${cont.icon}</span><div class="cat-title">${cont[currentLang]} (${count})</div>${bestTag}`;
      btn.onclick = () => {
        selectedSweepContinent = cont.id;
        renderHome();
      };
      catGrid.appendChild(btn);
    });

    setSweepControlsHidden(true);

    const pool = getPool();
    const startBtn = document.getElementById("btn-start");
    startBtn.textContent = t.sweepStartBtn(pool.length);
    startBtn.disabled = pool.length === 0;
  }
};

// 5. Quizstart für Graustufen-Flaggen & Karten-Sweep
const _origStartQuiz = startQuiz;
startQuiz = async function () {
  stopSweepTimer();
  sweepState = null;

  if (currentMode === "grayscale") {
    stopTimer();
    window.isDailySession = false;
    window.dailySeedValue = null;
    window.isWeaknessSession = false;

    const pool = [...getPool()].sort(() => Math.random() - 0.5);
    const count = selectedLength === "all" ? pool.length : Math.min(pool.length, selectedLength);

    currentIndex = 0;
    correctCount = 0;
    totalPoints = 0;
    streak = 0;
    window.bestRunStreak = 0;

    document.getElementById("screen-home").classList.add("hidden");
    document.getElementById("screen-result").classList.add("hidden");
    document.getElementById("screen-quiz").classList.remove("hidden");

    activeQuestions = pool.slice(0, count).map(f => ({
      ...buildFlagQuestion(f),
      isGrayscale: true
    }));
    renderQuestion(false);
    return;
  }

  if (currentMode === "sweep") {
    stopTimer();
    window.isDailySession = false;
    window.dailySeedValue = null;
    window.isWeaknessSession = false;

    const queue = [...getPool()].map(c => ({ ...c, id: normalizeCountryId(c.id) })).sort(() => Math.random() - 0.5);
    if (queue.length === 0) return;

    activeQuestions = [...queue];
    currentIndex = 0;
    correctCount = 0;
    totalPoints = 0;
    streak = 0;
    window.bestRunStreak = 0;

    document.getElementById("screen-home").classList.add("hidden");
    document.getElementById("screen-result").classList.add("hidden");
    document.getElementById("screen-quiz").classList.remove("hidden");

    await ensureMapLoaded();
    clearMapLayers();
    if (mapSvg) mapSvg.classed("pinpoint-mode", false).classed("blind-mode", false);

    sweepState = {
      continent: selectedSweepContinent,
      queue,
      total: queue.length,
      conqueredIds: new Set(),
      penaltySec: 0,
      mistakes: 0,
      bestStreak: 0,
      startTime: performance.now(),
      timerId: setInterval(updateSweepClock, 100)
    };

    focusSweepContinent(selectedSweepContinent);
    renderSweepQuestion();
    return;
  }

  return _origStartQuiz.apply(this, arguments);
};

function focusSweepContinent(contId) {
  if (!mapSvg || !mapZoom || !mapPath) return;
  const contFeatures = mapFeatures.filter(f => COUNTRY_CONTINENT_BY_ID[normalizeCountryId(f.id)] === contId);
  if (contFeatures.length === 0) {
    resetMapZoom();
    return;
  }
  const collection = { type: "FeatureCollection", features: contFeatures };
  const bounds = mapPath.bounds(collection);
  const dx = bounds[1][0] - bounds[0][0];
  const dy = bounds[1][1] - bounds[0][1];
  if (dx <= 0 || dy <= 0) return;

  const cx = (bounds[0][0] + bounds[1][0]) / 2;
  const cy = (bounds[0][1] + bounds[1][1]) / 2;
  const scale = Math.max(1.2, Math.min(4.8, 0.78 / Math.max(dx / 960, dy / 500)));
  const translate = [960 / 2 - scale * cx, 500 / 2 - scale * cy];

  mapSvg.transition().duration(550).call(
    mapZoom.transform,
    d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
  );
}

function getSweepElapsedSec() {
  if (!sweepState) return 0;
  return ((performance.now() - sweepState.startTime) / 1000) + sweepState.penaltySec;
}

function updateSweepClock() {
  if (!sweepState) return;
  const sec = getSweepElapsedSec().toFixed(1);
  const el = document.getElementById("sweep-clock-val");
  if (el) el.textContent = `⏱️ ${sec}s`;
}

function renderSweepQuestion() {
  if (!sweepState) return;
  const t = UI_STRINGS[currentLang];
  const target = sweepState.queue[0];

  ["hol-arena", "silhouette-box", "chrono-arena", "flag-zoom-wrap", "dossier-arena", "missing-box", "flight-controls"].forEach(id => {
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

  const contObj = SWEEP_CONTINENTS.find(c => c.id === sweepState.continent);
  document.getElementById("q-meta").textContent = `${t.tabs.sweep} • ${contObj[currentLang]}`;
  document.getElementById("q-text").textContent = target ? t.sweepPrompt(target[currentLang]) : "";

  document.getElementById("ui-q-counter").textContent = `${sweepState.conqueredIds.size} / ${sweepState.total}`;
  document.getElementById("ui-score").textContent = t.pointsBadge(totalPoints);
  document.getElementById("ui-streak").textContent = `🔥 ${streak}`;
  document.getElementById("progress-fill").style.width = `${(sweepState.conqueredIds.size / sweepState.total) * 100}%`;

  const hud = getOrCreateRadarHud();
  hud.classList.remove("hidden");
  hud.innerHTML = `
    <div style="display:flex;align-items:center;gap:14px;font-weight:800;">
      <span id="sweep-clock-val" style="color:#38bdf8;font-size:1.05rem;">⏱️ ${getSweepElapsedSec().toFixed(1)}s</span>
      <span id="sweep-feedback" style="color:#fbbf24;font-size:0.84rem;"></span>
    </div>
    <button class="pill-btn" style="padding:5px 10px;font-size:0.8rem;" onclick="skipSweepTarget()">${t.sweepSkipBtn}</button>
  `;
}

function skipSweepTarget() {
  if (!sweepState || sweepState.queue.length === 0) return;
  sweepState.penaltySec += 5.0;
  streak = 0;
  const skipped = sweepState.queue.shift();
  sweepState.queue.push(skipped);
  updateSweepClock();
  renderSweepQuestion();
}

function handleSweepClick(clickedId, clickedFeature) {
  if (!sweepState || sweepState.queue.length === 0) return;
  const normClicked = normalizeCountryId(clickedId);
  const target = sweepState.queue[0];

  if (normClicked === target.id) {
    sweepState.conqueredIds.add(target.id);
    sweepState.queue.shift();
    correctCount++;
    streak++;
    if (streak > sweepState.bestStreak) sweepState.bestStreak = streak;
    totalPoints += 100;
    if (typeof recordAtlasOutcome === "function") {
      recordAtlasOutcome("countries", target.id, true);
    }

    mapG.selectAll(".country-path, .micro-hit")
      .classed("correct", d => sweepState.conqueredIds.has(normalizeCountryId(d.id)));

    if (sweepState.queue.length === 0) {
      finishSweepRun();
    } else {
      renderSweepQuestion();
    }
  } else {
    sweepState.mistakes++;
    sweepState.penaltySec += 2.0;
    streak = 0;
    updateSweepClock();

    const wrongName = getCountryNameById(normClicked, clickedFeature) || "???";
    const fb = document.getElementById("sweep-feedback");
    if (fb) {
      fb.textContent = currentLang === "de" ? `❌ ${wrongName} (+2,0s)` : `❌ ${wrongName} (+2.0s)`;
    }

    mapG.selectAll(".country-path, .micro-hit")
      .classed("wrong", d => normalizeCountryId(d.id) === normClicked);
    setTimeout(() => {
      if (mapG) mapG.selectAll(".country-path, .micro-hit").classed("wrong", false);
    }, 350);
  }
}

function finishSweepRun() {
  stopSweepTimer();
  const t = UI_STRINGS[currentLang];
  const finalSec = Number(getSweepElapsedSec().toFixed(1));
  const isNewRecord = saveSweepBestTime(sweepState.continent, finalSec);
  const timeBonus = Math.max(0, Math.round(1500 - finalSec * 10));
  totalPoints += timeBonus;

  if (typeof recordModeRunStats === "function") {
    recordModeRunStats("sweep", totalPoints, sweepState.bestStreak, false, null);
  }

  document.getElementById("screen-quiz").classList.add("hidden");
  document.getElementById("screen-result").classList.remove("hidden");

  const contObj = SWEEP_CONTINENTS.find(c => c.id === sweepState.continent);
  document.getElementById("ui-res-title").textContent = `${contObj[currentLang]} – ${t.resTitle}`;
  document.getElementById("res-score").textContent = `⏱️ ${finalSec.toFixed(1)}s`;
  document.getElementById("res-points").textContent = t.resPoints(totalPoints);
  document.getElementById("res-rank").textContent = isNewRecord
    ? (currentLang === "de" ? "🏆 Neuer Kontinent-Rekord!" : "🏆 New Continent Record!")
    : (currentLang === "de" ? "🎯 Kontinent erobert!" : "🎯 Continent Conquered!");
  document.getElementById("res-sub").textContent = currentLang === "de"
    ? `${sweepState.total} Länder erobert • ${sweepState.mistakes} Fehlklicks`
    : `${sweepState.total} countries conquered • ${sweepState.mistakes} misclicks`;
  document.getElementById("btn-share").textContent = t.shareBtn;
  document.getElementById("btn-restart").textContent = t.restartBtn;
}

// 6. Hooks für Map-Klicks, Graustufen-Filter & Zurück zum Menü
const _origHandleMapGuess = handleMapGuess;
handleMapGuess = function (clickedId, clickedFeature) {
  if (currentMode === "sweep") {
    handleSweepClick(clickedId, clickedFeature);
    return;
  }
  return _origHandleMapGuess.apply(this, arguments);
};

const _origRenderQuestion = renderQuestion;
renderQuestion = function (keepState) {
  if (currentMode === "sweep" && sweepState) {
    renderSweepQuestion();
    return;
  }
  _origRenderQuestion.apply(this, arguments);

  const item = activeQuestions[currentIndex];
  const flagImg = document.getElementById("flag-img");
  if (!flagImg) return;

  if (item && item.isGrayscale) {
    const t = UI_STRINGS[currentLang];
    document.getElementById("q-meta").textContent = `${t.tabs.grayscale} • ${t.difficulties[item.difficulty]}`;
    document.getElementById("q-text").textContent = t.grayscalePrompt;
    flagImg.style.filter = answered ? "none" : "grayscale(100%) contrast(1.18)";
  } else {
    flagImg.style.filter = "none";
  }
};

const _origHandleAnswer = handleAnswer;
handleAnswer = function (selectedIdx) {
  _origHandleAnswer.apply(this, arguments);
  const item = activeQuestions[currentIndex];
  if (item && item.isGrayscale) {
    const flagImg = document.getElementById("flag-img");
    if (flagImg) flagImg.style.filter = "none";
  }
};

const _origHandleTimeout = handleTimeout;
handleTimeout = function () {
  _origHandleTimeout.apply(this, arguments);
  const item = activeQuestions[currentIndex];
  if (item && item.isGrayscale) {
    const flagImg = document.getElementById("flag-img");
    if (flagImg) flagImg.style.filter = "none";
  }
};

const _origGoHome = goHome;
goHome = function () {
  stopSweepTimer();
  sweepState = null;
  const flagImg = document.getElementById("flag-img");
  if (flagImg) flagImg.style.filter = "none";
  _origGoHome.apply(this, arguments);
};

// Neu zeichnen, damit die neuen Modi sofort im Menü sichtbar sind
renderHome();