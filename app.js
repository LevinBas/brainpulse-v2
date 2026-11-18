// =========================================================================
// 1. KATEGORIEN & HELFER FÜR SPÄTERE ERWEITERUNGEN
// =========================================================================
const CATEGORIES = [
  { id: "all", icon: "🌐", en: "All Categories", de: "Alle Kategorien" },
  { id: "general", icon: "💡", en: "General Knowledge", de: "Allgemeinwissen" },
  { id: "science", icon: "🔬", en: "Science & Tech", de: "Wissenschaft & Technik" },
  { id: "geography", icon: "🌍", en: "Geography", de: "Geographie" },
  { id: "history", icon: "🏛️", en: "History", de: "Geschichte" }
];

function addQuestions(newList) {
  if (typeof QUIZ_DATA !== "undefined" && Array.isArray(newList)) {
    QUIZ_DATA.push(...newList);
  }
}

// =========================================================================
// 2. ÜBERSETZUNGEN (ENGLISCH & DEUTSCH)
// =========================================================================
const UI_STRINGS = {
  en: {
    tabs: {
      classic: "🎯 Classic Quiz",
      timed: "⚡ Time Attack",
      flags: "🚩 Flag Quiz",
      map: "🗺️ Spot the Country"
    },
    modes: {
      classic: {
        title: "Classic Knowledge Quiz",
        sub: "Take your time, test your knowledge, and learn fun facts after every question."
      },
      timed: {
        title: "⚡ Time Attack (15s per Question)",
        sub: "Beat the clock! Faster answers earn up to 150 bonus points per question."
      },
      flags: {
        title: "🚩 World Flag Challenge",
        sub: "Can you recognize countries around the globe just by looking at their flag?"
      },
      map: {
        title: "🗺️ Spot the Country on the World Map",
        sub: "Find and click the target country directly on the interactive globe!"
      }
    },
    catLabel: "1. Select Category",
    diffLabel: "Select Difficulty",
    lenLabel: "Questions per Round",
    difficulties: { all: "All Levels", easy: "Easy", medium: "Medium", hard: "Hard" },
    lengths: { 10: "10 Questions", 20: "20 Questions", all: "All Available" },
    startBtn: (n) => n > 0 ? `Start Round (${n} Questions)` : "No Questions Available",
    emptyWarn: "No questions loaded yet! Make sure your data files are saved in the same folder.",
    questionCount: (curr, total) => `Question ${curr} / ${total}`,
    pointsBadge: (p) => `${p} pts`,
    timerLabel: "⏱️ Time left",
    timeUp: "⏰ Time's up!",
    flagPrompt: "Which country does this flag belong to?",
    mapPrompt: (name) => `Find on the map: ${name}`,
    mapHint: "Scroll or use +/− to zoom, drag to pan, click a country to guess.",
    mapReset: "Reset",
    mapCorrectMsg: "✅ Spot on!",
    mapWrongMsg: (clickedName) => clickedName ? `❌ Not quite — you clicked ${clickedName}.` : "❌ Not quite — see the green highlight on the map.",
    didYouKnow: "💡 Did you know?",
    nextBtn: "Next Question →",
    finishBtn: "See Results →",
    resTitle: "Round Complete!",
    resPoints: (p) => `${p} Points`,
    resSub: (pct) => `You answered ${pct}% of the questions correctly.`,
    shareBtn: "📋 Copy Result to Share",
    shareCopied: "✅ Copied to Clipboard!",
    restartBtn: "Back to Menu",
    ranks: ["Keep Practicing!", "Solid Start!", "Trivia Pro!", "Grandmaster!"],
    legal: {
      imprintTitle: "Legal Notice / Impressum",
      imprintBody: `
        <p><strong>Information pursuant to § 5 DDG (Germany):</strong></p>
        <p>[Your First & Last Name]<br>[Street & House Number]<br>[Postal Code & City], Germany</p>
        <p><strong>Contact:</strong><br>Email: [your-email@example.com]</p>
        <p><em>Note: Replace these placeholders with your own contact details before publishing your website online.</em></p>
      `,
      privacyTitle: "Privacy Policy / Datenschutzerklärung",
      privacyBody: `
        <p><strong>1. General Information</strong><br>This quiz website runs directly in your browser. We do not require user accounts or store personal profiles on external servers.</p>
        <p><strong>2. External Content (Maps & Flag Images)</strong><br>Flag images are loaded via FlagCDN (flagcdn.com) and world map vector data via jsDelivr (cdn.jsdelivr.net). Technically, your IP address is transmitted to deliver these files.</p>
        <p><em>Note: Add Google AdSense or analytics disclosures here if you enable ads later.</em></p>
      `
    }
  },
  de: {
    tabs: {
      classic: "🎯 Klassisches Quiz",
      timed: "⚡ Zeit-Duell",
      flags: "🚩 Flaggen-Quiz",
      map: "🗺️ Länder finden"
    },
    modes: {
      classic: {
        title: "Klassisches Wissens-Quiz",
        sub: "Spiele ganz ohne Zeitdruck und entdecke spannende Fakten nach jeder Frage."
      },
      timed: {
        title: "⚡ Zeit-Duell (15 Sek. pro Frage)",
        sub: "Schlag die Uhr! Je schneller du antwortest, desto mehr Bonuspunkte (bis zu 150) bekommst du."
      },
      flags: {
        title: "🚩 Welt-Flaggen-Challenge",
        sub: "Erkennst du Länder auf der ganzen Welt allein anhand ihrer Nationalflagge?"
      },
      map: {
        title: "🗺️ Länder auf der Weltkarte finden",
        sub: "Suche das gesuchte Land auf der interaktiven Weltkarte und klicke es direkt an!"
      }
    },
    catLabel: "1. Kategorie wählen",
    diffLabel: "Schwierigkeitsgrad",
    lenLabel: "Rundenlänge",
    difficulties: { all: "Alle Stufen", easy: "Leicht", medium: "Mittel", hard: "Schwer" },
    lengths: { 10: "10 Fragen", 20: "20 Fragen", all: "Alle verfügbaren" },
    startBtn: (n) => n > 0 ? `Runde starten (${n} Fragen)` : "Keine Fragen verfügbar",
    emptyWarn: "Noch keine Fragen geladen! Bitte prüfe, ob alle Dateien im selben Ordner liegen.",
    questionCount: (curr, total) => `Frage ${curr} / ${total}`,
    pointsBadge: (p) => `${p} Pkt.`,
    timerLabel: "⏱️ Restzeit",
    timeUp: "⏰ Zeit abgelaufen!",
    flagPrompt: "Zu welchem Land gehört diese Flagge?",
    mapPrompt: (name) => `Finde auf der Weltkarte: ${name}`,
    mapHint: "Mausrad oder +/− zum Zoomen, Ziehen zum Verschieben, Land anklicken zum Raten.",
    mapReset: "Reset",
    mapCorrectMsg: "✅ Volltreffer!",
    mapWrongMsg: (clickedName) => clickedName ? `❌ Leider falsch — du hast auf ${clickedName} geklickt.` : "❌ Leider falsch — das gesuchte Land leuchtet grün.",
    didYouKnow: "💡 Wusstest du schon?",
    nextBtn: "Nächste Frage →",
    finishBtn: "Ergebnis ansehen →",
    resTitle: "Runde beendet!",
    resPoints: (p) => `${p} Punkte`,
    resSub: (pct) => `Du hast ${pct}% der Fragen richtig beantwortet.`,
    shareBtn: "📋 Ergebnis zum Teilen kopieren",
    shareCopied: "✅ In die Zwischenablage kopiert!",
    restartBtn: "Zurück zur Auswahl",
    ranks: ["Weiter üben!", "Solider Start!", "Quiz-Profi!", "Großmeister!"],
    legal: {
      imprintTitle: "Impressum",
      imprintBody: `
        <p><strong>Angaben gemäß § 5 DDG:</strong></p>
        <p>[Dein Vor- und Nachname]<br>[Straße und Hausnummer]<br>[PLZ und Ort]</p>
        <p><strong>Kontakt:</strong><br>E-Mail: [deine-email@beispiel.de]</p>
        <p><em>Hinweis: Trage hier deine echten Daten ein, bevor du die Seite öffentlich ins Netz stellst.</em></p>
      `,
      privacyTitle: "Datenschutzerklärung",
      privacyBody: `
        <p><strong>1. Datenschutz auf einen Blick</strong><br>Dieses Quiz läuft lokal in deinem Browser. Es werden keine Benutzerkonten oder Spielstände auf eigenen Servern gespeichert.</p>
        <p><strong>2. Einbindung von Karten- & Flaggen-Daten</strong><br>Flaggenbilder werden über FlagCDN (flagcdn.com) und Weltkarten-Vektordaten über jsDelivr (cdn.jsdelivr.net) geladen. Dabei wird technisch bedingt deine IP-Adresse an diese Server übermittelt.</p>
        <p><em>Hinweis: Falls du später Werbung (z. B. Google AdSense) einbindest, ergänze diesen Text entsprechend.</em></p>
      `
    }
  }
};

// =========================================================================
// 3. SPIELZUSTAND & LOGIK
// =========================================================================
let currentLang = "en";
let currentMode = "classic"; // "classic" | "timed" | "flags" | "map"
let selectedCategory = "all";
let selectedDifficulty = "all";
let selectedLength = 10;

let activeQuestions = [];
let currentIndex = 0;
let correctCount = 0;
let totalPoints = 0;
let streak = 0;
let answered = false;
let lastMapStatusHtml = "";

let timerInterval = null;
const QUESTION_TIME = 15.0;
let timeLeft = QUESTION_TIME;

// Weltkarten-Variablen
let mapInitialized = false;
let mapSvg = null;
let mapG = null;
let mapZoom = null;
let mapPath = null;
let mapFeatures = [];

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function setLanguage(lang) {
  currentLang = lang;
  document.getElementById("btn-en").classList.toggle("active", lang === "en");
  document.getElementById("btn-de").classList.toggle("active", lang === "de");

  updateNavTexts();
  renderHome();

  if (!document.getElementById("screen-quiz").classList.contains("hidden")) {
    renderQuestion(true);
  }
  if (!document.getElementById("screen-result").classList.contains("hidden")) {
    renderResults();
  }
}

function updateNavTexts() {
  const t = UI_STRINGS[currentLang];
  document.getElementById("tab-classic").textContent = t.tabs.classic;
  document.getElementById("tab-timed").textContent = t.tabs.timed;
  document.getElementById("tab-flags").textContent = t.tabs.flags;
  document.getElementById("tab-map").textContent = t.tabs.map;
  document.getElementById("ui-timer-label").textContent = t.timerLabel;
  document.getElementById("ui-map-hint").textContent = t.mapHint;
  document.getElementById("btn-map-reset").textContent = t.mapReset;
}

function switchMode(mode) {
  stopTimer();
  currentMode = mode;
  document.querySelectorAll(".nav-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.mode === mode);
  });
  goHome();
}

function getPool() {
  if (currentMode === "flags") {
    const list = typeof FLAGS_DATA !== "undefined" ? FLAGS_DATA : [];
    return list.filter(f => selectedDifficulty === "all" || f.difficulty === selectedDifficulty);
  }
  if (currentMode === "map") {
    const list = typeof COUNTRIES_DATA !== "undefined" ? COUNTRIES_DATA : [];
    return list.filter(c => selectedDifficulty === "all" || c.difficulty === selectedDifficulty);
  }
  const list = typeof QUIZ_DATA !== "undefined" ? QUIZ_DATA : [];
  return list.filter(item => {
    const catMatch = selectedCategory === "all" || item.category === selectedCategory;
    const diffMatch = selectedDifficulty === "all" || item.difficulty === selectedDifficulty;
    return catMatch && diffMatch;
  });
}

function renderHome() {
  const t = UI_STRINGS[currentLang];
  updateNavTexts();

  document.getElementById("ui-home-title").textContent = t.modes[currentMode].title;
  document.getElementById("ui-home-sub").textContent = t.modes[currentMode].sub;

  const hideCategories = currentMode === "flags" || currentMode === "map";
  const catSection = document.getElementById("category-section");
  if (hideCategories) {
    catSection.classList.add("hidden");
  } else {
    catSection.classList.remove("hidden");
    document.getElementById("ui-cat-label").textContent = t.catLabel;

    const catGrid = document.getElementById("category-grid");
    catGrid.innerHTML = "";
    CATEGORIES.forEach(cat => {
      const btn = document.createElement("button");
      btn.className = "cat-card" + (selectedCategory === cat.id ? " selected" : "");
      btn.innerHTML = `<span class="cat-icon">${cat.icon}</span><div class="cat-title">${cat[currentLang]}</div>`;
      btn.onclick = () => { selectedCategory = cat.id; renderHome(); };
      catGrid.appendChild(btn);
    });
  }

  const stepOffset = hideCategories ? 1 : 2;
  document.getElementById("ui-diff-label").textContent = `${stepOffset}. ${t.diffLabel}`;
  const diffRow = document.getElementById("diff-row");
  diffRow.innerHTML = "";
  ["all", "easy", "medium", "hard"].forEach(diff => {
    const btn = document.createElement("button");
    btn.className = "pill-btn" + (selectedDifficulty === diff ? " selected" : "");
    btn.textContent = t.difficulties[diff];
    btn.onclick = () => { selectedDifficulty = diff; renderHome(); };
    diffRow.appendChild(btn);
  });

  document.getElementById("ui-len-label").textContent = `${stepOffset + 1}. ${t.lenLabel}`;
  const lenRow = document.getElementById("len-row");
  lenRow.innerHTML = "";
  [10, 20, "all"].forEach(len => {
    const btn = document.createElement("button");
    btn.className = "pill-btn" + (selectedLength === len ? " selected" : "");
    btn.textContent = t.lengths[len];
    btn.onclick = () => { selectedLength = len; renderHome(); };
    lenRow.appendChild(btn);
  });

  const pool = getPool();
  const warnBox = document.getElementById("empty-warning");
  if (pool.length === 0 && selectedDifficulty === "all") {
    warnBox.textContent = t.emptyWarn;
    warnBox.classList.remove("hidden");
  } else {
    warnBox.classList.add("hidden");
  }

  const playableCount = selectedLength === "all" ? pool.length : Math.min(pool.length, selectedLength);
  const startBtn = document.getElementById("btn-start");
  startBtn.textContent = t.startBtn(playableCount);
  startBtn.disabled = playableCount === 0;
}

function buildFlagQuestion(flagItem) {
  const others = FLAGS_DATA.filter(f => f.code !== flagItem.code).sort(() => Math.random() - 0.5).slice(0, 3);
  const choices = [flagItem, ...others].sort(() => Math.random() - 0.5);
  const correctIdx = choices.findIndex(c => c.code === flagItem.code);
  return {
    isFlag: true,
    code: flagItem.code,
    difficulty: flagItem.difficulty,
    choices: choices,
    answer: correctIdx,
    en: { fact: flagItem.factEn },
    de: { fact: flagItem.factDe }
  };
}

function buildMapQuestion(countryItem) {
  return {
    isMap: true,
    countryId: countryItem.id,
    difficulty: countryItem.difficulty,
    en: { name: countryItem.en, fact: countryItem.factEn },
    de: { name: countryItem.de, fact: countryItem.factDe }
  };
}

async function startQuiz() {
  stopTimer();
  const pool = [...getPool()].sort(() => Math.random() - 0.5);
  const sliced = selectedLength === "all" ? pool : pool.slice(0, selectedLength);

  if (currentMode === "flags") {
    activeQuestions = sliced.map(buildFlagQuestion);
  } else if (currentMode === "map") {
    activeQuestions = sliced.map(buildMapQuestion);
  } else {
    activeQuestions = sliced;
  }

  currentIndex = 0;
  correctCount = 0;
  totalPoints = 0;
  streak = 0;

  document.getElementById("screen-home").classList.add("hidden");
  document.getElementById("screen-result").classList.add("hidden");
  document.getElementById("screen-quiz").classList.remove("hidden");

  if (currentMode === "map") {
    await ensureMapLoaded();
  }

  renderQuestion(false);
}

// =========================================================================
// 4. WELTKARTEN-LOGIK (SPOT THE COUNTRY)
// =========================================================================
async function ensureMapLoaded() {
  if (mapInitialized) return;
  const loadingEl = document.getElementById("map-loading");
  loadingEl.classList.remove("hidden");

  try {
    const world = await d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
    // Antarktis ausblenden für bessere Übersicht
    mapFeatures = topojson.feature(world, world.objects.countries).features.filter(f => String(f.id) !== "010");

    mapSvg = d3.select("#world-map");
    mapG = mapSvg.append("g");

    const projection = d3.geoNaturalEarth1()
      .scale(175)
      .translate([470, 265]);

    mapPath = d3.geoPath().projection(projection);

    mapG.selectAll("path")
      .data(mapFeatures)
      .enter()
      .append("path")
      .attr("d", mapPath)
      .attr("class", "country-path")
      .attr("data-id", d => String(d.id).padStart(3, "0"))
      .on("click", (event, d) => {
        const clickedId = String(d.id).padStart(3, "0");
        handleMapGuess(clickedId, d);
      });

    mapZoom = d3.zoom()
      .scaleExtent([1, 8])
      .clickDistance(4)
      .on("zoom", (event) => {
        mapG.attr("transform", event.transform);
      });

    mapSvg.call(mapZoom);
    mapInitialized = true;
    loadingEl.classList.add("hidden");
  } catch (err) {
    loadingEl.textContent = "Could not load world map. Please check your internet connection.";
  }
}

function zoomMap(factor) {
  if (!mapSvg || !mapZoom) return;
  mapSvg.transition().duration(250).call(mapZoom.scaleBy, factor);
}

function resetMapZoom() {
  if (!mapSvg || !mapZoom) return;
  mapSvg.transition().duration(350).call(mapZoom.transform, d3.zoomIdentity);
}

function focusCountryOnMap(targetId) {
  if (!mapSvg || !mapZoom || !mapPath) return;
  const feature = mapFeatures.find(f => String(f.id).padStart(3, "0") === targetId);
  if (!feature) return;

  const bounds = mapPath.bounds(feature);
  const dx = bounds[1][0] - bounds[0][0];
  const dy = bounds[1][1] - bounds[0][1];
  if (dx <= 0 || dy <= 0) return;

  const x = (bounds[0][0] + bounds[1][0]) / 2;
  const y = (bounds[0][1] + bounds[1][1]) / 2;
  const scale = Math.max(1.5, Math.min(4.5, 0.45 / Math.max(dx / 960, dy / 500)));
  const translate = [960 / 2 - scale * x, 500 / 2 - scale * y];

  mapSvg.transition().duration(650).call(
    mapZoom.transform,
    d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
  );
}

function getCountryNameById(id, fallbackFeature) {
  if (typeof COUNTRIES_DATA !== "undefined") {
    const found = COUNTRIES_DATA.find(c => c.id === id);
    if (found) return found[currentLang];
  }
  return fallbackFeature && fallbackFeature.properties ? fallbackFeature.properties.name : "";
}

function handleMapGuess(clickedId, clickedFeature) {
  if (answered) return;
  answered = true;

  const t = UI_STRINGS[currentLang];
  const item = activeQuestions[currentIndex];
  const targetId = item.countryId;

  // Farben auf der Karte setzen
  mapG.selectAll(".country-path")
    .classed("correct", d => String(d.id).padStart(3, "0") === targetId)
    .classed("wrong", d => clickedId !== targetId && String(d.id).padStart(3, "0") === clickedId);

  if (clickedId === targetId) {
    correctCount++;
    streak++;
    totalPoints += 100;
    lastMapStatusHtml = `<strong>${t.mapCorrectMsg}</strong> `;
  } else {
    streak = 0;
    const clickedName = getCountryNameById(clickedId, clickedFeature);
    lastMapStatusHtml = `<strong>${t.mapWrongMsg(clickedName)}</strong> `;
    focusCountryOnMap(targetId);
  }

  document.getElementById("ui-score").textContent = t.pointsBadge(totalPoints);
  document.getElementById("ui-streak").textContent = `🔥 ${streak}`;
  document.getElementById("progress-fill").style.width = `${((currentIndex + 1) / activeQuestions.length) * 100}%`;

  const expBox = document.getElementById("explanation-box");
  expBox.innerHTML = `${lastMapStatusHtml}<strong>${t.didYouKnow}</strong> ${item[currentLang].fact}`;
  expBox.style.display = "block";

  const nextBtn = document.getElementById("btn-next");
  nextBtn.textContent = currentIndex < activeQuestions.length - 1 ? t.nextBtn : t.finishBtn;
  document.getElementById("next-wrap").style.display = "block";
}

// =========================================================================
// 5. TIMER & FRAGEN-ANZEIGE
// =========================================================================
function startTimer() {
  stopTimer();
  timeLeft = QUESTION_TIME;
  updateTimerUI();

  timerInterval = setInterval(() => {
    timeLeft = Math.max(0, timeLeft - 0.1);
    updateTimerUI();
    if (timeLeft <= 0) {
      stopTimer();
      handleTimeout();
    }
  }, 100);
}

function updateTimerUI() {
  const pct = (timeLeft / QUESTION_TIME) * 100;
  const fill = document.getElementById("timer-fill");
  fill.style.width = `${pct}%`;
  fill.classList.toggle("danger", timeLeft <= 4.0);
  document.getElementById("ui-timer-sec").textContent = `${timeLeft.toFixed(1)}s`;
}

function renderQuestion(keepState) {
  const t = UI_STRINGS[currentLang];
  const item = activeQuestions[currentIndex];

  document.getElementById("ui-q-counter").textContent = t.questionCount(currentIndex + 1, activeQuestions.length);
  document.getElementById("ui-score").textContent = t.pointsBadge(totalPoints);
  document.getElementById("ui-streak").textContent = `🔥 ${streak}`;
  document.getElementById("progress-fill").style.width = `${((answered ? currentIndex + 1 : currentIndex) / activeQuestions.length) * 100}%`;

  const timerWrap = document.getElementById("timer-wrap");
  timerWrap.classList.toggle("hidden", currentMode !== "timed");

  const flagBox = document.getElementById("flag-box");
  const mapWrapper = document.getElementById("map-wrapper");
  const optionsList = document.getElementById("options-list");
  optionsList.innerHTML = "";

  if (item.isMap) {
    flagBox.classList.add("hidden");
    mapWrapper.classList.remove("hidden");
    document.getElementById("q-meta").textContent = `${t.tabs.map} • ${t.difficulties[item.difficulty]}`;
    document.getElementById("q-text").textContent = t.mapPrompt(item[currentLang].name);

    if (!keepState && mapG) {
      mapG.selectAll(".country-path").classed("correct", false).classed("wrong", false);
      resetMapZoom();
    }
  } else if (item.isFlag) {
    mapWrapper.classList.add("hidden");
    flagBox.classList.remove("hidden");
    document.getElementById("q-meta").textContent = `${t.tabs.flags} • ${t.difficulties[item.difficulty]}`;
    document.getElementById("q-text").textContent = t.flagPrompt;
    document.getElementById("flag-img").src = `https://flagcdn.com/w320/${item.code}.png`;

    item.choices.forEach((choice, idx) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = choice[currentLang];
      btn.onclick = () => handleAnswer(idx);
      optionsList.appendChild(btn);
    });
  } else {
    mapWrapper.classList.add("hidden");
    flagBox.classList.add("hidden");
    const qData = item[currentLang];
    const catObj = CATEGORIES.find(c => c.id === item.category);
    document.getElementById("q-meta").textContent = `${catObj[currentLang]} • ${t.difficulties[item.difficulty]}`;
    document.getElementById("q-text").textContent = qData.q;

    qData.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = opt;
      btn.onclick = () => handleAnswer(idx);
      optionsList.appendChild(btn);
    });
  }

  if (!keepState) {
    document.getElementById("explanation-box").style.display = "none";
    document.getElementById("next-wrap").style.display = "none";
    answered = false;
    lastMapStatusHtml = "";
    if (currentMode === "timed") startTimer();
  } else if (answered) {
    const expBox = document.getElementById("explanation-box");
    const prefix = item.isMap ? lastMapStatusHtml : "";
    expBox.innerHTML = `${prefix}<strong>${t.didYouKnow}</strong> ${item[currentLang].fact}`;
    document.getElementById("btn-next").textContent = currentIndex < activeQuestions.length - 1 ? t.nextBtn : t.finishBtn;
  }
}

function handleAnswer(selectedIdx) {
  if (answered) return;
  answered = true;
  stopTimer();

  const t = UI_STRINGS[currentLang];
  const item = activeQuestions[currentIndex];
  const correctIdx = item.isFlag ? item.answer : item[currentLang].answer;
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correctIdx) btn.classList.add("correct");
    else if (idx === selectedIdx) btn.classList.add("wrong");
  });

  if (selectedIdx === correctIdx) {
    correctCount++;
    streak++;
    const earned = currentMode === "timed" ? Math.max(50, Math.round(50 + (timeLeft / QUESTION_TIME) * 100)) : 100;
    totalPoints += earned;
  } else {
    streak = 0;
  }

  finishQuestionStep(t, item, false);
}

function handleTimeout() {
  if (answered) return;
  answered = true;
  streak = 0;

  const t = UI_STRINGS[currentLang];
  const item = activeQuestions[currentIndex];
  const correctIdx = item.isFlag ? item.answer : item[currentLang].answer;

  document.querySelectorAll(".option-btn").forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correctIdx) btn.classList.add("correct");
  });

  finishQuestionStep(t, item, true);
}

function finishQuestionStep(t, item, wasTimeout) {
  document.getElementById("ui-score").textContent = t.pointsBadge(totalPoints);
  document.getElementById("ui-streak").textContent = `🔥 ${streak}`;
  document.getElementById("progress-fill").style.width = `${((currentIndex + 1) / activeQuestions.length) * 100}%`;

  const prefix = wasTimeout ? `<strong>${t.timeUp}</strong> ` : "";
  const expBox = document.getElementById("explanation-box");
  expBox.innerHTML = `${prefix}<strong>${t.didYouKnow}</strong> ${item[currentLang].fact}`;
  expBox.style.display = "block";

  const nextBtn = document.getElementById("btn-next");
  nextBtn.textContent = currentIndex < activeQuestions.length - 1 ? t.nextBtn : t.finishBtn;
  document.getElementById("next-wrap").style.display = "block";
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < activeQuestions.length) {
    renderQuestion(false);
  } else {
    renderResults();
  }
}

function renderResults() {
  stopTimer();
  const t = UI_STRINGS[currentLang];
  document.getElementById("screen-quiz").classList.add("hidden");
  document.getElementById("screen-result").classList.remove("hidden");

  const total = activeQuestions.length;
  const pct = Math.round((correctCount / total) * 100);
  let rankIdx = 0;
  if (pct >= 90) rankIdx = 3;
  else if (pct >= 70) rankIdx = 2;
  else if (pct >= 40) rankIdx = 1;

  document.getElementById("ui-res-title").textContent = t.resTitle;
  document.getElementById("res-score").textContent = `${correctCount} / ${total}`;
  document.getElementById("res-points").textContent = t.resPoints(totalPoints);
  document.getElementById("res-rank").textContent = t.ranks[rankIdx];
  document.getElementById("res-sub").textContent = t.resSub(pct);
  document.getElementById("btn-share").textContent = t.shareBtn;
  document.getElementById("btn-restart").textContent = t.restartBtn;
}

function shareResult() {
  const t = UI_STRINGS[currentLang];
  const total = activeQuestions.length;
  const modeName = t.tabs[currentMode];
  const text = `🧠 BrainPulse (${modeName}): ${correctCount}/${total} (${totalPoints} pts) 🔥`;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      document.getElementById("btn-share").textContent = t.shareCopied;
    });
  }
}

function goHome() {
  stopTimer();
  document.getElementById("screen-quiz").classList.add("hidden");
  document.getElementById("screen-result").classList.add("hidden");
  document.getElementById("screen-home").classList.remove("hidden");
  renderHome();
}

// Legal Modal
function openLegal(type) {
  const legal = UI_STRINGS[currentLang].legal;
  document.getElementById("modal-title").textContent = type === "imprint" ? legal.imprintTitle : legal.privacyTitle;
  document.getElementById("modal-body").innerHTML = type === "imprint" ? legal.imprintBody : legal.privacyBody;
  document.getElementById("legal-modal").classList.remove("hidden");
}

function closeLegal() {
  document.getElementById("legal-modal").classList.add("hidden");
}

// Init
renderHome();