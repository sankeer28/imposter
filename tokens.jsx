// Shared tokens + low-level atoms for Imposter Who
// Loaded BEFORE sheets.jsx and app.jsx so both can reference them.

const T = {
  paper: '#EFE8D8',
  paperDeep: '#E6DDC8',
  card: '#FBF7EC',
  ink: '#15161B',
  inkSoft: '#3A3A40',
  muted: '#8A8276',
  border: '#231F18',
  lime: '#E8A33A',
  limeDark: '#B8801F',
  red: '#FF4A3D',
  redDark: '#D93529',
  blue: '#3357FF',
  frame: '#D9D2C0',
};

// Preset themes — applyTheme(name) mutates T so cardSx getter + components pick up new values
const THEMES = {
  marigold: {
    paper: '#EFE8D8', paperDeep: '#E6DDC8', card: '#FBF7EC',
    ink: '#15161B', inkSoft: '#3A3A40', muted: '#8A8276',
    lime: '#E8A33A', limeDark: '#B8801F',
    red: '#FF4A3D', redDark: '#D93529',
    frame: '#D9D2C0',
  },
  tokyo: {
    paper: '#FAFAFA', paperDeep: '#EFF1F4', card: '#FFFFFF',
    ink: '#0A2540', inkSoft: '#324B6E', muted: '#94A3B8',
    lime: '#0049FF', limeDark: '#0035CC',
    red: '#FF2D2D', redDark: '#CC1F1F',
    frame: '#E6EAEF',
  },
  afterdark: {
    paper: '#0E0E10', paperDeep: '#16161A', card: '#1A1A1E',
    ink: '#EAE5D7', inkSoft: '#B7B2A4', muted: '#6F6A5D',
    lime: '#3A3833', limeDark: '#2A2824',
    red: '#FF3B47', redDark: '#CC2F38',
    frame: '#000000',
  },
};

function applyTheme(name) {
  const t = THEMES[name] || THEMES.marigold;
  Object.assign(window.T, t);
}

// hairline-bordered card with soft layered shadow.
// `background` is a GETTER so theme changes propagate through `...cardSx` spreads.
const cardSx = {
  get background() { return T.card; },
  border: '1px solid rgba(0,0,0,0.05)',
  borderRadius: 22,
  boxShadow: '0 8px 20px rgba(20,18,12,0.10), 0 2px 6px rgba(20,18,12,0.05)',
};

// Toggle — wraps react-switch (loaded via CDN as window.ReactSwitch).
// Keeps the same { on, onChange, accent } API so no call sites need changing.
function Toggle({ on, onChange, accent }) {
  const handle = (v) => { haptic.light(); onChange(v); };
  if (typeof ReactSwitch !== 'undefined') {
    // span[lineHeight:0] strips text-baseline offset that inline-block inherits
    return (
      <span style={{ display: 'flex', alignItems: 'center', lineHeight: 0 }}>
        <ReactSwitch
          checked={!!on}
          onChange={handle}
          onColor={accent || T.lime}
          offColor={T.paperDeep}
          onHandleColor={T.ink}
          offHandleColor={T.ink}
          handleDiameter={22}
          uncheckedIcon={false}
          checkedIcon={false}
          height={30}
          width={52}
          boxShadow="0 0 0 1.5px rgba(0,0,0,0.12)"
          activeBoxShadow="none"
        />
      </span>
    );
  }
  // Fallback if CDN fails to load
  const ACCENT = accent || T.lime;
  return (
    <button onClick={() => handle(!on)} style={{
      width: 52, height: 30, borderRadius: 999,
      border: '1px solid rgba(0,0,0,0.05)',
      background: on ? ACCENT : T.paperDeep,
      position: 'relative', cursor: 'pointer',
      transition: 'background .15s ease',
    }}>
      <div style={{
        position: 'absolute', top: 3, left: on ? 26 : 4,
        width: 22, height: 22, borderRadius: 999, background: T.ink,
        transition: 'left .18s cubic-bezier(.5,1.5,.5,1)',
      }} />
    </button>
  );
}

// haptic — multi-pulse intensity levels via tactus (window.triggerHaptic).
// Each call to triggerHaptic fires one Taptic Engine pulse on iOS / one vibrate
// on Android, so we chain multiple calls to produce heavier sensations.
const haptic = {
  light:  () => { window.triggerHaptic?.(25); },
  medium: () => { window.triggerHaptic?.(40); setTimeout(() => window.triggerHaptic?.(40), 90); },
  heavy:  () => { window.triggerHaptic?.(60); setTimeout(() => window.triggerHaptic?.(60), 75); setTimeout(() => window.triggerHaptic?.(60), 150); },
};

Object.assign(window, { T, THEMES, applyTheme, cardSx, Toggle, haptic });
