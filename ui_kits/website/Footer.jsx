/* global React */

function Footer({ onNav }) {
  return (
    <footer className="site-footer">
      <div className="container row">
        <div className="left">
          <span className="m-disc" style={{ width: 28, height: 28, fontSize: 16 }}>M</span>
          <span className="tagline-footer">LEARN<span className="dot">·</span>BUILD<span className="dot">·</span>MOVE FORWARD</span>
        </div>
        <div className="foot-links">
          <button className="nav-link" onClick={() => onNav('home')}>Home</button>
          <button className="nav-link" onClick={() => onNav('tutorials')}>Tutorials</button>
          <button className="nav-link" onClick={() => onNav('about')}>About</button>
          <button className="nav-link" onClick={() => onNav('newsletter')}>Newsletter</button>
        </div>
        <div className="foot-copy">© 2026 · v2026.2</div>
      </div>
    </footer>
  );
}
