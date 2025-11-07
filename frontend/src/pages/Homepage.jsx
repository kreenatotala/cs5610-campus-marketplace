import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearUser, getStoredUser } from "../lib/auth.js";

export default function Homepage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => getStoredUser());

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const handleSignOut = () => {
    clearUser();
    setUser(null);
    navigate("/login");
  };

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

        {user ? (
          <div className="auth-banner">
            <span>
              Signed in as <strong>{user.firstName || user.username}</strong>
            </span>
            <button className="btn btn-secondary" type="button" onClick={handleSignOut}>
              Sign out
            </button>
          </div>
        ) : (
          <div className="cta-group">
            <Link className="btn btn-primary" to="/login">
              Sign in
            </Link>
            <Link className="btn btn-secondary" to="/register">
              Create account
            </Link>
          </div>
        )}

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
