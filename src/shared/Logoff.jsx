import { useState } from "react";
import { useNavigate } from 'react-router';
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
      navigate('/login'); 
    } else {
      setLogoffError(result.error);
      setIsLoggingOff(false);
    }
  }

  return (
    <div className="logoff-container">
      {logoffError && (
        <p style={{ color: "red", fontSize: "0.8rem" }}>{logoffError}</p>
      )}
      <button onClick={handleLogout} disabled={isLoggingOff}>
        {isLoggingOff ? "Logging out..." : "Log Off"}
      </button>
    </div>
  );
}
