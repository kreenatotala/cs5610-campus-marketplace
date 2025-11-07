import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../lib/apiClient.js";
import { saveUser } from "../lib/auth.js";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [status, setStatus] = useState({ loading: false, error: "", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: "", message: "" });

    try {
      const user = await post("/api/auth/login", formData);
      saveUser(user);
      setStatus({
        loading: false,
        error: "",
        message: `Signed in as ${user.firstName || user.username}`,
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
    <main>
      <section className="page-shell">
        <span className="page-badge">Welcome back</span>
        <header>
          <h1 className="page-title">Sign in to your account</h1>
          <p className="page-description">
            Access listings, track your offers, and stay connected with buyers and sellers
            across campus.
          </p>
        </header>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            placeholder="your-husky-id"
            value={formData.username}
            onChange={handleChange}
            autoComplete="username"
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

          <button className="btn btn-primary" type="submit" disabled={status.loading}>
            {status.loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {status.error && <p className="form-error">{status.error}</p>}
        {status.message && <p className="form-success">{status.message}</p>}

        <p className="muted-text">
          New here? <Link className="subtle-link" to="/register">Create an account</Link>
        </p>
      </section>
    </main>
  );
}
