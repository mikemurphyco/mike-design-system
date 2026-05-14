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
          <span className="m-disc">M</span>
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
