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
- The imposter does NOT know the word — give them a clue they can actually use to sound convincing in conversation
- The hint must be 1–3 words max
- It should be intuitive and usable — something the imposter can naturally work into sentences like "yeah it has that quality" or "I was thinking about how it does that"
- Not too obvious (don't give away the word) but not too cryptic (imposter must be able to use it)
- Sweet spot: a well-known property of the word that also applies to a few other things
- Good examples:
  * ginger → spicy (useful for bluffing, not a dead giveaway)
  * popcorn → yellow (not "crunchy" — too obvious, not "kernel" — too obscure)
  * chair → legs (useful, shared with tables and other things)
  * guitar → strings (useful, shared with violin etc.)
  * ice cream → melts (useful, not too obvious)
  * shark → teeth (useful, not a giveaway)
  * candle → wax (useful, specific enough to work with)
- Avoid overly obscure or weird associations (no "knob", "protrusion", "fibrous")
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
