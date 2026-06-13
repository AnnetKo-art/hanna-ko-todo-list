import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <h2>Oops! Page Not Found</h2>
      <p className="not-found-text">
        We can't seem to find the page you're looking for. It might have been removed, 
        renamed, or the URL might be misspelled.
      </p>

      <div className="recovery-links">
        <Link to="/" className="btn-link">Go to Home</Link>
        <Link to="/todos" className="btn-link">View My Todos</Link>
        <Link to="/about" className="btn-link">About This App</Link>
      </div>
    </div>
  );
}