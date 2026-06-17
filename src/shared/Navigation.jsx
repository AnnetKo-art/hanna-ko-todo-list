import { NavLink } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";

export default function Navigation() {
  const { isAuthenticated } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return savedTheme === "dark" || (!savedTheme && prefersDark);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md transition-colors ${
      isActive
        ? "font-bold underline text-blue-600 dark:text-blue-400"
        : "hover:bg-gray-200 dark:hover:bg-gray-800"
    }`;

  return (
    <nav className="flex items-center gap-4 sm:gap-6">
      <ul className="flex gap-4 p-0 m-0 list-none items-center">
        <li>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
        </li>

        {isAuthenticated ? (
          <>
            <li>
              <NavLink to="/todos" className={navLinkClass}>
                Todos
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className={navLinkClass}>
                Profile
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
          </li>
        )}
      </ul>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full font-medium transition-colors hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </nav>
  );
}
