const FALLBACK = {
  objects: [
    { word: 'Umbrella',        hint: 'ribbed'       },
    { word: 'Stapler',         hint: 'heavy'        },
    { word: 'Kettle',          hint: 'curved'       },
    { word: 'Compass',         hint: 'circular'     },
    { word: 'Telescope',       hint: 'hollow'       },
    { word: 'Scissors',        hint: 'lightweight'  },
    { word: 'Thermometer',     hint: 'narrow'       },
    { word: 'Lightbulb',       hint: 'fragile'      },
    { word: 'Broom',           hint: 'wooden'       },
    { word: 'Mirror',          hint: 'dense'        },
    { word: 'Doorknob',        hint: 'cold'         },
    { word: 'Lampshade',       hint: 'conical'      },
    { word: 'Envelope',        hint: 'flat'         },
    { word: 'Toaster',         hint: 'chrome'       },
    { word: 'Candle',          hint: 'tapered'      },
    { word: 'Ruler',           hint: 'marked'       },
    { word: 'Paperclip',       hint: 'springy'      },
    { word: 'Rubber Band',     hint: 'looped'       },
    { word: 'Eraser',          hint: 'soft'         },
    { word: 'Thumbtack',       hint: 'pointed'      },
    { word: 'Tape Measure',    hint: 'coiled'       },
    { word: 'Hammer',          hint: 'balanced'     },
    { word: 'Screwdriver',     hint: 'cylindrical'  },
    { word: 'Padlock',         hint: 'shackled'     },
    { word: 'Zipper',          hint: 'ridged'       },
    { word: 'Thimble',         hint: 'dimpled'      },
    { word: 'Briefcase',       hint: 'latched'      },
    { word: 'Stepladder',      hint: 'folding'      },
    { word: 'Mousetrap',       hint: 'wooden'       },
    { word: 'Hourglass',       hint: 'pinched'      },
    { word: 'Plunger',         hint: 'rubber'       },
    { word: 'Colander',        hint: 'perforated'   },
    { word: 'Coat Hanger',     hint: 'triangular'   },
    { word: 'Alarm Clock',     hint: 'circular'     },
    { word: 'Flashlight',      hint: 'tubular'      },
    { word: 'Notebook',        hint: 'spiral'       },
    { word: 'Wrench',          hint: 'adjustable'   },
    { word: 'Blender',         hint: 'bladed'       },
    { word: 'Safety Pin',      hint: 'bent'         },
    { word: 'Globe',           hint: 'mounted'      },
    { word: 'Clothespin',      hint: 'grooved'      },
    { word: 'Watering Can',    hint: 'spouted'      },
    { word: 'Thermos',         hint: 'smooth'       },
    { word: 'Megaphone',       hint: 'flared'       },
    { word: 'Dustpan',         hint: 'angled'       },
    { word: 'Snow Globe',      hint: 'sealed'       },
    { word: 'Calculator',      hint: 'rectangular'  },
    { word: 'Magnifying Glass',hint: 'circular'     },
    { word: 'Metronome',       hint: 'swinging'     },
    { word: 'Typewriter',      hint: 'heavy'        },
  ],
  people: [
    { word: 'Einstein',             hint: 'unkempt'    },
    { word: 'Cleopatra',            hint: 'draped'     },
    { word: 'Shakespeare',          hint: 'balding'    },
    { word: 'Napoleon',             hint: 'stocky'     },
    { word: 'Darwin',               hint: 'bearded'    },
    { word: 'Newton',               hint: 'bewigged'   },
    { word: 'Nikola Tesla',         hint: 'gaunt'      },
    { word: 'Frida Kahlo',          hint: 'floral'     },
    { word: 'Mozart',               hint: 'powdered'   },
    { word: 'Gandhi',               hint: 'frail'      },
    { word: 'Picasso',              hint: 'prolific'   },
    { word: 'Marie Curie',          hint: 'pallid'     },
    { word: 'Lincoln',              hint: 'bearded'    },
    { word: 'Beethoven',            hint: 'disheveled' },
    { word: 'Michelangelo',         hint: 'muscular'   },
    { word: 'Leonardo da Vinci',    hint: 'mirrored'   },
    { word: 'Julius Caesar',        hint: 'bald'       },
    { word: 'Marilyn Monroe',       hint: 'platinum'   },
    { word: 'Elvis Presley',        hint: 'sequined'   },
    { word: 'Muhammad Ali',         hint: 'athletic'   },
    { word: 'Nelson Mandela',       hint: 'grey'       },
    { word: 'Che Guevara',          hint: 'beret'      },
    { word: 'Rasputin',             hint: 'towering'   },
    { word: 'Queen Victoria',       hint: 'mourning'   },
    { word: 'Karl Marx',            hint: 'bearded'    },
    { word: 'Sigmund Freud',        hint: 'bearded'    },
    { word: 'Winston Churchill',    hint: 'portly'     },
    { word: 'Joan of Arc',          hint: 'armored'    },
    { word: 'Oscar Wilde',          hint: 'tailored'   },
    { word: 'Florence Nightingale', hint: 'uniformed'  },
    { word: 'Mark Twain',           hint: 'white'      },
    { word: 'Edgar Allan Poe',      hint: 'pale'       },
    { word: 'Socrates',             hint: 'barefoot'   },
    { word: 'Alexander the Great',  hint: 'helmeted'   },
    { word: 'Genghis Khan',         hint: 'armored'    },
    { word: 'Catherine the Great',  hint: 'corseted'   },
    { word: 'Charles Dickens',      hint: 'bearded'    },
    { word: 'Ada Lovelace',         hint: 'laced'      },
    { word: 'Galileo',              hint: 'robed'      },
    { word: 'Virginia Woolf',       hint: 'slight'     },
    { word: 'Frederick Douglass',   hint: 'suited'     },
    { word: 'Harriet Tubman',       hint: 'scarred'    },
    { word: 'Marco Polo',           hint: 'cloaked'    },
    { word: 'Dante',                hint: 'crowned'    },
    { word: 'Confucius',            hint: 'robed'      },
    { word: 'Plato',                hint: 'broad'      },
    { word: 'Archimedes',           hint: 'bearded'    },
    { word: 'Charlotte Bronte',     hint: 'slight'     },
    { word: 'Copernicus',           hint: 'bewigged'   },
    { word: 'Harriet Beecher Stowe',hint: 'ringlets'   },
  ],
  food: [
    { word: 'Avocado',     hint: 'pebbly'     },
    { word: 'Sourdough',   hint: 'crusty'     },
    { word: 'Espresso',    hint: 'frothy'     },
    { word: 'Croissant',   hint: 'buttery'    },
    { word: 'Wasabi',      hint: 'green'      },
    { word: 'Mango',       hint: 'pulpy'      },
    { word: 'Brie',        hint: 'bloomy'     },
    { word: 'Pretzel',     hint: 'salted'     },
    { word: 'Kimchi',      hint: 'red'        },
    { word: 'Hummus',      hint: 'pale'       },
    { word: 'Taco',        hint: 'crunchy'    },
    { word: 'Lemon',       hint: 'waxy'       },
    { word: 'Curry',       hint: 'orange'     },
    { word: 'Ramen',       hint: 'wavy'       },
    { word: 'Sushi',       hint: 'wrapped'    },
    { word: 'Cashew',      hint: 'curved'     },
    { word: 'Pomegranate', hint: 'seeded'     },
    { word: 'Artichoke',   hint: 'spiny'      },
    { word: 'Fig',         hint: 'teardrop'   },
    { word: 'Kiwi',        hint: 'fuzzy'      },
    { word: 'Pineapple',   hint: 'spiky'      },
    { word: 'Papaya',      hint: 'hollow'     },
    { word: 'Durian',      hint: 'armored'    },
    { word: 'Lychee',      hint: 'rough'      },
    { word: 'Dragonfruit', hint: 'scaled'     },
    { word: 'Jackfruit',   hint: 'bumpy'      },
    { word: 'Brioche',     hint: 'golden'     },
    { word: 'Focaccia',    hint: 'dimpled'    },
    { word: 'Burrata',     hint: 'creamy'     },
    { word: 'Prosciutto',  hint: 'thin'       },
    { word: 'Mozzarella',  hint: 'stretched'  },
    { word: 'Halloumi',    hint: 'squeaky'    },
    { word: 'Matcha',      hint: 'powdered'   },
    { word: 'Tiramisu',    hint: 'dusted'     },
    { word: 'Gyoza',       hint: 'pleated'    },
    { word: 'Baklava',     hint: 'flaky'      },
    { word: 'Churro',      hint: 'ridged'     },
    { word: 'Bao',         hint: 'steamed'    },
    { word: 'Gnocchi',     hint: 'pillowy'    },
    { word: 'Falafel',     hint: 'crunchy'    },
    { word: 'Tapioca',     hint: 'spherical'  },
    { word: 'Edamame',     hint: 'podded'     },
    { word: 'Tempura',     hint: 'battered'   },
    { word: 'Pierogi',     hint: 'crescent'   },
    { word: 'Pho',         hint: 'clear'      },
    { word: 'Dolma',       hint: 'stuffed'    },
    { word: 'Cannoli',     hint: 'tubular'    },
    { word: 'Shakshuka',   hint: 'crimson'    },
    { word: 'Quiche',      hint: 'fluted'     },
    { word: 'Bibimbap',    hint: 'layered'    },
  ],
  places: [
    { word: 'Tokyo',          hint: 'compact'     },
    { word: 'Venice',         hint: 'waterlogged' },
    { word: 'Sahara',         hint: 'vast'        },
    { word: 'Everest',        hint: 'glacial'     },
    { word: 'Antarctica',     hint: 'barren'      },
    { word: 'New Orleans',    hint: 'humid'       },
    { word: 'Iceland',        hint: 'volcanic'    },
    { word: 'Dubai',          hint: 'golden'      },
    { word: 'Havana',         hint: 'weathered'   },
    { word: 'Bangkok',        hint: 'steamy'      },
    { word: 'Marrakech',      hint: 'terracotta'  },
    { word: 'Reykjavik',      hint: 'grey'        },
    { word: 'Machu Picchu',   hint: 'misty'       },
    { word: 'Amazon',         hint: 'canopied'    },
    { word: 'Patagonia',      hint: 'rugged'      },
    { word: 'Kyoto',          hint: 'manicured'   },
    { word: 'Casablanca',     hint: 'white'       },
    { word: 'Mumbai',         hint: 'dense'       },
    { word: 'Istanbul',       hint: 'domed'       },
    { word: 'Prague',         hint: 'cobbled'     },
    { word: 'Cairo',          hint: 'sandy'       },
    { word: 'Seoul',          hint: 'neon'        },
    { word: 'Sydney',         hint: 'curved'      },
    { word: 'Rome',           hint: 'ancient'     },
    { word: 'Barcelona',      hint: 'tiled'       },
    { word: 'Amsterdam',      hint: 'narrow'      },
    { word: 'Vienna',         hint: 'imperial'    },
    { word: 'Moscow',         hint: 'gilded'      },
    { word: 'New York',       hint: 'gridded'     },
    { word: 'London',         hint: 'misty'       },
    { word: 'Paris',          hint: 'ornate'      },
    { word: 'San Francisco',  hint: 'hilly'       },
    { word: 'Las Vegas',      hint: 'illuminated' },
    { word: 'Shanghai',       hint: 'mirrored'    },
    { word: 'Santorini',      hint: 'white'       },
    { word: 'Petra',          hint: 'carved'      },
    { word: 'Pompeii',        hint: 'preserved'   },
    { word: 'Niagara',        hint: 'misted'      },
    { word: 'Galapagos',      hint: 'isolated'    },
    { word: 'Bali',           hint: 'terraced'    },
    { word: 'Chernobyl',      hint: 'abandoned'   },
    { word: 'Kathmandu',      hint: 'layered'     },
    { word: 'Rio de Janeiro',  hint: 'carved'      },
    { word: 'Cape Town',      hint: 'coastal'     },
    { word: 'Nairobi',        hint: 'equatorial'  },
    { word: 'Buenos Aires',   hint: 'gridded'     },
    { word: 'Tehran',         hint: 'walled'      },
    { word: 'Silicon Valley', hint: 'flat'        },
    { word: 'Johannesburg',   hint: 'elevated'    },
    { word: 'Tangier',        hint: 'whitewashed' },
  ],
  movies: [
    { word: 'The Matrix',                     hint: 'tinted'      },
    { word: 'Titanic',                        hint: 'misty'       },
    { word: 'Shrek',                          hint: 'muddy'       },
    { word: 'Jaws',                           hint: 'coastal'     },
    { word: 'Grease',                         hint: 'slicked'     },
    { word: 'Inception',                      hint: 'layered'     },
    { word: 'Parasite',                       hint: 'underground' },
    { word: 'Frozen',                         hint: 'sequined'    },
    { word: 'Spirited Away',                  hint: 'steamy'      },
    { word: 'Interstellar',                   hint: 'dusty'       },
    { word: 'Get Out',                        hint: 'suburban'    },
    { word: 'Clueless',                       hint: 'plaid'       },
    { word: 'Psycho',                         hint: 'monochrome'  },
    { word: 'Up',                             hint: 'grey'        },
    { word: 'Alien',                          hint: 'cramped'     },
    { word: 'Gladiator',                      hint: 'sandy'       },
    { word: 'The Godfather',                  hint: 'shadowed'    },
    { word: 'Jurassic Park',                  hint: 'lush'        },
    { word: 'Pulp Fiction',                   hint: 'checkered'   },
    { word: 'Schindler\'s List',              hint: 'ashen'       },
    { word: 'The Shining',                    hint: 'carpeted'    },
    { word: 'Fight Club',                     hint: 'grimy'       },
    { word: 'Joker',                          hint: 'golden'      },
    { word: 'Mad Max Fury Road',              hint: 'rust'        },
    { word: 'La La Land',                     hint: 'pastel'      },
    { word: 'Moonlight',                      hint: 'blue'        },
    { word: 'Her',                            hint: 'beige'       },
    { word: '2001 A Space Odyssey',           hint: 'sterile'     },
    { word: 'Blade Runner',                   hint: 'neon'        },
    { word: 'Amelie',                         hint: 'saturated'   },
    { word: 'The Grand Budapest Hotel',       hint: 'pink'        },
    { word: 'Whiplash',                       hint: 'shadowed'    },
    { word: 'Dune',                           hint: 'amber'       },
    { word: 'Avatar',                         hint: 'luminous'    },
    { word: 'Princess Mononoke',              hint: 'lush'        },
    { word: 'Hereditary',                     hint: 'shadowed'    },
    { word: 'Midsommar',                      hint: 'bright'      },
    { word: 'The Lighthouse',                 hint: 'stormy'      },
    { word: 'Moonrise Kingdom',               hint: 'striped'     },
    { word: 'Forrest Gump',                   hint: 'seated'      },
    { word: 'Black Panther',                  hint: 'purple'      },
    { word: 'Train to Busan',                 hint: 'confined'    },
    { word: 'Oldboy',                         hint: 'cramped'     },
    { word: 'Pan\'s Labyrinth',               hint: 'golden'      },
    { word: 'No Country for Old Men',         hint: 'desolate'    },
    { word: 'There Will Be Blood',            hint: 'arid'        },
    { word: 'Everything Everywhere All at Once', hint: 'fractured' },
    { word: 'Grave of the Fireflies',         hint: 'amber'       },
    { word: 'Waltz with Bashir',              hint: 'animated'    },
    { word: 'Parasite',                       hint: 'underground' },
  ],
  animals: [
    { word: 'Octopus',        hint: 'suckered'    },
    { word: 'Flamingo',       hint: 'wading'      },
    { word: 'Chameleon',      hint: 'scaly'       },
    { word: 'Platypus',       hint: 'webbed'      },
    { word: 'Eagle',          hint: 'taloned'     },
    { word: 'Crab',           hint: 'shelled'     },
    { word: 'Bat',            hint: 'furry'       },
    { word: 'Dolphin',        hint: 'smooth'      },
    { word: 'Elephant',       hint: 'wrinkled'    },
    { word: 'Sloth',          hint: 'gripping'    },
    { word: 'Giraffe',        hint: 'spotted'     },
    { word: 'Penguin',        hint: 'compact'     },
    { word: 'Koala',          hint: 'fluffy'      },
    { word: 'Narwhal',        hint: 'pale'        },
    { word: 'Mantis Shrimp',  hint: 'armored'     },
    { word: 'Axolotl',        hint: 'feathered'   },
    { word: 'Pangolin',       hint: 'scaled'      },
    { word: 'Manatee',        hint: 'rounded'     },
    { word: 'Capybara',       hint: 'stocky'      },
    { word: 'Manta Ray',      hint: 'flat'        },
    { word: 'Hammerhead',     hint: 'wide'        },
    { word: 'Puffer Fish',    hint: 'spiny'       },
    { word: 'Cassowary',      hint: 'helmeted'    },
    { word: 'Cuttlefish',     hint: 'iridescent'  },
    { word: 'Peacock',        hint: 'trailing'    },
    { word: 'Hummingbird',    hint: 'iridescent'  },
    { word: 'Jellyfish',      hint: 'translucent' },
    { word: 'Sea Horse',      hint: 'bony'        },
    { word: 'Albatross',      hint: 'gliding'     },
    { word: 'Armadillo',      hint: 'segmented'   },
    { word: 'Fennec Fox',     hint: 'sandy'       },
    { word: 'Snow Leopard',   hint: 'spotted'     },
    { word: 'Electric Eel',   hint: 'elongated'   },
    { word: 'Piranha',        hint: 'serrated'    },
    { word: 'Warthog',        hint: 'maned'       },
    { word: 'Binturong',      hint: 'bristled'    },
    { word: 'Ocelot',         hint: 'striped'     },
    { word: 'Mudskipper',     hint: 'bulging'     },
    { word: 'Proboscis Monkey', hint: 'pendulous' },
    { word: 'Mandrill',       hint: 'vivid'       },
    { word: 'Tapir',          hint: 'grey'        },
    { word: 'Hagfish',        hint: 'slimy'       },
    { word: 'Blobfish',       hint: 'droopy'      },
    { word: 'Aye-aye',        hint: 'wide-eyed'   },
    { word: 'Porcupine',      hint: 'bristled'    },
    { word: 'Kiwi Bird',      hint: 'oval'        },
    { word: 'Starfish',       hint: 'patterned'   },
    { word: 'Lemur',          hint: 'striped'     },
    { word: 'Okapi',          hint: 'striped'     },
    { word: 'Echidna',        hint: 'spiny'       },
  ],
  brands: [
    { word: 'Lego',           hint: 'colorful'    },
    { word: 'Nike',           hint: 'cushioned'   },
    { word: 'Apple',          hint: 'minimal'     },
    { word: 'Ikea',           hint: 'flat'        },
    { word: 'Netflix',        hint: 'red'         },
    { word: 'Tesla',          hint: 'silent'      },
    { word: 'Google',         hint: 'multicolored'},
    { word: 'Spotify',        hint: 'green'       },
    { word: 'Adidas',         hint: 'rubbery'     },
    { word: 'Disney',         hint: 'golden'      },
    { word: 'Amazon',         hint: 'cardboard'   },
    { word: 'Airbnb',         hint: 'listed'      },
    { word: 'Rolex',          hint: 'waterproof'  },
    { word: 'Polaroid',       hint: 'white'       },
    { word: 'Vespa',          hint: 'chrome'      },
    { word: 'Starbucks',      hint: 'green'       },
    { word: 'Coca-Cola',      hint: 'curved'      },
    { word: 'Harley-Davidson',hint: 'rumbling'    },
    { word: 'Levi\'s',        hint: 'riveted'     },
    { word: 'Ray-Ban',        hint: 'shaded'      },
    { word: 'Moleskine',      hint: 'elastic'     },
    { word: 'Zippo',          hint: 'hinged'      },
    { word: 'Bic',            hint: 'transparent' },
    { word: 'Sharpie',        hint: 'thick'       },
    { word: 'Windex',         hint: 'blue'        },
    { word: 'Tupperware',     hint: 'lidded'      },
    { word: 'Crocs',          hint: 'perforated'  },
    { word: 'Vans',           hint: 'checkered'   },
    { word: 'Dyson',          hint: 'transparent' },
    { word: 'Stanley',        hint: 'ribbed'      },
    { word: 'Post-it',        hint: 'square'      },
    { word: 'Band-Aid',       hint: 'beige'       },
    { word: 'Ferrari',        hint: 'low'         },
    { word: 'Balenciaga',     hint: 'chunky'      },
    { word: 'Supreme',        hint: 'boxed'       },
    { word: 'Lodge',          hint: 'seasoned'    },
    { word: 'Thermos',        hint: 'cylindrical' },
    { word: 'Kleenex',        hint: 'white'       },
    { word: 'Swiffer',        hint: 'padded'      },
    { word: 'McDonald\'s',    hint: 'arched'      },
  ],
  colors: [
    { word: 'Cerulean',   hint: 'oceanic'    },
    { word: 'Magenta',    hint: 'electric'   },
    { word: 'Ochre',      hint: 'earthy'     },
    { word: 'Lavender',   hint: 'pale'       },
    { word: 'Crimson',    hint: 'deep'       },
    { word: 'Turquoise',  hint: 'cool'       },
    { word: 'Ivory',      hint: 'yellowed'   },
    { word: 'Maroon',     hint: 'muted'      },
    { word: 'Indigo',     hint: 'saturated'  },
    { word: 'Chartreuse', hint: 'acidic'     },
    { word: 'Coral',      hint: 'warm'       },
    { word: 'Teal',       hint: 'muted'      },
    { word: 'Scarlet',    hint: 'vivid'      },
    { word: 'Amber',      hint: 'golden'     },
    { word: 'Mauve',      hint: 'dusty'      },
    { word: 'Vermillion', hint: 'fiery'      },
    { word: 'Sienna',     hint: 'rusty'      },
    { word: 'Periwinkle', hint: 'soft'       },
    { word: 'Sage',       hint: 'silvery'    },
    { word: 'Burgundy',   hint: 'rich'       },
    { word: 'Terracotta', hint: 'grainy'     },
    { word: 'Cobalt',     hint: 'intense'    },
    { word: 'Ecru',       hint: 'beige'      },
    { word: 'Fuchsia',    hint: 'bold'       },
    { word: 'Lilac',      hint: 'airy'       },
    { word: 'Slate',      hint: 'stony'      },
    { word: 'Tangerine',  hint: 'bright'     },
    { word: 'Sepia',      hint: 'faded'      },
    { word: 'Mustard',    hint: 'thick'      },
    { word: 'Plum',       hint: 'dark'       },
    { word: 'Champagne',  hint: 'luminous'   },
    { word: 'Jade',       hint: 'opaque'     },
    { word: 'Khaki',      hint: 'military'   },
    { word: 'Cyan',       hint: 'bright'     },
    { word: 'Umber',      hint: 'dark'       },
    { word: 'Celadon',    hint: 'translucent'},
    { word: 'Azure',      hint: 'airy'       },
    { word: 'Carmine',    hint: 'rich'       },
    { word: 'Viridian',   hint: 'saturated'  },
    { word: 'Tawny',      hint: 'tanned'     },
  ],
  sports: [
    { word: 'Chess',               hint: 'wooden'      },
    { word: 'Curling',             hint: 'slippery'    },
    { word: 'Polo',                hint: 'muddy'       },
    { word: 'Fencing',             hint: 'masked'      },
    { word: 'Archery',             hint: 'taut'        },
    { word: 'Gymnastics',          hint: 'padded'      },
    { word: 'Rowing',              hint: 'rhythmic'    },
    { word: 'Snooker',             hint: 'green'       },
    { word: 'Diving',              hint: 'tucked'      },
    { word: 'Wrestling',           hint: 'barefoot'    },
    { word: 'Sumo',                hint: 'circular'    },
    { word: 'Lacrosse',            hint: 'netted'      },
    { word: 'Bobsled',             hint: 'crouched'    },
    { word: 'Triathlon',           hint: 'sequential'  },
    { word: 'Weightlifting',       hint: 'belted'      },
    { word: 'Synchronized Swimming', hint: 'capped'   },
    { word: 'Dressage',            hint: 'uniformed'   },
    { word: 'Kabaddi',             hint: 'barefoot'    },
    { word: 'Hurling',             hint: 'helmeted'    },
    { word: 'Jai Alai',            hint: 'gloved'      },
    { word: 'Capoeira',            hint: 'fluid'       },
    { word: 'Kendo',               hint: 'armored'     },
    { word: 'Sepak Takraw',        hint: 'woven'       },
    { word: 'Bocce',               hint: 'weighted'    },
    { word: 'Croquet',             hint: 'hooped'      },
    { word: 'Squash',              hint: 'enclosed'    },
    { word: 'Badminton',           hint: 'feathered'   },
    { word: 'Table Tennis',        hint: 'bouncy'      },
    { word: 'Luge',                hint: 'horizontal'  },
    { word: 'Skeleton',            hint: 'prone'       },
    { word: 'Speed Skating',       hint: 'bladed'      },
    { word: 'Figure Skating',      hint: 'sequined'    },
    { word: 'Rhythmic Gymnastics', hint: 'ribboned'    },
    { word: 'Judo',                hint: 'belted'      },
    { word: 'Taekwondo',           hint: 'barefoot'    },
    { word: 'Rock Climbing',       hint: 'harnessed'   },
    { word: 'Surfing',             hint: 'waxed'       },
    { word: 'Handball',            hint: 'gloved'      },
    { word: 'Biathlon',            hint: 'layered'     },
    { word: 'Freestyle Skiing',    hint: 'airborne'    },
    { word: 'Pelota',              hint: 'walled'      },
    { word: 'Netball',             hint: 'circular'    },
    { word: 'Kickboxing',          hint: 'wrapped'     },
    { word: 'Volleyball',          hint: 'soft'        },
    { word: 'Softball',            hint: 'underslung'  },
    { word: 'Equestrian',          hint: 'stirruped'   },
    { word: 'Cross-country Skiing',hint: 'tracked'     },
    { word: 'Canoe Polo',          hint: 'helmeted'    },
    { word: 'Racquetball',         hint: 'rubberized'  },
    { word: 'Karate',              hint: 'barefoot'    },
  ],
  jobs: [
    { word: 'Sommelier',          hint: 'swirling'    },
    { word: 'Lighthouse Keeper',  hint: 'isolated'    },
    { word: 'Cobbler',            hint: 'patched'     },
    { word: 'Glassblower',        hint: 'molten'      },
    { word: 'Falconer',           hint: 'gloved'      },
    { word: 'Locksmith',          hint: 'delicate'    },
    { word: 'Taxidermist',        hint: 'preserved'   },
    { word: 'Cartographer',       hint: 'detailed'    },
    { word: 'Astronaut',          hint: 'suited'      },
    { word: 'Auctioneer',         hint: 'rapid'       },
    { word: 'Puppeteer',          hint: 'hidden'      },
    { word: 'Apiarist',           hint: 'veiled'      },
    { word: 'Stenographer',       hint: 'shorthand'   },
    { word: 'Archivist',          hint: 'dusty'       },
    { word: 'Embalmer',           hint: 'sealed'      },
    { word: 'Farrier',            hint: 'heated'      },
    { word: 'Chandler',           hint: 'waxy'        },
    { word: 'Cooper',             hint: 'hooped'      },
    { word: 'Tanner',             hint: 'soaked'      },
    { word: 'Thatcher',           hint: 'layered'     },
    { word: 'Miller',             hint: 'grinding'    },
    { word: 'Wheelwright',        hint: 'spoked'      },
    { word: 'Blacksmith',         hint: 'hammered'    },
    { word: 'Fletcher',           hint: 'feathered'   },
    { word: 'Boatwright',         hint: 'caulked'     },
    { word: 'Actuary',            hint: 'calculated'  },
    { word: 'Ornithologist',      hint: 'spotted'     },
    { word: 'Lepidopterist',      hint: 'pinned'      },
    { word: 'Glaciologist',       hint: 'cored'       },
    { word: 'Volcanologist',      hint: 'shielded'    },
    { word: 'Podiatrist',         hint: 'calloused'   },
    { word: 'Orthodontist',       hint: 'braced'      },
    { word: 'Phlebotomist',       hint: 'needled'     },
    { word: 'Milliner',           hint: 'brimmed'     },
    { word: 'Saddler',            hint: 'stitched'    },
    { word: 'Tinker',             hint: 'soldered'    },
    { word: 'Scrimshander',       hint: 'carved'      },
    { word: 'Gondolier',          hint: 'standing'    },
    { word: 'Ice Sculptor',       hint: 'chiseled'    },
    { word: 'Oil Rigger',         hint: 'elevated'    },
    { word: 'Furrier',            hint: 'pelted'      },
    { word: 'Calligrapher',       hint: 'brushed'     },
    { word: 'Cryptographer',      hint: 'coded'       },
    { word: 'Somnologist',        hint: 'monitored'   },
    { word: 'Haberdasher',        hint: 'buttoned'    },
    { word: 'Town Crier',         hint: 'uniformed'   },
    { word: 'Grave Digger',       hint: 'muddy'       },
    { word: 'Sand Artist',        hint: 'sculpted'    },
    { word: 'Pewterer',           hint: 'molded'      },
    { word: 'Cordwainer',         hint: 'lasted'      },
  ],
  emotions: [
    { word: 'Nostalgia',       hint: 'faded'      },
    { word: 'Schadenfreude',   hint: 'concealed'  },
    { word: 'Awe',             hint: 'paralyzed'  },
    { word: 'Dread',           hint: 'leaden'     },
    { word: 'Elation',         hint: 'weightless' },
    { word: 'Melancholy',      hint: 'grey'       },
    { word: 'Envy',            hint: 'sour'       },
    { word: 'Euphoria',        hint: 'rushing'    },
    { word: 'Longing',         hint: 'hollow'     },
    { word: 'Remorse',         hint: 'crushing'   },
    { word: 'Spite',           hint: 'pointed'    },
    { word: 'Serenity',        hint: 'quiet'      },
    { word: 'Giddy',           hint: 'fizzing'    },
    { word: 'Wistful',         hint: 'soft'       },
    { word: 'Contempt',        hint: 'tight'      },
    { word: 'Anguish',         hint: 'raw'        },
    { word: 'Apprehension',    hint: 'tightened'  },
    { word: 'Reverence',       hint: 'hushed'     },
    { word: 'Indignation',     hint: 'heated'     },
    { word: 'Resignation',     hint: 'slumped'    },
    { word: 'Bewilderment',    hint: 'scattered'  },
    { word: 'Exhilaration',    hint: 'sharp'      },
    { word: 'Lethargy',        hint: 'heavy'      },
    { word: 'Anticipation',    hint: 'taut'       },
    { word: 'Mortification',   hint: 'flushed'    },
    { word: 'Seething',        hint: 'smoldering' },
    { word: 'Yearning',        hint: 'stretched'  },
    { word: 'Foreboding',      hint: 'cold'       },
    { word: 'Jubilation',      hint: 'buoyant'    },
    { word: 'Tranquility',     hint: 'still'      },
    { word: 'Disillusionment', hint: 'flat'       },
    { word: 'Fervor',          hint: 'burning'    },
    { word: 'Tenderness',      hint: 'warm'       },
    { word: 'Resentment',      hint: 'lingering'  },
    { word: 'Rapture',         hint: 'soaring'    },
    { word: 'Desolation',      hint: 'empty'      },
    { word: 'Chagrin',         hint: 'stinging'   },
    { word: 'Exasperation',    hint: 'clenched'   },
    { word: 'Incredulity',     hint: 'frozen'     },
    { word: 'Disquiet',        hint: 'restless'   },
  ],
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { categories = [], usedWords = [], server } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  const categoryList = categories.length > 0 ? categories.join(', ') : 'everyday objects, animals, food, places';
  const avoidClause = usedWords.length > 0
    ? `\nDo NOT pick any of these already-used words: ${usedWords.join(', ')}.`
    : '';

  const prompt = `You are the word engine for a party deduction game called "Imposter Who?".

Pick ONE secret word from these categories: ${categoryList}${avoidClause}

Rules for the word:
- Must be a single common noun (not a phrase)
- Specific enough to be interesting, common enough that most people know it
- Avoid overly abstract words

Rules for the imposter hint:
- The imposter does NOT know the word — give them a one-word clue they can drop into conversation to sound like they know it
- The hint must be a SINGLE word only — no phrases, no "It's ...", no punctuation
- The hint MUST pass TWO tests:
  1. WIDELY KNOWN: most people would immediately nod and say "yeah, that's true of it" — not an obscure fact
  2. NOT THE FIRST THING: it shouldn't be the single most iconic property that defines the word
- Bad hints fail test 1 — too obscure, imposter sounds clueless:
  * cucumber → ribbed ❌ (most people don't think of cucumbers as ribbed — imposter sounds wrong)
  * shark → cartilage ❌ (biology trivia, not something you'd naturally say)
  * piano → lacquered ❌ (too specific, sounds weird in conversation)
- Bad hints fail test 2 — too defining, gives away the word immediately:
  * clock → ticking ❌ (most iconic clock property)
  * pen → ink ❌ (first thing anyone says about a pen)
  * banana → yellow ❌ (too defining)
- Good hints pass BOTH tests — widely known AND not the first thing you'd say:
  * cashew → curved ✓ (everyone knows the shape, but "curved" doesn't instantly scream cashew)
  * cucumber → crunchy ✓ (everyone agrees, but crunchy fits carrots/apples/chips too)
  * clock → round ✓ (obviously true, but round fits many things)
  * shark → silent ✓ (people know sharks are quiet hunters, but silent fits many things)
  * candle → drips ✓ (everyone has seen candle wax drip, but drips fits many things)
  * guitar → hollow ✓ (widely known, but hollow fits drums/caves/chocolate eggs too)
- The hint MUST be a direct physical or behavioural property of the word itself — NOT a cultural association, movie reference, song, brand, or thing "related to" it
- Ask: "does the word itself actually have this property?" — if you're thinking of a movie, song, or brand connected to the word, that's wrong
- Ask: "if the imposter says this word mid-conversation, would the other players think it makes sense?" — if yes, it's good
- Never just name the category

Respond with ONLY valid JSON, no markdown, no explanation:
{"word": "...", "hint": "..."}`;

  // ── helpers ──────────────────────────────────────────────────
  function parseResult(text) {
    const noThink = text.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
    const stripped = noThink.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
    const match = stripped.match(/\{[\s\S]*\}/);
    if (!match) throw new Error(`No JSON in: ${text}`);
    const result = JSON.parse(match[0]);
    if (!result.word || !result.hint) throw new Error(`Incomplete JSON: ${text}`);
    return { word: result.word, hint: result.hint };
  }

  // ── Server 1: Groq qwen3-32b (14,400 req/day — try first) ──────
  if (!server || server === 1) {
    const groqKey = process.env.GROQ_API_KEY;
    try {
      if (!groqKey) throw new Error('No Groq key');
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqKey}`,
        },
        body: JSON.stringify({
          model: 'qwen/qwen3-32b',
          messages: [{ role: 'user', content: prompt }],
          temperature: 1,
          max_completion_tokens: 4000,
          top_p: 1,
          stream: false,
          stop: null,
          reasoning_effort: 'default',
          reasoning_format: 'raw',
        }),
      });
      if (!response.ok) throw new Error(`Groq ${response.status}`);
      const data = await response.json();
      const text = data?.choices?.[0]?.message?.content?.trim() || '';
      const output = parseResult(text);
      console.log('Server 1 (Groq) output:', JSON.stringify(output));
      return res.json(output);
    } catch (err) {
      console.error('Server 1 (Groq) failed:', err.message);
      if (server === 1) return res.status(502).json({ error: err.message });
    }
  }

  // ── Server 2: Ollama Cloud gemma3:4b (free, fast) ────────────
  if (!server || server === 2) {
    const ollamaKey = process.env.OLLAMA_API_KEY;
    try {
      if (!ollamaKey) throw new Error('No Ollama key');
      const response = await fetch('https://ollama.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ollamaKey}`,
        },
        body: JSON.stringify({
          model: 'gemma3:4b-cloud',
          messages: [{ role: 'user', content: prompt }],
          stream: false,
        }),
      });
      if (!response.ok) throw new Error(`Ollama ${response.status}: ${await response.text()}`);
      const data = await response.json();
      const text = data?.choices?.[0]?.message?.content?.trim() || '';
      const output = parseResult(text);
      console.log('Server 2 (Ollama) output:', JSON.stringify(output));
      return res.json(output);
    } catch (err) {
      console.error('Server 2 (Ollama) failed:', err.message);
      if (server === 2) return res.status(502).json({ error: err.message });
    }
  }

  // ── Server 3: OpenRouter gpt-oss-120b (free, slower) ───────────
  if (!server || server === 3) {
    const orKey = process.env.OPENROUTER_API_KEY;
    try {
      if (!orKey) throw new Error('No OpenRouter key');
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${orKey}`,
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-120b:free',
          messages: [{ role: 'user', content: prompt }],
          reasoning: { enabled: true },
        }),
      });
      if (!response.ok) throw new Error(`OpenRouter ${response.status}`);
      const data = await response.json();
      const text = data?.choices?.[0]?.message?.content?.trim() || '';
      const output = parseResult(text);
      console.log('Server 3 (OpenRouter) output:', JSON.stringify(output));
      return res.json(output);
    } catch (err) {
      console.error('Server 3 (OpenRouter) failed:', err.message);
      if (server === 3) return res.status(502).json({ error: err.message });
    }
  }

  // ── Server 4: Gemini 2.0 Flash (1,500 req/day — last AI resort) ─
  if (!server || server === 4) {
    try {
      if (!apiKey) throw new Error('No Gemini key');
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 1.0, maxOutputTokens: 8192 },
          }),
        }
      );
      if (!response.ok) throw new Error(`Gemini ${response.status}`);
      const data = await response.json();
      const parts = data?.candidates?.[0]?.content?.parts || [];
      const text = parts.filter(p => !p.thought).map(p => p.text || '').join('').trim();
      const output = parseResult(text);
      console.log('Server 4 (Gemini) output:', JSON.stringify(output));
      return res.json(output);
    } catch (err) {
      console.error('Server 4 (Gemini) failed:', err.message);
      if (server === 4) return res.status(502).json({ error: err.message });
    }
  }

  // ── Fallback: hardcoded list ──────────────────────────────────
  const pool = categories.length > 0
    ? categories.flatMap(c => FALLBACK[c] || [])
    : Object.values(FALLBACK).flat();

  const available = pool.filter(
    item => !usedWords.map(w => w.toLowerCase()).includes(item.word.toLowerCase())
  );
  const pick = available.length > 0
    ? available[Math.floor(Math.random() * available.length)]
    : pool[Math.floor(Math.random() * pool.length)];

  console.log('Hardcoded fallback output:', JSON.stringify(pick));
  res.json(pick);
}
