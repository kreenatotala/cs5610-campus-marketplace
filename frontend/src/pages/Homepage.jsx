import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <main>
      <h1>Campus Marketplace</h1>
      <p>Buy, sell, and trade with fellow Huskies.</p>
      <div>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </main>
  );
}
