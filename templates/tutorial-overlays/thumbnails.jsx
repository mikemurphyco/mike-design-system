/* eslint-disable */
// 7 YouTube thumbnail variants for Mike Murphy · AI Handyman.
// Each artboard is exactly 1280×720 (YouTube standard).
//
// Variants:
//   V1  Classic Light          — the canonical reference (cream + polaroid)
//   V2  Classic Dark           — navy canvas, cream text, polaroid still pops
//   V3  Vertical Split         — navy left, cream right, polaroid on cream side
//   V4  Mike Cutout            — no polaroid, transparent Mike at full height
//   V5  Orange Full-Bleed      — orange canvas, navy text, chalk-paper polaroid
//   V6  Topic Tile             — large orange letter tile + transparent Mike
//   V7  Terminal               — chalk code-block hero, no polaroid

const { useState } = React;

// ─── token colors (mirrored from design system, here for inline-style use) ───
const C = {
  cream:    '#F1ECE2',
  chalk:    '#FCFAF6',
  navy:     '#001E3A',
  orange:   '#FF6434',
  orangeDp: '#E8501C',
  yellow:   '#F5C842',
  teal:     '#1ECEBE',
  muted:    'rgba(0,30,58, 0.62)',
  mutedOnNavy: 'rgba(241,236,226, 0.74)',
  mutedOnOrange: 'rgba(0,30,58, 0.72)',
  shadowPolaroid: '8px 14px 0 rgba(0,30,58, 0.55)',
  shadowPolaroidLight: '8px 14px 0 rgba(0,0,0, 0.28)',
  shadowCutLg: '8px 8px 0 #001E3A',
  shadowCutLgCream: '8px 8px 0 #F1ECE2',
};

const FONT_MONO = '"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace';
const FONT_SANS = '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';
const FONT_HAND = '"Murphydoodle", "Caveat", cursive';

// ─── atoms ───────────────────────────────────────────────────────────────────

function Badge({ tone = 'orange-on-cream', children = 'AI HANDYMAN', style }) {
  // tone:
  //   orange-on-cream → orange bg, navy text, navy cut-shadow (canonical)
  //   orange-on-navy  → orange bg, navy text, cream cut-shadow (for navy canvas)
  //   chalk-on-orange → chalk bg, navy text, navy cut-shadow (for orange canvas)
  //   navy-on-cream   → navy bg, cream text, orange cut-shadow (alt)
  const variants = {
    'orange-on-cream': { bg: C.orange, fg: C.navy, border: C.navy, shadow: C.shadowCutLg },
    'orange-on-navy':  { bg: C.orange, fg: C.navy, border: C.navy, shadow: C.shadowCutLgCream },
    'chalk-on-orange': { bg: C.chalk,  fg: C.navy, border: C.navy, shadow: C.shadowCutLg },
    'navy-on-cream':   { bg: C.navy,   fg: C.cream, border: C.navy, shadow: '8px 8px 0 ' + C.orange },
  };
  const v = variants[tone] || variants['orange-on-cream'];
  return (
    <span style={{
      display: 'inline-block',
      background: v.bg,
      color: v.fg,
      border: `2px solid ${v.border}`,
      boxShadow: v.shadow,
      borderRadius: 6,
      padding: '12px 22px',
      fontFamily: FONT_MONO,
      fontWeight: 700,
      fontSize: 20,
      letterSpacing: '0.18em',
      lineHeight: 1,
      ...style,
    }}>{children}</span>
  );
}

function Tagline({ tone = 'cream', style }) {
  // tone:
  //   cream    → navy text, orange dots (for cream bg)
  //   navy     → cream text, orange dots (for navy bg)
  //   orange   → navy text, navy dots (for orange bg)
  const palette = {
    cream:  { fg: C.navy,  dot: C.orange },
    navy:   { fg: C.cream, dot: C.orange },
    orange: { fg: C.navy,  dot: C.navy },
  };
  const p = palette[tone] || palette.cream;
  return (
    <p style={{
      margin: 0,
      fontFamily: FONT_MONO,
      fontWeight: 700,
      fontSize: 18,
      letterSpacing: '0.28em',
      color: p.fg,
      lineHeight: 1,
      ...style,
    }}>
      LEARN<span style={{ color: p.dot, margin: '0 6px' }}>·</span>
      BUILD<span style={{ color: p.dot, margin: '0 6px' }}>·</span>
      MOVE FORWARD
    </p>
  );
}

function Polaroid({
  src = 'assets/avatar-mike-transparent.png',
  photoBg = C.orange,
  paper = C.chalk,
  shadow = C.shadowPolaroid,
  tilt = -2,
  size = 380,
  captionColor = C.navy,
}) {
  return (
    <div style={{
      width: size,
      background: paper,
      padding: '18px 18px 36px',
      borderRadius: 4,
      transform: `rotate(${tilt}deg)`,
      boxShadow: shadow,
    }}>
      <div style={{
        width: '100%',
        aspectRatio: '1 / 1',
        background: photoBg,
        borderRadius: 2,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}>
        <img src={src} alt="Mike"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
      </div>
      <div style={{
        fontFamily: FONT_HAND,
        fontSize: 56,
        lineHeight: 1,
        color: captionColor,
        textAlign: 'center',
        marginTop: 14,
      }}>Mike</div>
    </div>
  );
}

// thumbnail frame (1280×720, locked); border for canvas legibility
function Frame({ bg, children }) {
  return (
    <div style={{
      width: 1280,
      height: 720,
      background: bg,
      position: 'relative',
      overflow: 'hidden',
      fontFamily: FONT_MONO,
      color: C.navy,
    }}>{children}</div>
  );
}

// ─── V1 · Classic Light ──────────────────────────────────────────────────────
function V1ClassicLight() {
  return (
    <Frame bg={C.cream}>
      <div style={{ position: 'absolute', top: 64, left: 72 }}>
        <Badge tone="orange-on-cream">AI HANDYMAN</Badge>
      </div>

      <div style={{ position: 'absolute', left: 72, top: 220, width: 740 }}>
        <p style={{
          margin: '0 0 20px', fontFamily: FONT_MONO, fontWeight: 700,
          fontSize: 22, letterSpacing: '0.2em', color: C.orange,
          textTransform: 'uppercase',
        }}>HOSTINGER VPS</p>
        <h1 style={{
          margin: '0 0 24px', fontFamily: FONT_MONO, fontWeight: 700,
          fontSize: 88, letterSpacing: '-0.03em', lineHeight: 0.95, color: C.navy,
        }}>
          Tailscale<br/>Ollama<br/>Open Web UI
        </h1>
        <p style={{
          margin: 0, fontFamily: FONT_SANS, fontWeight: 400,
          fontSize: 28, lineHeight: 1.3, color: C.muted, maxWidth: 700,
        }}>Private AI Chat available on all devices</p>
      </div>

      <div style={{ position: 'absolute', left: 72, bottom: 56 }}>
        <Tagline tone="cream" />
      </div>

      <div style={{ position: 'absolute', right: 80, top: '50%', transform: 'translateY(-50%)' }}>
        <Polaroid src="assets/avatar-mike-transparent.png" photoBg={C.orange} tilt={-2} />
      </div>
    </Frame>
  );
}

// ─── V2 · Classic Dark ───────────────────────────────────────────────────────
function V2ClassicDark() {
  return (
    <Frame bg={C.navy}>
      <div style={{ position: 'absolute', top: 64, left: 72 }}>
        <Badge tone="orange-on-navy">AI HANDYMAN</Badge>
      </div>

      <div style={{ position: 'absolute', left: 72, top: 230, width: 640 }}>
        <p style={{
          margin: '0 0 20px', fontFamily: FONT_MONO, fontWeight: 700,
          fontSize: 22, letterSpacing: '0.2em', color: C.orange,
          textTransform: 'uppercase',
        }}>CLAUDE SKILLS</p>
        <h1 style={{
          margin: '0 0 24px', fontFamily: FONT_MONO, fontWeight: 700,
          fontSize: 84, letterSpacing: '-0.03em', lineHeight: 0.95, color: C.cream,
        }}>
          Build your own<br/>superpowers.
        </h1>
        <p style={{
          margin: 0, fontFamily: FONT_SANS, fontWeight: 400,
          fontSize: 28, lineHeight: 1.3, color: C.mutedOnNavy, maxWidth: 700,
        }}>One folder. A SKILL.md. Real automation.</p>
      </div>

      <div style={{ position: 'absolute', left: 72, bottom: 56 }}>
        <Tagline tone="navy" />
      </div>

      <div style={{ position: 'absolute', right: 80, top: '50%', transform: 'translateY(-50%)' }}>
        <Polaroid
          src="assets/avatar-mike-transparent.png"
          photoBg={C.orange}
          paper={C.chalk}
          shadow={C.shadowPolaroidLight}
          tilt={-2}
        />
      </div>
    </Frame>
  );
}

// ─── V3 · Vertical Split ─────────────────────────────────────────────────────
function V3Split() {
  const splitX = 740; // navy column ends at this x; cream column from here right
  return (
    <Frame bg={C.cream}>
      {/* navy left half */}
      <div style={{
        position: 'absolute', inset: 0, width: splitX, background: C.navy,
      }} />

      {/* skinny orange seam */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: splitX - 6, width: 6,
        background: C.orange,
      }} />

      {/* badge — anchored on navy */}
      <div style={{ position: 'absolute', top: 64, left: 72 }}>
        <Badge tone="orange-on-navy">AI HANDYMAN</Badge>
      </div>

      {/* text on navy */}
      <div style={{ position: 'absolute', left: 72, top: 240, width: splitX - 144 }}>
        <p style={{
          margin: '0 0 20px', fontFamily: FONT_MONO, fontWeight: 700,
          fontSize: 22, letterSpacing: '0.2em', color: C.orange,
          textTransform: 'uppercase',
        }}>MCP TUTORIAL</p>
        <h1 style={{
          margin: '0 0 22px', fontFamily: FONT_MONO, fontWeight: 700,
          fontSize: 84, letterSpacing: '-0.03em', lineHeight: 0.95, color: C.cream,
        }}>
          Your first MCP,<br/>made simple.
        </h1>
        <p style={{
          margin: 0, fontFamily: FONT_SANS, fontWeight: 400,
          fontSize: 26, lineHeight: 1.3, color: C.mutedOnNavy, maxWidth: 580,
        }}>12 minutes. One file. A working server.</p>
      </div>

      <div style={{ position: 'absolute', left: 72, bottom: 56 }}>
        <Tagline tone="navy" />
      </div>

      {/* polaroid on cream side */}
      <div style={{
        position: 'absolute',
        left: splitX + (1280 - splitX) / 2,
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
        <Polaroid
          src="assets/avatar-mike-transparent.png"
          photoBg={C.orange}
          tilt={3}
          size={400}
        />
      </div>
    </Frame>
  );
}

// ─── V4 · Mike Cutout ────────────────────────────────────────────────────────
function V4Cutout() {
  return (
    <Frame bg={C.cream}>
      {/* faint ghost wordmark behind everything */}
      <div style={{
        position: 'absolute', right: -40, top: 380,
        fontFamily: FONT_MONO, fontWeight: 700, fontSize: 280,
        letterSpacing: '-0.04em', lineHeight: 0.9,
        color: C.navy, opacity: 0.06, pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}>HANDYMAN</div>

      {/* big chalk slab behind Mike, with cut shadow */}
      <div style={{
        position: 'absolute', right: 110, top: 60, width: 520, height: 600,
        background: C.orange, borderRadius: 6, border: `2px solid ${C.navy}`,
        boxShadow: C.shadowCutLg,
      }} />

      {/* transparent Mike */}
      <img src="assets/avatar-mike-transparent.png" alt="Mike"
        style={{
          position: 'absolute', right: 60, bottom: 0,
          height: 720, width: 'auto',
          objectFit: 'contain', objectPosition: 'bottom right',
          pointerEvents: 'none',
        }} />

      {/* badge */}
      <div style={{ position: 'absolute', top: 64, left: 72 }}>
        <Badge tone="orange-on-cream">AI HANDYMAN</Badge>
      </div>

      <div style={{ position: 'absolute', left: 72, top: 232, width: 600 }}>
        <p style={{
          margin: '0 0 20px', fontFamily: FONT_MONO, fontWeight: 700,
          fontSize: 22, letterSpacing: '0.2em', color: C.orange,
          textTransform: 'uppercase',
        }}>CODEX CLI</p>
        <h1 style={{
          margin: '0 0 24px', fontFamily: FONT_MONO, fontWeight: 700,
          fontSize: 88, letterSpacing: '-0.03em', lineHeight: 0.95, color: C.navy,
        }}>
          Agents in<br/>your terminal.
        </h1>
        <p style={{
          margin: 0, fontFamily: FONT_SANS, fontWeight: 400,
          fontSize: 26, lineHeight: 1.3, color: C.muted, maxWidth: 560,
        }}>10 minutes. Real automation, zero plumbing.</p>
      </div>

      <div style={{ position: 'absolute', left: 72, bottom: 56 }}>
        <Tagline tone="cream" />
      </div>
    </Frame>
  );
}

// ─── V5 · Orange Full-Bleed ──────────────────────────────────────────────────
function V5Orange() {
  return (
    <Frame bg={C.orange}>
      {/* badge — chalk paper variant for orange canvas */}
      <div style={{ position: 'absolute', top: 64, left: 72 }}>
        <Badge tone="chalk-on-orange">AI HANDYMAN</Badge>
      </div>

      <div style={{ position: 'absolute', left: 72, top: 232, width: 720 }}>
        <p style={{
          margin: '0 0 20px', fontFamily: FONT_MONO, fontWeight: 700,
          fontSize: 22, letterSpacing: '0.2em', color: C.navy,
          textTransform: 'uppercase',
        }}>OBSIDIAN</p>
        <h1 style={{
          margin: '0 0 24px', fontFamily: FONT_MONO, fontWeight: 700,
          fontSize: 96, letterSpacing: '-0.03em', lineHeight: 0.95, color: C.navy,
        }}>
          Notes that<br/>think back.
        </h1>
        <p style={{
          margin: 0, fontFamily: FONT_SANS, fontWeight: 400,
          fontSize: 28, lineHeight: 1.3, color: C.mutedOnOrange, maxWidth: 680,
        }}>One vault. Local AI baked in.</p>
      </div>

      <div style={{ position: 'absolute', left: 72, bottom: 56 }}>
        <Tagline tone="orange" />
      </div>

      {/* polaroid — uses chalk photo bg so Mike doesn't disappear on orange */}
      <div style={{ position: 'absolute', right: 80, top: '50%', transform: 'translateY(-50%)' }}>
        <Polaroid
          src="assets/avatar-mike-transparent.png"
          photoBg={C.navy}
          paper={C.chalk}
          shadow={'8px 14px 0 rgba(0,0,0, 0.38)'}
          tilt={-2}
        />
      </div>
    </Frame>
  );
}

// ─── V6 · Topic Tile ─────────────────────────────────────────────────────────
function V6TopicTile() {
  return (
    <Frame bg={C.cream}>
      <div style={{ position: 'absolute', top: 64, left: 72 }}>
        <Badge tone="orange-on-cream">AI HANDYMAN</Badge>
      </div>

      <div style={{ position: 'absolute', left: 72, top: 232, width: 620 }}>
        <p style={{
          margin: '0 0 20px', fontFamily: FONT_MONO, fontWeight: 700,
          fontSize: 22, letterSpacing: '0.2em', color: C.orange,
          textTransform: 'uppercase',
        }}>VPS HOSTING</p>
        <h1 style={{
          margin: '0 0 24px', fontFamily: FONT_MONO, fontWeight: 700,
          fontSize: 92, letterSpacing: '-0.03em', lineHeight: 0.95, color: C.navy,
        }}>
          $5 servers,<br/>fully yours.
        </h1>
        <p style={{
          margin: 0, fontFamily: FONT_SANS, fontWeight: 400,
          fontSize: 28, lineHeight: 1.3, color: C.muted, maxWidth: 580,
        }}>One command. Your own private cloud.</p>
      </div>

      <div style={{ position: 'absolute', left: 72, bottom: 56 }}>
        <Tagline tone="cream" />
      </div>

      {/* big topic-letter tile, upper right */}
      <div style={{
        position: 'absolute', right: 152, top: 92,
        width: 360, height: 360,
        background: C.orange,
        border: `2px solid ${C.navy}`,
        boxShadow: C.shadowCutLg,
        borderRadius: 6,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: FONT_MONO, fontWeight: 700,
        fontSize: 320, color: C.navy, lineHeight: 1,
        letterSpacing: '-0.04em',
      }}>$</div>

      {/* small chalk polaroid mini-Mike, bottom right */}
      <div style={{ position: 'absolute', right: 92, bottom: 76 }}>
        <Polaroid
          src="assets/avatar-mike-transparent.png"
          photoBg={C.navy}
          paper={C.chalk}
          shadow={C.shadowPolaroid}
          tilt={4}
          size={210}
        />
      </div>
    </Frame>
  );
}

// ─── V7 · Terminal ───────────────────────────────────────────────────────────
function V7Terminal() {
  return (
    <Frame bg={C.cream}>
      <div style={{ position: 'absolute', top: 64, left: 72 }}>
        <Badge tone="orange-on-cream">AI HANDYMAN</Badge>
      </div>

      <div style={{ position: 'absolute', left: 72, top: 232, width: 560 }}>
        <p style={{
          margin: '0 0 20px', fontFamily: FONT_MONO, fontWeight: 700,
          fontSize: 22, letterSpacing: '0.2em', color: C.orange,
          textTransform: 'uppercase',
        }}>CLAUDE CODE</p>
        <h1 style={{
          margin: '0 0 24px', fontFamily: FONT_MONO, fontWeight: 700,
          fontSize: 76, letterSpacing: '-0.03em', lineHeight: 0.95, color: C.navy,
        }}>
          Pair-program<br/>with Claude.
        </h1>
        <p style={{
          margin: 0, fontFamily: FONT_SANS, fontWeight: 400,
          fontSize: 26, lineHeight: 1.3, color: C.muted, maxWidth: 540,
        }}>12 minutes to your first commit.</p>
      </div>

      <div style={{ position: 'absolute', left: 72, bottom: 56 }}>
        <Tagline tone="cream" />
      </div>

      {/* code block — chalk paper, navy border, cut shadow */}
      <div style={{
        position: 'absolute', right: 80, top: 116,
        width: 480, minHeight: 320,
        background: C.chalk,
        border: `2px solid ${C.navy}`,
        boxShadow: C.shadowCutLg,
        borderRadius: 4,
        padding: '24px 28px',
        fontFamily: FONT_MONO,
        fontSize: 22,
        lineHeight: 1.55,
        color: C.navy,
      }}>
        {/* "window dots" */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 18, alignItems: 'center' }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: C.orange, border: `1.5px solid ${C.navy}` }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: C.yellow, border: `1.5px solid ${C.navy}` }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: C.teal, border: `1.5px solid ${C.navy}` }} />
          <span style={{
            marginLeft: 'auto', fontFamily: FONT_MONO, fontSize: 12, letterSpacing: '0.18em',
            color: C.muted,
          }}>~/code/yours</span>
        </div>
        <div><span style={{ color: C.orange, fontWeight: 700 }}>$</span> claude --new</div>
        <div style={{ color: C.muted }}>{'> '}building working tree...</div>
        <div style={{ color: C.muted }}>{'> '}reading SKILL.md ✓</div>
        <div>
          <span style={{ color: C.orange, fontWeight: 700 }}>$</span>{' '}
          <span style={{
            display: 'inline-block', width: '0.6em', height: '1em',
            background: C.teal, verticalAlign: '-0.15em',
          }} />
        </div>
      </div>

      {/* tiny Mike avatar tucked bottom-right as identity */}
      <div style={{
        position: 'absolute', right: 80, bottom: 56,
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: C.orange,
          border: `2px solid ${C.navy}`,
          boxShadow: '4px 4px 0 ' + C.navy,
          overflow: 'hidden',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        }}>
          <img src="assets/avatar-mike-transparent.png" alt="Mike"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        </div>
        <span style={{
          fontFamily: FONT_HAND, fontSize: 44, lineHeight: 1, color: C.navy,
        }}>Mike</span>
      </div>
    </Frame>
  );
}

// ─── responsive scaler — keeps thumbs 1280×720 internally, scales to viewport ──
function ScaledThumb({ children }) {
  const ref = React.useRef(null);
  const [scale, setScale] = React.useState(1);
  React.useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setScale(Math.min(1, w / 1280));
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ width: '100%', height: 720 * scale, position: 'relative' }}>
      <div style={{
        width: 1280, height: 720,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        boxShadow: '0 18px 56px rgba(0,30,58, 0.18), 0 0 0 1px rgba(0,30,58, 0.08)',
        borderRadius: 6,
        overflow: 'hidden',
      }}>
        {children}
      </div>
    </div>
  );
}

const VARIANTS = [
  { id: 'v1', label: 'V1 · Classic Light',          note: 'cream canvas, polaroid right — your baseline',          Comp: V1ClassicLight },
  { id: 'v2', label: 'V2 · Classic Dark',           note: 'navy canvas, cream text, polaroid still pops',          Comp: V2ClassicDark },
  { id: 'v3', label: 'V3 · Vertical Split',         note: 'navy left / cream right, 6px orange seam',              Comp: V3Split },
  { id: 'v4', label: 'V4 · Mike Cutout',            note: 'no polaroid — full-height transparent Mike, orange slab', Comp: V4Cutout },
  { id: 'v5', label: 'V5 · Orange Full-Bleed',      note: 'orange canvas, navy type, chalk badge',                 Comp: V5Orange },
  { id: 'v6', label: 'V6 · Topic Tile',             note: 'giant orange letter tile + small chalk polaroid',       Comp: V6TopicTile },
  { id: 'v7', label: 'V7 · Terminal',               note: 'chalk code-block hero, small Mike avatar identity',     Comp: V7Terminal },
];

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#F1ECE2',
      paddingBottom: 96,
      fontFamily: FONT_SANS,
      color: C.navy,
    }}>
      {/* page header */}
      <header style={{
        maxWidth: 1280, margin: '0 auto', padding: '64px 32px 24px',
      }}>
        <p style={{
          margin: 0, fontFamily: FONT_MONO, fontWeight: 700,
          fontSize: 13, letterSpacing: '0.18em', color: C.orange,
          textTransform: 'uppercase',
        }}>YouTube thumbnail directions</p>
        <h1 style={{
          margin: '12px 0 8px', fontFamily: FONT_MONO, fontWeight: 700,
          fontSize: 56, letterSpacing: '-0.03em', lineHeight: 1.05, color: C.navy,
        }}>Seven looks, one brand.</h1>
        <p style={{
          margin: 0, fontFamily: FONT_SANS, fontSize: 20, lineHeight: 1.45,
          color: C.muted, maxWidth: 760,
        }}>Scroll to compare. Every thumbnail is locked at 1280×720 (YouTube standard) and scales to your window.</p>
      </header>

      {/* sticky table of contents */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 5,
        background: 'color-mix(in srgb, #F1ECE2 88%, transparent)',
        backdropFilter: 'saturate(140%) blur(8px)',
        WebkitBackdropFilter: 'saturate(140%) blur(8px)',
        borderBottom: `1px solid ${C.muted.replace('0.62', '0.18')}`,
        padding: '14px 32px',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'flex', flexWrap: 'wrap', gap: 8,
          fontFamily: FONT_MONO, fontSize: 12, letterSpacing: '0.14em',
        }}>
          {VARIANTS.map(v => (
            <a key={v.id} href={`#${v.id}`}
              style={{
                padding: '8px 14px', borderRadius: 4,
                border: `1px solid ${C.navy}`,
                color: C.navy, background: 'transparent',
                textDecoration: 'none', fontWeight: 700,
                textTransform: 'uppercase',
              }}>{v.label}</a>
          ))}
        </div>
      </nav>

      {/* variants */}
      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 32px 0' }}>
        {VARIANTS.map(v => (
          <section key={v.id} id={v.id} style={{ marginBottom: 80 }}>
            <div style={{
              display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
              gap: 16, marginBottom: 18, flexWrap: 'wrap',
            }}>
              <h2 style={{
                margin: 0, fontFamily: FONT_MONO, fontWeight: 700,
                fontSize: 28, letterSpacing: '-0.02em', color: C.navy,
              }}>{v.label}</h2>
              <p style={{
                margin: 0, fontFamily: FONT_SANS, fontSize: 16, color: C.muted,
              }}>{v.note}</p>
            </div>
            <ScaledThumb><v.Comp /></ScaledThumb>
          </section>
        ))}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
