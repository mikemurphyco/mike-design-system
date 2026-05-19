/* global React */

function TutorialDetail({ tutorial, onBack, onNav }) {
  return (
    <section className="detail-page">
      <div className="container">
        <button className="back-link" onClick={onBack}>← Back to all tutorials</button>

        <div className="detail-grid">
          <article>
            <div className="detail-meta">
              <span className="badge-ai-handyman" style={{ whiteSpace: 'nowrap' }}>AI HANDYMAN</span>
            </div>
            <div className="detail-meta" style={{ marginTop: -8 }}>
              <span className="pill-topic">{tutorial.tag}</span>
              <span className="stamp">{tutorial.time} read · v2026.2</span>
            </div>
            <h1 className="h-article">{tutorial.title}</h1>
            <p className="lede" style={{ marginTop: 16 }}>{tutorial.lede}</p>

            <div className="prose" style={{ marginTop: 32 }}>
              <p>
                Here's what this actually does. Most people open the docs, see five paragraphs about
                "context", panic, and close the tab. I did the same thing the first three times.
              </p>
              <p>
                So we'll skip the theory and go straight to the part where it works on your machine.
              </p>

              <h2>What you'll need</h2>
              <p>
                Just two things: the <code>claude</code> CLI installed, and a folder you actually
                want to work in. That's it. No API keys for this part.
              </p>

              <pre className="code-block"><span className="prompt">$ </span>claude mcp add filesystem<br/><span className="prompt">$ </span>claude mcp list<span className="cursor"></span></pre>

              <div className="callout">
                <div className="callout-mark">!</div>
                <div className="callout-body">
                  <strong>This is where people get stuck.</strong> If you see "command not found",
                  the CLI didn't install onto your PATH. Run <code>which claude</code>; if nothing
                  comes back, reinstall and pick the option that adds it to your shell profile.
                </div>
              </div>

              <h2>The actually-useful part</h2>
              <p>
                Once it's wired up, Claude can read and write files in that folder directly. No
                copy-paste, no "here's my code in a markdown block, please respond with the full
                file." It just edits.
              </p>
              <p>
                This part is a little janky, but it works: ask it to read a file, then ask for a
                change, then ask it to write the file back. Three turns. That's the loop.
              </p>
            </div>
          </article>

          <aside className="detail-aside">
            <div className="aside-card">
              <div className="aside-card-name">In this tutorial</div>
              <nav className="toc">
                <a href="#need">What you'll need</a>
                <a href="#install">Install and verify</a>
                <a href="#stuck">Where people get stuck</a>
                <a href="#loop">The actual loop</a>
              </nav>
            </div>
            <div className="aside-card">
              <div className="aside-card-name">Liked this?</div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}>
                I send one of these every Sunday. No hype, no AI doom. Just the thing that worked
                for me this week.
              </p>
              <button className="btn btn-primary btn-sm" onClick={() => onNav('newsletter')}>Subscribe</button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
