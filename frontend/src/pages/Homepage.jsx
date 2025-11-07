import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <main>
      <article className="page-shell">
        <span className="page-badge">Campus marketplace</span>
        <header>
          <h1 className="page-title">Where campus finds its next favorite thing.</h1>
          <p className="page-description">
            Discover a space built for students to move essentials quickly, fairly, and
            without the endless group chat scroll.
          </p>
        </header>

        <div className="cta-group">
          <Link className="btn btn-primary" to="/login">
            Sign in
          </Link>
          <Link className="btn btn-secondary" to="/register">
            Create account
          </Link>
        </div>

        <div className="divider" />

        <ul className="feature-list">
          <li>Verified profiles keep trades accountable and friendly.</li>
          <li>Smart filters surface listings from the buildings you frequent.</li>
          <li>Zero listing fees so more value stays in our campus community.</li>
        </ul>
      </article>
    </main>
  );
}
