import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GlobalNav from "../components/header.jsx";
import { AUTH_EVENT, clearUser, getStoredUser } from "../lib/auth.js";
import "./Homepage.css";

export default function Homepage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => getStoredUser());

  useEffect(() => {
    const handleAuth = (event) => setUser(event.detail ?? getStoredUser());
    window.addEventListener(AUTH_EVENT, handleAuth);
    setUser(getStoredUser());
    return () => window.removeEventListener(AUTH_EVENT, handleAuth);
  }, []);

  const handleSignOut = () => {
    clearUser();
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <GlobalNav />
      <main>
        <article className="page-shell homepage-card">
          <span className="page-badge">Campus marketplace</span>
          <header>
            <h1 className="page-title">
              Where huskies find their next favorite thing.
            </h1>
            <p className="page-description">
              Discover a space built for students to move essentials quickly,
              fairly, and without the endless group chat scroll.
            </p>
          </header>

          {user ? (
            <div className="auth-banner">
              <span>
                Signed in as <strong>{user.firstName || user.username}</strong>
              </span>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="homepage-cta">
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
            <li>
              Smart filters surface listings from the buildings you frequent.
            </li>
            <li>
              Zero listing fees so more value stays in our campus community.
            </li>
          </ul>
        </article>
      </main>
    </>
  );
}
