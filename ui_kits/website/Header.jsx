/* global React */
const { useState } = React;

function Header({ current = 'home', onNav }) {
  const items = [
    { id: 'home',      label: 'Home' },
    { id: 'tutorials', label: 'Tutorials' },
    { id: 'about',     label: 'About' },
    { id: 'newsletter',label: 'Newsletter' },
  ];
  return (
    <header className="site-header">
      <div className="container row">
        <div className="brand-lockup" onClick={() => onNav('home')}>
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
          {items.map(it => (
            <button
              key={it.id}
              className={`nav-link ${current === it.id ? 'is-active' : ''}`}
              onClick={() => onNav(it.id)}
            >
              {it.label}
            </button>
          ))}
          <button className="btn btn-primary btn-sm" onClick={() => onNav('newsletter')}>Subscribe</button>
        </nav>
      </div>
    </header>
  );
}
