import { useAuth } from "../contexts/AuthContext.jsx";
import Logoff from "./Logoff.jsx";
import Navigation from "./Navigation.jsx";

export default function Header() {
  const { isAuthenticated } = useAuth();
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      
      <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        Todo<span className="text-blue-600 dark:text-blue-400">List</span>
      </h1>
      
      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
        <Navigation />
        {isAuthenticated && <Logoff />}
      </div>
    </header>
  );
}