const QUIZ_DATA = [
      // --- START-FRAGEN (12 Fragen) ---
      {
        category: "general",
        difficulty: "easy",
        en: {
          q: "Which planet in our solar system is known as the Red Planet?",
          options: ["Venus", "Mars", "Jupiter", "Saturn"],
          answer: 1,
          fact: "Mars looks reddish because its surface is rich in iron oxide—commonly known as rust."
        },
        de: {
          q: "Welcher Planet in unserem Sonnensystem wird als der Rote Planet bezeichnet?",
          options: ["Venus", "Mars", "Jupiter", "Saturn"],
          answer: 1,
          fact: "Der Mars erscheint rötlich, weil seine Oberfläche viel Eisenoxid – also Rost – enthält."
        }
      },
      {
        category: "general",
        difficulty: "medium",
        en: {
          q: "What is the hardest natural substance on Earth?",
          options: ["Graphene", "Quartz", "Diamond", "Titanium"],
          answer: 2,
          fact: "Diamonds rate 10 out of 10 on the Mohs hardness scale due to their tightly bonded carbon atoms."
        },
        de: {
          q: "Was ist die härteste natürlich vorkommende Substanz auf der Erde?",
          options: ["Graphen", "Quarz", "Diamant", "Titan"],
          answer: 2,
          fact: "Diamanten erreichen auf der Mohs-Härteskala den Höchstwert 10 durch ihre extrem dichte Kohlenstoffstruktur."
        }
      },
      {
        category: "general",
        difficulty: "medium",
        en: {
          q: "Which chemical element has the symbol 'Au'?",
          options: ["Silver", "Aluminum", "Gold", "Argon"],
          answer: 2,
          fact: "'Au' comes from the Latin word 'aurum', which translates to 'shining dawn'."
        },
        de: {
          q: "Welches chemische Element hat das Symbol ‚Au‘?",
          options: ["Silber", "Aluminium", "Gold", "Argon"],
          answer: 2,
          fact: "‚Au‘ leitet sich vom lateinischen Wort ‚aurum‘ ab, was ‚leuchtende Morgenröte‘ bedeutet."
        }
      },
      {
        category: "general",
        difficulty: "hard",
        en: {
          q: "How many bones does an adult human body typically have?",
          options: ["186", "206", "226", "256"],
          answer: 1,
          fact: "Babies are born with around 270 soft bones, many of which fuse together as they grow up."
        },
        de: {
          q: "Wie viele Knochen hat ein erwachsener menschlicher Körper normalerweise?",
          options: ["186", "206", "226", "256"],
          answer: 1,
          fact: "Babys kommen mit rund 270 weichen Knochen zur Welt, von denen viele im Laufe des Wachstums zusammenwachsen."
        }
      },
      {
        category: "geography",
        difficulty: "easy",
        en: {
          q: "What is the capital city of Australia?",
          options: ["Sydney", "Melbourne", "Canberra", "Perth"],
          answer: 2,
          fact: "Canberra was chosen as a compromise in 1908 because Sydney and Melbourne couldn't agree on which should be capital."
        },
        de: {
          q: "Wie heißt die Hauptstadt von Australien?",
          options: ["Sydney", "Melbourne", "Canberra", "Perth"],
          answer: 2,
          fact: "Canberra wurde 1908 als Kompromiss gewählt, da sich Sydney und Melbourne nicht einigen konnten."
        }
      },
      {
        category: "geography",
        difficulty: "medium",
        en: {
          q: "Which river flows through the most countries in the world?",
          options: ["Nile", "Amazon", "Danube", "Rhine"],
          answer: 2,
          fact: "The Danube flows through or borders 10 European countries, starting in Germany's Black Forest."
        },
        de: {
          q: "Welcher Fluss fließt durch die meisten Länder der Welt?",
          options: ["Nil", "Amazonas", "Donau", "Rhein"],
          answer: 2,
          fact: "Die Donau durchfließt oder berührt 10 europäische Länder – von der Quelle im Schwarzwald bis zum Schwarzen Meer."
        }
      },
      {
        category: "geography",
        difficulty: "hard",
        en: {
          q: "Which country has the longest coastline in the world?",
          options: ["Russia", "Indonesia", "Australia", "Canada"],
          answer: 3,
          fact: "Canada's coastline stretches over 202,080 kilometers—more than double that of second-place Indonesia."
        },
        de: {
          q: "Welches Land hat die längste Küstenlinie der Welt?",
          options: ["Russland", "Indonesien", "Australien", "Kanada"],
          answer: 3,
          fact: "Kanadas Küstenlinie misst über 202.080 Kilometer – mehr als doppelt so lang wie die des Zweitplatzierten Indonesien."
        }
      },
      {
        category: "geography",
        difficulty: "hard",
        en: {
          q: "In which ocean is the Mariana Trench, the deepest point on Earth, located?",
          options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
          answer: 2,
          fact: "At nearly 11,000 meters deep, Mount Everest would fit inside the Mariana Trench with over 2 km to spare."
        },
        de: {
          q: "In welchem Ozean liegt der Marianengraben, der tiefste Punkt der Erde?",
          options: ["Atlantischer Ozean", "Indischer Ozean", "Pazifischer Ozean", "Arktischer Ozean"],
          answer: 2,
          fact: "Mit fast 11.000 Metern Tiefe würde der Mount Everest komplett in den Marianengraben passen."
        }
      },
      {
        category: "history",
        difficulty: "easy",
        en: {
          q: "In which year did the Berlin Wall fall?",
          options: ["1987", "1989", "1991", "1993"],
          answer: 1,
          fact: "The Berlin Wall fell on November 9, 1989, paving the way for German reunification in 1990."
        },
        de: {
          q: "In welchem Jahr fiel die Berliner Mauer?",
          options: ["1987", "1989", "1991", "1993"],
          answer: 1,
          fact: "Die Berliner Mauer fiel am 9. November 1989 und ebnete den Weg zur deutschen Wiedervereinigung 1990."
        }
      },
      {
        category: "history",
        difficulty: "medium",
        en: {
          q: "Who was the first person to walk on the Moon?",
          options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "Michael Collins"],
          answer: 2,
          fact: "Neil Armstrong stepped onto the lunar surface on July 20, 1969, during the Apollo 11 mission."
        },
        de: {
          q: "Wer war der erste Mensch, der den Mond betrat?",
          options: ["Buzz Aldrin", "Juri Gagarin", "Neil Armstrong", "Michael Collins"],
          answer: 2,
          fact: "Neil Armstrong betrat am 20. Juli 1969 im Rahmen der Apollo-11-Mission die Mondoberfläche."
        }
      },
      {
        category: "history",
        difficulty: "medium",
        en: {
          q: "Which ancient civilization built Machu Picchu?",
          options: ["Aztecs", "Maya", "Inca", "Olmecs"],
          answer: 2,
          fact: "Machu Picchu was built around 1450 in Peru's Andes mountains without the use of mortar or wheels."
        },
        de: {
          q: "Welche antike Hochkultur erbaute Machu Picchu?",
          options: ["Azteken", "Maya", "Inka", "Olmeken"],
          answer: 2,
          fact: "Machu Picchu wurde um 1450 in den peruanischen Anden errichtet – ganz ohne Mörtel oder Räder."
        }
      },
      {
        category: "history",
        difficulty: "hard",
        en: {
          q: "Which empire was ruled by Hammurabi, famous for one of the oldest written legal codes?",
          options: ["Persian Empire", "Babylonian Empire", "Assyrian Empire", "Ottoman Empire"],
          answer: 1,
          fact: "The Code of Hammurabi dates back to around 1754 BC and was carved onto a massive stone stele."
        },
        de: {
          q: "Welches Reich wurde von Hammurapi regiert, der für eines der ältesten geschriebenen Gesetzbücher bekannt ist?",
          options: ["Persisches Reich", "Babylonisches Reich", "Assyrisches Reich", "Osmanisches Reich"],
          answer: 1,
          fact: "Der Codex Hammurapi stammt aus der Zeit um 1754 v. Chr. und wurde in eine monumentale Steinsäule gemeißelt."
        }
      },

      // =====================================================================
      // PAKET 1 (50 FRAGEN)
      // =====================================================================
      {
        category: "general",
        difficulty: "easy",
        en: {
          q: "Which is the largest ocean on Earth?",
          options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
          answer: 2,
          fact: "The Pacific Ocean covers more than 30% of Earth's surface—larger than all landmasses combined."
        },
        de: {
          q: "Welcher ist der größte Ozean der Erde?",
          options: ["Atlantischer Ozean", "Indischer Ozean", "Pazifischer Ozean", "Arktischer Ozean"],
          answer: 2,
          fact: "Der Pazifik bedeckt über 30 % der Erdoberfläche und ist damit größer als alle Kontinente zusammen."
        }
      },
      {
        category: "general",
        difficulty: "easy",
        en: {
          q: "Which gas do plants absorb from the atmosphere during photosynthesis?",
          options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
          answer: 1,
          fact: "Plants take in carbon dioxide and release oxygen as a byproduct of converting sunlight into energy."
        },
        de: {
          q: "Welches Gas nehmen Pflanzen bei der Photosynthese aus der Luft auf?",
          options: ["Sauerstoff", "Kohlendioxid", "Stickstoff", "Wasserstoff"],
          answer: 1,
          fact: "Pflanzen nehmen Kohlendioxid auf und geben im Gegenzug lebenswichtigen Sauerstoff an die Umwelt ab."
        }
      },
      {
        category: "general",
        difficulty: "easy",
        en: {
          q: "How many days are there in a leap year?",
          options: ["364", "365", "366", "367"],
          answer: 2,
          fact: "A leap day is added every four years because Earth takes about 365.24 days to orbit the Sun."
        },
        de: {
          q: "Wie viele Tage hat ein Schaltjahr?",
          options: ["364", "365", "366", "367"],
          answer: 2,
          fact: "Alle vier Jahre wird der 29. Februar eingefügt, weil die Erde rund 365,24 Tage für eine Umrundung der Sonne braucht."
        }
      },
      {
        category: "general",
        difficulty: "easy",
        en: {
          q: "At what temperature does water boil at sea level?",
          options: ["80 °C", "90 °C", "95 °C", "100 °C"],
          answer: 3,
          fact: "On top of Mount Everest, lower air pressure causes water to boil at just around 68 °C."
        },
        de: {
          q: "Bei welcher Temperatur kocht Wasser auf Meereshöhe?",
          options: ["80 °C", "90 °C", "95 °C", "100 °C"],
          answer: 3,
          fact: "Auf dem Gipfel des Mount Everest kocht Wasser wegen des geringeren Luftdrucks schon bei etwa 68 °C."
        }
      },
      {
        category: "general",
        difficulty: "easy",
        en: {
          q: "Which mammal is capable of true sustained flight?",
          options: ["Flying squirrel", "Bat", "Sugar glider", "Colugo"],
          answer: 1,
          fact: "Bats are the only mammals that can truly fly; others like flying squirrels only glide."
        },
        de: {
          q: "Welches Säugetier kann aktiv und ausdauernd fliegen?",
          options: ["Gleithörnchen", "Fledermaus", "Kurzkopfgleitbeutler", "Riesengleiter"],
          answer: 1,
          fact: "Fledermäuse sind die einzigen echten Flieger unter den Säugetieren – Gleithörnchen segeln nur."
        }
      },
      {
        category: "general",
        difficulty: "easy",
        en: {
          q: "How many players are on the field for one soccer team during a standard match?",
          options: ["9", "10", "11", "12"],
          answer: 2,
          fact: "Each team fields 11 players, including one goalkeeper."
        },
        de: {
          q: "Wie viele Spieler stehen bei einem regulären Fußballspiel pro Mannschaft gleichzeitig auf dem Platz?",
          options: ["9", "10", "11", "12"],
          answer: 2,
          fact: "Jede Mannschaft spielt mit 11 Personen auf dem Feld – inklusive Torwart."
        }
      },
      {
        category: "general",
        difficulty: "medium",
        en: {
          q: "Who painted the famous portrait known as the Mona Lisa?",
          options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Vincent van Gogh"],
          answer: 1,
          fact: "Leonardo da Vinci began painting the Mona Lisa around 1503, and it now hangs in the Louvre in Paris."
        },
        de: {
          q: "Wer malte das weltberühmte Gemälde der Mona Lisa?",
          options: ["Michelangelo", "Leonardo da Vinci", "Raffael", "Vincent van Gogh"],
          answer: 1,
          fact: "Leonardo da Vinci begann um 1503 mit dem Gemälde; heute hängt es hinter Panzerglas im Pariser Louvre."
        }
      },
      {
        category: "general",
        difficulty: "medium",
        en: {
          q: "What is the chemical symbol for iron?",
          options: ["Ir", "In", "Fe", "Fr"],
          answer: 2,
          fact: "'Fe' comes from the Latin word for iron, 'ferrum'."
        },
        de: {
          q: "Welches chemische Symbol steht für Eisen?",
          options: ["Ir", "In", "Fe", "Fr"],
          answer: 2,
          fact: "Das Symbol ‚Fe‘ leitet sich vom lateinischen Wort für Eisen ab: ‚ferrum‘."
        }
      },
      {
        category: "general",
        difficulty: "medium",
        en: {
          q: "Which planet in our solar system has the most confirmed moons?",
          options: ["Jupiter", "Uranus", "Saturn", "Neptune"],
          answer: 2,
          fact: "Saturn leads the solar system with over 140 confirmed moons, including Titan and Enceladus."
        },
        de: {
          q: "Welcher Planet in unserem Sonnensystem hat die meisten bestätigten Monde?",
          options: ["Jupiter", "Uranus", "Saturn", "Neptun"],
          answer: 2,
          fact: "Saturn führt mit über 140 bestätigten Monden – darunter der riesige Mond Titan."
        }
      },
      {
        category: "general",
        difficulty: "medium",
        en: {
          q: "Which vitamin does the human body produce when exposed to sunlight?",
          options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
          answer: 3,
          fact: "UVB rays trigger Vitamin D synthesis in the skin, which helps the body absorb calcium."
        },
        de: {
          q: "Welches Vitamin bildet der menschliche Körper durch Sonnenlicht selbst?",
          options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
          answer: 3,
          fact: "UVB-Strahlung regt in der Haut die Produktion von Vitamin D an, das wichtig für Knochen und Immunsystem ist."
        }
      },
      {
        category: "general",
        difficulty: "medium",
        en: {
          q: "How many strings does a standard orchestral violin have?",
          options: ["4", "5", "6", "7"],
          answer: 0,
          fact: "A standard violin is tuned to the notes G, D, A, and E."
        },
        de: {
          q: "Wie viele Saiten hat eine klassische Geige (Violine)?",
          options: ["4", "5", "6", "7"],
          answer: 0,
          fact: "Die vier Saiten einer Geige sind standardmäßig auf die Töne G, D, A und E gestimmt."
        }
      },
      {
        category: "general",
        difficulty: "medium",
        en: {
          q: "What is the approximate speed of light in a vacuum?",
          options: ["30,000 km/s", "300,000 km/s", "3,000,000 km/s", "150,000 km/s"],
          answer: 1,
          fact: "Sunlight takes about 8 minutes and 20 seconds to travel from the Sun to Earth."
        },
        de: {
          q: "Wie hoch ist die Lichtgeschwindigkeit im Vakuum ungefähr?",
          options: ["30.000 km/s", "300.000 km/s", "3.000.000 km/s", "150.000 km/s"],
          answer: 1,
          fact: "Das Licht der Sonne braucht rund 8 Minuten und 20 Sekunden, bis es auf der Erde ankommt."
        }
      },
      {
        category: "general",
        difficulty: "hard",
        en: {
          q: "What is the rarest human blood type?",
          options: ["O negative", "B negative", "A negative", "AB negative"],
          answer: 3,
          fact: "Less than 1% of the global population has AB negative blood."
        },
        de: {
          q: "Welche ist die seltenste menschliche Blutgruppe?",
          options: ["0 negativ", "B negativ", "A negativ", "AB negativ"],
          answer: 3,
          fact: "Weniger als 1 % der Weltbevölkerung besitzt die Blutgruppe AB negativ."
        }
      },
      {
        category: "general",
        difficulty: "hard",
        en: {
          q: "What is the scientific study of fungi and mushrooms called?",
          options: ["Botany", "Entomology", "Mycology", "Ornithology"],
          answer: 2,
          fact: "Fungi are genetically closer to animals than they are to plants."
        },
        de: {
          q: "Wie nennt man die Wissenschaft von den Pilzen?",
          options: ["Botanik", "Entomologie", "Mykologie", "Ornithologie"],
          answer: 2,
          fact: "Biologisch gesehen sind Pilze näher mit Tieren verwandt als mit Pflanzen."
        }
      },
      {
        category: "general",
        difficulty: "hard",
        en: {
          q: "Which metallic element is liquid at standard room temperature?",
          options: ["Gallium", "Mercury", "Cesium", "Bismuth"],
          answer: 1,
          fact: "Mercury remains liquid down to -38.8 °C, which is why it was long used in thermometers."
        },
        de: {
          q: "Welches metallische Element ist bei Raumtemperatur flüssig?",
          options: ["Gallium", "Quecksilber", "Cäsium", "Bismut"],
          answer: 1,
          fact: "Quecksilber bleibt bis -38,8 °C flüssig und wurde deshalb früher häufig in Thermometern eingesetzt."
        }
      },
      {
        category: "general",
        difficulty: "hard",
        en: {
          q: "How many hearts does an octopus have?",
          options: ["1", "2", "3", "4"],
          answer: 2,
          fact: "Two hearts pump blood to the gills, while a third circulates it to the rest of the body."
        },
        de: {
          q: "Wie viele Herzen hat ein Oktopus?",
          options: ["1", "2", "3", "4"],
          answer: 2,
          fact: "Zwei Herzen pumpen das Blut durch die Kiemen, ein drittes versorgt den restlichen Körper."
        }
      },
      {
        category: "general",
        difficulty: "hard",
        en: {
          q: "What is the smallest bone in the human body?",
          options: ["Stapes (stirrup)", "Incus (anvil)", "Malleus (hammer)", "Hyoid"],
          answer: 0,
          fact: "Located in the middle ear, the stapes measures only about 3 millimeters in length."
        },
        de: {
          q: "Wie heißt der kleinste Knochen im menschlichen Körper?",
          options: ["Steigbügel", "Amboss", "Hammer", "Zungenbein"],
          answer: 0,
          fact: "Der Steigbügel sitzt im Mittelohr und ist nur rund 3 Millimeter lang."
        }
      },
      {
        category: "general",
        difficulty: "hard",
        en: {
          q: "Which element has the atomic number 1 on the periodic table?",
          options: ["Hydrogen", "Helium", "Oxygen", "Carbon"],
          answer: 0,
          fact: "Hydrogen is the lightest and most abundant chemical element in the universe."
        },
        de: {
          q: "Welches Element steht im Periodensystem an erster Stelle (Ordnungszahl 1)?",
          options: ["Wasserstoff", "Helium", "Sauerstoff", "Kohlenstoff"],
          answer: 0,
          fact: "Wasserstoff ist das leichteste und gleichzeitig häufigste Element im gesamten Universum."
        }
      },
      {
        category: "geography",
        difficulty: "easy",
        en: {
          q: "What is the largest country in the world by land area?",
          options: ["Russia", "Canada", "China", "United States"],
          answer: 0,
          fact: "Russia spans 11 time zones across Eastern Europe and Northern Asia."
        },
        de: {
          q: "Welches ist flächenmäßig das größte Land der Welt?",
          options: ["Russland", "Kanada", "China", "USA"],
          answer: 0,
          fact: "Russland erstreckt sich über 11 Zeitzonen hinweg über Osteuropa und Nordasien."
        }
      },
      {
        category: "geography",
        difficulty: "easy",
        en: {
          q: "Which is the largest hot desert in the world?",
          options: ["Gobi Desert", "Arabian Desert", "Sahara Desert", "Kalahari Desert"],
          answer: 2,
          fact: "The Sahara covers roughly 9.2 million square kilometers—nearly the size of the United States."
        },
        de: {
          q: "Welche ist die größte heiße Wüste der Erde?",
          options: ["Wüste Gobi", "Arabische Wüste", "Sahara", "Kalahari"],
          answer: 2,
          fact: "Die Sahara erstreckt sich über rund 9,2 Millionen Quadratkilometer – fast so groß wie die gesamten USA."
        }
      },
      {
        category: "geography",
        difficulty: "easy",
        en: {
          q: "What is the capital city of Japan?",
          options: ["Kyoto", "Tokyo", "Osaka", "Hiroshima"],
          answer: 1,
          fact: "Greater Tokyo is the most populous metropolitan area in the world with over 37 million residents."
        },
        de: {
          q: "Wie heißt die Hauptstadt von Japan?",
          options: ["Kyoto", "Tokio", "Osaka", "Hiroshima"],
          answer: 1,
          fact: "Der Großraum Tokio ist mit über 37 Millionen Einwohnern die bevölkerungsreichste Metropolregion der Welt."
        }
      },
      {
        category: "geography",
        difficulty: "easy",
        en: {
          q: "Which mountain is the highest above sea level on Earth?",
          options: ["K2", "Kangchenjunga", "Kilimanjaro", "Mount Everest"],
          answer: 3,
          fact: "Mount Everest stands at 8,848.86 meters above sea level on the border of Nepal and China."
        },
        de: {
          q: "Welcher Berg ist der höchste über dem Meeresspiegel?",
          options: ["K2", "Kangchendzönga", "Kilimandscharo", "Mount Everest"],
          answer: 3,
          fact: "Der Mount Everest ragt 8.848,86 Meter über den Meeresspiegel an der Grenze zwischen Nepal und China."
        }
      },
      {
        category: "geography",
        difficulty: "easy",
        en: {
          q: "Which European country is shaped like a boot?",
          options: ["Spain", "Greece", "Italy", "Portugal"],
          answer: 2,
          fact: "The Italian Peninsula's distinctive boot shape is formed by the Apennine Mountains."
        },
        de: {
          q: "Welches europäische Land hat auf der Landkarte die Form eines Stiefels?",
          options: ["Spanien", "Griechenland", "Italien", "Portugal"],
          answer: 2,
          fact: "Die markante Stiefelform der italienischen Halbinsel wird durch das Apennin-Gebirge geprägt."
        }
      },
      {
        category: "geography",
        difficulty: "medium",
        en: {
          q: "What is the smallest independent country in the world by area?",
          options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
          answer: 1,
          fact: "Vatican City covers just 0.49 square kilometers inside Rome, Italy."
        },
        de: {
          q: "Welcher ist flächenmäßig der kleinste anerkannte Staat der Welt?",
          options: ["Monaco", "Vatikanstadt", "San Marino", "Liechtenstein"],
          answer: 1,
          fact: "Die Vatikanstadt misst nur 0,49 Quadratkilometer und liegt komplett innerhalb Roms."
        }
      },
      {
        category: "geography",
        difficulty: "medium",
        en: {
          q: "What is the capital city of Canada?",
          options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
          answer: 2,
          fact: "Queen Victoria chose Ottawa in 1857 partly because it sat on the border between English- and French-speaking regions."
        },
        de: {
          q: "Wie heißt die Hauptstadt von Kanada?",
          options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
          answer: 2,
          fact: "Königin Victoria wählte 1857 Ottawa, weil die Stadt genau an der Grenze zwischen dem englisch- und französischsprachigen Teil lag."
        }
      },
      {
        category: "geography",
        difficulty: "medium",
        en: {
          q: "Which narrow waterway separates Europe and Africa at their closest point?",
          options: ["Bosphorus", "Suez Canal", "Strait of Gibraltar", "Strait of Messina"],
          answer: 2,
          fact: "At its narrowest point, the Strait of Gibraltar is only about 14.3 kilometers wide."
        },
        de: {
          q: "Welche Meerenge trennt Europa und Afrika an ihrer schmalsten Stelle?",
          options: ["Bosporus", "Sueskanal", "Straße von Gibraltar", "Straße von Messina"],
          answer: 2,
          fact: "An ihrer engsten Stelle ist die Straße von Gibraltar nur rund 14,3 Kilometer breit."
        }
      },
      {
        category: "geography",
        difficulty: "medium",
        en: {
          q: "Which river flows directly through the center of Paris?",
          options: ["Seine", "Loire", "Rhône", "Garonne"],
          answer: 0,
          fact: "More than 30 bridges span the Seine within Paris, including the famous Pont Neuf."
        },
        de: {
          q: "Welcher Fluss fließt direkt durch das Zentrum von Paris?",
          options: ["Seine", "Loire", "Rhône", "Garonne"],
          answer: 0,
          fact: "Innerhalb von Paris führen über 30 Brücken über die Seine – darunter die historische Pont Neuf."
        }
      },
      {
        category: "geography",
        difficulty: "medium",
        en: {
          q: "Which African country has the largest population?",
          options: ["Egypt", "Ethiopia", "South Africa", "Nigeria"],
          answer: 3,
          fact: "Nigeria is home to over 220 million people, making it the most populous nation in Africa."
        },
        de: {
          q: "Welches afrikanische Land hat die meisten Einwohner?",
          options: ["Ägypten", "Äthiopien", "Südafrika", "Nigeria"],
          answer: 3,
          fact: "In Nigeria leben über 220 Millionen Menschen – damit ist es das bevölkerungsreichste Land Afrikas."
        }
      },
      {
        category: "geography",
        difficulty: "medium",
        en: {
          q: "Mount Kilimanjaro is located in which country?",
          options: ["Tanzania", "Kenya", "Uganda", "Rwanda"],
          answer: 0,
          fact: "At 5,895 meters, Mount Kilimanjaro is the highest peak in Africa and the tallest free-standing mountain in the world."
        },
        de: {
          q: "In welchem Land liegt der Kilimandscharo?",
          options: ["Tansania", "Kenia", "Uganda", "Ruanda"],
          answer: 0,
          fact: "Mit 5.895 Metern ist das Kilimandscharo-Massiv in Tansania das höchste Bergmassiv Afrikas."
        }
      },
      {
        category: "geography",
        difficulty: "hard",
        en: {
          q: "How many official time zones does mainland China use?",
          options: ["1", "3", "4", "5"],
          answer: 0,
          fact: "Despite spanning five geographical time zones, all of China follows Beijing Time."
        },
        de: {
          q: "Wie viele offizielle Zeitzonen verwendet China landesweit?",
          options: ["1", "3", "4", "5"],
          answer: 0,
          fact: "Obwohl das Land geographisch über fünf Zeitzonen reicht, gilt in ganz China einheitlich die Peking-Zeit."
        }
      },
      {
        category: "geography",
        difficulty: "hard",
        en: {
          q: "Which country has the most natural lakes in the world?",
          options: ["Finland", "Russia", "Canada", "Sweden"],
          answer: 2,
          fact: "Canada contains over 60% of the world's natural lakes—nearly 900,000 lakes larger than 10 hectares."
        },
        de: {
          q: "Welches Land besitzt die meisten natürlichen Seen der Welt?",
          options: ["Finnland", "Russland", "Kanada", "Schweden"],
          answer: 2,
          fact: "In Kanada liegen über 60 % aller natürlichen Seen der Erde – fast 900.000 Seen sind größer als 10 Hektar."
        }
      },
      {
        category: "geography",
        difficulty: "hard",
        en: {
          q: "Which two South American countries are completely landlocked?",
          options: ["Ecuador and Peru", "Bolivia and Paraguay", "Uruguay and Paraguay", "Bolivia and Suriname"],
          answer: 1,
          fact: "Bolivia and Paraguay are the only countries in the Americas without direct access to an ocean."
        },
        de: {
          q: "Welche beiden Länder in Südamerika sind Binnenstaaten ohne eigenen Meerzugang?",
          options: ["Ecuador und Peru", "Bolivien und Paraguay", "Uruguay und Paraguay", "Bolivien und Suriname"],
          answer: 1,
          fact: "Bolivien und Paraguay sind die einzigen Staaten auf dem gesamten amerikanischen Doppelkontinent ohne Meeresküste."
        }
      },
      {
        category: "geography",
        difficulty: "hard",
        en: {
          q: "What is the only sea on Earth with no coastline?",
          options: ["Bering Sea", "Coral Sea", "Barents Sea", "Sargasso Sea"],
          answer: 3,
          fact: "Located in the North Atlantic, the Sargasso Sea is bounded entirely by four ocean currents instead of land."
        },
        de: {
          q: "Welches ist das einzige Meer der Erde ohne eigene Küste?",
          options: ["Beringmeer", "Korallenmeer", "Barentssee", "Sargassosee"],
          answer: 3,
          fact: "Die Sargassosee im Nordatlantik wird nicht von Land, sondern allein durch vier Meeresströmungen begrenzt."
        }
      },
      {
        category: "geography",
        difficulty: "hard",
        en: {
          q: "What is the capital city of Kazakhstan?",
          options: ["Almaty", "Astana", "Tashkent", "Bishkek"],
          answer: 1,
          fact: "Astana replaced Almaty as Kazakhstan's capital in 1997 (and was briefly named Nur-Sultan from 2019 to 2022)."
        },
        de: {
          q: "Wie heißt die Hauptstadt von Kasachstan?",
          options: ["Almaty", "Astana", "Taschkent", "Bischkek"],
          answer: 1,
          fact: "Astana löste 1997 Almaty als Hauptstadt ab (und hieß zwischen 2019 und 2022 vorübergehend Nur-Sultan)."
        }
      },
      {
        category: "history",
        difficulty: "easy",
        en: {
          q: "In which year did World War II end?",
          options: ["1943", "1944", "1945", "1946"],
          answer: 2,
          fact: "World War II ended in Europe in May 1945 and in Asia in September 1945."
        },
        de: {
          q: "In welchem Jahr endete der Zweite Weltkrieg?",
          options: ["1943", "1944", "1945", "1946"],
          answer: 2,
          fact: "Der Zweite Weltkrieg endete in Europa im Mai 1945 und im Pazifikraum im September 1945."
        }
      },
      {
        category: "history",
        difficulty: "easy",
        en: {
          q: "Who was the first President of the United States?",
          options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"],
          answer: 0,
          fact: "George Washington served two terms as the first US President from 1789 to 1797."
        },
        de: {
          q: "Wer war der erste Präsident der Vereinigten Staaten?",
          options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"],
          answer: 0,
          fact: "George Washington amtierte von 1789 bis 1797 als erster Präsident der USA."
        }
      },
      {
        category: "history",
        difficulty: "easy",
        en: {
          q: "Which famous ocean liner sank on its maiden voyage in April 1912?",
          options: ["Lusitania", "Britannic", "Olympic", "Titanic"],
          answer: 3,
          fact: "RMS Titanic struck an iceberg in the North Atlantic on April 14, 1912, and sank early the next morning."
        },
        de: {
          q: "Welcher berühmte Passagierdampfer sank im April 1912 auf seiner Jungfernfahrt?",
          options: ["Lusitania", "Britannic", "Olympic", "Titanic"],
          answer: 3,
          fact: "Die RMS Titanic rammte am 14. April 1912 im Nordatlantik einen Eisberg und versank wenige Stunden später."
        }
      },
      {
        category: "history",
        difficulty: "easy",
        en: {
          q: "The Great Pyramids of Giza were built in which ancient civilization?",
          options: ["Ancient Greece", "Ancient Egypt", "Mesopotamia", "Roman Empire"],
          answer: 1,
          fact: "The Great Pyramid of Khufu was the tallest man-made structure in the world for over 3,800 years."
        },
        de: {
          q: "Von welcher antiken Hochkultur wurden die großen Pyramiden von Gizeh erbaut?",
          options: ["Antikes Griechenland", "Altes Ägypten", "Mesopotamien", "Römisches Reich"],
          answer: 1,
          fact: "Die Cheops-Pyramide war über 3.800 Jahre lang das höchste von Menschenhand geschaffene Bauwerk der Welt."
        }
      },
      {
        category: "history",
        difficulty: "easy",
        en: {
          q: "Who is credited with patenting the first practical telephone in 1876?",
          options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Guglielmo Marconi"],
          answer: 1,
          fact: "Alexander Graham Bell was granted US patent 174,465 for the telephone on March 7, 1876."
        },
        de: {
          q: "Wer erhielt 1876 das berühmte erste US-Patent für das Telefon?",
          options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Guglielmo Marconi"],
          answer: 1,
          fact: "Alexander Graham Bell meldete das Telefon am 7. März 1876 erfolgreich zum Patent an."
        }
      },
      {
        category: "history",
        difficulty: "medium",
        en: {
          q: "In which year did Christopher Columbus first reach the Americas?",
          options: ["1488", "1492", "1498", "1504"],
          answer: 1,
          fact: "Columbus landed in the Bahamas on October 12, 1492, while searching for a western sea route to Asia."
        },
        de: {
          q: "In welchem Jahr erreichte Christoph Kolumbus erstmals Amerika?",
          options: ["1488", "1492", "1498", "1504"],
          answer: 1,
          fact: "Kolumbus landete am 12. Oktober 1492 auf den Bahamas, während er eigentlich einen westlichen Seeweg nach Asien suchte."
        }
      },
      {
        category: "history",
        difficulty: "medium",
        en: {
          q: "Who discovered penicillin in 1928?",
          options: ["Alexander Fleming", "Louis Pasteur", "Robert Koch", "Edward Jenner"],
          answer: 0,
          fact: "Scottish scientist Alexander Fleming noticed a mold killing bacteria in a neglected petri dish."
        },
        de: {
          q: "Wer entdeckte 1928 das Penicillin?",
          options: ["Alexander Fleming", "Louis Pasteur", "Robert Koch", "Edward Jenner"],
          answer: 0,
          fact: "Der schottische Forscher Alexander Fleming entdeckte zufällig, dass ein Schimmelpilz Bakterien in einer Petrischale abtötete."
        }
      },
      {
        category: "history",
        difficulty: "medium",
        en: {
          q: "In which year did the French Revolution begin with the storming of the Bastille?",
          options: ["1776", "1783", "1789", "1799"],
          answer: 2,
          fact: "The storming of the Bastille on July 14, 1789, is still celebrated annually as France's National Day."
        },
        de: {
          q: "In welchem Jahr begann die Französische Revolution mit dem Sturm auf die Bastille?",
          options: ["1776", "1783", "1789", "1799"],
          answer: 2,
          fact: "Der Sturm auf die Bastille am 14. Juli 1789 ist bis heute der französische Nationalfeiertag."
        }
      },
      {
        category: "history",
        difficulty: "medium",
        en: {
          q: "Which Roman city was buried by the eruption of Mount Vesuvius in 79 AD?",
          options: ["Ostia", "Pompeii", "Ravenna", "Syracuse"],
          answer: 1,
          fact: "Volcanic ash preserved Pompeii's streets, frescoes, and buildings for nearly 1,700 years."
        },
        de: {
          q: "Welche römische Stadt wurde 79 n. Chr. beim Ausbruch des Vesuvs verschüttet?",
          options: ["Ostia", "Pompeji", "Ravenna", "Syrakus"],
          answer: 1,
          fact: "Die Vulkanasche konservierte Straßen, Fresken und Gebäude von Pompeji fast 1.700 Jahre lang."
        }
      },
      {
        category: "history",
        difficulty: "medium",
        en: {
          q: "Who was the first woman to win a Nobel Prize?",
          options: ["Rosalind Franklin", "Ada Lovelace", "Dorothy Hodgkin", "Marie Curie"],
          answer: 3,
          fact: "Marie Curie won the Nobel Prize in Physics in 1903 and later won a second one in Chemistry in 1911."
        },
        de: {
          q: "Wer war die erste Frau, die einen Nobelpreis erhielt?",
          options: ["Rosalind Franklin", "Ada Lovelace", "Dorothy Hodgkin", "Marie Curie"],
          answer: 3,
          fact: "Marie Curie erhielt 1903 den Nobelpreis für Physik und 1911 einen zweiten für Chemie."
        }
      },
      {
        category: "history",
        difficulty: "medium",
        en: {
          q: "Which empire was founded by Genghis Khan in the early 13th century?",
          options: ["Ottoman Empire", "Mughal Empire", "Mongol Empire", "Byzantine Empire"],
          answer: 2,
          fact: "The Mongol Empire became the largest contiguous land empire in human history."
        },
        de: {
          q: "Welches Weltreich wurde Anfang des 13. Jahrhunderts von Dschingis Khan gegründet?",
          options: ["Osmanisches Reich", "Mogulreich", "Mongolisches Reich", "Byzantinisches Reich"],
          answer: 2,
          fact: "Das Mongolische Reich entwickelte sich zum größten zusammenhängenden Landreich der Menschheitsgeschichte."
        }
      },
      {
        category: "history",
        difficulty: "hard",
        en: {
          q: "Which peace treaty officially ended World War I between Germany and the Allied Powers in 1919?",
          options: ["Treaty of Versailles", "Treaty of Utrecht", "Treaty of Ghent", "Treaty of Tordesillas"],
          answer: 0,
          fact: "The Treaty of Versailles was signed on June 28, 1919—exactly five years after the assassination of Archduke Franz Ferdinand."
        },
        de: {
          q: "Welcher Friedensvertrag beendete 1919 offiziell den Ersten Weltkrieg zwischen Deutschland und den Alliierten?",
          options: ["Vertrag von Versailles", "Frieden von Utrecht", "Frieden von Gent", "Vertrag von Tordesillas"],
          answer: 0,
          fact: "Der Vertrag von Versailles wurde am 28. Juni 1919 unterzeichnet – genau fünf Jahre nach dem Attentat von Sarajevo."
        }
      },
      {
        category: "history",
        difficulty: "hard",
        en: {
          q: "Who was the last reigning Emperor (Tsar) of Russia?",
          options: ["Alexander III", "Peter the Great", "Nicholas II", "Ivan the Terrible"],
          answer: 2,
          fact: "Nicholas II abdicated in March 1917 during the Russian Revolution, ending over 300 years of Romanov rule."
        },
        de: {
          q: "Wer war der letzte regierende Zar von Russland?",
          options: ["Alexander III.", "Peter der Große", "Nikolaus II.", "Iwan der Schreckliche"],
          answer: 2,
          fact: "Nikolaus II. dankte im März 1917 ab und beendete damit über 300 Jahre Herrschaft der Romanow-Dynastie."
        }
      },
      {
        category: "history",
        difficulty: "hard",
        en: {
          q: "In which year did King John of England seal the Magna Carta?",
          options: ["1066", "1215", "1348", "1415"],
          answer: 1,
          fact: "Sealed at Runnymede in 1215, the Magna Carta established the principle that even the king is subject to the law."
        },
        de: {
          q: "In welchem Jahr besiegelte der englische König Johann Ohneland die Magna Carta?",
          options: ["1066", "1215", "1348", "1415"],
          answer: 1,
          fact: "Die Magna Carta von 1215 gilt als Meilenstein des Verfassungsrechts, weil sie erstmals auch den König an Gesetze band."
        }
      },
      {
        category: "history",
        difficulty: "hard",
        en: {
          q: "Which ancient Mesopotamian civilization developed cuneiform, one of the earliest writing systems?",
          options: ["Sumerians", "Phoenicians", "Hittites", "Minoans"],
          answer: 0,
          fact: "The Sumerians pressed wedge-shaped marks into clay tablets around 3200 BC."
        },
        de: {
          q: "Welche antike Kultur in Mesopotamien entwickelte mit der Keilschrift eines der ältesten Schriftsysteme der Welt?",
          options: ["Sumerer", "Phönizier", "Hethiter", "Minoer"],
          answer: 0,
          fact: "Die Sumerer ritzten um 3200 v. Chr. keilförmige Zeichen mit einem Griffel in weiche Tontafeln."
        }
      },
      {
        category: "history",
        difficulty: "hard",
        en: {
          q: "Who served as Prime Minister of the United Kingdom for most of World War II?",
          options: ["Neville Chamberlain", "Clement Attlee", "Anthony Eden", "Winston Churchill"],
          answer: 3,
          fact: "Winston Churchill became Prime Minister in May 1940 and also won the Nobel Prize in Literature in 1953."
        },
        de: {
          q: "Wer war während des größten Teils des Zweiten Weltkriegs Premierminister Großbritanniens?",
          options: ["Neville Chamberlain", "Clement Attlee", "Anthony Eden", "Winston Churchill"],
          answer: 3,
          fact: "Winston Churchill übernahm das Amt im Mai 1940 und erhielt 1953 sogar den Nobelpreis für Literatur."
        }
      },

      // =====================================================================
      // PAKET 2 (50 FRAGEN – INKL. SCIENCE & TECH)
      // =====================================================================
      {
        category: "science",
        difficulty: "easy",
        en: {
          q: "Which star is at the center of our solar system?",
          options: ["Proxima Centauri", "The Sun", "Sirius", "Polaris"],
          answer: 1,
          fact: "The Sun accounts for about 99.86% of the total mass of our entire solar system."
        },
        de: {
          q: "Welcher Stern bildet das Zentrum unseres Sonnensystems?",
          options: ["Proxima Centauri", "Die Sonne", "Sirius", "Polaris"],
          answer: 1,
          fact: "Die Sonne macht rund 99,86 % der gesamten Masse unseres Sonnensystems aus."
        }
      },
      {
        category: "science",
        difficulty: "easy",
        en: {
          q: "Who developed the theory of general relativity?",
          options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
          answer: 1,
          fact: "Einstein published his theory of general relativity in 1915, describing gravity as the curvature of spacetime."
        },
        de: {
          q: "Wer entwickelte die Allgemeine Relativitätstheorie?",
          options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
          answer: 1,
          fact: "Einstein veröffentlichte die Allgemeine Relativitätstheorie 1915 und erklärte damit Schwerkraft als Krümmung der Raumzeit."
        }
      },
      {
        category: "science",
        difficulty: "easy",
        en: {
          q: "What does 'CPU' stand for in computing?",
          options: ["Central Processing Unit", "Computer Power Utility", "Core Program Unit", "Central Peripheral User"],
          answer: 0,
          fact: "Often called the 'brain' of a computer, the CPU executes instructions from software programs."
        },
        de: {
          q: "Wofür steht die Abkürzung ‚CPU‘ bei Computern?",
          options: ["Central Processing Unit", "Computer Power Utility", "Core Program Unit", "Central Peripheral User"],
          answer: 0,
          fact: "Die CPU gilt als das ‚Gehirn‘ eines Computers und führt sämtliche Rechenbefehle der Programme aus."
        }
      },
      {
        category: "science",
        difficulty: "easy",
        en: {
          q: "How many recognized planets are in our solar system?",
          options: ["7", "8", "9", "10"],
          answer: 1,
          fact: "Pluto was reclassified from a planet to a dwarf planet by the International Astronomical Union in 2006."
        },
        de: {
          q: "Wie viele anerkannte Planeten gibt es in unserem Sonnensystem?",
          options: ["7", "8", "9", "10"],
          answer: 1,
          fact: "Pluto wurde 2006 von der Internationalen Astronomischen Union zum Zwergplaneten herabgestuft."
        }
      },
      {
        category: "science",
        difficulty: "easy",
        en: {
          q: "What is the chemical formula for water?",
          options: ["CO2", "H2O", "O2", "NaCl"],
          answer: 1,
          fact: "Each water molecule consists of two hydrogen atoms bonded to one oxygen atom."
        },
        de: {
          q: "Wie lautet die chemische Formel für Wasser?",
          options: ["CO2", "H2O", "O2", "NaCl"],
          answer: 1,
          fact: "Jedes Wassermolekül besteht aus zwei Wasserstoffatomen und einem Sauerstoffatom."
        }
      },
      {
        category: "science",
        difficulty: "easy",
        en: {
          q: "Which organ pumps blood throughout the human body?",
          options: ["Lungs", "Liver", "Heart", "Kidneys"],
          answer: 2,
          fact: "An average adult heart beats around 100,000 times per day, pumping roughly 5 liters of blood per minute."
        },
        de: {
          q: "Welches Organ pumpt das Blut durch den menschlichen Körper?",
          options: ["Lunge", "Leber", "Herz", "Nieren"],
          answer: 2,
          fact: "Ein menschliches Herz schlägt im Schnitt rund 100.000-mal am Tag und pumpt dabei etwa 5 Liter Blut pro Minute."
        }
      },
      {
        category: "science",
        difficulty: "easy",
        en: {
          q: "What force keeps the planets in orbit around the Sun?",
          options: ["Magnetism", "Gravity", "Friction", "Nuclear force"],
          answer: 1,
          fact: "Gravity pulls objects with mass toward one another, keeping Earth in a stable orbit around the Sun."
        },
        de: {
          q: "Welche Kraft hält die Planeten auf ihrer Umlaufbahn um die Sonne?",
          options: ["Magnetismus", "Gravitation (Schwerkraft)", "Reibung", "Kernkraft"],
          answer: 1,
          fact: "Die Gravitation zieht alle Massen gegenseitig an und hält die Erde stabil auf ihrer Bahn um die Sonne."
        }
      },
      {
        category: "science",
        difficulty: "easy",
        en: {
          q: "Which tech company launched the first iPhone in 2007?",
          options: ["Samsung", "Nokia", "Apple", "Microsoft"],
          answer: 2,
          fact: "Steve Jobs unveiled the original iPhone in January 2007, revolutionizing modern smartphones."
        },
        de: {
          q: "Welches Technologieunternehmen brachte 2007 das erste iPhone auf den Markt?",
          options: ["Samsung", "Nokia", "Apple", "Microsoft"],
          answer: 2,
          fact: "Steve Jobs stellte das erste iPhone im Januar 2007 vor und veränderte damit den Smartphone-Markt grundlegend."
        }
      },
      {
        category: "science",
        difficulty: "easy",
        en: {
          q: "What sweet liquid do honeybees collect from flowers to make honey?",
          options: ["Resin", "Nectar", "Sap", "Dew"],
          answer: 1,
          fact: "Bees collect floral nectar, break down its complex sugars with enzymes, and evaporate water inside the hive."
        },
        de: {
          q: "Welche süße Flüssigkeit sammeln Honigbienen aus Blüten, um daraus Honig herzustellen?",
          options: ["Harz", "Nektar", "Baumsaft", "Tau"],
          answer: 1,
          fact: "Bienen sammeln Blütennektar, spalten den Zucker mithilfe von Enzymen und fächeln ihm im Stock das Wasser aus."
        }
      },
      {
        category: "science",
        difficulty: "medium",
        en: {
          q: "Which cell organelle is famously known as the 'powerhouse of the cell'?",
          options: ["Ribosome", "Nucleus", "Mitochondrion", "Golgi apparatus"],
          answer: 2,
          fact: "Mitochondria generate most of a cell's chemical energy in the form of ATP (adenosine triphosphate)."
        },
        de: {
          q: "Welches Zellorganell wird oft als das ‚Kraftwerk der Zelle‘ bezeichnet?",
          options: ["Ribosom", "Zellkern", "Mitochondrium", "Golgi-Apparat"],
          answer: 2,
          fact: "Mitochondrien produzieren den Großteil der chemischen Zellenergie in Form von ATP (Adenosintriphosphat)."
        }
      },
      {
        category: "science",
        difficulty: "medium",
        en: {
          q: "Who is widely recognized as the world's first computer programmer?",
          options: ["Grace Hopper", "Ada Lovelace", "Margaret Hamilton", "Hedy Lamarr"],
          answer: 1,
          fact: "In the 1840s, Ada Lovelace wrote an algorithm intended to be processed by Charles Babbage's Analytical Engine."
        },
        de: {
          q: "Wer gilt heute weithin als die erste Computerprogrammiererin der Welt?",
          options: ["Grace Hopper", "Ada Lovelace", "Margaret Hamilton", "Hedy Lamarr"],
          answer: 1,
          fact: "Ada Lovelace verfasste bereits in den 1840er-Jahren einen Algorithmus für Charles Babbages mechanische Rechenmaschine."
        }
      },
      {
        category: "science",
        difficulty: "medium",
        en: {
          q: "Which planet is the hottest in our solar system?",
          options: ["Mercury", "Venus", "Mars", "Jupiter"],
          answer: 1,
          fact: "Although Mercury is closer to the Sun, Venus's thick carbon dioxide atmosphere traps heat at around 465 °C."
        },
        de: {
          q: "Welcher Planet ist der heißeste in unserem Sonnensystem?",
          options: ["Merkur", "Venus", "Mars", "Jupiter"],
          answer: 1,
          fact: "Obwohl Merkur näher an der Sonne liegt, sorgt die dichte CO2-Atmosphäre der Venus für rund 465 °C Oberflächentemperatur."
        }
      },
      {
        category: "science",
        difficulty: "medium",
        en: {
          q: "What does the acronym 'DNA' stand for?",
          options: ["Deoxyribonucleic acid", "Dynamic Nuclear Acid", "Dual Nitrogen Atom", "Deoxidized Nucleic Agent"],
          answer: 0,
          fact: "If you stretched out the DNA from a single human cell, it would measure about 2 meters in length."
        },
        de: {
          q: "Wofür steht die Abkürzung ‚DNA‘ (bzw. DNS)?",
          options: ["Desoxyribonukleinsäure", "Dynamische Nuklearsäure", "Duales Stickstoffatom", "Desoxidiertes Nuklearagens"],
          answer: 0,
          fact: "Würde man die DNA einer einzigen menschlichen Zelle vollständig auseinanderziehen, wäre sie rund 2 Meter lang."
        }
      },
      {
        category: "science",
        difficulty: "medium",
        en: {
          q: "In which year did British computer scientist Tim Berners-Lee invent the World Wide Web?",
          options: ["1983", "1989", "1994", "1998"],
          answer: 1,
          fact: "Tim Berners-Lee proposed the World Wide Web while working at CERN in Switzerland to help scientists share information."
        },
        de: {
          q: "In welchem Jahr erfand der britische Informatiker Tim Berners-Lee das World Wide Web?",
          options: ["1983", "1989", "1994", "1998"],
          answer: 1,
          fact: "Tim Berners-Lee entwickelte das World Wide Web am Forschungszentrum CERN, damit Wissenschaftler Daten leichter austauschen konnten."
        }
      },
      {
        category: "science",
        difficulty: "medium",
        en: {
          q: "What type of animal is a Komodo dragon?",
          options: ["Crocodile", "Lizard", "Amphibian", "Snake"],
          answer: 1,
          fact: "Found on Indonesian islands, the Komodo dragon is the largest living species of lizard, growing up to 3 meters long."
        },
        de: {
          q: "Zu welcher Tiergruppe gehört der Komodowaran?",
          options: ["Krokodile", "Echsen", "Amphibien", "Schlangen"],
          answer: 1,
          fact: "Der auf indonesischen Inseln lebende Komodowaran ist die größte lebende Echse der Welt und wird bis zu 3 Meter lang."
        }
      },
      {
        category: "science",
        difficulty: "medium",
        en: {
          q: "Which gas makes up about 78% of Earth's atmosphere?",
          options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Argon"],
          answer: 2,
          fact: "Earth's atmosphere is roughly 78% nitrogen, 21% oxygen, and 1% argon, carbon dioxide, and trace gases."
        },
        de: {
          q: "Welches Gas macht rund 78 % der Erdatmosphäre aus?",
          options: ["Sauerstoff", "Kohlendioxid", "Stickstoff", "Argon"],
          answer: 2,
          fact: "Unsere Luft besteht zu etwa 78 % aus Stickstoff, zu 21 % aus Sauerstoff und zu 1 % aus Argon, CO2 und Spurengasen."
        }
      },
      {
        category: "science",
        difficulty: "medium",
        en: {
          q: "What is the standard SI unit of electrical resistance?",
          options: ["Volt", "Ampere", "Ohm", "Watt"],
          answer: 2,
          fact: "The ohm is named after German physicist Georg Simon Ohm, who formulated Ohm's Law in 1827."
        },
        de: {
          q: "Wie heißt die SI-Einheit für den elektrischen Widerstand?",
          options: ["Volt", "Ampere", "Ohm", "Watt"],
          answer: 2,
          fact: "Die Einheit Ohm wurde nach dem deutschen Physiker Georg Simon Ohm benannt, der 1827 das Ohmsche Gesetz entdeckte."
        }
      },
      {
        category: "science",
        difficulty: "medium",
        en: {
          q: "Which popular programming language was named after the British comedy group Monty Python?",
          options: ["Ruby", "Python", "Java", "Perl"],
          answer: 1,
          fact: "Creator Guido van Rossum named Python after 'Monty Python's Flying Circus' while developing it in the late 1980s."
        },
        de: {
          q: "Welche bekannte Programmiersprache wurde nach der britischen Komikergruppe Monty Python benannt?",
          options: ["Ruby", "Python", "Java", "Perl"],
          answer: 1,
          fact: "Entwickler Guido van Rossum benannte Python Ende der 1980er-Jahre nach ‚Monty Python’s Flying Circus‘."
        }
      },
      {
        category: "science",
        difficulty: "hard",
        en: {
          q: "What is absolute zero—the lowest possible temperature—in degrees Celsius?",
          options: ["-196.15 °C", "-273.15 °C", "-312.50 °C", "-459.67 °C"],
          answer: 1,
          fact: "At -273.15 °C (0 Kelvin), atoms reach their minimum possible thermal motion."
        },
        de: {
          q: "Bei welcher Temperatur liegt der absolute Nullpunkt in Grad Celsius?",
          options: ["-196,15 °C", "-273,15 °C", "-312,50 °C", "-459,67 °C"],
          answer: 1,
          fact: "Am absoluten Nullpunkt (-273,15 °C bzw. 0 Kelvin) besitzen Atome keine thermische Bewegungsenergie mehr."
        }
      },
      {
        category: "science",
        difficulty: "hard",
        en: {
          q: "Which subatomic particle found in an atomic nucleus carries no electric charge?",
          options: ["Proton", "Electron", "Neutron", "Positron"],
          answer: 2,
          fact: "Discovered by James Chadwick in 1932, neutrons stabilize atomic nuclei alongside positively charged protons."
        },
        de: {
          q: "Welches subatomare Teilchen im Atomkern trägt keine elektrische Ladung?",
          options: ["Proton", "Elektron", "Neutron", "Positron"],
          answer: 2,
          fact: "Das 1932 von James Chadwick entdeckte Neutron ist elektrisch neutral und stabilisiert den Atomkern."
        }
      },
      {
        category: "science",
        difficulty: "hard",
        en: {
          q: "What was the name of the single supercontinent that existed around 300 million years ago?",
          options: ["Gondwana", "Laurasia", "Pangaea", "Rodinia"],
          answer: 2,
          fact: "Pangaea began breaking apart about 200 million years ago into the continents we recognize today."
        },
        de: {
          q: "Wie hieß der riesige Superkontinent, auf dem vor rund 300 Millionen Jahren fast alle Landmassen vereint waren?",
          options: ["Gondwana", "Laurasia", "Pangaea", "Rodinia"],
          answer: 2,
          fact: "Pangaea begann vor etwa 200 Millionen Jahren auseinanderzubrechen und formte unsere heutigen Kontinente."
        }
      },
      {
        category: "science",
        difficulty: "hard",
        en: {
          q: "Who discovered X-rays in 1895, earning the very first Nobel Prize in Physics?",
          options: ["Max Planck", "Wilhelm Conrad Röntgen", "Henri Becquerel", "Niels Bohr"],
          answer: 1,
          fact: "Röntgen refused to take out patents on his discovery so that humanity could freely benefit from medical imaging."
        },
        de: {
          q: "Wer entdeckte 1895 die Röntgenstrahlung und erhielt dafür den allerersten Nobelpreis für Physik?",
          options: ["Max Planck", "Wilhelm Conrad Röntgen", "Henri Becquerel", "Niels Bohr"],
          answer: 1,
          fact: "Röntgen verzichtete bewusst auf ein Patent, damit die neue Strahlung der gesamten Medizin frei zur Verfügung stand."
        }
      },
      {
        category: "science",
        difficulty: "hard",
        en: {
          q: "What is the approximate half-life of Carbon-14 used in radiocarbon dating?",
          options: ["573 years", "5,730 years", "57,300 years", "573,000 years"],
          answer: 1,
          fact: "Radiocarbon dating allows archaeologists to determine the age of organic materials up to about 50,000 years old."
        },
        de: {
          q: "Wie lang ist die Halbwertszeit von Kohlenstoff-14 (C-14), mit dem archäologische Funde datiert werden?",
          options: ["573 Jahre", "5.730 Jahre", "57.300 Jahre", "573.000 Jahre"],
          answer: 1,
          fact: "Mit der Radiokarbonmethode lässt sich das Alter organischer Überreste bis zu rund 50.000 Jahre zurück bestimmen."
        }
      },
      {
        category: "science",
        difficulty: "hard",
        en: {
          q: "Which observation states that the number of transistors on a microchip doubles roughly every two years?",
          options: ["Ohm's Law", "Moore's Law", "Amdahl's Law", "Metcalfe's Law"],
          answer: 1,
          fact: "Named after Intel co-founder Gordon Moore in 1965, this trend drove decades of rapid computing growth."
        },
        de: {
          q: "Welche Regel besagt, dass sich die Anzahl der Transistoren auf einem Mikrochip etwa alle zwei Jahre verdoppelt?",
          options: ["Ohmsches Gesetz", "Mooresches Gesetz", "Amdahlsches Gesetz", "Metcalfesches Gesetz"],
          answer: 1,
          fact: "Benannt nach Intel-Mitgründer Gordon Moore (1965), beschrieb diese Regel jahrzehntelang das rasante Wachstum der Rechenleistung."
        }
      },
      {
        category: "science",
        difficulty: "hard",
        en: {
          q: "What is the most abundant metal in Earth's crust?",
          options: ["Iron", "Aluminum", "Copper", "Magnesium"],
          answer: 1,
          fact: "Aluminum makes up about 8% of Earth's crust by weight, mostly locked inside minerals like bauxite."
        },
        de: {
          q: "Welches ist das häufigste Metall in der Erdkruste?",
          options: ["Eisen", "Aluminium", "Kupfer", "Magnesium"],
          answer: 1,
          fact: "Aluminium macht rund 8 % der Masse der Erdkruste aus und kommt dort vor allem gebunden in Mineralien wie Bauxit vor."
        }
      },
      {
        category: "science",
        difficulty: "hard",
        en: {
          q: "Which elementary particle was discovered at CERN in 2012, explaining how other particles acquire mass?",
          options: ["Graviton", "Higgs boson", "Tachyon", "Muon"],
          answer: 1,
          fact: "Predicted in 1964 by Peter Higgs and colleagues, its discovery confirmed a key pillar of the Standard Model of physics."
        },
        de: {
          q: "Welches Elementarteilchen wurde 2012 am CERN nachgewiesen und erklärt, wie andere Teilchen ihre Masse erhalten?",
          options: ["Graviton", "Higgs-Boson", "Tachyon", "Myon"],
          answer: 1,
          fact: "Bereits 1964 theoretisch vorhergesagt, bestätigte der Nachweis des Higgs-Bosons das Standardmodell der Teilchenphysik."
        }
      },
      {
        category: "general",
        difficulty: "easy",
        en: {
          q: "How many colors are traditionally listed in a rainbow?",
          options: ["5", "6", "7", "8"],
          answer: 2,
          fact: "Isaac Newton divided the visible spectrum into seven colors: red, orange, yellow, green, blue, indigo, and violet."
        },
        de: {
          q: "Wie viele Farben werden traditionell einem Regenbogen zugeschrieben?",
          options: ["5", "6", "7", "8"],
          answer: 2,
          fact: "Isaac Newton teilte das sichtbare Lichtspektrum in sieben Farben ein: Rot, Orange, Gelb, Grün, Blau, Indigo und Violett."
        }
      },
      {
        category: "general",
        difficulty: "easy",
        en: {
          q: "How many keys does a standard full-size modern piano have?",
          options: ["76", "82", "88", "92"],
          answer: 2,
          fact: "A full-size piano has 52 white keys and 36 black keys spanning just over seven octaves."
        },
        de: {
          q: "Wie viele Tasten hat ein klassisches Konzertklavier insgesamt?",
          options: ["76", "82", "88", "92"],
          answer: 2,
          fact: "Ein vollwertiges Klavier besitzt 52 weiße und 36 schwarze Tasten über gut sieben Oktaven."
        }
      },
      {
        category: "general",
        difficulty: "easy",
        en: {
          q: "Which language has the largest number of native speakers worldwide?",
          options: ["English", "Spanish", "Mandarin Chinese", "Hindi"],
          answer: 2,
          fact: "Mandarin Chinese has over 900 million native speakers, while English leads in total speakers including second-language users."
        },
        de: {
          q: "Welche Sprache hat weltweit die meisten Muttersprachler?",
          options: ["Englisch", "Spanisch", "Mandarin-Chinesisch", "Hindi"],
          answer: 2,
          fact: "Mandarin-Chinesisch zählt über 900 Millionen Muttersprachler – Englisch führt dagegen bei den Gesamtzahlen inklusive Zweitsprachlern."
        }
      },
      {
        category: "general",
        difficulty: "medium",
        en: {
          q: "In chess, which piece is restricted to moving strictly diagonally?",
          options: ["Rook", "Knight", "Bishop", "Queen"],
          answer: 2,
          fact: "Each player starts with two bishops—one that stays on light squares for the entire game and one on dark squares."
        },
        de: {
          q: "Welche Schachfigur darf sich ausschließlich diagonal über das Brett bewegen?",
          options: ["Turm", "Springer", "Läufer", "Dame"],
          answer: 2,
          fact: "Jeder Spieler startet mit einem weißfeldrigen und einem schwarzfeldrigen Läufer, die ihre Feldfarbe nie wechseln können."
        }
      },
      {
        category: "general",
        difficulty: "medium",
        en: {
          q: "Who wrote the famous tragedy 'Romeo and Juliet'?",
          options: ["Charles Dickens", "William Shakespeare", "Oscar Wilde", "Jane Austen"],
          answer: 1,
          fact: "Shakespeare wrote 'Romeo and Juliet' around 1595, set in the Italian city of Verona."
        },
        de: {
          q: "Wer schrieb das berühmte Theaterstück ‚Romeo und Julia‘?",
          options: ["Charles Dickens", "William Shakespeare", "Oscar Wilde", "Jane Austen"],
          answer: 1,
          fact: "William Shakespeare verfasste ‚Romeo und Julia‘ um 1595; die Handlung spielt in der italienischen Stadt Verona."
        }
      },
      {
        category: "general",
        difficulty: "medium",
        en: {
          q: "What is the official currency of Switzerland?",
          options: ["Euro", "Swiss franc", "Swiss krone", "Alpine mark"],
          answer: 1,
          fact: "Although surrounded by Eurozone countries, Switzerland uses the Swiss franc (CHF), which is also legal tender in Liechtenstein."
        },
        de: {
          q: "Wie heißt die offizielle Währung der Schweiz?",
          options: ["Euro", "Schweizer Franken", "Schweizer Krone", "Alpenmark"],
          answer: 1,
          fact: "Obwohl die Schweiz von Euro-Ländern umgeben ist, zahlt man dort mit dem Schweizer Franken (CHF) – genau wie in Liechtenstein."
        }
      },
      {
        category: "general",
        difficulty: "hard",
        en: {
          q: "What is the medical term for an extreme fear of heights?",
          options: ["Claustrophobia", "Agoraphobia", "Acrophobia", "Arachnophobia"],
          answer: 2,
          fact: "'Acrophobia' comes from the Greek words 'akron' (peak or summit) and 'phobos' (fear)."
        },
        de: {
          q: "Wie lautet der Fachbegriff für krankhafte Höhenangst?",
          options: ["Klaustrophobie", "Agoraphobie", "Akrophobie", "Arachnophobie"],
          answer: 2,
          fact: "Das Wort ‚Akrophobie‘ stammt vom altgriechischen ‚akros‘ (höchst, oberst) und ‚phobos‘ (Furcht)."
        }
      },
      {
        category: "general",
        difficulty: "hard",
        en: {
          q: "How many dots (pips) are there in total on a standard six-sided die?",
          options: ["18", "20", "21", "24"],
          answer: 2,
          fact: "Adding 1 + 2 + 3 + 4 + 5 + 6 equals 21, and opposite sides of a standard die always add up to 7."
        },
        de: {
          q: "Wie viele Augen (Punkte) befinden sich insgesamt auf einem klassischen sechsseitigen Spielwürfel?",
          options: ["18", "20", "21", "24"],
          answer: 2,
          fact: "Die Summe von 1 bis 6 ergibt 21 – und gegenüberliegende Seiten eines Spielwürfels ergeben zusammen immer 7."
        }
      },
      {
        category: "geography",
        difficulty: "easy",
        en: {
          q: "On which continent is the Amazon Rainforest located?",
          options: ["Africa", "Asia", "South America", "Australia"],
          answer: 2,
          fact: "Around 60% of the Amazon Rainforest lies within Brazil, spanning nine South American nations in total."
        },
        de: {
          q: "Auf welchem Kontinent liegt der Amazonas-Regenwald?",
          options: ["Afrika", "Asien", "Südamerika", "Australien"],
          answer: 2,
          fact: "Rund 60 % des Amazonas-Regenwalds liegen in Brasilien; insgesamt erstreckt er sich über neun südamerikanische Länder."
        }
      },
      {
        category: "geography",
        difficulty: "easy",
        en: {
          q: "What is the capital city of Spain?",
          options: ["Barcelona", "Seville", "Valencia", "Madrid"],
          answer: 3,
          fact: "Sitting at about 650 meters above sea level, Madrid is the highest capital city in the European Union."
        },
        de: {
          q: "Wie heißt die Hauptstadt von Spanien?",
          options: ["Barcelona", "Sevilla", "Valencia", "Madrid"],
          answer: 3,
          fact: "Mit rund 650 Metern über dem Meeresspiegel ist Madrid die höchstgelegene Hauptstadt der Europäischen Union."
        }
      },
      {
        category: "geography",
        difficulty: "easy",
        en: {
          q: "Which ocean separates Europe and Africa from North and South America?",
          options: ["Indian Ocean", "Pacific Ocean", "Atlantic Ocean", "Southern Ocean"],
          answer: 2,
          fact: "The Atlantic Ocean is the second-largest ocean in the world, covering roughly 20% of Earth's surface."
        },
        de: {
          q: "Welcher Ozean trennt Europa und Afrika von Nord- und Südamerika?",
          options: ["Indischer Ozean", "Pazifischer Ozean", "Atlantischer Ozean", "Südlicher Ozean"],
          answer: 2,
          fact: "Der Atlantik ist der zweitgrößte Ozean der Erde und bedeckt etwa 20 % der Erdoberfläche."
        }
      },
      {
        category: "geography",
        difficulty: "medium",
        en: {
          q: "Which major city straddles both Europe and Asia across the Bosporus strait?",
          options: ["Athens", "Istanbul", "Ankara", "Baku"],
          answer: 1,
          fact: "Istanbul's historic center lies on the European side, while its residential and commercial districts extend into Asia."
        },
        de: {
          q: "Welche Millionenstadt liegt am Bosporus gleichzeitig auf zwei Kontinenten (Europa und Asien)?",
          options: ["Athen", "Istanbul", "Ankara", "Baku"],
          answer: 1,
          fact: "Die historische Altstadt Istanbuls liegt auf der europäischen Seite, während sich weite Stadtteile auf der asiatischen Seite erstrecken."
        }
      },
      {
        category: "geography",
        difficulty: "medium",
        en: {
          q: "Which is the longest river in Africa?",
          options: ["Congo River", "Zambezi", "Niger River", "Nile"],
          answer: 3,
          fact: "Stretching roughly 6,650 kilometers, the Nile flows northward through 11 countries into the Mediterranean Sea."
        },
        de: {
          q: "Welcher ist der längste Fluss Afrikas?",
          options: ["Kongo", "Sambesi", "Niger", "Nil"],
          answer: 3,
          fact: "Mit rund 6.650 Kilometern Länge fließt der Nil durch 11 Länder nordwärts bis ins Mittelmeer."
        }
      },
      {
        category: "geography",
        difficulty: "medium",
        en: {
          q: "In which country is the prehistoric monument Stonehenge located?",
          options: ["Ireland", "Scotland", "England (United Kingdom)", "Wales"],
          answer: 2,
          fact: "Located on Salisbury Plain in Wiltshire, England, Stonehenge was constructed in stages between 3000 BC and 2000 BC."
        },
        de: {
          q: "In welchem Land befindet sich das berühmte prähistorische Bauwerk Stonehenge?",
          options: ["Irland", "Schottland", "England (Großbritannien)", "Wales"],
          answer: 2,
          fact: "Stonehenge steht in der Grafschaft Wiltshire in Südengland und wurde zwischen 3000 und 2000 v. Chr. errichtet."
        }
      },
      {
        category: "geography",
        difficulty: "hard",
        en: {
          q: "What is the capital city of New Zealand?",
          options: ["Auckland", "Christchurch", "Wellington", "Queenstown"],
          answer: 2,
          fact: "Located at the southern tip of the North Island, Wellington is the southernmost capital of a sovereign state."
        },
        de: {
          q: "Wie heißt die Hauptstadt von Neuseeland?",
          options: ["Auckland", "Christchurch", "Wellington", "Queenstown"],
          answer: 2,
          fact: "Wellington liegt an der Südspitze der Nordinsel und ist damit die südlichste Hauptstadt eines souveränen Staates weltweit."
        }
      },
      {
        category: "geography",
        difficulty: "hard",
        en: {
          q: "Which South American desert is the driest non-polar desert on Earth?",
          options: ["Patagonian Desert", "Atacama Desert", "Sechura Desert", "Monte Desert"],
          answer: 1,
          fact: "Some weather stations in Chile's Atacama Desert have never recorded a single drop of rain."
        },
        de: {
          q: "Welche südamerikanische Wüste gilt als die trockenste nicht-polare Wüste der Erde?",
          options: ["Patagonische Wüste", "Atacama-Wüste", "Sechura-Wüste", "Monte-Wüste"],
          answer: 1,
          fact: "An einigen Wetterstationen in der chilenischen Atacama-Wüste wurde seit Beginn der Aufzeichnungen noch nie Regen gemessen."
        }
      },
      {
        category: "history",
        difficulty: "easy",
        en: {
          q: "In which country did the ancient Olympic Games originate?",
          options: ["Italy", "Greece", "Egypt", "Turkey"],
          answer: 1,
          fact: "The ancient Olympic Games began in Olympia, Greece, in 776 BC and were held every four years for over a millennium."
        },
        de: {
          q: "In welchem Land nahmen die antiken Olympischen Spiele ihren Ursprung?",
          options: ["Italien", "Griechenland", "Ägypten", "Türkei"],
          answer: 1,
          fact: "Die antiken Spiele fanden ab 776 v. Chr. alle vier Jahre im griechischen Heiligtum Olympia statt."
        }
      },
      {
        category: "history",
        difficulty: "easy",
        en: {
          q: "Who was the famous last active ruler of the Ptolemaic Kingdom of Egypt?",
          options: ["Nefertiti", "Hatshepsut", "Cleopatra", "Nefertari"],
          answer: 2,
          fact: "Cleopatra VII ruled Egypt from 51 to 30 BC and was fluent in multiple languages, including Egyptian and Greek."
        },
        de: {
          q: "Wie hieß die berühmte letzte Herrscherin des ägyptischen Ptolemäerreichs?",
          options: ["Nofretete", "Hatschepsut", "Kleopatra", "Nefertari"],
          answer: 2,
          fact: "Kleopatra VII. regierte von 51 bis 30 v. Chr. und sprach als erste Herrscherin ihrer Dynastie auch die Sprache der Ägypter."
        }
      },
      {
        category: "history",
        difficulty: "easy",
        en: {
          q: "Which monumental fortification was built across northern China to protect against nomadic invasions?",
          options: ["Hadrian's Wall", "The Great Wall of China", "The Aurelian Walls", "The Wall of Babylon"],
          answer: 1,
          fact: "Including all its branches and sections built over centuries, the Great Wall stretches over 21,000 kilometers."
        },
        de: {
          q: "Welches monumentale Bauwerk wurde im Norden Chinas zum Schutz vor Reitervölkern errichtet?",
          options: ["Hadrianswall", "Chinesische Mauer", "Aurelianische Mauer", "Mauer von Babylon"],
          answer: 1,
          fact: "Rechnet man alle über Jahrhunderte gebauten Abschnitte zusammen, misst die Chinesische Mauer über 21.000 Kilometer."
        }
      },
      {
        category: "history",
        difficulty: "medium",
        en: {
          q: "Who introduced movable-type printing to Europe in Mainz around 1440?",
          options: ["Albrecht Dürer", "Johannes Gutenberg", "Martin Luther", "Leonardo da Vinci"],
          answer: 1,
          fact: "Gutenberg's printing press sparked an information revolution across Europe, starting with the famous Gutenberg Bible."
        },
        de: {
          q: "Wer erfand um 1440 in Mainz den europäischen Buchdruck mit beweglichen Metalllettern?",
          options: ["Albrecht Dürer", "Johannes Gutenberg", "Martin Luther", "Leonardo da Vinci"],
          answer: 1,
          fact: "Gutenbergs Druckerpresse löste eine Medienrevolution aus und machte Bücher erstmals für breite Schichten erschwinglich."
        }
      },
      {
        category: "history",
        difficulty: "medium",
        en: {
          q: "Which NASA spaceflight was the first to land humans on the Moon?",
          options: ["Apollo 8", "Apollo 10", "Apollo 11", "Apollo 13"],
          answer: 2,
          fact: "Apollo 11 landed on the Moon on July 20, 1969, carrying Neil Armstrong, Buzz Aldrin, and Michael Collins."
        },
        de: {
          q: "Welche NASA-Mission brachte 1969 die ersten Menschen auf den Mond?",
          options: ["Apollo 8", "Apollo 10", "Apollo 11", "Apollo 13"],
          answer: 2,
          fact: "Apollo 11 landete am 20. Juli 1969 mit Neil Armstrong, Buzz Aldrin und Michael Collins im Meer der Ruhe."
        }
      },
      {
        category: "history",
        difficulty: "medium",
        en: {
          q: "What was the ancient network of trade routes connecting China with the Mediterranean called?",
          options: ["Amber Road", "Spice Route", "Silk Road", "Incense Route"],
          answer: 2,
          fact: "Alongside silk, spices, and porcelain, the Silk Road also spread ideas, technologies, and religions across Eurasia."
        },
        de: {
          q: "Wie hieß das antike Netz von Handelswegen, das China mit dem Mittelmeerraum verband?",
          options: ["Bernsteinstraße", "Gewürzroute", "Seidenstraße", "Weihrauchstraße"],
          answer: 2,
          fact: "Über die Seidenstraße wurden nicht nur Seide und Gewürze gehandelt, sondern auch Erfindungen wie Papier und Schießpulver verbreitet."
        }
      },
      {
        category: "history",
        difficulty: "hard",
        en: {
          q: "In which year did the Western Roman Empire traditionally fall when Romulus Augustulus was deposed?",
          options: ["395 AD", "410 AD", "476 AD", "527 AD"],
          answer: 2,
          fact: "In 476 AD, the Germanic chieftain Odoacer deposed young Emperor Romulus Augustulus, marking the end of antiquity in Western Europe."
        },
        de: {
          q: "In welchem Jahr ging das Weströmische Reich durch die Absetzung von Kaiser Romulus Augustulus traditionell unter?",
          options: ["395 n. Chr.", "410 n. Chr.", "476 n. Chr.", "527 n. Chr."],
          answer: 2,
          fact: "476 n. Chr. setzte der germanische Heerführer Odoaker den letzten weströmischen Kaiser ab – oft gilt dies als Ende der Antike."
        }
      },
      {
        category: "history",
        difficulty: "hard",
        en: {
          q: "Which battle in June 1815 marked the final defeat of French Emperor Napoleon Bonaparte?",
          options: ["Battle of Austerlitz", "Battle of Leipzig", "Battle of Trafalgar", "Battle of Waterloo"],
          answer: 3,
          fact: "Defeated near Waterloo (in modern-day Belgium) by British-led and Prussian forces, Napoleon was exiled to Saint Helena."
        },
        de: {
          q: "Welche Schlacht im Juni 1815 besiegelte die endgültige Niederlage von Kaiser Napoleon Bonaparte?",
          options: ["Schlacht bei Austerlitz", "Völkerschlacht bei Leipzig", "Schlacht von Trafalgar", "Schlacht bei Waterloo"],
          answer: 3,
          fact: "Nach seiner Niederlage bei Waterloo (im heutigen Belgien) wurde Napoleon auf die abgelegene Südatlantik-Insel St. Helena verbannt."
        }
      }

      // =====================================================================
      // 👆 NEUE FRAGEN IMMER GENAU ÜBER DIESER ZEILE EINFÜGEN! 👆
      // (Wichtig: Nach der vorherigen letzten Frage ein Komma setzen!)
      // =====================================================================
    ];
