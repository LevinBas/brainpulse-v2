// =========================================================================
// 1. KATEGORIEN, MODI-KONFIGURATION & HELFER
// =========================================================================
const PINNED_MODES = ["classic", "flags", "map", "hol"];

const MODE_GROUPS = [
  {
    id: "trivia",
    en: "Knowledge, History & Deductions",
    de: "Wissen, Geschichte & Deduktion",
    modes: ["classic", "timed", "hol", "chrono", "dossier"]
  },
  {
    id: "flags_shapes",
    en: "Flags & Country Shapes",
    de: "Flaggen & Länder-Formen",
    modes: ["flags", "flagzoom", "silhouette", "missing"]
  },
  {
    id: "globe",
    en: "Interactive World Map & Travel",
    de: "Interaktive Weltkarte & Reisen",
    modes: ["map", "pinpoint", "radar", "border", "flight"]
  }
];

const CATEGORIES = [
  { id: "all", icon: "🌐", en: "All Categories", de: "Alle Kategorien" },
  { id: "general", icon: "💡", en: "General Knowledge", de: "Allgemeinwissen" },
  { id: "science", icon: "🔬", en: "Science & Tech", de: "Wissenschaft & Technik" },
  { id: "geography", icon: "🌍", en: "Geography", de: "Geographie" },
  { id: "history", icon: "🏛️", en: "History", de: "Geschichte" }
];

const HOL_CATEGORIES = [
  { id: "all", icon: "⚖️", en: "All Duels (Mix)", de: "Alle Duelle (Mix)" },
  { id: "population", icon: "👥", en: "Population", de: "Einwohnerzahl" },
  { id: "area", icon: "📐", en: "Land Area", de: "Landesfläche" },
  { id: "inventions", icon: "💡", en: "Inventions & History", de: "Erfindungen & Geschichte" }
];

const PINPOINT_CATEGORIES = [
  { id: "all", icon: "🌍", en: "All World Cities (Mix)", de: "Alle Weltstädte (Mix)" },
  { id: "capitals", icon: "🏛️", en: "Capitals Only", de: "Nur Hauptstädte" },
  { id: "cities", icon: "🏙️", en: "Non-Capital Metropolises", de: "Metropolen (Keine Hauptstädte)" }
];

function addQuestions(newList) {
  if (typeof QUIZ_DATA !== "undefined" && Array.isArray(newList)) {
    QUIZ_DATA.push(...newList);
  }
}

// =========================================================================
// 1B. FORTSCHRITT, ATLAS, DAILY SEED & STREAK-KALENDER (LOCALSTORAGE)
// =========================================================================
const STORAGE_KEY = "brainpulse_progress_v1";

function getTodaySeedStr() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function createSeededRng(seedStr) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return function () {
    h += 0x6d2b79f5;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle(list, rng) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getDefaultProgress() {
  return {
    atlas: {
      countries: {},   // id -> { seen, mastered, misses, lastDate }
      flags: {},       // code -> { seen, mastered, misses, lastDate }
      categories: {}   // catId -> { seen, mastered, misses, lastDate }
    },
    modes: {},         // modeId -> { bestScore, bestStreak, plays }
    calendar: {
      activeDays: [],  // ["2026-11-18", "2026-11-19"]
      dailyCompleted: {} // { "2026-11-19": { score, correct, total } }
    }
  };
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultProgress();
    const parsed = JSON.parse(raw);
    const def = getDefaultProgress();
    return {
      atlas: {
        countries: parsed?.atlas?.countries || {},
        flags: parsed?.atlas?.flags || {},
        categories: parsed?.atlas?.categories || {}
      },
      modes: parsed?.modes || {},
      calendar: {
        activeDays: Array.isArray(parsed?.calendar?.activeDays) ? parsed.calendar.activeDays : [],
        dailyCompleted: parsed?.calendar?.dailyCompleted || {}
      }
    };
  } catch (e) {
    return getDefaultProgress();
  }
}

let userProgress = loadProgress();

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userProgress));
  } catch (e) {}
}

function recordAtlasOutcome(bucketName, key, isSuccess) {
  if (!key) return;
  const bucket = userProgress.atlas[bucketName];
  if (!bucket) return;
  const today = getTodaySeedStr();
  const entry = bucket[key] || { seen: 0, mastered: false, misses: 0, lastDate: today };
  entry.seen += 1;
  entry.lastDate = today;
  if (isSuccess) {
    entry.mastered = true;
    entry.misses = Math.max(0, entry.misses - 1);
  } else {
    entry.misses += 1;
  }
  bucket[key] = entry;
  saveProgress();
}

function recordItemAtlas(item, isSuccess) {
  if (!item) return;
  if (item.category) recordAtlasOutcome("categories", item.category, isSuccess);
  if (item.isHol && item.subType) recordAtlasOutcome("categories", item.subType, isSuccess);
  if (item.isChrono) recordAtlasOutcome("categories", "inventions", isSuccess);

  if (item.code && (item.isFlag || item.isFlagZoom || item.isDossier)) {
    recordAtlasOutcome("flags", item.code.toLowerCase(), isSuccess);
  }
  if (item.countryId) {
    recordAtlasOutcome("countries", String(item.countryId).padStart(3, "0"), isSuccess);
  }
  if (item.startId) recordAtlasOutcome("countries", String(item.startId).padStart(3, "0"), isSuccess);
  if (item.endId) recordAtlasOutcome("countries", String(item.endId).padStart(3, "0"), isSuccess);
}

function recordModeRunStats(modeId, score, bestRunStreak, isDaily = false, dailySummary = null) {
  const today = getTodaySeedStr();
  if (!userProgress.calendar.activeDays.includes(today)) {
    userProgress.calendar.activeDays.push(today);
    userProgress.calendar.activeDays.sort();
  }

  const mStat = userProgress.modes[modeId] || { bestScore: 0, bestStreak: 0, plays: 0 };
  mStat.plays += 1;
  if (score > mStat.bestScore) mStat.bestScore = score;
  if (bestRunStreak > mStat.bestStreak) mStat.bestStreak = bestRunStreak;
  userProgress.modes[modeId] = mStat;

  if (isDaily && dailySummary) {
    const prevDaily = userProgress.calendar.dailyCompleted[today];
    if (!prevDaily || score > prevDaily.score) {
      userProgress.calendar.dailyCompleted[today] = dailySummary;
    }
  }

  saveProgress();
}

function computeCalendarStreaks() {
  const days = new Set(userProgress.calendar.activeDays || []);
  const now = new Date();
  const toIso = (dt) => `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;

  let currentStreak = 0;
  let cursor = new Date(now);
  if (!days.has(toIso(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (days.has(toIso(cursor))) {
    currentStreak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  const sorted = [...days].sort();
  let longestStreak = 0;
  let run = 0;
  let prevTime = null;
  for (const dStr of sorted) {
    const [y, m, d] = dStr.split("-").map(Number);
    const t = new Date(y, m - 1, d).getTime();
    if (prevTime !== null && Math.round((t - prevTime) / 86400000) === 1) {
      run += 1;
    } else {
      run = 1;
    }
    if (run > longestStreak) longestStreak = run;
    prevTime = t;
  }

  return { currentStreak, longestStreak, totalDays: days.size };
}

function getWeaknessCounts() {
  const countryWeakIds = Object.entries(userProgress.atlas.countries || {})
    .filter(([, v]) => (v.misses || 0) > 0 && !v.mastered)
    .map(([k]) => k);

  const flagWeakCodes = Object.entries(userProgress.atlas.flags || {})
    .filter(([, v]) => (v.misses || 0) > 0 && !v.mastered)
    .map(([k]) => k);

  const catWeakIds = Object.entries(userProgress.atlas.categories || {})
    .filter(([, v]) => (v.misses || 0) > 0 && !v.mastered)
    .map(([k]) => k);

  return {
    countries: countryWeakIds,
    flags: flagWeakCodes,
    categories: catWeakIds,
    total: countryWeakIds.length + flagWeakCodes.length + catWeakIds.length
  };
}

function buildWeaknessQuestions() {
  const weak = getWeaknessCounts();
  const questions = [];

  if (weak.countries.length > 0) {
    const allCountries = getAllCountries195();
    weak.countries.forEach(cid => {
      const c = allCountries.find(item => item.id === cid);
      if (c) questions.push(buildMapQuestion(c));
    });
  }

  if (weak.flags.length > 0 && typeof FLAGS_DATA !== "undefined") {
    weak.flags.forEach(code => {
      const f = FLAGS_DATA.find(item => item.code.toLowerCase() === code);
      if (f) questions.push(buildFlagQuestion(f));
    });
  }

  if (weak.categories.length > 0 && typeof QUIZ_DATA !== "undefined") {
    const catMatches = QUIZ_DATA.filter(q => weak.categories.includes(q.category)).slice(0, 8);
    questions.push(...catMatches);
  }

  return questions.sort(() => Math.random() - 0.5).slice(0, 15);
}

function buildDailySeedQuestions(seedStr) {
  const rng = createSeededRng(seedStr);
  const pool = [];

  if (typeof QUIZ_DATA !== "undefined" && QUIZ_DATA.length > 0) {
    seededShuffle(QUIZ_DATA, rng).slice(0, 4).forEach(q => pool.push(q));
  }
  if (typeof FLAGS_DATA !== "undefined" && FLAGS_DATA.length >= 4) {
    seededShuffle(FLAGS_DATA, rng).slice(0, 3).forEach(f => {
      const others = seededShuffle(FLAGS_DATA.filter(x => x.code !== f.code), rng).slice(0, 3);
      const choices = seededShuffle([f, ...others], rng);
      pool.push({
        isFlag: true,
        code: f.code,
        difficulty: f.difficulty,
        choices,
        answer: choices.findIndex(c => c.code === f.code),
        en: { fact: f.factEn },
        de: { fact: f.factDe }
      });
    });
  }
  const allCountries = getAllCountries195();
  if (allCountries.length > 0) {
    seededShuffle(allCountries, rng).slice(0, 3).forEach(c => {
      pool.push(buildMapQuestion(c));
    });
  }

  return seededShuffle(pool, rng).slice(0, 10);
}

// =========================================================================
// 2. ÜBERSETZUNGEN (ENGLISCH & DEUTSCH)
// =========================================================================
const UI_STRINGS = {
  en: {
    allModesBtn: (count) => `☰ All Modes (${count})`,
    activeBadge: "Active",
    tabs: {
      classic: "🎯 Classic Quiz",
      timed: "⚡ Time Attack",
      flags: "🚩 Flag Quiz",
      map: "🗺️ Spot the Country",
      hol: "⚖️ Higher or Lower",
      silhouette: "📐 Silhouettes",
      pinpoint: "📍 City Pinpoint",
      radar: "🌡️ Geo-Radar",
      chrono: "⏳ Chrono-Chain",
      border: "🔗 Border Route",
      flagzoom: "🔍 Flag Zoom",
      missing: "🧩 Missing Neighbor",
      dossier: "🕵️ 4-Clue Dossier",
      flight: "✈️ Flight Estimator"
    },
    modeShortDesc: {
      classic: "Relaxed trivia with fun facts",
      timed: "15s per question + speed bonus",
      hol: "Population, area & inventions",
      chrono: "Build a growing timeline (3 lives)",
      dossier: "Deduce the country with 4 clues",
      flags: "Identify world flags",
      flagzoom: "Hit the buzzer as the flag zooms out",
      silhouette: "Guess countries by outline",
      missing: "Which neighbor fits the gap?",
      map: "Click countries on the globe",
      pinpoint: "Drop a pin on world cities",
      radar: "Hot or cold in 6 radar pings",
      border: "Travel country-to-country by land",
      flight: "Estimate great-circle air distance"
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
      },
      hol: {
        title: "⚖️ Higher or Lower Duel",
        sub: "Two countries or historical inventions go head-to-head. Pick the winner!"
      },
      silhouette: {
        title: "📐 Country Silhouettes",
        sub: "Recognize countries purely by their geographic outline! In Hard mode, shapes are randomly rotated."
      },
      pinpoint: {
        title: "📍 City Pinpoint Challenge",
        sub: "Drop your pin on world capitals and famous non-capital cities. Closer guesses score up to 250 pts!"
      },
      radar: {
        title: "🌡️ Hot or Cold (Geo-Radar)",
        sub: "A secret city is hidden on the map. Use up to 6 thermal radar pings to triangulate it!"
      },
      chrono: {
        title: "⏳ Chrono-Chain (Timeline Stack)",
        sub: "Place inventions into the exact chronological slot on a growing timeline. 3 lives — how long will your chain get?"
      },
      border: {
        title: "🔗 Border Route (Overland Journey)",
        sub: "Travel from Start to Destination by clicking neighboring countries step-by-step. Match the shortest Par route for bonus points!"
      },
      flagzoom: {
        title: "🔍 Flag Zoom (Buzzer Mode)",
        sub: "A flag zooms out from an extreme close-up over 12 seconds. Hit the Buzzer early for up to 300 points!"
      },
      missing: {
        title: "🧩 Missing Neighbor Puzzle",
        sub: "Study the surrounding countries and coastline — which country fits right into the missing gap?"
      },
      dossier: {
        title: "🕵️ 4-Clue Country Dossier",
        sub: "Identify the mystery country using as few clues as possible (300 → 200 → 100 → 50 pts)!"
      },
      flight: {
        title: "✈️ Great-Circle Flight Estimator",
        sub: "Estimate the flight distance between two world cities, then watch D3 draw the true curved orthodrome route!"
      }
    },
    // Meta-Features (Atlas, Daily Seed, Streak Calendar)
    dailyBtn: (seed) => `📅 Daily Challenge (${seed})`,
    dailyDoneBadge: "✓ Done Today",
    dailyMetaLabel: (seed) => `📅 Daily Challenge • ${seed}`,
    weaknessBtn: (cnt) => cnt > 0 ? `🎯 Practice Mistakes (${cnt})` : "🎯 Practice Mistakes (0)",
    atlasModalBtn: "📊 Personal Atlas & Records",
    atlasModalTitle: "Personal Atlas, Records & Streak Calendar",
    atlasCountriesLabel: "Countries Mastered",
    atlasFlagsLabel: "Flags Mastered",
    atlasCatsLabel: "Topics Mastered",
    streakCurrentLabel: "Day Streak",
    streakBestLabel: "Best Streak",
    activeDaysLabel: "Active Days",
    modeRecordsTitle: "Best Score & Streak per Mode",
    calendarTitle: "Streak Calendar (Last 28 Days)",
    resetProgressBtn: "Reset Local Progress",
    resetConfirm: "Reset all saved progress, records, and calendar days?",
    statusUnknown: "Unknown",
    statusSeen: "Seen",
    statusMastered: "Mastered",
    catLabel: "1. Select Category",
    holCatLabel: "1. Select Duel Type",
    pinCatLabel: "1. Select City Type",
    diffLabel: "Select Difficulty",
    lenLabel: "Questions per Round",
    difficulties: { all: "All Levels (195)", easy: "Easy", medium: "Medium", hard: "Hard", extreme: "💀 Blind Map (195)" },
    lengths: { 10: "10 Questions", 20: "20 Questions", 50: "50 Questions", all: "All Available" },
    startBtn: (n) => n > 0 ? `Start Round (${n} Questions)` : "No Questions Available",
    startChronoBtn: "Start Chrono-Chain (3 Lives)",
    emptyWarn: "No questions loaded yet! Make sure your data files are saved in the same folder.",
    questionCount: (curr, total) => `Question ${curr} / ${total}`,
    chronoCount: (chainLen) => `Chain: ${chainLen} Cards`,
    pointsBadge: (p) => `${p} pts`,
    timerLabel: "⏱️ Time left",
    timeUp: "⏰ Time's up!",
    flagPrompt: "Which country does this flag belong to?",
    silhouettePrompt: "Which country has this geographic outline?",
    silhouetteRotatedBadge: "🔄 Rotated",
    mapPrompt: (name) => `Find on the map: ${name}`,
    pinpointPrompt: (city) => `Pinpoint on the map: ${city}`,
    radarPrompt: (typeLabel) => `Locate the hidden ${typeLabel} using Radar Pings!`,
    mapHint: "Scroll or use +/− to zoom, drag to pan, click a country to guess.",
    pinpointHint: "Zoom & pan freely, then click on the map to drop your pin!",
    radarHint: "Click anywhere to send a thermal radar ping (Ice Blue > 5,000 km → Red < 600 km → Hit ≤ 250 km).",
    borderHint: "Click a glowing neighboring country to advance your overland route!",
    flightHint: "Use the slider below to estimate the great-circle distance between the two cities.",
    chronoPrompt: "Where on the timeline does this invention belong?",
    chronoInsertHere: "➕ Insert here",
    chronoWrongSlot: (yearStr) => `❌ Wrong slot! It dates to ${yearStr} — placed in its true spot.`,
    chronoRightSlot: (yearStr, pts) => `✅ Spot on (${yearStr})! +${pts} pts`,
    chronoGameOver: (chainLen, pts) => `💔 Out of lives! Your Chrono-Chain reached ${chainLen} cards (${pts} pts).`,
    borderPrompt: (from, to) => `Travel overland: ${from} → ${to}`,
    borderHud: (steps, par) => `Steps taken: ${steps} • Shortest Par: ${par}`,
    borderUndo: "↩️ Undo Step",
    borderInvalidNeighbor: (name) => `⚠️ ${name} does not share a land border with your current country!`,
    borderWinMsg: (steps, par, pts) => steps <= par
      ? `🏆 Perfect Par Route (${steps}/${par} borders)! +${pts} pts!`
      : `🎯 Destination reached in ${steps} steps (Par: ${par}) — +${pts} pts!`,
    flagZoomPrompt: "Hit the buzzer as soon as you recognize this flag!",
    flagZoomBuzzer: (pts) => `🚨 BUZZER! Lock in (${pts} pts)`,
    flagZoomNowPick: (pts) => `🔒 Locked at ${pts} pts — pick the right country!`,
    missingPrompt: "Which country is missing from the center of this map?",
    dossierPrompt: "Which mystery country matches this dossier?",
    dossierRevealBtn: (nextPts) => `🔓 Reveal Next Clue (drops to ${nextPts} pts)`,
    dossierMaxClues: "All 4 clues revealed",
    dossierClueTitles: [
      "Clue 1 • Geography & Area",
      "Clue 2 • Rotated Silhouette",
      "Clue 3 • Population & Capital",
      "Clue 4 • National Flag"
    ],
    dossierLandlocked: "Landlocked country",
    dossierCoastal: "Coastal / Island country",
    dossierAreaText: (areaStr) => `Total area: approx. ${areaStr} km²`,
    dossierPopText: (popStr) => `Population: approx. ${popStr}`,
    dossierCapText: (cap) => `Capital city: ${cap}`,
    dossierWinMsg: (pts, name) => `🕵️ Case solved for +${pts} pts! It is ${name}.`,
    dossierLoseMsg: (name) => `❌ Wrong guess! The mystery country was ${name}.`,
    flightPrompt: (c1, c2) => `Great-circle distance: ${c1} ✈️ ${c2}`,
    flightLockBtn: (kmStr) => `✈️ Lock in Estimate (${kmStr})`,
    flightResultMsg: (guessStr, actualStr, errPct, pts) =>
      `✈️ Actual: ${actualStr} (Your guess: ${guessStr}, ${errPct}% off) — +${pts} pts!`,
    radarReady: "📡 Radar ready — click anywhere on the map for Ping #1!",
    radarPingsLeft: (rem, max) => `Pings left: ${rem} / ${max}`,
    radarZones: {
      hit: "🎯 TARGET LOCKED",
      scorching: "🔥 Scorching",
      hot: "♨️ Hot",
      warm: "☀️ Warm",
      cool: "❄️ Cool",
      freezing: "🧊 Freezing"
    },
    radarWarmer: "↗️ Warmer!",
    radarColder: "↘️ Colder!",
    radarSame: "➡️ Same distance",
    radarWinMsg: (pingNum, km, pts, city, country) => {
      const distStr = `${km.toLocaleString("en-US")} km`;
      const tier = pingNum === 1 ? "🏆 MEGA JACKPOT (Ping #1)!" : pingNum === 2 ? "💎 JACKPOT (Ping #2)!" : `🎯 Found on Ping #${pingNum}!`;
      return `${tier} ${city} (${country}) located within ${distStr} — +${pts} pts!`;
    },
    radarLoseMsg: (bestKm, city, country) => {
      const distStr = `${bestKm.toLocaleString("en-US")} km`;
      return `📡 Out of pings! The hidden city was ${city} (${country}) — your closest ping was ${distStr} away (0 pts).`;
    },
    mapReset: "Reset",
    mapCorrectMsg: "✅ Spot on!",
    mapWrongMsg: (clickedName) => clickedName ? `❌ Not quite — you clicked ${clickedName}.` : "❌ Not quite — see the green highlight on the map.",
    pinpointResultMsg: (km, pts, city, country) => {
      const distStr = `${km.toLocaleString("en-US")} km`;
      if (km <= 35) return `🎯 Bullseye! Only ${distStr} away from ${city} (${country}) — +${pts} pts!`;
      if (km <= 120) return `🔥 Spot on! ${distStr} away from ${city} (${country}) — +${pts} pts!`;
      if (km <= 350) return `👏 Great guess! ${distStr} away from ${city} (${country}) — +${pts} pts!`;
      if (km <= 800) return `👍 Solid! ${distStr} away from ${city} (${country}) — +${pts} pts.`;
      if (km <= 1600) return `🧭 Right region: ${distStr} away from ${city} (${country}) — +${pts} pts.`;
      return `🌍 Far off: ${distStr} away from ${city} (${country}) — 0 pts.`;
    },
    holPrompts: {
      population: "Which country has a larger population?",
      area: "Which country is larger in area?",
      inventions: "Which was invented or discovered earlier?"
    },
    holSubtitles: {
      population: "Population",
      area: "Total Area",
      inventions: "Invention / Discovery"
    },
    holCorrectMsg: "✅ Correct!",
    holWrongMsg: "❌ Wrong pick!",
    didYouKnow: "💡 Did you know?",
    nextBtn: "Next Question →",
    finishBtn: "See Results →",
    resTitle: "Round Complete!",
    resPoints: (p) => `${p} Points`,
    resSub: (pct) => `You answered ${pct}% of the questions correctly.`,
    resChronoSub: (len) => `You successfully sorted ${len} inventions onto your timeline!`,
    shareBtn: "📋 Copy Result to Share",
    shareCopied: "✅ Copied to Clipboard!",
    restartBtn: "Back to Menu",
    ranks: ["Keep Practicing!", "Solid Start!", "Trivia Pro!", "Grandmaster!"],
   legal: {
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
        <h4>3. Advertising (Google AdSense)</h4>
<p>This website uses Google AdSense, an advertising service provided by Google Ireland Limited. Google uses cookies and similar technologies to display relevant ads and measure ad performance. Personalized ads are only loaded after your explicit consent via our cookie banner.</p>
      `
    }
  },
  de: {
    allModesBtn: (count) => `☰ Alle Modi (${count})`,
    activeBadge: "Aktiv",
    tabs: {
      classic: "🎯 Klassisches Quiz",
      timed: "⚡ Zeit-Duell",
      flags: "🚩 Flaggen-Quiz",
      map: "🗺️ Länder finden",
      hol: "⚖️ Higher or Lower",
      silhouette: "📐 Länder-Umrisse",
      pinpoint: "📍 Städte-Pinpoint",
      radar: "🌡️ Geo-Radar",
      chrono: "⏳ Zeitstrahl-Stapel",
      border: "🔗 Grenz-Route",
      flagzoom: "🔍 Flaggen-Zoom",
      missing: "🧩 Lücken-Puzzle",
      dossier: "🕵️ 4-Hinweise-Steckbrief",
      flight: "✈️ Luftlinien-Schätzer"
    },
    modeShortDesc: {
      classic: "Entspanntes Wissen + Fakten",
      timed: "15 Sek. pro Frage + Zeitbonus",
      hol: "Einwohner, Fläche & Erfindungen",
      chrono: "Wachsende Zeitleiste (3 Leben)",
      dossier: "Land mit 4 Hinweisen kombinieren",
      flags: "Nationalflaggen erkennen",
      flagzoom: "Buzzer drücken beim Herauszoomen",
      silhouette: "Länder am Umriss erraten",
      missing: "Welcher Nachbar fehlt in der Mitte?",
      map: "Länder auf der Karte anklicken",
      pinpoint: "Pin auf Weltstädte setzen",
      radar: "Heiß oder Kalt in 6 Pings",
      border: "Über Nachbarländer von A nach B",
      flight: "Großkreis-Flugdistanz schätzen"
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
      },
      hol: {
        title: "⚖️ Higher or Lower (Größer oder Kleiner)",
        sub: "Zwei Länder oder historische Erfindungen treten direkt gegeneinander an. Wer gewinnt das Duell?"
      },
      silhouette: {
        title: "📐 Länder-Umrisse erraten",
        sub: "Erkennst du Länder allein an ihrer isolierten Silhouette? Im Schwer-Modus sind die Umrisse zufällig gedreht!"
      },
      pinpoint: {
        title: "📍 Städte-Pinpoint (Entfernungs-Quiz)",
        sub: "Setze deinen Pin auf Hauptstädte und bekannte Weltmetropolen. Je näher dran, desto mehr Punkte (bis zu 250)!"
      },
      radar: {
        title: "🌡️ Heiß oder Kalt (Geo-Radar)",
        sub: "Eine geheime Stadt ist auf der Weltkarte versteckt. Kreise sie mit 6 Radar-Pings ein!"
      },
      chrono: {
        title: "⏳ Zeitstrahl-Stapel (Chrono-Chain)",
        sub: "Sortiere neue Erfindungen in die exakt richtige Lücke einer wachsenden Zeitleiste ein. Drei Leben – wie lang wird deine Kette?"
      },
      border: {
        title: "🔗 Grenz-Route (Von A nach B reisen)",
        sub: "Reise vom Start- zum Zielland, indem du dich über direkte Nachbarländer durchklickst. Schaffst du den kürzesten Par-Wert?"
      },
      flagzoom: {
        title: "🔍 Flaggen-Zoom (Buzzer-Modus)",
        sub: "Eine Flagge zoomt über 12 Sekunden aus einem extremen Detailausschnitt heraus. Drücke früh auf den Buzzer für bis zu 300 Punkte!"
      },
      missing: {
        title: "🧩 Lücken-Puzzle (Fehlender Nachbar)",
        sub: "Analysiere die umliegenden Nachbarländer und Küstenlinien – welches Land passt genau in die Lücke?"
      },
      dossier: {
        title: "🕵️ 4-Hinweise-Steckbrief (Deduktions-Quiz)",
        sub: "Errate das geheimnisvolle Land mit so wenig Hinweisen wie möglich (300 → 200 → 100 → 50 Punkte)!"
      },
      flight: {
        title: "✈️ Luftlinien-Schätzer (Großkreis-Challenge)",
        sub: "Schätze die Luftlinie zwischen zwei Weltstädten per Regler – danach zeichnet D3 die gekrümmte Flugroute über den Globus!"
      }
    },
    // Meta-Features (Atlas, Daily Seed, Streak Calendar)
    dailyBtn: (seed) => `📅 Tages-Challenge (${seed})`,
    dailyDoneBadge: "✓ Heute erledigt",
    dailyMetaLabel: (seed) => `📅 Tages-Challenge • ${seed}`,
    weaknessBtn: (cnt) => cnt > 0 ? `🎯 Fehlschüsse üben (${cnt})` : "🎯 Fehlschüsse üben (0)",
    atlasModalBtn: "📊 Atlas, Rekorde & Kalender",
    atlasModalTitle: "Persönlicher Atlas, Bestleistungen & Streak-Kalender",
    atlasCountriesLabel: "Länder gemeistert",
    atlasFlagsLabel: "Flaggen gemeistert",
    atlasCatsLabel: "Themen gemeistert",
    streakCurrentLabel: "Aktuelle Serie",
    streakBestLabel: "Beste Serie",
    activeDaysLabel: "Aktive Tage",
    modeRecordsTitle: "Highscore & Beste Serie pro Modus",
    calendarTitle: "Streak-Kalender (Letzte 28 Tage)",
    resetProgressBtn: "Lokalen Fortschritt zurücksetzen",
    resetConfirm: "Gespeicherten Fortschritt, Rekorde und Kalenderdaten wirklich löschen?",
    statusUnknown: "Unbekannt",
    statusSeen: "Gesehen",
    statusMastered: "Gemeistert",
    catLabel: "1. Kategorie wählen",
    holCatLabel: "1. Duell-Art wählen",
    pinCatLabel: "1. Städte-Auswahl",
    diffLabel: "Schwierigkeitsgrad",
    lenLabel: "Rundenlänge",
    difficulties: { all: "Alle Länder (195)", easy: "Leicht", medium: "Mittel", hard: "Schwer", extreme: "💀 Ohne Grenzen (195)" },
    lengths: { 10: "10 Fragen", 20: "20 Fragen", 50: "50 Fragen", all: "Alle verfügbaren" },
    startBtn: (n) => n > 0 ? `Runde starten (${n} Fragen)` : "Keine Fragen verfügbar",
    startChronoBtn: "Zeitstrahl starten (3 Leben)",
    emptyWarn: "Noch keine Fragen geladen! Bitte prüfe, ob alle Dateien im selben Ordner liegen.",
    questionCount: (curr, total) => `Frage ${curr} / ${total}`,
    chronoCount: (chainLen) => `Kette: ${chainLen} Karten`,
    pointsBadge: (p) => `${p} Pkt.`,
    timerLabel: "⏱️ Restzeit",
    timeUp: "⏰ Zeit abgelaufen!",
    flagPrompt: "Zu welchem Land gehört diese Flagge?",
    silhouettePrompt: "Welches Land hat diesen Umriss?",
    silhouetteRotatedBadge: "🔄 Gedreht",
    mapPrompt: (name) => `Finde auf der Weltkarte: ${name}`,
    pinpointPrompt: (city) => `Setze den Pin auf: ${city}`,
    radarPrompt: (typeLabel) => `Finde die geheime ${typeLabel} per Geo-Radar!`,
    mapHint: "Mausrad oder +/− zum Zoomen, Ziehen zum Verschieben, Land anklicken zum Raten.",
    pinpointHint: "Zoome und verschiebe die Karte frei, klicke dann auf den gesuchten Ort!",
    radarHint: "Klicke auf die Karte für einen Radar-Ping (Eisblau > 5.000 km → Glutrot < 600 km → Treffer ≤ 250 km).",
    borderHint: "Klicke auf ein angrenzendes Nachbarland, um deine Route fortzusetzen!",
    flightHint: "Nutze den Schieberegler unten, um die Luftlinie zwischen beiden Städten zu schätzen.",
    chronoPrompt: "In welche Lücke des Zeitstrahls gehört diese Erfindung?",
    chronoInsertHere: "➕ Hier einfügen",
    chronoWrongSlot: (yearStr) => `❌ Falsche Lücke! Datierung: ${yearStr} – an der richtigen Stelle einsortiert.`,
    chronoRightSlot: (yearStr, pts) => `✅ Exakt einsortiert (${yearStr})! +${pts} Pkt.`,
    chronoGameOver: (chainLen, pts) => `💔 Alle 3 Leben verbraucht! Dein Zeitstrahl hat ${chainLen} Karten erreicht (${pts} Pkt.).`,
    borderPrompt: (from, to) => `Reise auf dem Landweg: ${from} → ${to}`,
    borderHud: (steps, par) => `Bisherige Schritte: ${steps} • Kürzester Par-Wert: ${par}`,
    borderUndo: "↩️ Schritt zurück",
    borderInvalidNeighbor: (name) => `⚠️ ${name} hat keine direkte Landesgrenze zu deinem aktuellen Land!`,
    borderWinMsg: (steps, par, pts) => steps <= par
      ? `🏆 Perfekte Par-Route (${steps}/${par} Grenzen)! +${pts} Pkt.!`
      : `🎯 Ziel in ${steps} Schritten erreicht (Par: ${par}) — +${pts} Pkt.!`,
    flagZoomPrompt: "Drücke den Buzzer, sobald du die Flagge erkennst!",
    flagZoomBuzzer: (pts) => `🚨 BUZZER! Einloggen (${pts} Pkt.)`,
    flagZoomNowPick: (pts) => `🔒 Eingeloggt bei ${pts} Pkt. — wähle das richtige Land!`,
    missingPrompt: "Welches Land fehlt in der Mitte dieses Kartenausschnitts?",
    dossierPrompt: "Welches geheimnisvolle Land verbirgt sich hinter diesem Steckbrief?",
    dossierRevealBtn: (nextPts) => `🔓 Nächsten Hinweis aufdecken (sinkt auf ${nextPts} Pkt.)`,
    dossierMaxClues: "Alle 4 Hinweise aufgedeckt",
    dossierClueTitles: [
      "Hinweis 1 • Geographie & Fläche",
      "Hinweis 2 • Gedrehte Länder-Silhouette",
      "Hinweis 3 • Einwohner & Hauptstadt",
      "Hinweis 4 • Nationalflagge"
    ],
    dossierLandlocked: "Binnenstaat (kein Meereszugang)",
    dossierCoastal: "Küsten- oder Inselstaat",
    dossierAreaText: (areaStr) => `Landesfläche: ca. ${areaStr} km²`,
    dossierPopText: (popStr) => `Einwohnerzahl: ca. ${popStr}`,
    dossierCapText: (cap) => `Hauptstadt: ${cap}`,
    dossierWinMsg: (pts, name) => `🕵️ Fall gelöst für +${pts} Pkt.! Gesucht war ${name}.`,
    dossierLoseMsg: (name) => `❌ Leider daneben! Das gesuchte Land war ${name}.`,
    flightPrompt: (c1, c2) => `Luftlinie schätzen: ${c1} ✈️ ${c2}`,
    flightLockBtn: (kmStr) => `✈️ Schätzung einloggen (${kmStr})`,
    flightResultMsg: (guessStr, actualStr, errPct, pts) =>
      `✈️ Echte Luftlinie: ${actualStr} (Dein Tipp: ${guessStr}, ${errPct}% Abweichung) — +${pts} Pkt.!`,
    radarReady: "📡 Radar bereit — klicke auf die Karte für Ping #1!",
    radarPingsLeft: (rem, max) => `Verbleibende Pings: ${rem} / ${max}`,
    radarZones: {
      hit: "🎯 ZIEL ERFASST",
      scorching: "🔥 Glutrot",
      hot: "♨️ Heiß",
      warm: "☀️ Warm",
      cool: "❄️ Kühl",
      freezing: "🧊 Eisblau"
    },
    radarWarmer: "↗️ Wärmer!",
    radarColder: "↘️ Kälter!",
    radarSame: "➡️ Gleiche Distanz",
    radarWinMsg: (pingNum, km, pts, city, country) => {
      const distStr = `${km.toLocaleString("de-DE")} km`;
      const tier = pingNum === 1 ? "🏆 MEGA-JACKPOT (Ping #1)!" : pingNum === 2 ? "💎 JACKPOT (Ping #2)!" : `🎯 Gefunden mit Ping #${pingNum}!`;
      return `${tier} ${city} (${country}) auf ${distStr} aufgespürt — +${pts} Pkt.!`;
    },
    radarLoseMsg: (bestKm, city, country) => {
      const distStr = `${bestKm.toLocaleString("de-DE")} km`;
      return `📡 Alle 6 Pings verbraucht! Gesucht war ${city} (${country}) – dein bester Ping lag ${distStr} entfernt (0 Pkt.).`;
    },
    mapReset: "Reset",
    mapCorrectMsg: "✅ Volltreffer!",
    mapWrongMsg: (clickedName) => clickedName ? `❌ Leider falsch — du hast auf ${clickedName} geklickt.` : "❌ Leider falsch — das gesuchte Land leuchtet grün.",
    pinpointResultMsg: (km, pts, city, country) => {
      const distStr = `${km.toLocaleString("de-DE")} km`;
      if (km <= 35) return `🎯 Volltreffer! Nur ${distStr} von ${city} (${country}) entfernt — +${pts} Pkt.!`;
      if (km <= 120) return `🔥 Extrem nah! ${distStr} von ${city} (${country}) entfernt — +${pts} Pkt.!`;
      if (km <= 350) return `👏 Stark getippt! ${distStr} von ${city} (${country}) entfernt — +${pts} Pkt.!`;
      if (km <= 800) return `👍 Solide! ${distStr} von ${city} (${country}) entfernt — +${pts} Pkt.`;
      if (km <= 1600) return `🧭 Richtige Region: ${distStr} von ${city} (${country}) entfernt — +${pts} Pkt.`;
      return `🌍 Weit daneben: ${distStr} von ${city} (${country}) entfernt — 0 Pkt.`;
    },
    holPrompts: {
      population: "Welches Land hat mehr Einwohner?",
      area: "Welches Land ist flächenmäßig größer?",
      inventions: "Was wurde früher erfunden oder entdeckt?"
    },
    holSubtitles: {
      population: "Einwohnerzahl",
      area: "Landesfläche",
      inventions: "Erfindung / Entdeckung"
    },
    holCorrectMsg: "✅ Richtig getippt!",
    holWrongMsg: "❌ Leider daneben!",
    didYouKnow: "💡 Wusstest du schon?",
    nextBtn: "Nächste Frage →",
    finishBtn: "Ergebnis ansehen →",
    resTitle: "Runde beendet!",
    resPoints: (p) => `${p} Punkte`,
    resSub: (pct) => `Du hast ${pct}% der Fragen richtig beantwortet.`,
    resChronoSub: (len) => `Du hast ${len} Erfindungen erfolgreich in deinen Zeitstrahl einsortiert!`,
    shareBtn: "📋 Ergebnis zum Teilen kopieren",
    shareCopied: "✅ In die Zwischenablage kopiert!",
    restartBtn: "Zurück zur Auswahl",
ranks: ["Weiter üben!", "Solider Start!", "Quiz-Profi!", "Großmeister!"],
    legal: {
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
    }
  }
};

// =========================================================================
// 3. SPIELZUSTAND & HYBRID-NAVIGATION
// =========================================================================
const RADAR_MAX_PINGS = 6;
const RADAR_HIT_KM = 250;
const DOSSIER_POINTS = [300, 200, 100, 50];

let currentLang = "en";
let currentMode = "classic";
let isModesMenuOpen = false;
let selectedCategory = "all";
let selectedHolCategory = "all";
let selectedPinpointCategory = "all";
let selectedDifficulty = "all";
let selectedLength = 10;

let activeQuestions = [];
let currentIndex = 0;
let correctCount = 0;
let totalPoints = 0;
let streak = 0;
let bestRunStreak = 0;
let isDailySession = false;
let dailySeedValue = null;
let isWeaknessSession = false;
let answered = false;
let lastStatusHtml = "";

// Chrono-Chain Zustand
let chronoState = null;

// Timer & Flag-Zoom Zustand
let timerInterval = null;
const QUESTION_TIME = 15.0;
let timeLeft = QUESTION_TIME;
let flagZoomAnimId = null;

// Weltkarten-, Nachbarschafts- & Geometrie-Variablen
let worldAtlasData = null;
let mapFeatures = [];
let countryNeighborsMap = {};
let mapInitialized = false;
let mapSvg = null;
let mapG = null;
let pinpointLayer = null;
let radarLayer = null;
let flightLayer = null;
let mapZoom = null;
let mapProjection = null;
let mapPath = null;

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  if (flagZoomAnimId) {
    cancelAnimationFrame(flagZoomAnimId);
    flagZoomAnimId = null;
  }
}

function injectMetaFeatureStyles() {
  if (document.getElementById("meta-feature-styles")) return;
  const style = document.createElement("style");
  style.id = "meta-feature-styles";
  style.textContent = `
    .meta-actions-bar {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
      margin-top: 14px;
    }
    @media (max-width: 640px) {
      .meta-actions-bar {
        grid-template-columns: 1fr;
      }
    }
    .meta-action-btn {
      background: #1e293b;
      border: 1.5px solid #334155;
      color: #f8fafc;
      border-radius: 12px;
      padding: 10px 12px;
      font-weight: 700;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.16s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .meta-action-btn:hover:not(:disabled) {
      border-color: #38bdf8;
      background: #263449;
      transform: translateY(-1px);
    }
    .meta-action-btn:disabled {
      opacity: 0.5;
      cursor: default;
    }
    .meta-action-btn.daily-done {
      border-color: #22c55e;
      color: #4ade80;
    }
    .atlas-summary-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
      margin-bottom: 16px;
    }
    .atlas-stat-box {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 10px 12px;
      text-align: center;
    }
    .atlas-stat-num {
      font-size: 1.25rem;
      font-weight: 800;
      color: #38bdf8;
    }
    .atlas-stat-lbl {
      font-size: 0.75rem;
      color: #94a3b8;
      margin-top: 2px;
    }
    .streak-cal-grid {
      display: grid;
      grid-template-columns: repeat(14, 1fr);
      gap: 5px;
      margin: 10px 0 18px;
    }
    .streak-day-cell {
      height: 22px;
      border-radius: 5px;
      background: #1e293b;
      border: 1px solid #334155;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.65rem;
      color: #64748b;
    }
    .streak-day-cell.active {
      background: rgba(34, 197, 94, 0.28);
      border-color: #22c55e;
      color: #4ade80;
      font-weight: 800;
    }
    .streak-day-cell.daily {
      box-shadow: inset 0 0 0 1px #38bdf8;
    }
    .mode-records-list {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
      margin-top: 8px;
      margin-bottom: 16px;
    }
    @media (max-width: 580px) {
      .mode-records-list {
        grid-template-columns: 1fr;
      }
    }
    .mode-record-row {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 10px;
      padding: 8px 11px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.82rem;
    }
  `;
  document.head.appendChild(style);
}

function injectHybridNavStyles() {
  if (document.getElementById("hybrid-nav-styles")) return;
  const style = document.createElement("style");
  style.id = "hybrid-nav-styles";
  style.textContent = `
    #hybrid-nav-container {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      gap: 10px !important;
      overflow: visible !important;
      position: relative !important;
      flex-wrap: wrap !important;
    }
    .nav-pinned-group {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }
    .nav-dropdown-wrap {
      position: relative;
      margin-left: auto;
    }
    .nav-all-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-weight: 700;
      border: 1px solid #475569;
      background: #1e293b;
      color: #f8fafc;
      padding: 8px 14px;
      border-radius: 10px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.18s ease;
      white-space: nowrap;
    }
    .nav-all-btn:hover {
      border-color: #38bdf8;
      background: #263449;
    }
    .nav-all-btn.active {
      background: linear-gradient(135deg, #2563eb, #3b82f6);
      border-color: #60a5fa;
      color: #ffffff;
      box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
    }
    .nav-chevron {
      font-size: 0.72rem;
      transition: transform 0.2s ease;
      opacity: 0.85;
    }
    .nav-all-btn.open .nav-chevron {
      transform: rotate(180deg);
    }
    .modes-dropdown-panel {
      position: absolute;
      right: 0;
      top: calc(100% + 10px);
      width: min(740px, 94vw);
      max-height: 82vh;
      overflow-y: auto;
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 16px;
      box-shadow: 0 24px 54px rgba(0, 0, 0, 0.72);
      z-index: 1200;
      animation: navDropFade 0.15s ease-out;
    }
    @keyframes navDropFade {
      from { opacity: 0; transform: translateY(-6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .modes-group-block + .modes-group-block {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid #1e293b;
    }
    .modes-group-title {
      font-size: 0.72rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #94a3b8;
      margin-bottom: 8px;
      padding-left: 2px;
    }
    .modes-dropdown-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    @media (max-width: 600px) {
      .modes-dropdown-grid {
        grid-template-columns: 1fr;
      }
      .nav-pinned-group .nav-tab {
        padding: 7px 10px;
        font-size: 0.82rem;
      }
    }
    .mode-menu-item {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      text-align: left;
      background: #1e293b;
      border: 1.5px solid #293548;
      border-radius: 12px;
      padding: 9px 11px;
      color: #f8fafc;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .mode-menu-item:hover {
      background: #263449;
      border-color: #38bdf8;
      transform: translateY(-1px);
    }
    .mode-menu-item.selected {
      background: rgba(56, 189, 248, 0.14);
      border-color: #38bdf8;
    }
    .mode-menu-icon {
      font-size: 1.4rem;
      line-height: 1;
      flex-shrink: 0;
    }
    .mode-menu-text {
      min-width: 0;
      flex: 1;
    }
    .mode-menu-title {
      font-size: 0.88rem;
      font-weight: 700;
      color: #f8fafc;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
    }
    .mode-menu-desc {
      font-size: 0.74rem;
      color: #94a3b8;
      margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .mode-active-pill {
      font-size: 0.66rem;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: 999px;
      background: #38bdf8;
      color: #0f172a;
      flex-shrink: 0;
    }
  `;
  document.head.appendChild(style);
}

function toggleModesMenu(event) {
  if (event) event.stopPropagation();
  isModesMenuOpen = !isModesMenuOpen;
  renderHybridNavigation();
}

function closeModesMenu() {
  if (!isModesMenuOpen) return;
  isModesMenuOpen = false;
  renderHybridNavigation();
}

function renderHybridNavigation() {
  injectHybridNavStyles();
  const t = UI_STRINGS[currentLang];

  let navContainer = document.getElementById("hybrid-nav-container");
  if (!navContainer) {
    const firstTab = document.querySelector(".nav-tab");
    if (!firstTab || !firstTab.parentElement) return;
    navContainer = firstTab.parentElement;
    navContainer.id = "hybrid-nav-container";
    if (navContainer.parentElement) {
      navContainer.parentElement.style.overflow = "visible";
    }
  }

  const totalModesCount = Object.keys(t.tabs).length;
  const isPinnedActive = PINNED_MODES.includes(currentMode);

  let pinnedHtml = `<div class="nav-pinned-group">`;
  PINNED_MODES.forEach(modeId => {
    const activeCls = currentMode === modeId ? " active" : "";
    pinnedHtml += `<button class="nav-tab${activeCls}" id="tab-${modeId}" data-mode="${modeId}" onclick="switchMode('${modeId}')">${t.tabs[modeId]}</button>`;
  });
  pinnedHtml += `</div>`;

  const dropdownBtnLabel = isPinnedActive
    ? t.allModesBtn(totalModesCount)
    : `${t.tabs[currentMode]}`;
  const dropdownBtnActiveCls = !isPinnedActive ? " active" : "";
  const dropdownBtnOpenCls = isModesMenuOpen ? " open" : "";

  let panelHtml = "";
  if (isModesMenuOpen) {
    panelHtml += `<div class="modes-dropdown-panel" id="modes-dropdown-panel" onclick="event.stopPropagation()">`;
    MODE_GROUPS.forEach(group => {
      panelHtml += `<div class="modes-group-block">`;
      panelHtml += `<div class="modes-group-title">${group[currentLang]}</div>`;
      panelHtml += `<div class="modes-dropdown-grid">`;
      group.modes.forEach(modeId => {
        const fullLabel = t.tabs[modeId] || modeId;
        const spaceIdx = fullLabel.indexOf(" ");
        const icon = spaceIdx > 0 ? fullLabel.slice(0, spaceIdx) : "🎮";
        const title = spaceIdx > 0 ? fullLabel.slice(spaceIdx + 1) : fullLabel;
        const isCurrent = currentMode === modeId;
        const badge = isCurrent ? `<span class="mode-active-pill">${t.activeBadge}</span>` : "";

        panelHtml += `
          <button class="mode-menu-item${isCurrent ? " selected" : ""}" onclick="switchMode('${modeId}')">
            <span class="mode-menu-icon">${icon}</span>
            <div class="mode-menu-text">
              <div class="mode-menu-title"><span>${title}</span>${badge}</div>
              <div class="mode-menu-desc">${t.modeShortDesc[modeId] || ""}</div>
            </div>
          </button>
        `;
      });
      panelHtml += `</div></div>`;
    });
    panelHtml += `</div>`;
  }

  const dropdownHtml = `
    <div class="nav-dropdown-wrap">
      <button class="nav-all-btn${dropdownBtnActiveCls}${dropdownBtnOpenCls}" id="btn-all-modes" onclick="toggleModesMenu(event)">
        <span>${dropdownBtnLabel}</span>
        <span class="nav-chevron">▼</span>
      </button>
      ${panelHtml}
    </div>
  `;

  navContainer.innerHTML = pinnedHtml + dropdownHtml;
}

document.addEventListener("click", (event) => {
  if (!isModesMenuOpen) return;
  if (!event.target.closest(".nav-dropdown-wrap")) {
    closeModesMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && isModesMenuOpen) {
    closeModesMenu();
  }
});

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
  renderHybridNavigation();
  document.getElementById("ui-timer-label").textContent = t.timerLabel;
  document.getElementById("btn-map-reset").textContent = t.mapReset;
}

function switchMode(mode) {
  stopTimer();
  isModesMenuOpen = false;
  currentMode = mode;
  const blindModes = ["map", "pinpoint", "radar"];
  if (!blindModes.includes(currentMode) && selectedDifficulty === "extreme") {
    selectedDifficulty = "all";
  }
  goHome();
}

function getAllCountries195() {
  return typeof COUNTRIES_WORLD_195 !== "undefined"
    ? COUNTRIES_WORLD_195
    : (typeof COUNTRIES_DATA !== "undefined" ? COUNTRIES_DATA : []);
}

function getPool() {
  if (currentMode === "flags" || currentMode === "flagzoom") {
    const list = typeof FLAGS_DATA !== "undefined" ? FLAGS_DATA : [];
    return list.filter(f => selectedDifficulty === "all" || f.difficulty === selectedDifficulty);
  }
  if (currentMode === "map") {
    const allCountries = getAllCountries195();
    if (selectedDifficulty === "all" || selectedDifficulty === "extreme") return allCountries;
    return allCountries.filter(c => c.difficulty === selectedDifficulty);
  }
  if (currentMode === "silhouette") {
    const allCountries = getAllCountries195();
    return allCountries.filter(c => selectedDifficulty === "all" || c.difficulty === selectedDifficulty);
  }
  if (currentMode === "missing" || currentMode === "border") {
    const allCountries = getAllCountries195();
    return allCountries.filter(c => selectedDifficulty === "all" || c.difficulty === selectedDifficulty);
  }
  if (currentMode === "dossier") {
    const holCountries = typeof HOL_COUNTRIES !== "undefined" ? HOL_COUNTRIES : [];
    const allCountries = getAllCountries195();
    const validIds = new Set(allCountries.map(c => c.id));
    return holCountries.filter(hc => {
      const id = getHolCountryNumericId(hc);
      if (!id || !validIds.has(id)) return false;
      const cMeta = allCountries.find(c => c.id === id);
      return selectedDifficulty === "all" || (cMeta && cMeta.difficulty === selectedDifficulty);
    });
  }
  if (currentMode === "pinpoint" || currentMode === "radar") {
    const list = typeof PINPOINT_CITIES !== "undefined" ? PINPOINT_CITIES : [];
    return list.filter(city => {
      const catMatch = selectedPinpointCategory === "all" ||
        (selectedPinpointCategory === "capitals" && city.type === "capital") ||
        (selectedPinpointCategory === "cities" && city.type === "city");
      const diffMatch = selectedDifficulty === "all" || selectedDifficulty === "extreme" || city.difficulty === selectedDifficulty;
      return catMatch && diffMatch;
    });
  }
  if (currentMode === "flight") {
    const list = typeof PINPOINT_CITIES !== "undefined" ? PINPOINT_CITIES : [];
    return list.filter(city => {
      const catMatch = selectedPinpointCategory === "all" ||
        (selectedPinpointCategory === "capitals" && city.type === "capital") ||
        (selectedPinpointCategory === "cities" && city.type === "city");
      const diffMatch = selectedDifficulty === "all" || city.difficulty === selectedDifficulty;
      return catMatch && diffMatch;
    });
  }
  if (currentMode === "chrono") {
    return typeof HOL_INVENTIONS !== "undefined" ? HOL_INVENTIONS : [];
  }
  if (currentMode === "hol") {
    const hasCountries = typeof HOL_COUNTRIES !== "undefined" && HOL_COUNTRIES.length >= 2;
    const hasInventions = typeof HOL_INVENTIONS !== "undefined" && HOL_INVENTIONS.length >= 2;
    if (!hasCountries && !hasInventions) return [];
    return Array.from({ length: 100 }, (_, i) => i);
  }
  const list = typeof QUIZ_DATA !== "undefined" ? QUIZ_DATA : [];
  return list.filter(item => {
    const catMatch = selectedCategory === "all" || item.category === selectedCategory;
    const diffMatch = selectedDifficulty === "all" || item.difficulty === selectedDifficulty;
    return catMatch && diffMatch;
  });
}

function renderMetaActionsBar() {
  injectMetaFeatureStyles();
  const t = UI_STRINGS[currentLang];
  const startBtn = document.getElementById("btn-start");
  if (!startBtn || !startBtn.parentElement) return;

  let bar = document.getElementById("meta-actions-bar");
  if (!bar) {
    bar = document.createElement("div");
    bar.id = "meta-actions-bar";
    bar.className = "meta-actions-bar";
    startBtn.parentElement.insertBefore(bar, startBtn.nextSibling);
  }

  const todaySeed = getTodaySeedStr();
  const dailyDone = Boolean(userProgress.calendar.dailyCompleted?.[todaySeed]);
  const weak = getWeaknessCounts();

  bar.innerHTML = `
    <button class="meta-action-btn${dailyDone ? " daily-done" : ""}" onclick="startDailyChallenge()">
      <span>${t.dailyBtn(todaySeed)}</span>
      ${dailyDone ? `<span>(${t.dailyDoneBadge})</span>` : ""}
    </button>
    <button class="meta-action-btn" ${weak.total > 0 ? "" : "disabled"} onclick="startWeaknessTraining()">
      <span>${t.weaknessBtn(weak.total)}</span>
    </button>
    <button class="meta-action-btn" onclick="openAtlasModal()">
      <span>${t.atlasModalBtn}</span>
    </button>
  `;
}

function openAtlasModal() {
  injectMetaFeatureStyles();
  const t = UI_STRINGS[currentLang];

  const allCountries = getAllCountries195();
  const allFlags = typeof FLAGS_DATA !== "undefined" ? FLAGS_DATA : [];
  const mainCats = CATEGORIES.filter(c => c.id !== "all");

  const masteredCountries = Object.values(userProgress.atlas.countries || {}).filter(v => v.mastered).length;
  const masteredFlags = Object.values(userProgress.atlas.flags || {}).filter(v => v.mastered).length;
  const masteredCats = mainCats.filter(c => userProgress.atlas.categories?.[c.id]?.mastered).length;

  const streaks = computeCalendarStreaks();

  // Letzte 28 Tage für Streak-Kalender
  const activeSet = new Set(userProgress.calendar.activeDays || []);
  const dailySet = new Set(Object.keys(userProgress.calendar.dailyCompleted || {}));
  const now = new Date();
  let calCells = "";
  for (let i = 27; i >= 0; i--) {
    const dt = new Date(now);
    dt.setDate(now.getDate() - i);
    const iso = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
    const isAct = activeSet.has(iso);
    const isDly = dailySet.has(iso);
    const cls = `streak-day-cell${isAct ? " active" : ""}${isDly ? " daily" : ""}`;
    calCells += `<div class="${cls}" title="${iso}">${dt.getDate()}</div>`;
  }

  // Bestleistungen pro Modus
  const modeIds = Object.keys(t.tabs);
  const modeRows = modeIds.map(mId => {
    const rec = userProgress.modes?.[mId] || { bestScore: 0, bestStreak: 0 };
    return `
      <div class="mode-record-row">
        <span>${t.tabs[mId]}</span>
        <strong style="color:#38bdf8;">${rec.bestScore} Pkt. • 🔥 ${rec.bestStreak}</strong>
      </div>
    `;
  }).join("");

  const html = `
    <div class="atlas-summary-grid">
      <div class="atlas-stat-box">
        <div class="atlas-stat-num">${masteredCountries} / ${allCountries.length || 195}</div>
        <div class="atlas-stat-lbl">${t.atlasCountriesLabel}</div>
      </div>
      <div class="atlas-stat-box">
        <div class="atlas-stat-num">${masteredFlags} / ${allFlags.length || 0}</div>
        <div class="atlas-stat-lbl">${t.atlasFlagsLabel}</div>
      </div>
      <div class="atlas-stat-box">
        <div class="atlas-stat-num">${masteredCats} / ${mainCats.length}</div>
        <div class="atlas-stat-lbl">${t.atlasCatsLabel}</div>
      </div>
    </div>

    <div class="atlas-summary-grid">
      <div class="atlas-stat-box">
        <div class="atlas-stat-num">🔥 ${streaks.currentStreak}</div>
        <div class="atlas-stat-lbl">${t.streakCurrentLabel}</div>
      </div>
      <div class="atlas-stat-box">
        <div class="atlas-stat-num">🏆 ${streaks.longestStreak}</div>
        <div class="atlas-stat-lbl">${t.streakBestLabel}</div>
      </div>
      <div class="atlas-stat-box">
        <div class="atlas-stat-num">📅 ${streaks.totalDays}</div>
        <div class="atlas-stat-lbl">${t.activeDaysLabel}</div>
      </div>
    </div>

    <p><strong>${t.calendarTitle}</strong></p>
    <div class="streak-cal-grid">${calCells}</div>

    <p><strong>${t.modeRecordsTitle}</strong></p>
    <div class="mode-records-list">${modeRows}</div>

    <button class="pill-btn" style="border-color:#ef4444;color:#f87171;" onclick="resetLocalProgress()">
      🗑️ ${t.resetProgressBtn}
    </button>
  `;

  document.getElementById("modal-title").textContent = t.atlasModalTitle;
  document.getElementById("modal-body").innerHTML = html;
  document.getElementById("legal-modal").classList.remove("hidden");
}

function resetLocalProgress() {
  const t = UI_STRINGS[currentLang];
  if (!window.confirm(t.resetConfirm)) return;
  userProgress = getDefaultProgress();
  saveProgress();
  closeLegal();
  renderHome();
}

function renderHome() {
  const t = UI_STRINGS[currentLang];
  updateNavTexts();

  document.getElementById("ui-home-title").textContent = t.modes[currentMode].title;
  document.getElementById("ui-home-sub").textContent = t.modes[currentMode].sub;

  const noCatModes = ["flags", "flagzoom", "map", "silhouette", "missing", "border", "dossier", "chrono"];
  const hideCategories = noCatModes.includes(currentMode);
  const catSection = document.getElementById("category-section");
  if (hideCategories) {
    catSection.classList.add("hidden");
  } else {
    catSection.classList.remove("hidden");
    const isHol = currentMode === "hol";
    const isCityMode = currentMode === "pinpoint" || currentMode === "radar" || currentMode === "flight";
    document.getElementById("ui-cat-label").textContent = isHol ? t.holCatLabel : isCityMode ? t.pinCatLabel : t.catLabel;

    const catList = isHol ? HOL_CATEGORIES : isCityMode ? PINPOINT_CATEGORIES : CATEGORIES;
    const activeCat = isHol ? selectedHolCategory : isCityMode ? selectedPinpointCategory : selectedCategory;

    const catGrid = document.getElementById("category-grid");
    catGrid.innerHTML = "";
    catList.forEach(cat => {
      const btn = document.createElement("button");
      btn.className = "cat-card" + (activeCat === cat.id ? " selected" : "");
      const catEntry = userProgress.atlas.categories?.[cat.id];
      const badge = cat.id !== "all" && catEntry?.mastered
        ? ` <span style="color:#4ade80;font-size:0.75rem;">✓</span>`
        : "";
      btn.innerHTML = `<span class="cat-icon">${cat.icon}</span><div class="cat-title">${cat[currentLang]}${badge}</div>`;
      btn.onclick = () => {
        if (isHol) selectedHolCategory = cat.id;
        else if (isCityMode) selectedPinpointCategory = cat.id;
        else selectedCategory = cat.id;
        renderHome();
      };
      catGrid.appendChild(btn);
    });
  }

  const diffLabel = document.getElementById("ui-diff-label");
  const diffRow = document.getElementById("diff-row");
  const lenLabel = document.getElementById("ui-len-label");
  const lenRow = document.getElementById("len-row");

  if (currentMode === "chrono") {
    diffLabel.classList.add("hidden");
    diffRow.classList.add("hidden");
    lenLabel.classList.add("hidden");
    lenRow.classList.add("hidden");
  } else {
    diffLabel.classList.remove("hidden");
    diffRow.classList.remove("hidden");
    lenLabel.classList.remove("hidden");
    lenRow.classList.remove("hidden");

    const stepOffset = hideCategories ? 1 : 2;
    diffLabel.textContent = `${stepOffset}. ${t.diffLabel}`;
    diffRow.innerHTML = "";
    const supportsBlind = currentMode === "map" || currentMode === "pinpoint" || currentMode === "radar";
    const diffs = supportsBlind ? ["all", "easy", "medium", "hard", "extreme"] : ["all", "easy", "medium", "hard"];
    diffs.forEach(diff => {
      const btn = document.createElement("button");
      btn.className = "pill-btn" + (selectedDifficulty === diff ? " selected" : "");
      if (diff === "all" && currentMode !== "map") {
        btn.textContent = currentLang === "de" ? "Alle Stufen" : "All Levels";
      } else if (diff === "extreme" && (currentMode === "pinpoint" || currentMode === "radar")) {
        btn.textContent = currentLang === "de" ? "💀 Ohne Grenzen" : "💀 Blind Map";
      } else {
        btn.textContent = t.difficulties[diff];
      }
      btn.onclick = () => { selectedDifficulty = diff; renderHome(); };
      diffRow.appendChild(btn);
    });

    lenLabel.textContent = `${stepOffset + 1}. ${t.lenLabel}`;
    lenRow.innerHTML = "";
    [10, 20, 50, "all"].forEach(len => {
      const btn = document.createElement("button");
      btn.className = "pill-btn" + (selectedLength === len ? " selected" : "");
      btn.textContent = t.lengths[len];
      btn.onclick = () => { selectedLength = len; renderHome(); };
      lenRow.appendChild(btn);
    });
  }

  const pool = getPool();
  const warnBox = document.getElementById("empty-warning");
  if (pool.length === 0 && selectedDifficulty === "all") {
    warnBox.textContent = t.emptyWarn;
    warnBox.classList.remove("hidden");
  } else {
    warnBox.classList.add("hidden");
  }

  const startBtn = document.getElementById("btn-start");
  if (currentMode === "chrono") {
    startBtn.textContent = t.startChronoBtn;
    startBtn.disabled = pool.length < 5;
  } else {
    const playableCount = selectedLength === "all" ? pool.length : Math.min(pool.length, selectedLength);
    startBtn.textContent = t.startBtn(playableCount);
    startBtn.disabled = playableCount === 0;
  }

  renderMetaActionsBar();
}

// =========================================================================
// 4. HILFSFUNKTIONEN & FRAGEN-BUILDER FÜR ALLE MODI
// =========================================================================
const ISO2_TO_NUM = {
  af:"004",al:"008",dz:"012",ad:"020",ao:"024",ag:"028",ar:"032",am:"051",au:"036",at:"040",az:"031",
  bs:"044",bh:"048",bd:"050",bb:"052",by:"112",be:"056",bz:"084",bj:"204",bt:"064",bo:"068",ba:"070",
  bw:"072",br:"076",bn:"096",bg:"100",bf:"854",bi:"108",cv:"132",kh:"116",cm:"120",ca:"124",cf:"140",
  td:"148",cl:"152",cn:"156",co:"170",km:"174",cg:"178",cd:"180",cr:"188",ci:"384",hr:"191",cu:"192",
  cy:"196",cz:"203",dk:"208",dj:"262",dm:"212",do:"214",ec:"218",eg:"818",sv:"222",gq:"226",er:"232",
  ee:"233",sz:"748",et:"231",fj:"242",fi:"246",fr:"250",ga:"266",gm:"270",ge:"268",de:"276",gh:"288",
  gr:"300",gd:"308",gt:"320",gn:"324",gw:"624",gy:"328",ht:"332",hn:"340",hu:"348",is:"352",in:"356",
  id:"360",ir:"364",iq:"368",ie:"372",il:"376",it:"380",jm:"388",jp:"392",jo:"400",kz:"398",ke:"404",
  ki:"296",kp:"408",kr:"410",kw:"414",kg:"417",la:"418",lv:"428",lb:"422",ls:"426",lr:"430",ly:"434",
  li:"438",lt:"440",lu:"442",mg:"450",mw:"454",my:"458",mv:"462",ml:"466",mt:"470",mh:"584",mr:"478",
  mu:"480",mx:"484",fm:"583",md:"498",mc:"492",mn:"496",me:"499",ma:"504",mz:"508",mm:"104",na:"516",
  nr:"520",np:"524",nl:"528",nz:"554",ni:"558",ne:"562",ng:"566",mk:"807",no:"578",om:"512",pk:"586",
  pw:"585",pa:"591",pg:"598",py:"600",pe:"604",ph:"608",pl:"616",pt:"620",qa:"634",ro:"642",ru:"643",
  rw:"646",kn:"659",lc:"662",vc:"670",ws:"882",sm:"674",st:"678",sa:"682",sn:"686",rs:"688",sc:"690",
  sl:"694",sg:"702",sk:"703",si:"705",sb:"090",so:"706",za:"710",ss:"728",es:"724",lk:"144",sd:"729",
  sr:"740",se:"752",ch:"756",sy:"760",tj:"762",tz:"834",th:"764",tl:"626",tg:"768",to:"776",tt:"780",
  tn:"788",tr:"792",tm:"795",tv:"798",ug:"800",ua:"804",ae:"784",gb:"826",us:"840",uy:"858",uz:"860",
  vu:"548",va:"336",ve:"862",vn:"704",ye:"887",zm:"894",zw:"716",ps:"275",tw:"158",xk:"-99"
};

function getHolCountryNumericId(holCountry) {
  if (!holCountry || !holCountry.code) return null;
  return ISO2_TO_NUM[holCountry.code.toLowerCase()] || null;
}

function buildFlagQuestion(flagItem) {
  const others = FLAGS_DATA.filter(f => f.code !== flagItem.code).sort(() => Math.random() - 0.5).slice(0, 3);
  const choices = [flagItem, ...others].sort(() => Math.random() - 0.5);
  const correctIdx = choices.findIndex(c => c.code === flagItem.code);
  return {
    isFlag: true,
    code: flagItem.code,
    difficulty: flagItem.difficulty,
    choices,
    answer: correctIdx,
    en: { fact: flagItem.factEn },
    de: { fact: flagItem.factDe }
  };
}

function buildFlagZoomQuestion(flagItem) {
  const base = buildFlagQuestion(flagItem);
  const originX = Math.floor(25 + Math.random() * 50);
  const originY = Math.floor(25 + Math.random() * 50);
  return {
    ...base,
    isFlagZoom: true,
    originX,
    originY,
    buzzed: false,
    lockedPoints: 300
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

function buildSilhouetteQuestion(countryItem) {
  const allCountries = getAllCountries195();
  const sameDiffPool = allCountries.filter(c => c.id !== countryItem.id && c.difficulty === countryItem.difficulty);
  const fallbackPool = allCountries.filter(c => c.id !== countryItem.id);
  const sourcePool = sameDiffPool.length >= 3 ? sameDiffPool : fallbackPool;

  const others = [...sourcePool].sort(() => Math.random() - 0.5).slice(0, 3);
  const choices = [countryItem, ...others].sort(() => Math.random() - 0.5);
  const correctIdx = choices.findIndex(c => c.id === countryItem.id);

  const rotation = selectedDifficulty === "hard"
    ? Math.floor(35 + Math.random() * 290)
    : 0;

  return {
    isSilhouette: true,
    countryId: countryItem.id,
    difficulty: countryItem.difficulty,
    rotation,
    choices,
    answer: correctIdx,
    en: { fact: countryItem.factEn },
    de: { fact: countryItem.factDe }
  };
}

function buildMissingNeighborQuestions(pool, count) {
  const allCountries = getAllCountries195();
  const byId = new Map(allCountries.map(c => [c.id, c]));

  const candidates = pool.filter(c => {
    const nSet = countryNeighborsMap[c.id];
    if (!nSet) return false;
    const validNeighbors = [...nSet].filter(nid => byId.has(nid));
    return validNeighbors.length >= 2;
  });

  const source = candidates.length >= count ? candidates : allCountries.filter(c => {
    const nSet = countryNeighborsMap[c.id];
    return nSet && [...nSet].filter(nid => byId.has(nid)).length >= 2;
  });

  const picked = [...source].sort(() => Math.random() - 0.5).slice(0, count);

  return picked.map(target => {
    const nIds = [...(countryNeighborsMap[target.id] || [])].filter(nid => byId.has(nid));
    const neighborDistractors = nIds
      .map(nid => byId.get(nid))
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    const otherDistractors = allCountries
      .filter(c => c.id !== target.id && !neighborDistractors.some(nd => nd.id === c.id))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3 - neighborDistractors.length);

    const choices = [target, ...neighborDistractors, ...otherDistractors].sort(() => Math.random() - 0.5);
    const correctIdx = choices.findIndex(c => c.id === target.id);

    return {
      isMissing: true,
      countryId: target.id,
      neighborIds: nIds,
      difficulty: target.difficulty,
      choices,
      answer: correctIdx,
      en: { name: target.en, fact: target.factEn },
      de: { name: target.de, fact: target.factDe }
    };
  });
}

function findShortestBorderPath(startId, endId) {
  if (startId === endId) return [startId];
  const queue = [[startId]];
  const visited = new Set([startId]);

  while (queue.length > 0) {
    const path = queue.shift();
    const curr = path[path.length - 1];
    const neighbors = countryNeighborsMap[curr];
    if (!neighbors) continue;

    for (const nextId of neighbors) {
      if (nextId === endId) {
        return [...path, nextId];
      }
      if (!visited.has(nextId)) {
        visited.add(nextId);
        queue.push([...path, nextId]);
      }
    }
  }
  return null;
}

function buildBorderRouteQuestions(pool, count) {
  const allCountries = getAllCountries195();
  const byId = new Map(allCountries.map(c => [c.id, c]));

  const connected = allCountries.filter(c => {
    const nSet = countryNeighborsMap[c.id];
    return nSet && [...nSet].some(nid => byId.has(nid));
  });

  const preferredStarts = pool.filter(c => connected.some(cc => cc.id === c.id));
  const startPool = preferredStarts.length > 0 ? preferredStarts : connected;

  const questions = [];
  const usedPairs = new Set();

  for (let i = 0; i < count; i++) {
    let bestRoute = null;

    for (let attempt = 0; attempt < 220; attempt++) {
      const start = startPool[Math.floor(Math.random() * startPool.length)];
      const end = connected[Math.floor(Math.random() * connected.length)];
      if (!start || !end || start.id === end.id) continue;

      const pairKey = [start.id, end.id].sort().join("-");
      if (usedPairs.has(pairKey)) continue;

      const shortest = findShortestBorderPath(start.id, end.id);
      if (!shortest) continue;

      const parSteps = shortest.length - 1;
      let diffOk = true;
      if (selectedDifficulty === "easy") diffOk = parSteps >= 2 && parSteps <= 3;
      else if (selectedDifficulty === "medium") diffOk = parSteps >= 3 && parSteps <= 5;
      else if (selectedDifficulty === "hard") diffOk = parSteps >= 5 && parSteps <= 9;
      else diffOk = parSteps >= 2 && parSteps <= 8;

      if (diffOk) {
        bestRoute = { start, end, shortest, parSteps, pairKey };
        break;
      }
    }

    if (bestRoute) {
      usedPairs.add(bestRoute.pairKey);
      questions.push({
        isBorder: true,
        startId: bestRoute.start.id,
        endId: bestRoute.end.id,
        shortestPath: bestRoute.shortest,
        parSteps: bestRoute.parSteps,
        visitedPath: [bestRoute.start.id],
        warningMsg: "",
        earned: 0,
        en: {
          startName: bestRoute.start.en,
          endName: bestRoute.end.en,
          fact: bestRoute.end.factEn
        },
        de: {
          startName: bestRoute.start.de,
          endName: bestRoute.end.de,
          fact: bestRoute.end.factDe
        }
      });
    }
  }
  return questions;
}

function buildDossierQuestions(pool, count) {
  const allCountries = getAllCountries195();
  const capitals = typeof PINPOINT_CITIES !== "undefined"
    ? PINPOINT_CITIES.filter(c => c.type === "capital")
    : [];

  const picked = [...pool].sort(() => Math.random() - 0.5).slice(0, count);

  return picked.map(hc => {
    const numId = getHolCountryNumericId(hc);
    const worldMeta = allCountries.find(c => c.id === numId) || { id: numId, en: hc.en, de: hc.de, difficulty: "medium", factEn: hc.factEn, factDe: hc.factDe };
    const nSet = countryNeighborsMap[numId];
    const isLandlocked = !nSet || nSet.size === 0 ? false : checkIfLandlocked(numId);

    const capMatch = capitals.find(cap =>
      cap.countryEn.toLowerCase() === hc.en.toLowerCase() ||
      cap.countryDe.toLowerCase() === hc.de.toLowerCase()
    );

    const others = allCountries
      .filter(c => c.id !== numId)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const choices = [worldMeta, ...others].sort(() => Math.random() - 0.5);
    const correctIdx = choices.findIndex(c => c.id === numId);

    return {
      isDossier: true,
      countryId: numId,
      code: hc.code,
      pop: hc.pop,
      area: hc.area,
      isLandlocked,
      capitalEn: capMatch ? capMatch.en : null,
      capitalDe: capMatch ? capMatch.de : null,
      rotation: Math.floor(40 + Math.random() * 280),
      revealedClues: 1,
      choices,
      answer: correctIdx,
      selectedChoice: null,
      earned: 0,
      en: { name: worldMeta.en, fact: hc.factEn },
      de: { name: worldMeta.de, fact: hc.factDe }
    };
  });
}

function checkIfLandlocked(countryId) {
  const LANDLOCKED_IDS = new Set([
    "004","020","051","040","031","112","064","068","072","854","108","140","148","203",
    "748","231","348","398","417","418","426","438","442","454","466","498","496","524",
    "562","807","600","646","674","688","703","728","756","762","795","800","860","336","894","716"
  ]);
  return LANDLOCKED_IDS.has(countryId);
}

function buildFlightQuestions(pool, count) {
  const source = pool.length >= 2 ? pool : (typeof PINPOINT_CITIES !== "undefined" ? PINPOINT_CITIES : []);
  if (source.length < 2) return [];

  const questions = [];
  const usedPairs = new Set();

  for (let i = 0; i < count; i++) {
    let best = null;
    for (let attempt = 0; attempt < 150; attempt++) {
      const a = source[Math.floor(Math.random() * source.length)];
      const b = source[Math.floor(Math.random() * source.length)];
      if (!a || !b || a.id === b.id) continue;

      const pairKey = [a.id, b.id].sort().join("-");
      if (usedPairs.has(pairKey)) continue;

      const distKm = haversineKm(a.lat, a.lon, b.lat, b.lon);
      if (distKm >= 800 && distKm <= 18500) {
        best = { a, b, distKm, pairKey };
        break;
      }
    }

    if (best) {
      usedPairs.add(best.pairKey);
      questions.push({
        isFlight: true,
        cityA: best.a,
        cityB: best.b,
        actualKm: best.distKm,
        guessKm: 5000,
        earned: 0,
        errPct: 0,
        en: {
          nameA: `${best.a.en} (${best.a.countryEn})`,
          nameB: `${best.b.en} (${best.b.countryEn})`,
          fact: best.b.factEn
        },
        de: {
          nameA: `${best.a.de} (${best.a.countryDe})`,
          nameB: `${best.b.de} (${best.b.countryDe})`,
          fact: best.b.factDe
        }
      });
    }
  }
  return questions;
}

function buildPinpointQuestion(cityItem) {
  return {
    isPinpoint: true,
    cityId: cityItem.id,
    cityType: cityItem.type,
    difficulty: cityItem.difficulty,
    lat: cityItem.lat,
    lon: cityItem.lon,
    en: { name: cityItem.en, country: cityItem.countryEn, fact: cityItem.factEn },
    de: { name: cityItem.de, country: cityItem.countryDe, fact: cityItem.factDe }
  };
}

function buildRadarQuestion(cityItem) {
  return {
    isRadar: true,
    cityId: cityItem.id,
    cityType: cityItem.type,
    difficulty: cityItem.difficulty,
    lat: cityItem.lat,
    lon: cityItem.lon,
    pings: [],
    won: false,
    earned: 0,
    bestDistKm: null,
    en: { name: cityItem.en, country: cityItem.countryEn, fact: cityItem.factEn },
    de: { name: cityItem.de, country: cityItem.countryDe, fact: cityItem.factDe }
  };
}

// =========================================================================
// 5. ZEITSTRAHL-STAPEL (CHRONO-CHAIN) ENGINE & UI
// =========================================================================
function injectChronoStyles() {
  if (document.getElementById("chrono-styles")) return;
  const style = document.createElement("style");
  style.id = "chrono-styles";
  style.textContent = `
    .chrono-hud {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 10px 14px;
      margin-bottom: 14px;
      font-weight: 700;
    }
    .chrono-hearts {
      font-size: 1.15rem;
      letter-spacing: 3px;
    }
    .chrono-draw-card {
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      border: 2px solid #38bdf8;
      border-radius: 16px;
      padding: 16px 20px;
      text-align: center;
      margin: 0 auto 16px;
      max-width: 440px;
      box-shadow: 0 10px 26px rgba(56, 189, 248, 0.18);
    }
    .chrono-draw-icon {
      font-size: 2.5rem;
      line-height: 1.1;
      margin-bottom: 6px;
    }
    .chrono-draw-title {
      font-size: 1.15rem;
      font-weight: 800;
      color: #f8fafc;
    }
    .chrono-draw-year {
      display: inline-block;
      margin-top: 6px;
      padding: 3px 12px;
      border-radius: 999px;
      background: rgba(56, 189, 248, 0.15);
      border: 1px solid #38bdf8;
      color: #38bdf8;
      font-weight: 800;
      font-size: 0.85rem;
    }
    .chrono-timeline {
      display: flex;
      flex-direction: column;
      gap: 6px;
      max-height: 360px;
      overflow-y: auto;
      padding: 6px 4px;
    }
    .chrono-slot-btn {
      width: 100%;
      padding: 8px 12px;
      border-radius: 10px;
      border: 1.5px dashed #475569;
      background: rgba(30, 41, 59, 0.55);
      color: #94a3b8;
      font-weight: 700;
      font-size: 0.84rem;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .chrono-slot-btn:hover {
      border-color: #38bdf8;
      background: rgba(56, 189, 248, 0.16);
      color: #38bdf8;
      transform: scale(1.01);
    }
    .chrono-placed-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      background: #1e293b;
      border: 1.5px solid #334155;
      border-radius: 12px;
      padding: 9px 14px;
      color: #f8fafc;
    }
    .chrono-placed-item.just-added {
      border-color: #22c55e;
      background: rgba(34, 197, 94, 0.14);
    }
    .chrono-placed-item.just-wrong {
      border-color: #ef4444;
      background: rgba(239, 68, 68, 0.14);
    }
    .chrono-placed-left {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 700;
      font-size: 0.92rem;
    }
    .chrono-placed-year {
      font-weight: 800;
      font-size: 0.85rem;
      color: #38bdf8;
      white-space: nowrap;
      background: #0f172a;
      padding: 3px 10px;
      border-radius: 999px;
      border: 1px solid #334155;
    }
  `;
  document.head.appendChild(style);
}

function initChronoChain() {
  const shuffled = [...HOL_INVENTIONS].sort(() => Math.random() - 0.5);
  let anchors = shuffled.slice(0, 2);
  for (let i = 0; i < 40; i++) {
    const a = shuffled[Math.floor(Math.random() * shuffled.length)];
    const b = shuffled[Math.floor(Math.random() * shuffled.length)];
    if (a.id !== b.id && Math.abs(a.year - b.year) >= 400) {
      anchors = [a, b];
      break;
    }
  }
  anchors.sort((a, b) => a.year - b.year);
  const usedIds = new Set(anchors.map(a => a.id));
  const deck = shuffled.filter(item => !usedIds.has(item.id));

  chronoState = {
    lives: 3,
    timeline: anchors.map(a => ({ ...a, status: "anchor" })),
    deck,
    currentCard: deck.shift() || null,
    lastInsertedId: null,
    lastWasCorrect: null,
    gameOver: false
  };
}

function getOrCreateChronoArena() {
  injectChronoStyles();
  let box = document.getElementById("chrono-arena");
  if (!box) {
    box = document.createElement("div");
    box.id = "chrono-arena";
    const optionsList = document.getElementById("options-list");
    optionsList.parentNode.insertBefore(box, optionsList);
  }
  return box;
}

function renderChronoArena() {
  if (!chronoState) {
    initChronoChain();
  }
  const t = UI_STRINGS[currentLang];
  const box = getOrCreateChronoArena();
  if (!box) return;
  box.classList.remove("hidden");

  const hearts = "❤️".repeat(chronoState.lives) + "🖤".repeat(Math.max(0, 3 - chronoState.lives));
  const chainLen = chronoState.timeline.length;

  const qCounter = document.getElementById("ui-q-counter");
  const scoreEl = document.getElementById("ui-score");
  const streakEl = document.getElementById("ui-streak");
  const progEl = document.getElementById("progress-fill");
  if (qCounter) qCounter.textContent = t.chronoCount(chainLen);
  if (scoreEl) scoreEl.textContent = t.pointsBadge(totalPoints);
  if (streakEl) streakEl.textContent = `🔥 ${streak}`;
  if (progEl) progEl.style.width = `${Math.min(100, (chainLen / 20) * 100)}%`;

  let drawHtml = "";
  if (chronoState.currentCard && !answered) {
    const card = chronoState.currentCard;
    drawHtml = `
      <div class="chrono-draw-card">
        <div class="chrono-draw-icon">${card.icon || "⏳"}</div>
        <div class="chrono-draw-title">${card[currentLang] || card.en || card.de || ""}</div>
        <div class="chrono-draw-year">???</div>
      </div>
    `;
  }

  let listHtml = `<div class="chrono-timeline">`;
  for (let slot = 0; slot <= chronoState.timeline.length; slot++) {
    if (!answered && chronoState.currentCard) {
      listHtml += `<button class="chrono-slot-btn" onclick="handleChronoSlot(${slot})">${t.chronoInsertHere}</button>`;
    }
    if (slot < chronoState.timeline.length) {
      const entry = chronoState.timeline[slot];
      const highlightCls = entry.id === chronoState.lastInsertedId
        ? (chronoState.lastWasCorrect ? " just-added" : " just-wrong")
        : "";
      listHtml += `
        <div class="chrono-placed-item${highlightCls}">
          <div class="chrono-placed-left">
            <span>${entry.icon || "⏳"}</span>
            <span>${entry[currentLang] || entry.en || entry.de || ""}</span>
          </div>
          <span class="chrono-placed-year">${formatHolValue("inventions", Number(entry.year), currentLang)}</span>
        </div>
      `;
    }
  }
  listHtml += `</div>`;

  box.innerHTML = `
    <div class="chrono-hud">
      <span class="chrono-hearts">${hearts}</span>
      <span style="color:#94a3b8;font-size:0.85rem;">${currentLang === "de" ? "Älteste oben → Neueste unten" : "Oldest top → Newest bottom"}</span>
    </div>
    ${drawHtml}
    ${listHtml}
  `;
}
function handleChronoSlot(slotIdx) {
  if (answered || !chronoState || !chronoState.currentCard) return;
  answered = true;

  const t = UI_STRINGS[currentLang];
  const card = chronoState.currentCard;
  const cardYear = Number(card.year);
  const prevItem = slotIdx > 0 ? chronoState.timeline[slotIdx - 1] : null;
  const nextItem = slotIdx < chronoState.timeline.length ? chronoState.timeline[slotIdx] : null;

  const afterPrev = !prevItem || cardYear >= Number(prevItem.year);
  const beforeNext = !nextItem || cardYear <= Number(nextItem.year);
  const isCorrect = afterPrev && beforeNext;

  let trueIdx = chronoState.timeline.findIndex(item => Number(item.year) > cardYear);
  if (trueIdx === -1) trueIdx = chronoState.timeline.length;
  chronoState.timeline.splice(trueIdx, 0, { ...card });
  chronoState.lastInsertedId = card.id;
  chronoState.lastWasCorrect = isCorrect;

  const yearStr = formatHolValue("inventions", cardYear, currentLang);
  recordAtlasOutcome("categories", "inventions", isCorrect);

  if (isCorrect) {
    correctCount++;
    streak++;
    if (streak > bestRunStreak) bestRunStreak = streak;
    const earned = 100 + Math.max(0, (chronoState.timeline.length - 3) * 15);
    totalPoints += earned;
    lastStatusHtml = `<strong>${t.chronoRightSlot(yearStr, earned)}</strong> `;
  } else {
    streak = 0;
    chronoState.lives = Math.max(0, chronoState.lives - 1);
    lastStatusHtml = `<strong>${t.chronoWrongSlot(yearStr)}</strong> `;
  }

  chronoState.currentCard = chronoState.deck.shift() || null;
  chronoState.gameOver = chronoState.lives <= 0 || !chronoState.currentCard;

  renderChronoArena();

  const cardFact =
    (card && card[currentLang] && card[currentLang].fact) ||
    (currentLang === "de" ? card?.factDe : card?.factEn) ||
    card?.factEn ||
    card?.factDe ||
    "";

  const expBox = document.getElementById("explanation-box");
  if (expBox) {
    expBox.innerHTML = `${lastStatusHtml}<strong>${t.didYouKnow}</strong> ${cardFact}`;
    expBox.style.display = "block";
  }

  const nextBtn = document.getElementById("btn-next");
  const nextWrap = document.getElementById("next-wrap");
  if (nextBtn) nextBtn.textContent = chronoState.gameOver ? t.finishBtn : t.nextBtn;
  if (nextWrap) nextWrap.style.display = "block";
}

// =========================================================================
// 6. FLAGGEN-ZOOM (BUZZER-MODUS)
// =========================================================================
function injectFlagZoomStyles() {
  if (document.getElementById("flag-zoom-styles")) return;
  const style = document.createElement("style");
  style.id = "flag-zoom-styles";
  style.textContent = `
    .flag-zoom-stage {
      width: 280px;
      height: 186px;
      margin: 12px auto 16px;
      border-radius: 14px;
      overflow: hidden;
      border: 2px solid #334155;
      background: #0f172a;
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.45);
      position: relative;
    }
    .flag-zoom-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      will-change: transform;
    }
    .flag-buzzer-btn {
      display: block;
      width: 100%;
      max-width: 360px;
      margin: 0 auto 14px;
      padding: 15px 20px;
      border-radius: 14px;
      border: none;
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      color: #ffffff;
      font-size: 1.08rem;
      font-weight: 800;
      cursor: pointer;
      box-shadow: 0 8px 22px rgba(239, 68, 68, 0.38);
      transition: transform 0.12s ease;
    }
    .flag-buzzer-btn:hover {
      transform: scale(1.02);
    }
  `;
  document.head.appendChild(style);
}

function renderFlagZoomStage(item, keepState) {
  injectFlagZoomStyles();
  const t = UI_STRINGS[currentLang];
  const flagBox = document.getElementById("flag-box");
  flagBox.classList.add("hidden");

  let wrap = document.getElementById("flag-zoom-wrap");
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.id = "flag-zoom-wrap";
    flagBox.parentNode.insertBefore(wrap, flagBox.nextSibling);
  }
  wrap.classList.remove("hidden");

  wrap.innerHTML = `
    <div class="flag-zoom-stage">
      <img id="flag-zoom-img" class="flag-zoom-img" src="https://flagcdn.com/w640/${item.code}.png" alt="Zoomed Flag" style="transform-origin: ${item.originX}% ${item.originY}%;">
    </div>
    <button id="btn-flag-buzzer" class="flag-buzzer-btn" onclick="triggerFlagBuzzer()">${t.flagZoomBuzzer(300)}</button>
    <div id="flag-zoom-status" style="text-align:center;font-weight:700;color:#38bdf8;margin-bottom:10px;" class="hidden"></div>
  `;

  const imgEl = document.getElementById("flag-zoom-img");
  const buzzerBtn = document.getElementById("btn-flag-buzzer");
  const statusEl = document.getElementById("flag-zoom-status");
  const optionsList = document.getElementById("options-list");

  if (answered) {
    imgEl.style.transform = "scale(1)";
    buzzerBtn.classList.add("hidden");
    renderFlagZoomChoices(item);
    return;
  }

  if (keepState && item.buzzed) {
    imgEl.style.transform = `scale(${item.frozenScale || 1})`;
    buzzerBtn.classList.add("hidden");
    statusEl.textContent = t.flagZoomNowPick(item.lockedPoints);
    statusEl.classList.remove("hidden");
    renderFlagZoomChoices(item);
    return;
  }

  optionsList.innerHTML = "";
  const durationMs = 12000;
  const startTime = performance.now();
  const startScale = 5.6;

  function stepZoom(now) {
    if (answered || item.buzzed) return;
    const elapsed = Math.min(durationMs, now - startTime);
    const progress = elapsed / durationMs;
    const currentScale = startScale - (startScale - 1.0) * progress;
    const currentPts = Math.max(50, Math.round(300 - 250 * progress));

    item.frozenScale = currentScale;
    item.lockedPoints = currentPts;

    if (imgEl) imgEl.style.transform = `scale(${currentScale.toFixed(3)})`;
    if (buzzerBtn) buzzerBtn.textContent = t.flagZoomBuzzer(currentPts);

    if (progress < 1) {
      flagZoomAnimId = requestAnimationFrame(stepZoom);
    } else {
      triggerFlagBuzzer();
    }
  }

  flagZoomAnimId = requestAnimationFrame(stepZoom);
}

function triggerFlagBuzzer() {
  const item = activeQuestions[currentIndex];
  if (!item || !item.isFlagZoom || item.buzzed || answered) return;
  item.buzzed = true;
  if (flagZoomAnimId) {
    cancelAnimationFrame(flagZoomAnimId);
    flagZoomAnimId = null;
  }

  const t = UI_STRINGS[currentLang];
  const buzzerBtn = document.getElementById("btn-flag-buzzer");
  const statusEl = document.getElementById("flag-zoom-status");
  if (buzzerBtn) buzzerBtn.classList.add("hidden");
  if (statusEl) {
    statusEl.textContent = t.flagZoomNowPick(item.lockedPoints);
    statusEl.classList.remove("hidden");
  }
  renderFlagZoomChoices(item);
}

function renderFlagZoomChoices(item) {
  const optionsList = document.getElementById("options-list");
  optionsList.innerHTML = "";
  item.choices.forEach((choice, idx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = choice[currentLang];
    btn.onclick = () => {
      const imgEl = document.getElementById("flag-zoom-img");
      if (imgEl) {
        imgEl.style.transition = "transform 0.45s ease";
        imgEl.style.transform = "scale(1)";
      }
      handleAnswer(idx);
    };
    optionsList.appendChild(btn);
  });
}

// =========================================================================
// 7. 4-HINWEISE-STECKBRIEF (DEDUKTIONS-QUIZ)
// =========================================================================
function injectDossierStyles() {
  if (document.getElementById("dossier-styles")) return;
  const style = document.createElement("style");
  style.id = "dossier-styles";
  style.textContent = `
    .dossier-board {
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 16px;
      margin: 12px 0 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .dossier-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
      padding-bottom: 8px;
      border-bottom: 1px solid #1e293b;
    }
    .dossier-reward-pill {
      background: rgba(56, 189, 248, 0.16);
      border: 1px solid #38bdf8;
      color: #38bdf8;
      font-weight: 800;
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 0.88rem;
    }
    .dossier-reveal-btn {
      background: #1e293b;
      border: 1.5px solid #f59e0b;
      color: #fbbf24;
      font-weight: 700;
      padding: 6px 12px;
      border-radius: 10px;
      cursor: pointer;
      font-size: 0.84rem;
      transition: all 0.15s ease;
    }
    .dossier-reveal-btn:hover:not(:disabled) {
      background: rgba(245, 158, 11, 0.16);
    }
    .dossier-reveal-btn:disabled {
      opacity: 0.5;
      cursor: default;
      border-color: #475569;
      color: #94a3b8;
    }
    .dossier-clue-card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 10px 14px;
    }
    .dossier-clue-title {
      font-size: 0.75rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #94a3b8;
      margin-bottom: 4px;
    }
    .dossier-clue-body {
      font-size: 0.95rem;
      font-weight: 700;
      color: #f8fafc;
    }
  `;
  document.head.appendChild(style);
}

function renderDossierArena(item) {
  injectDossierStyles();
  const t = UI_STRINGS[currentLang];
  let box = document.getElementById("dossier-arena");
  if (!box) {
    box = document.createElement("div");
    box.id = "dossier-arena";
    const optionsList = document.getElementById("options-list");
    optionsList.parentNode.insertBefore(box, optionsList);
  }
  box.classList.remove("hidden");

  const currentPts = DOSSIER_POINTS[item.revealedClues - 1] || 50;
  const canRevealMore = !answered && item.revealedClues < 4;
  const nextPts = canRevealMore ? DOSSIER_POINTS[item.revealedClues] : 50;

  const areaStr = Math.round(item.area).toLocaleString(currentLang === "de" ? "de-DE" : "en-US");
  const geoType = item.isLandlocked ? t.dossierLandlocked : t.dossierCoastal;
  const popStr = formatHolValue("population", item.pop, currentLang);
  const capStr = currentLang === "de" ? item.capitalDe : item.capitalEn;

  let cluesHtml = `
    <div class="dossier-clue-card">
      <div class="dossier-clue-title">${t.dossierClueTitles[0]}</div>
      <div class="dossier-clue-body">🌍 ${geoType} • 📐 ${t.dossierAreaText(areaStr)}</div>
    </div>
  `;

  if (item.revealedClues >= 2 || answered) {
    cluesHtml += `
      <div class="dossier-clue-card">
        <div class="dossier-clue-title">${t.dossierClueTitles[1]}</div>
        <svg id="dossier-sil-svg" viewBox="0 0 360 180" style="width:100%;height:150px;display:block;"></svg>
      </div>
    `;
  }

  if (item.revealedClues >= 3 || answered) {
    const capPart = capStr ? ` • 🏛️ ${t.dossierCapText(capStr)}` : "";
    cluesHtml += `
      <div class="dossier-clue-card">
        <div class="dossier-clue-title">${t.dossierClueTitles[2]}</div>
        <div class="dossier-clue-body">👥 ${t.dossierPopText(popStr)}${capPart}</div>
      </div>
    `;
  }

  if (item.revealedClues >= 4 || answered) {
    cluesHtml += `
      <div class="dossier-clue-card">
        <div class="dossier-clue-title">${t.dossierClueTitles[3]}</div>
        <img src="https://flagcdn.com/w240/${item.code}.png" alt="Flag" style="height:64px;border-radius:6px;margin-top:4px;border:1px solid #475569;">
      </div>
    `;
  }

  box.innerHTML = `
    <div class="dossier-board">
      <div class="dossier-header">
        <span class="dossier-reward-pill">🏆 ${t.pointsBadge(currentPts)}</span>
        <button class="dossier-reveal-btn" ${canRevealMore ? "" : "disabled"} onclick="revealNextDossierClue()">
          ${canRevealMore ? t.dossierRevealBtn(nextPts) : t.dossierMaxClues}
        </button>
      </div>
      ${cluesHtml}
    </div>
  `;

  if (item.revealedClues >= 2 || answered) {
    const rawFeature = mapFeatures.find(f => String(f.id).padStart(3, "0") === item.countryId);
    if (rawFeature) {
      const clean = getCleanSilhouetteGeometry(rawFeature);
      const proj = d3.geoNaturalEarth1().fitExtent([[30, 14], [330, 166]], clean);
      const pathGen = d3.geoPath().projection(proj);
      const svg = d3.select("#dossier-sil-svg");
      const g = svg.append("g").attr("transform", `rotate(${item.rotation}, 180, 90)`);
      g.append("path")
        .datum(clean)
        .attr("d", pathGen)
        .style("fill", "#38bdf8")
        .style("stroke", "#bae6fd")
        .style("stroke-width", "1.4px");
    }
  }

  const optionsList = document.getElementById("options-list");
  optionsList.innerHTML = "";
  item.choices.forEach((choice, idx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = choice[currentLang];
    if (answered) {
      btn.disabled = true;
      if (idx === item.answer) btn.classList.add("correct");
      else if (idx === item.selectedChoice) btn.classList.add("wrong");
    } else {
      btn.onclick = () => handleDossierGuess(idx);
    }
    optionsList.appendChild(btn);
  });
}

function revealNextDossierClue() {
  const item = activeQuestions[currentIndex];
  if (!item || !item.isDossier || answered || item.revealedClues >= 4) return;
  item.revealedClues++;
  renderDossierArena(item);
}

function handleDossierGuess(selectedIdx) {
  if (answered) return;
  answered = true;

  const t = UI_STRINGS[currentLang];
  const item = activeQuestions[currentIndex];
  item.selectedChoice = selectedIdx;
  const reward = DOSSIER_POINTS[item.revealedClues - 1] || 50;
  const isWin = selectedIdx === item.answer;

  recordItemAtlas(item, isWin);

  if (isWin) {
    correctCount++;
    streak++;
    if (streak > bestRunStreak) bestRunStreak = streak;
    item.earned = reward;
    totalPoints += reward;
    lastStatusHtml = `<strong>${t.dossierWinMsg(reward, item[currentLang].name)}</strong> `;
  } else {
    streak = 0;
    item.earned = 0;
    lastStatusHtml = `<strong>${t.dossierLoseMsg(item[currentLang].name)}</strong> `;
  }

  renderDossierArena(item);

  document.getElementById("ui-score").textContent = t.pointsBadge(totalPoints);
  document.getElementById("ui-streak").textContent = `🔥 ${streak}`;
  document.getElementById("progress-fill").style.width = `${((currentIndex + 1) / activeQuestions.length) * 100}%`;

  const expBox = document.getElementById("explanation-box");
  expBox.innerHTML = `${lastStatusHtml}<strong>${t.didYouKnow}</strong> ${item[currentLang].fact}`;
  expBox.style.display = "block";

  const nextBtn = document.getElementById("btn-next");
  nextBtn.textContent = currentIndex < activeQuestions.length - 1 ? t.nextBtn : t.finishBtn;
  document.getElementById("next-wrap").style.display = "block";
}

// =========================================================================
// 8. LÜCKEN-PUZZLE (MISSING NEIGHBOR)
// =========================================================================
function renderMissingNeighborPuzzle(item) {
  injectSilhouetteStyles();
  let box = document.getElementById("missing-box");
  if (!box) {
    box = document.createElement("div");
    box.id = "missing-box";
    box.className = "silhouette-box hidden";
    box.innerHTML = `<svg id="missing-svg" viewBox="0 0 460 280" style="width:100%;height:260px;display:block;"></svg>`;
    const flagBox = document.getElementById("flag-box");
    flagBox.parentNode.insertBefore(box, flagBox.nextSibling);
  }
  box.classList.remove("hidden");

  const svg = d3.select("#missing-svg");
  svg.selectAll("*").remove();

  const targetFeature = mapFeatures.find(f => String(f.id).padStart(3, "0") === item.countryId);
  const neighborFeatures = mapFeatures.filter(f => item.neighborIds.includes(String(f.id).padStart(3, "0")));
  if (!targetFeature) return;

  const combinedCollection = {
    type: "FeatureCollection",
    features: [targetFeature, ...neighborFeatures]
  };

  const proj = d3.geoNaturalEarth1().fitExtent([[24, 20], [436, 260]], combinedCollection);
  const pathGen = d3.geoPath().projection(proj);

  svg.selectAll("path.missing-neighbor")
    .data(neighborFeatures)
    .enter()
    .append("path")
    .attr("d", pathGen)
    .style("fill", "#273549")
    .style("stroke", "#64748b")
    .style("stroke-width", "1.2px");

  svg.append("path")
    .datum(targetFeature)
    .attr("d", pathGen)
    .style("fill", answered ? "rgba(34, 197, 94, 0.32)" : "rgba(15, 23, 42, 0.85)")
    .style("stroke", answered ? "#22c55e" : "#38bdf8")
    .style("stroke-width", "2px")
    .style("stroke-dasharray", answered ? "none" : "5 4");

  const allCountries = getAllCountries195();
  neighborFeatures.forEach(nf => {
    const nid = String(nf.id).padStart(3, "0");
    const cObj = allCountries.find(c => c.id === nid);
    const label = cObj ? cObj[currentLang] : "";
    const centroid = pathGen.centroid(nf);
    if (label && isFinite(centroid[0]) && isFinite(centroid[1])) {
      svg.append("text")
        .attr("x", centroid[0])
        .attr("y", centroid[1])
        .attr("text-anchor", "middle")
        .style("fill", "#cbd5e1")
        .style("font-size", "9.5px")
        .style("font-weight", "700")
        .style("paint-order", "stroke")
        .style("stroke", "#0f172a")
        .style("stroke-width", "2.5px")
        .text(label);
    }
  });

  const targetCenter = pathGen.centroid(targetFeature);
  if (isFinite(targetCenter[0]) && isFinite(targetCenter[1])) {
    svg.append("text")
      .attr("x", targetCenter[0])
      .attr("y", targetCenter[1])
      .attr("dy", "4px")
      .attr("text-anchor", "middle")
      .style("fill", answered ? "#4ade80" : "#38bdf8")
      .style("font-size", answered ? "12px" : "18px")
      .style("font-weight", "900")
      .style("paint-order", "stroke")
      .style("stroke", "#0f172a")
      .style("stroke-width", "3px")
      .text(answered ? item[currentLang].name : "?");
  }
}

// =========================================================================
// 9. SILHOUETTEN & HIGHER OR LOWER
// =========================================================================
function injectSilhouetteStyles() {
  if (document.getElementById("silhouette-styles")) return;
  const style = document.createElement("style");
  style.id = "silhouette-styles";
  style.textContent = `
    .silhouette-box {
      background: radial-gradient(circle at center, #1e293b 0%, #0f172a 100%);
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 16px;
      margin: 14px auto 18px;
      max-width: 440px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.35);
    }
    .silhouette-svg {
      width: 100%;
      height: 230px;
      display: block;
      overflow: visible;
    }
    .silhouette-path {
      fill: #38bdf8;
      stroke: #bae6fd;
      stroke-width: 1.5px;
      stroke-linejoin: round;
      filter: drop-shadow(0 6px 16px rgba(56, 189, 248, 0.25));
      transition: transform 0.5s ease, fill 0.3s ease;
    }
    .silhouette-badge {
      position: absolute;
      top: 10px;
      right: 12px;
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid #475569;
      color: #f8fafc;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 999px;
    }
  `;
  document.head.appendChild(style);
}

function getOrCreateSilhouetteBox() {
  injectSilhouetteStyles();
  let box = document.getElementById("silhouette-box");
  if (!box) {
    box = document.createElement("div");
    box.id = "silhouette-box";
    box.className = "silhouette-box hidden";
    box.innerHTML = `
      <span id="silhouette-badge" class="silhouette-badge hidden"></span>
      <svg id="silhouette-svg" class="silhouette-svg" viewBox="0 0 360 240"></svg>
    `;
    const flagBox = document.getElementById("flag-box");
    flagBox.parentNode.insertBefore(box, flagBox.nextSibling);
  }
  return box;
}

function getCleanSilhouetteGeometry(feature) {
  if (!feature || !feature.geometry) return feature;
  if (feature.geometry.type !== "MultiPolygon") return feature;

  const polys = feature.geometry.coordinates;
  if (polys.length <= 1) return feature;

  const areas = polys.map(coords => d3.geoArea({ type: "Polygon", coordinates: coords }));
  const maxArea = Math.max(...areas);
  const filtered = polys.filter((_, idx) => areas[idx] >= maxArea * 0.02);

  if (filtered.length === 0) return feature;
  return {
    type: "Feature",
    properties: feature.properties,
    geometry: {
      type: "MultiPolygon",
      coordinates: filtered
    }
  };
}

function renderSilhouetteShape(item) {
  const t = UI_STRINGS[currentLang];
  const box = getOrCreateSilhouetteBox();
  box.classList.remove("hidden");

  const badge = document.getElementById("silhouette-badge");
  if (item.rotation !== 0) {
    badge.textContent = t.silhouetteRotatedBadge;
    badge.classList.remove("hidden");
  } else {
    badge.classList.add("hidden");
  }

  const svg = d3.select("#silhouette-svg");
  svg.selectAll("*").remove();

  const rawFeature = mapFeatures.find(f => String(f.id).padStart(3, "0") === item.countryId);
  if (!rawFeature) return;

  const cleanFeature = getCleanSilhouetteGeometry(rawFeature);
  const proj = d3.geoNaturalEarth1().fitExtent([[26, 20], [334, 220]], cleanFeature);
  const pathGen = d3.geoPath().projection(proj);

  const g = svg.append("g");
  if (item.rotation !== 0) {
    g.attr("transform", `rotate(${item.rotation}, 180, 120)`);
  }

  g.append("path")
    .datum(cleanFeature)
    .attr("class", "silhouette-path")
    .attr("d", pathGen);
}

function injectHigherLowerStyles() {
  if (document.getElementById("hol-styles")) return;
  const style = document.createElement("style");
  style.id = "hol-styles";
  style.textContent = `
    .hol-arena {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 14px;
      align-items: stretch;
      margin: 18px 0 8px;
    }
    @media (max-width: 620px) {
      .hol-arena {
        grid-template-columns: 1fr;
        gap: 10px;
      }
    }
    .hol-card {
      background: #1e293b;
      border: 2px solid #334155;
      border-radius: 16px;
      padding: 20px 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      cursor: pointer;
      color: #f8fafc;
      transition: transform 0.16s ease, border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;
      min-height: 185px;
      position: relative;
    }
    .hol-card:hover:not(:disabled) {
      transform: translateY(-3px);
      border-color: #38bdf8;
      background: #243247;
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
    }
    .hol-card:disabled { cursor: default; }
    .hol-card.winner {
      border-color: #22c55e;
      background: rgba(34, 197, 94, 0.14);
      box-shadow: 0 0 22px rgba(34, 197, 94, 0.22);
    }
    .hol-card.loser {
      border-color: #ef4444;
      background: rgba(239, 68, 68, 0.14);
    }
    .hol-card.dimmed { opacity: 0.78; }
    .hol-flag {
      width: 84px;
      height: 56px;
      object-fit: cover;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
      margin-bottom: 12px;
      border: 1px solid rgba(255, 255, 255, 0.15);
    }
    .hol-icon {
      font-size: 2.7rem;
      line-height: 1;
      margin-bottom: 12px;
    }
    .hol-name {
      font-size: 1.12rem;
      font-weight: 700;
      margin-bottom: 4px;
      line-height: 1.3;
    }
    .hol-sub {
      font-size: 0.8rem;
      color: #94a3b8;
      margin-bottom: 12px;
    }
    .hol-value {
      font-size: 1.15rem;
      font-weight: 800;
      padding: 6px 14px;
      border-radius: 999px;
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid #334155;
      color: #cbd5e1;
      letter-spacing: 0.02em;
    }
    .hol-card.winner .hol-value {
      color: #4ade80;
      border-color: rgba(34, 197, 94, 0.45);
    }
    .hol-card.loser .hol-value {
      color: #f87171;
      border-color: rgba(239, 68, 68, 0.45);
    }
    .hol-vs {
      align-self: center;
      justify-self: center;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: #0f172a;
      border: 2px solid #334155;
      color: #94a3b8;
      font-weight: 800;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;
  document.head.appendChild(style);
}

function formatHolValue(subType, val, lang) {
  if (subType === "population") {
    if (val < 1) {
      const k = Math.round(val * 1000);
      return lang === "de" ? `${k.toLocaleString("de-DE")} Tsd. Einw.` : `${k.toLocaleString("en-US")}K people`;
    }
    const formatted = lang === "de" ? val.toFixed(1).replace(".", ",") : val.toFixed(1);
    return lang === "de" ? `${formatted} Mio. Einw.` : `${formatted}M people`;
  }
  if (subType === "area") {
    const formatted = Math.round(val).toLocaleString(lang === "de" ? "de-DE" : "en-US");
    return `${formatted} km²`;
  }
  if (subType === "inventions") {
    if (val < 0) {
      const absYear = Math.abs(val);
      return lang === "de" ? `ca. ${absYear} v. Chr.` : `c. ${absYear} BC`;
    }
    return lang === "de" ? `Jahr ${val}` : `Year ${val}`;
  }
  return String(val);
}

function generateHolRound(count) {
  const availableTypes = [];
  if (typeof HOL_COUNTRIES !== "undefined" && HOL_COUNTRIES.length >= 2) {
    if (selectedHolCategory === "all" || selectedHolCategory === "population") availableTypes.push("population");
    if (selectedHolCategory === "all" || selectedHolCategory === "area") availableTypes.push("area");
  }
  if (typeof HOL_INVENTIONS !== "undefined" && HOL_INVENTIONS.length >= 2) {
    if (selectedHolCategory === "all" || selectedHolCategory === "inventions") availableTypes.push("inventions");
  }
  if (availableTypes.length === 0) return [];

  const questions = [];
  const usedPairs = new Set();

  for (let i = 0; i < count; i++) {
    const subType = availableTypes[i % availableTypes.length];
    const source = subType === "inventions" ? HOL_INVENTIONS : HOL_COUNTRIES;
    let bestPair = null;

    for (let attempt = 0; attempt < 150; attempt++) {
      const idxA = Math.floor(Math.random() * source.length);
      let idxB = Math.floor(Math.random() * source.length);
      if (idxA === idxB) continue;

      const a = source[idxA];
      const b = source[idxB];
      const keyA = a.code || a.id;
      const keyB = b.code || b.id;
      const pairKey = `${subType}:${[keyA, keyB].sort().join("-")}`;
      if (usedPairs.has(pairKey)) continue;

      const valA = subType === "population" ? a.pop : subType === "area" ? a.area : a.year;
      const valB = subType === "population" ? b.pop : subType === "area" ? b.area : b.year;
      if (valA === valB) continue;

      let diffOk = true;
      if (subType === "inventions") {
        const gap = Math.abs(valA - valB);
        if (selectedDifficulty === "easy") diffOk = gap >= 80;
        else if (selectedDifficulty === "medium") diffOk = gap >= 25 && gap < 120;
        else if (selectedDifficulty === "hard") diffOk = gap >= 2 && gap <= 45;
      } else {
        const ratio = Math.max(valA, valB) / Math.min(valA, valB);
        if (selectedDifficulty === "easy") diffOk = ratio >= 2.2;
        else if (selectedDifficulty === "medium") diffOk = ratio >= 1.35 && ratio < 2.8;
        else if (selectedDifficulty === "hard") diffOk = ratio >= 1.06 && ratio <= 1.65;
      }

      bestPair = { a, b, valA, valB, pairKey };
      if (diffOk) break;
    }

    if (bestPair) {
      usedPairs.add(bestPair.pairKey);
      const correctIdx = subType === "inventions"
        ? (bestPair.valA < bestPair.valB ? 0 : 1)
        : (bestPair.valA > bestPair.valB ? 0 : 1);

      const winnerItem = correctIdx === 0 ? bestPair.a : bestPair.b;
      questions.push({
        isHol: true,
        subType,
        items: [bestPair.a, bestPair.b],
        values: [bestPair.valA, bestPair.valB],
        answer: correctIdx,
        userChoice: null,
        en: { fact: winnerItem.factEn },
        de: { fact: winnerItem.factDe }
      });
    }
  }

  return questions.sort(() => Math.random() - 0.5);
}

function getOrCreateHolArena() {
  injectHigherLowerStyles();
  let arena = document.getElementById("hol-arena");
  if (!arena) {
    arena = document.createElement("div");
    arena.id = "hol-arena";
    arena.className = "hol-arena";
    const optionsList = document.getElementById("options-list");
    optionsList.parentNode.insertBefore(arena, optionsList);
  }
  return arena;
}

function renderHolArena(item) {
  const t = UI_STRINGS[currentLang];
  const arena = getOrCreateHolArena();
  arena.classList.remove("hidden");
  arena.innerHTML = "";

  item.items.forEach((entry, idx) => {
    if (idx === 1) {
      const vs = document.createElement("div");
      vs.className = "hol-vs";
      vs.textContent = "VS";
      arena.appendChild(vs);
    }

    const card = document.createElement("button");
    card.className = "hol-card";
    card.disabled = answered;

    if (answered) {
      if (idx === item.answer) card.classList.add("winner");
      else if (idx === item.userChoice) card.classList.add("loser");
      else card.classList.add("dimmed");
    }

    const mediaHtml = entry.code
      ? `<img class="hol-flag" src="https://flagcdn.com/w160/${entry.code}.png" alt="${entry[currentLang]}">`
      : `<div class="hol-icon">${entry.icon}</div>`;

    const displayVal = answered
      ? `${idx === item.answer ? "🏆 " : ""}${formatHolValue(item.subType, item.values[idx], currentLang)}`
      : "???";

    card.innerHTML = `
      ${mediaHtml}
      <div class="hol-name">${entry[currentLang]}</div>
      <div class="hol-sub">${t.holSubtitles[item.subType]}</div>
      <div class="hol-value">${displayVal}</div>
    `;

    card.onclick = () => handleHolGuess(idx);
    arena.appendChild(card);
  });
}

function handleHolGuess(selectedIdx) {
  if (answered) return;
  answered = true;

  const t = UI_STRINGS[currentLang];
  const item = activeQuestions[currentIndex];
  item.userChoice = selectedIdx;
  const isWin = selectedIdx === item.answer;

  recordItemAtlas(item, isWin);

  if (isWin) {
    correctCount++;
    streak++;
    if (streak > bestRunStreak) bestRunStreak = streak;
    totalPoints += 100;
    lastStatusHtml = `<strong>${t.holCorrectMsg}</strong> `;
  } else {
    streak = 0;
    lastStatusHtml = `<strong>${t.holWrongMsg}</strong> `;
  }

  renderHolArena(item);

  document.getElementById("ui-score").textContent = t.pointsBadge(totalPoints);
  document.getElementById("ui-streak").textContent = `🔥 ${streak}`;
  document.getElementById("progress-fill").style.width = `${((currentIndex + 1) / activeQuestions.length) * 100}%`;

  const expBox = document.getElementById("explanation-box");
  expBox.innerHTML = `${lastStatusHtml}<strong>${t.didYouKnow}</strong> ${item[currentLang].fact}`;
  expBox.style.display = "block";

  const nextBtn = document.getElementById("btn-next");
  nextBtn.textContent = currentIndex < activeQuestions.length - 1 ? t.nextBtn : t.finishBtn;
  document.getElementById("next-wrap").style.display = "block";
}

// =========================================================================
// 10. SPIELSTART (NORMAL, TAGES-CHALLENGE & FEHLER-TRAINING)
// =========================================================================
async function startDailyChallenge() {
  stopTimer();
  const seedStr = getTodaySeedStr();
  isDailySession = true;
  dailySeedValue = seedStr;
  isWeaknessSession = false;

  currentIndex = 0;
  correctCount = 0;
  totalPoints = 0;
  streak = 0;
  bestRunStreak = 0;
  chronoState = null;

  document.getElementById("screen-home").classList.add("hidden");
  document.getElementById("screen-result").classList.add("hidden");
  document.getElementById("screen-quiz").classList.remove("hidden");

  await ensureMapLoaded();
  activeQuestions = buildDailySeedQuestions(seedStr);
  renderQuestion(false);
}

async function startWeaknessTraining() {
  stopTimer();
  const weakQuestions = buildWeaknessQuestions();
  if (weakQuestions.length === 0) return;

  isDailySession = false;
  dailySeedValue = null;
  isWeaknessSession = true;

  currentIndex = 0;
  correctCount = 0;
  totalPoints = 0;
  streak = 0;
  bestRunStreak = 0;
  chronoState = null;

  document.getElementById("screen-home").classList.add("hidden");
  document.getElementById("screen-result").classList.add("hidden");
  document.getElementById("screen-quiz").classList.remove("hidden");

  await ensureMapLoaded();
  activeQuestions = weakQuestions;
  renderQuestion(false);
}

async function startQuiz() {
  stopTimer();
  isDailySession = false;
  dailySeedValue = null;
  isWeaknessSession = false;

  const pool = [...getPool()].sort(() => Math.random() - 0.5);
  const count = selectedLength === "all" ? pool.length : Math.min(pool.length, selectedLength);

  currentIndex = 0;
  correctCount = 0;
  totalPoints = 0;
  streak = 0;
  bestRunStreak = 0;
  chronoState = null;

  document.getElementById("screen-home").classList.add("hidden");
  document.getElementById("screen-result").classList.add("hidden");
  document.getElementById("screen-quiz").classList.remove("hidden");

  const mapModes = ["map", "pinpoint", "radar", "border", "flight"];
  const topoDataModes = ["silhouette", "missing", "dossier"];

  if (mapModes.includes(currentMode)) {
    await ensureMapLoaded();
  } else if (topoDataModes.includes(currentMode)) {
    await ensureWorldDataLoaded();
  }

  if (currentMode === "flags") {
    activeQuestions = pool.slice(0, count).map(buildFlagQuestion);
  } else if (currentMode === "flagzoom") {
    activeQuestions = pool.slice(0, count).map(buildFlagZoomQuestion);
  } else if (currentMode === "map") {
    activeQuestions = pool.slice(0, count).map(buildMapQuestion);
  } else if (currentMode === "silhouette") {
    activeQuestions = pool.slice(0, count).map(buildSilhouetteQuestion);
  } else if (currentMode === "missing") {
    activeQuestions = buildMissingNeighborQuestions(pool, count);
  } else if (currentMode === "border") {
    activeQuestions = buildBorderRouteQuestions(pool, count);
  } else if (currentMode === "dossier") {
    activeQuestions = buildDossierQuestions(pool, count);
  } else if (currentMode === "flight") {
    activeQuestions = buildFlightQuestions(pool, count);
  } else if (currentMode === "pinpoint") {
    activeQuestions = pool.slice(0, count).map(buildPinpointQuestion);
  } else if (currentMode === "radar") {
    activeQuestions = pool.slice(0, count).map(buildRadarQuestion);
  } else if (currentMode === "hol") {
    activeQuestions = generateHolRound(count);
  } else if (currentMode === "chrono") {
    initChronoChain();
    activeQuestions = [{ isChrono: true }];
  } else {
    activeQuestions = pool.slice(0, count);
  }

  renderQuestion(false);
}

// =========================================================================
// 11. WELTKARTEN-ENGINE (MAP, PINPOINT, RADAR, BORDER-ROUTE, FLIGHT)
// =========================================================================
function injectBlindMapStyles() {
  if (document.getElementById("blind-map-styles")) return;
  const style = document.createElement("style");
  style.id = "blind-map-styles";
  style.textContent = `
    #world-map.blind-mode .country-path:not(.correct):not(.wrong) {
      stroke: #334155 !important;
    }
    #world-map.blind-mode .country-path:not(.correct):not(.wrong):hover {
      fill: #334155 !important;
    }
    #world-map.pinpoint-mode .country-path {
      cursor: crosshair !important;
    }
    #world-map.pinpoint-mode .country-path:hover {
      fill: #3b4c66 !important;
    }
    .country-path.border-start {
      fill: #3b82f6 !important;
      stroke: #93c5fd !important;
    }
    .country-path.border-visited {
      fill: #eab308 !important;
      stroke: #fef08a !important;
    }
    .country-path.border-current {
      fill: #f59e0b !important;
      stroke: #ffffff !important;
    }
    .country-path.border-target {
      fill: #ef4444 !important;
      stroke: #fecaca !important;
    }
    .country-path.border-done {
      fill: #22c55e !important;
      stroke: #ffffff !important;
    }
    .coastline-path {
      fill: none;
      stroke: #64748b;
      stroke-width: 0.7px;
      pointer-events: none;
    }
    .micro-hit {
      fill: rgba(148, 163, 184, 0.28);
      stroke: rgba(148, 163, 184, 0.55);
      stroke-width: 0.35px;
      cursor: pointer;
    }
    #world-map.blind-mode .micro-hit,
    #world-map.pinpoint-mode .micro-hit {
      fill: transparent;
      stroke: transparent;
      pointer-events: none;
    }
    .micro-hit.correct { fill: #22c55e !important; stroke: #ffffff !important; }
    .micro-hit.wrong { fill: #ef4444 !important; stroke: #ffffff !important; }
    .pinpoint-line {
      stroke: #fbbf24;
      stroke-width: 1.6px;
      stroke-dasharray: 4 3;
      pointer-events: none;
    }
    .pinpoint-guess {
      fill: #ef4444;
      stroke: #ffffff;
      stroke-width: 1.4px;
      pointer-events: none;
    }
    .pinpoint-target-ring {
      fill: rgba(34, 197, 94, 0.22);
      stroke: #22c55e;
      stroke-width: 1.4px;
      pointer-events: none;
    }
    .pinpoint-target {
      fill: #22c55e;
      stroke: #ffffff;
      stroke-width: 1.4px;
      pointer-events: none;
    }
    .pinpoint-label {
      fill: #f8fafc;
      font-size: 10px;
      font-weight: 700;
      paint-order: stroke;
      stroke: #0f172a;
      stroke-width: 2.6px;
      stroke-linecap: round;
      stroke-linejoin: round;
      pointer-events: none;
    }
    .radar-hud {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 10px 14px;
      margin-bottom: 10px;
      font-size: 0.88rem;
    }
    .radar-dots {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .radar-dot {
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background: #1e293b;
      border: 1.5px solid #475569;
    }
    .radar-dot.used {
      transform: scale(1.12);
      border-color: #ffffff;
    }
    .radar-status-text {
      font-weight: 700;
      color: #e2e8f0;
    }
    .flight-controls {
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 14px;
      padding: 14px 16px;
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .flight-slider-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .flight-slider {
      flex: 1;
      accent-color: #38bdf8;
      cursor: pointer;
    }
    .flight-val-badge {
      background: #1e293b;
      border: 1px solid #38bdf8;
      color: #38bdf8;
      font-weight: 800;
      padding: 5px 12px;
      border-radius: 999px;
      min-width: 112px;
      text-align: center;
    }
    .radar-ping-pulse, .radar-ping-dot, .radar-ping-num, .radar-ping-dist,
    .radar-target-ring, .radar-target-dot, .radar-target-label, .radar-best-line,
    .flight-arc-path, .flight-city-dot, .flight-city-label {
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);
}

function getOrCreateRadarHud() {
  injectBlindMapStyles();
  let hud = document.getElementById("radar-hud");
  if (!hud) {
    hud = document.createElement("div");
    hud.id = "radar-hud";
    hud.className = "radar-hud hidden";
    const mapWrapper = document.getElementById("map-wrapper");
    mapWrapper.insertBefore(hud, mapWrapper.firstChild);
  }
  return hud;
}

async function ensureWorldDataLoaded() {
  if (worldAtlasData && mapFeatures.length > 0) return true;
  const loadingEl = document.getElementById("map-loading");
  if (loadingEl && !["silhouette", "missing", "dossier"].includes(currentMode)) {
    loadingEl.classList.remove("hidden");
  }
  try {
    worldAtlasData = await d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json");
    const geometries = worldAtlasData.objects.countries.geometries;
    const rawNeighbors = topojson.neighbors(geometries);

    countryNeighborsMap = {};
    geometries.forEach((geom, idx) => {
      const id = String(geom.id).padStart(3, "0");
      if (id === "010") return;
      if (!countryNeighborsMap[id]) countryNeighborsMap[id] = new Set();
      (rawNeighbors[idx] || []).forEach(nIdx => {
        const nId = String(geometries[nIdx].id).padStart(3, "0");
        if (nId !== "010" && nId !== id) {
          countryNeighborsMap[id].add(nId);
        }
      });
    });

    mapFeatures = topojson.feature(worldAtlasData, worldAtlasData.objects.countries).features.filter(f => String(f.id) !== "010");
    return true;
  } catch (err) {
    if (loadingEl) {
      loadingEl.textContent = "Could not load world map data. Please check your internet connection.";
      loadingEl.classList.remove("hidden");
    }
    return false;
  }
}

async function ensureMapLoaded() {
  injectBlindMapStyles();
  if (mapInitialized) return;
  const loadingEl = document.getElementById("map-loading");
  loadingEl.classList.remove("hidden");

  const ok = await ensureWorldDataLoaded();
  if (!ok) return;

  mapSvg = d3.select("#world-map");
  mapG = mapSvg.append("g");

  mapProjection = d3.geoNaturalEarth1()
    .scale(175)
    .translate([470, 265]);

  mapPath = d3.geoPath().projection(mapProjection);

  mapG.selectAll("path.country-path")
    .data(mapFeatures)
    .enter()
    .append("path")
    .attr("d", mapPath)
    .attr("class", "country-path")
    .attr("data-id", d => String(d.id).padStart(3, "0"))
    .on("click", (event, d) => {
      event.stopPropagation();
      const clickedId = String(d.id).padStart(3, "0");
      if (currentMode === "pinpoint") handlePinpointClick(event);
      else if (currentMode === "radar") handleRadarClick(event);
      else if (currentMode === "border") handleBorderCountryClick(clickedId, d);
      else if (currentMode === "flight") return;
      else handleMapGuess(clickedId, d);
    });

  const coastline = topojson.mesh(worldAtlasData, worldAtlasData.objects.countries, (a, b) => a === b);
  mapG.append("path")
    .datum(coastline)
    .attr("class", "coastline-path")
    .attr("d", mapPath);

  const microFeatures = mapFeatures.filter(f => {
    const b = mapPath.bounds(f);
    const dx = b[1][0] - b[0][0];
    const dy = b[1][1] - b[0][1];
    return isFinite(dx) && isFinite(dy) && dx >= 0 && dy >= 0 && (dx < 3.8 || dy < 3.8);
  });

  mapG.selectAll("circle.micro-hit")
    .data(microFeatures)
    .enter()
    .append("circle")
    .attr("class", "micro-hit")
    .attr("cx", d => mapPath.centroid(d)[0])
    .attr("cy", d => mapPath.centroid(d)[1])
    .attr("r", 2.0)
    .attr("data-id", d => String(d.id).padStart(3, "0"))
    .on("click", (event, d) => {
      event.stopPropagation();
      const clickedId = String(d.id).padStart(3, "0");
      if (currentMode === "pinpoint") handlePinpointClick(event);
      else if (currentMode === "radar") handleRadarClick(event);
      else if (currentMode === "border") handleBorderCountryClick(clickedId, d);
      else if (currentMode === "flight") return;
      else handleMapGuess(clickedId, d);
    });

  pinpointLayer = mapG.append("g").attr("class", "pinpoint-layer");
  radarLayer = mapG.append("g").attr("class", "radar-layer");
  flightLayer = mapG.append("g").attr("class", "flight-layer");

  mapSvg.on("click", (event) => {
    if (answered) return;
    if (currentMode === "pinpoint") handlePinpointClick(event);
    else if (currentMode === "radar") handleRadarClick(event);
  });

  mapZoom = d3.zoom()
    .scaleExtent([1, 24])
    .clickDistance(4)
    .on("zoom", (event) => {
      const k = event.transform.k;
      mapG.attr("transform", event.transform);
      mapG.selectAll("circle.micro-hit")
        .attr("r", 2.0 / Math.pow(k, 0.65))
        .style("stroke-width", `${0.35 / Math.sqrt(k)}px`);
      mapG.selectAll(".country-path")
        .style("stroke-width", `${0.6 / Math.sqrt(k)}px`);
      mapG.selectAll(".coastline-path")
        .style("stroke-width", `${0.7 / Math.sqrt(k)}px`);

      const inv = Math.pow(k, 0.65);
      if (pinpointLayer) {
        pinpointLayer.selectAll(".pinpoint-guess, .pinpoint-target")
          .attr("r", 4.5 / inv)
          .style("stroke-width", `${1.4 / inv}px`);
        pinpointLayer.selectAll(".pinpoint-target-ring")
          .attr("r", 11 / inv)
          .style("stroke-width", `${1.4 / inv}px`);
        pinpointLayer.selectAll(".pinpoint-line")
          .style("stroke-width", `${1.6 / inv}px`)
          .style("stroke-dasharray", `${4 / inv} ${3 / inv}`);
        pinpointLayer.selectAll(".pinpoint-label")
          .style("font-size", `${10 / inv}px`)
          .style("stroke-width", `${2.6 / inv}px`)
          .attr("dy", `${-8 / inv}px`);
      }
      if (radarLayer) {
        radarLayer.selectAll(".radar-ping-pulse")
          .attr("r", 12 / inv)
          .style("stroke-width", `${1.3 / inv}px`);
        radarLayer.selectAll(".radar-ping-dot")
          .attr("r", 5.5 / inv)
          .style("stroke-width", `${1.3 / inv}px`);
        radarLayer.selectAll(".radar-ping-num")
          .style("font-size", `${7.5 / inv}px`)
          .attr("dy", `${2.6 / inv}px`);
        radarLayer.selectAll(".radar-ping-dist")
          .style("font-size", `${8.5 / inv}px`)
          .style("stroke-width", `${2.2 / inv}px`)
          .attr("dy", `${-8 / inv}px`);
        radarLayer.selectAll(".radar-target-ring")
          .attr("r", 13 / inv)
          .style("stroke-width", `${1.6 / inv}px`);
        radarLayer.selectAll(".radar-target-dot")
          .attr("r", 5 / inv)
          .style("stroke-width", `${1.4 / inv}px`);
        radarLayer.selectAll(".radar-target-label")
          .style("font-size", `${10.5 / inv}px`)
          .style("stroke-width", `${2.8 / inv}px`)
          .attr("dy", `${15 / inv}px`);
        radarLayer.selectAll(".radar-best-line")
          .style("stroke-width", `${1.6 / inv}px`)
          .style("stroke-dasharray", `${4 / inv} ${3 / inv}`);
      }
      if (flightLayer) {
        flightLayer.selectAll(".flight-city-dot")
          .attr("r", 5 / inv)
          .style("stroke-width", `${1.5 / inv}px`);
        flightLayer.selectAll(".flight-arc-path")
          .style("stroke-width", `${2.4 / inv}px`);
        flightLayer.selectAll(".flight-city-label")
          .style("font-size", `${10 / inv}px`)
          .style("stroke-width", `${2.6 / inv}px`)
          .attr("dy", `${-8 / inv}px`);
      }
    });

  mapSvg.call(mapZoom);
  mapInitialized = true;
  loadingEl.classList.add("hidden");
}

function zoomMap(factor) {
  if (!mapSvg || !mapZoom) return;
  mapSvg.transition().duration(250).call(mapZoom.scaleBy, factor);
}

function resetMapZoom() {
  if (!mapSvg || !mapZoom) return;
  mapSvg.transition().duration(350).call(mapZoom.transform, d3.zoomIdentity);
}

function clearMapLayers() {
  if (!mapG) return;
  mapG.selectAll(".country-path, .micro-hit")
    .classed("correct", false)
    .classed("wrong", false)
    .classed("border-start", false)
    .classed("border-visited", false)
    .classed("border-current", false)
    .classed("border-target", false)
    .classed("border-done", false);
  if (pinpointLayer) pinpointLayer.selectAll("*").remove();
  if (radarLayer) radarLayer.selectAll("*").remove();
  if (flightLayer) flightLayer.selectAll("*").remove();
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
  const scale = Math.max(2.0, Math.min(14, 0.45 / Math.max(dx / 960, dy / 500)));
  const translate = [960 / 2 - scale * x, 500 / 2 - scale * y];

  mapSvg.transition().duration(650).call(
    mapZoom.transform,
    d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
  );
}

function focusTwoPointsOnMap(p1, p2) {
  if (!mapSvg || !mapZoom) return;
  const minX = Math.min(p1[0], p2[0]);
  const maxX = Math.max(p1[0], p2[0]);
  const minY = Math.min(p1[1], p2[1]);
  const maxY = Math.max(p1[1], p2[1]);

  const dx = Math.max(40, maxX - minX);
  const dy = Math.max(40, maxY - minY);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;

  const scale = Math.max(1.4, Math.min(8, 0.5 / Math.max(dx / 960, dy / 500)));
  const translate = [960 / 2 - scale * cx, 500 / 2 - scale * cy];

  mapSvg.transition().duration(650).call(
    mapZoom.transform,
    d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
  );
}

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// =========================================================================
// 11A. GRENZ-ROUTE (BORDER ROUTE) LOGIK & RENDERER
// =========================================================================
function updateBorderRouteBoard(item) {
  const t = UI_STRINGS[currentLang];
  const hud = getOrCreateRadarHud();
  hud.classList.remove("hidden");

  const stepsTaken = item.visitedPath.length - 1;
  const canUndo = !answered && item.visitedPath.length > 1;
  const pathNames = item.visitedPath.map(id => getCountryNameById(id, null)).join(" → ");

  hud.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:3px;">
      <span style="font-weight:800;color:#38bdf8;">${t.borderHud(stepsTaken, item.parSteps)}</span>
      <span style="font-size:0.8rem;color:#cbd5e1;">🚩 ${pathNames} → 🏁 ${item[currentLang].endName}</span>
      ${item.warningMsg ? `<span style="font-size:0.8rem;color:#fbbf24;font-weight:700;">${item.warningMsg}</span>` : ""}
    </div>
    <button class="pill-btn" style="padding:5px 10px;font-size:0.8rem;" ${canUndo ? "" : "disabled"} onclick="undoBorderStep()">${t.borderUndo}</button>
  `;

  if (!mapG) return;
  const currentId = item.visitedPath[item.visitedPath.length - 1];
  const visitedSet = new Set(item.visitedPath);

  mapG.selectAll(".country-path")
    .classed("border-start", d => !answered && String(d.id).padStart(3, "0") === item.startId && currentId !== item.startId)
    .classed("border-visited", d => !answered && visitedSet.has(String(d.id).padStart(3, "0")) && String(d.id).padStart(3, "0") !== currentId)
    .classed("border-current", d => !answered && String(d.id).padStart(3, "0") === currentId)
    .classed("border-target", d => !answered && String(d.id).padStart(3, "0") === item.endId)
    .classed("border-done", d => answered && visitedSet.has(String(d.id).padStart(3, "0")));
}

function undoBorderStep() {
  const item = activeQuestions[currentIndex];
  if (!item || !item.isBorder || answered || item.visitedPath.length <= 1) return;
  item.visitedPath.pop();
  item.warningMsg = "";
  updateBorderRouteBoard(item);
}

function handleBorderCountryClick(clickedId, clickedFeature) {
  if (answered) return;
  const t = UI_STRINGS[currentLang];
  const item = activeQuestions[currentIndex];
  const currentId = item.visitedPath[item.visitedPath.length - 1];

  if (clickedId === currentId) return;

  const existingIdx = item.visitedPath.indexOf(clickedId);
  if (existingIdx !== -1) {
    item.visitedPath = item.visitedPath.slice(0, existingIdx + 1);
    item.warningMsg = "";
    updateBorderRouteBoard(item);
    return;
  }

  const neighbors = countryNeighborsMap[currentId];
  if (!neighbors || !neighbors.has(clickedId)) {
    const clickedName = getCountryNameById(clickedId, clickedFeature) || "???";
    item.warningMsg = t.borderInvalidNeighbor(clickedName);
    updateBorderRouteBoard(item);
    return;
  }

  item.warningMsg = "";
  item.visitedPath.push(clickedId);

  if (clickedId === item.endId) {
    answered = true;
    const steps = item.visitedPath.length - 1;
    const extraSteps = Math.max(0, steps - item.parSteps);
    const earned = Math.max(75, 250 - extraSteps * 40);
    item.earned = earned;

    recordItemAtlas(item, true);
    correctCount++;
    streak++;
    if (streak > bestRunStreak) bestRunStreak = streak;
    totalPoints += earned;
    lastStatusHtml = `<strong>${t.borderWinMsg(steps, item.parSteps, earned)}</strong> `;

    updateBorderRouteBoard(item);

    document.getElementById("ui-score").textContent = t.pointsBadge(totalPoints);
    document.getElementById("ui-streak").textContent = `🔥 ${streak}`;
    document.getElementById("progress-fill").style.width = `${((currentIndex + 1) / activeQuestions.length) * 100}%`;

    const expBox = document.getElementById("explanation-box");
    expBox.innerHTML = `${lastStatusHtml}<strong>${t.didYouKnow}</strong> ${item[currentLang].fact}`;
    expBox.style.display = "block";

    const nextBtn = document.getElementById("btn-next");
    nextBtn.textContent = currentIndex < activeQuestions.length - 1 ? t.nextBtn : t.finishBtn;
    document.getElementById("next-wrap").style.display = "block";
  } else {
    updateBorderRouteBoard(item);
  }
}

// =========================================================================
// 11B. LUFTLINIEN-SCHÄTZER (GREAT-CIRCLE FLIGHT ESTIMATOR)
// =========================================================================
function renderFlightEstimator(item) {
  const t = UI_STRINGS[currentLang];
  let ctrlBox = document.getElementById("flight-controls");
  if (!ctrlBox) {
    ctrlBox = document.createElement("div");
    ctrlBox.id = "flight-controls";
    ctrlBox.className = "flight-controls hidden";
    const mapWrapper = document.getElementById("map-wrapper");
    mapWrapper.appendChild(ctrlBox);
  }
  ctrlBox.classList.remove("hidden");

  const unitFmt = (km) => `${km.toLocaleString(currentLang === "de" ? "de-DE" : "en-US")} km`;

  ctrlBox.innerHTML = `
    <div class="flight-slider-row">
      <input id="flight-slider" class="flight-slider" type="range" min="300" max="19500" step="50" value="${item.guessKm}" ${answered ? "disabled" : ""}>
      <span id="flight-val-badge" class="flight-val-badge">${unitFmt(item.guessKm)}</span>
    </div>
    <button id="btn-flight-lock" class="btn-primary" style="margin:0;" ${answered ? "disabled" : ""} onclick="lockFlightEstimate()">
      ${t.flightLockBtn(unitFmt(item.guessKm))}
    </button>
  `;

  const slider = document.getElementById("flight-slider");
  const badge = document.getElementById("flight-val-badge");
  const lockBtn = document.getElementById("btn-flight-lock");

  if (slider) {
    slider.oninput = () => {
      item.guessKm = Number(slider.value);
      badge.textContent = unitFmt(item.guessKm);
      lockBtn.textContent = t.flightLockBtn(unitFmt(item.guessKm));
    };
  }

  drawFlightMapPoints(item);
}

function drawFlightMapPoints(item) {
  if (!flightLayer || !mapProjection || !mapPath) return;
  flightLayer.selectAll("*").remove();

  const k = mapSvg ? d3.zoomTransform(mapSvg.node()).k : 1;
  const inv = Math.pow(k, 0.65);

  const ptA = mapProjection([item.cityA.lon, item.cityA.lat]);
  const ptB = mapProjection([item.cityB.lon, item.cityB.lat]);

  if (answered) {
    const greatCircleGeo = {
      type: "LineString",
      coordinates: [
        [item.cityA.lon, item.cityA.lat],
        [item.cityB.lon, item.cityB.lat]
      ]
    };

    flightLayer.append("path")
      .datum(greatCircleGeo)
      .attr("class", "flight-arc-path")
      .attr("d", mapPath)
      .style("fill", "none")
      .style("stroke", "#38bdf8")
      .style("stroke-width", `${2.4 / inv}px`)
      .style("stroke-linecap", "round");
  }

  const cities = [
    { pt: ptA, label: currentLang === "de" ? item.cityA.de : item.cityA.en, color: "#38bdf8" },
    { pt: ptB, label: currentLang === "de" ? item.cityB.de : item.cityB.en, color: "#f59e0b" }
  ];

  cities.forEach(c => {
    if (!c.pt) return;
    flightLayer.append("circle")
      .attr("class", "flight-city-dot")
      .attr("cx", c.pt[0])
      .attr("cy", c.pt[1])
      .attr("r", 5 / inv)
      .style("fill", c.color)
      .style("stroke", "#ffffff")
      .style("stroke-width", `${1.5 / inv}px`);

    flightLayer.append("text")
      .attr("class", "flight-city-label")
      .attr("x", c.pt[0])
      .attr("y", c.pt[1])
      .attr("dy", `${-8 / inv}px`)
      .attr("text-anchor", "middle")
      .style("fill", "#f8fafc")
      .style("font-size", `${10 / inv}px`)
      .style("font-weight", "800")
      .style("paint-order", "stroke")
      .style("stroke", "#0f172a")
      .style("stroke-width", `${2.6 / inv}px`)
      .text(c.label);
  });
}

function lockFlightEstimate() {
  if (answered) return;
  answered = true;

  const t = UI_STRINGS[currentLang];
  const item = activeQuestions[currentIndex];
  const errRatio = Math.abs(item.guessKm - item.actualKm) / item.actualKm;
  const errPct = Math.round(errRatio * 100);

  let earned = 0;
  if (errPct <= 5) earned = 250;
  else if (errPct <= 12) earned = 200;
  else if (errPct <= 22) earned = 150;
  else if (errPct <= 35) earned = 100;
  else if (errPct <= 50) earned = 50;

  item.errPct = errPct;
  item.earned = earned;

  if (errPct <= 25) {
    correctCount++;
    streak++;
    if (streak > bestRunStreak) bestRunStreak = streak;
  } else {
    streak = 0;
  }
  totalPoints += earned;

  const locale = currentLang === "de" ? "de-DE" : "en-US";
  const guessStr = `${item.guessKm.toLocaleString(locale)} km`;
  const actualStr = `${item.actualKm.toLocaleString(locale)} km`;
  lastStatusHtml = `<strong>${t.flightResultMsg(guessStr, actualStr, errPct, earned)}</strong> `;

  renderFlightEstimator(item);

  document.getElementById("ui-score").textContent = t.pointsBadge(totalPoints);
  document.getElementById("ui-streak").textContent = `🔥 ${streak}`;
  document.getElementById("progress-fill").style.width = `${((currentIndex + 1) / activeQuestions.length) * 100}%`;

  const expBox = document.getElementById("explanation-box");
  expBox.innerHTML = `${lastStatusHtml}<strong>${t.didYouKnow}</strong> ${item[currentLang].fact}`;
  expBox.style.display = "block";

  const nextBtn = document.getElementById("btn-next");
  nextBtn.textContent = currentIndex < activeQuestions.length - 1 ? t.nextBtn : t.finishBtn;
  document.getElementById("next-wrap").style.display = "block";
}

// =========================================================================
// 11C. HEISS ODER KALT (GEO-RADAR)
// =========================================================================
function getRadarThermalInfo(km) {
  if (km <= RADAR_HIT_KM) return { zone: "hit", color: "#22c55e", fillAlpha: "rgba(34, 197, 94, 0.25)" };
  if (km < 600) return { zone: "scorching", color: "#ef4444", fillAlpha: "rgba(239, 68, 68, 0.25)" };
  if (km < 1500) return { zone: "hot", color: "#f97316", fillAlpha: "rgba(249, 115, 22, 0.22)" };
  if (km < 3000) return { zone: "warm", color: "#eab308", fillAlpha: "rgba(234, 179, 8, 0.22)" };
  if (km <= 5000) return { zone: "cool", color: "#06b6d4", fillAlpha: "rgba(6, 182, 212, 0.22)" };
  return { zone: "freezing", color: "#3b82f6", fillAlpha: "rgba(59, 130, 246, 0.22)" };
}

function getRadarScoreByPing(pingNumber) {
  const scores = { 1: 300, 2: 250, 3: 200, 4: 150, 5: 100, 6: 75 };
  return scores[pingNumber] || 75;
}

function updateRadarHud(item) {
  const t = UI_STRINGS[currentLang];
  const hud = getOrCreateRadarHud();
  hud.classList.remove("hidden");

  const rem = Math.max(0, RADAR_MAX_PINGS - item.pings.length);
  let dotsHtml = `<div class="radar-dots" title="${t.radarPingsLeft(rem, RADAR_MAX_PINGS)}">`;
  for (let i = 0; i < RADAR_MAX_PINGS; i++) {
    const ping = item.pings[i];
    if (ping) dotsHtml += `<span class="radar-dot used" style="background:${ping.color};"></span>`;
    else dotsHtml += `<span class="radar-dot"></span>`;
  }
  dotsHtml += `<span style="margin-left:6px;font-size:0.8rem;color:#94a3b8;">${rem}/${RADAR_MAX_PINGS}</span></div>`;

  let statusText = t.radarReady;
  if (item.pings.length > 0) {
    const last = item.pings[item.pings.length - 1];
    const distStr = `${last.distKm.toLocaleString(currentLang === "de" ? "de-DE" : "en-US")} km`;
    const zoneLabel = t.radarZones[last.zone];
    let trendStr = "";
    if (item.pings.length >= 2 && last.zone !== "hit") {
      const prev = item.pings[item.pings.length - 2];
      if (last.distKm < prev.distKm) trendStr = ` • ${t.radarWarmer}`;
      else if (last.distKm > prev.distKm) trendStr = ` • ${t.radarColder}`;
      else trendStr = ` • ${t.radarSame}`;
    }
    statusText = `<span style="color:${last.color};">Ping #${item.pings.length}: ${distStr} (${zoneLabel})</span>${trendStr}`;
  }

  hud.innerHTML = `${dotsHtml}<div class="radar-status-text">${statusText}</div>`;
}

function renderRadarBoard(item) {
  if (!radarLayer) return;
  radarLayer.selectAll("*").remove();

  const k = mapSvg ? d3.zoomTransform(mapSvg.node()).k : 1;
  const inv = Math.pow(k, 0.65);

  item.pings.forEach((p, idx) => {
    const distLabel = `${p.distKm.toLocaleString(currentLang === "de" ? "de-DE" : "en-US")} km`;

    radarLayer.append("circle")
      .attr("class", "radar-ping-pulse")
      .attr("cx", p.pt[0])
      .attr("cy", p.pt[1])
      .attr("r", 12 / inv)
      .style("fill", p.fillAlpha)
      .style("stroke", p.color)
      .style("stroke-width", `${1.3 / inv}px`);

    radarLayer.append("circle")
      .attr("class", "radar-ping-dot")
      .attr("cx", p.pt[0])
      .attr("cy", p.pt[1])
      .attr("r", 5.5 / inv)
      .style("fill", p.color)
      .style("stroke", "#ffffff")
      .style("stroke-width", `${1.3 / inv}px`);

    radarLayer.append("text")
      .attr("class", "radar-ping-num")
      .attr("x", p.pt[0])
      .attr("y", p.pt[1])
      .attr("dy", `${2.6 / inv}px`)
      .attr("text-anchor", "middle")
      .style("fill", "#ffffff")
      .style("font-weight", "800")
      .style("font-size", `${7.5 / inv}px`)
      .text(idx + 1);

    radarLayer.append("text")
      .attr("class", "radar-ping-dist")
      .attr("x", p.pt[0])
      .attr("y", p.pt[1])
      .attr("dy", `${-8 / inv}px`)
      .attr("text-anchor", "middle")
      .style("fill", p.color)
      .style("font-weight", "700")
      .style("font-size", `${8.5 / inv}px`)
      .style("paint-order", "stroke")
      .style("stroke", "#0f172a")
      .style("stroke-width", `${2.2 / inv}px`)
      .text(distLabel);
  });

  if (answered && item.targetPt) {
    if (item.bestPingPt) {
      radarLayer.append("line")
        .attr("class", "radar-best-line")
        .attr("x1", item.bestPingPt[0])
        .attr("y1", item.bestPingPt[1])
        .attr("x2", item.targetPt[0])
        .attr("y2", item.targetPt[1])
        .style("stroke", "#22c55e")
        .style("stroke-width", `${1.6 / inv}px`)
        .style("stroke-dasharray", `${4 / inv} ${3 / inv}`);
    }

    radarLayer.append("circle")
      .attr("class", "radar-target-ring")
      .attr("cx", item.targetPt[0])
      .attr("cy", item.targetPt[1])
      .attr("r", 13 / inv)
      .style("fill", "rgba(34, 197, 94, 0.25)")
      .style("stroke", "#22c55e")
      .style("stroke-width", `${1.6 / inv}px`);

    radarLayer.append("circle")
      .attr("class", "radar-target-dot")
      .attr("cx", item.targetPt[0])
      .attr("cy", item.targetPt[1])
      .attr("r", 5 / inv)
      .style("fill", "#22c55e")
      .style("stroke", "#ffffff")
      .style("stroke-width", `${1.4 / inv}px`);

    radarLayer.append("text")
      .attr("class", "radar-target-label")
      .attr("x", item.targetPt[0])
      .attr("y", item.targetPt[1])
      .attr("dy", `${15 / inv}px`)
      .attr("text-anchor", "middle")
      .style("fill", "#4ade80")
      .style("font-weight", "800")
      .style("font-size", `${10.5 / inv}px`)
      .style("paint-order", "stroke")
      .style("stroke", "#0f172a")
      .style("stroke-width", `${2.8 / inv}px`)
      .text(`📍 ${item[currentLang].name}`);
  }
}

function handleRadarClick(event) {
  if (answered || !mapProjection || !mapG) return;
  const item = activeQuestions[currentIndex];
  if (item.pings.length >= RADAR_MAX_PINGS) return;

  const [mx, my] = d3.pointer(event, mapG.node());
  const lonLat = mapProjection.invert([mx, my]);
  if (!lonLat || isNaN(lonLat[0]) || isNaN(lonLat[1])) return;
  if (Math.abs(lonLat[0]) > 180 || Math.abs(lonLat[1]) > 90) return;

  const distKm = haversineKm(lonLat[1], lonLat[0], item.lat, item.lon);
  const thermal = getRadarThermalInfo(distKm);

  item.pings.push({
    pt: [mx, my],
    distKm,
    zone: thermal.zone,
    color: thermal.color,
    fillAlpha: thermal.fillAlpha
  });

  if (item.bestDistKm === null || distKm < item.bestDistKm) {
    item.bestDistKm = distKm;
    item.bestPingPt = [mx, my];
  }

  const isHit = distKm <= RADAR_HIT_KM;
  const outOfPings = item.pings.length >= RADAR_MAX_PINGS;

  if (isHit || outOfPings) {
    answered = true;
    const t = UI_STRINGS[currentLang];
    const targetPt = mapProjection([item.lon, item.lat]);
    item.targetPt = targetPt;

    if (mapSvg) mapSvg.classed("blind-mode", false);

    if (isHit) {
      item.won = true;
      item.earned = getRadarScoreByPing(item.pings.length);
      correctCount++;
      streak++;
      if (streak > bestRunStreak) bestRunStreak = streak;
      totalPoints += item.earned;
      lastStatusHtml = `<strong>${t.radarWinMsg(item.pings.length, distKm, item.earned, item[currentLang].name, item[currentLang].country)}</strong> `;
    } else {
      item.won = false;
      item.earned = 0;
      streak = 0;
      lastStatusHtml = `<strong>${t.radarLoseMsg(item.bestDistKm, item[currentLang].name, item[currentLang].country)}</strong> `;
    }

    updateRadarHud(item);
    renderRadarBoard(item);
    if (item.bestPingPt) focusTwoPointsOnMap(item.bestPingPt, targetPt);

    document.getElementById("ui-score").textContent = t.pointsBadge(totalPoints);
    document.getElementById("ui-streak").textContent = `🔥 ${streak}`;
    document.getElementById("progress-fill").style.width = `${((currentIndex + 1) / activeQuestions.length) * 100}%`;

    const expBox = document.getElementById("explanation-box");
    expBox.innerHTML = `${lastStatusHtml}<strong>${t.didYouKnow}</strong> ${item[currentLang].fact}`;
    expBox.style.display = "block";

    const nextBtn = document.getElementById("btn-next");
    nextBtn.textContent = currentIndex < activeQuestions.length - 1 ? t.nextBtn : t.finishBtn;
    document.getElementById("next-wrap").style.display = "block";
  } else {
    updateRadarHud(item);
    renderRadarBoard(item);
  }
}

// =========================================================================
// 11D. STÄDTE-PINPOINT & SPOT THE COUNTRY
// =========================================================================
function calculatePinpointScore(km) {
  if (km <= 35) return 250;
  if (km <= 120) return 200;
  if (km <= 350) return 150;
  if (km <= 800) return 100;
  if (km <= 1600) return 50;
  return 0;
}

function renderPinpointMarkers(guessPt, targetPt, cityName) {
  if (!pinpointLayer) return;
  pinpointLayer.selectAll("*").remove();

  const k = mapSvg ? d3.zoomTransform(mapSvg.node()).k : 1;
  const inv = Math.pow(k, 0.65);

  pinpointLayer.append("line")
    .attr("class", "pinpoint-line")
    .attr("x1", guessPt[0])
    .attr("y1", guessPt[1])
    .attr("x2", targetPt[0])
    .attr("y2", targetPt[1])
    .style("stroke-width", `${1.6 / inv}px`)
    .style("stroke-dasharray", `${4 / inv} ${3 / inv}`);

  pinpointLayer.append("circle")
    .attr("class", "pinpoint-target-ring")
    .attr("cx", targetPt[0])
    .attr("cy", targetPt[1])
    .attr("r", 11 / inv)
    .style("stroke-width", `${1.4 / inv}px`);

  pinpointLayer.append("circle")
    .attr("class", "pinpoint-target")
    .attr("cx", targetPt[0])
    .attr("cy", targetPt[1])
    .attr("r", 4.5 / inv)
    .style("stroke-width", `${1.4 / inv}px`);

  pinpointLayer.append("circle")
    .attr("class", "pinpoint-guess")
    .attr("cx", guessPt[0])
    .attr("cy", guessPt[1])
    .attr("r", 4.5 / inv)
    .style("stroke-width", `${1.4 / inv}px`);

  pinpointLayer.append("text")
    .attr("class", "pinpoint-label")
    .attr("x", targetPt[0])
    .attr("y", targetPt[1])
    .attr("dy", `${-8 / inv}px`)
    .attr("text-anchor", "middle")
    .style("font-size", `${10 / inv}px`)
    .style("stroke-width", `${2.6 / inv}px`)
    .text(cityName);
}

function handlePinpointClick(event) {
  if (answered || !mapProjection || !mapG) return;
  const [mx, my] = d3.pointer(event, mapG.node());
  const lonLat = mapProjection.invert([mx, my]);
  if (!lonLat || isNaN(lonLat[0]) || isNaN(lonLat[1])) return;
  if (Math.abs(lonLat[0]) > 180 || Math.abs(lonLat[1]) > 90) return;

  answered = true;
  const t = UI_STRINGS[currentLang];
  const item = activeQuestions[currentIndex];
  const targetPt = mapProjection([item.lon, item.lat]);
  const distKm = haversineKm(lonLat[1], lonLat[0], item.lat, item.lon);
  const earned = calculatePinpointScore(distKm);

  item.guessPt = [mx, my];
  item.targetPt = targetPt;
  item.distKm = distKm;
  item.earned = earned;

  if (mapSvg) mapSvg.classed("blind-mode", false);

  renderPinpointMarkers([mx, my], targetPt, item[currentLang].name);
  focusTwoPointsOnMap([mx, my], targetPt);

  if (distKm <= 800) {
    correctCount++;
    streak++;
    if (streak > bestRunStreak) bestRunStreak = streak;
  } else {
    streak = 0;
  }
  totalPoints += earned;

  lastStatusHtml = `<strong>${t.pinpointResultMsg(distKm, earned, item[currentLang].name, item[currentLang].country)}</strong> `;

  document.getElementById("ui-score").textContent = t.pointsBadge(totalPoints);
  document.getElementById("ui-streak").textContent = `🔥 ${streak}`;
  document.getElementById("progress-fill").style.width = `${((currentIndex + 1) / activeQuestions.length) * 100}%`;

  const expBox = document.getElementById("explanation-box");
  expBox.innerHTML = `${lastStatusHtml}<strong>${t.didYouKnow}</strong> ${item[currentLang].fact}`;
  expBox.style.display = "block";

  const nextBtn = document.getElementById("btn-next");
  nextBtn.textContent = currentIndex < activeQuestions.length - 1 ? t.nextBtn : t.finishBtn;
  document.getElementById("next-wrap").style.display = "block";
}

function getCountryNameById(id, fallbackFeature) {
  const allCountries = getAllCountries195();
  const foundWorld = allCountries.find(c => c.id === id);
  if (foundWorld) return foundWorld[currentLang];
  return fallbackFeature && fallbackFeature.properties ? fallbackFeature.properties.name : "";
}

function handleMapGuess(clickedId, clickedFeature) {
  if (answered) return;
  answered = true;

  const t = UI_STRINGS[currentLang];
  const item = activeQuestions[currentIndex];
  const targetId = item.countryId;
  const isWin = clickedId === targetId;

  recordItemAtlas(item, isWin);

  if (mapSvg) mapSvg.classed("blind-mode", false);

  mapG.selectAll(".country-path, .micro-hit")
    .classed("correct", d => String(d.id).padStart(3, "0") === targetId)
    .classed("wrong", d => clickedId !== targetId && String(d.id).padStart(3, "0") === clickedId);

  if (isWin) {
    correctCount++;
    streak++;
    if (streak > bestRunStreak) bestRunStreak = streak;
    totalPoints += selectedDifficulty === "extreme" ? 200 : 100;
    lastStatusHtml = `<strong>${t.mapCorrectMsg}</strong> `;
  } else {
    streak = 0;
    const clickedName = getCountryNameById(clickedId, clickedFeature);
    lastStatusHtml = `<strong>${t.mapWrongMsg(clickedName)}</strong> `;
    focusCountryOnMap(targetId);
  }

  document.getElementById("ui-score").textContent = t.pointsBadge(totalPoints);
  document.getElementById("ui-streak").textContent = `🔥 ${streak}`;
  document.getElementById("progress-fill").style.width = `${((currentIndex + 1) / activeQuestions.length) * 100}%`;

  const expBox = document.getElementById("explanation-box");
  expBox.innerHTML = `${lastStatusHtml}<strong>${t.didYouKnow}</strong> ${item[currentLang].fact}`;
  expBox.style.display = "block";

  const nextBtn = document.getElementById("btn-next");
  nextBtn.textContent = currentIndex < activeQuestions.length - 1 ? t.nextBtn : t.finishBtn;
  document.getElementById("next-wrap").style.display = "block";
}

// =========================================================================
// 12. TIMER & FRAGEN-ANZEIGE (ALLE 14 SPIELMODI)
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

  if (!keepState) {
    answered = false;
    lastStatusHtml = "";
  }

  document.getElementById("ui-q-counter").textContent = t.questionCount(currentIndex + 1, activeQuestions.length);
  document.getElementById("ui-score").textContent = t.pointsBadge(totalPoints);
  document.getElementById("ui-streak").textContent = `🔥 ${streak}`;
  document.getElementById("progress-fill").style.width = `${((answered ? currentIndex + 1 : currentIndex) / activeQuestions.length) * 100}%`;

  const timerWrap = document.getElementById("timer-wrap");
  timerWrap.classList.toggle("hidden", currentMode !== "timed");

  const flagBox = document.getElementById("flag-box");
  const mapWrapper = document.getElementById("map-wrapper");
  const optionsList = document.getElementById("options-list");

  ["hol-arena", "silhouette-box", "radar-hud", "chrono-arena", "flag-zoom-wrap", "dossier-arena", "missing-box", "flight-controls"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });

  optionsList.innerHTML = "";
  flagBox.classList.add("hidden");
  mapWrapper.classList.add("hidden");

  const sessionPrefix = isDailySession
    ? `${t.dailyMetaLabel(dailySeedValue)} • `
    : (isWeaknessSession ? "🎯 " : "");

  if (item.isChrono) {
    document.getElementById("q-meta").textContent = `${sessionPrefix}${t.tabs.chrono}`;
    document.getElementById("q-text").textContent = t.chronoPrompt;
    renderChronoArena();
  } else if (item.isHol) {
    const catObj = HOL_CATEGORIES.find(c => c.id === item.subType);
    const diffLabel = selectedDifficulty === "all"
      ? (currentLang === "de" ? "Alle Stufen" : "All Levels")
      : t.difficulties[selectedDifficulty];
    document.getElementById("q-meta").textContent = `${sessionPrefix}${catObj[currentLang]} • ${diffLabel}`;
    document.getElementById("q-text").textContent = t.holPrompts[item.subType];
    renderHolArena(item);
  } else if (item.isFlagZoom) {
    document.getElementById("q-meta").textContent = `${sessionPrefix}${t.tabs.flagzoom} • ${t.difficulties[item.difficulty]}`;
    document.getElementById("q-text").textContent = t.flagZoomPrompt;
    renderFlagZoomStage(item, keepState);
  } else if (item.isDossier) {
    document.getElementById("q-meta").textContent = `${sessionPrefix}${t.tabs.dossier}`;
    document.getElementById("q-text").textContent = t.dossierPrompt;
    renderDossierArena(item);
  } else if (item.isMissing) {
    document.getElementById("q-meta").textContent = `${sessionPrefix}${t.tabs.missing} • ${t.difficulties[item.difficulty]}`;
    document.getElementById("q-text").textContent = t.missingPrompt;
    renderMissingNeighborPuzzle(item);
    item.choices.forEach((choice, idx) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = choice[currentLang];
      btn.onclick = () => handleAnswer(idx);
      optionsList.appendChild(btn);
    });
  } else if (item.isSilhouette) {
    document.getElementById("q-meta").textContent = `${sessionPrefix}${t.tabs.silhouette} • ${t.difficulties[item.difficulty]}`;
    document.getElementById("q-text").textContent = t.silhouettePrompt;
    renderSilhouetteShape(item);
    item.choices.forEach((choice, idx) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = choice[currentLang];
      btn.onclick = () => handleAnswer(idx);
      optionsList.appendChild(btn);
    });
  } else if (item.isBorder) {
    mapWrapper.classList.remove("hidden");
    document.getElementById("ui-map-hint").textContent = t.borderHint;
    document.getElementById("q-meta").textContent = `${sessionPrefix}${t.tabs.border}`;
    document.getElementById("q-text").textContent = t.borderPrompt(item[currentLang].startName, item[currentLang].endName);

    if (mapSvg) {
      mapSvg.classed("pinpoint-mode", false).classed("blind-mode", false);
      if (!keepState) {
        clearMapLayers();
        focusCountryOnMap(item.startId);
      }
      updateBorderRouteBoard(item);
    }
  } else if (item.isFlight) {
    mapWrapper.classList.remove("hidden");
    document.getElementById("ui-map-hint").textContent = t.flightHint;
    document.getElementById("q-meta").textContent = `${sessionPrefix}${t.tabs.flight}`;
    document.getElementById("q-text").textContent = t.flightPrompt(item[currentLang].nameA, item[currentLang].nameB);

    if (mapSvg) {
      mapSvg.classed("pinpoint-mode", false).classed("blind-mode", false);
      if (!keepState) {
        clearMapLayers();
        resetMapZoom();
      }
      renderFlightEstimator(item);
    }
  } else if (item.isRadar) {
    mapWrapper.classList.remove("hidden");
    document.getElementById("ui-map-hint").textContent = t.radarHint;

    const typeLabel = item.cityType === "capital"
      ? (currentLang === "de" ? "Hauptstadt" : "capital city")
      : (currentLang === "de" ? "Weltmetropole" : "world city");
    const typeBadge = item.cityType === "capital"
      ? (currentLang === "de" ? "Hauptstadt" : "Capital")
      : (currentLang === "de" ? "Weltmetropole" : "World City");
    const diffBadge = selectedDifficulty === "extreme"
      ? (currentLang === "de" ? "💀 Ohne Grenzen" : "💀 Blind Map")
      : t.difficulties[item.difficulty];

    document.getElementById("q-meta").textContent = `${sessionPrefix}${t.tabs.radar} • ${typeBadge} • ${diffBadge}`;
    document.getElementById("q-text").textContent = t.radarPrompt(typeLabel);
    updateRadarHud(item);

    if (mapSvg) {
      mapSvg.classed("pinpoint-mode", true);
      if (!keepState) {
        mapSvg.classed("blind-mode", selectedDifficulty === "extreme");
        clearMapLayers();
        resetMapZoom();
      } else {
        renderRadarBoard(item);
      }
    }
  } else if (item.isPinpoint) {
    mapWrapper.classList.remove("hidden");
    document.getElementById("ui-map-hint").textContent = t.pinpointHint;

    const typeLabel = item.cityType === "capital"
      ? (currentLang === "de" ? "Hauptstadt" : "capital city")
      : (currentLang === "de" ? "Weltmetropole" : "world city");
    const diffBadge = selectedDifficulty === "extreme"
      ? (currentLang === "de" ? "💀 Ohne Grenzen" : "💀 Blind Map")
      : t.difficulties[item.difficulty];

    document.getElementById("q-meta").textContent = `${sessionPrefix}${t.tabs.pinpoint} • ${typeLabel} • ${diffBadge}`;
    document.getElementById("q-text").textContent = t.pinpointPrompt(item[currentLang].name);

    if (mapSvg) {
      mapSvg.classed("pinpoint-mode", true);
      if (!keepState) {
        mapSvg.classed("blind-mode", selectedDifficulty === "extreme");
        clearMapLayers();
        resetMapZoom();
      } else if (answered && item.guessPt && item.targetPt) {
        renderPinpointMarkers(item.guessPt, item.targetPt, item[currentLang].name);
      }
    }
  } else if (item.isMap) {
    mapWrapper.classList.remove("hidden");
    document.getElementById("ui-map-hint").textContent = t.mapHint;
    const diffBadge = selectedDifficulty === "extreme" ? t.difficulties.extreme : t.difficulties[item.difficulty];
    document.getElementById("q-meta").textContent = `${sessionPrefix}${t.tabs.map} • ${diffBadge}`;
    document.getElementById("q-text").textContent = t.mapPrompt(item[currentLang].name);

    if (mapSvg) {
      mapSvg.classed("pinpoint-mode", false);
      if (!keepState && mapG) {
        mapSvg.classed("blind-mode", selectedDifficulty === "extreme");
        clearMapLayers();
        resetMapZoom();
      }
    }
  } else if (item.isFlag) {
    flagBox.classList.remove("hidden");
    document.getElementById("q-meta").textContent = `${sessionPrefix}${t.tabs.flags} • ${t.difficulties[item.difficulty]}`;
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
    const qData = item[currentLang];
    const catObj = CATEGORIES.find(c => c.id === item.category);
    const catName = catObj ? catObj[currentLang] : (item.category || "");
    document.getElementById("q-meta").textContent = `${sessionPrefix}${catName} • ${t.difficulties[item.difficulty]}`;
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
    if (currentMode === "timed") startTimer();
  } else if (answered) {
    const expBox = document.getElementById("explanation-box");
    if (item.isChrono) {
      const lastCard = chronoState.timeline.find(c => c.id === chronoState.lastInsertedId);
      expBox.innerHTML = `${lastStatusHtml}<strong>${t.didYouKnow}</strong> ${lastCard ? lastCard[currentLang].fact : ""}`;
      document.getElementById("btn-next").textContent = chronoState.gameOver ? t.finishBtn : t.nextBtn;
    } else {
      const prefix = (item.isMap || item.isHol || item.isPinpoint || item.isRadar || item.isBorder || item.isDossier || item.isFlight) ? lastStatusHtml : "";
      expBox.innerHTML = `${prefix}<strong>${t.didYouKnow}</strong> ${item[currentLang].fact}`;
      document.getElementById("btn-next").textContent = currentIndex < activeQuestions.length - 1 ? t.nextBtn : t.finishBtn;
    }
  }
}

function handleAnswer(selectedIdx) {
  if (answered) return;
  answered = true;
  stopTimer();

  const t = UI_STRINGS[currentLang];
  const item = activeQuestions[currentIndex];
  const isChoiceObjMode = item.isFlag || item.isFlagZoom || item.isSilhouette || item.isMissing;
  const correctIdx = isChoiceObjMode ? item.answer : item[currentLang].answer;
  const isWin = selectedIdx === correctIdx;

  recordItemAtlas(item, isWin);

  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correctIdx) btn.classList.add("correct");
    else if (idx === selectedIdx) btn.classList.add("wrong");
  });

  if (item.isMissing) {
    renderMissingNeighborPuzzle(item);
  }

  if (isWin) {
    correctCount++;
    streak++;
    if (streak > bestRunStreak) bestRunStreak = streak;
    let earned = 100;
    if (currentMode === "timed") {
      earned = Math.max(50, Math.round(50 + (timeLeft / QUESTION_TIME) * 100));
    } else if (item.isFlagZoom) {
      earned = item.lockedPoints || 100;
    }
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
  recordItemAtlas(item, false);

  const isChoiceObjMode = item.isFlag || item.isFlagZoom || item.isSilhouette || item.isMissing;
  const correctIdx = isChoiceObjMode ? item.answer : item[currentLang].answer;

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
  if (currentMode === "chrono" && chronoState) {
    if (chronoState.gameOver) {
      renderResults();
    } else {
      renderQuestion(false);
    }
    return;
  }

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

  if (currentMode === "chrono" && chronoState) {
    const chainLen = chronoState.timeline.length;
    recordModeRunStats("chrono", totalPoints, bestRunStreak, false, null);

    let rankIdx = 0;
    if (chainLen >= 18) rankIdx = 3;
    else if (chainLen >= 12) rankIdx = 2;
    else if (chainLen >= 7) rankIdx = 1;

    document.getElementById("ui-res-title").textContent = t.resTitle;
    document.getElementById("res-score").textContent = `${chainLen} ⏳`;
    document.getElementById("res-points").textContent = t.resPoints(totalPoints);
    document.getElementById("res-rank").textContent = t.ranks[rankIdx];
    document.getElementById("res-sub").textContent = t.resChronoSub(chainLen);
    document.getElementById("btn-share").textContent = t.shareBtn;
    document.getElementById("btn-restart").textContent = t.restartBtn;
    return;
  }

  const total = activeQuestions.length;
  const pct = Math.round((correctCount / total) * 100);

  recordModeRunStats(
    currentMode,
    totalPoints,
    bestRunStreak,
    isDailySession,
    isDailySession ? { score: totalPoints, correct: correctCount, total } : null
  );

  let rankIdx = 0;
  if (pct >= 90) rankIdx = 3;
  else if (pct >= 70) rankIdx = 2;
  else if (pct >= 40) rankIdx = 1;

  document.getElementById("ui-res-title").textContent = isDailySession
    ? `${t.resTitle} (${dailySeedValue})`
    : t.resTitle;
  document.getElementById("res-score").textContent = `${correctCount} / ${total}`;
  document.getElementById("res-points").textContent = t.resPoints(totalPoints);
  document.getElementById("res-rank").textContent = t.ranks[rankIdx];
  document.getElementById("res-sub").textContent = t.resSub(pct);
  document.getElementById("btn-share").textContent = t.shareBtn;
  document.getElementById("btn-restart").textContent = t.restartBtn;
}

function shareResult() {
  const t = UI_STRINGS[currentLang];
  const label = isDailySession ? `Daily ${dailySeedValue}` : t.tabs[currentMode];
  const scoreSummary = currentMode === "chrono" && chronoState
    ? `${chronoState.timeline.length} cards`
    : `${correctCount}/${activeQuestions.length}`;
  const text = `🧠 BrainPulse (${label}): ${scoreSummary} (${totalPoints} pts) 🔥`;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      document.getElementById("btn-share").textContent = t.shareCopied;
    });
  }
}

function goHome() {
  stopTimer();
  isDailySession = false;
  dailySeedValue = null;
  isWeaknessSession = false;
  document.getElementById("screen-quiz").classList.add("hidden");
  document.getElementById("screen-result").classList.add("hidden");
  document.getElementById("screen-home").classList.remove("hidden");
  renderHome();
}

// Legal & Atlas Modal
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