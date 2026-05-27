// Test each AI tier independently
// Usage: node test-tiers.js
// Or test one tier: node test-tiers.js gemini | groq | openrouter

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env manually
const envPath = join(dirname(fileURLToPath(import.meta.url)), '.env');
const env = Object.fromEntries(
  readFileSync(envPath, 'utf8')
    .split('\n')
    .filter(l => l.includes('='))
    .map(l => l.split('=').map(s => s.trim()))
);

const GEMINI_KEY    = env.GEMINI_API_KEY;
const GROQ_KEY      = env.GROQ_API_KEY;
const OR_KEY        = env.OPENROUTER_API_KEY;

const prompt = `You are the word engine for a party deduction game called "Imposter Who?".

Pick ONE secret word from these categories: food, animals, objects

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

function parseResult(text) {
  const noThink = text.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
  const stripped = noThink.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
  const match = stripped.match(/\{[\s\S]*\}/);
  if (!match) throw new Error(`No JSON found in:\n${text.slice(0, 400)}`);
  const result = JSON.parse(match[0]);
  if (!result.word || !result.hint) throw new Error(`Incomplete JSON: ${text}`);
  return result;
}

async function testGemini() {
  console.log('\n── Tier 1: Gemini 2.5 Flash ─────────────────────');
  const t = Date.now();
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 1.0, maxOutputTokens: 16000 },
      }),
    }
  );
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  const data = await response.json();
  const parts = data?.candidates?.[0]?.content?.parts || [];
  const text = parts.filter(p => !p.thought).map(p => p.text || '').join('').trim();
  console.log('  raw:', text.slice(0, 120).replace(/\n/g, ' '));
  const result = parseResult(text);
  console.log(`✓ ${JSON.stringify(result)}  (${Date.now() - t}ms)`);
  return result;
}

async function testGroq() {
  console.log('\n── Tier 2: Groq qwen3-32b (thinking) ────────────');
  const t = Date.now();
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_KEY}`,
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
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content?.trim() || '';
  console.log('  raw:', text.slice(0, 120).replace(/\n/g, ' '));
  const result = parseResult(text);
  console.log(`✓ ${JSON.stringify(result)}  (${Date.now() - t}ms)`);
  return result;
}

async function testOpenRouter() {
  console.log('\n── Tier 3: OpenRouter gpt-oss-120b:free ──────────');
  const t = Date.now();
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OR_KEY}`,
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-120b:free',
      messages: [{ role: 'user', content: prompt }],
      reasoning: { enabled: true },
    }),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content?.trim() || '';
  console.log('  raw:', text.slice(0, 120).replace(/\n/g, ' '));
  const result = parseResult(text);
  console.log(`✓ ${JSON.stringify(result)}  (${Date.now() - t}ms)`);
  return result;
}

const tiers = { gemini: testGemini, groq: testGroq, openrouter: testOpenRouter };
const arg = process.argv[2]?.toLowerCase();

if (arg && tiers[arg]) {
  tiers[arg]().catch(e => { console.error(`✗ ${e.message}`); process.exit(1); });
} else {
  // Run all tiers in sequence
  (async () => {
    for (const [name, fn] of Object.entries(tiers)) {
      try { await fn(); }
      catch (e) { console.error(`✗ ${name} failed: ${e.message}`); }
    }
    console.log('\n─────────────────────────────────────────────────\n');
  })();
}
