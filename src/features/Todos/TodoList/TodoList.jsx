import TodoListItem from "./TodoListItem.jsx";
import { useMemo } from "react";

function TodoList({
  todoList,
  onCompleteTodo,
  onUpdateTodo,
  onDeleteTodo,
  dataVersion,
  statusFilter = "active",
}) {
  const filteredTodoList = useMemo(() => {
    let filteredTodos;
    switch (statusFilter) {
      case "completed":
        filteredTodos = todoList.filter((todo) => todo.isCompleted);
        break;
      case "active":
        filteredTodos = todoList.filter((todo) => !todo.isCompleted);
        break;
      case "all":
      default:
        filteredTodos = todoList;
        break;
    }
    return {
      version: dataVersion,
      todos: filteredTodos,
    };
  }, [todoList, dataVersion, statusFilter]);

  const getEmptyMessage = () => {
    switch (statusFilter) {
      case "completed":
        return "No completed todos yet. Complete some tasks to see them here.";
      case "active":
        return "No active todos. Add a todo above to get started.";
      case "all":
      default:
        return "Add todo above to get started.";
    }
  };

  return (
    <div className="w-full mt-6">
      {filteredTodoList.todos.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 transition-colors">
          <p className="text-gray-500 dark:text-gray-400 text-lg text-center italic">
            {getEmptyMessage()}
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3 p-0 m-0 list-none">
          {filteredTodoList.todos.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
              onUpdateTodo={onUpdateTodo}
              onDeleteTodo={onDeleteTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
