export default function FilterInput({ filterTerm, onFilterChange }) {
  return (
    <div className="w-full sm:flex-1">
      <label htmlFor="filterInput" className="block text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400 mb-1.5 ml-1">
        Search todos:</label>

      <input
        id="filterInput"
        type="text"
        value={filterTerm}
        placeholder="Search by title..."
        onChange={(e) => onFilterChange(e.target.value)}
        className="w-full px-4 py-2.5 text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        
     />
        
      
    </div>
  );
}
