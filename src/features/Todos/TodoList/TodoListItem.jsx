import TextInputWithLabel from "../../../shared/TextInputWithLabel";
import { useEditableTitle } from "../../../hooks/useEditableTitle";
import { isValidTodoTitle } from "../../../utils/todoValidation";

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo, onDeleteTodo }) {
  const {
    isEditing,
    workingTitle,
    startEditing,
    cancelEdit,
    updateTitle,
    finishEdit,
  } = useEditableTitle(todo.title);

  const handleUpdate = (event) => {
    if (!isEditing) return;

    event.preventDefault();

    const finalTitle = finishEdit();

    onUpdateTodo({
      ...todo,
      title: finalTitle,
    });
  };

  return (
    <li className="w-full">
      <div className="flex items-center w-full p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
        {isEditing ? (
          <form
            onSubmit={handleUpdate}
            className="flex flex-col sm:flex-row w-full gap-4 items-end sm:items-center"
          >
            <div className="flex-grow w-full">
              <TextInputWithLabel
                elementId={`editTodo-${todo.id}`}
                labelText="Edit Task"
                value={workingTitle}
                onChange={(event) => updateTitle(event.target.value)}
              />
            </div>

            <div className="flex gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={cancelEdit}
                className="px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!isValidTodoTitle(workingTitle)}
                className="px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Update
              </button>
            </div>
          </form>
        ) : (
          <div className="flex items-center w-full gap-4">
            <input
              type="checkbox"
              id={`checkbox-${todo.id}`}
              checked={todo.isCompleted}              
              onChange={() => onCompleteTodo(todo.id)}
              className="w-6 h-6 cursor-pointer accent-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 transition-all duration-200 shrink-0"
            />

            <span
              onClick={startEditing}
              title="Click to edit task"
              className={`flex-grow text-lg cursor-text transition-all duration-200 select-none ${
               todo.isCompleted
                  ? "text-gray-400 dark:text-gray-500 line-through decoration-2"
                  : "text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              {todo.title}
            </span>

            <button
              type="button"
              onClick={() => onDeleteTodo(todo.id)}
              title="Delete task"
              className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </li>
  );
}

export default TodoListItem;
