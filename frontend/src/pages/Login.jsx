import { Link } from "react-router-dom";

export default function Login() {
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

        <form>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" placeholder="you@university.edu" type="email" />

          <label htmlFor="password">Password</label>
          <input id="password" name="password" placeholder="••••••••" type="password" />

          <button className="btn btn-primary" type="submit">
            Sign in
          </button>
        </form>

        <p className="muted-text">
          New here? <Link className="subtle-link" to="/register">Create an account</Link>
        </p>
      </section>
    </main>
  );
}
