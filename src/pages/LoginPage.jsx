import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  // 1. Destructure what we need from AuthContext
  const { login, isAuthenticated } = useAuth();
  
  // 2. Initialize Router hooks
  const navigate = useNavigate();
  const location = useLocation();

  // 3. Migrate state from the old Logon.jsx
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  // 4. Get intended destination from location state, default to /todos
  const from = location.state?.from?.pathname || "/todos";

  // 5. Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // 6. Handle form submission
  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoggingOn(true);
    setAuthError("");
    
    // Call the login method from context
    const result = await login(email, password);

    // Handle the error response
    if (!result.success) {
      setAuthError(result.error);
    }
    // Note: We don't need a success block here because if login succeeds, 
    // isAuthenticated becomes true, and the useEffect above handles the redirect!

    setIsLoggingOn(false);
  }

  // 7. Return the existing JSX from Logon.jsx
  return (
    <div>
      {authError && <p style={{ color: "red" }}>{authError}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />
        </div>

        <button type="submit" disabled={isLoggingOn}>
          {isLoggingOn ? "Logging in..." : "Log On"}
        </button>
      </form>
    </div>
  );
}