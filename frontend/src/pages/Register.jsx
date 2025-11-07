import { Link } from "react-router-dom";

export default function Register() {
  return (
    <main>
      <section className="page-shell">
        <span className="page-badge">Create profile</span>
        <header>
          <h1 className="page-title">Join the marketplace community</h1>
          <p className="page-description">
            Build trust with a verified campus profile, list items in minutes, and connect
            with peers who share your interests.
          </p>
        </header>

        <form>
          <label htmlFor="firstName">First name</label>
          <input id="firstName" name="firstName" placeholder="Alex" type="text" />

          <label htmlFor="lastName">Last name</label>
          <input id="lastName" name="lastName" placeholder="Chen" type="text" />

          <label htmlFor="email">University email</label>
          <input id="email" name="email" placeholder="alex.chen@university.edu" type="email" />

          <label htmlFor="password">Password</label>
          <input id="password" name="password" placeholder="Create a secure password" type="password" />

          <button className="btn btn-primary" type="submit">
            Create account
          </button>
        </form>

        <p className="muted-text">
          Already a member? <Link className="subtle-link" to="/login">Sign in</Link>
        </p>
      </section>
    </main>
  );
}
