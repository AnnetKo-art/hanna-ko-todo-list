import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function ProfilePage() {
  const { email, token } = useAuth();

  const [todoStats, setTodoStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

        const response = await fetch("/api/tasks", options);

        if (response.status === 401) {
          throw new Error("Unauthorized");
        }

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data = await response.json();
        const todos = data.tasks || data;
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

  const completionPercentage =
    todoStats.total > 0
      ? Math.round((todoStats.completed / todoStats.total) * 100)
      : 0;
  const userInitial = (email || "User").charAt(0).toUpperCase();
  return (
    <div className="max-w-4xl mx-auto w-full">
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
        User Profile
      </h2>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-10 flex items-center gap-6 transition-colors">
        {/* Avatar Circle */}
        <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-3xl font-black shrink-0">
          {userInitial}
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome, {email || "User"}!
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Account Status: Active
            </span>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Your Todo Statistics
      </h3>

      {loading && (
        <div className="text-gray-500 dark:text-gray-400 animate-pulse font-medium">
          Loading your live stats...
        </div>
      )}

      {error && (
        <div className="text-red-500 bg-red-50 dark:bg-red-500/10 p-4 rounded-lg font-bold">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
            <div className="text-xs font-bold tracking-wider text-gray-500 uppercase">
              Total
            </div>
            <div className="text-4xl font-black text-gray-900 dark:text-white mt-2">
              {todoStats.total}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
            <div className="text-xs font-bold tracking-wider text-gray-500 uppercase">
              Completed
            </div>
            <div className="text-4xl font-black text-green-600 mt-2">
              {todoStats.completed}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
            <div className="text-xs font-bold tracking-wider text-gray-500 uppercase">
              Active
            </div>
            <div className="text-4xl font-black text-amber-500 mt-2">
              {todoStats.active}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
            <div className="text-xs font-bold tracking-wider text-gray-500 uppercase">
              Completion Rate
            </div>
            <div className="text-4xl font-black text-blue-600 mt-2">
              {completionPercentage}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
