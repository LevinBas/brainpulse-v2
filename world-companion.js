// =========================================================================
// ERWEITERUNG IV: BEGLEITER (PETS), VERRÜCKTE ITEMS & TAG/NACHT-WELTKARTE
// Einbinden nach avatar-shop.js: <script src="world-companion.js"></script>
// =========================================================================

// 1. Verrückte & geheime Items + Begleiter in den bestehenden Shop einhängen
const EXTRA_CRAZY_ITEMS = [
  // Verrückte Hüte (inkl. 1 geheimes Item, das erst nach 5 richtigen Antworten oder im Shop sichtbar wird)
  { id: "hat_foil", cat: "hat", rarity: "rare", price: 290, icon: "🥫", en: "Tinfoil Hat", de: "Aluhut" },
  { id: "hat_propeller", cat: "hat", rarity: "epic", price: 480, icon: "🚁", en: "Propeller Cap", de: "Propeller-Mütze" },
  { id: "hat_shark", cat: "hat", rarity: "legendary", price: 1250, icon: "🦈", en: "Shark Hood", de: "Hai-Kapuze", secret: true },

  // Verrückte Oberteile & Hosen
  { id: "top_cardboard", cat: "top", rarity: "rare", price: 260, icon: "📦", en: "Cardboard Armor", de: "Karton-Rüstung" },
  { id: "pants_rainbow", cat: "pants", rarity: "epic", price: 540, icon: "🌈", en: "Rainbow Tights", de: "Regenbogen-Hose" },

  // Verrückte Accessoires
  { id: "acc_scarf", cat: "acc", rarity: "rare", price: 220, icon: "🧣", en: "Rainbow Scarf", de: "Regenbogen-Schal" },
  { id: "acc_wand", cat: "acc", rarity: "epic", price: 640, icon: "🪄", en: "Geo Wand", de: "Geo-Zauberstab" },

  // Begleiter / Haustiere (Pet-Kategorie)
  { id: "pet_none", cat: "pet", rarity: "common", price: 0, icon: "🚫", en: "No Companion", de: "Kein Begleiter" },
  { id: "pet_sloth", cat: "pet", rarity: "common", price: 250, icon: "🦥", en: "Chill Sloth", de: "Gemütliches Faultier" },
  { id: "pet_cat", cat: "pet", rarity: "rare", price: 380, icon: "🐱", en: "Pixel Cat", de: "Pixel-Katze" },
  { id: "pet_owl", cat: "pet", rarity: "rare", price: 460, icon: "🦉", en: "Night Owl", de: "Nacht-Eule" },
  { id: "pet_bot", cat: "pet", rarity: "epic", price: 720, icon: "🤖", en: "Radar Bot", de: "Radar-Roboter" },
  { id: "pet_dragon", cat: "pet", rarity: "legendary", price: 1400, icon: "🐉", en: "Mini Dragon", de: "Mini-Drache" }
];

if (typeof AVATAR_SHOP_ITEMS !== "undefined") {
  EXTRA_CRAZY_ITEMS.forEach(item => {
    if (!AVATAR_SHOP_ITEMS.some(existing => existing.id === item.id)) {
      AVATAR_SHOP_ITEMS.push(item);
    }
  });
}

if (typeof DEFAULT_PROFILE_DATA !== "undefined") {
  DEFAULT_PROFILE_DATA.equipped.pet = "pet_none";
  if (!DEFAULT_PROFILE_DATA.owned.includes("pet_none")) {
    DEFAULT_PROFILE_DATA.owned.push("pet_none");
  }
}

if (typeof avatarProfile !== "undefined") {
  if (!avatarProfile.equipped.pet) avatarProfile.equipped.pet = "pet_none";
  if (!avatarProfile.owned.includes("pet_none")) avatarProfile.owned.push("pet_none");
  if (!Array.isArray(avatarProfile.presets)) avatarProfile.presets = [null, null, null];
  saveAvatarProfile();
}

// 2. Animationen & SVG-Details für verrückte Items + Begleiter
function injectCompanionAndDayNightStyles() {
  if (document.getElementById("bp-companion-daynight-styles")) return;
  const style = document.createElement("style");
  style.id = "bp-companion-daynight-styles";
  style.textContent = `
    @keyframes bpPetFloat {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-4px) rotate(2deg); }
    }
    @keyframes bpPetHop {
      0%, 100% { transform: translateY(0px) scaleY(1); }
      40% { transform: translateY(-6px) scaleY(1.06); }
      75% { transform: translateY(0px) scaleY(0.95); }
    }
    @keyframes bpPropellerSpin {
      0% { transform: scaleX(1); }
      50% { transform: scaleX(0.15); }
      100% { transform: scaleX(1); }
    }
    @keyframes bpCityTwinkle {
      0%, 100% { opacity: 0.55; }
      50% { opacity: 1; }
    }
    .bp-pet-float {
      transform-box: fill-box;
      transform-origin: center;
      animation: bpPetFloat 2.4s ease-in-out infinite;
    }
    .bp-pet-hop {
      transform-box: fill-box;
      transform-origin: center;
      animation: bpPetHop 1.5s ease-in-out infinite;
    }
    .bp-propeller-blade {
      transform-box: fill-box;
      transform-origin: center;
      animation: bpPropellerSpin 0.35s linear infinite;
    }
    .daynight-toggle-btn {
      background: #1e293b;
      border: 1px solid #334155;
      color: #f8fafc;
      border-radius: 999px;
      padding: 4px 10px;
      font-size: 0.78rem;
      font-weight: 800;
      cursor: pointer;
    }
    .daynight-toggle-btn.active {
      border-color: #facc15;
      color: #facc15;
    }
    .night-city-dot {
      animation: bpCityTwinkle 2.6s ease-in-out infinite;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);
}

function renderCompanionSVG(petId) {
  if (!petId || petId === "pet_none") return "";

  if (petId === "pet_sloth") {
    return `
      <g class="bp-pet-float">
        <ellipse cx="86" cy="96" rx="11" ry="9" fill="#a16207"/>
        <circle cx="86" cy="94" r="7.5" fill="#ca8a04"/>
        <ellipse cx="86" cy="95" rx="5.2" ry="4" fill="#fef3c7"/>
        <circle cx="84" cy="94" r="1.3" fill="#0f172a"/>
        <circle cx="88" cy="94" r="1.3" fill="#0f172a"/>
        <path d="M84.5 97 Q86 98.5 87.5 97" stroke="#0f172a" stroke-width="1.2" fill="none"/>
      </g>
    `;
  }
  if (petId === "pet_cat") {
    return `
      <g class="bp-pet-hop">
        <path d="M77 99 Q70 92 73 86" stroke="#f97316" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <ellipse cx="86" cy="97" rx="9" ry="8" fill="#fb923c"/>
        <circle cx="86" cy="89" r="6.8" fill="#fb923c"/>
        <polygon points="80,85 82,78 85,84" fill="#ea580c"/>
        <polygon points="92,85 90,78 87,84" fill="#ea580c"/>
        <circle cx="84" cy="89" r="1.3" fill="#0f172a"/>
        <circle cx="88" cy="89" r="1.3" fill="#0f172a"/>
      </g>
    `;
  }
  if (petId === "pet_owl") {
    return `
      <g class="bp-pet-float">
        <ellipse cx="86" cy="92" rx="8.5" ry="11" fill="#78350f"/>
        <ellipse cx="86" cy="94" rx="5.5" ry="7" fill="#fde68a"/>
        <circle cx="83.5" cy="89" r="2.6" fill="#fef08a" stroke="#0f172a" stroke-width="1"/>
        <circle cx="88.5" cy="89" r="2.6" fill="#fef08a" stroke="#0f172a" stroke-width="1"/>
        <circle cx="83.5" cy="89" r="1.1" fill="#0f172a"/>
        <circle cx="88.5" cy="89" r="1.1" fill="#0f172a"/>
        <polygon points="86,90.5 84.5,93 87.5,93" fill="#f59e0b"/>
      </g>
    `;
  }
  if (petId === "pet_bot") {
    return `
      <g class="bp-pet-float">
        <line x1="86" y1="81" x2="86" y2="85" stroke="#94a3b8" stroke-width="2"/>
        <circle cx="86" cy="80" r="2.3" fill="#ef4444"/>
        <rect x="78" y="85" width="16" height="14" rx="4" fill="#cbd5e1" stroke="#334155" stroke-width="1.5"/>
        <rect x="81" y="89" width="10" height="5" rx="2" fill="#0f172a"/>
        <circle cx="83.5" cy="91.5" r="1.4" fill="#22d3ee"/>
        <circle cx="88.5" cy="91.5" r="1.4" fill="#22d3ee"/>
      </g>
    `;
  }
  if (petId === "pet_dragon") {
    return `
      <g class="bp-pet-hop">
        <path d="M77 97 Q69 91 72 84" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <ellipse cx="86" cy="96" rx="9" ry="8.5" fill="#16a34a"/>
        <circle cx="87" cy="87" r="7" fill="#22c55e"/>
        <polygon points="82,82 81,76 85,81" fill="#facc15"/>
        <polygon points="89,82 91,76 92,81" fill="#facc15"/>
        <circle cx="89" cy="86.5" r="1.4" fill="#fef08a"/>
        <path d="M93 89 L97 88 L95 91 Z" fill="#f97316"/>
      </g>
    `;
  }
  return "";
}

// 3. buildAvatarSVG erweitern, damit Begleiter & verrückte Items gezeichnet werden
if (typeof buildAvatarSVG === "function") {
  const _origBuildAvatarSVG = buildAvatarSVG;
  buildAvatarSVG = function (profile = avatarProfile, size = 44) {
    injectCompanionAndDayNightStyles();
    const baseSvg = _origBuildAvatarSVG(profile, size);
    const eq = profile.equipped || {};
    const accent = profile.accentColor || "#38bdf8";

    let extraLayer = "";

    // Verrückte Hüte
    if (eq.hat === "hat_foil") {
      extraLayer += `
        <path d="M32 28 L42 12 L50 18 L58 11 L68 28 Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
        <line x1="42" y1="16" x2="47" y2="25" stroke="#ffffff" stroke-width="1.5"/>
      `;
    } else if (eq.hat === "hat_propeller") {
      extraLayer += `
        <path d="M34 28 Q50 14 66 28 Z" fill="${accent}"/>
        <line x1="50" y1="12" x2="50" y2="17" stroke="#e2e8f0" stroke-width="2.2"/>
        <ellipse class="bp-propeller-blade" cx="50" cy="11" rx="15" ry="2.8" fill="#facc15" stroke="#0f172a" stroke-width="1"/>
      `;
    } else if (eq.hat === "hat_shark") {
      extraLayer += `
        <path d="M31 32 Q31 14 50 14 Q69 14 69 32 L64 44 L50 39 L36 44 Z" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1.5"/>
        <polygon points="47,14 50,4 54,14" fill="#2563eb"/>
        <polygon points="39,40 42,45 45,40" fill="#ffffff"/>
        <polygon points="55,40 58,45 61,40" fill="#ffffff"/>
      `;
    }

    // Karton-Rüstung
    if (eq.top === "top_cardboard") {
      extraLayer += `
        <rect x="34" y="59" width="32" height="26" rx="3" fill="#d97706" stroke="#78350f" stroke-width="2"/>
        <line x1="50" y1="59" x2="50" y2="85" stroke="#92400e" stroke-width="1.5" stroke-dasharray="3,2"/>
        <rect x="44" y="68" width="12" height="7" rx="1" fill="#fef3c7" opacity="0.7"/>
      `;
    }

    // Regenbogen-Hose
    if (eq.pants === "pants_rainbow") {
      extraLayer += `
        <rect x="38" y="84" width="10" height="6" fill="#ef4444"/>
        <rect x="52" y="84" width="10" height="6" fill="#ef4444"/>
        <rect x="38" y="90" width="10" height="6" fill="#facc15"/>
        <rect x="52" y="90" width="10" height="6" fill="#facc15"/>
        <rect x="38" y="96" width="10" height="6" fill="#22c55e"/>
        <rect x="52" y="96" width="10" height="6" fill="#22c55e"/>
        <rect x="38" y="102" width="10" height="6" fill="#3b82f6"/>
        <rect x="52" y="102" width="10" height="6" fill="#3b82f6"/>
      `;
    }

    // Regenbogen-Schal & Geo-Zauberstab
    if (eq.acc === "acc_scarf") {
      extraLayer += `
        <rect x="35" y="55" width="30" height="7" rx="3.5" fill="#ef4444"/>
        <rect x="35" y="57.5" width="30" height="2.2" fill="#facc15"/>
        <rect x="35" y="59.8" width="30" height="2.2" fill="#38bdf8"/>
        <path d="M58 61 L64 76 L58 76 Z" fill="#ef4444"/>
      `;
    } else if (eq.acc === "acc_wand") {
      extraLayer += `
        <line x1="72" y1="84" x2="82" y2="62" stroke="#f8fafc" stroke-width="2.6" stroke-linecap="round"/>
        <polygon points="82,56 84.5,61 90,61.5 85.8,65 87,70.5 82,67.5 77,70.5 78.2,65 74,61.5 79.5,61" fill="#facc15"/>
      `;
    }

    // Begleiter rechts neben den Charakter setzen und ViewBox für ihn öffnen
    const petSvg = renderCompanionSVG(eq.pet);
    const expandedSvg = baseSvg.replace(
      `viewBox="0 0 100 115" width="${size}" height="${Math.round(size * 1.15)}" style="display:block;overflow:visible;">`,
      `viewBox="0 0 104 115" width="${Math.round(size * 1.06)}" height="${Math.round(size * 1.15)}" style="display:block;overflow:visible;">`
    );

    const insertPoint = expandedSvg.lastIndexOf("</svg>");
    if (insertPoint === -1) return expandedSvg;
    return expandedSvg.slice(0, insertPoint) + extraLayer + petSvg + "</svg>";
  };
}

// 4. Shop-Kategorien im Modal um "Begleiter" erweitern & geheimes Item freischalten
if (typeof renderAvatarShopModalContent === "function") {
  const _origRenderShopModal = renderAvatarShopModalContent;
  renderAvatarShopModalContent = function () {
    const prevCatLabels = window._bpPrevCatLabels;
    const de = currentLang === "de";

    // Geheimes Hai-Item freischalten, sobald mind. 5 richtige Antworten erreicht wurden
    const sharkItem = AVATAR_SHOP_ITEMS.find(i => i.id === "hat_shark");
    if (sharkItem && avatarProfile?.stats?.totalCorrect >= 5) {
      sharkItem.secret = false;
    }

    // Temporär filtern, falls ein verstecktes Item noch nicht freigeschaltet ist
    const origShopList = [...AVATAR_SHOP_ITEMS];
    const hiddenIds = new Set(AVATAR_SHOP_ITEMS.filter(i => i.secret && !avatarProfile.owned.includes(i.id)).map(i => i.id));
    if (hiddenIds.size > 0) {
      for (let i = AVATAR_SHOP_ITEMS.length - 1; i >= 0; i--) {
        if (hiddenIds.has(AVATAR_SHOP_ITEMS[i].id)) AVATAR_SHOP_ITEMS.splice(i, 1);
      }
    }

    _origRenderShopModal.apply(this, arguments);

    // Ursprüngliche Liste wiederherstellen
    AVATAR_SHOP_ITEMS.length = 0;
    origShopList.forEach(item => AVATAR_SHOP_ITEMS.push(item));

    // Wenn "shop" aktiv ist, den Reiter "🐾 Begleiter" ergänzen
    if (activeAvatarModalTab === "shop") {
      const backdrop = document.getElementById("bp-avatar-modal");
      const shopGrid = backdrop?.querySelector(".shop-grid");
      const tabBar = shopGrid?.previousElementSibling;
      if (tabBar && !tabBar.querySelector("[data-pet-tab='1']")) {
        const petBtn = document.createElement("button");
        petBtn.type = "button";
        petBtn.className = "pill-btn";
        petBtn.setAttribute("data-pet-tab", "1");
        petBtn.textContent = de ? "🐾 Begleiter" : "🐾 Pets";
        if (activeShopCategory === "pet") {
          petBtn.style.cssText = "background:#38bdf8;color:#0f172a;border-color:#38bdf8;font-weight:800;";
        }
        petBtn.onclick = () => {
          activeShopCategory = "pet";
          renderAvatarShopModalContent();
        };
        tabBar.appendChild(petBtn);

        if (activeShopCategory === "pet") {
          tabBar.querySelectorAll("button:not([data-pet-tab='1'])").forEach(b => {
            b.style.background = "";
            b.style.color = "";
            b.style.borderColor = "";
            b.style.fontWeight = "";
          });
          const petItems = AVATAR_SHOP_ITEMS.filter(i => i.cat === "pet" && (!i.secret || avatarProfile.owned.includes(i.id)));
          shopGrid.innerHTML = petItems.map(item => {
            const owned = avatarProfile.owned.includes(item.id);
            const equipped = avatarProfile.equipped.pet === item.id;
            const canAfford = avatarProfile.coins >= item.price;
            const rar = RARITY_META[item.rarity] || RARITY_META.common;
            let statusBadge = "";
            if (equipped) {
              statusBadge = `<div style="color:#4ade80;font-weight:800;font-size:0.76rem;margin-top:4px;">✓ ${de ? "Dabei" : "Active"}</div>`;
            } else if (owned) {
              statusBadge = `<div style="color:#38bdf8;font-weight:700;font-size:0.76rem;margin-top:4px;">${de ? "Rufen" : "Summon"}</div>`;
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
        }
      }
    }
  };
}

// 5. DYNAMISCHER TAG- & NACHT-ZYKLUS AUF DER D3-WELTKARTE + STADTLICHTER
let dayNightCycleEnabled = localStorage.getItem("brainpulse_daynight_enabled") !== "false";

const MAJOR_NIGHT_CITIES = [
  { lon: -74.0, lat: 40.7 },   // New York
  { lon: -99.1, lat: 19.4 },   // Mexiko-Stadt
  { lon: -46.6, lat: -23.5 },  // São Paulo
  { lon: -58.4, lat: -34.6 },  // Buenos Aires
  { lon: -0.1, lat: 51.5 },    // London
  { lon: 2.35, lat: 48.85 },   // Paris
  { lon: 13.4, lat: 52.52 },   // Berlin
  { lon: 12.5, lat: 41.9 },    // Rom
  { lon: 37.6, lat: 55.75 },   // Moskau
  { lon: 31.2, lat: 30.04 },   // Kairo
  { lon: 28.0, lat: -26.2 },   // Johannesburg
  { lon: 55.27, lat: 25.2 },   // Dubai
  { lon: 77.2, lat: 28.6 },    // Delhi
  { lon: 103.8, lat: 1.35 },   // Singapur
  { lon: 116.4, lat: 39.9 },   // Peking
  { lon: 121.5, lat: 31.2 },   // Shanghai
  { lon: 139.7, lat: 35.68 },  // Tokio
  { lon: 151.2, lat: -33.87 }  // Sydney
];

// Berechnet den Sonnenstand [lon, lat] anhand der aktuellen UTC-Zeit & Tageszahl
function getCurrentSunPosition(now = new Date()) {
  const startOfYear = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
  const dayOfYear = Math.floor((now - startOfYear) / 86400000) + 1;
  const utcHours = now.getUTCHours() + now.getUTCMinutes() / 60 + now.getUTCSeconds() / 3600;

  // Sonne steht um 12:00 UTC bei 0° Länge
  let sunLon = (12 - utcHours) * 15;
  if (sunLon > 180) sunLon -= 360;
  if (sunLon < -180) sunLon += 360;

  // Saisonale Deklination der Sonne (-23.44° bis +23.44°)
  const sunLat = 23.44 * Math.sin((2 * Math.PI / 365) * (dayOfYear - 81));
  return [sunLon, sunLat];
}

// Sphärischer Winkelabstand in Grad zwischen Punkt [lon, lat] und Sonne [sLon, sLat]
function angularDistanceDeg(lon1, lat1, lon2, lat2) {
  const toRad = Math.PI / 180;
  const p1 = lat1 * toRad;
  const p2 = lat2 * toRad;
  const dp = (lat2 - lat1) * toRad;
  const dl = (lon2 - lon1) * toRad;
  const a = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
  return (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))) / toRad;
}

function updateMapDayNightOverlay() {
  injectCompanionAndDayNightStyles();
  if (!mapG || typeof mapProjection === "undefined" || !mapProjection) return;

  mapG.selectAll(".day-night-overlay-group").remove();
  if (!dayNightCycleEnabled) return;

  const [sunLon, sunLat] = getCurrentSunPosition(new Date());
  // Nachtzentrum liegt exakt gegenüber der Sonne
  let nightLon = sunLon + 180;
  if (nightLon > 180) nightLon -= 360;
  const nightLat = -sunLat;

  // Nacht-Halbkugel (Radius 90° um den Nachtpol) erzeugen
  const nightCircle = d3.geoCircle()
    .center([nightLon, nightLat])
    .radius(90)
    .precision(3)();

  const overlayGroup = mapG.append("g")
    .attr("class", "day-night-overlay-group")
    .style("pointer-events", "none");

  overlayGroup.append("path")
    .datum(nightCircle)
    .attr("d", d3.geoPath().projection(mapProjection))
    .style("fill", "rgba(9, 17, 42, 0.44)")
    .style("stroke", "rgba(250, 204, 21, 0.25)")
    .style("stroke-width", "1px");

  // Lichtpunkte für große Städte, die aktuell im Nachtbereich liegen
  MAJOR_NIGHT_CITIES.forEach((city, idx) => {
    const distFromSun = angularDistanceDeg(city.lon, city.lat, sunLon, sunLat);
    if (distFromSun > 92) {
      const projected = mapProjection([city.lon, city.lat]);
      if (projected && !Number.isNaN(projected[0]) && !Number.isNaN(projected[1])) {
        overlayGroup.append("circle")
          .attr("class", "night-city-dot")
          .attr("cx", projected[0])
          .attr("cy", projected[1])
          .attr("r", 2.1)
          .style("fill", "#fde047")
          .style("animation-delay", `${(idx % 5) * 0.4}s`);
      }
    }
  });
}

function renderDayNightToggleButton() {
  injectCompanionAndDayNightStyles();
  const mapHintEl = document.getElementById("ui-map-hint");
  if (!mapHintEl || !mapHintEl.parentElement) return;

  let btn = document.getElementById("btn-daynight-toggle");
  if (!btn) {
    btn = document.createElement("button");
    btn.id = "btn-daynight-toggle";
    btn.type = "button";
    btn.className = "daynight-toggle-btn";
    btn.style.marginLeft = "10px";
    mapHintEl.parentElement.appendChild(btn);
  }

  const de = currentLang === "de";
  btn.classList.toggle("active", dayNightCycleEnabled);
  btn.textContent = dayNightCycleEnabled
    ? (de ? "🌓 Tag/Nacht: An" : "🌓 Day/Night: On")
    : (de ? "☀️ Tag/Nacht: Aus" : "☀️ Day/Night: Off");

  btn.onclick = () => {
    dayNightCycleEnabled = !dayNightCycleEnabled;
    localStorage.setItem("brainpulse_daynight_enabled", String(dayNightCycleEnabled));
    renderDayNightToggleButton();
    updateMapDayNightOverlay();
  };
}

// Nach jedem Kartenaufbau oder Fragen-Render die Tag/Nacht-Schicht aktualisieren
if (typeof ensureMapLoaded === "function") {
  const _origEnsureMapLoaded = ensureMapLoaded;
  ensureMapLoaded = async function () {
    await _origEnsureMapLoaded.apply(this, arguments);
    renderDayNightToggleButton();
    updateMapDayNightOverlay();
  };
}

if (typeof renderQuestion === "function") {
  const _origRenderQuestionDN = renderQuestion;
  renderQuestion = function () {
    _origRenderQuestionDN.apply(this, arguments);
    renderDayNightToggleButton();
    updateMapDayNightOverlay();
  };
}

// Alle 60 Sekunden automatisch an die aktuelle Uhrzeit anpassen
setInterval(() => {
  if (dayNightCycleEnabled && typeof mapG !== "undefined" && mapG) {
    updateMapDayNightOverlay();
  }
}, 60000);

// Initial starten
injectCompanionAndDayNightStyles();
if (typeof renderAvatarHeaderWidget === "function") renderAvatarHeaderWidget();