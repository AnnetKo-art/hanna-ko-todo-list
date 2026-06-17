export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto w-full py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-8 transition-colors">
        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
          About This Application
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Welcome to the Hanna's Todo List! This application was built to
          demonstrate modern web development practices, focusing on secure,
          client-side routing and state management.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            🚀 Key Features
          </h3>
          <ul className="space-y-4 text-gray-600 dark:text-gray-300">
            <li>
              <strong>Multi-page Architecture:</strong> Seamless client-side
              routing with dedicated pages for tasks, user profiles, and
              authentication.
            </li>
            <li>
              <strong>Protected Routes:</strong> Built-in authentication guards
              that protect sensitive pages and intelligently remember where you
              were trying to go before logging in.
            </li>
            <li>
              <strong>URL-based State Management:</strong> Bookmarkable,
              deep-linking support for filtered task views (e.g., viewing only
              completed tasks via URL parameters).
            </li>
            <li>
              <strong>Resilient Navigation:</strong> Comprehensive 404 error
              handling, active link states, and full support for browser
              back/forward buttons.
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            🛠️ Technologies Used
          </h3>
          <ul className="space-y-4 text-gray-600 dark:text-gray-300">
            <li>
              <strong>React 19:</strong> The core library for building the
              interactive user interface using functional components and hooks.
            </li>
            <li>
              <strong>React Router v7:</strong> Handles all multi-page
              navigation, route protection, programmatic redirects, and URL
              parameter reading.
            </li>
            <li>
              <strong>Vite:</strong> The build tool providing a lightning-fast
              development server and optimized production builds.
            </li>
            <li>
              <strong>Tailwind CSS:</strong> A utility-first CSS framework used
              to build this responsive, modern design with custom light and dark
              themes.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
