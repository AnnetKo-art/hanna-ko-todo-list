import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function ProfilePage() {
  const { email, token } = useAuth();

  //Local state for API data, matching the instructor's naming
  const [todoStats, setTodoStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //Fetch statistics when component mounts (Instructor's exact logic)
  useEffect(() => {
    async function fetchTodoStats() {
      if (!token) return;

      try {
        setLoading(true);
        setError("");

        const options = {
          method: "GET",
          headers: { "X-CSRF-TOKEN": token },
          credentials: "include",
        };

        // Using /api/tasks instead of the old /api/todos
        const response = await fetch("/api/tasks", options);

        if (response.status === 401) {
          throw new Error("Unauthorized");
        }

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data = await response.json();
        const todos = data.tasks || data;

        // Calculate statistics
        const total = todos.length;
        const completed = todos.filter((todo) => todo.isCompleted).length;
        const active = total - completed;

        setTodoStats({ total, completed, active });
      } catch (err) {
        setError(`Error loading statistics: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchTodoStats();
  }, [token]);

  // Calculate completion percentage
  const completionPercentage =
    todoStats.total > 0
      ? Math.round((todoStats.completed / todoStats.total) * 100)
      : 0;

  // Render UI
  return (
    <div className="profile-container">
      <h1>User Profile</h1>

      <div className="user-info" style={{ marginBottom: "2rem" }}>
        {/* Your context stores data.name inside the 'email' variable */}
        <h2>Welcome, {email || "User"}!</h2>
        <p>
          <strong>Account Status:</strong> Active
        </p>
      </div>

      <h3>Your Todo Statistics</h3>

      {loading && <p>Loading your stats...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div
          className="stats-grid"
          style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
        >
          <div className="stat-card">
            <h4>Total</h4>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
              {todoStats.total}
            </p>
          </div>
          <div className="stat-card">
            <h4>Completed</h4>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "green" }}>
              {todoStats.completed}
            </p>
          </div>
          <div className="stat-card">
            <h4>Active</h4>
            <p
              style={{ fontSize: "24px", fontWeight: "bold", color: "orange" }}
            >
              {todoStats.active}
            </p>
          </div>
          <div className="stat-card">
            <h4>Completion Rate</h4>
            <p
              style={{ fontSize: "24px", fontWeight: "bold", color: "#007bff" }}
            >
              {completionPercentage}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
