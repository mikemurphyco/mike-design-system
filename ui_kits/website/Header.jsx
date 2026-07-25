/* global React */
const { useState, useEffect, useRef } = React;

function Header({ current = 'home', onNav }) {
  // CONTENT groups the reading surfaces; the rest stay flat.
  const contentItems = [
    { id: 'tutorials',   label: 'Tutorials',   desc: 'Step-by-step, clearly explained' },
    { id: 'articles',    label: 'Articles',    desc: 'Longer reads and how-tos' },
    { id: 'field-notes', label: 'Field Notes', desc: 'Quick tips, snippets, and shortcuts' },
    { id: 'podcast',     label: 'Podcast',     desc: 'Mike Murphy Unplugged' },
  ];
  const moreItems = [
    { id: 'newsletter', label: 'AI Unplugged' },
    { id: 'resources',  label: 'Resources' },
    { id: 'about',      label: 'About' },
  ];

  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const contentActive = contentItems.some(it => it.id === current);

  // Click-to-open, never hover: hover menus fail on trackpads and touch.
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const go = (id) => { setOpen(false); onNav(id); };

  return (
    <header className="site-header">
      <div className="container row">
        <div className="brand-lockup" onClick={() => onNav('home')}>
          {/* Loop stays orange in both themes — canon lockup rule. */}
          <svg className="loop-mark" viewBox="0 0 64 64" role="img" aria-label="Mike Murphy loop mark">
            <path
              d="M12 32 C12 19 20 8 32 8 C45 8 53 19 53 32 C53 44 45 55 32 55 C21 55 13 47 13 38 C13 29 19 23 27 23 C35 23 40 29 40 36 C40 42 35 46 29 44 C24 43 22 38 23 33"
              fill="none" stroke="var(--mm-orange)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
          <div>
            <div className="brand-name">MIKE MURPHY</div>
            <div className="brand-eyebrow">AI HANDYMAN</div>
          </div>
        </div>

        <nav className="nav">
          <div className="nav-dropdown-wrap" ref={wrapRef}>
            <button
              className={`nav-link nav-trigger ${contentActive ? 'is-active' : ''}`}
              aria-expanded={open}
              aria-haspopup="true"
              onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}
            >
              Content
              <svg className="nav-chevron" width="9" height="9" viewBox="0 0 10 10" fill="none"
                   stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M1.5 3.5 L5 7 L8.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {open && (
              <div className="nav-dropdown">
                {contentItems.map(it => (
                  <a key={it.id} className="nav-dd-item" href="#"
                     onClick={(e) => { e.preventDefault(); go(it.id); }}>
                    <span className="nav-dd-label">
                      {it.label} <span className="nav-dd-arrow">&rarr;</span>
                    </span>
                    <span className="nav-dd-desc">{it.desc}</span>
                  </a>
                ))}
                <div className="nav-dd-foot">
                  <a className="nav-dd-all" href="#"
                     onClick={(e) => { e.preventDefault(); go('topics'); }}>
                    Browse all topics &rarr;
                  </a>
                </div>
              </div>
            )}
          </div>

          {moreItems.map(it => (
            <button
              key={it.id}
              className={`nav-link ${current === it.id ? 'is-active' : ''}`}
              onClick={() => onNav(it.id)}
            >
              {it.label}
            </button>
          ))}
        </nav>

        {/* Search is an icon, not a nav link — the header holds no text input. */}
        <div className="nav-utility">
          <button className="nav-icon-btn" aria-label="Search" onClick={() => onNav('search')}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor"
                 strokeWidth="1.6" aria-hidden="true">
              <circle cx="7" cy="7" r="4.5" />
              <path d="M10.5 10.5 L14 14" strokeLinecap="round" />
            </svg>
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => onNav('newsletter')}>Subscribe</button>
        </div>
      </div>
    </header>
  );
}
