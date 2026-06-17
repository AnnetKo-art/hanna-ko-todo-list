import { useState, useRef } from "react";
import TextInputWithLabel from "./../../shared/TextInputWithLabel.jsx";
import {
  isValidTodoTitle,
  validateTodoTitle,
  MAX_TODO_LENGTH,
} from "../../utils/todoValidation.js";
import { sanitizeInput } from "../../utils/sanitize.js";

function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");
  const [formError, setFormError] = useState("");
  const inputRef = useRef();

  const handleAddTodo = (event) => {
    event.preventDefault();
    setFormError("");
    const validation = validateTodoTitle(workingTodoTitle);

    if (!validation.isValid) {
      setFormError(validation.error);
      return;
    }
    const todoTitle = sanitizeInput(workingTodoTitle);

    if (todoTitle) {
      onAddTodo(todoTitle);
      setWorkingTodoTitle("");
      inputRef.current.focus();
    }
  };

  return (
    <div className="mt-8 mb-8">
      {formError && (
        <p className="text-sm font-bold text-red-500 mb-2 ml-1 animate-pulse">
          {formError}
        </p>
      )}
      <form
        onSubmit={handleAddTodo}
        className=" mt-8 flex flex-col sm:flex-row gap-4 items-end sm:items-end mb-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors"
      >
        <div className="flex-grow w-full">
          <TextInputWithLabel
            inputRef={inputRef}
            onChange={(event) => {
              setWorkingTodoTitle(event.target.value);
              if (formError) setFormError("");
            }}
            elementId="todoTitle"
            labelText="Todo"
            value={workingTodoTitle}
            placeholder="Write your new ToDo here..."
            maxLength={MAX_TODO_LENGTH}
          />
        </div>
        <button className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
          Add Todo
        </button>
      </form>
    </div>
  );
}
export default TodoForm;
