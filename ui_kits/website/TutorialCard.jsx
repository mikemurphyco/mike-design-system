/* global React */

function TutorialCard({ tutorial, onOpen }) {
  return (
    <article className="t-card" onClick={() => onOpen(tutorial)}>
      <div className="t-card-head">
        <div className="t-card-thumb" style={{ background: tutorial.thumbColor }}>
          {tutorial.thumbGlyph && (
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 28,
              color: tutorial.thumbInk || 'var(--mm-chalk)',
            }}>{tutorial.thumbGlyph}</div>
          )}
        </div>
        {tutorial.isNew && <span className="badge-status"><span className="live-dot"></span>New</span>}
      </div>
      <p className="t-card-eyebrow">{tutorial.tag}</p>
      <h3 className="t-card-title">{tutorial.title}</h3>
      <p className="t-card-body">{tutorial.lede}</p>
      <div className="t-card-foot">
        <span className="t-card-meta">{tutorial.time} read</span>
        <span className="t-card-meta">→</span>
      </div>
    </article>
  );
}
