import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AUTH_EVENT, clearUser, getStoredUser } from "../lib/auth.js";
import "./header.css";

export default function GlobalNav() {
  const navigate = useNavigate();
  const location = useLocation();
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
    if (location.pathname !== "/login") {
      navigate("/login");
    }
  };

  return (
    <nav className="global-nav">
      <div className="nav-shell">
        <Link className="nav-brand" to="/">
          Campus Marketplace
        </Link>
        <div className="nav-actions">
          <Link className="nav-link" to="/">
            Home
          </Link>
          {user ? (
            <>
              <span className="nav-user">{user.firstName || user.username}</span>
              <button className="btn btn-secondary nav-signout" type="button" onClick={handleSignOut}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">
                Sign in
              </Link>
              <Link className="btn btn-primary nav-cta" to="/register">
                Create account
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

