export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { categories = [] } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) return res.status(500).json({ error: 'Missing API key' });

  const categoryList = categories.length > 0 ? categories.join(', ') : 'everyday objects, animals, food, places';

  const prompt = `You are the word engine for a party deduction game called "Imposter Who?".

Pick ONE secret word from these categories: ${categoryList}

Rules for the word:
- Must be a single common noun (not a phrase)
- Specific enough to be interesting, common enough that most people know it
- Avoid overly abstract words

Rules for the imposter hint:
- The imposter does NOT know the word — give them one subtle physical or behavioral clue about the word
- The hint must be a single evocative word or very short phrase (1–3 words max)
- It should hint at a sensory property, shape, action, or association — NOT the category name
- Examples of good hints:
  * word "cashew" → hint "curved" (the nut's shape)
  * word "chair" → hint "legs" (it has legs)
  * word "ranch" → hint "dip" (you dip things in it)
  * word "guitar" → hint "strings" (has strings)
  * word "balloon" → hint "floats" (it floats)
  * word "ladder" → hint "rungs" (has rungs)
- Never reveal the category name as the hint

Respond with ONLY valid JSON, no markdown, no explanation:
{"word": "...", "hint": "..."}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 1.0, maxOutputTokens: 80 },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error(`No JSON in response: ${text}`);
    const result = JSON.parse(match[0]);
    if (!result.word || !result.hint) throw new Error(`Incomplete response: ${text}`);
    res.json({ word: result.word, hint: result.hint });
  } catch (err) {
    console.error('Gemini error:', err.message);
    // Return the error so the client can show it in dev, fall back gracefully in prod
    res.status(502).json({ error: err.message });
  }
}
