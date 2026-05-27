const FALLBACK = {
  objects: [
    { word: 'Umbrella',    hint: 'folds' },
    { word: 'Stapler',     hint: 'clicks' },
    { word: 'Kettle',      hint: 'whistles' },
    { word: 'Compass',     hint: 'spins' },
    { word: 'Telescope',   hint: 'extends' },
    { word: 'Scissors',    hint: 'hinged' },
    { word: 'Thermometer', hint: 'rises' },
    { word: 'Lightbulb',   hint: 'glows' },
    { word: 'Broom',       hint: 'bristles' },
    { word: 'Mirror',      hint: 'reflects' },
    { word: 'Doorknob',    hint: 'turns' },
    { word: 'Lampshade',   hint: 'diffuses' },
    { word: 'Envelope',    hint: 'sealed' },
    { word: 'Toaster',     hint: 'slots' },
    { word: 'Candle',      hint: 'wax' },
  ],
  people: [
    { word: 'Einstein',       hint: 'equations' },
    { word: 'Cleopatra',      hint: 'eyeliner' },
    { word: 'Shakespeare',    hint: 'quill' },
    { word: 'Napoleon',       hint: 'exiled' },
    { word: 'Darwin',         hint: 'voyage' },
    { word: 'Newton',         hint: 'fell' },
    { word: 'Tesla',          hint: 'coils' },
    { word: 'Frida Kahlo',    hint: 'brows' },
    { word: 'Mozart',         hint: 'prodigy' },
    { word: 'Gandhi',         hint: 'fasted' },
    { word: 'Picasso',        hint: 'fragmented' },
    { word: 'Marie Curie',    hint: 'glow' },
    { word: 'Lincoln',        hint: 'tall' },
    { word: 'Beethoven',      hint: 'deaf' },
    { word: 'Nikola Tesla',   hint: 'sparks' },
  ],
  food: [
    { word: 'Avocado',    hint: 'pit' },
    { word: 'Sourdough',  hint: 'tangy' },
    { word: 'Espresso',   hint: 'bitter' },
    { word: 'Croissant',  hint: 'layered' },
    { word: 'Wasabi',     hint: 'burns' },
    { word: 'Mango',      hint: 'drips' },
    { word: 'Brie',       hint: 'rind' },
    { word: 'Pretzel',    hint: 'twisted' },
    { word: 'Kimchi',     hint: 'fermented' },
    { word: 'Hummus',     hint: 'smooth' },
    { word: 'Taco',       hint: 'folded' },
    { word: 'Lemon',      hint: 'puckers' },
    { word: 'Curry',      hint: 'stains' },
    { word: 'Ramen',      hint: 'broth' },
    { word: 'Sushi',      hint: 'rolled' },
  ],
  places: [
    { word: 'Tokyo',        hint: 'neon' },
    { word: 'Venice',       hint: 'sinking' },
    { word: 'Sahara',       hint: 'dunes' },
    { word: 'Everest',      hint: 'summit' },
    { word: 'Antarctica',   hint: 'frozen' },
    { word: 'New Orleans',  hint: 'jazz' },
    { word: 'Iceland',      hint: 'geysers' },
    { word: 'Dubai',        hint: 'towers' },
    { word: 'Havana',       hint: 'vintage' },
    { word: 'Bangkok',      hint: 'traffic' },
    { word: 'Marrakech',    hint: 'spices' },
    { word: 'Reykjavik',    hint: 'aurora' },
    { word: 'Machu Picchu', hint: 'ruins' },
    { word: 'Amazon',       hint: 'dense' },
    { word: 'Patagonia',    hint: 'wind' },
  ],
  movies: [
    { word: 'The Matrix',    hint: 'glitch' },
    { word: 'Titanic',       hint: 'cold' },
    { word: 'Shrek',         hint: 'swamp' },
    { word: 'Jaws',          hint: 'fin' },
    { word: 'Grease',        hint: 'leather' },
    { word: 'Inception',     hint: 'spinning' },
    { word: 'Parasite',      hint: 'stairs' },
    { word: 'Frozen',        hint: 'braided' },
    { word: 'Spirited Away', hint: 'bathhouse' },
    { word: 'Interstellar',  hint: 'docking' },
    { word: 'Get Out',       hint: 'hypnosis' },
    { word: 'Clueless',      hint: 'plaid' },
    { word: 'Psycho',        hint: 'shower' },
    { word: 'Up',            hint: 'balloons' },
    { word: 'Alien',         hint: 'chest' },
  ],
  animals: [
    { word: 'Octopus',     hint: 'ink' },
    { word: 'Flamingo',    hint: 'balanced' },
    { word: 'Chameleon',   hint: 'shifts' },
    { word: 'Platypus',    hint: 'bill' },
    { word: 'Eagle',       hint: 'soars' },
    { word: 'Crab',        hint: 'sideways' },
    { word: 'Bat',         hint: 'echoes' },
    { word: 'Dolphin',     hint: 'clicks' },
    { word: 'Elephant',    hint: 'remembers' },
    { word: 'Sloth',       hint: 'hangs' },
    { word: 'Giraffe',     hint: 'reaches' },
    { word: 'Penguin',     hint: 'waddles' },
    { word: 'Koala',       hint: 'clings' },
    { word: 'Narwhal',     hint: 'spiral' },
    { word: 'Mantis Shrimp', hint: 'punches' },
  ],
  brands: [
    { word: 'Lego',      hint: 'clicks' },
    { word: 'Nike',      hint: 'swoosh' },
    { word: 'Apple',     hint: 'bitten' },
    { word: 'Ikea',      hint: 'assemble' },
    { word: 'Netflix',   hint: 'binge' },
    { word: 'Tesla',     hint: 'silent' },
    { word: 'Google',    hint: 'tracks' },
    { word: 'Spotify',   hint: 'shuffle' },
    { word: 'Adidas',    hint: 'stripes' },
    { word: 'Disney',    hint: 'wishes' },
    { word: 'Amazon',    hint: 'delivers' },
    { word: 'Airbnb',    hint: 'hosted' },
    { word: 'Rolex',     hint: 'crown' },
    { word: 'Polaroid',  hint: 'shakes' },
    { word: 'Vespa',     hint: 'buzzes' },
  ],
  colors: [
    { word: 'Cerulean',    hint: 'depth' },
    { word: 'Magenta',     hint: 'vivid' },
    { word: 'Ochre',       hint: 'earthy' },
    { word: 'Lavender',    hint: 'calms' },
    { word: 'Crimson',     hint: 'bleeds' },
    { word: 'Turquoise',   hint: 'tropical' },
    { word: 'Ivory',       hint: 'aged' },
    { word: 'Maroon',      hint: 'dried' },
    { word: 'Indigo',      hint: 'deep' },
    { word: 'Chartreuse',  hint: 'sharp' },
    { word: 'Coral',       hint: 'warm' },
    { word: 'Teal',        hint: 'still' },
    { word: 'Scarlet',     hint: 'bold' },
    { word: 'Amber',       hint: 'preserved' },
    { word: 'Mauve',       hint: 'faded' },
  ],
  sports: [
    { word: 'Chess',        hint: 'captured' },
    { word: 'Curling',      hint: 'sweep' },
    { word: 'Polo',         hint: 'mallet' },
    { word: 'Fencing',      hint: 'lunge' },
    { word: 'Archery',      hint: 'draw' },
    { word: 'Gymnastics',   hint: 'chalk' },
    { word: 'Rowing',       hint: 'catches' },
    { word: 'Snooker',      hint: 'cushion' },
    { word: 'Diving',       hint: 'tuck' },
    { word: 'Wrestling',    hint: 'pinned' },
    { word: 'Sumo',         hint: 'salt' },
    { word: 'Lacrosse',     hint: 'cradled' },
    { word: 'Bobsled',      hint: 'steel' },
    { word: 'Triathlon',    hint: 'transitions' },
    { word: 'Weightlifting', hint: 'chalk' },
  ],
  jobs: [
    { word: 'Sommelier',         hint: 'swirls' },
    { word: 'Lighthouse Keeper', hint: 'isolated' },
    { word: 'Cobbler',           hint: 'lasts' },
    { word: 'Glassblower',       hint: 'lungs' },
    { word: 'Falconer',          hint: 'glove' },
    { word: 'Locksmith',         hint: 'pins' },
    { word: 'Taxidermist',       hint: 'preserves' },
    { word: 'Cartographer',      hint: 'projections' },
    { word: 'Astronaut',         hint: 'drifts' },
    { word: 'Auctioneer',        hint: 'gavel' },
    { word: 'Puppeteer',         hint: 'strings' },
    { word: 'Apiarist',          hint: 'smoke' },
    { word: 'Stenographer',      hint: 'shorthand' },
    { word: 'Archivist',         hint: 'dust' },
    { word: 'Embalmer',          hint: 'sealed' },
  ],
  emotions: [
    { word: 'Nostalgia',     hint: 'faded' },
    { word: 'Schadenfreude', hint: 'grimace' },
    { word: 'Awe',           hint: 'frozen' },
    { word: 'Dread',         hint: 'hollow' },
    { word: 'Elation',       hint: 'light' },
    { word: 'Melancholy',    hint: 'gray' },
    { word: 'Envy',          hint: 'bitter' },
    { word: 'Euphoria',      hint: 'rush' },
    { word: 'Longing',       hint: 'ache' },
    { word: 'Remorse',       hint: 'heavy' },
    { word: 'Spite',         hint: 'sharp' },
    { word: 'Serenity',      hint: 'still' },
    { word: 'Giddy',         hint: 'floaty' },
    { word: 'Wistful',       hint: 'distant' },
    { word: 'Contempt',      hint: 'cold' },
  ],
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { categories = [], usedWords = [] } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) return res.status(500).json({ error: 'Missing API key' });

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
- The imposter does NOT know the word — give them a clue they can actually use to sound convincing in conversation
- The hint must be a SINGLE word only — no phrases, no "It's ...", no punctuation
- It should be intuitive and usable — something the imposter can naturally work into sentences
- Not too obvious (don't give away the word) but not too cryptic
- Sweet spot: a well-known property of the word that also applies to a few other things
- Good examples:
  * ginger → spicy
  * popcorn → yellow
  * chair → legs
  * guitar → strings
  * ice cream → melts
  * shark → teeth
  * candle → wax
- Avoid obscure or weird associations (no "knob", "protrusion", "fibrous")
- Never just name the category

Respond with ONLY valid JSON, no markdown, no explanation:
{"word": "...", "hint": "..."}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 1.0, maxOutputTokens: 16000 },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini ${response.status}: ${errText}`);
    }

    const data = await response.json();

    // Filter out thinking parts, keep only the real response
    const parts = data?.candidates?.[0]?.content?.parts || [];
    const text = parts
      .filter(p => !p.thought)
      .map(p => p.text || '')
      .join('')
      .trim();

    // Strip markdown code fences if present
    const stripped = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
    const match = stripped.match(/\{[\s\S]*\}/);
    if (!match) throw new Error(`Unexpected format: ${text}`);

    const result = JSON.parse(match[0]);
    if (!result.word || !result.hint) throw new Error(`Incomplete JSON: ${text}`);

    const output = { word: result.word, hint: result.hint };
    console.log('Gemini output:', JSON.stringify(output));
    res.json(output);
  } catch (err) {
    console.error('Gemini error:', err.message);

    // Fallback: pick from per-category lists, avoiding used words
    const pool = categories.length > 0
      ? categories.flatMap(c => FALLBACK[c] || [])
      : Object.values(FALLBACK).flat();

    const available = pool.filter(
      item => !usedWords.map(w => w.toLowerCase()).includes(item.word.toLowerCase())
    );

    // If everything's been used, reset and use the full pool
    const pick = available.length > 0
      ? available[Math.floor(Math.random() * available.length)]
      : pool[Math.floor(Math.random() * pool.length)];

    console.log('Fallback output:', JSON.stringify(pick));
    res.json(pick);
  }
}
