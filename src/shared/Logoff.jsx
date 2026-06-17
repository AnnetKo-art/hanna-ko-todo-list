import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function Logoff() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [logoffError, setLogoffError] = useState("");
  const [isLoggingOff, setIsLoggingOff] = useState(false);

  async function handleLogout() {
    setIsLoggingOff(true);
    setLogoffError("");

    const result = await logout();

    if (result.success) {
      navigate("/login");
    } else {
      setLogoffError(result.error);
      setIsLoggingOff(false);
    }
  }

  return (
    <div className="logoff-container flex flex-col items-end gap-1">
      {logoffError && (
        <p className="text-xs font-bold text-red-500 dark:text-red-400">
          {logoffError}
        </p>
      )}
      <button
        onClick={handleLogout}
        disabled={isLoggingOff}
        className="px-5 py-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20 rounded-lg transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoggingOff ? "Logging out..." : "Log Off"}
      </button>
    </div>
  );
}
