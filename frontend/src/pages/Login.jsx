import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../lib/apiClient.js";
import { saveUser } from "../lib/auth.js";
import GlobalNav from "../components/header.jsx";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [status, setStatus] = useState({
    loading: false,
    error: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: "", message: "" });

    const email = formData.username.trim();
    if (!email.toLowerCase().endsWith("@northeastern.edu")) {
      setStatus({
        loading: false,
        error: "Please use your northeastern.edu email address.",
        message: "",
      });
      return;
    }

    try {
      const user = await post("/api/auth/login", {
        ...formData,
        username: email,
      });
      setFormData((prev) => ({ ...prev, username: email }));
      saveUser(user);
      setStatus({
        loading: false,
        error: "",
        message: `Signed in as ${user.firstName || email}`,
      });

      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      setStatus({
        loading: false,
        error: err.message || "Unable to sign in",
        message: "",
      });
    }
  };

  return (
    <>
      <GlobalNav />
      <main>
        <section className="page-shell login-card">
          <span className="page-badge">Welcome back</span>
          <header className="login-intro">
            <h1 className="page-title">Sign in to your account</h1>
            <p className="page-description">
              Access listings, track your offers, and stay connected with buyers
              and sellers across campus.
            </p>
          </header>

          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Northeastern email</label>
            <input
              id="username"
              name="username"
              placeholder="you@northeastern.edu"
              value={formData.username}
              onChange={handleChange}
              autoComplete="email"
              type="email"
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />

            <button
              className="btn btn-primary"
              type="submit"
              disabled={status.loading}
            >
              {status.loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {status.error && <p className="form-error">{status.error}</p>}
          {status.message && <p className="form-success">{status.message}</p>}

          <p className="muted-text">
            New here?{" "}
            <Link className="subtle-link" to="/register">
              Create an account
            </Link>
          </p>
        </section>
      </main>
    </>
  );
}
