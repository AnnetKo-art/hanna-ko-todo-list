import { NavLink } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function Navigation() {
  const { isAuthenticated } = useAuth();

  // The function React Router automatically calls to determine link styling
  const navLinkStyle = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "underline" : "none",
      color: "inherit" // Keeps the text color looking normal
    };
  };

  return (
    <nav>
      
      <ul style={{ listStyle: "none", display: "flex", gap: "1rem", padding: 0 }}>
        
        {/* The About link is always visible to everyone */}
        <li>
          <NavLink to="/about" style={navLinkStyle}>
            About
          </NavLink>
        </li>

        {/* Conditional rendering based on authentication status */}
        {isAuthenticated ? (
          <>
            <li>
              <NavLink to="/todos" style={navLinkStyle}>
                Todos
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" style={navLinkStyle}>
                Profile
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login" style={navLinkStyle}>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}