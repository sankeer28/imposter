// Sheets + drag reorder for Imposter Who
// Editorial poster style — cream sheet, ink hairlines, lime confirm

const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;

// ────────────────────────────────────────────────────────────
// Sheet shell
// ────────────────────────────────────────────────────────────
function Sheet({ open, onClose, title, subtitle, children, confirmLabel = 'CONFIRM', onConfirm, accent }) {
  const [mounted, setMounted] = useStateS(false);
  const [visible, setVisible] = useStateS(false);

  useEffectS(() => {
    if (open) {
      setMounted(true);
      // Double-RAF: first frame paints the sheet at translateY(100%),
      // second frame triggers the transition so it actually slides up.
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else if (mounted) {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!mounted) return null;

  const ACCENT = accent || T.lime;

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 100,
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      pointerEvents: 'auto',
    }}>
      {/* backdrop */}
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0, background: 'rgba(20,18,12,0.5)',
        opacity: visible ? 1 : 0, transition: 'opacity .28s ease',
      }} />
      {/* sheet */}
      <div style={{
        position: 'relative', background: T.paper,
        borderTopLeftRadius: 28, borderTopRightRadius: 28,
        border: '1px solid rgba(0,0,0,0.05)', borderBottom: 'none',
        maxHeight: '88%', display: 'flex', flexDirection: 'column',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform .32s cubic-bezier(.22,.9,.26,1)',
        boxShadow: '0 -20px 40px -10px rgba(20,18,12,0.18)',
      }}>
        {/* grab handle */}
        <div style={{
          paddingTop: 10, display: 'flex', justifyContent: 'center',
        }}>
          <div style={{ width: 42, height: 5, borderRadius: 4, background: T.border, opacity: 0.4 }} />
        </div>
        {/* header */}
        <div style={{ padding: '14px 24px 12px', textAlign: 'center', position: 'relative' }}>
          <button onClick={() => { haptic.light(); onClose(); }} aria-label="close" style={{
            position: 'absolute', left: 18, top: 12,
            width: 32, height: 32, borderRadius: 999,
            border: '1px solid rgba(0,0,0,0.05)', background: T.card,
            fontFamily: 'Archivo Black, sans-serif', fontSize: 14,
            color: T.ink, cursor: 'pointer',
          }}>×</button>
          <div style={{
            fontFamily: 'Archivo Black, sans-serif', fontSize: 22,
            letterSpacing: 1, color: T.ink, textTransform: 'uppercase',
          }}>{title}</div>
          {subtitle && (
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: 13, color: T.muted,
              marginTop: 4,
            }}>{subtitle}</div>
          )}
        </div>
        {/* content */}
        <div style={{
          flex: 1, overflow: 'auto', padding: '4px 20px 16px',
        }}>{children}</div>
        {/* confirm */}
        {onConfirm && (
          <div style={{ padding: '12px 20px 30px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <button onClick={() => { haptic.medium(); onConfirm(); }} style={{
              width: '100%', height: 56, borderRadius: 16,
              border: '1px solid rgba(0,0,0,0.05)', background: ACCENT, color: T.ink,
              fontFamily: 'Archivo Black, sans-serif', fontSize: 17, letterSpacing: 1.5,
              cursor: 'pointer', boxShadow: '0 8px 20px rgba(20,18,12,0.10), 0 2px 6px rgba(20,18,12,0.05)',
            }}>{confirmLabel}</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Drag-to-reorder list (pointer-based)
// ────────────────────────────────────────────────────────────
function DragList({ items, renderItem, onReorder, rowHeight = 60, gap = 8 }) {
  const [dragIdx, setDragIdx] = useStateS(null);
  const [hoverIdx, setHoverIdx] = useStateS(null);
  const [dragY, setDragY] = useStateS(0);
  const containerRef = useRefS(null);
  const startRef = useRefS({ y: 0, idx: 0 });

  const step = rowHeight + gap;

  const onPointerDown = (e, idx) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    haptic.light();
    setDragIdx(idx);
    setHoverIdx(idx);
    setDragY(0);
    startRef.current = { y: e.clientY, idx };
  };
  const onPointerMove = (e) => {
    if (dragIdx == null) return;
    const dy = e.clientY - startRef.current.y;
    setDragY(dy);
    const targetIdx = Math.max(0, Math.min(items.length - 1,
      startRef.current.idx + Math.round(dy / step)));
    if (targetIdx !== hoverIdx) setHoverIdx(targetIdx);
  };
  const onPointerUp = (e) => {
    if (dragIdx == null) return;
    if (hoverIdx !== dragIdx) {
      haptic.medium();
      const next = [...items];
      const [moved] = next.splice(dragIdx, 1);
      next.splice(hoverIdx, 0, moved);
      onReorder(next);
    }
    setDragIdx(null);
    setHoverIdx(null);
    setDragY(0);
  };

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {items.map((item, i) => {
        const isDragging = i === dragIdx;
        let displaceY = 0;
        if (dragIdx != null && !isDragging) {
          // shift items between dragIdx and hoverIdx
          if (dragIdx < hoverIdx && i > dragIdx && i <= hoverIdx) displaceY = -step;
          if (dragIdx > hoverIdx && i < dragIdx && i >= hoverIdx) displaceY = step;
        }
        const translateY = isDragging ? dragY : displaceY;
        return (
          <div
            key={item.key || i}
            style={{
              transform: `translateY(${translateY}px)`,
              transition: isDragging ? 'none' : 'transform .2s cubic-bezier(.2,.8,.2,1)',
              marginBottom: gap,
              zIndex: isDragging ? 5 : 1,
              position: 'relative',
              opacity: isDragging ? 0.96 : 1,
              filter: isDragging ? 'drop-shadow(0 14px 18px rgba(0,0,0,0.18))' : 'none',
              touchAction: 'none',
            }}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {renderItem(item, i, {
              dragHandleProps: {
                onPointerDown: (e) => onPointerDown(e, i),
                style: { touchAction: 'none', cursor: dragIdx === i ? 'grabbing' : 'grab' },
              },
              isDragging,
            })}
          </div>
        );
      })}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Players Sheet
// ────────────────────────────────────────────────────────────
function PlayersSheet({ open, onClose, players, setPlayers }) {
  const [local, setLocal] = useStateS(players);
  const [draft, setDraft] = useStateS('');
  const [editing, setEditing] = useStateS(null);
  const inputRef = useRefS(null);
  const editRefs = useRefS({});

  useEffectS(() => { if (open) setLocal(players); }, [open]);
  useEffectS(() => {
    if (editing != null && editRefs.current[editing]) {
      editRefs.current[editing].focus();
      editRefs.current[editing].select();
    }
  }, [editing]);

  const add = () => {
    const v = draft.trim();
    if (!v || local.length >= 20) return;
    haptic.light();
    setLocal([...local, v.slice(0, 16)]);
    setDraft('');
    setTimeout(() => inputRef.current?.focus(), 0);
  };
  const remove = (i) => { haptic.light(); setLocal(local.filter((_, j) => j !== i)); };
  const rename = (i, v) => {
    const next = [...local]; next[i] = v.slice(0, 16); setLocal(next);
  };

  // Make stable keys so drag list doesn't lose identity on rename
  const keyedRef = useRefS([]);
  useEffectS(() => {
    keyedRef.current = local.map((_, i) => keyedRef.current[i] ?? Math.random().toString(36).slice(2));
  }, [local.length]);
  const items = local.map((name, i) => ({ key: keyedRef.current[i] || i, name, idx: i }));

  return (
    <Sheet
      open={open} onClose={onClose}
      title="Edit Players"
      subtitle={`${local.length} / 20 · drag to reorder, tap to rename`}
      confirmLabel="SAVE LINEUP"
      onConfirm={() => { setPlayers(local); onClose(); }}
    >
      <DragList
        items={items}
        rowHeight={56}
        gap={8}
        onReorder={(next) => {
          // reorder both names and keys consistently
          const newKeys = next.map(it => it.key);
          const newNames = next.map(it => it.name);
          keyedRef.current = newKeys;
          setLocal(newNames);
        }}
        renderItem={(it, i, { dragHandleProps, isDragging }) => (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 0,
            background: T.card, border: '1px solid rgba(0,0,0,0.05)',
            borderRadius: 14, height: 56, paddingRight: 8,
            boxShadow: '0 2px 6px rgba(20,18,12,0.08), 0 1px 2px rgba(20,18,12,0.04)',
          }}>
            <div {...dragHandleProps} style={{
              ...dragHandleProps.style,
              width: 42, height: '100%', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              borderRight: '1px solid rgba(0,0,0,0.06)',
            }}>
              <svg width="14" height="20" viewBox="0 0 14 20">
                {[0,1,2].map(r => [0,1].map(c => (
                  <circle key={`${r}${c}`} cx={3 + c*8} cy={3 + r*6} r="1.5" fill={T.muted} />
                )))}
              </svg>
            </div>
            <div style={{
              width: 32, height: 32, borderRadius: 8, background: T.lime,
              border: '1px solid rgba(0,0,0,0.05)', marginLeft: 10,
              fontFamily: 'Archivo Black, sans-serif', fontSize: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.ink,
            }}>{i + 1}</div>
            <div style={{ flex: 1, paddingLeft: 12 }}>
              {editing === i ? (
                <input
                  ref={el => editRefs.current[i] = el}
                  value={it.name}
                  onChange={e => rename(i, e.target.value)}
                  onBlur={() => setEditing(null)}
                  onKeyDown={e => { if (e.key === 'Enter') setEditing(null); }}
                  style={{
                    appearance: 'none', border: 'none', outline: 'none',
                    background: 'transparent', fontFamily: 'Inter, sans-serif',
                    fontWeight: 600, fontSize: 16, color: T.ink, width: '100%',
                  }}
                />
              ) : (
                <button onClick={() => setEditing(i)} style={{
                  background: 'transparent', border: 'none', padding: 0,
                  fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16,
                  color: T.ink, cursor: 'text', textAlign: 'left', width: '100%',
                }}>{it.name}</button>
              )}
            </div>
            <button onClick={() => setEditing(i)} style={iconGhost} aria-label="rename">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M11 1.5l3.5 3.5L5 14.5H1.5V11L11 1.5z" stroke={T.ink} strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </button>
            <button onClick={() => remove(i)} style={{ ...iconGhost, color: T.red }} aria-label="remove" disabled={local.length <= 1}>
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 2l10 10M12 2L2 12" stroke={local.length <= 1 ? T.muted : T.red} strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </div>
        )}
      />

      {/* add row */}
      <div style={{
        display: 'flex', gap: 8, marginTop: 12,
        padding: 6, background: T.card,
        border: '1px solid rgba(0,0,0,0.05)', borderRadius: 14,
        boxShadow: '0 2px 6px rgba(20,18,12,0.08), 0 1px 2px rgba(20,18,12,0.04)',
      }}>
        <input
          ref={inputRef}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') add(); }}
          placeholder="Add a player name…"
          style={{
            flex: 1, height: 44, border: 'none', outline: 'none',
            background: 'transparent', padding: '0 12px',
            fontFamily: 'Inter, sans-serif', fontSize: 15, color: T.ink,
          }}
        />
        <button onClick={add} disabled={!draft.trim() || local.length >= 20} style={{
          width: 56, height: 44, borderRadius: 10,
          border: '1px solid rgba(0,0,0,0.05)',
          background: !draft.trim() ? T.paperDeep : T.lime, color: T.ink,
          fontFamily: 'Archivo Black, sans-serif', fontSize: 22,
          cursor: draft.trim() ? 'pointer' : 'not-allowed',
          opacity: !draft.trim() ? 0.5 : 1,
        }}>+</button>
      </div>

      {local.length < 3 && (
        <div style={{
          marginTop: 10, padding: '8px 12px', background: '#FFE9C7',
          border: '1px solid rgba(0,0,0,0.05)', borderRadius: 10,
          fontFamily: 'Inter, sans-serif', fontSize: 12, color: T.ink,
        }}>⚠ Need at least 3 players to start the round.</div>
      )}
    </Sheet>
  );
}

const iconGhost = {
  width: 36, height: 36, borderRadius: 8, background: 'transparent',
  border: 'none', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: T.ink,
};

// ────────────────────────────────────────────────────────────
// Categories Sheet
// ────────────────────────────────────────────────────────────
function CategoriesSheet({ open, onClose, selected, setSelected, allCategories, locked }) {
  const [local, setLocal] = useStateS(selected);
  useEffectS(() => { if (open) setLocal(selected); }, [open]);

  const toggle = (id) => {
    if (locked.includes(id)) return;
    haptic.light();
    setLocal(local.includes(id) ? local.filter(s => s !== id) : [...local, id]);
  };
  return (
    <Sheet
      open={open} onClose={onClose}
      title="Select Categories"
      subtitle={`${local.length} selected`}
      confirmLabel="SAVE SELECTION"
      onConfirm={() => { setSelected(local); onClose(); }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {allCategories.map(c => {
          const isLocked = locked.includes(c.id);
          const isOn = local.includes(c.id);
          return (
            <button key={c.id} onClick={() => toggle(c.id)} disabled={isLocked}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 16px',
                background: isOn ? T.ink : T.card,
                color: isOn ? T.paper : T.ink,
                border: '1px solid rgba(0,0,0,0.05)', borderRadius: 14,
                boxShadow: '0 2px 6px rgba(20,18,12,0.08), 0 1px 2px rgba(20,18,12,0.04)',
                cursor: isLocked ? 'not-allowed' : 'pointer',
                opacity: isLocked ? 0.55 : 1,
                fontFamily: 'Inter, sans-serif', textAlign: 'left',
              }}>
              {/* Icon */}
              <div style={{
                width: 36, height: 36, flexShrink: 0,
                background: isOn ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)',
                border: '1px solid rgba(0,0,0,0.05)',
                borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: isOn ? T.paper : T.ink,
              }}>
                {window.CategoryIcon
                  ? <window.CategoryIcon id={c.id} size={20} color={isOn ? T.paper : T.ink} />
                  : null}
              </div>
              {/* Checkbox indicator */}
              <div style={{
                width: 22, height: 22, borderRadius: 6,
                border: `1.5px solid ${isOn ? T.lime : 'rgba(0,0,0,0.15)'}`,
                background: isOn ? T.lime : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {isOn && (
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <path d="M2 6.5L4.8 9.2L10 3.5" stroke={T.ink} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Archivo Black, sans-serif', fontSize: 16, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                  {c.label}
                </div>
              </div>
              {isLocked ? (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '4px 8px', background: T.red, color: T.paper,
                  borderRadius: 6, border: '1px solid rgba(0,0,0,0.05)',
                  fontFamily: 'Archivo Black, sans-serif', fontSize: 10, letterSpacing: 1,
                }}>
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                    <rect x="1" y="5" width="8" height="6" rx="1" stroke={T.paper} strokeWidth="1.4"/>
                    <path d="M3 5V3a2 2 0 014 0v2" stroke={T.paper} strokeWidth="1.4" fill="none"/>
                  </svg>
                  PRO
                </div>
              ) : null}
            </button>
          );
        })}
      </div>
    </Sheet>
  );
}

// ────────────────────────────────────────────────────────────
// Imposters Sheet
// ────────────────────────────────────────────────────────────
function ImpostersSheet({ open, onClose, value, setValue, playerCount }) {
  const [local, setLocal] = useStateS(value);
  useEffectS(() => { if (open) setLocal(value); }, [open]);
  const [text, setText] = useStateS(String(value));
  useEffectS(() => { if (open) setText(String(value)); }, [open]);

  const commit = (n) => {
    const clean = Math.max(1, Math.floor(n) || 1);
    setLocal(clean);
    setText(String(clean));
  };
  const step = (delta) => { haptic.light(); commit(local + delta); };

  return (
    <Sheet
      open={open} onClose={onClose}
      title="Imposters"
      subtitle={`How many liars among ${playerCount} ${playerCount === 1 ? 'player' : 'players'}?`}
      confirmLabel="SAVE"
      onConfirm={() => { setValue(local); onClose(); }}
    >
      <div style={{
        background: T.card, borderRadius: 18,
        padding: 24, textAlign: 'center',
        boxShadow: '0 2px 6px rgba(20,18,12,0.08), 0 1px 2px rgba(20,18,12,0.04)',
        marginBottom: 16,
        border: '1px solid rgba(0,0,0,0.05)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
        }}>
          <button onClick={() => step(-1)} disabled={local <= 1} style={stepperRoundBtn(local <= 1)}>−</button>
          <input
            value={text}
            onChange={(e) => {
              const raw = e.target.value.replace(/[^0-9]/g, '');
              setText(raw);
              if (raw === '') return;
              const n = parseInt(raw, 10);
              if (!isNaN(n) && n >= 1) setLocal(n);
            }}
            onBlur={() => commit(parseInt(text || '1', 10))}
            onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur(); }}
            inputMode="numeric"
            style={{
              width: 130, textAlign: 'center',
              fontFamily: 'Archivo Black, sans-serif', fontSize: 80, color: T.red,
              background: 'transparent', border: 'none', outline: 'none',
              padding: 0, lineHeight: 1,
            }}
          />
          <button onClick={() => step(1)} style={stepperRoundBtn(false)}>+</button>
        </div>
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: 12, color: T.muted,
          letterSpacing: 2, fontWeight: 600, marginTop: 8,
        }}>
          {local === 1 ? 'LIAR' : 'LIARS'} AMONG US
        </div>
      </div>
      {local >= playerCount && (
        <div style={{
          padding: '10px 14px', background: '#FFE9C7',
          border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12,
          fontFamily: 'Inter, sans-serif', fontSize: 13, color: T.ink, lineHeight: 1.5,
        }}>
          ⚠ Heads up: {local} imposter{local === 1 ? '' : 's'} for {playerCount} player{playerCount === 1 ? '' : 's'} is unusual. The round may be hard to play, but the game will still run.
        </div>
      )}
    </Sheet>
  );
}
function stepperRoundBtn(disabled) {
  return {
    width: 56, height: 56, borderRadius: 999,
    border: '1px solid rgba(0,0,0,0.05)',
    background: disabled ? T.paperDeep : T.lime,
    fontFamily: 'Archivo Black, sans-serif', fontSize: 28, color: T.ink,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    boxShadow: disabled ? 'none' : '0 8px 20px rgba(20,18,12,0.10), 0 2px 6px rgba(20,18,12,0.05)',
    flexShrink: 0,
  };
}

// ────────────────────────────────────────────────────────────
// Time Sheet
// ────────────────────────────────────────────────────────────
function TimeSheet({ open, onClose, timeOn, setTimeOn, seconds, setSeconds }) {
  const [localOn, setLocalOn] = useStateS(timeOn);
  const [localSec, setLocalSec] = useStateS(seconds);
  useEffectS(() => { if (open) { setLocalOn(timeOn); setLocalSec(seconds); } }, [open]);

  const presets = [60, 90, 120, 180, 240, 300, 420, 600];

  return (
    <Sheet
      open={open} onClose={onClose}
      title="Time Limit"
      subtitle="Cap how long the table can talk before the vote"
      confirmLabel="SAVE TIMER"
      onConfirm={() => { setTimeOn(localOn); setSeconds(localSec); onClose(); }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 16px', background: T.card,
        border: '1px solid rgba(0,0,0,0.05)', borderRadius: 14,
        boxShadow: '0 2px 6px rgba(20,18,12,0.08), 0 1px 2px rgba(20,18,12,0.04)', marginBottom: 14,
      }}>
        <div>
          <div style={{ fontFamily: 'Archivo Black, sans-serif', fontSize: 14, letterSpacing: 1 }}>
            ENABLE TIMER
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: T.muted, marginTop: 2 }}>
            Off = freeform discussion
          </div>
        </div>
        <Toggle on={localOn} onChange={setLocalOn} accent={T.lime} />
      </div>

      <div style={{ opacity: localOn ? 1 : 0.35, pointerEvents: localOn ? 'auto' : 'none' }}>
        <div style={{
          background: T.card, border: '1px solid rgba(0,0,0,0.05)', borderRadius: 18,
          padding: 22, textAlign: 'center', boxShadow: '0 2px 6px rgba(20,18,12,0.08), 0 1px 2px rgba(20,18,12,0.04)',
          marginBottom: 14,
        }}>
          <div style={{ fontFamily: 'Archivo Black, sans-serif', fontSize: 64, color: T.ink, lineHeight: 1 }}>
            {Math.floor(localSec/60)}:{String(localSec%60).padStart(2,'0')}
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: T.muted, letterSpacing: 2, fontWeight: 600, marginTop: 4 }}>
            PER ROUND
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {presets.map(t => (
            <button key={t} onClick={() => setLocalSec(t)} style={{
              padding: '14px 0', borderRadius: 10,
              border: '1px solid rgba(0,0,0,0.05)',
              background: localSec === t ? T.ink : T.card,
              color: localSec === t ? T.paper : T.ink,
              boxShadow: '0 2px 6px rgba(20,18,12,0.08), 0 1px 2px rgba(20,18,12,0.04)',
              fontFamily: 'Archivo Black, sans-serif', fontSize: 14,
              cursor: 'pointer',
            }}>{t < 60 ? `${t}s` : `${t/60}m`}</button>
          ))}
        </div>
      </div>
    </Sheet>
  );
}

// ────────────────────────────────────────────────────────────
// Hint Sheet
// ────────────────────────────────────────────────────────────
function HintSheet({ open, onClose, hint, setHint }) {
  const [localOn, setLocalOn] = useStateS(hint);
  useEffectS(() => { if (open) setLocalOn(hint); }, [open]);

  return (
    <Sheet
      open={open} onClose={onClose}
      title="Imposter Hint"
      subtitle="Help liars blend in — or leave them to their own devices"
      confirmLabel="SAVE"
      onConfirm={() => { setHint(localOn); onClose(); }}
      accent={T.red}
    >
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 16px', background: T.card,
        border: '1px solid rgba(0,0,0,0.05)', borderRadius: 14,
        boxShadow: '0 2px 6px rgba(20,18,12,0.08), 0 1px 2px rgba(20,18,12,0.04)', marginBottom: 14,
      }}>
        <div>
          <div style={{ fontFamily: 'Archivo Black, sans-serif', fontSize: 14, letterSpacing: 1 }}>
            GIVE HINT
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: T.muted, marginTop: 2 }}>
            Sent only to the imposter
          </div>
        </div>
        <Toggle on={localOn} onChange={setLocalOn} accent={T.red} />
      </div>

      <div style={{
        padding: '16px 18px', background: T.card,
        border: '1px solid rgba(0,0,0,0.05)', borderRadius: 14,
        boxShadow: '0 2px 6px rgba(20,18,12,0.08), 0 1px 2px rgba(20,18,12,0.04)',
        fontFamily: 'Inter, sans-serif', fontSize: 14, color: T.inkSoft, lineHeight: 1.55,
      }}>
        {localOn
          ? <>When <b style={{ color: T.ink }}>on</b>, imposters see a fuzzy category clue (“it’s a food”, “it’s a place”) before discussion starts — just enough to bluff with.</>
          : <>When <b style={{ color: T.ink }}>off</b>, imposters get nothing. Pure cold-read mode — they have to fish for context from the table.</>}
      </div>
    </Sheet>
  );
}

// ────────────────────────────────────────────────────────────
// Game Mode Sheet
// ────────────────────────────────────────────────────────────
function GameModeSheet({ open, onClose, mode, setMode }) {
  const [local, setLocal] = useStateS(mode);
  useEffectS(() => { if (open) setLocal(mode); }, [open]);

  const modes = [
    { id: 'classic', label: 'Classic', desc: 'Gather around. Pass the phone hand-to-hand. Each player peeks privately.', kicker: 'IRL' },
    { id: 'online',  label: 'Online',  desc: 'Get a shareable link. Roles drop into players\u2019 DMs across iMessage, WhatsApp, Discord.', kicker: 'REMOTE' },
  ];

  return (
    <Sheet
      open={open} onClose={onClose}
      title="Game Mode"
      subtitle="Where are your players right now?"
      confirmLabel="SAVE"
      onConfirm={() => { setMode(local); onClose(); }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {modes.map(m => (
          <button key={m.id} onClick={() => setLocal(m.id)} style={{
            display: 'flex', alignItems: 'flex-start', gap: 14,
            padding: '16px 18px', textAlign: 'left',
            background: local === m.id ? T.ink : T.card,
            color: local === m.id ? T.paper : T.ink,
            border: '1px solid rgba(0,0,0,0.05)', borderRadius: 16,
            boxShadow: '0 2px 6px rgba(20,18,12,0.08), 0 1px 2px rgba(20,18,12,0.04)', cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
          }}>
            <div style={{
              fontFamily: 'Archivo Black, sans-serif', fontSize: 10, letterSpacing: 1.4,
              background: local === m.id ? T.lime : T.paperDeep,
              color: T.ink, padding: '4px 8px', borderRadius: 5,
              border: '1px solid rgba(0,0,0,0.05)',
            }}>{m.kicker}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Archivo Black, sans-serif', fontSize: 22, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                {m.label}
              </div>
              <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4, lineHeight: 1.5 }}>{m.desc}</div>
            </div>
            <div style={{
              width: 20, height: 20, borderRadius: 999,
              border: `1.5px solid ${local === m.id ? T.paper : T.border}`,
              background: local === m.id ? T.paper : 'transparent',
              marginTop: 4, flexShrink: 0,
            }} />
          </button>
        ))}
      </div>
    </Sheet>
  );
}

// ────────────────────────────────────────────────────────────
// How To Play Sheet
// ────────────────────────────────────────────────────────────
function HowToPlaySheet({ open, onClose }) {
  const steps = [
    { n: 1, title: 'Gather Your Group',  body: 'Gather 3–5 friends and pass the phone around.' },
    { n: 2, title: 'Reveal Your Role',   body: 'Each player swipes to see the secret word — except one person, who will see “Imposter.”' },
    { n: 3, title: 'Give Clues',         body: 'One by one, players say a word related to the secret word.' },
    { n: 4, title: 'Blend In',           body: 'The imposter must fake it and try to blend in without knowing the word.' },
    { n: 5, title: 'Discuss & Detect',   body: 'Keep giving clues and talking until someone thinks they’ve figured it out.' },
    { n: 6, title: 'Vote & Reveal',      body: 'When you’re ready, vote for who you think the imposter is — then tap to reveal the truth!' },
  ];
  return (
    <Sheet
      open={open} onClose={onClose}
      title="How to Play"
      subtitle="A quick rundown before your first round"
      confirmLabel="GOT IT"
      onConfirm={onClose}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {steps.map(s => (
          <div key={s.n} style={{
            display: 'flex', alignItems: 'flex-start', gap: 14,
            padding: '14px 16px', background: T.card,
            border: '1px solid rgba(0,0,0,0.05)', borderRadius: 14,
            boxShadow: '0 2px 6px rgba(20,18,12,0.08), 0 1px 2px rgba(20,18,12,0.04)',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: T.lime, border: '1px solid rgba(0,0,0,0.05)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Archivo Black, sans-serif', fontSize: 16, color: T.ink,
            }}>{s.n}</div>
            <div>
              <div style={{
                fontFamily: 'Archivo Black, sans-serif', fontSize: 16,
                letterSpacing: 0.4, textTransform: 'uppercase', color: T.ink,
              }}>{s.title}</div>
              <div style={{
                fontFamily: 'Inter, sans-serif', fontSize: 14, color: T.inkSoft,
                lineHeight: 1.5, marginTop: 3,
              }}>{s.body}</div>
            </div>
          </div>
        ))}
      </div>
    </Sheet>
  );
}

Object.assign(window, {
  Sheet, DragList,
  PlayersSheet, CategoriesSheet, ImpostersSheet, TimeSheet, HintSheet, GameModeSheet,
  HowToPlaySheet,
});
