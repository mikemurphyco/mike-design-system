/* eslint-disable */
// Tutorial overlay templates — Mike Murphy · AI Handyman
// Five 1920×1080 frames designed to sit *behind* screencasts and a webcam
// circle (Mike adds the circle himself in the editor — the templates leave
// the right-side region clean for it).
//
// Templates:
//   T1  Title         — opening frame, brand polaroid + name + badge
//   T2  Section       — eyebrow + big sentence headline (was the "main page")
//   T3  End Screen    — clean closer: chrome + tagline + badge + M-mark
//   T4  Code Box      — empty terminal hero, centered, ready for screencast
//   T5  Code + Caption — left-side title, right-side empty code panel

const { useState } = React;

// ── token mirrors (so inline styles can use them) ─────────────────────────
const C = {
  cream:    '#F1ECE2',
  chalk:    '#FCFAF6',
  navy:     '#001E3A',
  orange:   '#FF6434',
  yellow:   '#F5C842',
  teal:     '#1ECEBE',
  muted:    'rgba(0,30,58, 0.62)',
  border:   'rgba(0,30,58, 0.18)',
  shadowCutSm: '4px 4px 0 #001E3A',
  shadowCutMd: '6px 6px 0 #001E3A',
  shadowCutLg: '8px 8px 0 #001E3A',
  shadowPolaroid: '10px 18px 0 rgba(0,30,58, 0.55)',
};

const FONT_MONO = '"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace';
const FONT_SANS = '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';
const FONT_HAND = '"Murphydoodle", "Caveat", cursive';

// ── shared chrome atoms ────────────────────────────────────────────────────

// • AI HANDYMAN   /   • MIKEMURPHY.CO  — used as small corner markers.
function CornerMark({ children, align = 'left' }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      fontFamily: FONT_MONO,
      fontWeight: 700,
      fontSize: 22,
      letterSpacing: '0.18em',
      color: C.navy,
      textTransform: 'uppercase',
      flexDirection: align === 'right' ? 'row' : 'row',
    }}>
      <span style={{
        width: 12, height: 12, borderRadius: '50%',
        background: C.orange, flex: '0 0 auto',
      }} />
      <span>{children}</span>
    </span>
  );
}

// Pill / chip badge with the navy cut-shadow. Navy text on orange ground —
// matches the original badge in the three sources, lifted into the system.
function HandymanBadge({ size = 'lg', style }) {
  const sz = size === 'sm'
    ? { pad: '10px 22px', fs: 22 }
    : { pad: '16px 32px', fs: 28 };
  return (
    <span style={{
      display: 'inline-block',
      background: C.orange,
      color: C.navy,
      border: `2px solid ${C.navy}`,
      boxShadow: C.shadowCutMd,
      borderRadius: 6,
      padding: sz.pad,
      fontFamily: FONT_MONO,
      fontWeight: 700,
      fontSize: sz.fs,
      letterSpacing: '0.22em',
      lineHeight: 1,
      transform: 'rotate(-1deg)',
      ...style,
    }}>AI HANDYMAN</span>
  );
}

// LEARN · BUILD · MOVE FORWARD (orange dots on cream)
function Tagline({ size = 28, style }) {
  const dot = (
    <span style={{
      display: 'inline-block',
      width: '0.5em', height: '0.5em',
      background: C.orange,
      borderRadius: '50%',
      verticalAlign: '0.18em',
      margin: '0 0.7em',
    }} />
  );
  return (
    <p style={{
      margin: 0,
      fontFamily: FONT_MONO,
      fontWeight: 700,
      fontSize: size,
      letterSpacing: '0.22em',
      color: C.navy,
      lineHeight: 1,
      ...style,
    }}>
      LEARN{dot}BUILD{dot}MOVE FORWARD
    </p>
  );
}

// M-mark disc — favicon character, navy
function MMark({ size = 96 }) {
  return (
    <div style={{
      width: size, height: size,
      borderRadius: '50%',
      background: C.navy,
      color: C.cream,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: FONT_MONO,
      fontWeight: 700,
      fontSize: size * 0.56,
      letterSpacing: '-0.04em',
      lineHeight: 1,
    }}>M</div>
  );
}

// Brand polaroid — chalk paper, orange photo bg, navy cut shadow, slight tilt.
function Polaroid({
  src = (typeof window !== 'undefined' && window.__resources && window.__resources.avatarMike) || 'assets/avatar-mike-transparent.png',
  size = 520,
  tilt = -2,
  caption = 'Mike',
}) {
  return (
    <div style={{
      width: size,
      background: C.chalk,
      padding: '24px 24px 56px',
      borderRadius: 4,
      transform: `rotate(${tilt}deg)`,
      boxShadow: C.shadowPolaroid,
    }}>
      <div style={{
        width: '100%',
        aspectRatio: '1 / 1',
        background: C.orange,
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
        fontSize: 76,
        lineHeight: 1,
        color: C.navy,
        textAlign: 'center',
        marginTop: 20,
      }}>{caption}</div>
    </div>
  );
}

// 1920×1080 frame with the four corner chrome elements that appear on
// every template. Children are absolute-positioned over this base.
function Frame({ children, showCorners = true, showFooter = true, footer = 'tagline' }) {
  return (
    <div style={{
      width: 1920,
      height: 1080,
      background: C.cream,
      position: 'relative',
      overflow: 'hidden',
      fontFamily: FONT_MONO,
      color: C.navy,
    }}>
      {showCorners && (
        <>
          <div style={{ position: 'absolute', top: 64, left: 88 }}>
            <CornerMark>AI HANDYMAN</CornerMark>
          </div>
          <div style={{ position: 'absolute', top: 64, right: 88 }}>
            <CornerMark align="right">MIKEMURPHY.CO</CornerMark>
          </div>
        </>
      )}
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// T1 · Title Page
// Brand polaroid centered-left, "MIKE MURPHY" headline + handyman badge to the
// right, tagline + M-mark anchored to the bottom.
// ─────────────────────────────────────────────────────────────────────────────
function T1Title({ data }) {
  return (
    <Frame>
      {/* Polaroid (brand element — NOT a webcam placeholder) */}
      <div style={{
        position: 'absolute', left: 240, top: '50%',
        transform: 'translateY(-50%)',
      }}>
        <Polaroid tilt={-2} size={520} caption={data.caption} />
      </div>

      {/* Right column — eyebrow / huge name / badge */}
      <div style={{ position: 'absolute', left: 920, top: 280, width: 820 }}>
        <p style={{
          margin: '0 0 36px',
          fontFamily: FONT_MONO, fontWeight: 700,
          fontSize: 26, letterSpacing: '0.22em',
          color: C.navy, textTransform: 'uppercase',
        }}>{data.eyebrow}</p>
        <h1 style={{
          margin: '0 0 48px',
          fontFamily: FONT_MONO, fontWeight: 700,
          fontSize: 168, letterSpacing: '-0.03em',
          lineHeight: 0.92, color: C.navy,
        }}>{data.title}</h1>
        <HandymanBadge size="lg" />
      </div>

      {/* Footer — tagline centered, M-mark bottom-right */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 88,
        display: 'flex', justifyContent: 'center',
      }}>
        <Tagline size={30} />
      </div>
      <div style={{ position: 'absolute', right: 96, bottom: 64 }}>
        <MMark size={104} />
      </div>
    </Frame>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// T2 · Section Page  (the "main page" — eyebrow + big sentence-case headline)
// Headline anchored left-center; right half is intentionally clean so a
// screencast / browser frame / webcam circle can be layered on top in editing.
// ─────────────────────────────────────────────────────────────────────────────
function T2Section({ data }) {
  return (
    <Frame>
      <div style={{
        position: 'absolute', left: 152, top: 312, width: 1200,
      }}>
        <h1 style={{
          margin: '0 0 28px',
          fontFamily: FONT_MONO, fontWeight: 700,
          fontSize: 144, letterSpacing: '-0.03em',
          lineHeight: 0.95, color: C.navy,
        }}>{data.eyebrow}</h1>
        <p style={{
          margin: 0,
          fontFamily: FONT_MONO, fontWeight: 500,
          fontSize: 56, letterSpacing: '-0.01em',
          lineHeight: 1.15, color: C.muted,
        }}>{data.title}</p>
      </div>

      {/* Footer chrome — badge left, M-mark right */}
      <div style={{ position: 'absolute', left: 152, bottom: 88 }}>
        <HandymanBadge size="sm" />
      </div>
      <div style={{ position: 'absolute', right: 96, bottom: 64 }}>
        <MMark size={104} />
      </div>
    </Frame>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// T3 · End Screen
// Mostly-empty canvas so YouTube's end-screen subscribe / next-video cards
// can sit over it. Just chrome + a centered tagline.
// ─────────────────────────────────────────────────────────────────────────────
function T3End({ data }) {
  return (
    <Frame>
      {/* Big subtle "thanks" headline in the upper third (optional copy) */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 320,
        textAlign: 'center', padding: '0 88px',
      }}>
        <p style={{
          margin: '0 0 24px',
          fontFamily: FONT_MONO, fontWeight: 700,
          fontSize: 24, letterSpacing: '0.22em',
          color: C.orange, textTransform: 'uppercase',
        }}>{data.eyebrow}</p>
        <h1 style={{
          margin: 0,
          fontFamily: FONT_MONO, fontWeight: 700,
          fontSize: 128, letterSpacing: '-0.03em',
          lineHeight: 0.95, color: C.navy,
        }}>{data.title}</h1>
      </div>

      {/* Footer row — badge left, tagline centered, M-mark right */}
      <div style={{ position: 'absolute', left: 152, bottom: 96 }}>
        <HandymanBadge size="sm" />
      </div>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 110,
        display: 'flex', justifyContent: 'center',
      }}>
        <Tagline size={30} />
      </div>
      <div style={{ position: 'absolute', right: 96, bottom: 72 }}>
        <MMark size={104} />
      </div>
    </Frame>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// T4 · Code Box
// Empty terminal panel centered on the canvas. Mike screen-records his real
// terminal and overlays it on this region. Chalk paper, navy border, cut
// shadow, three macOS-style dots, mono prompt + caret. Eyebrow + caption sit
// above the box.
// ─────────────────────────────────────────────────────────────────────────────
function T4CodeBox({ data }) {
  return (
    <Frame>
      {/* Eyebrow + caption above the code box */}
      <div style={{
        position: 'absolute', left: 152, top: 184, right: 152,
      }}>
        <p style={{
          margin: '0 0 14px',
          fontFamily: FONT_MONO, fontWeight: 700,
          fontSize: 22, letterSpacing: '0.22em',
          color: C.orange, textTransform: 'uppercase',
        }}>{data.eyebrow}</p>
        <h2 style={{
          margin: 0,
          fontFamily: FONT_MONO, fontWeight: 700,
          fontSize: 64, letterSpacing: '-0.02em',
          lineHeight: 1, color: C.navy,
        }}>{data.title}</h2>
      </div>

      {/* The code box */}
      <div style={{
        position: 'absolute',
        left: 152, right: 152,
        top: 360, bottom: 200,
        background: C.chalk,
        border: `2px solid ${C.navy}`,
        boxShadow: C.shadowCutLg,
        borderRadius: 8,
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* terminal title bar */}
        <div style={{
          flex: '0 0 auto',
          padding: '18px 24px',
          borderBottom: `1.5px solid ${C.border}`,
          display: 'flex', alignItems: 'center', gap: 10,
          background: C.chalk,
        }}>
          <span style={{ width: 16, height: 16, borderRadius: '50%', background: C.orange, border: `1.5px solid ${C.navy}` }} />
          <span style={{ width: 16, height: 16, borderRadius: '50%', background: C.yellow, border: `1.5px solid ${C.navy}` }} />
          <span style={{ width: 16, height: 16, borderRadius: '50%', background: C.teal, border: `1.5px solid ${C.navy}` }} />
          <span style={{
            marginLeft: 'auto',
            fontFamily: FONT_MONO, fontWeight: 700, fontSize: 16,
            letterSpacing: '0.18em', color: C.muted,
            textTransform: 'uppercase',
          }}>{data.terminalPath}</span>
        </div>

        {/* body — left clean for screen overlay */}
        <div style={{
          flex: '1 1 auto',
          padding: '40px 48px',
          fontFamily: FONT_MONO, fontSize: 30, lineHeight: 1.5,
          color: C.navy,
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
        }}>
          <div>
            <span style={{ color: C.orange, fontWeight: 700 }}>$</span>{' '}
            <span style={{
              display: 'inline-block', width: '0.55em', height: '1em',
              background: C.teal, verticalAlign: '-0.15em',
            }} />
          </div>
        </div>
      </div>

      {/* Footer chrome — badge left, M-mark right */}
      <div style={{ position: 'absolute', left: 152, bottom: 64 }}>
        <HandymanBadge size="sm" />
      </div>
      <div style={{ position: 'absolute', right: 96, bottom: 40 }}>
        <MMark size={88} />
      </div>
    </Frame>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// T5 · Caption + Frame
// Left column: eyebrow + headline + supporting line.
// Right column: a chalk drop-zone with a dashed navy outline — Mike pastes a
// screenshot / browser window / clip into this region in editing.
// ─────────────────────────────────────────────────────────────────────────────
function T5Caption({ data }) {
  return (
    <Frame>
      {/* Left column — copy */}
      <div style={{
        position: 'absolute', left: 152, top: 280, width: 700,
      }}>
        <p style={{
          margin: '0 0 24px',
          fontFamily: FONT_MONO, fontWeight: 700,
          fontSize: 22, letterSpacing: '0.22em',
          color: C.orange, textTransform: 'uppercase',
        }}>{data.eyebrow}</p>
        <h1 style={{
          margin: '0 0 32px',
          fontFamily: FONT_MONO, fontWeight: 700,
          fontSize: 92, letterSpacing: '-0.03em',
          lineHeight: 0.95, color: C.navy,
        }}>{data.title}</h1>
        <p style={{
          margin: 0,
          fontFamily: FONT_SANS, fontWeight: 400,
          fontSize: 32, lineHeight: 1.4,
          color: C.muted,
        }}>{data.lede}</p>
      </div>

      {/* Right column — drop zone for screencast / image overlay */}
      <div style={{
        position: 'absolute', right: 152, top: 220,
        width: 920, height: 600,
        background: C.chalk,
        border: `2px solid ${C.navy}`,
        boxShadow: C.shadowCutLg,
        borderRadius: 6,
        overflow: 'hidden',
      }}>
        {/* faux browser top */}
        <div style={{
          padding: '18px 24px',
          borderBottom: `1.5px solid ${C.border}`,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ width: 14, height: 14, borderRadius: '50%', background: C.orange, border: `1.5px solid ${C.navy}` }} />
          <span style={{ width: 14, height: 14, borderRadius: '50%', background: C.yellow, border: `1.5px solid ${C.navy}` }} />
          <span style={{ width: 14, height: 14, borderRadius: '50%', background: C.teal, border: `1.5px solid ${C.navy}` }} />
          <div style={{
            marginLeft: 18, flex: '1 1 auto',
            height: 28, borderRadius: 14,
            border: `1.5px solid ${C.border}`,
            background: C.cream,
            display: 'flex', alignItems: 'center',
            padding: '0 14px',
            fontFamily: FONT_MONO, fontSize: 14,
            color: C.muted, letterSpacing: '0.04em',
          }}>{data.url}</div>
        </div>
        {/* inner placeholder area */}
        <div style={{
          position: 'absolute', inset: '78px 32px 32px 32px',
          border: `2px dashed ${C.border}`,
          borderRadius: 4,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: FONT_MONO, fontWeight: 700,
          fontSize: 20, letterSpacing: '0.22em',
          color: 'rgba(0,30,58, 0.32)',
          textTransform: 'uppercase',
        }}>OVERLAY SCREENCAST HERE</div>
      </div>

      {/* Footer chrome */}
      <div style={{ position: 'absolute', left: 152, bottom: 88 }}>
        <HandymanBadge size="sm" />
      </div>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 104,
        display: 'flex', justifyContent: 'center',
      }}>
        <Tagline size={26} />
      </div>
      <div style={{ position: 'absolute', right: 96, bottom: 64 }}>
        <MMark size={96} />
      </div>
    </Frame>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// T6 · Clean Stage
// A blank canvas with only the two corner marks at the top and the tagline
// at the bottom — no M-mark, no polaroid, no badge, no headline. The entire
// middle is empty so a webcam overlay (or talking-head clip) can sit dead
// center without colliding with brand chrome.
// ─────────────────────────────────────────────────────────────────────────────
function T6CleanStage() {
  return (
    <Frame>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 88,
        display: 'flex', justifyContent: 'center',
      }}>
        <Tagline size={30} />
      </div>
    </Frame>
  );
}

// ─── responsive scaler (1920×1080 → viewport width) ───────────────────────────
function ScaledFrame({ children }) {
  const ref = React.useRef(null);
  const [scale, setScale] = React.useState(1);
  React.useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setScale(Math.min(1, w / 1920));
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ width: '100%', height: 1080 * scale, position: 'relative' }}>
      <div style={{
        width: 1920, height: 1080,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        boxShadow: '0 24px 64px rgba(0,30,58, 0.16), 0 0 0 1px rgba(0,30,58, 0.08)',
        borderRadius: 6,
        overflow: 'hidden',
      }}>
        {children}
      </div>
    </div>
  );
}

// ─── content — single source of truth for the per-template sample copy ──────
const CONTENT = {
  t1: { eyebrow: 'TUTORIAL MAKER', title: 'MIKE MURPHY', caption: 'Mike' },
  t2: { eyebrow: 'OpenAI Codex',  title: 'How to add n8n MCP server' },
  t3: { eyebrow: 'thanks for watching', title: 'See you next one.' },
  t4: { eyebrow: 'TERMINAL',      title: 'Run the install command', terminalPath: '~/code/yours' },
  t5: { eyebrow: 'WHAT WE BUILD', title: 'A local AI chat that follows you across every device.', lede: 'One Hostinger box. Tailscale + Ollama + Open WebUI. Twelve minutes from a fresh server to a private chatbot on your phone.', url: 'https://mikemurphy.co/tutorials' },
};

const TEMPLATES = [
  { id: 't1', label: 'T1 · Title',            note: 'opening frame — brand polaroid, name, AI Handyman badge', Comp: T1Title },
  { id: 't2', label: 'T2 · Section',          note: 'main page — eyebrow + sentence-case headline, right side clean for screencast', Comp: T2Section },
  { id: 't3', label: 'T3 · End Screen',       note: 'closer — clean middle for YouTube end-screen cards', Comp: T3End },
  { id: 't4', label: 'T4 · Code Box',         note: 'empty terminal hero — overlay your screen recording on the panel', Comp: T4CodeBox },
  { id: 't5', label: 'T5 · Caption + Frame',  note: 'title + supporting line on the left, screencast drop-zone on the right', Comp: T5Caption },
  { id: 't6', label: 'T6 · Clean Stage',      note: 'corner marks + tagline only — middle reserved for full webcam overlay', Comp: T6CleanStage },
];

// ── Hidden offscreen frame used by export ─────────────────────────────────
// We mount the target template inside a 1920×1080 box positioned on screen
// at top-left with opacity 0 (so layout + image loading are real) and let it
// render with real fonts, then snapshot to PNG via html-to-image.
function OffscreenFrame({ id, onMounted }) {
  const ref = React.useRef(null);
  const tpl = TEMPLATES.find(t => t.id === id);
  React.useEffect(() => {
    if (ref.current && onMounted) onMounted(ref.current);
  }, []);
  if (!tpl) return null;
  return (
    <div ref={ref} style={{
      position: 'fixed',
      left: 0,
      top: 0,
      width: 1920,
      height: 1080,
      opacity: 0,
      pointerEvents: 'none',
      zIndex: -1,
      overflow: 'hidden',
      background: C.cream,
    }}>
      <tpl.Comp data={CONTENT[id]} />
    </div>
  );
}

// ── Bulk export helper ────────────────────────────────────────────────────
function useBulkExport() {
  const [busy, setBusy] = React.useState(false);
  const [progress, setProgress] = React.useState('');
  const [err, setErr] = React.useState('');
  const [renderId, setRenderId] = React.useState(null);
  const resolveRef = React.useRef(null);

  // When OffscreenFrame mounts a template, resolve the in-flight promise with
  // its DOM node. We wait one extra animation frame so fonts have a tick to
  // settle before capture.
  const handleMounted = React.useCallback((node) => {
    if (resolveRef.current) {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const r = resolveRef.current;
        resolveRef.current = null;
        r(node);
      }));
    }
  }, []);

  const loadLib = async () => {
    if (window.htmlToImage) return;
    await new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://unpkg.com/html-to-image@1.11.11/dist/html-to-image.js';
      s.onload = resolve;
      s.onerror = () => reject(new Error('Could not load html-to-image'));
      document.head.appendChild(s);
    });
  };

  const loadJsZip = async () => {
    if (window.JSZip) return;
    await new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
      s.onload = resolve;
      s.onerror = () => reject(new Error('Could not load JSZip'));
      document.head.appendChild(s);
    });
  };

  const renderOne = (id) => new Promise(resolve => {
    resolveRef.current = resolve;
    setRenderId(id);
  });

  const runOne = async (id) => {
    const node = await renderOne(id);
    // Wait for fonts and images to settle
    if (document.fonts && document.fonts.ready) {
      try { await document.fonts.ready; } catch (e) {}
    }
    const imgs = node.querySelectorAll('img');
    await Promise.all(Array.from(imgs).map(img => {
      if (img.complete && img.naturalWidth > 0) return Promise.resolve();
      return new Promise(resolve => {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
        // Safety timeout
        setTimeout(resolve, 3000);
      });
    }));
    // One more frame for paint
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    const blob = await window.htmlToImage.toBlob(node, {
      width: 1920, height: 1080,
      canvasWidth: 1920, canvasHeight: 1080,
      pixelRatio: 1,
      backgroundColor: '#F1ECE2',
      cacheBust: false,
      style: {
        opacity: '1',
        transform: 'none',
      },
    });
    setRenderId(null);
    return blob;
  };

  const exportSingle = React.useCallback(async (id) => {
    if (busy) return;
    setBusy(true); setErr(''); setProgress('Loading…');
    try {
      await loadLib();
      setProgress(`Rendering ${id.toUpperCase()}…`);
      const blob = await runOne(id);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `MM-${id.toUpperCase()}-1920x1080.png`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setProgress('');
    } catch (e) {
      console.error(e);
      setErr(String(e && e.message || e));
    } finally {
      setBusy(false);
    }
  }, [busy]);

  const exportAll = React.useCallback(async () => {
    if (busy) return;
    setBusy(true); setErr(''); setProgress('Loading libraries…');
    try {
      await loadLib();
      await loadJsZip();
      const zip = new window.JSZip();
      for (const t of TEMPLATES) {
        setProgress(`Rendering ${t.label}…`);
        const blob = await runOne(t.id);
        zip.file(`MM-${t.id.toUpperCase()}-1920x1080.png`, blob);
      }
      setProgress('Building ZIP…');
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url; a.download = 'MM-Tutorial-Overlays-1920x1080.zip';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setProgress('');
    } catch (e) {
      console.error(e);
      setErr(String(e && e.message || e));
    } finally {
      setBusy(false);
    }
  }, [busy]);

  const offscreenNode = renderId
    ? <OffscreenFrame key={renderId} id={renderId} onMounted={handleMounted} />
    : null;

  return { busy, progress, err, exportAll, exportSingle, offscreenNode };
}

// ── Solo view ───────────────────────────────────────────────────────────────
// When the URL has `#solo=tN`, render only that template at native 1920×1080
// with the document sized to match. Any screenshot tool (macOS Cmd+Shift+4,
// Chrome DevTools capture-full-size, browser "Save as image") grabs a clean
// 1920×1080 PNG with no surrounding chrome.
function SoloView({ id, onExport, busy, progress, err }) {
  const tpl = TEMPLATES.find(t => t.id === id) || TEMPLATES[0];
  React.useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prev = { htmlBg: html.style.background, bodyBg: body.style.background, m: body.style.margin, p: body.style.padding };
    html.style.margin = '0';
    html.style.padding = '0';
    html.style.background = C.cream;
    body.style.margin = '0';
    body.style.padding = '0';
    body.style.background = C.cream;
    body.style.width = '1920px';
    body.style.height = '1080px';
    body.style.overflow = 'hidden';
    return () => {
      html.style.background = prev.htmlBg;
      body.style.background = prev.bodyBg;
      body.style.margin = prev.m;
      body.style.padding = prev.p;
      body.style.width = '';
      body.style.height = '';
      body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <div style={{ width: 1920, height: 1080, overflow: 'hidden' }}>
        <tpl.Comp data={CONTENT[id]} />
      </div>
      <div data-no-capture style={{
        position: 'fixed', top: 16, right: 16, zIndex: 9999,
        display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap',
        maxWidth: 560, justifyContent: 'flex-end',
      }}>
        <a href="Tutorial Overlays.html" style={{
          fontFamily: FONT_MONO, fontWeight: 700, fontSize: 12,
          letterSpacing: '0.18em', color: C.navy,
          textTransform: 'uppercase', textDecoration: 'none',
          padding: '10px 14px',
          background: C.chalk,
          border: `2px solid ${C.navy}`,
          borderRadius: 4, boxShadow: C.shadowCutSm,
        }}>← All templates</a>
        <button onClick={() => onExport(id)} disabled={busy} style={{
          fontFamily: FONT_MONO, fontWeight: 700, fontSize: 12,
          letterSpacing: '0.18em', color: C.navy,
          textTransform: 'uppercase',
          padding: '10px 16px',
          background: C.orange,
          border: `2px solid ${C.navy}`,
          borderRadius: 4, boxShadow: C.shadowCutSm,
          cursor: busy ? 'wait' : 'pointer',
        }}>{busy ? (progress || 'Rendering…') : 'Download PNG ↓'}</button>
        {err && (
          <div style={{
            flexBasis: '100%',
            fontFamily: FONT_MONO, fontSize: 12, color: C.navy,
            background: C.yellow,
            border: `2px solid ${C.navy}`,
            padding: '8px 12px', borderRadius: 4,
            marginTop: 6, maxWidth: 540, wordBreak: 'break-word',
          }}>
            <strong>Export failed:</strong> {err}
          </div>
        )}
      </div>
    </>
  );
}

function parseSoloId() {
  const m = (window.location.hash || '').match(/solo=(t\d+)/i);
  return m ? m[1].toLowerCase() : null;
}

function App() {
  const [soloId, setSoloId] = React.useState(parseSoloId());
  React.useEffect(() => {
    const h = () => setSoloId(parseSoloId());
    window.addEventListener('hashchange', h);
    return () => window.removeEventListener('hashchange', h);
  }, []);
  const { busy, progress, err, exportAll, exportSingle, offscreenNode } = useBulkExport();

  if (soloId) return (
    <>
      <SoloView id={soloId} onExport={exportSingle} busy={busy} progress={progress} err={err} />
      {offscreenNode}
    </>
  );
  return (
    <div style={{
      minHeight: '100vh',
      background: C.cream,
      paddingBottom: 96,
      fontFamily: FONT_SANS,
      color: C.navy,
    }}>
      {offscreenNode}
      {/* page header */}
      <header style={{
        maxWidth: 1440, margin: '0 auto', padding: '64px 32px 24px',
      }}>
        <p style={{
          margin: 0, fontFamily: FONT_MONO, fontWeight: 700,
          fontSize: 14, letterSpacing: '0.22em', color: C.orange,
          textTransform: 'uppercase',
        }}>Tutorial overlay templates · 1920 × 1080</p>
        <h1 style={{
          margin: '14px 0 12px', fontFamily: FONT_MONO, fontWeight: 700,
          fontSize: 64, letterSpacing: '-0.03em', lineHeight: 1.02, color: C.navy,
        }}>Six backgrounds for every tutorial.</h1>
        <p style={{
          margin: 0, fontFamily: FONT_SANS, fontSize: 22, lineHeight: 1.5,
          color: C.muted, maxWidth: 820,
        }}>
          The three originals — title, section, end — converted into the v2026.3 system,
          plus three extras (empty code box, captioned drop-zone, clean stage) for
          overlaying screencasts and your webcam in editing.
        </p>
        <div style={{
          marginTop: 24, padding: '14px 20px',
          background: C.chalk,
          border: `1px solid ${C.border}`,
          borderRadius: 6,
          fontFamily: FONT_SANS, fontSize: 16, lineHeight: 1.55, color: C.navy,
          maxWidth: 820,
        }}>
          <strong style={{ fontFamily: FONT_MONO, fontSize: 13, letterSpacing: '0.18em', color: C.orange }}>EXPORT · PNG</strong>
          <p style={{ margin: '6px 0 14px' }}>
            Click the button below to download all six templates as 1920×1080 PNGs in a single ZIP,
            or use the per-template <em>Download PNG</em> buttons below.
          </p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <button onClick={exportAll} disabled={busy} style={{
              fontFamily: FONT_MONO, fontWeight: 700, fontSize: 14,
              letterSpacing: '0.18em', color: C.navy,
              textTransform: 'uppercase',
              padding: '14px 22px',
              background: C.orange,
              border: `2px solid ${C.navy}`,
              borderRadius: 4, boxShadow: C.shadowCutMd,
              cursor: busy ? 'wait' : 'pointer',
            }}>{busy ? (progress || 'Working…') : 'Download all 6 PNGs (.zip) ↓'}</button>
            {progress && !err && (
              <span style={{ fontFamily: FONT_MONO, fontSize: 13, color: C.muted, letterSpacing: '0.05em' }}>{progress}</span>
            )}
          </div>
          {err && (
            <div style={{
              marginTop: 12,
              fontFamily: FONT_MONO, fontSize: 13, color: C.navy,
              background: C.yellow,
              border: `2px solid ${C.navy}`,
              padding: '10px 14px', borderRadius: 4,
              maxWidth: 760, wordBreak: 'break-word',
            }}>
              <strong>Export failed:</strong> {err}<br/>
              The script may be blocked by your browser — try opening the file directly (not in a sandboxed preview) and try again.
            </div>
          )}
        </div>
      </header>

      {/* sticky nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 5,
        background: 'color-mix(in srgb, #F1ECE2 88%, transparent)',
        backdropFilter: 'saturate(140%) blur(8px)',
        WebkitBackdropFilter: 'saturate(140%) blur(8px)',
        borderBottom: `1px solid ${C.border}`,
        padding: '14px 32px',
      }}>
        <div style={{
          maxWidth: 1440, margin: '0 auto',
          display: 'flex', flexWrap: 'wrap', gap: 8,
          fontFamily: FONT_MONO, fontSize: 13, letterSpacing: '0.16em',
        }}>
          {TEMPLATES.map(v => (
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

      {/* templates */}
      <main style={{ maxWidth: 1440, margin: '0 auto', padding: '48px 32px 0' }}>
        {TEMPLATES.map(v => (
          <section key={v.id} id={v.id} data-screen-label={v.label} style={{ marginBottom: 96 }}>
            <div style={{
              display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
              gap: 20, marginBottom: 22, flexWrap: 'wrap',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <h2 style={{
                  margin: 0, fontFamily: FONT_MONO, fontWeight: 700,
                  fontSize: 32, letterSpacing: '-0.02em', color: C.navy,
                }}>{v.label}</h2>
                <button onClick={() => exportSingle(v.id)} disabled={busy} style={{
                  fontFamily: FONT_MONO, fontWeight: 700, fontSize: 12,
                  letterSpacing: '0.18em', color: C.navy,
                  textTransform: 'uppercase',
                  padding: '8px 14px',
                  background: C.orange,
                  border: `2px solid ${C.navy}`,
                  borderRadius: 4,
                  boxShadow: C.shadowCutSm,
                  cursor: busy ? 'wait' : 'pointer',
                }}>Download PNG ↓</button>
                <a
                  href={`#solo=${v.id}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontFamily: FONT_MONO, fontWeight: 700, fontSize: 12,
                    letterSpacing: '0.18em', color: C.navy,
                    textTransform: 'uppercase', textDecoration: 'none',
                    padding: '8px 14px',
                    background: 'transparent',
                    border: `2px solid ${C.navy}`,
                    borderRadius: 4,
                  }}>Open solo ↗</a>
              </div>
              <p style={{
                margin: 0, fontFamily: FONT_SANS, fontSize: 17, color: C.muted,
                maxWidth: 600, textAlign: 'right',
              }}>{v.note}</p>
            </div>
            <ScaledFrame><v.Comp data={CONTENT[v.id]} /></ScaledFrame>
          </section>
        ))}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
