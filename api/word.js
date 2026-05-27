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
- The imposter does NOT know the word — give them a subtle, indirect clue they can use to bluff
- The hint must be 1–3 words max
- It should be a secondary or non-obvious association — NOT the first thing anyone thinks of
- Avoid direct sensory giveaways (e.g. don't say "crunchy" for popcorn, "cold" for ice cream, "red" for apple)
- Prefer shape, motion, context, or a less obvious physical property
- The hint alone should NOT let someone guess the word immediately
- Good examples:
  * popcorn → kernel (not "crunchy" — too obvious)
  * cashew → curved (shape, indirect)
  * chair → legs (shared with tables, not a giveaway)
  * ranch → dip (action, not "white" or "creamy")
  * guitar → strings (but not "music" — too broad is fine, too specific is bad)
  * balloon → floats
  * ice cream → scooped (not "cold" or "sweet")
- Never reveal the category name as the hint

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

    // Thinking model returns multiple parts — filter out thought parts, keep only the real response
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
    res.status(502).json({ error: err.message });
  }
}
