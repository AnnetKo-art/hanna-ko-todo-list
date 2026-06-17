import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <h1 className="text-9xl font-black text-gray-500/50 dark:text-gray-300/50 mb-4 tracking-tighter">
        404
      </h1>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Oops! Page Not Found
      </h2>

      <p className="max-w-md text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
        We can't seem to find the page you're looking for. It might have been
        removed, renamed, or the URL might be misspelled.
      </p>

      {/* Structured grid of buttons for easy recovery */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg shadow-blue-500/30 transition-all"
        >
          Go to Home
        </Link>
        <Link
          to="/todos"
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-lg transition-colors"
        >
          View My Todos
        </Link>
        <Link
          to="/about"
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-lg transition-colors"
        >
          About This App
        </Link>
      </div>
    </div>
  );
}
