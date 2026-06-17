import { useSearchParams } from "react-router";

function StatusFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStatus = searchParams.get("status") || "all";

  const handleStatusChange = (status) => {
    if (status === "all") {
      searchParams.delete("status");
    } else {
      searchParams.set("status", status);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full sm:w-auto">
      <label
        htmlFor="statusFilter"
        className="block text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400 mb-1.5 ml-1"
      >
        Show
      </label>
      <div className="relative w-full after:content-['▼'] after:text-[10px] after:absolute after:right-4 after:top-1/2 after:-translate-y-1/2 after:pointer-events-none after:text-gray-500 dark:after:text-gray-400">
        <select
          id="statusFilter"
          value={currentStatus}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="w-full px-4 py-2 pr-10 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer appearance-none hover:border-gray-300 dark:hover:border-gray-600"
        >
          <option value="all">All Todos</option>
          <option value="active">Active Todos</option>
          <option value="completed">Completed Todos</option>
        </select>
      </div>
    </div>
  );
}

export default StatusFilter;
