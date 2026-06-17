function SortBy({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
}) {
  const labelClass =
    "block text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400 mb-1.5 ml-1";
  const selectClass =
    "w-full px-4 py-2 pr-10 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer appearance-none hover:border-gray-300 dark:hover:border-gray-600";
  const dropdownWrapperClass =
    "relative w-full after:content-['▼'] after:text-[10px] after:absolute after:right-4 after:top-1/2 after:-translate-y-1/2 after:pointer-events-none after:text-gray-500 dark:after:text-gray-400";

  return (
    <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
      <div className="flex flex-col flex-1 sm:w-40">
        <label htmlFor="sortBy" className={labelClass}>
          Sort by
        </label>
        <div className={dropdownWrapperClass}>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className={selectClass}
          >
            <option value="createdAt">Creation Date</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col flex-1 sm:w-40">
        <label htmlFor="sortDirection" className={labelClass}>
          Order
        </label>
        <div className={dropdownWrapperClass}>
          <select
            id="sortDirection"
            value={sortDirection}
            onChange={(e) => onSortDirectionChange(e.target.value)}
            className={selectClass}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SortBy;
