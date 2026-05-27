// Imposter Who — original interactive prototype
// Aesthetic: editorial poster · cream paper · ink black · lime accent · spy-red secondary
// Display: Archivo Black · Body: Inter

const { useState, useEffect, useRef, useMemo } = React;

// Tokens (T, cardSx, Toggle) come from tokens.jsx → window.

// ────────────────────────────────────────────────────────────
// Atoms
// ────────────────────────────────────────────────────────────
function SectionLabel({ kicker, title, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span style={{
          fontFamily: 'Archivo Black, sans-serif', fontSize: 11, letterSpacing: 1.6,
          background: T.ink, color: T.paper, padding: '4px 8px', borderRadius: 4,
        }}>{kicker}</span>
        <span style={{
          fontFamily: 'Archivo Black, sans-serif', fontSize: 18, letterSpacing: 0.5,
          color: T.ink, textTransform: 'uppercase',
        }}>{title}</span>
      </div>
      {right}
    </div>
  );
}

function Pill({ active, onClick, children, danger, style = {} }) {
  return (
    <button
      onClick={onClick}
      style={{
        appearance: 'none', cursor: 'pointer', userSelect: 'none',
        fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14,
        padding: '9px 14px', borderRadius: 999,
        border: '1px solid rgba(0,0,0,0.05)',
        background: active ? (danger ? T.red : T.ink) : T.paper,
        color: active ? (danger ? T.ink : T.paper) : T.ink,
        boxShadow: active ? '0 2px 6px rgba(20,18,12,0.08), 0 1px 2px rgba(20,18,12,0.04)' : 'none',
        transition: 'transform .08s ease',
        ...style,
      }}
      onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(1px)'}
      onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >{children}</button>
  );
}

// Toggle imported from tokens.jsx via window

// ────────────────────────────────────────────────────────────
// Header — big poster title
// ────────────────────────────────────────────────────────────
const THEME_ORDER = ['marigold', 'tokyo', 'afterdark'];
const THEME_DOTS  = { marigold: '#E8A33A', tokyo: '#0049FF', afterdark: '#FF3B47' };
const THEME_LABELS = { marigold: 'Marigold', tokyo: 'Tokyo', afterdark: 'Dark' };

function PosterHeader({ onHelp, theme, onTheme }) {
  const next = () => {
    const i = THEME_ORDER.indexOf(theme);
    onTheme(THEME_ORDER[(i + 1) % THEME_ORDER.length]);
  };
  return (
    <div style={{ padding: '0 22px 14px', position: 'relative' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 10,
      }}>
        <IconBtn label="?" onClick={onHelp} />
        <div style={{ width: 36 }} />
        {/* Theme cycle button */}
        <button onClick={next} title={`Theme: ${THEME_LABELS[theme]}`} style={{
          width: 36, height: 36, borderRadius: 999,
          border: '1px solid rgba(0,0,0,0.05)', background: T.card,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3,
          cursor: 'pointer',
          boxShadow: '0 2px 6px rgba(20,18,12,0.08), 0 1px 2px rgba(20,18,12,0.04)',
        }}>
          {THEME_ORDER.map(t => (
            <div key={t} style={{
              width: t === theme ? 10 : 6,
              height: t === theme ? 10 : 6,
              borderRadius: 999,
              background: THEME_DOTS[t],
              border: t === theme ? `1.5px solid ${T.ink}` : '1px solid rgba(0,0,0,0.12)',
              transition: 'width .15s, height .15s',
              flexShrink: 0,
            }} />
          ))}
        </button>
      </div>

      <div style={{ position: 'relative' }}>
        <div style={{
          fontFamily: 'Archivo Black, sans-serif',
          fontSize: 78, lineHeight: 0.86, letterSpacing: -2.5,
          color: T.ink, textTransform: 'uppercase',
        }}>
          IMPOST<span style={{ display: 'inline-block', transform: 'rotate(-8deg) translateY(-2px)', color: T.red }}>R</span>
        </div>
        <div style={{
          fontFamily: 'Archivo Black, sans-serif',
          fontSize: 78, lineHeight: 0.86, letterSpacing: -2.5,
          color: T.ink, textTransform: 'uppercase',
          display: 'flex', alignItems: 'baseline', gap: 8,
        }}>
          WHO<span style={{ color: T.red }}>?</span>
        </div>
      </div>

      <div style={{
        fontFamily: 'Inter, sans-serif', fontSize: 13, color: T.inkSoft, marginTop: 10,
        lineHeight: 1.4, maxWidth: 320,
      }}>
        One secret word. One liar at the table. Ask, answer, accuse —
        and figure out who doesn't belong.
      </div>
    </div>
  );
}

function IconBtn({ label, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: 36, height: 36, borderRadius: 999,
      border: '1px solid rgba(0,0,0,0.05)', background: T.card,
      fontFamily: 'Archivo Black, sans-serif', fontSize: 16,
      color: T.ink, cursor: 'pointer',
      boxShadow: '0 2px 6px rgba(20,18,12,0.08), 0 1px 2px rgba(20,18,12,0.04)',
    }}>{label}</button>
  );
}

// ────────────────────────────────────────────────────────────
// Settings Row — clickable summary that opens a sheet
// ────────────────────────────────────────────────────────────
function SettingsRow({ title, summary, onClick, right, children }) {
  const clickable = !!onClick;
  return (
    <div onClick={onClick} role={clickable ? 'button' : undefined} tabIndex={clickable ? 0 : -1}
      onKeyDown={(e) => { if (clickable && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onClick(); } }}
      style={{
        ...cardSx, padding: 18, width: '100%', textAlign: 'left',
        cursor: clickable ? 'pointer' : 'default', display: 'block',
        transition: 'transform .08s ease',
      }}
      onMouseDown={e => clickable && (e.currentTarget.style.transform = 'translateY(1px)')}
      onMouseUp={e => e.currentTarget.style.transform = 'translateY(0)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          fontFamily: 'Archivo Black, sans-serif', fontSize: 18, letterSpacing: 0.5,
          color: T.ink, textTransform: 'uppercase', flex: 1,
        }}>{title}</div>
        {right && (
          <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center' }}>
            {right}
          </div>
        )}
        {clickable && <Chevron />}
      </div>
      {(children || summary) && (
        <div style={{ marginTop: 12 }}>
          {children || (
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: 14, color: T.inkSoft,
              lineHeight: 1.5,
            }}>{summary}</div>
          )}
        </div>
      )}
    </div>
  );
}

function Chevron() {
  return (
    <svg width="14" height="20" viewBox="0 0 14 20" style={{ flexShrink: 0 }}>
      <path d="M3 4l7 6-7 6" stroke={T.ink} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ────────────────────────────────────────────────────────────
// Players card (legacy inline — no longer used)
// ────────────────────────────────────────────────────────────
const PLAYER_FALLBACKS = Array.from({ length: 20 }, (_, i) => `Player ${i + 1}`);

function PlayersCardInline({ players, setPlayers }) {
  const [editing, setEditing] = useState(null);
  const inputRefs = useRef({});

  useEffect(() => {
    if (editing != null && inputRefs.current[editing]) {
      inputRefs.current[editing].focus();
      inputRefs.current[editing].select();
    }
  }, [editing]);

  function add() {
    const next = PLAYER_FALLBACKS.find(n => !players.includes(n)) || `Player ${players.length + 1}`;
    setPlayers([...players, next]);
    setTimeout(() => setEditing(players.length), 30);
  }
  function remove(i) {
    setPlayers(players.filter((_, j) => j !== i));
    setEditing(null);
  }
  function rename(i, v) {
    const next = [...players]; next[i] = v; setPlayers(next);
  }

  return (
    <div style={{ ...cardSx, padding: 18 }}>
      <SectionLabel
        kicker="02" title="PLAYERS"
        right={<span style={{
          fontFamily: 'Archivo Black, sans-serif', fontSize: 18, color: T.ink,
        }}>{String(players.length).padStart(2, '0')}</span>}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {players.map((p, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center',
            border: '1px solid rgba(0,0,0,0.05)', borderRadius: 999,
            background: T.paper, paddingLeft: 12, paddingRight: 4,
            height: 38,
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: 999, background: T.lime,
              border: '1px solid rgba(0,0,0,0.05)', marginRight: 8,
              fontFamily: 'Archivo Black, sans-serif', fontSize: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: T.ink,
            }}>{i+1}</div>
            {editing === i ? (
              <input
                ref={el => inputRefs.current[i] = el}
                value={p}
                onChange={e => rename(i, e.target.value.slice(0, 14))}
                onBlur={() => setEditing(null)}
                onKeyDown={e => { if (e.key === 'Enter') setEditing(null); }}
                style={{
                  appearance: 'none', border: 'none', outline: 'none',
                  background: 'transparent', fontFamily: 'Inter, sans-serif',
                  fontWeight: 600, fontSize: 14, color: T.ink, width: 90,
                }}
              />
            ) : (
              <button onClick={() => setEditing(i)} style={{
                appearance: 'none', border: 'none', background: 'transparent',
                fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14,
                color: T.ink, cursor: 'text', padding: 0,
              }}>{p}</button>
            )}
            <button onClick={() => remove(i)} aria-label="remove" style={{
              marginLeft: 6, width: 28, height: 28, borderRadius: 999,
              border: 'none', background: 'transparent', cursor: 'pointer',
              fontFamily: 'Archivo Black, sans-serif', fontSize: 14, color: T.muted,
            }}>×</button>
          </div>
        ))}
        <button onClick={add} style={{
          height: 38, padding: '0 16px', borderRadius: 999,
          border: '1.5px dashed rgba(0,0,0,0.15)', background: 'transparent',
          fontFamily: 'Archivo Black, sans-serif', fontSize: 13, letterSpacing: 1,
          color: T.ink, cursor: 'pointer',
        }}>+ ADD</button>
      </div>
      {players.length < 3 && (
        <div style={{
          marginTop: 12, padding: '8px 12px', background: '#FFE9C7',
          border: '1px solid rgba(0,0,0,0.05)', borderRadius: 10,
          fontFamily: 'Inter, sans-serif', fontSize: 12, color: T.ink,
        }}>⚠ Need at least 3 players to start the round.</div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Categories
// ────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'objects', label: 'Everyday Things' },
  { id: 'people',  label: 'Famous Names'    },
  { id: 'food',    label: 'Food & Drink'    },
  { id: 'places',  label: 'Places & Cities' },
  { id: 'movies',  label: 'Movies & TV'     },
  { id: 'animals', label: 'Animals'         },
  { id: 'brands',  label: 'Brands & Logos'  },
  { id: 'colors',  label: 'Colors & Shapes' },
  { id: 'sports',  label: 'Sports & Games'  },
  { id: 'jobs',    label: 'Jobs & Roles'    },
  { id: 'emotions',label: 'Emotions'        },
];
const LOCKED_CATEGORIES = [];

// Per-category icons — simple stroke SVGs
function CategoryIcon({ id, size = 22, color }) {
  const c = color || 'currentColor';
  const s = size;
  const stroke = { stroke: c, strokeWidth: 1.8, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
  const svgs = {
    objects:  <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}><rect x="4" y="7" width="16" height="13" rx="1.5"/><path d="M8 7V5a4 4 0 018 0v2"/></svg>,
    people:   <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>,
    food:     <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}><path d="M5 3v8a2 2 0 002 2h0v8M9 3v6M7 3v6M17 3c-2 2-2 6 0 8v10"/></svg>,
    places:   <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}><path d="M3 21l5-8 4 6 3-4 6 6z"/><circle cx="15" cy="6" r="2"/></svg>,
    movies:   <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}><rect x="3" y="7" width="18" height="13" rx="1.5"/><path d="M3 7l3-4h3l-2 4M9 7l3-4h3l-2 4M15 7l3-4h3l-2 4"/></svg>,
    animals:  <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}><circle cx="12" cy="15" r="4"/><circle cx="6" cy="10" r="1.7"/><circle cx="10" cy="6" r="1.7"/><circle cx="14" cy="6" r="1.7"/><circle cx="18" cy="10" r="1.7"/></svg>,
    brands:   <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}><path d="M3 12V4h8l10 10-8 8L3 12z"/><circle cx="8" cy="9" r="1.4"/></svg>,
    colors:   <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}><circle cx="12" cy="12" r="9"/><circle cx="8" cy="9" r="1.4"/><circle cx="14" cy="7" r="1.4"/><circle cx="17" cy="12" r="1.4"/><circle cx="13" cy="16" r="1.4"/></svg>,
    sports:   <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3v18M5 6c4 1 9 1 14 0M5 18c4-1 9-1 14 0"/></svg>,
    jobs:     <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}><rect x="3" y="7" width="18" height="13" rx="1.5"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18"/></svg>,
    emotions: <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}><circle cx="12" cy="12" r="9"/><circle cx="9" cy="10" r=".7" fill={c}/><circle cx="15" cy="10" r=".7" fill={c}/><path d="M8 14c1.5 1.5 3 2 4 2s2.5-.5 4-2"/></svg>,
  };
  return svgs[id] || null;
}

function CategoriesCard({ selected, setSelected }) {
  const toggle = (id) => {
    setSelected(selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id]);
  };

  return (
    <div style={{ ...cardSx, padding: 18 }}>
      <SectionLabel kicker="03" title="CATEGORIES" />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {CATEGORIES.map(c => (
          <Pill key={c.id} active={selected.includes(c.id)} onClick={() => toggle(c.id)}>
            <span style={{
              display: 'inline-block', width: 6, height: 6, borderRadius: 999,
              background: selected.includes(c.id) ? T.lime : T.muted,
              marginRight: 7, verticalAlign: 'middle',
            }} />
            {c.label}
          </Pill>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Imposters stepper
// ────────────────────────────────────────────────────────────
function ImpostersCard({ imposters, setImposters, playerCount }) {
  const max = Math.max(1, Math.floor(playerCount / 2));
  const stepper = (delta) => {
    const n = Math.min(max, Math.max(1, imposters + delta));
    setImposters(n);
  };
  return (
    <div style={{ ...cardSx, padding: 18 }}>
      <SectionLabel kicker="04" title="IMPOSTERS" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={() => stepper(-1)} disabled={imposters <= 1} style={stepperBtn(imposters <= 1)}>−</button>
        <div style={{
          flex: 1, textAlign: 'center', padding: '12px 8px',
          background: T.paperDeep, borderRadius: 12, border: '1px solid rgba(0,0,0,0.05)',
        }}>
          <div style={{ fontFamily: 'Archivo Black, sans-serif', fontSize: 32, lineHeight: 1, color: T.red }}>
            {imposters}
          </div>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: 11, color: T.muted,
            letterSpacing: 1.2, marginTop: 3, fontWeight: 600,
          }}>{imposters === 1 ? 'LIAR AMONG US' : 'LIARS AMONG US'}</div>
        </div>
        <button onClick={() => stepper(1)} disabled={imposters >= max} style={stepperBtn(imposters >= max)}>+</button>
      </div>
      <div style={{
        fontFamily: 'Inter, sans-serif', fontSize: 12, color: T.muted,
        marginTop: 10, textAlign: 'center',
      }}>
        Max {max} for {playerCount} players · ratio {Math.round(imposters/playerCount*100)}%
      </div>
    </div>
  );
}
function stepperBtn(disabled) {
  return {
    width: 44, height: 44, borderRadius: 12,
    border: '1px solid rgba(0,0,0,0.05)', background: disabled ? T.paperDeep : T.lime,
    fontFamily: 'Archivo Black, sans-serif', fontSize: 22, color: T.ink,
    cursor: disabled ? 'not-allowed' : 'pointer',
    boxShadow: disabled ? 'none' : '0 2px 6px rgba(20,18,12,0.08), 0 1px 2px rgba(20,18,12,0.04)',
    opacity: disabled ? 0.4 : 1,
  };
}

// ────────────────────────────────────────────────────────────
// Time limit (toggle + slider)
// ────────────────────────────────────────────────────────────
function TimeLimitCard({ timeOn, setTimeOn, seconds, setSeconds }) {
  const ticks = [60, 90, 120, 180, 240, 300];
  return (
    <div style={{ ...cardSx, padding: 18 }}>
      <SectionLabel
        kicker="05" title="TIME LIMIT"
        right={<Toggle on={timeOn} onChange={setTimeOn} accent={T.lime} />}
      />
      {timeOn ? (
        <>
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12,
          }}>
            <div style={{ fontFamily: 'Archivo Black, sans-serif', fontSize: 40, color: T.ink, lineHeight: 1 }}>
              {Math.floor(seconds/60)}:{String(seconds%60).padStart(2,'0')}
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: T.muted, letterSpacing: 1, fontWeight: 600 }}>
              PER ROUND
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {ticks.map(t => (
              <button key={t} onClick={() => setSeconds(t)} style={{
                flex: 1, padding: '8px 0', borderRadius: 8,
                border: '1px solid rgba(0,0,0,0.05)',
                background: seconds === t ? T.ink : T.paper,
                color: seconds === t ? T.paper : T.ink,
                fontFamily: 'Archivo Black, sans-serif', fontSize: 12,
                cursor: 'pointer',
              }}>{t < 60 ? `${t}s` : `${t/60}m`}</button>
            ))}
          </div>
        </>
      ) : (
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: 13, color: T.muted, lineHeight: 1.5,
        }}>No timer — discussions can run as long as the table feels like it.</div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Hint toggle
// ────────────────────────────────────────────────────────────
function HintCard({ hint, setHint, difficulty, setDifficulty }) {
  return (
    <div style={{ ...cardSx, padding: 18 }}>
      <SectionLabel
        kicker="06" title="IMPOSTER HINT"
        right={<Toggle on={hint} onChange={setHint} accent={T.red} />}
      />
      <p style={{
        fontFamily: 'Inter, sans-serif', fontSize: 13, color: T.inkSoft,
        lineHeight: 1.5, margin: '0 0 14px',
      }}>
        Give the imposter a fuzzy clue about the word's category so they can bluff.
        Off = pure cold-read mode.
      </p>
      {hint && (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6,
          padding: 4, background: T.paperDeep, borderRadius: 10,
          border: '1px solid rgba(0,0,0,0.05)',
        }}>
          {['Easy','Medium','Hard'].map(d => (
            <button key={d} onClick={() => setDifficulty(d)} style={{
              padding: '9px 0', borderRadius: 7, border: 'none', cursor: 'pointer',
              background: difficulty === d ? T.red : 'transparent',
              color: difficulty === d ? T.paper : T.ink,
              fontFamily: 'Archivo Black, sans-serif', fontSize: 12, letterSpacing: 0.5,
            }}>{d.toUpperCase()}</button>
          ))}
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Setup screen
// ────────────────────────────────────────────────────────────
function SetupScreen({ state, set, onStart, openSheet, theme, onTheme }) {
  const selectedCats = CATEGORIES.filter(c => state.categories.includes(c.id));
  const catSummary = selectedCats.length === 0
    ? 'None selected — pick at least one.'
    : selectedCats.map(c => c.label).join(' · ');

  return (
    <div style={{
      background: T.paper, minHeight: '100%',
      paddingTop: 28, paddingBottom: 140,
    }}>
      <PosterHeader onHelp={() => openSheet('howto')} theme={theme} onTheme={onTheme} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '6px 16px' }}>
        <SettingsRow
          kicker="01" title="PLAYERS"
          onClick={() => openSheet('players')}
          right={<CountBadge n={state.players.length} />}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {state.players.slice(0, 6).map((p, i) => (
              <div key={i} style={{
                padding: '5px 11px', background: T.paperDeep,
                border: '1px solid rgba(0,0,0,0.05)', borderRadius: 999,
                fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: T.ink,
              }}>{i+1}. {p}</div>
            ))}
            {state.players.length > 6 && (
              <div style={{
                padding: '5px 11px', background: 'transparent',
                border: '1.5px dashed rgba(0,0,0,0.15)', borderRadius: 999,
                fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: T.muted,
              }}>+{state.players.length - 6} more</div>
            )}
          </div>
        </SettingsRow>

        <SettingsRow
          kicker="02" title="CATEGORIES"
          onClick={() => openSheet('categories')}
          right={<CountBadge n={state.categories.length} />}
          summary={catSummary}
        />

        <SettingsRow
          kicker="03" title="IMPOSTERS"
          onClick={() => openSheet('imposters')}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <div style={{ fontFamily: 'Archivo Black, sans-serif', fontSize: 40, color: T.red, lineHeight: 1 }}>
              {state.imposters}
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: T.inkSoft }}>
              {state.imposters === 1 ? 'liar' : 'liars'} among {state.players.length} {state.players.length === 1 ? 'player' : 'players'}
            </div>
          </div>
        </SettingsRow>

        <SettingsRow
          title="IMPOSTER HINT"
          right={<Toggle on={state.hint} onChange={v => set({ hint: v })} accent={T.red} />}
        />

        <FooterSummary state={state} />
      </div>
      <StartBar state={state} onStart={onStart} />
    </div>
  );
}

function CountBadge({ n }) {
  return (
    <div style={{
      minWidth: 32, height: 32, padding: '0 10px', borderRadius: 999,
      background: T.lime, border: '1px solid rgba(0,0,0,0.05)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Archivo Black, sans-serif', fontSize: 14, color: T.ink,
      flexShrink: 0,
    }}>{String(n).padStart(2,'0')}</div>
  );
}

function FooterSummary({ state }) {
  return (
    <div style={{
      padding: 14, marginTop: 4, borderRadius: 18,
      border: '1.5px dashed rgba(0,0,0,0.15)', background: 'transparent',
      display: 'flex', justifyContent: 'space-around', textAlign: 'center',
    }}>
      {[
        ['PLAYERS', state.players.length],
        ['LIARS', state.imposters],
      ].map(([k, v]) => (
        <div key={k}>
          <div style={{ fontFamily: 'Archivo Black, sans-serif', fontSize: 22, color: T.ink }}>{v}</div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: T.muted, letterSpacing: 1.4, fontWeight: 600 }}>{k}</div>
        </div>
      ))}
    </div>
  );
}

function StartBar({ state, onStart }) {
  const disabled = state.players.length < 3 || state.categories.length === 0;
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      padding: '14px 16px 34px',
      background: `linear-gradient(to top, ${T.paper} 60%, rgba(239,232,216,0))`,
      pointerEvents: 'none',
    }}>
      <button onClick={onStart} disabled={disabled} style={{
        pointerEvents: 'auto',
        width: '100%', height: 64, borderRadius: 20,
        border: '1px solid rgba(0,0,0,0.05)',
        background: disabled ? T.paperDeep : '#7DD957',
        color: T.ink, cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'Archivo Black, sans-serif', fontSize: 22, letterSpacing: 1.5,
        boxShadow: disabled ? 'none' : '0 12px 28px -10px rgba(60,140,40,0.55), 0 4px 10px rgba(20,18,12,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        opacity: disabled ? 0.5 : 1,
        transition: 'transform .1s ease',
      }}
      onMouseDown={e => !disabled && (e.currentTarget.style.transform = 'translateY(2px)')}
      onMouseUp={e => e.currentTarget.style.transform = 'translateY(0)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
        <svg width="22" height="24" viewBox="0 0 22 24" style={{ flexShrink: 0 }}>
          <path d="M3 2 L19 12 L3 22 Z" fill={T.ink} />
        </svg>
        START GAME
      </button>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Reveal screen — per-player card with hold-to-reveal
// ────────────────────────────────────────────────────────────
const SECRET_WORDS = {
  objects: ['Lampshade','Toaster','Doorknob','Umbrella','Vacuum','Stapler','Kettle','Drawer'],
  people:  ['Cleopatra','Einstein','Beyoncé','Da Vinci','Mr. Rogers','Frida Kahlo'],
  food:    ['Sourdough','Espresso','Avocado','Ramen','Pickle','Croissant'],
  places:  ['Tokyo','Reykjavík','Marrakesh','Brooklyn','Bali','Lisbon'],
  movies:  ['The Matrix','Parasite','Shrek','Inception','Spirited Away'],
  animals: ['Octopus','Capybara','Pangolin','Hummingbird','Ferret'],
  brands:  ['Lego','Polaroid','Vespa'],
  colors:  ['Cerulean','Magenta','Ochre','Lavender'],
  sports:  ['Chess','Curling','Pickleball','Polo','Bowling'],
  jobs:    ['Lighthouse Keeper','Sommelier','Astronaut','Magician','Cobbler'],
  emotions:['Nostalgia','Schadenfreude','Awe','Dread'],
};

// per-player card backgrounds — bright, varied, original palette
const CARD_COLORS = [
  '#FFE85C', // sun yellow
  '#5BE3D6', // mint
  '#FF9ED2', // bubblegum
  '#FFA240', // mango
  '#A88FFF', // periwinkle
  '#FF7A6B', // coral
  '#7BCBFF', // sky
  '#E8A33A', // marigold
];

// Fair imposter selection — rotates through all players before repeating anyone.
// Uses localStorage key 'imposter_cycle' to track who's had a turn.
function fairImposters(players, count, seed) {
  // Load cycle, filtering to only current players
  const stored = JSON.parse(localStorage.getItem('imposter_cycle') || '[]');
  const cycle = stored.filter(name => players.includes(name));

  // If everyone has been imposter at least once, start a fresh cycle
  const allDone = players.every(p => cycle.includes(p));
  const activeCycle = allDone ? [] : cycle;

  // Split into those who haven't had a turn yet vs those who have
  const indices = players.map((_, i) => i);
  const fresh = indices.filter(i => !activeCycle.includes(players[i]));
  const used  = indices.filter(i =>  activeCycle.includes(players[i]));

  // Seeded shuffle so the result is deterministic per game
  function seededShuffle(arr) {
    const a = [...arr];
    const rng = mulberry32(Math.floor(seed * 1e9) ^ arr.length);
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const ordered = [...seededShuffle(fresh), ...seededShuffle(used)];
  const chosen  = ordered.slice(0, count).sort((a, b) => a - b);

  // Persist the updated cycle
  const newCycle = [...new Set([...activeCycle, ...chosen.map(i => players[i])])];
  localStorage.setItem('imposter_cycle', JSON.stringify(newCycle));
  return chosen;
}

function RevealScreen({ state, onBack }) {
  const [step, setStep] = useState(0);
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shuffleSeed] = useState(() => Math.random());

  useEffect(() => {
    let cancelled = false;

    // Group key = sorted player names — each unique group tracks its own word history
    const groupKey = [...state.players].sort().join('|');

    function loadUsedWords() {
      const history = JSON.parse(localStorage.getItem('imposter_word_history') || '{}');
      return history[groupKey] || [];
    }

    function saveUsedWord(word) {
      const history = JSON.parse(localStorage.getItem('imposter_word_history') || '{}');
      const prev = history[groupKey] || [];
      history[groupKey] = [...new Set([...prev, word])].slice(-500);
      localStorage.setItem('imposter_word_history', JSON.stringify(history));
    }

    async function fetchWord() {
      setLoading(true);
      const usedWords = loadUsedWords();
      try {
        const res = await fetch('/api/word', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ categories: state.categories, usedWords }),
        });
        const payload = await res.json();
        if (!res.ok || payload.error) throw new Error(payload.error || 'API error');
        const { word, hint } = payload;
        if (cancelled) return;
        saveUsedWord(word);
        const idxs = fairImposters(state.players, state.imposters, shuffleSeed);
        setGameData({ word, hintCategory: hint, imposterIndices: idxs });
      } catch {
        if (cancelled) return;
        // Fallback — also avoid this group's used words
        const pool = state.categories.length
          ? state.categories.flatMap(c => SECRET_WORDS[c] || [])
          : Object.values(SECRET_WORDS).flat();
        const available = pool.filter(w => !usedWords.map(u => u.toLowerCase()).includes(w.toLowerCase()));
        const candidates = available.length > 0 ? available : pool;
        const w = candidates[Math.floor(shuffleSeed * candidates.length)] || 'Mystery';
        if (!cancelled) saveUsedWord(w);
        const idxs = fairImposters(state.players, state.imposters, shuffleSeed);
        const cat = state.categories.length
          ? CATEGORIES.find(c => c.id === state.categories[0])?.label.toLowerCase()
          : 'a noun';
        setGameData({ word: w, hintCategory: cat, imposterIndices: idxs });
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchWord();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div style={{
        height: '100%', minHeight: '100dvh', background: T.paper,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 18,
      }}>
        <div style={{ position: 'relative', width: 56, height: 56 }}>
          <svg width="56" height="56" viewBox="0 0 56 56" style={{ animation: 'spin 1s linear infinite' }}>
            <circle cx="28" cy="28" r="22" fill="none" stroke={T.paperDeep} strokeWidth="4"/>
            <path d="M28 6 a22 22 0 0 1 22 22" fill="none" stroke={T.ink} strokeWidth="4" strokeLinecap="round"/>
          </svg>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
        <div style={{
          fontFamily: 'Archivo Black, sans-serif', fontSize: 16, letterSpacing: 1.5,
          color: T.ink, textTransform: 'uppercase',
        }}>Picking a word…</div>
      </div>
    );
  }

  const { word, hintCategory, imposterIndices } = gameData;
  const total = state.players.length;
  if (step >= total) {
    return <DiscussionScreen state={state} word={word} onBack={onBack} imposterIndices={imposterIndices} />;
  }

  const playerName = state.players[step];
  const isImposter = imposterIndices.includes(step);
  const cardColor = CARD_COLORS[step % CARD_COLORS.length];

  const next = () => {
    setStep(step + 1);
  };

  return (
    <div style={{
      background: T.paper, height: '100%', minHeight: '100dvh',
      paddingTop: 56, paddingBottom: 30,
      display: 'flex', flexDirection: 'column',
      boxSizing: 'border-box',
    }}>
      {/* header — close only */}
      <div style={{
        display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start',
        padding: '8px 20px 18px', minHeight: 52,
      }}>
        <button onClick={onBack} aria-label="close" style={{
          width: 36, height: 36, borderRadius: 999, background: 'transparent',
          border: 'none', cursor: 'pointer', color: T.muted,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="22" height="22" viewBox="0 0 22 22">
            <path d="M4 4l14 14M18 4L4 18" stroke={T.muted} strokeWidth="2.4" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* player card */}
      <div style={{ flex: 1, padding: '0 18px', display: 'flex' }}>
        <PlayerCard
          playerName={playerName}
          step={step}
          color={cardColor}
          isImposter={isImposter}
          word={word}
          hint={state.hint ? hintCategory : null}
        />
      </div>

      {/* footer button */}
      <div style={{ padding: '20px 32px 14px', display: 'flex', justifyContent: 'center' }}>
        <button onClick={next} style={{
          height: 60, padding: '0 36px', borderRadius: 999,
          background: T.ink, color: T.paper, border: 'none', cursor: 'pointer',
          fontFamily: 'Archivo Black, sans-serif', fontSize: 17, letterSpacing: 1.5,
          display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: '0 16px 38px rgba(20,18,12,0.14), 0 6px 14px rgba(20,18,12,0.06)',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path d="M2 1l8 6-8 6V1z" fill={T.paper}/>
            <rect x="11" y="1" width="1.8" height="12" fill={T.paper}/>
          </svg>
          {step + 1 < total ? 'NEXT PLAYER' : 'START DISCUSSION'}
        </button>
      </div>

      <div style={{
        textAlign: 'center', fontFamily: 'Inter, sans-serif',
        fontSize: 11, color: T.muted, letterSpacing: 1.5, fontWeight: 600,
      }}>
        {String(step+1).padStart(2,'0')} / {String(total).padStart(2,'0')}
      </div>
    </div>
  );
}

// Small logo badge — original lockup, not the source app's branded mark
function LogoBadge() {
  return (
    <div style={{
      width: 76, height: 76, borderRadius: 18,
      background: T.lime, border: '1px solid rgba(0,0,0,0.05)',
      boxShadow: '0 8px 20px rgba(20,18,12,0.10), 0 2px 6px rgba(20,18,12,0.05)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      lineHeight: 0.88, padding: 4,
    }}>
      <div style={{ fontFamily: 'Archivo Black, sans-serif', fontSize: 14, color: T.ink, letterSpacing: -0.3 }}>
        IMPOSTER
      </div>
      <div style={{ fontFamily: 'Archivo Black, sans-serif', fontSize: 18, color: T.ink, letterSpacing: -0.5 }}>
        WHO<span style={{ color: T.red }}>?</span>
      </div>
    </div>
  );
}

// Sunburst pattern — repeating slim wedges radiating from bottom-center
function Sunburst({ color }) {
  // Use a darker shade of the card color
  return (
    <div style={{
      position: 'absolute', inset: 0, borderRadius: 'inherit', overflow: 'hidden',
      pointerEvents: 'none',
      background: `repeating-conic-gradient(from 0deg at 50% 100%,
        ${color} 0deg, ${color} 9deg,
        rgba(0,0,0,0.05) 9deg, rgba(0,0,0,0.05) 11deg)`,
    }} />
  );
}

function PlayerCard({ playerName, step, color, isImposter, word, hint }) {
  const [flipped, setFlipped] = useState(false);
  const downRef = useRef(false);

  const start = (e) => {
    e.preventDefault();
    if (e.currentTarget.setPointerCapture && e.pointerId != null) {
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
    }
    downRef.current = true;
    setFlipped(true);
  };
  const end = () => {
    if (!downRef.current) return;
    downRef.current = false;
    setFlipped(false);
  };

  // back-face color: black for imposter (dramatic), white for civilians
  const backBg = isImposter ? T.ink : T.card;

  return (
    <div style={{
      flex: 1, perspective: 1400, userSelect: 'none', touchAction: 'none',
      animation: flipped ? 'none' : 'cardBreathe 2.6s ease-in-out infinite',
    }}
      onPointerDown={start}
      onPointerUp={end}
      onPointerLeave={end}
      onPointerCancel={end}
    >
      <div style={{
        position: 'relative', width: '100%', height: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform .55s cubic-bezier(.6,.05,.3,1)',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        cursor: 'pointer',
      }}>
        {/* FRONT face — always dark text, card backgrounds are always vivid colours */}
        <CardFace color={color} bordered>
          <div style={{
            width: '100%', marginTop: 18, padding: '0 12px',
            fontFamily: 'Archivo Black, sans-serif', letterSpacing: 0.5,
            color: '#15161B', textShadow: '2px 3px 0 rgba(0,0,0,0.10)',
            textTransform: 'uppercase',
          }}>
            <AutoFitText max={48} min={24}>{playerName}</AutoFitText>
          </div>
          <div style={{
            marginTop: 16, textAlign: 'center',
            fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.4,
            color: '#15161B', fontWeight: 500, maxWidth: 280,
          }}>
            Do not tell the word to<br/>other players.
          </div>

          <div style={{
            marginTop: 'auto', marginBottom: 28,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          }}>
            <TapHandIcon />
            <div style={{
              fontFamily: 'Archivo Black, sans-serif', fontSize: 16, letterSpacing: 1.5,
              color: '#15161B',
            }}>HOLD TO REVEAL</div>
          </div>
        </CardFace>

        {/* BACK face */}
        <CardFace color={backBg} bordered back>
          {isImposter ? (
            <>
              <div style={{
                marginTop: 'auto', marginBottom: 'auto', textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 12, letterSpacing: 2,
                  color: T.lime, fontWeight: 700, marginBottom: 10,
                }}>YOU ARE THE</div>
                <div style={{
                  fontFamily: 'Archivo Black, sans-serif', fontSize: 64, lineHeight: 1,
                  color: T.red, letterSpacing: -1,
                }}>IMPOSTER</div>
                {hint && (
                  <div style={{
                    marginTop: 22, display: 'inline-block',
                    padding: '10px 16px', background: 'rgba(201,242,62,0.12)',
                    border: `1px dashed ${T.lime}`, borderRadius: 10,
                    fontFamily: 'Inter, sans-serif', fontSize: 14,
                  }}>
                    <span style={{ color: T.muted, letterSpacing: 1.2, fontSize: 10, fontWeight: 700 }}>HINT</span>
                    <div style={{ marginTop: 4, color: T.paper }}>{hint}</div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={{
              marginTop: 'auto', marginBottom: 'auto', textAlign: 'center', width: '100%',
              padding: '0 14px',
            }}>
              <div style={{
                fontFamily: 'Inter, sans-serif', fontSize: 12, letterSpacing: 2,
                color: T.muted, fontWeight: 700, marginBottom: 16,
              }}>THE SECRET WORD</div>
              <div style={{
                fontFamily: 'Archivo Black, sans-serif',
                color: T.ink, textTransform: 'uppercase', letterSpacing: -0.5,
              }}>
                <AutoFitText max={56} min={22}>{word}</AutoFitText>
              </div>
            </div>
          )}
          <div style={{
            position: 'absolute', bottom: 22, left: 0, right: 0, textAlign: 'center',
            fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: 1.6, fontWeight: 700,
            color: isImposter ? T.muted : T.muted,
          }}>RELEASE TO HIDE</div>
        </CardFace>
      </div>
    </div>
  );
}

// Card face used for front + back of the 3D flip
function CardFace({ color, children, back }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, borderRadius: 28,
      background: color, border: '1px solid rgba(0,0,0,0.05)',
      boxShadow: '0 16px 38px rgba(20,18,12,0.14), 0 6px 14px rgba(20,18,12,0.06)',
      // overflow:hidden must NOT be on the 3D face itself — it breaks backface-visibility on Safari/iOS.
      // Clip is handled by the inner wrapper instead.
      backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
      // translateZ separates front/back into distinct GPU layers, preventing bleed-through.
      transform: back ? 'rotateY(180deg) translateZ(1px)' : 'rotateY(0deg) translateZ(0px)',
      willChange: 'transform',
    }}>
      {/* Clip wrapper — keeps Sunburst inside rounded corners without breaking 3D */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 28, overflow: 'hidden', pointerEvents: 'none',
      }}>
        <Sunburst color={color} />
      </div>
      <div style={{
        position: 'relative', zIndex: 1, width: '100%', height: '100%',
        padding: '38px 24px 30px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        {children}
      </div>
    </div>
  );
}

// AutoFitText — shrinks font-size until the text fits its container width.
function AutoFitText({ children, max = 64, min = 22, style = {} }) {
  const ref = useRef(null);
  const [size, setSize] = useState(max);

  React.useLayoutEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const container = el.parentElement;
    if (!container) return;
    const availW = container.clientWidth - 8;
    let fs = max;
    el.style.fontSize = fs + 'px';
    while (fs > min && el.scrollWidth > availW) {
      fs -= 2;
      el.style.fontSize = fs + 'px';
    }
    setSize(fs);
  }, [children, max, min]);

  return (
    <div ref={ref} style={{
      ...style, fontSize: size, lineHeight: 1.05, width: '100%',
      wordBreak: 'break-word', hyphens: 'auto', textAlign: 'center',
    }}>{children}</div>
  );
}

// Simple finger-tap icon — clean stroke design
function TapHandIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 24 24" fill="none"
      stroke="#15161B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
      <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
  );
}

const primaryBtn = {
  height: 56, borderRadius: 16, padding: '0 24px',
  border: '1px solid rgba(0,0,0,0.05)', background: T.lime, color: T.ink,
  fontFamily: 'Archivo Black, sans-serif', fontSize: 16, letterSpacing: 1.2,
  cursor: 'pointer', boxShadow: '0 8px 20px rgba(20,18,12,0.10), 0 2px 6px rgba(20,18,12,0.05)',
};

function mulberry32(a) {
  return function() {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = a;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}
function pickN(n, k, rng) {
  const idxs = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
  }
  return idxs.slice(0, k).sort((a,b) => a-b);
}

// ────────────────────────────────────────────────────────────
// Game Started — discussion-time prompt + final reveal
// ────────────────────────────────────────────────────────────
function DiscussionScreen({ state, word, imposterIndices, onBack }) {
  const [revealed, setRevealed] = useState(false);
  const [confirmNew, setConfirmNew] = useState(false);

  // Starter must be a non-imposter, chosen at random
  const [starterIdx] = useState(() => {
    const nonImposters = state.players.map((_, i) => i).filter(i => !imposterIndices.includes(i));
    const pool = nonImposters.length > 0 ? nonImposters : state.players.map((_, i) => i);
    return pool[Math.floor(Math.random() * pool.length)];
  });

  // Circular speaking order starting from starterIdx
  const speakingOrder = state.players.map((_, i) =>
    state.players[(starterIdx + i) % state.players.length]
  );

  return (
    <div style={{
      background: T.paper, height: '100%', minHeight: '100dvh',
      padding: '28px 28px 30px',
      display: 'flex', flexDirection: 'column',
      boxSizing: 'border-box',
    }}>
      {/* header — logo + close */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        marginBottom: 18,
      }}>
        <div style={{ width: 36 }} />
        <LogoBadge />
        <button onClick={onBack} aria-label="close" style={{
          width: 36, height: 36, borderRadius: 999, background: 'transparent',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="22" height="22" viewBox="0 0 22 22">
            <path d="M4 4l14 14M18 4L4 18" stroke={T.muted} strokeWidth="2.4" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {!revealed ? (
        <>
          <h1 style={{
            fontFamily: 'Archivo Black, sans-serif', fontSize: 42,
            lineHeight: 1.05, letterSpacing: -1, color: T.ink,
            margin: '12px 0 18px', textWrap: 'pretty',
          }}>
            Game started! Time to talk and catch the imposter.
          </h1>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: 18, color: T.inkSoft,
            lineHeight: 1.4, marginBottom: 20,
          }}>
            <span style={{
              background: T.lime, padding: '2px 10px', borderRadius: 6,
              fontWeight: 700, color: T.ink,
              boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone',
            }}>{speakingOrder[0]}</span>{' '}
            starts the conversation!
          </div>

          {/* Circular speaking order */}
          <div style={{
            background: T.card, border: '1px solid rgba(0,0,0,0.05)',
            borderRadius: 18, padding: '14px 18px',
            boxShadow: '0 2px 6px rgba(20,18,12,0.08)',
          }}>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: 1.8,
              fontWeight: 700, color: T.muted, marginBottom: 10,
            }}>SPEAKING ORDER</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {speakingOrder.map((name, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: 999, flexShrink: 0,
                    background: i === 0 ? T.lime : T.paperDeep,
                    border: '1px solid rgba(0,0,0,0.05)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Archivo Black, sans-serif', fontSize: 11, color: T.ink,
                  }}>{i + 1}</div>
                  <div style={{
                    fontFamily: 'Inter, sans-serif', fontWeight: i === 0 ? 700 : 500,
                    fontSize: 15, color: i === 0 ? T.ink : T.inkSoft,
                  }}>{name}</div>
                  {i === 0 && (
                    <div style={{
                      marginLeft: 'auto', fontFamily: 'Archivo Black, sans-serif',
                      fontSize: 10, letterSpacing: 1, color: T.lime,
                      background: T.ink, padding: '2px 7px', borderRadius: 4,
                    }}>STARTS</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
            <button onClick={() => setRevealed(true)} style={{
              width: '100%', height: 64, borderRadius: 999,
              background: T.card, color: T.ink,
              border: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(20,18,12,0.10), 0 2px 6px rgba(20,18,12,0.05)',
              fontFamily: 'Archivo Black, sans-serif', fontSize: 16, letterSpacing: 1.2,
            }}>REVEAL IMPOSTER & WORD</button>

            <button onClick={() => setConfirmNew(true)} style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 600,
              color: T.ink, textDecoration: 'underline', textUnderlineOffset: 4,
            }}>New Game</button>
          </div>
        </>
      ) : (
        <>
          <h1 style={{
            fontFamily: 'Archivo Black, sans-serif', fontSize: 38,
            lineHeight: 1.05, letterSpacing: -1, color: T.ink,
            margin: '12px 0 22px', textWrap: 'pretty',
          }}>
            The truth is out.
          </h1>

          <div style={{
            background: T.card, border: '1px solid rgba(0,0,0,0.05)',
            borderRadius: 22, padding: 22, boxShadow: '0 8px 20px rgba(20,18,12,0.10), 0 2px 6px rgba(20,18,12,0.05)',
            marginBottom: 14,
          }}>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: 12, letterSpacing: 2,
              color: T.muted, fontWeight: 600, marginBottom: 8,
            }}>THE SECRET WORD WAS</div>
            <div style={{
              fontFamily: 'Archivo Black, sans-serif', fontSize: 42, lineHeight: 1,
              color: T.ink, textTransform: 'uppercase', letterSpacing: -0.5,
            }}>{word}</div>
          </div>

          <div style={{
            background: T.ink, color: T.paper,
            border: '1px solid rgba(0,0,0,0.05)',
            borderRadius: 22, padding: 22, boxShadow: '0 8px 20px rgba(20,18,12,0.10), 0 2px 6px rgba(20,18,12,0.05)',
          }}>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: 12, letterSpacing: 2,
              color: T.lime, fontWeight: 600, marginBottom: 8,
            }}>{imposterIndices.length === 1 ? 'THE IMPOSTER WAS' : 'THE IMPOSTERS WERE'}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {imposterIndices.map(i => (
                <div key={i} style={{
                  fontFamily: 'Archivo Black, sans-serif', fontSize: 24,
                  color: T.red, textTransform: 'uppercase', letterSpacing: -0.3,
                  background: 'rgba(255,74,61,0.12)',
                  border: `1.5px solid ${T.red}`,
                  padding: '8px 14px', borderRadius: 12,
                }}>{state.players[i]}</div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
            <button onClick={() => setConfirmNew(true)} style={{
              width: '100%', height: 64, borderRadius: 999,
              background: T.lime, color: T.ink,
              border: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(20,18,12,0.10), 0 2px 6px rgba(20,18,12,0.05)',
              fontFamily: 'Archivo Black, sans-serif', fontSize: 16, letterSpacing: 1.2,
            }}>NEW GAME</button>
          </div>
        </>
      )}

      <ConfirmDialog
        open={confirmNew}
        title="Start a new game?"
        body="You’ll go back to setup. The current round and word will be lost."
        confirmLabel="NEW GAME"
        cancelLabel="KEEP PLAYING"
        onConfirm={() => { setConfirmNew(false); onBack(); }}
        onCancel={() => setConfirmNew(false)}
      />
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Centered confirm dialog (alert-style)
// ────────────────────────────────────────────────────────────
function ConfirmDialog({ open, title, body, confirmLabel = 'CONFIRM', cancelLabel = 'CANCEL', onConfirm, onCancel }) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    } else if (mounted) {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 220);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!mounted) return null;

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }}>
      <div onClick={onCancel} style={{
        position: 'absolute', inset: 0, background: 'rgba(20,18,12,0.55)',
        opacity: visible ? 1 : 0, transition: 'opacity .2s ease',
      }} />
      <div style={{
        position: 'relative', background: T.paper,
        border: '1px solid rgba(0,0,0,0.05)', borderRadius: 24,
        boxShadow: '0 24px 50px rgba(20,18,12,0.18), 0 10px 20px rgba(20,18,12,0.08)',
        padding: '28px 24px 22px', maxWidth: 340, width: '100%',
        textAlign: 'center',
        transform: visible ? 'scale(1)' : 'scale(0.9)',
        opacity: visible ? 1 : 0,
        transition: 'transform .22s cubic-bezier(.4,1.5,.5,1), opacity .18s ease',
      }}>
        <div style={{
          width: 48, height: 48, margin: '0 auto 14px',
          borderRadius: 14, background: T.lime,
          border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 6px rgba(20,18,12,0.08), 0 1px 2px rgba(20,18,12,0.04)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 12a8 8 0 0114-5.3L20 5v6h-6l2.3-2.3A6 6 0 006 12" stroke={T.ink} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 12a8 8 0 01-14 5.3L4 19v-6h6l-2.3 2.3A6 6 0 0018 12" stroke={T.ink} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{
          fontFamily: 'Archivo Black, sans-serif', fontSize: 22, letterSpacing: -0.3,
          color: T.ink, textTransform: 'uppercase', lineHeight: 1.1,
        }}>{title}</div>
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: 14, color: T.inkSoft,
          lineHeight: 1.5, marginTop: 10,
        }}>{body}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 22 }}>
          <button onClick={onConfirm} style={{
            height: 52, borderRadius: 14, border: '1px solid rgba(0,0,0,0.05)',
            background: T.lime, color: T.ink, cursor: 'pointer',
            fontFamily: 'Archivo Black, sans-serif', fontSize: 14, letterSpacing: 1.3,
            boxShadow: '0 8px 20px rgba(20,18,12,0.10), 0 2px 6px rgba(20,18,12,0.05)',
          }}>{confirmLabel}</button>
          <button onClick={onCancel} style={{
            height: 46, borderRadius: 14, border: 'none', background: 'transparent',
            color: T.muted, cursor: 'pointer',
            fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600,
          }}>{cancelLabel}</button>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// App
// ────────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "marigold",
  "title": "IMPOSTER WHO?"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = useState('setup');
  const [sheet, setSheet] = useState(null);
  const [state, setState] = useState({
    players: ['Player 1','Player 2','Player 3','Player 4'],
    categories: [],
    imposters: 1,
    timeOn: false,
    seconds: 120,
    hint: true,
  });
  const set = (patch) => setState(s => ({ ...s, ...patch }));

  // apply theme — mutate the shared window.T so every component picks up new values
  window.applyTheme(tweaks.theme);
  document.body.style.background = T.paper;
  document.body.style.transition = 'background .4s ease';

  return (
    <>
      <div className="phone" style={{
        height: '100dvh', minHeight: '100dvh', background: T.paper,
        position: 'relative', overflow: 'hidden',
        fontFamily: '-apple-system, system-ui, sans-serif',
        WebkitFontSmoothing: 'antialiased',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }} className="no-scrollbar">
          {screen === 'setup' && (
            <SetupScreen
              state={state} set={set}
              onStart={() => setScreen('reveal')}
              openSheet={setSheet}
              theme={tweaks.theme}
              onTheme={v => setTweak('theme', v)}
            />
          )}
          {screen === 'reveal' && (
            <RevealScreen state={state} onBack={() => setScreen('setup')} />
          )}
        </div>

        {/* Sheets — overlay on top of setup */}
        <PlayersSheet open={sheet === 'players'} onClose={() => setSheet(null)}
          players={state.players} setPlayers={v => set({ players: v })} />
        <CategoriesSheet open={sheet === 'categories'} onClose={() => setSheet(null)}
          selected={state.categories} setSelected={v => set({ categories: v })}
          allCategories={CATEGORIES} locked={LOCKED_CATEGORIES} />
        <ImpostersSheet open={sheet === 'imposters'} onClose={() => setSheet(null)}
          value={state.imposters} setValue={v => set({ imposters: v })}
          playerCount={state.players.length} />
        {/* TimeSheet removed — time limit setting was deleted */}
        {/* HintSheet removed — toggle lives directly on the settings row */}
        <HowToPlaySheet open={sheet === 'howto'} onClose={() => setSheet(null)} />
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Theme">
          <TweakRadio
            label="Palette"
            value={tweaks.theme}
            onChange={v => setTweak('theme', v)}
            options={[
              { value: 'marigold', label: 'Marigold' },
              { value: 'tokyo', label: 'Tokyo' },
              { value: 'afterdark', label: 'Dark' },
            ]}
          />
        </TweakSection>
        <TweakSection title="Quick jump">
          <TweakButton onClick={() => setScreen('setup')}>← Setup screen</TweakButton>
          <TweakButton onClick={() => setScreen('reveal')}>Reveal flow →</TweakButton>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

// Expose CategoryIcon to other scripts (sheets.jsx) via window
Object.assign(window, { CategoryIcon });
