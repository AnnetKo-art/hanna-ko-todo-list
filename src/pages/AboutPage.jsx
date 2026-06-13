export default function AboutPage() {
  return (
    <div className="about-container">
      <h1>About This Application</h1>
      <p>
        Welcome to the Hanna Ko Todo List! This application was built to
        demonstrate modern web development practices, focusing on secure, 
        client-side routing and state management.
      </p>

      <h2>Key Features</h2>
      <ul>
        <li>
          <strong>Multi-page Architecture:</strong> Seamless client-side routing with dedicated pages for tasks, user profiles, and authentication.
        </li>
        <li>
          <strong>Protected Routes:</strong> Built-in authentication guards that protect sensitive pages and intelligently remember where you were trying to go before logging in.
        </li>
        <li>
          <strong>URL-based State Management:</strong> Bookmarkable, deep-linking support for filtered task views (e.g., viewing only completed tasks via URL parameters).
        </li>
        <li>
          <strong>Resilient Navigation:</strong> Comprehensive 404 error handling, active link states, and full support for browser back/forward buttons.
        </li>
      </ul>

      <h2>Technologies Used</h2>
      <ul>
        <li>
          <strong>React 19:</strong> The core library for building the interactive user interface using functional components and hooks.
        </li>
        <li>
          <strong>React Router v7:</strong> Handles all multi-page navigation, route protection, programmatic redirects, and URL parameter reading.
        </li>
        <li>
          <strong>Vite:</strong> The build tool providing a lightning-fast development server and optimized production builds.
        </li>
      </ul>
    </div>
  );
}