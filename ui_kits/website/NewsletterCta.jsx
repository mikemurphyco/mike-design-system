/* global React */
const { useState: useStateNL } = React;

function NewsletterCta({ onDone }) {
  const [email, setEmail] = useStateNL('');
  const [done, setDone] = useStateNL(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    if (onDone) onDone();
  };

  return (
    <section className="newsletter">
      <div className="container row">
        <div>
          <span className="nl-eyebrow">FREE NEWSLETTER FOR AI BUILDERS</span>
          <h2 style={{ marginTop: 14 }}>AI Unplugged</h2>
          <p>
            Practical AI tools, tips and resources — hand-picked by Mike Murphy.
            One short email, every Friday.
          </p>
        </div>

        {done ? (
          <div className="form">
            <span className="done">✓ You're in. Check your inbox.</span>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}>
              First issue lands this Friday. If it's not in your inbox, peek in spam — it usually
              gets there once and then you can mark me as not-spam forever.
            </p>
          </div>
        ) : (
          <form className="form" onSubmit={submit}>
            <label htmlFor="nl-email">Your email</label>
            <input
              id="nl-email"
              type="email"
              required
              placeholder="you@somewhere.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Subscribe to AI Unplugged</button>
          </form>
        )}
      </div>
    </section>
  );
}
