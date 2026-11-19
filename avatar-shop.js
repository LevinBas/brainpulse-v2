// =========================================================================
// ERWEITERUNG III (PRO): CHARAKTER-STUDIO, SHOP, PRESETS & TROPHÄEN
// Einbinden nach modes-plus.js: <script src="avatar-shop.js"></script>
// =========================================================================

const AVATAR_SHOP_ITEMS = [
  // KOPFBEDECKUNGEN / HÜTE
  { id: "hat_none", cat: "hat", rarity: "common", price: 0, icon: "🚫", en: "No Hat", de: "Kein Hut" },
  { id: "hat_cap", cat: "hat", rarity: "common", price: 120, icon: "🧢", en: "Explorer Cap", de: "Entdecker-Cap" },
  { id: "hat_beanie", cat: "hat", rarity: "common", price: 180, icon: "🧶", en: "Cozy Beanie", de: "Wollmütze" },
  { id: "hat_safari", cat: "hat", rarity: "rare", price: 240, icon: "🤠", en: "Safari Hat", de: "Abenteurer-Hut" },
  { id: "hat_tophat", cat: "hat", rarity: "rare", price: 420, icon: "🎩", en: "Gentleman Top Hat", de: "Zylinder" },
  { id: "hat_viking", cat: "hat", rarity: "epic", price: 550, icon: "🪖", en: "Viking Helmet", de: "Wikinger-Helm" },
  { id: "hat_crown", cat: "hat", rarity: "legendary", price: 950, icon: "👑", en: "Golden Crown", de: "Goldene Krone" },
  { id: "hat_astro", cat: "hat", rarity: "legendary", price: 1300, icon: "🧑‍🚀", en: "Astro Visor", de: "Astronauten-Helm" },

  // BRILLEN
  { id: "glasses_none", cat: "glasses", rarity: "common", price: 0, icon: "🚫", en: "No Glasses", de: "Keine Brille" },
  { id: "glasses_cool", cat: "glasses", rarity: "common", price: 150, icon: "🕶️", en: "Shades", de: "Sonnenbrille" },
  { id: "glasses_nerd", cat: "glasses", rarity: "common", price: 160, icon: "🤓", en: "Scholar Glasses", de: "Gelehrten-Brille" },
  { id: "glasses_monocle", cat: "glasses", rarity: "rare", price: 380, icon: "🧐", en: "Golden Monocle", de: "Gold-Monokel" },
  { id: "glasses_vr", cat: "glasses", rarity: "epic", price: 780, icon: "🥽", en: "Cyber Visor", de: "Cyber-Visier" },

  // OBERTEILE
  { id: "top_tee", cat: "top", rarity: "common", price: 0, icon: "👕", en: "Classic Tee", de: "Klassisches Shirt" },
  { id: "top_hoodie", cat: "top", rarity: "common", price: 200, icon: "🧥", en: "Street Hoodie", de: "Street-Hoodie" },
  { id: "top_vest", cat: "top", rarity: "rare", price: 320, icon: "🦺", en: "Explorer Vest", de: "Expeditions-Weste" },
  { id: "top_suit", cat: "top", rarity: "epic", price: 620, icon: "🤵", en: "Tuxedo Jacket", de: "Smoking-Sakko" },
  { id: "top_gold", cat: "top", rarity: "legendary", price: 1100, icon: "✨", en: "Royal Armor", de: "Gold-Rüstung" },

  // HOSEN
  { id: "pants_jeans", cat: "pants", rarity: "common", price: 0, icon: "👖", en: "Classic Pants", de: "Klassische Hose" },
  { id: "pants_cargo", cat: "pants", rarity: "rare", price: 180, icon: "🩳", en: "Safari Cargo", de: "Cargo-Hose" },
  { id: "pants_suit", cat: "pants", rarity: "epic", price: 350, icon: "🖤", en: "Formal Slacks", de: "Anzughose" },
  { id: "pants_cyber", cat: "pants", rarity: "legendary", price: 680, icon: "⚡", en: "Neon Trackpants", de: "Neon-Hose" },

  // ACCESSOIRES
  { id: "acc_none", cat: "acc", rarity: "common", price: 0, icon: "🚫", en: "No Accessory", de: "Kein Extra" },
  { id: "acc_compass", cat: "acc", rarity: "rare", price: 250, icon: "🧭", en: "Golden Compass", de: "Gold-Kompass" },
  { id: "acc_globe", cat: "acc", rarity: "epic", price: 500, icon: "🌍", en: "Pocket Globe", de: "Mini-Weltkugel" },
  { id: "acc_trophy", cat: "acc", rarity: "legendary", price: 900, icon: "🏆", en: "Champion Cup", de: "Meister-Pokal" }
];

const RARITY_META = {
  common: { color: "#94a3b8", en: "Common", de: "Gewöhnlich" },
  rare: { color: "#38bdf8", en: "Rare", de: "Selten" },
  epic: { color: "#c084fc", en: "Epic", de: "Episch" },
  legendary: { color: "#facc15", en: "Legendary", de: "Legendär" }
};

const SKIN_TONES = ["#f8d5c2", "#eab696", "#c68642", "#8d5524", "#5c3818"];

const HAIR_STYLES = [
  { id: "none", en: "Bald", de: "Glatze" },
  { id: "short", en: "Short Crop", de: "Kurzhaar" },
  { id: "sidepart", en: "Side Part", de: "Seitenscheitel" },
  { id: "curls", en: "Curly Puff", de: "Locken" },
  { id: "bun", en: "Top Bun", de: "Dutt" },
  { id: "ponytail", en: "Ponytail", de: "Zopf" }
];

const HAIR_COLORS = ["#1e293b", "#5c3818", "#b45309", "#eab308", "#dc2626", "#e2e8f0", "#06b6d4"];

const EXPRESSIONS = [
  { id: "smile", icon: "🙂", en: "Friendly", de: "Lächeln" },
  { id: "grin", icon: "😁", en: "Big Grin", de: "Grinsen" },
  { id: "cool", icon: "😎", en: "Smirk", de: "Cool" },
  { id: "surprised", icon: "😮", en: "Amazed", de: "Überrascht" }
];

const BEARD_STYLES = [
  { id: "none", en: "Clean", de: "Glatt" },
  { id: "mustache", en: "Mustache", de: "Schnurrbart" },
  { id: "full", en: "Full Beard", de: "Vollbart" }
];

const OUTFIT_ACCENT_COLORS = ["#38bdf8", "#ef4444", "#22c55e", "#f59e0b", "#a855f7", "#ec4899", "#f8fafc"];

const STAGE_BACKGROUNDS = [
  { id: "atlas", icon: "🗺️", en: "World Atlas", de: "Weltkarte", css: "radial-gradient(circle at 50% 35%, #1e3a8a 0%, #0f172a 85%)" },
  { id: "cosmos", icon: "🌌", en: "Night Sky", de: "Nachthimmel", css: "radial-gradient(circle at 50% 25%, #312e81 0%, #090d16 90%)" },
  { id: "coast", icon: "🏖️", en: "Sunny Coast", de: "Strand", css: "linear-gradient(180deg, #0284c7 0%, #38bdf8 58%, #fde68a 60%, #f59e0b 100%)" },
  { id: "expedition", icon: "⛰️", en: "Peak Camp", de: "Berg-Lager", css: "linear-gradient(180deg, #0f172a 0%, #1e293b 58%, #14532d 60%, #166534 100%)" }
];

const ACHIEVEMENTS_LIST = [
  {
    id: "first_steps",
    icon: "🌱",
    reward: 100,
    en: { title: "First Steps", desc: "Answer 10 questions correctly in total." },
    de: { title: "Erste Schritte", desc: "Beantworte insgesamt 10 Fragen richtig." },
    check: (st) => st.totalCorrect >= 10
  },
  {
    id: "quiz_centurion",
    icon: "💯",
    reward: 350,
    en: { title: "Quiz Centurion", desc: "Reach 100 correct answers across all modes." },
    de: { title: "Quiz-Zenturio", desc: "Erreiche 100 richtige Antworten über alle Modi." },
    check: (st) => st.totalCorrect >= 100
  },
  {
    id: "streak_10",
    icon: "🔥",
    reward: 250,
    en: { title: "Unstoppable Flame", desc: "Hit a streak of 10 correct answers in a row." },
    de: { title: "Unaufhaltsam", desc: "Schaffe eine Serie von 10 richtigen Antworten." },
    check: (st) => st.bestStreak >= 10
  },
  {
    id: "scale_master",
    icon: "📐",
    reward: 400,
    en: { title: "Scale Master", desc: "Score under 10% error 3 times in a row in True Size." },
    de: { title: "Maßstabs-Meister", desc: "3× hintereinander unter 10 % Abweichung bei Wahre Größe." },
    check: (st) => st.trueSizePreciseStreak >= 3
  },
  {
    id: "europe_blitz",
    icon: "⚡",
    reward: 500,
    en: { title: "Europe Blitz", desc: "Conquer Europe in Map Sweep under 75 seconds." },
    de: { title: "Europa-Blitz", desc: "Erobere Europa im Karten-Sweep unter 75 Sekunden." },
    check: (st) => typeof st.sweepEuropeBest === "number" && st.sweepEuropeBest <= 75
  },
  {
    id: "grayscale_eagle",
    icon: "🦅",
    reward: 300,
    en: { title: "Grayscale Eagle", desc: "Identify 15 black-and-white flags correctly." },
    de: { title: "Graustufen-Adler", desc: "Erkenne 15 Schwarz-Weiß-Flaggen richtig." },
    check: (st) => st.grayscaleCorrect >= 15
  },
  {
    id: "world_explorer",
    icon: "🧭",
    reward: 250,
    en: { title: "World Explorer", desc: "Inspect 25 different countries in the Free World Atlas." },
    de: { title: "Welt-Entdecker", desc: "Schaue dir 25 Länder im Freien Welt-Atlas an." },
    check: (st) => (st.exploredCountries?.length || 0) >= 25
  },
  {
    id: "world_citizen",
    icon: "🌍",
    reward: 650,
    en: { title: "World Citizen", desc: "Master 50 countries in your Atlas." },
    de: { title: "Weltbürger", desc: "Meistere 50 Länder in deinem Atlas." },
    check: (st) => st.masteredCountries >= 50
  },
  {
    id: "fashionista",
    icon: "🛍️",
    reward: 200,
    en: { title: "Style Collector", desc: "Own at least 6 items in your wardrobe." },
    de: { title: "Mode-Sammler", desc: "Besitze mindestens 6 Kleidungsstücke im Schrank." },
    check: (st) => (st.ownedCount || 0) >= 6
  },
  {
    id: "rich_explorer",
    icon: "💰",
    reward: 300,
    en: { title: "Treasure Hunter", desc: "Earn a lifetime total of 2,000 coins." },
    de: { title: "Schatzsucher", desc: "Verdiene insgesamt 2.000 Münzen." },
    check: (st) => st.lifetimeCoins >= 2000
  }
];

const DEFAULT_PROFILE_DATA = {
  name: "Explorer",
  coins: 150,
  lifetimeCoins: 150,
  skin: "#f8d5c2",
  hairStyle: "short",
  hairColor: "#5c3818",
  expression: "smile",
  beard: "none",
  blush: false,
  accentColor: "#38bdf8",
  stageBg: "atlas",
  owned: ["hat_none", "glasses_none", "top_tee", "pants_jeans", "acc_none"],
  equipped: {
    hat: "hat_none",
    glasses: "glasses_none",
    top: "top_tee",
    pants: "pants_jeans",
    acc: "acc_none"
  },
  presets: [null, null, null],
  unlockedAchievements: [],
  stats: {
    totalCorrect: 0,
    bestStreak: 0,
    trueSizePreciseStreak: 0,
    grayscaleCorrect: 0,
    exploredCountries: []
  }
};

function loadAvatarProfile() {
  try {
    const raw = localStorage.getItem("brainpulse_avatar_profile_v1");
    if (!raw) return JSON.parse(JSON.stringify(DEFAULT_PROFILE_DATA));
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROFILE_DATA,
      ...parsed,
      equipped: { ...DEFAULT_PROFILE_DATA.equipped, ...(parsed.equipped || {}) },
      presets: Array.isArray(parsed.presets) ? parsed.presets.slice(0, 3) : [null, null, null],
      stats: { ...DEFAULT_PROFILE_DATA.stats, ...(parsed.stats || {}) }
    };
  } catch (e) {
    return JSON.parse(JSON.stringify(DEFAULT_PROFILE_DATA));
  }
}

let avatarProfile = loadAvatarProfile();
let activeAvatarModalTab = "studio"; // "studio" | "shop" | "presets" | "trophies"
let activeShopCategory = "hat";

function saveAvatarProfile() {
  try {
    localStorage.setItem("brainpulse_avatar_profile_v1", JSON.stringify(avatarProfile));
  } catch (e) {}
}

// -------------------------------------------------------------------------
// 1. ERWEITERTER SVG-CHARAKTER-GENERATOR (HAARE, MIMIK, BART, OUTFIT, EXTRAS)
// -------------------------------------------------------------------------
function buildAvatarSVG(profile = avatarProfile, size = 44) {
  const eq = profile.equipped || {};
  const skin = profile.skin || "#f8d5c2";
  const hairColor = profile.hairColor || "#5c3818";
  const hairStyle = profile.hairStyle || "short";
  const expression = profile.expression || "smile";
  const beard = profile.beard || "none";
  const accent = profile.accentColor || "#38bdf8";

  // Haare hinter dem Kopf (Zopf / Locken-Rand)
  let backHairSvg = "";
  if (hairStyle === "ponytail") {
    backHairSvg = `<path d="M63 26 Q82 28 78 52 Q70 46 63 38 Z" fill="${hairColor}"/>`;
  } else if (hairStyle === "curls") {
    backHairSvg = `
      <circle cx="33" cy="27" r="7" fill="${hairColor}"/>
      <circle cx="67" cy="27" r="7" fill="${hairColor}"/>
      <circle cx="50" cy="18" r="8" fill="${hairColor}"/>
      <circle cx="40" cy="20" r="7" fill="${hairColor}"/>
      <circle cx="60" cy="20" r="7" fill="${hairColor}"/>
    `;
  }

  // Oberteil-Farben & Akzente
  let topColor = accent;
  let topDetail = `<rect x="44" y="61" width="12" height="4" rx="2" fill="rgba(255,255,255,0.22)"/>`;
  if (eq.top === "top_hoodie") {
    topColor = accent;
    topDetail = `<path d="M43 61 L50 75 L57 61" stroke="#0f172a" stroke-width="2.2" fill="none"/><circle cx="47" cy="69" r="1.4" fill="#f8fafc"/><circle cx="53" cy="69" r="1.4" fill="#f8fafc"/>`;
  } else if (eq.top === "top_vest") {
    topColor = "#b45309";
    topDetail = `<rect x="45" y="60" width="10" height="24" fill="${accent}"/><line x1="50" y1="60" x2="50" y2="84" stroke="#0f172a" stroke-width="1.5"/>`;
  } else if (eq.top === "top_suit") {
    topColor = "#1e293b";
    topDetail = `<polygon points="44,60 50,75 56,60" fill="#f8fafc"/><polygon points="48.5,64 51.5,64 50,73" fill="${accent}"/>`;
  } else if (eq.top === "top_gold") {
    topColor = "#eab308";
    topDetail = `<path d="M37 66 Q50 74 63 66" stroke="#fef08a" stroke-width="2.5" fill="none"/><circle cx="50" cy="70" r="3" fill="${accent}"/>`;
  }

  // Hosen-Farben & Akzente
  let pantsColor = "#1d4ed8";
  let pantsStripe = "";
  if (eq.pants === "pants_cargo") {
    pantsColor = "#4d7c0f";
    pantsStripe = `<rect x="36" y="90" width="5" height="7" rx="1" fill="#65a30d"/><rect x="59" y="90" width="5" height="7" rx="1" fill="#65a30d"/>`;
  } else if (eq.pants === "pants_suit") {
    pantsColor = "#0f172a";
  } else if (eq.pants === "pants_cyber") {
    pantsColor = "#1e1b4b";
    pantsStripe = `<line x1="39" y1="84" x2="39" y2="108" stroke="${accent}" stroke-width="2.2"/><line x1="61" y1="84" x2="61" y2="108" stroke="${accent}" stroke-width="2.2"/>`;
  }

  // Haare vor dem Kopf (Stirn / Scheitel / Dutt)
  let frontHairSvg = "";
  if (hairStyle === "short") {
    frontHairSvg = `<path d="M33 31 Q35 17 50 17 Q65 17 67 31 Q57 24 44 26 Z" fill="${hairColor}"/>`;
  } else if (hairStyle === "sidepart") {
    frontHairSvg = `<path d="M33 32 Q34 16 52 16 Q67 17 67 31 Q54 22 33 32 Z" fill="${hairColor}"/>`;
  } else if (hairStyle === "bun") {
    frontHairSvg = `<path d="M34 30 Q50 16 66 30 Z" fill="${hairColor}"/><circle cx="50" cy="13" r="6.5" fill="${hairColor}"/>`;
  } else if (hairStyle === "ponytail") {
    frontHairSvg = `<path d="M34 30 Q50 17 66 30 Z" fill="${hairColor}"/>`;
  }

  // Wangen-Akzent (Blush)
  const blushSvg = profile.blush
    ? `<ellipse cx="40" cy="40" rx="3.5" ry="2" fill="#fb7185" opacity="0.55"/><ellipse cx="60" cy="40" rx="3.5" ry="2" fill="#fb7185" opacity="0.55"/>`
    : "";

  // Mund / Gesichtsausdruck
  let mouthSvg = `<path d="M44 43 Q50 48 56 43" stroke="#0f172a" stroke-width="2" stroke-linecap="round" fill="none"/>`;
  if (expression === "grin") {
    mouthSvg = `<path d="M43 42 Q50 51 57 42 Z" fill="#f8fafc" stroke="#0f172a" stroke-width="1.6"/>`;
  } else if (expression === "cool") {
    mouthSvg = `<path d="M45 44 Q52 46 57 41" stroke="#0f172a" stroke-width="2.1" stroke-linecap="round" fill="none"/>`;
  } else if (expression === "surprised") {
    mouthSvg = `<circle cx="50" cy="44" r="3.4" fill="#0f172a"/>`;
  }

  // Bart / Schnurrbart
  let beardSvg = "";
  if (beard === "mustache") {
    beardSvg = `<path d="M43 41 Q47 38 50 41 Q53 38 57 41" stroke="${hairColor}" stroke-width="2.6" stroke-linecap="round" fill="none"/>`;
  } else if (beard === "full") {
    beardSvg = `<path d="M34 38 Q35 55 50 56 Q65 55 66 38 Q61 48 50 48 Q39 48 34 38 Z" fill="${hairColor}" opacity="0.92"/>`;
  }

  // Brillen
  let glassesSvg = "";
  if (eq.glasses === "glasses_cool") {
    glassesSvg = `<rect x="37" y="32" width="11" height="7" rx="2" fill="#0f172a"/><rect x="52" y="32" width="11" height="7" rx="2" fill="#0f172a"/><line x1="48" y1="34" x2="52" y2="34" stroke="#0f172a" stroke-width="2"/>`;
  } else if (eq.glasses === "glasses_nerd") {
    glassesSvg = `<circle cx="43" cy="35" r="5.5" fill="rgba(255,255,255,0.25)" stroke="#1e293b" stroke-width="2"/><circle cx="57" cy="35" r="5.5" fill="rgba(255,255,255,0.25)" stroke="#1e293b" stroke-width="2"/><line x1="48.5" y1="35" x2="51.5" y2="35" stroke="#1e293b" stroke-width="2"/>`;
  } else if (eq.glasses === "glasses_monocle") {
    glassesSvg = `<circle cx="57" cy="35" r="5.5" fill="rgba(254,240,138,0.25)" stroke="#eab308" stroke-width="2"/><path d="M62 37 Q66 46 62 54" stroke="#eab308" stroke-width="1.2" fill="none"/>`;
  } else if (eq.glasses === "glasses_vr") {
    glassesSvg = `<rect x="35" y="31" width="30" height="9" rx="4" fill="#06b6d4" stroke="#0f172a" stroke-width="1.8"/>`;
  }

  // Hüte (überdecken Haare falls aufgesetzt)
  let hatSvg = "";
  if (eq.hat === "hat_cap") {
    hatSvg = `<path d="M33 27 Q50 11 67 27 Z" fill="${accent}"/><rect x="46" y="24" width="26" height="4" rx="2" fill="#0f172a"/>`;
  } else if (eq.hat === "hat_safari") {
    hatSvg = `<ellipse cx="50" cy="26" rx="25" ry="4.5" fill="#b45309"/><path d="M36 26 Q50 10 64 26 Z" fill="#d97706"/><rect x="37" y="22" width="26" height="3" fill="${accent}"/>`;
  } else if (eq.hat === "hat_beanie") {
    hatSvg = `<path d="M33 29 Q50 9 67 29 Z" fill="${accent}"/><circle cx="50" cy="12" r="4.5" fill="#f8fafc"/>`;
  } else if (eq.hat === "hat_tophat") {
    hatSvg = `<ellipse cx="50" cy="26" rx="23" ry="4" fill="#0f172a"/><rect x="37" y="7" width="26" height="19" rx="2" fill="#1e293b"/><rect x="37" y="21" width="26" height="3.5" fill="${accent}"/>`;
  } else if (eq.hat === "hat_viking") {
    hatSvg = `<path d="M33 27 Q50 11 67 27 Z" fill="#94a3b8"/><path d="M34 21 Q22 13 27 6 Q32 13 37 18 Z" fill="#f8fafc"/><path d="M66 21 Q78 13 73 6 Q68 13 63 18 Z" fill="#f8fafc"/>`;
  } else if (eq.hat === "hat_crown") {
    hatSvg = `<polygon points="34,26 36,11 44,20 50,9 56,20 64,11 66,26" fill="#facc15" stroke="#ca8a04" stroke-width="1.5"/>`;
  } else if (eq.hat === "hat_astro") {
    hatSvg = `<circle cx="50" cy="35" r="23.5" fill="rgba(186,230,253,0.25)" stroke="#e2e8f0" stroke-width="2.5"/>`;
  }

  // Accessoires
  let accSvg = "";
  if (eq.acc === "acc_compass") {
    accSvg = `<circle cx="75" cy="74" r="7" fill="#facc15" stroke="#854d0e" stroke-width="1.5"/><polygon points="75,69 77,74 75,79 73,74" fill="#ef4444"/>`;
  } else if (eq.acc === "acc_globe") {
    accSvg = `<circle cx="76" cy="73" r="8" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5"/><path d="M72 70 Q76 68 79 72 Q75 76 72 74 Z" fill="#4ade80"/>`;
  } else if (eq.acc === "acc_trophy") {
    accSvg = `<path d="M70 66 H82 L80 75 H72 Z" fill="#facc15"/><rect x="74.5" y="75" width="3" height="5" fill="#ca8a04"/><rect x="72" y="80" width="8" height="2.5" fill="#854d0e"/>`;
  }

  return `
    <svg viewBox="0 0 100 115" width="${size}" height="${Math.round(size * 1.15)}" style="display:block;overflow:visible;">
      ${backHairSvg}
      <!-- Hosen / Beine -->
      <rect x="38" y="83" width="10" height="25" rx="4" fill="${pantsColor}"/>
      <rect x="52" y="83" width="10" height="25" rx="4" fill="${pantsColor}"/>
      ${pantsStripe}
      <!-- Schuhe -->
      <rect x="36" y="105" width="13" height="6" rx="3" fill="#f8fafc"/>
      <rect x="51" y="105" width="13" height="6" rx="3" fill="#f8fafc"/>
      <!-- Oberkörper & Arme -->
      <rect x="27" y="61" width="9" height="21" rx="4.5" fill="${topColor}"/>
      <rect x="64" y="61" width="9" height="21" rx="4.5" fill="${topColor}"/>
      <rect x="35" y="59" width="30" height="26" rx="7" fill="${topColor}"/>
      ${topDetail}
      <!-- Kopf -->
      <circle cx="50" cy="37" r="17" fill="${skin}"/>
      ${blushSvg}
      <!-- Augen -->
      <circle cx="44" cy="35" r="2.2" fill="#0f172a"/>
      <circle cx="56" cy="35" r="2.2" fill="#0f172a"/>
      ${mouthSvg}
      ${beardSvg}
      ${frontHairSvg}
      ${glassesSvg}
      ${hatSvg}
      ${accSvg}
    </svg>
  `;
}

// -------------------------------------------------------------------------
// 2. STYLES & KOPFLEISTEN-WIDGET OBEN RECHTS
// -------------------------------------------------------------------------
function injectAvatarShopStyles() {
  if (document.getElementById("brainpulse-avatar-styles")) return;
  const style = document.createElement("style");
  style.id = "brainpulse-avatar-styles";
  style.textContent = `
    .avatar-hud-chip {
      display: inline-flex;
      align-items: center;
      gap: 9px;
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      border: 1.5px solid #334155;
      border-radius: 999px;
      padding: 4px 12px 4px 6px;
      cursor: pointer;
      margin-right: 8px;
      transition: all 0.16s ease;
    }
    .avatar-hud-chip:hover {
      border-color: #facc15;
      transform: translateY(-1px);
    }
    .avatar-hud-circle {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: radial-gradient(circle, #334155 0%, #0f172a 100%);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #475569;
    }
    .avatar-hud-info {
      display: flex;
      flex-direction: column;
      text-align: left;
      line-height: 1.15;
    }
    .avatar-hud-name {
      font-size: 0.78rem;
      font-weight: 800;
      color: #f8fafc;
      max-width: 95px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .avatar-hud-coins {
      font-size: 0.74rem;
      font-weight: 800;
      color: #facc15;
    }
    .bp-modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(2, 6, 23, 0.84);
      backdrop-filter: blur(5px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 14px;
    }
    .bp-modal-card {
      background: #0f172a;
      border: 1.5px solid #334155;
      border-radius: 20px;
      width: 100%;
      max-width: 740px;
      max-height: 88vh;
      overflow-y: auto;
      padding: 20px;
      color: #f8fafc;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.75);
    }
    .studio-stage-box {
      border-radius: 16px;
      border: 1.5px solid #475569;
      padding: 14px 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 155px;
    }
    .studio-controls-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 12px;
      margin-top: 14px;
    }
    .studio-control-card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 14px;
      padding: 11px 12px;
    }
    .studio-control-label {
      font-size: 0.76rem;
      font-weight: 800;
      color: #94a3b8;
      margin-bottom: 7px;
      display: block;
    }
    .shop-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(145px, 1fr));
      gap: 10px;
      margin-top: 12px;
    }
    .shop-item-card {
      background: #1e293b;
      border: 1.5px solid #334155;
      border-radius: 14px;
      padding: 10px;
      text-align: center;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .shop-item-card:hover {
      transform: translateY(-2px);
    }
    .shop-item-card.equipped {
      background: rgba(34, 197, 94, 0.12);
    }
    .preset-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
      gap: 12px;
      margin-top: 12px;
    }
    .preset-card {
      background: #1e293b;
      border: 1.5px solid #334155;
      border-radius: 16px;
      padding: 14px;
      text-align: center;
    }
    .ach-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
      gap: 10px;
      margin-top: 12px;
    }
    .ach-card {
      background: #1e293b;
      border: 1.5px solid #334155;
      border-radius: 14px;
      padding: 12px;
      display: flex;
      gap: 12px;
      align-items: center;
    }
    .ach-card.unlocked {
      border-color: #facc15;
      background: linear-gradient(135deg, rgba(250,204,21,0.12) 0%, #1e293b 100%);
    }
    .ach-card.locked {
      opacity: 0.55;
    }
    .bp-toast {
      position: fixed;
      bottom: 22px;
      right: 22px;
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      border: 1.5px solid #facc15;
      color: #f8fafc;
      padding: 12px 16px;
      border-radius: 14px;
      font-weight: 800;
      font-size: 0.88rem;
      z-index: 10000;
      box-shadow: 0 12px 28px rgba(0,0,0,0.5);
      animation: bpSlideIn 0.25s ease;
    }
    @keyframes bpSlideIn {
      from { transform: translateY(16px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}

function renderAvatarHeaderWidget() {
  injectAvatarShopStyles();
  const targetParent = document.getElementById("btn-sound-toggle")?.parentElement || document.getElementById("btn-en")?.parentElement;
  if (!targetParent) return;

  let chip = document.getElementById("avatar-hud-chip");
  if (!chip) {
    chip = document.createElement("button");
    chip.id = "avatar-hud-chip";
    chip.type = "button";
    chip.className = "avatar-hud-chip";
    targetParent.insertBefore(chip, targetParent.firstChild);
  }

  const unlockedCount = avatarProfile.unlockedAchievements.length;
  chip.innerHTML = `
    <div class="avatar-hud-circle">${buildAvatarSVG(avatarProfile, 30)}</div>
    <div class="avatar-hud-info">
      <span class="avatar-hud-name">${escapeHtmlSimple(avatarProfile.name)}</span>
      <span class="avatar-hud-coins">🪙 ${avatarProfile.coins} · 🏆 ${unlockedCount}/${ACHIEVEMENTS_LIST.length}</span>
    </div>
  `;
  chip.onclick = () => openAvatarShopModal("studio");
}

function escapeHtmlSimple(str) {
  return String(str || "").replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
}

function showAchievementToast(text) {
  const toast = document.createElement("div");
  toast.className = "bp-toast";
  toast.textContent = text;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3600);
}

// -------------------------------------------------------------------------
// 3. MÜNZ-BELOHNUNG & TROPHÄEN-CHECK
// -------------------------------------------------------------------------
function rewardCoinsAndCheckAchievements(coinsEarned = 20, extra = {}) {
  avatarProfile.coins += coinsEarned;
  avatarProfile.lifetimeCoins += coinsEarned;

  if (extra.correctDelta) {
    avatarProfile.stats.totalCorrect += extra.correctDelta;
  }
  if (typeof streak === "number" && streak > avatarProfile.stats.bestStreak) {
    avatarProfile.stats.bestStreak = streak;
  }
  if (extra.grayscaleCorrect) {
    avatarProfile.stats.grayscaleCorrect += 1;
  }
  if (typeof extra.trueSizeErrorPct === "number") {
    if (extra.trueSizeErrorPct <= 10) avatarProfile.stats.trueSizePreciseStreak += 1;
    else avatarProfile.stats.trueSizePreciseStreak = 0;
  }
  if (extra.exploredId) {
    if (!avatarProfile.stats.exploredCountries.includes(extra.exploredId)) {
      avatarProfile.stats.exploredCountries.push(extra.exploredId);
    }
  }

  evaluateAllAchievements();
  saveAvatarProfile();
  renderAvatarHeaderWidget();
}

function evaluateAllAchievements() {
  let sweepEuropeBest = null;
  try {
    const raw = localStorage.getItem("brainpulse_sweep_records_v1");
    const parsed = raw ? JSON.parse(raw) : {};
    if (typeof parsed.europe === "number") sweepEuropeBest = parsed.europe;
  } catch (e) {}

  let masteredCountries = 0;
  if (typeof userProgress !== "undefined" && userProgress?.atlas?.countries) {
    masteredCountries = Object.values(userProgress.atlas.countries).filter(c => c && c.mastered).length;
  }

  const checkPayload = {
    ...avatarProfile.stats,
    lifetimeCoins: avatarProfile.lifetimeCoins,
    ownedCount: avatarProfile.owned.length,
    sweepEuropeBest,
    masteredCountries
  };

  ACHIEVEMENTS_LIST.forEach(ach => {
    if (!avatarProfile.unlockedAchievements.includes(ach.id) && ach.check(checkPayload)) {
      avatarProfile.unlockedAchievements.push(ach.id);
      avatarProfile.coins += ach.reward;
      avatarProfile.lifetimeCoins += ach.reward;
      if (typeof playSuccessSound === "function") playSuccessSound(6);
      const label = currentLang === "de"
        ? `🏆 Trophäe frei: ${ach.de.title} (+${ach.reward} 🪙)`
        : `🏆 Unlocked: ${ach.en.title} (+${ach.reward} 🪙)`;
      showAchievementToast(label);
    }
  });
}

// -------------------------------------------------------------------------
// 4. MODAL: CHARAKTER-STUDIO, SHOP, PRESETS & TROPHÄEN
// -------------------------------------------------------------------------
function openAvatarShopModal(tab = "studio") {
  activeAvatarModalTab = tab;
  evaluateAllAchievements();
  saveAvatarProfile();

  let backdrop = document.getElementById("bp-avatar-modal");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.id = "bp-avatar-modal";
    backdrop.className = "bp-modal-backdrop";
    backdrop.onclick = (e) => {
      if (e.target === backdrop) closeAvatarShopModal();
    };
    document.body.appendChild(backdrop);
  }
  renderAvatarShopModalContent();
}

function closeAvatarShopModal() {
  const el = document.getElementById("bp-avatar-modal");
  if (el) el.remove();
  renderAvatarHeaderWidget();
}
function setStudioField(key, value) {
  avatarProfile[key] = value;
  saveAvatarProfile();
  renderAvatarShopModalContent();
  renderAvatarHeaderWidget();
}

function handleCharacterNameInput(rawVal) {
  const limited = String(rawVal || "").slice(0, 18);
  avatarProfile.name = limited.trim() ? limited : "Explorer";
  saveAvatarProfile();
  const nameTag = document.getElementById("studio-preview-name");
  if (nameTag) nameTag.textContent = avatarProfile.name;
  renderAvatarHeaderWidget();
}

function finalizeCharacterName(inputEl) {
  const cleaned = String(inputEl.value || "").trim().slice(0, 18) || "Explorer";
  avatarProfile.name = cleaned;
  inputEl.value = cleaned;
  saveAvatarProfile();
  const nameTag = document.getElementById("studio-preview-name");
  if (nameTag) nameTag.textContent = cleaned;
  renderAvatarHeaderWidget();
}

function loadOutfitPreset(slotIdx) {
  const p = avatarProfile.presets[slotIdx];
  if (!p) return;
  avatarProfile.skin = p.skin || avatarProfile.skin;
  avatarProfile.hairStyle = p.hairStyle || avatarProfile.hairStyle;
  avatarProfile.hairColor = p.hairColor || avatarProfile.hairColor;
  avatarProfile.expression = p.expression || avatarProfile.expression;
  avatarProfile.beard = p.beard || "none";
  avatarProfile.blush = Boolean(p.blush);
  avatarProfile.accentColor = p.accentColor || "#38bdf8";
  avatarProfile.stageBg = p.stageBg || "atlas";
  avatarProfile.equipped = { ...avatarProfile.equipped, ...(p.equipped || {}) };
  saveAvatarProfile();
  renderAvatarHeaderWidget();
  if (typeof playTone === "function") playTone(580, 0.1, "triangle", 0.1);
  renderAvatarShopModalContent();
}

function handleShopItemAction(itemId) {
  const item = AVATAR_SHOP_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  if (avatarProfile.owned.includes(itemId)) {
    avatarProfile.equipped[item.cat] = itemId;
    if (typeof playTone === "function") playTone(620, 0.09, "triangle", 0.1);
  } else if (avatarProfile.coins >= item.price) {
    avatarProfile.coins -= item.price;
    avatarProfile.owned.push(itemId);
    avatarProfile.equipped[item.cat] = itemId;
    if (typeof playSuccessSound === "function") playSuccessSound(4);
    evaluateAllAchievements();
  } else {
    if (typeof playErrorSound === "function") playErrorSound();
    return;
  }

  saveAvatarProfile();
  renderAvatarShopModalContent();
  renderAvatarHeaderWidget();
}

function renderAvatarShopModalContent() {
  const backdrop = document.getElementById("bp-avatar-modal");
  if (!backdrop) return;
  const de = currentLang === "de";

  const stageObj = STAGE_BACKGROUNDS.find(s => s.id === avatarProfile.stageBg) || STAGE_BACKGROUNDS[0];

const previewBanner = `
    <div style="display:flex;gap:16px;align-items:center;background:#1e293b;padding:12px 14px;border-radius:16px;border:1px solid #334155;flex-wrap:wrap;">
      <div class="studio-stage-box" style="background:${stageObj.css};">
        ${buildAvatarSVG(avatarProfile, 82)}
        <span id="studio-preview-name" style="font-size:0.72rem;font-weight:800;color:#f8fafc;margin-top:4px;text-shadow:0 1px 4px rgba(0,0,0,0.8);">${escapeHtmlSimple(avatarProfile.name)}</span>
      </div>
      <div style="flex:1;min-width:210px;">
        <label style="font-size:0.76rem;color:#94a3b8;font-weight:700;display:block;margin-bottom:4px;">
          ${de ? "Charakter-Name:" : "Character Name:"}
        </label>
        <input type="text" maxlength="18" value="${escapeHtmlSimple(avatarProfile.name)}"
          oninput="handleCharacterNameInput(this.value)"
          onblur="finalizeCharacterName(this)"
          style="background:#0f172a;border:1px solid #475569;color:#f8fafc;padding:7px 11px;border-radius:10px;font-weight:700;width:100%;max-width:230px;">
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:10px;">
          ${STAGE_BACKGROUNDS.map(bg => `
            <button type="button" class="pill-btn"
              style="padding:4px 9px;font-size:0.75rem;${avatarProfile.stageBg === bg.id ? "border-color:#38bdf8;color:#38bdf8;" : ""}"
              onclick="setStudioField('stageBg','${bg.id}')">${bg.icon} ${de ? bg.de : bg.en}</button>
          `).join("")}
        </div>
      </div>
    </div>
  `;
  let bodyHtml = previewBanner;

  if (activeAvatarModalTab === "studio") {
    const skinButtons = SKIN_TONES.map(hex => `
      <button type="button" onclick="setStudioField('skin','${hex}')"
        style="width:24px;height:24px;border-radius:50%;background:${hex};border:${avatarProfile.skin === hex ? "2.5px solid #38bdf8" : "1px solid #475569"};cursor:pointer;"></button>
    `).join("");

    const hairColorButtons = HAIR_COLORS.map(hex => `
      <button type="button" onclick="setStudioField('hairColor','${hex}')"
        style="width:22px;height:22px;border-radius:50%;background:${hex};border:${avatarProfile.hairColor === hex ? "2.5px solid #facc15" : "1px solid #475569"};cursor:pointer;"></button>
    `).join("");

    const hairStyleButtons = HAIR_STYLES.map(hs => `
      <button type="button" class="pill-btn"
        style="padding:4px 9px;font-size:0.76rem;${avatarProfile.hairStyle === hs.id ? "background:#38bdf8;color:#0f172a;border-color:#38bdf8;font-weight:800;" : ""}"
        onclick="setStudioField('hairStyle','${hs.id}')">${de ? hs.de : hs.en}</button>
    `).join("");

    const exprButtons = EXPRESSIONS.map(ex => `
      <button type="button" class="pill-btn"
        style="padding:4px 9px;font-size:0.76rem;${avatarProfile.expression === ex.id ? "background:#38bdf8;color:#0f172a;border-color:#38bdf8;font-weight:800;" : ""}"
        onclick="setStudioField('expression','${ex.id}')">${ex.icon} ${de ? ex.de : ex.en}</button>
    `).join("");

    const beardButtons = BEARD_STYLES.map(bd => `
      <button type="button" class="pill-btn"
        style="padding:4px 9px;font-size:0.76rem;${avatarProfile.beard === bd.id ? "background:#38bdf8;color:#0f172a;border-color:#38bdf8;font-weight:800;" : ""}"
        onclick="setStudioField('beard','${bd.id}')">${de ? bd.de : bd.en}</button>
    `).join("");

    const accentButtons = OUTFIT_ACCENT_COLORS.map(hex => `
      <button type="button" onclick="setStudioField('accentColor','${hex}')"
        style="width:24px;height:24px;border-radius:50%;background:${hex};border:${avatarProfile.accentColor === hex ? "2.5px solid #f8fafc" : "1px solid #475569"};cursor:pointer;"></button>
    `).join("");

    bodyHtml += `
      <div class="studio-controls-grid">
        <div class="studio-control-card">
          <span class="studio-control-label">${de ? "Hautton" : "Skin Tone"}</span>
          <div style="display:flex;gap:7px;flex-wrap:wrap;">${skinButtons}</div>
        </div>
        <div class="studio-control-card">
          <span class="studio-control-label">${de ? "Haarfarbe" : "Hair Color"}</span>
          <div style="display:flex;gap:7px;flex-wrap:wrap;">${hairColorButtons}</div>
        </div>
        <div class="studio-control-card">
          <span class="studio-control-label">${de ? "Frisur" : "Hairstyle"}</span>
          <div style="display:flex;gap:5px;flex-wrap:wrap;">${hairStyleButtons}</div>
        </div>
        <div class="studio-control-card">
          <span class="studio-control-label">${de ? "Gesichtsausdruck" : "Expression"}</span>
          <div style="display:flex;gap:5px;flex-wrap:wrap;">${exprButtons}</div>
        </div>
        <div class="studio-control-card">
          <span class="studio-control-label">${de ? "Bart & Wangen" : "Beard & Blush"}</span>
          <div style="display:flex;gap:5px;flex-wrap:wrap;align-items:center;">
            ${beardButtons}
            <button type="button" class="pill-btn"
              style="padding:4px 9px;font-size:0.76rem;${avatarProfile.blush ? "background:#fb7185;color:#0f172a;border-color:#fb7185;font-weight:800;" : ""}"
              onclick="setStudioField('blush',${!avatarProfile.blush})">🌸 Blush</button>
          </div>
        </div>
        <div class="studio-control-card">
          <span class="studio-control-label">${de ? "Outfit-Akzentfarbe" : "Outfit Accent Color"}</span>
          <div style="display:flex;gap:7px;flex-wrap:wrap;">${accentButtons}</div>
        </div>
      </div>
    `;
  } else if (activeAvatarModalTab === "shop") {
    const catLabels = de
      ? { hat: "🎩 Hüte", glasses: "🕶️ Brillen", top: "👕 Oberteile", pants: "👖 Hosen", acc: "🧭 Extras" }
      : { hat: "🎩 Hats", glasses: "🕶️ Glasses", top: "👕 Tops", pants: "👖 Pants", acc: "🧭 Extras" };

    const catTabsHtml = Object.keys(catLabels).map(catKey => `
      <button type="button" class="pill-btn"
        style="${activeShopCategory === catKey ? "background:#38bdf8;color:#0f172a;border-color:#38bdf8;font-weight:800;" : ""}"
        onclick="activeShopCategory='${catKey}';renderAvatarShopModalContent();">
        ${catLabels[catKey]}
      </button>
    `).join("");

    const filteredItems = AVATAR_SHOP_ITEMS.filter(i => i.cat === activeShopCategory);
    const itemsGridHtml = filteredItems.map(item => {
      const owned = avatarProfile.owned.includes(item.id);
      const equipped = avatarProfile.equipped[item.cat] === item.id;
      const canAfford = avatarProfile.coins >= item.price;
      const rar = RARITY_META[item.rarity] || RARITY_META.common;

      let statusBadge = "";
      if (equipped) {
        statusBadge = `<div style="color:#4ade80;font-weight:800;font-size:0.76rem;margin-top:4px;">✓ ${de ? "Angelegt" : "Equipped"}</div>`;
      } else if (owned) {
        statusBadge = `<div style="color:#38bdf8;font-weight:700;font-size:0.76rem;margin-top:4px;">${de ? "Anziehen" : "Equip"}</div>`;
      } else {
        statusBadge = `<div style="color:${canAfford ? "#facc15" : "#94a3b8"};font-weight:800;font-size:0.78rem;margin-top:4px;">🪙 ${item.price}</div>`;
      }

      return `
        <div class="shop-item-card ${equipped ? "equipped" : ""}" style="border-color:${equipped ? "#22c55e" : rar.color};" onclick="handleShopItemAction('${item.id}')">
          <div style="font-size:0.68rem;font-weight:800;color:${rar.color};text-transform:uppercase;">${de ? rar.de : rar.en}</div>
          <div style="font-size:1.75rem;margin-top:2px;">${item.icon}</div>
          <div style="font-size:0.82rem;font-weight:700;margin-top:3px;">${de ? item.de : item.en}</div>
          ${statusBadge}
        </div>
      `;
    }).join("");

    bodyHtml += `
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:14px;">${catTabsHtml}</div>
      <div class="shop-grid">${itemsGridHtml}</div>
    `;
  } else if (activeAvatarModalTab === "presets") {
    const slotsHtml = [0, 1, 2].map(idx => {
      const saved = avatarProfile.presets[idx];
      return `
        <div class="preset-card">
          <div style="font-weight:800;font-size:0.85rem;color:#cbd5e1;margin-bottom:8px;">
            ${de ? `Outfit-Slot ${idx + 1}` : `Outfit Slot ${idx + 1}`}
          </div>
          <div style="display:flex;justify-content:center;min-height:92px;align-items:center;">
            ${saved ? buildAvatarSVG(saved, 74) : `<span style="color:#64748b;font-size:0.8rem;">${de ? "Leer" : "Empty"}</span>`}
          </div>
          <div style="display:flex;gap:6px;justify-content:center;margin-top:10px;">
            <button type="button" class="pill-btn" style="padding:5px 10px;font-size:0.76rem;" onclick="saveOutfitPreset(${idx})">
              💾 ${de ? "Speichern" : "Save"}
            </button>
            ${saved ? `<button type="button" class="pill-btn" style="padding:5px 10px;font-size:0.76rem;border-color:#38bdf8;color:#38bdf8;" onclick="loadOutfitPreset(${idx})">
              ▶ ${de ? "Anlegen" : "Load"}
            </button>` : ""}
          </div>
        </div>
      `;
    }).join("");

    bodyHtml += `<div class="preset-grid">${slotsHtml}</div>`;
  } else {
    const achHtml = ACHIEVEMENTS_LIST.map(ach => {
      const unlocked = avatarProfile.unlockedAchievements.includes(ach.id);
      const info = de ? ach.de : ach.en;
      return `
        <div class="ach-card ${unlocked ? "unlocked" : "locked"}">
          <div style="font-size:2rem;">${unlocked ? ach.icon : "🔒"}</div>
          <div style="flex:1;">
            <div style="font-weight:800;font-size:0.9rem;color:${unlocked ? "#facc15" : "#cbd5e1"};">${info.title}</div>
            <div style="font-size:0.78rem;color:#94a3b8;margin-top:2px;">${info.desc}</div>
            <div style="font-size:0.74rem;font-weight:800;color:${unlocked ? "#4ade80" : "#64748b"};margin-top:4px;">
              ${unlocked ? (de ? "✓ Freigeschaltet" : "✓ Unlocked") : `+${ach.reward} 🪙`}
            </div>
          </div>
        </div>
      `;
    }).join("");

    bodyHtml += `<div class="ach-grid">${achHtml}</div>`;
  }

  backdrop.innerHTML = `
    <div class="bp-modal-card">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:14px;flex-wrap:wrap;">
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <button type="button" class="pill-btn"
            style="${activeAvatarModalTab === "studio" ? "background:#facc15;color:#0f172a;border-color:#facc15;font-weight:800;" : ""}"
            onclick="openAvatarShopModal('studio')">
            🎨 ${de ? "Charakter" : "Avatar"}
          </button>
          <button type="button" class="pill-btn"
            style="${activeAvatarModalTab === "shop" ? "background:#facc15;color:#0f172a;border-color:#facc15;font-weight:800;" : ""}"
            onclick="openAvatarShopModal('shop')">
            🛍️ ${de ? "Shop" : "Shop"}
          </button>
          <button type="button" class="pill-btn"
            style="${activeAvatarModalTab === "presets" ? "background:#facc15;color:#0f172a;border-color:#facc15;font-weight:800;" : ""}"
            onclick="openAvatarShopModal('presets')">
            👗 ${de ? "Outfits" : "Presets"}
          </button>
          <button type="button" class="pill-btn"
            style="${activeAvatarModalTab === "trophies" ? "background:#facc15;color:#0f172a;border-color:#facc15;font-weight:800;" : ""}"
            onclick="openAvatarShopModal('trophies')">
            🏆 ${de ? "Trophäen" : "Trophies"} (${avatarProfile.unlockedAchievements.length}/${ACHIEVEMENTS_LIST.length})
          </button>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="font-weight:800;color:#facc15;font-size:0.95rem;">🪙 ${avatarProfile.coins}</span>
          <button type="button" class="pill-btn" onclick="closeAvatarShopModal()">✕</button>
        </div>
      </div>
      ${bodyHtml}
    </div>
  `;
}

// -------------------------------------------------------------------------
// 5. HOOKS IN BESTEHENDE SPIELMODI
// -------------------------------------------------------------------------
const _shopOrigRenderHome = renderHome;
renderHome = function () {
  renderAvatarHeaderWidget();
  _shopOrigRenderHome.apply(this, arguments);

  const homeScreen = document.getElementById("screen-home");
  if (homeScreen) {
    let shelf = document.getElementById("home-trophy-shelf");
    if (!shelf) {
      shelf = document.createElement("div");
      shelf.id = "home-trophy-shelf";
      shelf.style.cssText = "margin-top:16px;padding:12px 14px;background:#1e293b;border:1px solid #334155;border-radius:14px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;cursor:pointer;";
      homeScreen.appendChild(shelf);
    }
    const de = currentLang === "de";
    const unlockedIcons = ACHIEVEMENTS_LIST
      .filter(a => avatarProfile.unlockedAchievements.includes(a.id))
      .map(a => a.icon)
      .join(" ") || (de ? "Noch keine Medaillen" : "No medals yet");

    shelf.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;">
        <span style="font-size:1.35rem;">🏆</span>
        <div>
          <div style="font-size:0.84rem;font-weight:800;color:#f8fafc;">
            ${de ? "Trophäen-Vitrine & Charakter-Shop" : "Trophy Case & Avatar Shop"} (${avatarProfile.unlockedAchievements.length}/${ACHIEVEMENTS_LIST.length})
          </div>
          <div style="font-size:0.78rem;color:#94a3b8;">${unlockedIcons}</div>
        </div>
      </div>
      <span style="font-size:0.8rem;font-weight:800;color:#facc15;">🪙 ${avatarProfile.coins} →</span>
    `;
    shelf.onclick = () => openAvatarShopModal("trophies");
  }
};

const _shopOrigHandleAnswer = handleAnswer;
handleAnswer = function (selectedIdx) {
  const prevCorrect = correctCount;
  const item = activeQuestions[currentIndex];
  _shopOrigHandleAnswer.apply(this, arguments);
  if (correctCount > prevCorrect) {
    rewardCoinsAndCheckAchievements(20, {
      correctDelta: 1,
      grayscaleCorrect: Boolean(item && item.isGrayscale)
    });
  }
};

const _shopOrigHandleMapGuess = handleMapGuess;
handleMapGuess = function (clickedId, clickedFeature) {
  const prevCorrect = correctCount;
  _shopOrigHandleMapGuess.apply(this, arguments);
  if (correctCount > prevCorrect) {
    rewardCoinsAndCheckAchievements(20, { correctDelta: 1 });
  }
};

const _shopOrigHandleHolGuess = handleHolGuess;
handleHolGuess = function (selectedIdx) {
  const prevCorrect = correctCount;
  _shopOrigHandleHolGuess.apply(this, arguments);
  if (correctCount > prevCorrect) {
    rewardCoinsAndCheckAchievements(20, { correctDelta: 1 });
  }
};

const _shopOrigHandleChronoSlot = handleChronoSlot;
handleChronoSlot = function (slotIdx) {
  const prevCorrect = correctCount;
  _shopOrigHandleChronoSlot.apply(this, arguments);
  if (correctCount > prevCorrect) {
    rewardCoinsAndCheckAchievements(20, { correctDelta: 1 });
  }
};

if (typeof submitTrueSizeGuess === "function") {
  const _shopOrigSubmitTrueSize = submitTrueSizeGuess;
  submitTrueSizeGuess = function () {
    const prevCorrect = correctCount;
    const item = activeQuestions[currentIndex];
    _shopOrigSubmitTrueSize.apply(this, arguments);
    if (item) {
      const areaScaleGuess = item.userFactor * item.userFactor;
      const errorPct = Math.round(Math.abs(areaScaleGuess - 1) * 100);
      const earnedCoins = errorPct <= 12 ? 35 : (errorPct <= 30 ? 20 : 0);
      rewardCoinsAndCheckAchievements(earnedCoins, {
        correctDelta: correctCount > prevCorrect ? 1 : 0,
        trueSizeErrorPct: errorPct
      });
    }
  };
}

if (typeof inspectCountryInExplorer === "function") {
  const _shopOrigInspectExplorer = inspectCountryInExplorer;
  inspectCountryInExplorer = function (countryId) {
    _shopOrigInspectExplorer.apply(this, arguments);
    rewardCoinsAndCheckAchievements(0, { exploredId: String(countryId).padStart(3, "0") });
  };
}

// Initial starten
renderAvatarHeaderWidget();
renderHome();