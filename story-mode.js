// =========================================================================
// ERWEITERUNG V (NAPOLEON FULL GRAPHIC & CINEMATIC EDITION)
// Komplette Napoleon-Kampagne mit Kapitel-Artwork, sanftem Text-Einblenden,
// klickbaren SVG-Grafik-Aufgaben, Story-Info NACH der Antwort & Next-Chapter-Flow
// Einbinden nach world-companion.js: <script src="story-mode.js"></script>
// =========================================================================

function buildNapoleonChapterArtwork(sceneKey, title, badge) {
  const artMap = {
    corsica: `
      <svg viewBox="0 0 420 175" class="story-art-svg" aria-hidden="true">
        <defs>
          <linearGradient id="napBg1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0f172a"/>
            <stop offset="60%" stop-color="#1e293b"/>
            <stop offset="100%" stop-color="#172554"/>
          </linearGradient>
        </defs>
        <rect width="420" height="175" rx="16" fill="url(#napBg1)"/>
        <circle cx="330" cy="48" r="36" fill="rgba(250,204,21,0.12)"/>
        <circle cx="330" cy="48" r="18" fill="rgba(250,204,21,0.22)"/>
        <!-- Stilisierter junger Offizier mit Zweispitz -->
        <g transform="translate(86, 26)">
          <path d="M18 36 Q52 14 86 36 L74 44 Q52 34 30 44 Z" fill="#0f172a" stroke="#facc15" stroke-width="2"/>
          <circle cx="52" cy="18" r="4" fill="#facc15"/>
          <circle cx="52" cy="54" r="15" fill="#fde68a"/>
          <path d="M39 50 Q52 41 65 50" fill="#451a03"/>
          <path d="M26 118 L34 72 L70 72 L78 118 Z" fill="#1d4ed8" stroke="#93c5fd" stroke-width="1.5"/>
          <path d="M34 72 L52 94 L70 72" fill="none" stroke="#f8fafc" stroke-width="3"/>
          <rect x="24" y="70" width="14" height="7" rx="3" fill="#facc15"/>
          <rect x="66" y="70" width="14" height="7" rx="3" fill="#facc15"/>
        </g>
        <!-- Insel- & Küstenlinien -->
        <path d="M235 135 Q275 95 315 112 Q350 85 385 122 L385 155 L235 155 Z" fill="rgba(56,189,248,0.16)" stroke="#38bdf8" stroke-width="1.5"/>
        <path d="M210 142 Q290 128 395 145" fill="none" stroke="rgba(250,204,21,0.35)" stroke-dasharray="5 5"/>
      </svg>
    `,
    italy_egypt: `
      <svg viewBox="0 0 420 175" class="story-art-svg" aria-hidden="true">
        <defs>
          <linearGradient id="napBg2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0f172a"/>
            <stop offset="100%" stop-color="#312e81"/>
          </linearGradient>
        </defs>
        <rect width="420" height="175" rx="16" fill="url(#napBg2)"/>
        <!-- Alpen- & Wüsten-Silhouette + Route -->
        <polygon points="45,148 95,62 135,108 172,54 220,148" fill="rgba(226,232,240,0.14)" stroke="#93c5fd" stroke-width="1.5"/>
        <polygon points="245,148 310,66 378,148" fill="rgba(250,204,21,0.14)" stroke="#facc15" stroke-width="1.5"/>
        <path class="story-dash-anim" d="M88 126 Q185 38 312 104" fill="none" stroke="#facc15" stroke-width="2.5" stroke-dasharray="6 5"/>
        <circle cx="88" cy="126" r="5" fill="#38bdf8"/>
        <circle cx="312" cy="104" r="5" fill="#facc15"/>
      </svg>
    `,
    empire: `
      <svg viewBox="0 0 420 175" class="story-art-svg" aria-hidden="true">
        <defs>
          <linearGradient id="napBg3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#1e1b4b"/>
            <stop offset="100%" stop-color="#0f172a"/>
          </linearGradient>
        </defs>
        <rect width="420" height="175" rx="16" fill="url(#napBg3)"/>
        <circle cx="210" cy="88" r="56" fill="rgba(250,204,21,0.09)" stroke="rgba(250,204,21,0.35)" stroke-width="1.5"/>
        <!-- Stilisierte Krone -->
        <g transform="translate(158, 52)">
          <path d="M8 54 L16 18 L36 36 L52 10 L68 36 L88 18 L96 54 Z" fill="rgba(250,204,21,0.28)" stroke="#facc15" stroke-width="2.2"/>
          <rect x="8" y="54" width="88" height="10" rx="4" fill="#facc15"/>
          <circle cx="52" cy="8" r="4" fill="#38bdf8"/>
        </g>
      </svg>
    `,
    blockade: `
      <svg viewBox="0 0 420 175" class="story-art-svg" aria-hidden="true">
        <defs>
          <linearGradient id="napBg4" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0f172a"/>
            <stop offset="100%" stop-color="#134e4a"/>
          </linearGradient>
        </defs>
        <rect width="420" height="175" rx="16" fill="url(#napBg4)"/>
        <circle cx="130" cy="88" r="44" fill="rgba(56,189,248,0.12)" stroke="#38bdf8" stroke-width="1.5"/>
        <circle cx="290" cy="88" r="44" fill="rgba(250,204,21,0.12)" stroke="#facc15" stroke-width="1.5"/>
        <line x1="210" y1="28" x2="210" y2="148" stroke="#f87171" stroke-width="2.5" stroke-dasharray="5 5"/>
        <path class="story-dash-anim" d="M135 88 L285 88" fill="none" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="4 4"/>
      </svg>
    `,
    russia: `
      <svg viewBox="0 0 420 175" class="story-art-svg" aria-hidden="true">
        <defs>
          <linearGradient id="napBg5" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0f172a"/>
            <stop offset="100%" stop-color="#1e3a8a"/>
          </linearGradient>
        </defs>
        <rect width="420" height="175" rx="16" fill="url(#napBg5)"/>
        <path d="M0 132 Q110 118 220 134 T420 128 L420 175 L0 175 Z" fill="rgba(224,242,254,0.14)"/>
        <path class="story-dash-anim" d="M48 106 L210 68 L368 102" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="7 5"/>
        <circle cx="48" cy="106" r="5" fill="#facc15"/>
        <circle cx="368" cy="102" r="5" fill="#f87171"/>
      </svg>
    `,
    endgame: `
      <svg viewBox="0 0 420 175" class="story-art-svg" aria-hidden="true">
        <defs>
          <linearGradient id="napBg6" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0f172a"/>
            <stop offset="100%" stop-color="#334155"/>
          </linearGradient>
        </defs>
        <rect width="420" height="175" rx="16" fill="url(#napBg6)"/>
        <path d="M60 126 Q140 92 210 124 T360 116" fill="none" stroke="#38bdf8" stroke-width="2"/>
        <circle cx="105" cy="112" r="7" fill="#facc15"/>
        <circle cx="215" cy="122" r="8" fill="#f87171"/>
        <circle cx="325" cy="114" r="7" fill="#94a3b8"/>
      </svg>
    `
  };

  return `
    <div class="story-cinematic-banner">
      ${artMap[sceneKey] || artMap.corsica}
      <div class="story-cinematic-overlay">
        <span class="story-cinematic-badge">${badge}</span>
        <h3 class="story-cinematic-title">${title}</h3>
      </div>
    </div>
  `;
}

function buildInteractiveGraphicSvg(graphicId, de) {
  if (graphicId === "toulon_batteries") {
    return `
      <div style="font-size:0.82rem;color:#94a3b8;margin-bottom:8px;">
        ${de ? "Klicke in der Grafik auf den taktisch entscheidenden Punkt, um den Hafen/Zugang zu sichern:" : "Click the decisive tactical point on the graphic to control the harbor approach:"}
      </div>
      <svg viewBox="0 0 420 185" class="story-interactive-svg">
        <rect width="420" height="185" rx="14" fill="#0b1120"/>
        <path d="M0 128 Q140 112 260 132 T420 124 L420 185 L0 185 Z" fill="rgba(14,165,233,0.22)"/>
        <polygon points="35,135 110,65 185,135" fill="rgba(148,163,184,0.22)" stroke="#64748b"/>
        <!-- Hotspot A: Höhenbatterie -->
        <g class="story-svg-hotspot" onclick="submitGraphicPick('height_battery')">
          <circle cx="110" cy="68" r="18" fill="rgba(250,204,21,0.18)" stroke="#facc15" stroke-width="2"/>
          <text x="110" y="72" text-anchor="middle" fill="#fef08a" font-size="11" font-weight="800">A</text>
          <text x="110" y="102" text-anchor="middle" fill="#e2e8f0" font-size="10">${de ? "Höhenbatterie" : "High Battery"}</text>
        </g>
        <!-- Hotspot B: Offenes Wasser -->
        <g class="story-svg-hotspot" onclick="submitGraphicPick('open_sea')">
          <circle cx="290" cy="148" r="18" fill="rgba(56,189,248,0.16)" stroke="#38bdf8" stroke-width="2"/>
          <text x="290" y="152" text-anchor="middle" fill="#bae6fd" font-size="11" font-weight="800">B</text>
          <text x="290" y="174" text-anchor="middle" fill="#cbd5e1" font-size="10">${de ? "Offene See" : "Open Sea"}</text>
        </g>
      </svg>
    `;
  }

  if (graphicId === "coronation_crown") {
    return `
      <div style="font-size:0.82rem;color:#94a3b8;margin-bottom:8px;">
        ${de ? "Klicke auf das Element in der Krönungsszene, das Napoleons Selbstkrönung 1804 symbolisiert:" : "Click the element in the coronation graphic that represents Napoleon's 1804 self-crowning:"}
      </div>
      <svg viewBox="0 0 420 185" class="story-interactive-svg">
        <rect width="420" height="185" rx="14" fill="#0b1120"/>
        <g class="story-svg-hotspot" onclick="submitGraphicPick('crown_self')">
          <circle cx="210" cy="78" r="36" fill="rgba(250,204,21,0.16)" stroke="#facc15" stroke-width="2"/>
          <path d="M184 90 L190 62 L204 76 L210 56 L216 76 L230 62 L236 90 Z" fill="#facc15"/>
          <text x="210" y="132" text-anchor="middle" fill="#fef08a" font-size="11" font-weight="800">${de ? "Kaiserkrone" : "Imperial Crown"}</text>
        </g>
        <g class="story-svg-hotspot" onclick="submitGraphicPick('river_bank')">
          <circle cx="92" cy="138" r="22" fill="rgba(56,189,248,0.15)" stroke="#38bdf8" stroke-width="1.8"/>
          <text x="92" y="142" text-anchor="middle" fill="#bae6fd" font-size="10" font-weight="700">${de ? "Seine-Ufer" : "Riverbank"}</text>
        </g>
      </svg>
    `;
  }

  if (graphicId === "moscow_retreat_route") {
    return `
      <div style="font-size:0.82rem;color:#94a3b8;margin-bottom:8px;">
        ${de ? "Klicke auf der Routengrafik auf den Abschnitt, in dem Kälte und lange Nachschubwege 1812 besonders hart trafen:" : "Click the route segment on the graphic where winter cold and long supply lines hit hardest in 1812:"}
      </div>
      <svg viewBox="0 0 420 185" class="story-interactive-svg">
        <rect width="420" height="185" rx="14" fill="#0b1120"/>
        <path d="M55 110 L205 72 L365 106" fill="none" stroke="#475569" stroke-width="3" stroke-dasharray="6 5"/>
        <g class="story-svg-hotspot" onclick="submitGraphicPick('start_border')">
          <circle cx="55" cy="110" r="18" fill="rgba(56,189,248,0.18)" stroke="#38bdf8" stroke-width="2"/>
          <text x="55" y="114" text-anchor="middle" fill="#bae6fd" font-size="10" font-weight="800">West</text>
        </g>
        <g class="story-svg-hotspot" onclick="submitGraphicPick('deep_winter_return')">
          <circle cx="285" cy="89" r="22" fill="rgba(248,113,113,0.22)" stroke="#f87171" stroke-width="2.2"/>
          <text x="285" y="93" text-anchor="middle" fill="#fecaca" font-size="10" font-weight="800">${de ? "Winter-Rückweg" : "Winter Return"}</text>
        </g>
      </svg>
    `;
  }

  return `
    <div style="font-size:0.82rem;color:#94a3b8;margin-bottom:8px;">
      ${de ? "Klicke auf den Schauplatz in der Grafik, der den entscheidenden Wendepunkt 1815 markiert:" : "Click the location on the graphic marking the decisive 1815 turning point:"}
    </div>
    <svg viewBox="0 0 420 185" class="story-interactive-svg">
      <rect width="420" height="185" rx="14" fill="#0b1120"/>
      <g class="story-svg-hotspot" onclick="submitGraphicPick('waterloo_point')">
        <circle cx="210" cy="88" r="28" fill="rgba(250,204,21,0.2)" stroke="#facc15" stroke-width="2"/>
        <text x="210" y="92" text-anchor="middle" fill="#fef08a" font-size="11" font-weight="800">Waterloo (1815)</text>
      </g>
      <g class="story-svg-hotspot" onclick="submitGraphicPick('far_ocean')">
        <circle cx="345" cy="142" r="20" fill="rgba(56,189,248,0.16)" stroke="#38bdf8" stroke-width="1.8"/>
        <text x="345" y="146" text-anchor="middle" fill="#bae6fd" font-size="10" font-weight="700">${de ? "Südatlantik" : "South Atlantic"}</text>
      </g>
    </svg>
  `;
}

const STORY_CAMPAIGNS = [
  {
    id: "napoleon",
    icon: "⚔️",
    en: {
      title: "Napoleon: Rise, Empire & Fall",
      subtitle: "6 cinematic chapters · 30 interactive challenges with chapter artwork, animated text reveals, interactive SVG graphics, and post-answer story lore."
    },
    de: {
      title: "Napoleon: Aufstieg, Kaiserreich & Fall",
      subtitle: "6 animierte Kapitel · 30 interaktive Aufgaben mit Kapitel-Artwork, sanftem Text-Einblenden, klickbaren SVG-Grafiken & Story-Text nach jeder Antwort."
    },
    chapters: [
      {
        id: "nap_ch1",
        num: 1,
        sceneKey: "corsica",
        en: {
          title: "Chapter 1: Corsica, Revolution & Toulon",
          badge: "1769–1795",
          intro: "A young artillery officer steps onto a Europe shaken by revolution—where discipline, terrain, and decisive action turn turmoil into a rapid rise."
        },
        de: {
          title: "Kapitel 1: Korsika, Revolution & Toulon",
          badge: "1769–1795",
          intro: "Ein junger Artillerieoffizier tritt in ein Europa im Umbruch – wo Gespür für Gelände, Disziplin und schnelles Handeln den Aufstieg eröffnen."
        },
        steps: [
          {
            type: "choice",
            en: {
              q: "Where was Napoleon born in 1769 before attending military schools in mainland France?",
              options: ["On the island of Corsica", "In central Paris", "In southern Spain", "On the island of Malta"],
              storyInfo: "Napoleon was born in Ajaccio on Corsica in August 1769—just one year after the island came under French rule. Growing up between island roots and mainland French military academies shaped his ambition and his sharp focus on geography, engineering, and discipline."
            },
            de: {
              q: "Wo wurde Napoleon 1769 geboren, bevor er an Militärschulen auf dem französischen Festland ging?",
              options: ["Auf der Insel Korsika", "Im Zentrum von Paris", "In Südspanien", "Auf der Insel Malta"],
              storyInfo: "Napoleon kam im August 1769 in Ajaccio auf Korsika zur Welt – nur ein Jahr, nachdem die Insel an Frankreich übergegangen war. Die Prägung durch die Inselheimat und die strengen Militärschulen auf dem Festland legte den Grundstein für seinen Ehrgeiz und sein Gespür für Gelände und Taktik."
            },
            answer: 0
          },
          {
            type: "year_slider",
            min: 1770,
            max: 1810,
            targetYear: 1789,
            tolerance: 2,
            en: {
              q: "Estimate the year the French Revolution erupted, transforming France's political order.",
              storyInfo: "In 1789 the French Revolution upended centuries of monarchy and privilege. For a young officer without noble birth, the resulting political upheaval and wars across Europe broke old barriers and created rapid paths to command."
            },
            de: {
              q: "Schätze das Jahr, in dem die Französische Revolution ausbrach und Frankreichs Ordnung umwälzte.",
              storyInfo: "1789 stellte die Französische Revolution die bisherige Ordnung von Krone und Ständen auf den Kopf. Für einen jungen Offizier ohne hohen Adelstitel öffneten die folgenden Umbrüche und Kriege Türen, die unter dem alten System verschlossen geblieben wären."
            }
          },
          {
            type: "graphic_pick",
            graphicId: "toulon_batteries",
            correctKey: "height_battery",
            en: {
              q: "Using the graphic below, pick the tactical position that helps dominate key approaches early on.",
              storyInfo: "Trained as an artillery officer, Napoleon understood how commanding high ground with cannon batteries could control harbors and approaches—an insight that helped turn early sieges and street crises."
            },
            de: {
              q: "Wähle in der Grafik unten die Position, mit der sich Zugänge früh entscheidend sichern lassen.",
              storyInfo: "Als Artillerieoffizier wusste Napoleon, wie Geschütze auf erhöhten Stellungen Zugänge und Häfen kontrollieren konnten – ein Prinzip, das seinen frühen Aufstieg prägte."
            }
          },
          {
            type: "map",
            targetId: "250",
            en: {
              q: "Click on the country on the map where Napoleon rose through the revolutionary ranks to command in Paris.",
              storyInfo: "Within France, revolutionary politics shifted rapidly between assemblies, clubs, and street unrest. By proving useful to the government in Paris—especially in October 1795—Napoleon moved from a regional artillery officer into the center of national affairs."
            },
            de: {
              q: "Klicke auf der Karte auf das Land, in dem Napoleon durch die Revolutionsjahre bis in die Führung aufstieg.",
              storyInfo: "In Frankreich wechselten die Machtverhältnisse während der Revolutionsjahre mehrfach zwischen Parlamenten, Regierungsgremien und Straßenprotesten. Wer in Paris im entscheidenden Moment Ruhe und Ordnung durchsetzen konnte, rückte rasch ins Zentrum der Macht."
            }
          },
          {
            type: "decision",
            en: {
              q: "Tactical Choice (1795): Royalist crowds advance toward government buildings in Paris. How do you respond?",
              choices: [
                { label: "Position cannons along key streets for a firm show of force", good: true, note: "Controlling the main approaches quickly halted the advance and cemented Napoleon's reputation in Paris." },
                { label: "Withdraw all guards and leave the streets completely open", good: false, note: "Leaving key avenues unguarded risked losing control over central government buildings." }
              ],
              storyInfo: "In October 1795 ('13 Vendémiaire'), securing key approaches in Paris turned a crisis into a breakthrough. Soon afterward, Napoleon received command of the French army in Italy—his springboard to fame."
            },
            de: {
              q: "Taktische Wahl (1795): Aufständische rücken in Paris vor. Wie reagierst du?",
              choices: [
                { label: "Kanonen an den Zugangsstraßen sichern und entschlossen auftreten", good: true, note: "Die Kontrolle der Zugangswege stoppte den Vorstoß rasch und festigte Napoleons Stellung in Paris." },
                { label: "Alle Posten abziehen und die Straßen ungeschützt lassen", good: false, note: "Ohne gesicherte Zugänge wäre die Kontrolle über das Regierungsviertel schnell gefährdet gewesen." }
              ],
              storyInfo: "Im Oktober 1795 (13. Vendémiaire) machte die entschlossene Sicherung der Zugänge in Paris Napoleon über Nacht bekannt. Kurz darauf folgte der Oberbefehl in Italien – der eigentliche Startschuss für seinen militärischen Aufstieg."
            }
          }
        ]
      },
      {
        id: "nap_ch2",
        num: 2,
        sceneKey: "italy_egypt",
        en: {
          title: "Chapter 2: Italy & Egypt",
          badge: "1796–1799",
          intro: "From swift maneuvers in northern Italy to a bold crossing toward Egypt—where soldiers and scholars crossed paths with ancient history."
        },
        de: {
          title: "Kapitel 2: Italien & Ägypten",
          badge: "1796–1799",
          intro: "Von schnellen Märschen in Norditalien bis zu einem kühnen Zug nach Ägypten – wo Feldzüge und Forschung auf antike Spuren trafen."
        },
        steps: [
          {
            type: "map",
            targetId: "380",
            en: {
              q: "Find and click the boot-shaped peninsula on the map where Napoleon led his 1796–1797 campaign.",
              storyInfo: "In 1796 Napoleon took over an under-supplied army in northern Italy. Moving faster than expected, he separated opposing forces and won a string of victories that reshaped northern Italy and made his name a household word."
            },
            de: {
              q: "Finde und klicke auf der Karte die Halbinsel, auf der Napoleon 1796–1797 seinen schnellen Feldzug führte.",
              storyInfo: "1796 übernahm Napoleon ein schlecht versorgtes Heer in Norditalien. Durch schnelles Vorrücken trennte er gegnerische Kräfte und erzielte überraschende Erfolge, die seinen Ruf als Feldherr begründeten."
            }
          },
          {
            type: "choice",
            en: {
              q: "What key advantage did Napoleon repeatedly use against larger or slower-moving opponents in Italy?",
              options: ["Rapid marches and concentrating forces at one point", "Waiting out winters in static fortresses", "Avoiding all river crossings", "Relying solely on naval blockade"],
              storyInfo: "Rather than scattering troops evenly everywhere, Napoleon pushed marches hard and concentrated strength against one part of the enemy line at a time—creating local superiority even when overall numbers were tight."
            },
            de: {
              q: "Welchen Vorteil nutzte Napoleon in Italien immer wieder gegen oft schwerfälligere Gegner?",
              options: ["Schnelle Märsche und Kräftebündelung am Schlüsselpunkt", "Monatelanges Ausharren in festen Burgen", "Komplettes Meiden von Flussübergängen", "Rein maritime Seeblockaden"],
              storyInfo: "Statt seine Kräfte gleichmäßig zu verteilen, setzte Napoleon auf hohe Marschgeschwindigkeit und bündelte Truppen an einem bestimmten Punkt – so konnte er dort örtlich überlegen sein, wo der Gegner noch nicht bereitstand."
            },
            answer: 0
          },
          {
            type: "map",
            targetId: "818",
            en: {
              q: "Click the northeastern African country on the map at the mouth of the Nile where Napoleon landed in 1798.",
              storyInfo: "In 1798 Napoleon sailed across the Mediterranean to Egypt to disrupt British eastern trade links. Alongside soldiers came over a hundred scholars, engineers, and artists tasked with mapping and studying the land."
            },
            de: {
              q: "Klicke auf der Karte das Land im Nordosten Afrikas am Nil-Delta an, in dem Napoleon 1798 landete.",
              storyInfo: "1798 segelte Napoleon übers Mittelmeer nach Ägypten, um britische Handelswege Richtung Osten zu treffen. Mit an Bord waren über hundert Gelehrte, Ingenieure und Zeichner, die das Land erforschen und dokumentieren sollten."
            }
          },
          {
            type: "choice",
            en: {
              q: "Which famous stone slab found during the 1798–1799 expedition unlocked ancient Egyptian script?",
              options: ["Rosetta Stone", "Cylinder of Cyrus", "Behistun Relief", "London Stone"],
              storyInfo: "Discovered in 1799 during fortification work in Egypt, the Rosetta Stone carried the same decree in hieroglyphs, Demotic, and Ancient Greek—giving scholars decades later the vital key to deciphering hieroglyphs."
            },
            de: {
              q: "Welcher berühmte Fund aus dieser Expedition half entscheidend beim Entziffern der Hieroglyphen?",
              options: ["Stein von Rosetta", "Kyros-Zylinder", "Behistun-Inschrift", "London Stone"],
              storyInfo: "Der 1799 bei Schanzarbeiten in Ägypten entdeckte Stein von Rosetta zeigte denselben Text in Hieroglyphen, Demotisch und Altgriechisch – dadurch konnten Forscher später die Hieroglyphen entschlüsseln."
            },
            answer: 0
          },
          {
            type: "order",
            en: {
              q: "Order these stages of Napoleon's early path from earliest (1) to latest (3):",
              items: [
                "Italian campaign begins (1796)",
                "Expedition to Egypt sets sail (1798)",
                "Return to France and rise as First Consul (1799)"
              ],
              storyInfo: "From northern Italy (1796) to Egypt (1798) and back to a troubled France in 1799: Napoleon left his army in Egypt and returned home as political crisis peaked, paving the way to become First Consul."
            },
            de: {
              q: "Ordne diese Stationen von früh (1) nach spät (3):",
              items: [
                "Beginn des Italienfeldzugs (1796)",
                "Aufbruch nach Ägypten (1798)",
                "Rückkehr und Aufstieg zum Ersten Konsul (1799)"
              ],
              storyInfo: "Über Norditalien (1796) und Ägypten (1798) führte der Weg 1799 zurück nach Frankreich: Angesichts politischer Krisen in Paris kehrte Napoleon zurück und stieg zum Ersten Konsul auf."
            },
            correctOrder: [0, 1, 2]
          }
        ]
      },
      {
        id: "nap_ch3",
        num: 3,
        sceneKey: "empire",
        en: {
          title: "Chapter 3: Order, Law & The Crown",
          badge: "1799–1805",
          intro: "Unified laws, centralized administration, and a new imperial crown in Paris—where authority was reshaped for an entire era."
        },
        de: {
          title: "Kapitel 3: Ordnung, Recht & Kaiserkrone",
          badge: "1799–1805",
          intro: "Einheitliche Gesetze, straffe Verwaltung und eine neue Kaiserkrone in Paris – Macht und Ordnung werden für eine ganze Epoche neu geformt."
        },
        steps: [
          {
            type: "choice",
            en: {
              q: "What major legal achievement unified French civil law under Napoleon's era?",
              options: ["The Code civil", "The Treaty of Westphalia", "The Magna Carta", "The Edict of Nantes"],
              storyInfo: "Promulgated in 1804, the Code civil replaced a patchwork of old regional laws with a clear, unified civil code. Its principles of legal equality before the law and property rights spread across much of Europe."
            },
            de: {
              q: "Welches große Gesetzeswerk vereinheitlichte unter Napoleon das bürgerliche Recht in Frankreich?",
              options: ["Der Code civil", "Der Westfälische Frieden", "Die Magna Carta", "Das Edikt von Nantes"],
              storyInfo: "Der 1804 verkündete Code civil löste ein unübersichtliches Geflecht alter Sonderrechte durch ein einheitliches Gesetzbuch ab. Seine Grundsätze prägten das Rechtssystem in Frankreich und vielen anderen Ländern."
            },
            answer: 0
          },
          {
            type: "year_slider",
            min: 1798,
            max: 1814,
            targetYear: 1804,
            tolerance: 1,
            en: {
              q: "In which year did Napoleon crown himself Emperor of the French?",
              storyInfo: "In 1804 the French Republic was transformed into a hereditary empire. The imperial title was meant to anchor Napoleon's rule in tradition and stability while keeping key revolutionary gains."
            },
            de: {
              q: "In welchem Jahr ließ sich Napoleon zum Kaiser der Franzosen krönen?",
              storyInfo: "1804 wurde aus dem Konsulat das Kaiserreich der Franzosen. Der Kaisertitel sollte die Herrschaft dauerhaft verankern und gleichzeitig zentrale Errungenschaften der Revolution absichern."
            }
          },
          {
            type: "graphic_pick",
            graphicId: "coronation_crown",
            correctKey: "crown_self",
            en: {
              q: "Click the element in the graphic tied to Napoleon's 1804 coronation ceremony in Paris.",
              storyInfo: "At Notre-Dame in December 1804, Napoleon took the crown and placed it on his own head before crowning Empress Joséphine—a powerful visual statement that his power came from his own rise and nation."
            },
            de: {
              q: "Klicke in der Grafik auf das Symbol, das mit Napoleons Krönung 1804 in Paris verbunden ist.",
              storyInfo: "Im Dezember 1804 in Notre-Dame nahm Napoleon die Krone selbst und setzte sie sich auf – ein deutliches Zeichen, dass er seine Macht aus eigener Kraft und der Nation herleitete."
            }
          },
          {
            type: "choice",
            en: {
              q: "Which administrative step helped Napoleon collect taxes and govern departments more evenly?",
              options: ["Centralized prefects and standardized administration", "Replacing all maps with poetry", "Dissolving all schools and courts", "Abolishing currency"],
              storyInfo: "By appointing prefects to lead departments and reforming tax collection, state finances, and central schools, Napoleon built a strong administrative state that outlasted his reign."
            },
            de: {
              q: "Welche Maßnahme stärkte die Verwaltung und Steuererhebung in den französischen Départements?",
              options: ["Zentral ernannte Präfekten und einheitliche Verwaltung", "Abschaffung aller Landkarten", "Schließung aller Gerichte", "Abschaffung jedes Geldes"],
              storyInfo: "Über Präfekten in den Départements sowie geordnete Steuern, Finanzen und Bildungseinrichtungen schuf Napoleon eine straffe Staatsverwaltung, die weit über seine Herrschaft hinauswirkte."
            },
            answer: 0
          },
          {
            type: "decision",
            en: {
              q: "Statecraft Choice: You want lasting legal uniformity across territories. What works best?",
              choices: [
                { label: "Publish a clear, written civil code applied uniformly", good: true, note: "A single, clear legal framework created predictable rules across regions." },
                { label: "Leave every local village to invent contradictory rules daily", good: false, note: "Contradictory local rules create confusion and uneven treatment." }
              ],
              storyInfo: "With domestic order tightened and the empire proclaimed in 1804, Napoleon's focus shifted ever more strongly to European rivalries—above all against shifting coalitions led or financed with Britain."
            },
            de: {
              q: "Staatskunst-Wahl: Du willst einheitliche Regeln in verschiedenen Regionen. Was hilft?",
              choices: [
                { label: "Ein klares, schriftliches Gesetzbuch einheitlich anwenden", good: true, note: "Ein einheitliches Gesetzbuch schuf klare und verlässliche Regeln." },
                { label: "Jeden Ort täglich widersprüchliche Regeln erfinden lassen", good: false, note: "Widersprüchliche lokale Regeln führen zu Unsicherheit und Chaos." }
              ],
              storyInfo: "Mit straffer Verwaltung und dem Kaisertum ab 1804 rückten die großen europäischen Konflikte noch stärker in den Vordergrund – allen voran der Kampf gegen wechselnde Koalitionen und gegen Großbritannien."
            }
          }
        ]
      },
      {
        id: "nap_ch4",
        num: 4,
        sceneKey: "blockade",
        en: {
          title: "Chapter 4: Mastery Over Europe & Trade War",
          badge: "1805–1811",
          intro: "Continental dominance meets maritime rivalry—where trade bans, ports, and distant fronts test how far power can reach."
        },
        de: {
          title: "Kapitel 4: Vorherrschaft & Handelskrieg",
          badge: "1805–1811",
          intro: "Vorherrschaft auf dem Festland trifft auf Rivalität zur See – Handelssperren, Häfen und neue Schauplätze stellen das Reich auf die Probe."
        },
        steps: [
          {
            type: "choice",
            en: {
              q: "Why did Napoleon turn to an economic blockade rather than invading Britain directly across the Channel?",
              options: ["Britain held naval supremacy at sea", "Britain had no coastline", "The English Channel was frozen solid", "Napoleon had no land army"],
              storyInfo: "Following naval setbacks such as Trafalgar in 1805, invading Britain across the sea was out of reach. Napoleon therefore launched the Continental System to bar British ships and goods from continental European ports."
            },
            de: {
              q: "Warum setzte Napoleon stark auf eine Handelssperre statt auf eine direkte Landung in Großbritannien?",
              options: ["Großbritannien beherrschte die See", "Großbritannien hatte keine Küste", "Der Ärmelkanal war zugefroren", "Frankreich hatte kein Landheer"],
              storyInfo: "Nach Niederlagen zur See wie 1805 bei Trafalgar war ein Übersetzen nach Großbritannien nicht durchsetzbar. Mit der Kontinentalsperre versuchte Napoleon stattdessen, britische Schiffe und Waren aus europäischen Häfen auszusperren."
            },
            answer: 0
          },
          {
            type: "map",
            targetId: "724",
            en: {
              q: "Click the Iberian country on the map where prolonged conflict from 1808 heavily drained French troops.",
              storyInfo: "When Napoleon intervened in Spain in 1808, fierce resistance and guerrilla fighting turned the Iberian Peninsula into a long-lasting drain of soldiers, money, and momentum."
            },
            de: {
              q: "Klicke auf der Karte das Land auf der Iberischen Halbinsel an, in dem ab 1808 ein zäher Krieg viele Kräfte band.",
              storyInfo: "Als Napoleon 1808 in Spanien eingriff, entbrannte ein zäher Widerstandskrieg auf der Iberischen Halbinsel – ein dauerhafter Kräfte- und Geldverlust, der Frankreich über Jahre belastete."
            }
          },
          {
            type: "choice",
            en: {
              q: "What common side effect undermined strict enforcement of the Continental System?",
              options: ["Smuggling and shortages of overseas goods", "Instant peace across all borders", "Lower transport costs everywhere", "End of all customs inspections"],
              storyInfo: "Cutting off overseas trade hurt coastal cities and consumers across Europe, encouraging smuggling and diplomatic friction—especially when countries like Russia grew reluctant to enforce the ban strictly."
            },
            de: {
              q: "Welche Folge schwächte die Durchsetzung der Kontinentalsperre in der Praxis oft?",
              options: ["Schmuggel und Knappheit an Überseewaren", "Sofortiger Frieden an allen Grenzen", "Sinkende Transportkosten überall", "Wegfall jeder Zollkontrolle"],
              storyInfo: "Fehlende Überseewaren und hohe Preise trafen viele Regionen in Europa empfindlich. Schmuggel nahm zu, und Spannungen wuchsen – besonders als Russland die Sperre immer weniger streng umsetzte."
            },
            answer: 0
          },
          {
            type: "order",
            en: {
              q: "Put these events in chronological order from earliest (1) to latest (3):",
              items: [
                "Crowned Emperor in Paris (1804)",
                "Outbreak of war on the Iberian Peninsula (1808)",
                "Invasion of Russia (1812)"
              ],
              storyInfo: "From crowning himself Emperor in 1804 to getting bogged down in Iberia from 1808 and marching into Russia in 1812: Napoleon's empire reached huge territorial scale while stretching its resources thin."
            },
            de: {
              q: "Bringe diese Ereignisse in die richtige zeitliche Reihenfolge (1 = frühestens, 3 = spätestens):",
              items: [
                "Kaiserkrönung in Paris (1804)",
                "Verschärfung des Krieges auf der Iberischen Halbinsel (1808)",
                "Einmarsch in Russland (1812)"
              ],
              storyInfo: "Von der Kaiserkrönung 1804 über den Krieg auf der Iberischen Halbinsel ab 1808 bis zum Feldzug nach Russland 1812: Das Reich wuchs enorm, doch die Kräfte verteilten sich auf immer mehr Schauplätze."
            },
            correctOrder: [0, 1, 2]
          },
          {
            type: "decision",
            en: {
              q: "Supply Choice: Your army marches deep into a region with few roads and sparse forage. What is the risk?",
              choices: [
                { label: "Stretched supply lines, exhaustion, and disease", good: true, note: "Longer routes mean harder resupply and heavy wear on men and horses." },
                { label: "Infinite free food appearing automatically every mile", good: false, note: "Massive armies cannot sustain themselves without reliable logistics." }
              ],
              storyInfo: "Disputes over trade and security pushed Napoleon toward a bold, perilous gamble: marching a huge force deep into Russia in 1812."
            },
            de: {
              q: "Nachschub-Wahl: Ein großes Heer rückt weit in dünn besiedeltes Gebiet vor. Was droht vor allem?",
              choices: [
                { label: "Überdehnte Nachschubwege, Erschöpfung und Versorgungsnot", good: true, note: "Lange Wege erschweren den Nachschub und zehren Truppen durch Märsche und Wetter aus." },
                { label: "Unbegrenzte Vorräte tauchen automatisch auf", good: false, note: "Große Heere sind auf stetigen Nachschub angewiesen." }
              ],
              storyInfo: "Streit über Handelsregeln und Bündnisse trieb Napoleon auf ein hohes Risiko zu: den Marsch eines riesigen Heeres tief nach Russland im Jahr 1812."
            }
          }
        ]
      },
      {
        id: "nap_ch5",
        num: 5,
        sceneKey: "russia",
        en: {
          title: "Chapter 5: The Long March East",
          badge: "1812",
          intro: "Vast distances, long supply lines, and an approaching winter turn a massive eastern march into a historic turning point."
        },
        de: {
          title: "Kapitel 5: Der weite Marsch nach Osten",
          badge: "1812",
          intro: "Riesige Entfernungen, lange Nachschubwege und ein nahender Winter machen den Marsch nach Osten zum historischen Wendepunkt."
        },
        steps: [
          {
            type: "map",
            targetId: "643",
            en: {
              q: "Click the vast country spanning eastern Europe and northern Asia that Napoleon invaded in 1812.",
              storyInfo: "Unlike compact European battlefields, Russia's vast distances stretched lines of communication hundreds of miles from friendly bases. Every extra week of march meant more horses lost, fewer supplies, and longer paths back."
            },
            de: {
              q: "Klicke das riesige Land zwischen Osteuropa und Nordasien an, in das Napoleon 1812 zog.",
              storyInfo: "Anders als auf engeren europäischen Kriegsschauplätzen zogen sich die Wege in Russland über gewaltige Entfernungen hin. Jeder zusätzliche Marschtag vergrößerte Nachschubprobleme und Erschöpfung."
            }
          },
          {
            type: "year_slider",
            min: 1805,
            max: 1820,
            targetYear: 1812,
            tolerance: 1,
            en: {
              q: "In which year did Napoleon invade Russia?",
              storyInfo: "In June 1812 Napoleon crossed into Russia with a massive force drawn from France and allied states—starting a campaign that would mark a decisive turning point in European history."
            },
            de: {
              q: "In welchem Jahr begann Napoleons Feldzug nach Russland?",
              storyInfo: "Im Juni 1812 überschritt Napoleon mit einem riesigen Heer aus französischen und verbündeten Truppen die Grenze nach Russland – der Beginn eines Feldzugs, der zum Wendepunkt wurde."
            }
          },
          {
            type: "choice",
            en: {
              q: "Which major city did Napoleon enter in September 1812 before starting the retreat west?",
              options: ["Moscow", "Madrid", "Rome", "Lisbon"],
              storyInfo: "In September 1812 Napoleon entered Moscow after hard marching and heavy fighting, hoping the capture of the historic city would compel peace talks."
            },
            de: {
              q: "Welche Stadt erreichte Napoleon im September 1812, bevor der Rückzug nach Westen begann?",
              options: ["Moskau", "Madrid", "Rom", "Lissabon"],
              storyInfo: "Im September 1812 rückte Napoleon in Moskau ein – in der Hoffnung, die Einnahme der Stadt werde den Gegner zu Verhandlungen bewegen."
            },
            answer: 0
          },
          {
            type: "graphic_pick",
            graphicId: "moscow_retreat_route",
            correctKey: "deep_winter_return",
            en: {
              q: "Click the route phase on the graphic where harsh winter weather and scarce supplies hit hardest.",
              storyInfo: "With much of Moscow devastated by fire, no quick peace deal emerging, and winter setting in along a depleted route, the return march in late 1812 became a severe ordeal."
            },
            de: {
              q: "Klicke in der Grafik auf den Streckenabschnitt, auf dem Winterkälte und Versorgungsnot besonders hart trafen.",
              storyInfo: "Ohne schnellen Friedensschluss, mit großen Zerstörungen und bei herannahendem Winter wurde der Rückmarsch Ende 1812 zu einer schweren Prüfung."
            }
          },
          {
            type: "decision",
            en: {
              q: "Retreat Choice (Autumn 1812): Marching back across depleted lands in cold weather brings severe strain. What happens on the return?",
              choices: [
                { label: "Severe losses from cold, hunger, and harassment along the route", good: true, note: "Winter cold, scarce provisions, and attacks on weakened columns caused massive losses." },
                { label: "A warm tropical breeze carries the army home effortlessly", good: false, note: "Autumn and winter conditions along the retreat route were harsh and unforgiving." }
              ],
              storyInfo: "Only a fraction of the original force emerged from the 1812 campaign. Encouraged by this setback, rival powers regrouped into a broad coalition against Napoleon."
            },
            de: {
              q: "Rückzugs-Wahl (Herbst 1812): Auf dem Rückmarsch aus dem Landesinneren droht Kälte bei knappen Vorräten. Was prägt den Weg?",
              choices: [
                { label: "Schwere Verluste durch Kälte, Hunger und Angriffe auf Nachzügler", good: true, note: "Kälte, Versorgungsnot und ständige Belastungen ließen das Heer stark zusammenschrumpfen." },
                { label: "Milde Frühlingstemperaturen und volle Vorratslager unterwegs", good: false, note: "Auf dem Rückzug im Spätherbst und Winter herrschten Kälte und Knappheit." }
              ],
              storyInfo: "Nur ein kleiner Teil des ursprünglichen Heeres überstand den Feldzug von 1812. Die schwere Schwächung ermutigte andere Mächte, sich zu einer neuen großen Koalition zusammenzuschließen."
            }
          }
        ]
      },
      {
        id: "nap_ch6",
        num: 6,
        sceneKey: "endgame",
        en: {
          title: "Chapter 6: Return, Waterloo & Final Exile",
          badge: "1814–1821",
          intro: "Exile on Elba, a dramatic return for the Hundred Days, a decisive clash in 1815, and final exile across the ocean."
        },
        de: {
          title: "Kapitel 6: Rückkehr, Waterloo & Verbannung",
          badge: "1814–1821",
          intro: "Elba, die überraschende Rückkehr der Hundert Tage, die Entscheidung 1815 und das ferne Exil über dem Ozean."
        },
        steps: [
          {
            type: "choice",
            en: {
              q: "To which Mediterranean island was Napoleon first exiled after his abdication in 1814?",
              options: ["Elba", "Iceland", "Greenland", "Madagascar"],
              storyInfo: "After allied forces pushed into France in 1814, Napoleon abdicated for the first time and was sent to Elba—a small Mediterranean island off Tuscany where he retained a miniature court and title."
            },
            de: {
              q: "Auf welche Mittelmeerinsel wurde Napoleon nach seiner ersten Abdankung 1814 verbannt?",
              options: ["Elba", "Island", "Grönland", "Madagaskar"],
              storyInfo: "Nach dem Einmarsch der Verbündeten dankte Napoleon 1814 erstmals ab und ging auf die Insel Elba vor der Küste der Toskana – wo er einen kleinen Hofstaat behielt, aber nicht dauerhaft bleiben wollte."
            },
            answer: 0
          },
          {
            type: "graphic_pick",
            graphicId: "waterloo_endgame",
            correctKey: "waterloo_point",
            en: {
              q: "Click the location in the graphic marking the decisive June 1815 battle that ended the Hundred Days.",
              storyInfo: "Returning from Elba in early 1815, Napoleon sparked the Hundred Days—only to face a decisive defeat at Waterloo in June 1815."
            },
            de: {
              q: "Klicke in der Grafik auf den Punkt, der im Juni 1815 das Ende der Hundert Tage markierte.",
              storyInfo: "Nach der Rückkehr von Elba Anfang 1815 folgten die Hundert Tage – bis die Schlacht bei Waterloo im Juni 1815 die Wende brachte."
            }
          },
          {
            type: "year_slider",
            min: 1805,
            max: 1825,
            targetYear: 1815,
            tolerance: 1,
            en: {
              q: "In which year did the Hundred Days end with the Battle of Waterloo?",
              storyInfo: "In June 1815 defeat at Waterloo ended Napoleon's brief return to power and led to his second abdication—closing the dramatic chapter of the Hundred Days."
            },
            de: {
              q: "In welchem Jahr endeten die Hundert Tage mit der Schlacht bei Waterloo?",
              storyInfo: "Im Juni 1815 beendete die Niederlage bei Waterloo Napoleons erneute Machtübernahme und führte zur zweiten Abdankung – das Ende der Hundert Tage."
            }
          },
          {
            type: "choice",
            en: {
              q: "On which remote South Atlantic island did Napoleon spend his final years until 1821?",
              options: ["Saint Helena", "Corsica", "Sicily", "Ibiza"],
              storyInfo: "To prevent any further return to Europe, the victors sent Napoleon to remote Saint Helena in the South Atlantic. There he dictated memoirs and reflections until his death in May 1821."
            },
            de: {
              q: "Auf welcher abgelegenen Südatlantik-Insel verbrachte Napoleon seine letzten Jahre bis 1821?",
              options: ["St. Helena", "Korsika", "Sizilien", "Ibiza"],
              storyInfo: "Um eine erneute Rückkehr nach Europa auszuschließen, wurde Napoleon auf die weit entfernte Insel St. Helena im Südatlantik gebracht. Dort diktierte er Erinnerungen und starb im Mai 1821."
            },
            answer: 0
          },
          {
            type: "order",
            en: {
              q: "Put these final chapters of Napoleon's life in order from earliest (1) to latest (3):",
              items: [
                "First abdication and exile to Elba (1814)",
                "Battle of Waterloo (1815)",
                "Death in exile on Saint Helena (1821)"
              ],
              storyInfo: "From Elba (1814) to Waterloo (1815) and Saint Helena (1821): Napoleon's rise and fall reshaped laws, borders, and modern warfare across Europe."
            },
            de: {
              q: "Bringe diese letzten Stationen von früh (1) nach spät (3) in die richtige Reihenfolge:",
              items: [
                "Erste Abdankung und Verbannung nach Elba (1814)",
                "Schlacht bei Waterloo (1815)",
                "Tod im Exil auf St. Helena (1821)"
              ],
              storyInfo: "Von Elba (1814) über Waterloo (1815) bis St. Helena (1821): Napoleons Aufstieg und Fall veränderten Gesetze, Grenzen und Kriegsführung in Europa nachhaltig."
            },
            correctOrder: [0, 1, 2]
          }
        ]
      }
    ]
  },
  {
    id: "rome",
    icon: "🏛️",
    en: {
      title: "Ancient Rome: Republic to Empire",
      subtitle: "5 chapters · 25 challenges. Seven hills, Mediterranean rivals, Julius Caesar, imperial expansion, and frontier limits."
    },
    de: {
      title: "Antikes Rom: Von der Republik zum Weltreich",
      subtitle: "5 Kapitel · 25 Aufgaben. Tiber & sieben Hügel, Mittelmeer-Rivalen, Caesar, Kaiserzeit und Reichsgrenzen."
    },
    chapters: [
      {
        id: "rome_ch1",
        num: 1,
        sceneKey: "italy_egypt",
        en: { title: "Chapter 1: Tiber, Seven Hills & Republic", badge: "753–264 BCE" },
        de: { title: "Kapitel 1: Tiber, Hügel & Republik", badge: "753–264 v. Chr." },
        steps: [
          {
            type: "map",
            targetId: "380",
            en: {
              q: "Click the Mediterranean peninsula on the map where Rome grew along the Tiber River.",
              storyInfo: "Rome began as a settlement near a river crossing on the Tiber in central Italy. Its fertile surroundings and crossroads position helped the early city grow into a dominant power in Latium and beyond."
            },
            de: {
              q: "Klicke auf der Karte die Halbinsel an, auf der Rom am Tiber wuchs.",
              storyInfo: "Rom entstand an einem günstigen Flussübergang am Tiber in Mittelitalien. Von dort dehnte die Stadt ihren Einfluss schrittweise über Mittel- und Süditalien aus."
            }
          },
          {
            type: "choice",
            en: {
              q: "What political form replaced monarchy in Rome around 509 BCE?",
              options: ["A republic with elected magistrates and assemblies", "A direct democracy of all inhabitants", "A hereditary pharaoh rule", "A city-state ruled only by merchants"],
              storyInfo: "After expelling its last kings, Rome established a republic with shared magistracies, the Senate, and citizen assemblies—creating a system of checks and rivalries among elite families."
            },
            de: {
              q: "Welche Staatsform löste in Rom um 509 v. Chr. das Königtum ab?",
              options: ["Eine Republik mit gewählten Ämtern und Senat", "Eine direkte Demokratie aller Einwohner", "Eine Pharaonenherrschaft", "Eine reine Kaufmannsgilde"],
              storyInfo: "Nach dem Ende des Königtums bildete Rom eine Republik mit Ämtern auf Zeit, Senat und Volksversammlungen – ein System, das innere Machtkämpfe aber nicht dauerhaft verhinderte."
            },
            answer: 0
          },
          {
            type: "year_slider",
            min: 800,
            max: 400,
            targetYear: 509,
            tolerance: 25,
            en: {
              q: "In ancient BCE years, around which year was the Roman Republic traditionally founded?",
              storyInfo: "Traditional Roman chronology places the founding of the Republic around 509 BCE, marking a key turning point in Rome's political identity."
            },
            de: {
              q: "In Jahren v. Chr. (auf dem Regler als Zahl): Um welches Jahr wurde der Römischen Tradition nach die Republik gegründet?",
              storyInfo: "Die römische Überlieferung datiert den Beginn der Republik um 509 v. Chr. – ein wichtiger Meilenstein in Roms politischer Geschichte."
            }
          },
          {
            type: "choice",
            en: {
              q: "Why were roads and bridges vital to Rome's expansion across Italy?",
              options: ["They enabled fast movement of troops, messengers, and trade", "They were used solely for chariot races", "They blocked foreign merchants", "They replaced all ships"],
              storyInfo: "Roman roads linked Rome with colonies and garrisons across Italy, letting armies march reliably in different seasons and helping tie conquered regions into Rome's network."
            },
            de: {
              q: "Warum waren Straßen und Brücken für Roms Aufstieg in Italien so wichtig?",
              options: ["Sie ermöglichten schnelle Märsche, Boten und Handel", "Sie dienten nur Wagenrennen", "Sie sperrten jeden Handel aus", "Sie ersetzten jede Seefahrt"],
              storyInfo: "Fest gebaute Straßen verbanden Rom mit Stützpunkten und Städten in ganz Italien – für Truppen, Boten und Handel ein gewaltiger Vorteil."
            },
            answer: 0
          },
          {
            type: "decision",
            en: {
              q: "Alliance Choice in Italy: You defeat a neighboring town. What builds long-term stability?",
              choices: [
                { label: "Offer structured treaties or rights that bind elites to Rome", good: true, note: "Integrating allies through treaties and local autonomy often turned former rivals into partners." },
                { label: "Burn every farm and leave zero administrative ties", good: false, note: "Pure destruction without governance often fuels ongoing rebellion." }
              ],
              storyInfo: "Combining military strength with flexible alliances and treaties allowed Rome to mobilize large manpower pools across Italy—essential for the Mediterranean wars ahead."
            },
            de: {
              q: "Bündnis-Wahl in Italien: Nach einem Sieg über Nachbarn – was schafft dauerhafte Stabilität?",
              choices: [
                { label: "Verträge und abgestufte Rechte anbieten, die Partner an Rom binden", good: true, note: "Durch Bündnisse und Rechte band Rom viele Städte an sich und gewann Verbündete." },
                { label: "Alles niederbrennen und jede Ordnung auflösen", good: false, note: "Bloße Zerstörung ohne verlässliche Ordnung führt leicht zu neuen Aufständen." }
              ],
              storyInfo: "Die Mischung aus militärischer Härte und Bündnispolitik verschaffte Rom große Truppenreserven in Italien – die Grundlage für den Ausgriff übers Mittelmeer."
            }
          }
        ]
      },
      {
        id: "rome_ch2",
        num: 2,
        sceneKey: "blockade",
        en: { title: "Chapter 2: Rivals Across the Sea", badge: "264–146 BCE" },
        de: { title: "Kapitel 2: Rivalen am Mittelmeer", badge: "264–146 v. Chr." },
        steps: [
          {
            type: "choice",
            en: {
              q: "Which North African maritime power clashed with Rome in three major Punic Wars?",
              options: ["Carthage", "Babylon", "Persia", "Syracuse"],
              storyInfo: "Carthage, near modern Tunis, commanded a powerful navy and trade network across the western Mediterranean. Clashes over Sicily and sea lanes sparked the Punic Wars."
            },
            de: {
              q: "Welche nordafrikanische Seemacht lieferte sich mit Rom die drei Punischen Kriege?",
              options: ["Karthago", "Babylon", "Persien", "Syrakus"],
              storyInfo: "Karthago im heutigen Tunesien verfügte über eine starke Flotte und ein weitgespanntes Handelsnetz im westlichen Mittelmeer. Der Streit um Einfluss und Seewege löste die Punischen Kriege aus."
            },
            answer: 0
          },
          {
            type: "choice",
            en: {
              q: "How did Rome adapt when facing experienced sea powers despite starting with less naval tradition?",
              options: ["Building large fleets and using boarding bridges (corvus)", "Fighting sea battles on horseback", "Abandoning the Mediterranean", "Relying on weather spells"],
              storyInfo: "Rome built up fleets at scale and adapted naval tactics—such as boarding mechanisms—to turn sea encounters closer to boarding actions where Roman infantry excelled."
            },
            de: {
              q: "Wie begegnete Rom erfahrenen Seemächten trotz geringerer maritimer Tradition?",
              options: ["Durch Flottenbau im großen Stil und Entertechniken", "Durch Kavallerie auf dem Meer", "Durch Rückzug vom Meer", "Durch Verzicht auf Schiffe"],
              storyInfo: "Rom baute rasch große Flotten und nutzte Entertechniken, um Kämpfe auf See stärker an den Nahkampf anzunähern, in dem römische Soldaten stark waren."
            },
            answer: 0
          },
          {
            type: "map",
            targetId: "724",
            en: {
              q: "Click the Iberian peninsula country on the map that became a major theater during the Second Punic War.",
              storyInfo: "Iberia (modern Spain and Portugal) provided silver, recruits, and strategic bases during the struggle between Rome and Carthage—and saw major campaigns by both sides."
            },
            de: {
              q: "Klicke auf der Karte das Land auf der Iberischen Halbinsel an, das im Zweiten Punischen Krieg ein wichtiger Schauplatz war.",
              storyInfo: "Die Iberische Halbinsel (heutiges Spanien und Portugal) lieferte Silber und Truppen und war Schauplatz entscheidender Kämpfe zwischen Rom und Karthago."
            }
          },
          {
            type: "order",
            en: {
              q: "Order these Roman expansion phases from earliest (1) to latest (3):",
              items: [
                "Dominance across peninsular Italy",
                "Wars with Carthage across the western Mediterranean",
                "Expansion into Greece and the eastern Mediterranean"
              ],
              storyInfo: "First securing Italy, then contesting the western Mediterranean against Carthage, and then projecting power into Greece and the eastern Mediterranean: Rome's horizon expanded step by step."
            },
            de: {
              q: "Bringe diese Phasen römischer Expansion von früh (1) nach spät (3):",
              items: [
                "Vorherrschaft in Italien",
                "Kriege gegen Karthago im westlichen Mittelmeer",
                "Ausgriff nach Griechenland und ins östliche Mittelmeer"
              ],
              storyInfo: "Erst die Basis in Italien, dann der Zweikampf mit Karthago im Westen und schließlich der Ausgriff nach Griechenland und in den Osten: Roms Machtbereich wuchs in Etappen."
            },
            correctOrder: [0, 1, 2]
          },
          {
            type: "decision",
            en: {
              q: "Campaign Choice: Crossing high mountains toward Italy tests pack animals and supply. What matters most?",
              choices: [
                { label: "Careful timing, warm gear, and managing steep passes", good: true, note: "Mountain crossings punish poor preparation, cold weather, and lost pack animals." },
                { label: "Ignoring weather and terrain completely", good: false, note: "High mountain passes impose strict limits on speed and survival." }
              ],
              storyInfo: "Crossing the Alps into Italy during the Second Punic War remains one of antiquity's most famous daring marches—even though harsh conditions took a heavy toll."
            },
            de: {
              q: "Feldzug-Wahl: Ein Marsch über hohe Gebirgspässe nach Italien – worauf kommt es an?",
              choices: [
                { label: "Passende Jahreszeit, Ausrüstung und vorsichtige Führung an Steilhängen", good: true, note: "Gebirgsmärsche fordern Wetterglück, Vorbereitung und sichere Wegführung." },
                { label: "Gelände und Wetter vollständig ignorieren", good: false, note: "Hohe Pässe verzeihen mangelnde Vorbereitung kaum." }
              ],
              storyInfo: "Der Alpenübergang im Zweiten Punischen Krieg gilt als einer der kühnsten Märsche der Antike – kostete aber auch viele Menschen und Tiere."
            }
          }
        ]
      },
      {
        id: "rome_ch3",
        num: 3,
        sceneKey: "corsica",
        en: { title: "Chapter 3: Civil Strife & Julius Caesar", badge: "133–44 BCE" },
        de: { title: "Kapitel 3: Bürgerkriege & Julius Caesar", badge: "133–44 v. Chr." },
        steps: [
          {
            type: "choice",
            en: {
              q: "What deep strain weakened the late Roman Republic alongside overseas wealth?",
              options: ["Rivalries among powerful generals, land inequality, and political violence", "Complete lack of any trade", "Absence of any military", "Total isolation from neighboring lands"],
              storyInfo: "Huge wealth and provinces poured into Rome, yet land pressures, ambitious generals backed by loyal armies, and fierce political feuds strained republican institutions to breaking point."
            },
            de: {
              q: "Welche Spannungen belasteten die späte Römische Republik trotz großem Reichtum?",
              options: ["Machtkämpfe ehrgeiziger Feldherren, soziale Konflikte und Gewalt", "Komplettes Fehlen von Handel", "Kein Militär im Staat", "Völlige Abgeschiedenheit"],
              storyInfo: "Trotz gewaltiger Beute und neuer Provinzen wuchsen soziale Spannungen und die Macht einzelner Feldherren – die Republik geriet in schwere Krisen und Bürgerkriege."
            },
            answer: 0
          },
          {
            type: "map",
            targetId: "250",
            en: {
              q: "Click the country on the map corresponding to much of Gaul, where Julius Caesar fought major campaigns.",
              storyInfo: "Caesar's campaigns in Gaul (largely modern France and neighboring areas) brought fame, wealth, and a battle-hardened army loyal to him—shifting the balance of power in Rome."
            },
            de: {
              q: "Klicke auf der Karte das Land an, das weite Teile Galliens umfasst, wo Caesar lange Feldzüge führte.",
              storyInfo: "In Gallien (im Wesentlichen dem heutigen Frankreich und Nachbargebieten) errang Caesar Ruhm, Reichtum und ein schlagkräftiges Heer – was sein Gewicht in Rom enorm steigerte."
            }
          },
          {
            type: "year_slider",
            min: 80,
            max: 1,
            targetYear: 44,
            tolerance: 4,
            en: {
              q: "In BCE years, around which year was Julius Caesar assassinated in Rome?",
              storyInfo: "Caesar's growing concentration of power—including becoming dictator for life—alarmed senators who assassinated him in 44 BCE, triggering further civil wars rather than restoring old stability."
            },
            de: {
              q: "In Jahren v. Chr.: Um welches Jahr wurde Julius Caesar in Rom ermordet?",
              storyInfo: "Nach seiner Ernennung zum Diktator auf Lebenszeit fürchteten Gegner das Ende der Republik und ermordeten Caesar 44 v. Chr. – doch der Frieden kehrte dadurch nicht sofort ein."
            }
          },
          {
            type: "choice",
            en: {
              q: "Which calendar reform is closely linked to Julius Caesar?",
              options: ["The Julian calendar", "The lunar Mayan calendar", "The Islamic Hijri calendar", "The decimal ten-month clock"],
              storyInfo: "To bring Rome's calendar closer to the solar year, Caesar introduced the Julian calendar in 45 BCE—forming the basis of European timekeeping for centuries."
            },
            de: {
              q: "Welche Kalenderreform ist eng mit Julius Caesar verbunden?",
              options: ["Der Julianische Kalender", "Der Maya-Kalender", "Der islamische Kalender", "Ein Zehnstunden-Tag"],
              storyInfo: "Um den Kalender wieder an den Sonnenlauf anzupassen, führte Caesar 45 v. Chr. den Julianischen Kalender ein – die Grundlage für die Zeitrechnung in Europa über viele Jahrhunderte."
            },
            answer: 0
          },
          {
            type: "decision",
            en: {
              q: "Political Choice after Civil War: How do you stabilize a fractured state without endless revenge?",
              choices: [
                { label: "Combine firm authority with amnesty/integration for key rivals", good: true, note: "Measured clemency and institutional stability helped calm bitter factions." },
                { label: "Execute every opponent without rebuilding institutions", good: false, note: "Endless executions breed fear and new conspiracies." }
              ],
              storyInfo: "After Caesar's death and another round of civil war, Octavian (Augustus) emerged as sole ruler—opening a new era: the Roman Principate / Empire."
            },
            de: {
              q: "Politische Wahl nach dem Bürgerkrieg: Wie beruhigt man ein zerrissenes Land?",
              choices: [
                { label: "Klare Autorität mit Milde und Einbindung früherer Gegner verbinden", good: true, note: "Milde gegenüber vielen Gegnern und geordnete Strukturen halfen, die Lage zu stabilisieren." },
                { label: "Jeden Gegner verfolgen, ohne die Ordnung zu festigen", good: false, note: "Pauschale Vergeltung schürt neue Feindschaften und Verschwörungen." }
              ],
              storyInfo: "Nach weiteren Bürgerkriegen setzte sich Octavian (der spätere Augustus) durch – damit begann die römische Kaiserzeit."
            }
          }
        ]
      },
      {
        id: "rome_ch4",
        num: 4,
        sceneKey: "empire",
        en: { title: "Chapter 4: Augustus, Pax Romana & Empire", badge: "27 BCE–180 CE" },
        de: { title: "Kapitel 4: Augustus, Pax Romana & Kaiserzeit", badge: "27 v. Chr.–180 n. Chr." },
        steps: [
          {
            type: "choice",
            en: {
              q: "Which honorific title was granted to Octavian in 27 BCE as Rome's first emperor?",
              options: ["Augustus", "Consul of Carthage", "Sultan", "Doges"],
              storyInfo: "In 27 BCE Octavian received the title 'Augustus'. Carefully presenting himself as 'first citizen' (princeps) rather than a traditional king, he laid the foundations of imperial rule."
            },
            de: {
              q: "Welcher Ehrenname wurde Octavian 27 v. Chr. als erstem römischen Kaiser verliehen?",
              options: ["Augustus", "Konsul von Karthago", "Sultan", "Doge"],
              storyInfo: "27 v. Chr. erhielt Octavian den Namen 'Augustus'. Geschickt trat er als 'erster Bürger' (Princeps) auf und legte so den Grundstein für die Kaiserzeit."
            },
            answer: 0
          },
          {
            type: "choice",
            en: {
              q: "What is commonly meant by the 'Pax Romana'?",
              options: ["A long period of relative internal stability across the empire", "A peace treaty with Mars", "A ban on all building projects", "The end of trade in the Mediterranean"],
              storyInfo: "During the first two centuries CE, the Mediterranean basin saw long stretches of relative stability, lively trade, monumental architecture, and cultural exchange—despite frontier wars."
            },
            de: {
              q: "Was bezeichnet man meist als 'Pax Romana'?",
              options: ["Eine längere Phase relativer Stabilität im Reichsinneren", "Einen Friedensvertrag mit Karthago", "Ein Verbot aller Bauwerke", "Das Ende des Handels"],
              storyInfo: "In den ersten beiden Jahrhunderten n. Chr. herrschte im Inneren des Reiches oft relative Ruhe – Handel, Städtebau und Kultur blühten, auch wenn an den Grenzen gekämpft wurde."
            },
            answer: 0
          },
          {
            type: "map",
            targetId: "818",
            en: {
              q: "Click the grain-rich Nile country on the map that became a crucial imperial province of Rome.",
              storyInfo: "Egypt's rich grain harvests along the Nile helped feed Rome and played a major economic and strategic role in the Roman Empire."
            },
            de: {
              q: "Klicke auf der Karte das getreidereiche Land am Nil an, das eine wichtige römische Provinz wurde.",
              storyInfo: "Die reichen Getreideernten am Nil waren für die Versorgung Roms enorm wichtig und machten Ägypten zu einer Schlüsselprovinz."
            }
          },
          {
            type: "choice",
            en: {
              q: "Which engineering feat carried fresh water over valleys into Roman towns and baths?",
              options: ["Aqueducts", "Windmills", "Submarines", "Suspension bridges made of rope"],
              storyInfo: "Using gravity, stone channels, and arched bridges, Roman aqueducts supplied cities with water for fountains, households, and public baths."
            },
            de: {
              q: "Welches Bauwerk brachte frisches Wasser über Täler in römische Städte und Thermen?",
              options: ["Aquädukte", "Windräder", "U-Boote", "Hängebrücken aus Seilen"],
              storyInfo: "Mit genauem Gefälle, Leitungen und Bogenbrücken versorgten Aquädukte Städte mit Wasser für Brunnen, Haushalte und Thermen."
            },
            answer: 0
          },
          {
            type: "decision",
            en: {
              q: "City Management Choice: A growing city needs clean water and public spaces. What helps most?",
              choices: [
                { label: "Invest in aqueducts, drainage, and public infrastructure", good: true, note: "Reliable water and sanitation supported urban growth and public life." },
                { label: "Ignore water supply completely as cities expand", good: false, note: "Large cities quickly face shortages and hygiene problems without water systems." }
              ],
              storyInfo: "Urban planning, amphitheaters, forums, and bath complexes became hallmarks of Roman cities from Britain to North Africa and the Levant."
            },
            de: {
              q: "Stadt-Wahl: Eine wachsende Stadt braucht sauberes Wasser und öffentliche Anlagen. Was hilft?",
              choices: [
                { label: "In Aquädukte, Entwässerung und Infrastruktur investieren", good: true, note: "Wasserleitungen und geordnete Infrastruktur stützten das Wachstum der Städte." },
                { label: "Die Wasserversorgung bei starkem Wachstum vernachlässigen", good: false, note: "Ohne Wasserversorgung geraten große Städte rasch in Schwierigkeiten." }
              ],
              storyInfo: "Foren, Theater, Thermen und Wasserleitungen prägten römische Städte von Britannien bis Nordafrika und in den Osten."
            }
          }
        ]
      },
      {
        id: "rome_ch5",
        num: 5,
        sceneKey: "endgame",
        en: { title: "Chapter 5: Frontiers, Division & Legacy", badge: "180–476 CE" },
        de: { title: "Kapitel 5: Grenzen, Teilung & Erbe", badge: "180–476 n. Chr." },
        steps: [
          {
            type: "choice",
            en: {
              q: "What challenge grew harder as the Roman Empire stretched from northern Britain to Mesopotamia?",
              options: ["Defending long borders, funding armies, and managing succession", "Running out of land to cross in the Sahara", "Having no neighbors anywhere", "Having zero taxes or soldiers"],
              storyInfo: "Vast borders required huge military spending, while economic pressures, inflation, and disputes over imperial succession repeatedly tested the empire's unity."
            },
            de: {
              q: "Welche Herausforderung wuchs, als das Reich sich von Britannien bis in den Nahen Osten erstreckte?",
              options: ["Lange Grenzen sichern, Heer finanzieren und Thronfolge regeln", "Zu wenig Wüste im Süden", "Keine Nachbarn an den Grenzen", "Keine Steuern oder Truppen"],
              storyInfo: "Lange Grenzen erforderten ein großes Heer und hohe Kosten – zugleich belasteten Krisen, Geldentwertung und Thronstreitigkeiten das Reich."
            },
            answer: 0
          },
          {
            type: "choice",
            en: {
              q: "How did later emperors like Diocletian and Constantine try to make administration more manageable?",
              options: ["Dividing administrative duties and establishing Constantinople", "Moving the capital to the Moon", "Abolishing all provinces and laws", "Closing all roads"],
              storyInfo: "Sharing administrative rule and shifting the eastern imperial center to Constantinople helped organize governance, even as the Western Roman Empire faced mounting pressures."
            },
            de: {
              q: "Wie versuchten Kaiser wie Diokletian und Konstantin, die Verwaltung zu erleichtern?",
              options: ["Durch Aufteilung der Verwaltung und Konstantinopel als Zentrum", "Durch Verlegung nach Amerika", "Durch Abschaffung aller Gesetze", "Durch Sperrung aller Straßen"],
              storyInfo: "Geteilte Verwaltungsbereiche und Konstantinopel als neues Zentrum im Osten sollten das riesige Reich besser steuerbar machen."
            },
            answer: 0
          },
          {
            type: "year_slider",
            min: 300,
            max: 600,
            targetYear: 476,
            tolerance: 15,
            en: {
              q: "Around which year CE is the traditional end date of the Western Roman Empire?",
              storyInfo: "476 CE is traditionally marked as the end of the Western Roman Empire, while the Eastern Roman (Byzantine) Empire continued for another millennium."
            },
            de: {
              q: "Um welches Jahr n. Chr. setzt man traditionell das Ende des Weströmischen Reiches an?",
              storyInfo: "476 n. Chr. gilt traditionell als Ende Westroms – während das Oströmische (Byzantinische) Reich noch rund tausend Jahre weiterbestand."
            }
          },
          {
            type: "map",
            targetId: "300",
            en: {
              q: "Click the country on the map associated with classical Greece, whose culture deeply influenced Rome.",
              storyInfo: "From art, literature, and philosophy to theater and urban ideas, Greek heritage shaped Roman culture—and later flowed into European traditions."
            },
            de: {
              q: "Klicke auf der Karte das Land an, das mit dem antiken Griechenland verbunden ist, dessen Kultur Rom stark prägte.",
              storyInfo: "Kunst, Literatur, Philosophie und Bauformen Griechenlands beeinflussten Rom tiefgreifend und wirkten über Rom weiter in Europa."
            }
          },
          {
            type: "order",
            en: {
              q: "Order these Roman milestones from earliest (1) to latest (3):",
              items: [
                "Founding of the Roman Republic (traditionally 509 BCE)",
                "Augustus becomes first emperor (27 BCE)",
                "Traditional end of the Western Roman Empire (476 CE)"
              ],
              storyInfo: "Republic (509 BCE) → Augustus & Imperial era (27 BCE) → Traditional end of Western Rome (476 CE): a span of nearly a millennium of history."
            },
            de: {
              q: "Ordne diese Meilensteine von früh (1) nach spät (3):",
              items: [
                "Gründung der Römischen Republik (traditionell 509 v. Chr.)",
                "Augustus wird erster Kaiser (27 v. Chr.)",
                "Traditionelles Ende Westroms (476 n. Chr.)"
              ],
              storyInfo: "Republik (509 v. Chr.) → Augustus & Kaiserzeit (27 v. Chr.) → Traditionelles Ende Westroms (476 n. Chr.) – fast ein Jahrtausend Geschichte."
            },
            correctOrder: [0, 1, 2]
          }
        ]
      }
    ]
  },
  {
    id: "explorers",
    icon: "🧭",
    en: {
      title: "Age of Discovery: Oceans & Maps",
      subtitle: "5 chapters · 25 challenges. Maritime trade, winds & currents, circumnavigation, mapmaking, and global connections."
    },
    de: {
      title: "Zeitalter der Entdecker: Ozeane & Karten",
      subtitle: "5 Kapitel · 25 Aufgaben. Seewege, Winde & Strömungen, Weltumsegelung, Kartografie und weltweite Kontakte."
    },
    chapters: [
      {
        id: "exp_ch1",
        num: 1,
        sceneKey: "italy_egypt",
        en: { title: "Chapter 1: Spice Routes & Atlantic Coasts", badge: "1415–1488" },
        de: { title: "Kapitel 1: Gewürzrouten & Atlantikküste", badge: "1415–1488" },
        steps: [
          {
            type: "choice",
            en: {
              q: "What main incentive drove European mariners to search for direct sea routes to Asia's spice markets?",
              options: ["High profits from spices and silk and bypassing long overland intermediaries", "Searching for icebergs in the Sahara", "Avoiding all ocean trade", "Looking for empty oceans with no ports"],
              storyInfo: "Spices like pepper, cloves, and cinnamon fetched high prices in Europe. Finding direct sea routes promised major profits and new strategic links."
            },
            de: {
              q: "Welcher Hauptantrieb ließ Seefahrer nach direkten Seewegen zu den Gewürzmärkten Asiens suchen?",
              options: ["Hohe Gewinne mit Gewürzen und Umgehung langer Zwischenwege", "Suche nach Eisbergen in der Sahara", "Verzicht auf jeden Seehandel", "Suche nach leeren Meeren ohne Häfen"],
              storyInfo: "Gewürze wie Pfeffer, Nelken oder Zimt waren in Europa wertvoll. Direkte Seewege versprachen großen Gewinn und neue Handelsverbindungen."
            },
            answer: 0
          },
          {
            type: "map",
            targetId: "620",
            en: {
              q: "Click the Atlantic-facing country on the western Iberian coast that pioneered early African coastal voyages.",
              storyInfo: "Positioned on the western edge of Iberia facing the Atlantic, Portugal pushed steadily down the West African coast in the 15th century, testing winds, currents, and new ship designs."
            },
            de: {
              q: "Klicke auf der Karte das Land an der westlichen Atlantikküste Iberiens, das früh Richtung Afrika vorstieß.",
              storyInfo: "An der Atlantikküste im Westen der Iberischen Halbinsel gelegen, erkundete Portugal im 15. Jahrhundert schrittweise die Küste Westafrikas."
            }
          },
          {
            type: "choice",
            en: {
              q: "Which ship design helped sailors tack against winds and handle ocean swells better than heavy medieval cogs?",
              options: ["The caravel", "A wooden raft with oars only", "A Roman galley with square sails alone", "A hot-air balloon"],
              storyInfo: "Caravels combined agile handling, shallow draft for coastal exploration, and lateen/square sails that helped crews navigate shifting Atlantic winds."
            },
            de: {
              q: "Welcher Schiffstyp half Seeleuten, mit Winden und Dünung auf dem Atlantik besser klarzukommen?",
              options: ["Die Karavelle", "Ein reines Ruderfloß", "Ein Heißluftballon", "Ein U-Boot"],
              storyInfo: "Karavellen waren wendig, hatten einen vergleichsweise geringen Tiefgang für Küstengewässer und ließen sich gut an wechselnde Winde anpassen."
            },
            answer: 0
          },
          {
            type: "year_slider",
            min: 1450,
            max: 1520,
            targetYear: 1488,
            tolerance: 4,
            en: {
              q: "Around which year did Bartolomeu Dias round the southern tip of Africa (Cape of Good Hope)?",
              storyInfo: "Rounding southern Africa around 1488 proved that the Atlantic connected with the Indian Ocean—opening the sea path toward South and East Asia."
            },
            de: {
              q: "Um welches Jahr umsegelte Bartolomeu Dias die Südspitze Afrikas (Kap der Guten Hoffnung)?",
              storyInfo: "Die Umrundung der Südspitze Afrikas um 1488 zeigte, dass Atlantik und Indischer Ozean verbunden sind – der Seeweg nach Asien war greifbar."
            }
          },
          {
            type: "decision",
            en: {
              q: "Navigation Choice: Returning south along the West African coast, headwinds push against you. What works best?",
              choices: [
                { label: "Swing wider out into the Atlantic ('volta do mar') to catch favorable winds", good: true, note: "Sweeping out into the open Atlantic to catch favorable winds became a key navigation technique." },
                { label: "Row straight into strong headwinds for weeks without adjusting course", good: false, note: "Fighting strong headwinds directly wastes time, energy, and supplies." }
              ],
              storyInfo: "Mastering wind belts and ocean currents—such as the 'volta do mar'—turned risky coastal hops into dependable ocean navigation."
            },
            de: {
              q: "Navigations-Wahl: Auf der Rückfahrt an der Küste drücken Gegenwinde. Was hilft?",
              choices: [
                { label: "Weiter in den offenen Atlantik ausholen ('Volta do Mar'), um günstige Winde zu nutzen", good: true, note: "Der weite Bogen in den Atlantik nutzte passende Windsysteme für die Rückkehr." },
                { label: "Wochenlang stur gegen den Wind anrudern", good: false, note: "Gegenwind direkt zu bekämpfen kostet Kraft, Zeit und Vorräte." }
              ],
              storyInfo: "Das Verstehen von Winden und Meeresströmungen machte lange Seereisen deutlich sicherer und planbarer."
            }
          }
        ]
      },
      {
        id: "exp_ch2",
        num: 2,
        sceneKey: "blockade",
        en: { title: "Chapter 2: Across the Atlantic", badge: "1492–1502" },
        de: { title: "Kapitel 2: Über den Atlantik", badge: "1492–1502" },
        steps: [
          {
            type: "map",
            targetId: "724",
            en: {
              q: "Click the country on the map whose monarchs sponsored Christopher Columbus's 1492 westward voyage.",
              storyInfo: "In 1492 voyages sailing west from Spain across the Atlantic reached islands in the Caribbean—connecting Europe with the Americas in a lasting way."
            },
            de: {
              q: "Klicke auf der Karte das Land an, von dem aus Christoph Kolumbus 1492 nach Westen aufbrach.",
              storyInfo: "1492 führte die Westfahrt über den Atlantik zu Inseln in der Karibik – ein Wendepunkt, der Europa und Amerika dauerhaft verknüpfte."
            }
          },
          {
            type: "year_slider",
            min: 1470,
            max: 1530,
            targetYear: 1492,
            tolerance: 2,
            en: {
              q: "In which year did Columbus first cross the Atlantic and reach the Americas?",
              storyInfo: "1492 is a pivotal year in world history, marking sustained transatlantic contact between Europe and the Americas."
            },
            de: {
              q: "In welchem Jahr überquerte Kolumbus erstmals den Atlantik und erreichte Amerika?",
              storyInfo: "1492 markiert den Beginn dauerhafter transatlantischer Kontakte zwischen Europa und Amerika."
            }
          },
          {
            type: "choice",
            en: {
              q: "Why did early voyages initially think they had reached parts of Asia ('the Indies')?",
              options: ["Estimates of Earth's size and distance across the ocean were smaller than reality", "Compass needles always pointed east", "There were no stars visible at night", "They sailed around Antarctica first"],
              storyInfo: "Navigators underestimated how wide the ocean between Europe and Asia truly was—and did not yet know a vast double continent lay between them."
            },
            de: {
              q: "Warum hielten frühe Fahrten die erreichten Gebiete zunächst für Teile Asiens ('Indien')?",
              options: ["Man schätzte die Entfernung über das Meer kleiner ein als sie wirklich war", "Kompasse zeigten immer nach Osten", "Es gab keine Sterne am Himmel", "Man fuhr zuerst um die Antarktis"],
              storyInfo: "Man unterschätzte die tatsächliche Entfernung über den Ozean und wusste noch nicht, dass ein ganzer Doppelkontinent dazwischenlag."
            },
            answer: 0
          },
          {
            type: "choice",
            en: {
              q: "Which crops traveled from the Americas to become major staples in Europe and elsewhere?",
              options: ["Potatoes, maize (corn), and tomatoes", "Apples, wheat, and olive trees only", "Tea, cloves, and nutmeg only", "Dates, figs, and pistachios only"],
              storyInfo: "Potatoes, maize, tomatoes, cacao, and beans from the Americas transformed diets, farming, and populations across Europe, Africa, and Asia."
            },
            de: {
              q: "Welche Nutzpflanzen gelangten aus Amerika und prägten später die Ernährung in anderen Weltteilen?",
              options: ["Kartoffeln, Mais und Tomaten", "Nur Weizen und Oliven", "Nur Nelken und Muskat", "Nur Datteln und Feigen"],
              storyInfo: "Kartoffeln, Mais, Tomaten oder Kakao aus Amerika veränderten Landwirtschaft und Küche weltweit nachhaltig."
            },
            answer: 0
          },
          {
            type: "decision",
            en: {
              q: "Voyage Planning Choice: On a long open-sea crossing with no land in sight for weeks, what is vital?",
              choices: [
                { label: "Tracking fresh water, food rations, and crew health carefully", good: true, note: "Fresh water and varied rations were essential on multi-week ocean crossings." },
                { label: "Leaving without checking water barrels or provisions", good: false, note: "Running out of fresh water at sea is one of the gravest dangers." }
              ],
              storyInfo: "Long ocean crossings demanded careful provisioning, discipline, and accurate dead-reckoning navigation."
            },
            de: {
              q: "Reise-Wahl: Wochenlang kein Land in Sicht auf hoher See – was ist entscheidend?",
              choices: [
                { label: "Trinkwasser, Vorräte und Gesundheit der Crew genau im Blick behalten", good: true, note: "Süßwasser und ausreichende Vorräte waren auf langen Überfahrten überlebenswichtig." },
                { label: "Ohne Kontrolle von Wasser- und Lebensmittelvorräten ablegen", good: false, note: "Wassermangel auf hoher See gehört zu den größten Gefahren." }
              ],
              storyInfo: "Lange Überfahrten erforderten sorgfältige Planung, Proviant und verlässliche Navigation."
            }
          }
        ]
      },
      {
        id: "exp_ch3",
        num: 3,
        sceneKey: "russia",
        en: { title: "Chapter 3: To India & Around the Globe", badge: "1497–1522" },
        de: { title: "Kapitel 3: Nach Indien & um die Welt", badge: "1497–1522" },
        steps: [
          {
            type: "map",
            targetId: "356",
            en: {
              q: "Click the South Asian peninsula country on the map reached by Vasco da Gama's sea route in 1498.",
              storyInfo: "In 1498 Vasco da Gama reached Calicut in India after rounding southern Africa—establishing a direct sea link between Europe and South Asia."
            },
            de: {
              q: "Klicke auf der Karte das Land in Südasien an, das Vasco da Gama 1498 auf dem Seeweg erreichte.",
              storyInfo: "1498 erreichte Vasco da Gama nach der Umrundung Afrikas Indien – ein direkter Seeweg zwischen Europa und Südasien war eröffnet."
            }
          },
          {
            type: "year_slider",
            min: 1480,
            max: 1520,
            targetYear: 1498,
            tolerance: 2,
            en: {
              q: "In which year did Vasco da Gama's expedition first reach India by sailing around Africa?",
              storyInfo: "Reaching India in 1498 gave Portugal a direct maritime spice route around Africa."
            },
            de: {
              q: "In welchem Jahr erreichte Vasco da Gama erstmals auf dem Seeweg um Afrika Indien?",
              storyInfo: "1498 gelang die Fahrt um Afrika bis Indien – ein wichtiger Meilenstein der Seefahrtsgeschichte."
            }
          },
          {
            type: "choice",
            en: {
              q: "Which expedition starting in 1519 achieved the first circumnavigation of the Earth (completed in 1522)?",
              options: ["Ferdinand Magellan and Juan Sebastián Elcano's expedition", "A Roman legion marching to Scotland", "A Viking voyage to Greenland alone", "A balloon flight over the Alps"],
              storyInfo: "Departing in 1519, the expedition begun by Magellan crossed the Atlantic, navigated southern waters into the Pacific, and returned in 1522 under Elcano."
            },
            de: {
              q: "Welche ab 1519 startende Expedition schaffte die erste Weltumsegelung (abgeschlossen 1522)?",
              options: ["Die Expedition von Magellan und Elcano", "Ein römischer Marsch nach Schottland", "Eine Fahrt nach Grönland", "Ein Ballonflug über die Alpen"],
              storyInfo: "1519 gestartet, durchquerte die Expedition den Atlantik, gelangte in den Pazifik und kehrte 1522 unter Elcano zurück – der erste Beweis einer kompletten Weltumsegelung."
            },
            answer: 0
          },
          {
            type: "choice",
            en: {
              q: "Why did naming the vast ocean west of the Americas 'Pacific' happen?",
              options: ["The expedition experienced calm waters on initial stretches of crossing it", "The water was frozen solid", "There were no islands anywhere in it", "It was smaller than a lake"],
              storyInfo: "After stormy southern straits, calm waters on early parts of the crossing inspired the name 'Pacific' (peaceful)—though vast distances and storms still challenged sailors."
            },
            de: {
              q: "Wie kam es zum Namen 'Pazifik' (friedliches Meer) für den Ozean westlich Amerikas?",
              options: ["Auf frühen Abschnitten der Überquerung herrschte ruhige See", "Das Wasser war zugefroren", "Er hatte keine Inseln", "Er war kleiner als ein See"],
              storyInfo: "Nach stürmischen Gewässern im Süden erlebten die Fahrer auf frühen Abschnitten ruhigere See – so entstand der Name Pazifik, auch wenn der Ozean riesig und oft anspruchsvoll blieb."
            },
            answer: 0
          },
          {
            type: "decision",
            en: {
              q: "Route Choice: A strait has strong currents and narrow channels. How do you proceed?",
              choices: [
                { label: "Scout carefully, keep watch, and move ships in controlled formation", good: true, note: "Careful lookout and disciplined ship handling are critical in narrow, fast-moving straits." },
                { label: "Sail blindly at top speed in dense fog", good: false, note: "Reefs, shoals, and currents make blind high-speed sailing hazardous." }
              ],
              storyInfo: "Navigating straits, reefs, and unfamiliar coastlines tested seamanship and teamwork at every turn."
            },
            de: {
              q: "Routen-Wahl: Eine Meerenge hat starke Strömungen und Untiefen. Wie gehst du vor?",
              choices: [
                { label: "Sorgfältig ausgucken, peilen und Schiffe kontrolliert führen", good: true, note: "Aufmerksamer Ausguck und saubere Navigation sind in engen Meerengen entscheidend." },
                { label: "Mit Vollgas blind durch unübersichtliche Gewässer fahren", good: false, note: "Riffe und Strömungen machen unvorsichtiges Fahren extrem riskant." }
              ],
              storyInfo: "Enge Passagen und unbekannte Küsten verlangten hohe Seemannskunst und genaue Beobachtung."
            }
          }
        ]
      },
      {
        id: "exp_ch4",
        num: 4,
        sceneKey: "empire",
        en: { title: "Chapter 4: Cartography, Instruments & Trade", badge: "1500–1600" },
        de: { title: "Kapitel 4: Kartenkunst, Instrumente & Handel", badge: "1500–1600" },
        steps: [
          {
            type: "choice",
            en: {
              q: "Which instrument helped navigators estimate latitude using the North Star or sun's angle above the horizon?",
              options: ["Astrolabe or quadrant/cross-staff", "Thermometer", "Barometer", "Seismograph"],
              storyInfo: "Instruments like astrolabes and cross-staffs helped sailors measure angles of celestial bodies above the horizon to estimate latitude."
            },
            de: {
              q: "Welches Hilfsmittel half Seeleuten, anhand von Sternen oder Sonne die geografische Breite abzuschätzen?",
              options: ["Astrolabium oder Jakobsstab / Quadrant", "Thermometer", "Barometer", "Seismograf"],
              storyInfo: "Mit Astrolabium oder Jakobsstab ließen sich Winkel von Sonne und Sternen über dem Horizont messen, um die Breite zu bestimmen."
            },
            answer: 0
          },
          {
            type: "choice",
            en: {
              q: "Why did world maps change dramatically during the 1500s?",
              options: ["New coastlines, continents, and ocean routes were charted and printed", "Mapmakers stopped drawing oceans", "Countries moved every week", "Printing presses were banned"],
              storyInfo: "Voyage reports, portolan charts, and printed world maps rapidly filled in coastlines and oceans—while also showing how much still remained to be explored."
            },
            de: {
              q: "Warum veränderten sich Weltkarten im 16. Jahrhundert stark?",
              options: ["Neue Küsten, Kontinente und Seewege wurden erfasst und gedruckt", "Man zeichnete keine Meere mehr", "Länder wanderten jede Woche", "Karten wurden verboten"],
              storyInfo: "Reiseberichte und Drucktechnik verbreiteten neue Küstenlinien und Seewege viel schneller – das Weltbild wurde immer umfassender."
            },
            answer: 0
          },
          {
            type: "map",
            targetId: "076",
            en: {
              q: "Click the large South American country on the map where Portuguese sailors first landed in 1500.",
              storyInfo: "In 1500 Pedro Álvares Cabral's fleet sailing toward the South Atlantic reached the coast of Brazil, linking South America into Atlantic trade networks."
            },
            de: {
              q: "Klicke auf der Karte das große Land in Südamerika an, dessen Küste 1500 erreicht wurde.",
              storyInfo: "1500 erreichte eine Flotte im Südatlantik die Küste Brasiliens – Südamerika rückte stärker in den Blick der Atlantik-Seefahrt."
            }
          },
          {
            type: "choice",
            en: {
              q: "Why was determining longitude at sea harder than latitude for centuries?",
              options: ["It required comparing local solar time accurately with a reference time", "Longitude lines were invisible underwater", "Clocks did not exist anywhere", "The Earth does not rotate"],
              storyInfo: "Latitude can be found from star/sun angles, whereas longitude depends on time differences—requiring accurate marine timekeepers only solved reliably much later."
            },
            de: {
              q: "Warum war die Bestimmung des Längengrads auf See über lange Zeit schwieriger als die des Breitengrads?",
              options: ["Man brauchte einen genauen Zeitvergleich zwischen Ort und Referenzzeit", "Längengrade gab es nur an Land", "Uhren waren verboten", "Die Erde dreht sich nicht"],
              storyInfo: "Der Längengrad hängt von der Zeitdifferenz ab – erst verlässliche Seeuhren machten die Längengradbestimmung auf hoher See genau."
            },
            answer: 0
          },
          {
            type: "decision",
            en: {
              q: "Charting Choice: You discover an uncharted reef near a harbor approach. What is smartest?",
              choices: [
                { label: "Mark the hazard clearly on charts and share warnings with sailors", good: true, note: "Accurate hazard notes on charts protect future ships from grounding." },
                { label: "Leave the reef off the map so others guess", good: false, note: "Hidden hazards endanger crews and vessels." }
              ],
              storyInfo: "Accumulated coastal logs and charts made sea lanes safer for trade and travel over time."
            },
            de: {
              q: "Karten-Wahl: Du entdeckst ein Riff vor einer Hafeneinfahrt. Was ist am sinnvollsten?",
              choices: [
                { label: "Die Gefahr genau in Karten vermerken und warnen", good: true, note: "Genaue Gefahrenhinweise schützen nachfolgende Schiffe." },
                { label: "Das Riff nicht eintragen und andere raten lassen", good: false, note: "Unverzeichnete Untiefen gefährden Schiffe und Besatzungen." }
              ],
              storyInfo: "Gesammelte Logbücher und Seekarten machten Handelsrouten mit der Zeit deutlich sicherer."
            }
          }
        ]
      },
      {
        id: "exp_ch5",
        num: 5,
        sceneKey: "endgame",
        en: { title: "Chapter 5: Global Links & Lasting Impact", badge: "1600+" },
        de: { title: "Kapitel 5: Weltweite Netze & Folgen", badge: "ab 1600" },
        steps: [
          {
            type: "choice",
            en: {
              q: "What broader global change resulted from connected ocean routes across Europe, Africa, Asia, and the Americas?",
              options: ["Worldwide trade networks, cultural exchange, and severe disruption for indigenous peoples", "Complete end of all travel", "Identical languages everywhere overnight", "No exchange of goods or ideas"],
              storyInfo: "Connected sea routes linked distant economies and cultures, while also bringing colonization, epidemics, forced labor, and profound upheaval for indigenous societies."
            },
            de: {
              q: "Welche weitreichende Folge hatten verknüpfte Seewege zwischen den Kontinenten?",
              options: ["Weltweiter Handel und Austausch, aber auch schwere Umbrüche und Leid für indigene Völker", "Das Ende jeder Reise", "Sofort eine einzige Sprache weltweit", "Kein Austausch von Gütern"],
              storyInfo: "Weltweite Seewege schufen neue Handels- und Wissensnetze, brachten aber zugleich Kolonialisierung, Krankheiten und schwere Brüche für indigene Gesellschaften."
            },
            answer: 0
          },
          {
            type: "choice",
            en: {
              q: "How did maritime trade influence port cities and science?",
              options: ["Ports grew into hubs of commerce, shipbuilding, and natural history collections", "Ports shrank to tiny fishing huts everywhere", "Science stopped studying geography", "Ships were made only of paper"],
              storyInfo: "Port cities became hubs where merchants, mapmakers, shipbuilders, and naturalists exchanged specimens, observations, and ideas from around the globe."
            },
            de: {
              q: "Wie prägte der Seehandel Hafenstädte und Wissenschaft?",
              options: ["Häfen wurden Zentren für Handel, Schiffbau und Naturkunde-Sammlungen", "Häfen verschwanden überall", "Geografie wurde abgeschafft", "Schiffe bestanden nur aus Papier"],
              storyInfo: "In Hafenstädten trafen Handel, Kartografie, Schiffbau und Naturforschung zusammen und brachten neue Sammlungen und Erkenntnisse hervor."
            },
            answer: 0
          },
          {
            type: "map",
            targetId: "036",
            en: {
              q: "Click the continent/country in the southern hemisphere that later became a major focus of Pacific voyages.",
              storyInfo: "In later centuries, Pacific voyages charted coastlines across Oceania and Australia, completing the broad outline of Earth's major landmasses."
            },
            de: {
              q: "Klicke auf der Karte das Land/den Kontinent auf der Südhalbkugel an, der später stärker ins Blickfeld von Pazifikfahrten rückte.",
              storyInfo: "In späteren Jahrhunderten erfassten Pazifik-Expeditionen Küsten in Ozeanien und Australien – das Bild der Kontinente rundete sich weiter ab."
            }
          },
          {
            type: "order",
            en: {
              q: "Order these maritime milestones from earliest (1) to latest (3):",
              items: [
                "Dias rounds southern Africa (1488) & Columbus crosses Atlantic (1492)",
                "Da Gama reaches India by sea (1498)",
                "First circumnavigation completed (1522)"
              ],
              storyInfo: "Atlantic crossings and rounding southern Africa led to the sea route to India (1498) and the first circumnavigation (1522)—reshaping global geography."
            },
            de: {
              q: "Ordne diese Meilensteine der Seefahrt von früh (1) nach spät (3):",
              items: [
                "Südspitze Afrikas (1488) & Atlantiküberquerung (1492)",
                "Seeweg nach Indien erreicht (1498)",
                "Erste Weltumsegelung abgeschlossen (1522)"
              ],
              storyInfo: "Von der Südafrika-Umrundung und Atlantikfahrt über den Seeweg nach Indien (1498) bis zur Weltumsegelung (1522): Die Welt rückte enger zusammen."
            },
            correctOrder: [0, 1, 2]
          },
          {
            type: "decision",
            en: {
              q: "Reflection Choice: What makes historical exploration most meaningful to understand today?",
              choices: [
                { label: "Examining both technological breakthroughs and human/cultural impacts", good: true, note: "Understanding both navigation/science and human consequences gives a balanced picture." },
                { label: "Memorizing only a single date with no context", good: false, note: "Context and consequences help explain why historical events mattered." }
              ],
              storyInfo: "You've completed the Age of Discovery campaign—from coastal caravels and ocean crossings to global maps and their lasting consequences."
            },
            de: {
              q: "Rückblick-Wahl: Was macht historische Entdeckungsreisen heute besonders spannend zu verstehen?",
              choices: [
                { label: "Sowohl Technik/Navigation als auch menschliche und kulturelle Folgen betrachten", good: true, note: "Erst Technik und Folgen zusammen ergeben ein vollständiges Bild." },
                { label: "Nur eine einzelne Zahl ohne Zusammenhang auswendig lernen", good: false, note: "Zusammenhänge zeigen, warum Entwicklungen wirkten." }
              ],
              storyInfo: "Du hast die Kampagne zum Zeitalter der Entdecker abgeschlossen – von den ersten Seewegen bis zu weltweiten Karten und ihren Folgen."
            }
          }
        ]
      }
    ]
  }
];

// -------------------------------------------------------------------------
// 1. STORY-FORTSCHRITT SPEICHERN & LADEN
// -------------------------------------------------------------------------
function loadStoryProgress() {
  try {
    const raw = localStorage.getItem("brainpulse_story_multi_v1");
    const parsed = raw ? JSON.parse(raw) : {};
    return {
      completedChapters: Array.isArray(parsed.completedChapters) ? parsed.completedChapters : [],
      bestScores: parsed.bestScores && typeof parsed.bestScores === "object" ? parsed.bestScores : {}
    };
  } catch (e) {
    return { completedChapters: [], bestScores: {} };
  }
}

let storyProgress = loadStoryProgress();
let storyHubOpen = false;
let selectedCampaignIdx = 0;
let selectedStoryChapterIdx = 0;
let activeStorySession = null;
let storyOrderSelection = [];

function saveStoryProgress() {
  try {
    localStorage.setItem("brainpulse_story_multi_v1", JSON.stringify(storyProgress));
  } catch (e) {}
}

function getAllStoryChapters() {
  return STORY_CAMPAIGNS.flatMap(c => c.chapters);
}

// -------------------------------------------------------------------------
// 2. STYLES FÜR ARTWORK, ANIMATIONEN, GRAFIK-AUFGABEN & HUB
// -------------------------------------------------------------------------
function injectStoryStyles() {
  if (document.getElementById("bp-story-styles")) return;
  const style = document.createElement("style");
  style.id = "bp-story-styles";
  style.textContent = `
    @keyframes bpFadeSlideUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes bpDashFlow {
      to { stroke-dashoffset: -28; }
    }
    .story-fade-in {
      animation: bpFadeSlideUp 0.42s ease both;
    }
    .story-dash-anim {
      animation: bpDashFlow 2.2s linear infinite;
    }
    .story-nav-btn {
      background: linear-gradient(135deg, rgba(250,204,21,0.16) 0%, rgba(56,189,248,0.16) 100%);
      border: 1.5px solid #facc15;
      color: #fef08a;
      border-radius: 999px;
      padding: 6px 14px;
      font-size: 0.84rem;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .story-nav-btn:hover, .story-nav-btn.active {
      background: #facc15;
      color: #0f172a;
    }
    .story-hub-box {
      background: #0f172a;
      border: 1.5px solid #334155;
      border-radius: 20px;
      padding: 20px;
      margin-top: 12px;
      animation: bpFadeSlideUp 0.3s ease both;
    }
    .story-campaign-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 10px;
      margin-bottom: 16px;
    }
    .story-camp-card {
      background: #1e293b;
      border: 1.5px solid #334155;
      border-radius: 15px;
      padding: 12px;
      text-align: left;
      color: #f8fafc;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .story-camp-card:hover {
      border-color: #38bdf8;
    }
    .story-camp-card.selected {
      border-color: #38bdf8;
      background: linear-gradient(135deg, rgba(56,189,248,0.18) 0%, rgba(30,41,59,0.98) 100%);
    }
    .story-campaign-banner {
      background: linear-gradient(135deg, rgba(56,189,248,0.14) 0%, rgba(30,41,59,0.95) 100%);
      border: 1px solid #38bdf8;
      border-radius: 16px;
      padding: 16px;
      margin-bottom: 16px;
    }
    .story-chapter-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
      gap: 10px;
      margin-top: 10px;
    }
    .story-ch-card {
      background: #1e293b;
      border: 1.5px solid #334155;
      border-radius: 14px;
      padding: 12px;
      text-align: left;
      color: #f8fafc;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .story-ch-card:hover {
      border-color: #38bdf8;
    }
    .story-ch-card.selected {
      border-color: #facc15;
      background: rgba(250, 204, 21, 0.12);
    }
    .story-cinematic-banner {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      margin-bottom: 14px;
      border: 1px solid rgba(56,189,248,0.35);
      animation: bpFadeSlideUp 0.45s ease both;
    }
    .story-art-svg {
      display: block;
      width: 100%;
      height: 165px;
    }
    .story-cinematic-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 14px 16px;
      background: linear-gradient(180deg, rgba(15,23,42,0.08) 0%, rgba(15,23,42,0.88) 100%);
    }
    .story-cinematic-badge {
      font-size: 0.72rem;
      font-weight: 800;
      color: #facc15;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .story-cinematic-title {
      margin: 2px 0 0;
      font-size: 1.08rem;
      font-weight: 800;
      color: #f8fafc;
    }
    .story-intro-reveal-box {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 16px;
      margin-top: 10px;
      animation: bpFadeSlideUp 0.45s ease both;
    }
    .story-stage-box {
      background: #1e293b;
      border: 1.5px solid #334155;
      border-radius: 16px;
      padding: 16px;
      margin-top: 10px;
      animation: bpFadeSlideUp 0.35s ease both;
    }
    .story-interactive-svg {
      display: block;
      width: 100%;
      max-height: 190px;
      border-radius: 14px;
      border: 1px solid #334155;
    }
    .story-svg-hotspot {
      cursor: pointer;
      transition: transform 0.15s ease;
    }
    .story-svg-hotspot:hover {
      filter: brightness(1.18);
    }
    .story-order-chip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #0f172a;
      border: 1px solid #475569;
      border-radius: 12px;
      padding: 10px 14px;
      margin-bottom: 8px;
      cursor: pointer;
      color: #f8fafc;
      font-weight: 700;
      font-size: 0.9rem;
    }
    .story-order-chip:hover {
      border-color: #38bdf8;
    }
    .story-order-chip.picked {
      border-color: #facc15;
      background: rgba(250, 204, 21, 0.12);
    }
  `;
  document.head.appendChild(style);
}

// -------------------------------------------------------------------------
// 3. EIGENEN "📖 STORY"-BUTTON EINFÜGEN
// -------------------------------------------------------------------------
function renderStoryNavButton() {
  injectStoryStyles();
  const de = currentLang === "de";
  const allCh = getAllStoryChapters();

  let btn = document.getElementById("btn-open-story-hub");
  if (!btn) {
    btn = document.createElement("button");
    btn.id = "btn-open-story-hub";
    btn.type = "button";
    btn.className = "story-nav-btn";
  }

  const modeTabsEl = document.getElementById("mode-tabs");
  const homeEl = document.getElementById("screen-home");

  if (modeTabsEl && modeTabsEl.parentElement) {
    btn.style.marginTop = "8px";
    if (btn.parentElement !== modeTabsEl.parentElement) {
      modeTabsEl.parentElement.insertBefore(btn, modeTabsEl.nextSibling);
    }
  } else if (homeEl) {
    btn.style.marginBottom = "12px";
    if (btn.parentElement !== homeEl) {
      homeEl.insertBefore(btn, homeEl.firstChild);
    }
  }

  btn.classList.toggle("active", storyHubOpen);
  btn.textContent = de
    ? `📖 Story-Abenteuer (${storyProgress.completedChapters.length}/${allCh.length})`
    : `📖 Story Adventure (${storyProgress.completedChapters.length}/${allCh.length})`;

  btn.onclick = () => {
    storyHubOpen = !storyHubOpen;
    if (storyHubOpen) {
      activeStorySession = null;
      document.getElementById("screen-quiz")?.classList.add("hidden");
      document.getElementById("screen-result")?.classList.add("hidden");
      document.getElementById("screen-home")?.classList.remove("hidden");
    }
    renderHome();
  };
}

// -------------------------------------------------------------------------
// 4. MULTI-KAMPAGNEN-LOBBY MIT NAPOLEON-ARTWORK-VORSCHAU
// -------------------------------------------------------------------------
function renderStoryHubPanel() {
  injectStoryStyles();
  const homeEl = document.getElementById("screen-home");
  if (!homeEl) return;

  let hub = document.getElementById("story-hub-panel");
  if (!hub) {
    hub = document.createElement("div");
    hub.id = "story-hub-panel";
    hub.className = "story-hub-box";
    homeEl.appendChild(hub);
  }

  const normalKids = Array.from(homeEl.children).filter(
    el => el.id !== "story-hub-panel" && el.id !== "btn-open-story-hub"
  );

  if (!storyHubOpen) {
    hub.classList.add("hidden");
    normalKids.forEach(el => {
      if (el.dataset && el.dataset.bpHiddenByStory === "1") {
        el.classList.remove("hidden");
        delete el.dataset.bpHiddenByStory;
      }
    });
    return;
  }

  normalKids.forEach(el => {
    if (!el.classList.contains("hidden")) {
      el.classList.add("hidden");
      el.dataset.bpHiddenByStory = "1";
    }
  });
  hub.classList.remove("hidden");

  const de = currentLang === "de";
  const allCh = getAllStoryChapters();
  const campaign = STORY_CAMPAIGNS[selectedCampaignIdx] || STORY_CAMPAIGNS[0];
  if (selectedStoryChapterIdx >= campaign.chapters.length) {
    selectedStoryChapterIdx = 0;
  }
  const campText = de ? campaign.de : campaign.en;
  const chosen = campaign.chapters[selectedStoryChapterIdx] || campaign.chapters[0];
  const chosenInfo = de ? chosen.de : chosen.en;
  const doneCount = storyProgress.completedChapters.length;
  const totalCount = allCh.length;

  const campCardsHtml = STORY_CAMPAIGNS.map((c, idx) => {
    const cInfo = de ? c.de : c.en;
    const cDone = c.chapters.filter(ch => storyProgress.completedChapters.includes(ch.id)).length;
    return `
      <button type="button" class="story-camp-card ${selectedCampaignIdx === idx ? "selected" : ""}"
        onclick="selectedCampaignIdx=${idx};selectedStoryChapterIdx=0;renderStoryHubPanel();">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
          <span style="font-size:1.15rem;">${c.icon}</span>
          <span style="font-size:0.76rem;font-weight:800;color:#38bdf8;">${cDone}/${c.chapters.length}</span>
        </div>
        <div style="font-weight:800;font-size:0.9rem;margin-top:6px;">${cInfo.title}</div>
      </button>
    `;
  }).join("");

  const chapterCardsHtml = campaign.chapters.map((ch, idx) => {
    const info = de ? ch.de : ch.en;
    const done = storyProgress.completedChapters.includes(ch.id);
    const best = storyProgress.bestScores[ch.id] || 0;
    return `
      <button type="button" class="story-ch-card ${selectedStoryChapterIdx === idx ? "selected" : ""}"
        onclick="selectedStoryChapterIdx=${idx};renderStoryHubPanel();">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
          <span style="font-size:0.74rem;font-weight:800;color:#38bdf8;">${info.badge}</span>
          <span style="font-size:0.78rem;font-weight:800;color:${done ? "#4ade80" : "#94a3b8"};">${done ? "✓" : `#${ch.num}`}</span>
        </div>
        <div style="font-weight:800;font-size:0.88rem;margin-top:4px;">${info.title}</div>
        <div style="font-size:0.74rem;color:#94a3b8;margin-top:4px;">
          ${ch.steps.length} ${de ? "Aufgaben" : "Challenges"}${best ? ` • 🏆 ${best} Pkt.` : ""}
        </div>
      </button>
    `;
  }).join("");

  const previewArtwork = campaign.id === "napoleon"
    ? buildNapoleonChapterArtwork(chosen.sceneKey || "corsica", chosenInfo.title, chosenInfo.badge)
    : "";

  hub.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap;">
      <div style="font-size:1.1rem;font-weight:800;color:#facc15;">
        📖 ${de ? "Story-Bereich" : "Story Hub"} • ${doneCount}/${totalCount} ${de ? "Kapitel geschafft" : "Chapters Done"}
      </div>
      <button type="button" class="pill-btn" onclick="storyHubOpen=false;renderHome();">
        ← ${de ? "Zurück zu den Quiz-Modi" : "Back to Quiz Modes"}
      </button>
    </div>

    <div style="font-size:0.82rem;font-weight:800;color:#94a3b8;margin-bottom:8px;">
      ${de ? "1. Kampagne wählen:" : "1. Choose Campaign:"}
    </div>
    <div class="story-campaign-grid">${campCardsHtml}</div>

    <div class="story-campaign-banner">
      <div style="font-size:0.75rem;font-weight:800;color:#38bdf8;text-transform:uppercase;">
        ${de ? "Aktive Kampagne" : "Active Campaign"}
      </div>
      <h3 style="margin:4px 0 6px;font-size:1.15rem;color:#f8fafc;">${campaign.icon} ${campText.title}</h3>
      <p style="margin:0;font-size:0.86rem;color:#cbd5e1;line-height:1.5;">${campText.subtitle}</p>
    </div>

    ${previewArtwork}

    <div style="font-size:0.84rem;font-weight:800;color:#cbd5e1;">
      ${de ? "2. Kapitel wählen:" : "2. Choose Chapter:"}
    </div>
    <div class="story-chapter-grid">${chapterCardsHtml}</div>

    <div style="margin-top:18px;text-align:center;">
      <button type="button" class="primary-btn" style="padding:12px 26px;font-size:1rem;" onclick="startSelectedStoryChapter()">
        ▶ ${de ? `Kapitel ${chosen.num} starten` : `Start Chapter ${chosen.num}`}
      </button>
    </div>
  `;
}

const _storyOrigRenderHome = renderHome;
renderHome = function () {
  _storyOrigRenderHome.apply(this, arguments);
  renderStoryNavButton();
  renderStoryHubPanel();
};

// -------------------------------------------------------------------------
// 5. KAPITEL-EINBLENDUNG (ARTWORK + SANFTER TEXT), GRAFIK-AUFGABEN & NEXT-CHAPTER
// -------------------------------------------------------------------------
let storyTypewriterTimer = null;

function clearStoryTypewriter() {
  if (storyTypewriterTimer) {
    clearInterval(storyTypewriterTimer);
    storyTypewriterTimer = null;
  }
}

async function startSelectedStoryChapter() {
  injectStoryStyles();
  clearStoryTypewriter();
  if (typeof stopTimer === "function") stopTimer();
  window.isDailySession = false;
  window.dailySeedValue = null;
  window.isWeaknessSession = false;

  const campaign = STORY_CAMPAIGNS[selectedCampaignIdx] || STORY_CAMPAIGNS[0];
  const chapter = campaign.chapters[selectedStoryChapterIdx] || campaign.chapters[0];
  const chInfo = currentLang === "de" ? chapter.de : chapter.en;

  activeStorySession = {
    campaign,
    chapter,
    stepIdx: 0,
    phase: (campaign.id === "napoleon" && chInfo.intro) ? "chapter_intro" : "challenges"
  };

  activeQuestions = chapter.steps;
  currentIndex = 0;
  correctCount = 0;
  totalPoints = 0;
  streak = 0;
  window.bestRunStreak = 0;
  answered = false;

  document.getElementById("screen-home").classList.add("hidden");
  document.getElementById("screen-result").classList.add("hidden");
  document.getElementById("screen-quiz").classList.remove("hidden");

  await ensureMapLoaded();
  clearMapLayers();
  if (mapSvg) mapSvg.classed("pinpoint-mode", false).classed("blind-mode", false);
  resetMapZoom();

  renderStoryStep();
}

function clearStoryExtraUi() {
  clearStoryTypewriter();
  const stage = document.getElementById("story-custom-stage");
  if (stage) stage.remove();
  const intro = document.getElementById("story-chapter-intro-box");
  if (intro) intro.remove();
}

function runSmoothTextReveal(el, fullText) {
  clearStoryTypewriter();
  if (!el) return;
  el.textContent = "";
  let i = 0;
  storyTypewriterTimer = setInterval(() => {
    i += 2;
    el.textContent = fullText.slice(0, i);
    if (i >= fullText.length) {
      el.textContent = fullText;
      clearStoryTypewriter();
    }
  }, 18);
}

function revealIntroTextImmediately(fullText) {
  clearStoryTypewriter();
  const target = document.getElementById("story-intro-animated-text");
  if (target) target.textContent = fullText;
}

function enterNapoleonChapterChallenges() {
  if (!activeStorySession) return;
  clearStoryTypewriter();
  activeStorySession.phase = "challenges";
  activeStorySession.stepIdx = 0;
  renderStoryStep();
}

function renderStoryStep() {
  if (!activeStorySession) return;
  injectStoryStyles();
  clearStoryExtraUi();

  const de = currentLang === "de";
  const t = UI_STRINGS[currentLang];
  const { campaign, chapter, stepIdx, phase } = activeStorySession;
  const chInfo = de ? chapter.de : chapter.en;

  ["hol-arena", "silhouette-box", "radar-hud", "chrono-arena", "flag-zoom-wrap", "dossier-arena", "missing-box", "flight-controls", "truesize-stage", "explorer-panel"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });
  document.getElementById("timer-wrap").classList.add("hidden");
  document.getElementById("flag-box").classList.add("hidden");
  document.getElementById("options-list").innerHTML = "";
  document.getElementById("explanation-box").style.display = "none";
  document.getElementById("next-wrap").style.display = "none";

  document.getElementById("q-meta").textContent = `${campaign.icon} ${chInfo.title} • ${chInfo.badge}`;
  document.getElementById("ui-score").textContent = t.pointsBadge(totalPoints);
  document.getElementById("ui-streak").textContent = `🔥 ${streak}`;

  // Epische Kapitel-Einblendung mit Artwork und sanft auftauchendem Text
  if (phase === "chapter_intro") {
    document.getElementById("map-wrapper").classList.add("hidden");
    document.getElementById("q-text").textContent = chInfo.title;
    document.getElementById("ui-q-counter").textContent = de ? "Einblendung" : "Intro";
    document.getElementById("progress-fill").style.width = "6%";

    const introBox = document.createElement("div");
    introBox.id = "story-chapter-intro-box";
    introBox.className = "story-intro-reveal-box";
    introBox.innerHTML = `
      ${buildNapoleonChapterArtwork(chapter.sceneKey || "corsica", chInfo.title, chInfo.badge)}
      <p id="story-intro-animated-text" style="margin:0;min-height:48px;line-height:1.62;color:#e2e8f0;font-size:0.96rem;"></p>
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:16px;flex-wrap:wrap;">
        <button type="button" class="pill-btn" onclick="revealIntroTextImmediately(${JSON.stringify(chInfo.intro)})">
          ${de ? "Text sofort einblenden" : "Show Full Text"}
        </button>
        <button type="button" class="primary-btn" style="padding:10px 22px;" onclick="enterNapoleonChapterChallenges()">
          ${de ? "In das Kapitel eintauchen →" : "Enter Chapter →"}
        </button>
      </div>
    `;
    document.getElementById("q-text").parentNode.insertBefore(introBox, document.getElementById("options-list"));
    runSmoothTextReveal(document.getElementById("story-intro-animated-text"), chInfo.intro);
    return;
  }

  const step = chapter.steps[stepIdx];
  const stepInfo = de ? step.de : step.en;
  currentIndex = stepIdx;
  answered = false;
  storyOrderSelection = [];

  document.getElementById("q-text").textContent = stepInfo.q;
  document.getElementById("ui-q-counter").textContent = `${stepIdx + 1} / ${chapter.steps.length}`;
  document.getElementById("progress-fill").style.width = `${(stepIdx / chapter.steps.length) * 100}%`;

  const mapWrapper = document.getElementById("map-wrapper");

  if (step.type === "map") {
    mapWrapper.classList.remove("hidden");
    document.getElementById("ui-map-hint").textContent = t.mapHint;
    if (typeof clearMapLayers === "function") clearMapLayers();
    if (typeof resetMapZoom === "function") resetMapZoom();
    return;
  }

  mapWrapper.classList.add("hidden");

  if (step.type === "choice") {
    const optList = document.getElementById("options-list");
    stepInfo.options.forEach((optText, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn story-fade-in";
      btn.textContent = optText;
      btn.onclick = () => resolveStoryStep(idx === step.answer, optText);
      optList.appendChild(btn);
    });
    return;
  }

  const stage = document.createElement("div");
  stage.id = "story-custom-stage";
  stage.className = "story-stage-box";
  document.getElementById("options-list").parentNode.insertBefore(stage, document.getElementById("options-list"));

  if (step.type === "graphic_pick") {
    stage.innerHTML = buildInteractiveGraphicSvg(step.graphicId, de);
  } else if (step.type === "decision") {
    stepInfo.choices.forEach((choiceObj) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn";
      btn.style.marginBottom = "8px";
      btn.textContent = choiceObj.label;
      btn.onclick = () => resolveStoryStep(choiceObj.good, choiceObj.note);
      stage.appendChild(btn);
    });
  } else if (step.type === "year_slider") {
    const initYear = Math.round((step.min + step.max) / 2);
    stage.innerHTML = `
      <div style="text-align:center;font-size:1.5rem;font-weight:800;color:#facc15;margin-bottom:10px;" id="story-year-readout">${initYear}</div>
      <input id="story-year-range" type="range" min="${step.min}" max="${step.max}" step="1" value="${initYear}"
        oninput="document.getElementById('story-year-readout').textContent=this.value;"
        style="width:100%;accent-color:#38bdf8;cursor:pointer;">
      <div style="display:flex;justify-content:space-between;font-size:0.76rem;color:#94a3b8;margin-top:4px;">
        <span>${step.min}</span><span>${step.max}</span>
      </div>
      <div style="text-align:center;margin-top:14px;">
        <button type="button" class="primary-btn" style="padding:9px 20px;" onclick="submitStoryYear()">
          ${de ? "Jahr einloggen" : "Lock In Year"}
        </button>
      </div>
    `;
  } else if (step.type === "order") {
    stage.innerHTML = `
      <div style="font-size:0.84rem;color:#94a3b8;margin-bottom:10px;">
        ${de ? "Klicke die Ereignisse nacheinander in der richtigen Reihenfolge an (1 → 2 → 3):" : "Click the events in chronological order (1 → 2 → 3):"}
      </div>
      <div id="story-order-list"></div>
    `;
    renderStoryOrderChips(stepInfo.items);
  }
}

function submitGraphicPick(pickedKey) {
  if (answered || !activeStorySession) return;
  const step = activeStorySession.chapter.steps[activeStorySession.stepIdx];
  if (!step || step.type !== "graphic_pick") return;
  const isCorrect = pickedKey === step.correctKey;
  const detail = currentLang === "de"
    ? (isCorrect ? "Treffer auf der Grafik!" : "Andere Stelle gewählt.")
    : (isCorrect ? "Spot-on graphic pick!" : "Different spot selected.");
  resolveStoryStep(isCorrect, detail);
}

function renderStoryOrderChips(items) {
  const container = document.getElementById("story-order-list");
  if (!container) return;
  container.innerHTML = "";
  items.forEach((label, idx) => {
    const pickedPos = storyOrderSelection.indexOf(idx);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "story-order-chip" + (pickedPos !== -1 ? " picked" : "");
    btn.innerHTML = `
      <span>${label}</span>
      <span style="font-weight:800;color:#facc15;">${pickedPos !== -1 ? `#${pickedPos + 1}` : "—"}</span>
    `;
    btn.onclick = () => {
      if (answered) return;
      if (pickedPos !== -1) {
        storyOrderSelection.splice(pickedPos, 1);
        renderStoryOrderChips(items);
        return;
      }
      storyOrderSelection.push(idx);
      renderStoryOrderChips(items);
      if (storyOrderSelection.length === items.length) {
        const step = activeStorySession.chapter.steps[activeStorySession.stepIdx];
        const isCorrect = step.correctOrder.every((val, i) => val === storyOrderSelection[i]);
        resolveStoryStep(isCorrect);
      }
    };
    container.appendChild(btn);
  });
}

function submitStoryYear() {
  if (answered || !activeStorySession) return;
  const step = activeStorySession.chapter.steps[activeStorySession.stepIdx];
  const slider = document.getElementById("story-year-range");
  const chosenYear = slider ? Number(slider.value) : step.targetYear;
  const diff = Math.abs(chosenYear - step.targetYear);
  const isCorrect = diff <= (step.tolerance || 2);
  const extraLabel = currentLang === "de"
    ? `Deine Wahl: ${chosenYear} (Ziel: ${step.targetYear})`
    : `Your pick: ${chosenYear} (Target: ${step.targetYear})`;
  resolveStoryStep(isCorrect, extraLabel);
}

function resolveStoryStep(isCorrect, detailText = "") {
  if (answered || !activeStorySession) return;
  answered = true;

  const de = currentLang === "de";
  const t = UI_STRINGS[currentLang];
  const { chapter, stepIdx } = activeStorySession;
  const step = chapter.steps[stepIdx];
  const stepInfo = de ? step.de : step.en;

  if (isCorrect) {
    correctCount++;
    streak++;
    if (streak > (window.bestRunStreak || 0)) window.bestRunStreak = streak;
    totalPoints += 120;
    if (typeof playSuccessSound === "function") playSuccessSound(streak);
    if (typeof rewardCoinsAndCheckAchievements === "function") {
      rewardCoinsAndCheckAchievements(25, { correctDelta: 1 });
    }
  } else {
    streak = 0;
    if (typeof playErrorSound === "function") playErrorSound();
  }

  document.querySelectorAll("#options-list .option-btn, #story-custom-stage .option-btn").forEach(b => { b.disabled = true; });
  document.querySelectorAll("#story-custom-stage .story-svg-hotspot").forEach(el => {
    el.style.pointerEvents = "none";
  });
  const yearSlider = document.getElementById("story-year-range");
  if (yearSlider) yearSlider.disabled = true;

  document.getElementById("ui-score").textContent = t.pointsBadge(totalPoints);
  document.getElementById("ui-streak").textContent = `🔥 ${streak}`;
  document.getElementById("progress-fill").style.width = `${((stepIdx + 1) / chapter.steps.length) * 100}%`;

  const verdict = isCorrect
    ? (de ? "✅ Stark gelöst!" : "✅ Well done!")
    : (de ? "❌ Nicht ganz getroffen." : "❌ Not quite.");

  const storyHeading = de ? "📜 Story-Einordnung" : "📜 Story Context";
  const expBox = document.getElementById("explanation-box");
  expBox.innerHTML = `
    <strong>${verdict}</strong>${detailText ? ` <span style="opacity:0.9;">(${detailText})</span>` : ""}<br>
    <div style="margin-top:8px;padding-top:8px;border-top:1px solid rgba(148,163,184,0.25);line-height:1.58;">
      <strong>${storyHeading}:</strong> ${stepInfo.storyInfo}
    </div>
  `;
  expBox.classList.add("story-fade-in");
  expBox.style.display = "block";

  const isLastStep = stepIdx >= chapter.steps.length - 1;
  const nextBtn = document.getElementById("btn-next");
  nextBtn.textContent = isLastStep
    ? (de ? "Kapitel abschließen" : "Finish Chapter")
    : t.nextBtn;
  nextBtn.onclick = () => {
    if (isLastStep) finishStoryChapter();
    else {
      activeStorySession.stepIdx++;
      renderStoryStep();
    }
  };
  document.getElementById("next-wrap").style.display = "block";
}

function finishStoryChapter() {
  if (!activeStorySession) return;
  const de = currentLang === "de";
  const t = UI_STRINGS[currentLang];
  const { campaign, chapter } = activeStorySession;
  const chInfo = de ? chapter.de : chapter.en;
  const allCh = getAllStoryChapters();

  if (!storyProgress.completedChapters.includes(chapter.id)) {
    storyProgress.completedChapters.push(chapter.id);
    if (typeof rewardCoinsAndCheckAchievements === "function") {
      rewardCoinsAndCheckAchievements(75, {});
    }
  }
  const prevBest = storyProgress.bestScores[chapter.id] || 0;
  if (totalPoints > prevBest) storyProgress.bestScores[chapter.id] = totalPoints;
  saveStoryProgress();

  const nextChapterIdx = campaign.chapters.findIndex(c => c.id === chapter.id) + 1;
  const hasNextChapter = nextChapterIdx > 0 && nextChapterIdx < campaign.chapters.length;

  clearStoryExtraUi();
  activeStorySession = null;
  storyHubOpen = true;

  document.getElementById("screen-quiz").classList.add("hidden");
  document.getElementById("screen-result").classList.remove("hidden");

  document.getElementById("ui-res-title").textContent = chInfo.title;
  document.getElementById("res-score").textContent = `${correctCount} / ${chapter.steps.length}`;
  document.getElementById("res-points").textContent = t.resPoints(totalPoints);
  document.getElementById("res-rank").textContent = de
    ? `📜 Kapitel abgeschlossen (${storyProgress.completedChapters.length}/${allCh.length})`
    : `📜 Chapter Complete (${storyProgress.completedChapters.length}/${allCh.length})`;
  document.getElementById("res-sub").textContent = de
    ? "Dein Kapitel-Fortschritt und deine Münzen wurden gespeichert."
    : "Your chapter progress and coins have been saved.";
  document.getElementById("btn-share").textContent = t.shareBtn;

  const restartBtn = document.getElementById("btn-restart");
  if (hasNextChapter) {
    const nextCh = campaign.chapters[nextChapterIdx];
    restartBtn.textContent = de
      ? `▶ Weiter zu Kapitel ${nextCh.num}`
      : `▶ Next: Chapter ${nextCh.num}`;
    restartBtn.onclick = () => {
      selectedStoryChapterIdx = nextChapterIdx;
      startSelectedStoryChapter();
    };
  } else {
    restartBtn.textContent = t.restartBtn;
    restartBtn.onclick = () => {
      document.getElementById("screen-result").classList.add("hidden");
      document.getElementById("screen-home").classList.remove("hidden");
      renderHome();
    };
  }
}

// -------------------------------------------------------------------------
// 6. KARTEN-KLICK & ZURÜCK-ZUM-MENÜ
// -------------------------------------------------------------------------
const _storyOrigHandleMapGuess = handleMapGuess;
handleMapGuess = function (clickedId, clickedFeature) {
  if (activeStorySession && activeStorySession.phase === "challenges") {
    if (answered) return;
    const step = activeStorySession.chapter.steps[activeStorySession.stepIdx];
    if (step && step.type === "map") {
      const normId = String(clickedId ?? "").padStart(3, "0");
      const targetNorm = String(step.targetId).padStart(3, "0");
      if (typeof highlightMapCountry === "function") {
        highlightMapCountry(targetNorm, "correct");
        if (normId !== targetNorm) highlightMapCountry(normId, "wrong");
      }
      resolveStoryStep(normId === targetNorm);
      return;
    }
  }
  return _storyOrigHandleMapGuess.apply(this, arguments);
};

const _storyOrigGoHome = goHome;
goHome = function () {
  activeStorySession = null;
  clearStoryExtraUi();
  _storyOrigGoHome.apply(this, arguments);
};

renderHome();