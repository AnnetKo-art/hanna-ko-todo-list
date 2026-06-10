import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Logon() {
  const { login } = useAuth();
  // controlled form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // authentication error message
  const [authError, setAuthError] = useState("");

  // loading state
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoggingOn(true);
    setAuthError("");
    // Call the login method from context
    const result = await login(email, password);

    // Handle the success/error response returned by the context
    if (!result.success) {
      setAuthError(result.error);
    }

    setIsLoggingOn(false);
  }
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
