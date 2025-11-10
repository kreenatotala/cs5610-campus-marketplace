import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../lib/apiClient.js";
import { saveUser } from "../lib/auth.js";
import GlobalNav from "../components/header.jsx";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });
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
    const email = formData.username.trim();
    if (!email.toLowerCase().endsWith("@northeastern.edu")) {
      setStatus({
        loading: false,
        error: "Please use your northeastern.edu email address.",
        message: "",
      });
      return;
    }

    setStatus({ loading: true, error: "", message: "" });

    const payload = { ...formData, username: email };
    setFormData((prev) => ({ ...prev, username: email }));

    try {
      const user = await post("/api/auth/register", payload);
      saveUser(user);
      setStatus({
        loading: false,
        error: "",
        message: `Welcome, ${user.firstName || email}!`,
      });

      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      setStatus({
        loading: false,
        error: err.message || "Unable to create account",
        message: "",
      });
    }
  };

  return (
    <>
      <GlobalNav />
      <main>
        <section className="page-shell register-card">
          <span className="page-badge">Create profile</span>
          <header className="register-grid">
            <h1 className="page-title">Join the marketplace community</h1>
            <p className="page-description">
              Build trust with a verified campus profile, list items in minutes,
              and connect with peers who share your interests.
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

            <div className="name-row">
              <div>
                <label htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  name="firstName"
                  placeholder="Alex"
                  value={formData.firstName}
                  onChange={handleChange}
                  autoComplete="given-name"
                />
              </div>
              <div>
                <label htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  name="lastName"
                  placeholder="Chen"
                  value={formData.lastName}
                  onChange={handleChange}
                  autoComplete="family-name"
                />
              </div>
            </div>

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              placeholder="Create a secure password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />

            <button
              className="btn btn-primary"
              type="submit"
              disabled={status.loading}
            >
              {status.loading ? "Creating..." : "Create account"}
            </button>
          </form>

          {status.error && <p className="form-error">{status.error}</p>}
          {status.message && <p className="form-success">{status.message}</p>}

          <p className="muted-text">
            Already a member?{" "}
            <Link className="subtle-link" to="/login">
              Sign in
            </Link>
          </p>
        </section>
      </main>
    </>
  );
}
