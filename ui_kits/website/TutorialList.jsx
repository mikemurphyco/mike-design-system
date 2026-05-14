/* global React, TutorialCard */
const { useState: useStateList } = React;

function TutorialList({ tutorials, onOpen }) {
  const [topic, setTopic] = useStateList('All');
  const topics = ['All', 'Claude', 'Codex', 'MCP', 'VPS', 'Skills'];
  const filtered = topic === 'All' ? tutorials : tutorials.filter(t => t.tag.includes(topic));

  return (
    <section className="list-page">
      <div className="container">
        <div className="list-head">
          <div>
            <span className="eyebrow">All tutorials</span>
            <h1 className="h-section" style={{ marginTop: 8 }}>The catalog</h1>
          </div>
          <p className="lede" style={{ maxWidth: '38ch', margin: 0 }}>
            Short, practical walk-throughs for AI tools you can actually use this week.
          </p>
        </div>

        <div className="filter-row">
          {topics.map(t => (
            <button
              key={t}
              className={`pill-topic ${topic === t ? 'is-active' : ''}`}
              onClick={() => setTopic(t)}
            >{t}</button>
          ))}
        </div>

        <div className="t-grid">
          {filtered.map(t => <TutorialCard key={t.id} tutorial={t} onOpen={onOpen} />)}
        </div>
      </div>
    </section>
  );
}
