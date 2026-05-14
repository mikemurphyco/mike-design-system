/* global React */

function Hero({ onNav }) {
  return (
    <section className="hero">
      <div className="container row">
        <div className="hero-copy">
          <p className="h-eyebrow">v2026.1 · New tutorials weekly</p>
          <h1>AI tools, explained clearly.</h1>
          <p className="lede">
            I'm Mike. I make short, practical tutorials for the people the AI industry
            forgets — curious humans who want to use the tools, not debate them.
          </p>
          <div className="actions">
            <button className="btn btn-primary" onClick={() => onNav('tutorials')}>Browse the tutorials</button>
            <button className="btn btn-secondary" onClick={() => onNav('about')}>About Mike</button>
          </div>
        </div>
        <div className="art">
          <div className="polaroid">
            <div className="polaroid-photo">
              <img src="assets/avatar-mike-transparent.png" alt="Mike Murphy" />
            </div>
            <div className="polaroid-caption">Mike</div>
          </div>
        </div>
      </div>
    </section>
  );
}
