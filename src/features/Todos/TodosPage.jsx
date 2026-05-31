import { useEffect, useState, useCallback } from "react";
import TodoForm from "./TodoForm.jsx";
import TodoList from "./TodoList/TodoList.jsx";
import SortBy from "./../../shared/SortBy.jsx";
import useDebounce from "./../../utils/useDebounce.js";
import FilterInput from "./../../shared/FilterInput.jsx";

function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState("");
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);
  const [sortBy, setSortBy] = useState("creationDate");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filterTerm, setFilterTerm] = useState("");
  const [filterError, setFilterError] = useState("");
  const [dataVersion, setDataVersion] = useState(0);
  const debouncedFilterTerm = useDebounce(filterTerm, 300);

  const handleFilterChange = (newTerm) => {
    setFilterTerm(newTerm);
  };

  //cache invalidation function
  const invalidateCache = useCallback(() => {
    //console.log("Invalidating memo cache after todo mutation");
    setDataVersion((prev) => prev + 1);
  }, []);

  //ADD TODO
  async function addTodo(todoTitle) {
    const tempId = Date.now();

    const newTodo = {
      id: tempId,
      title: todoTitle,
      isCompleted: false,
    };

    //Optimistically update UI
    setTodoList((prev) => [newTodo, ...prev]);

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({
          title: todoTitle,
          isCompleted: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create todo");
      }

      const savedTodo = await response.json();

      //Replace temporary todo with real one from backend
      setTodoList((prev) =>
        prev.map((todo) => (todo.id === tempId ? savedTodo : todo)),
      );
      invalidateCache();
    } catch (err) {
      //Remove optimistic todo if request failed
      setTodoList((prev) => prev.filter((todo) => todo.id !== tempId));

      setError(err.message);
    }
  }

  //COMPLETE TODO
  async function completeTodo(id) {
    // Store original todo for rollback
    const originalTodo = todoList.find((todo) => todo.id === id);

    //Optimistically update UI
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: true };
      }
      return todo;
    });

    setTodoList(updatedTodos);

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({
          isCompleted: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to complete todo");
      }
      invalidateCache();
    } catch (err) {
      //Rollback to original todo if request fails
      setTodoList((prev) =>
        prev.map((todo) => (todo.id === id ? originalTodo : todo)),
      );

      setError(err.message);
    }
  }

  //UPDATE TODO
  async function updateTodo(editedTodo) {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return { ...editedTodo };
      }
      return todo;
    });

    setTodoList(updatedTodos);

    try {
      const response = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({
          title: editedTodo.title,
          isCompleted: editedTodo.isCompleted,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }
      invalidateCache();
    } catch (err) {
      // Rollback if request fails
      setTodoList((prev) =>
        prev.map((todo) => (todo.id === editedTodo.id ? originalTodo : todo)),
      );

      setError(err.message);
    }
  }

  useEffect(() => {
    async function fetchTodos() {
      setIsTodoListLoading(true);
      setError("");

      const paramsObject = {
        sortBy,
        sortDirection,
      };

      if (debouncedFilterTerm) {
        paramsObject.find = debouncedFilterTerm;
      }

      const params = new URLSearchParams(paramsObject);
      try {
        //const response = await fetch("/api/tasks",
        const response = await fetch(`/api/tasks?${params}`, {
          method: "GET",
          headers: {
            "X-CSRF-TOKEN": token,
          },
          credentials: "include",
        });

        if (response.status === 401) {
          throw new Error("unauthorized");
        }

        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        setTodoList(data.tasks);
        setFilterError("");
      } catch (error) {
        if (
          debouncedFilterTerm ||
          sortBy !== "creationDate" ||
          sortDirection !== "desc"
        ) {
          setFilterError(`Error filtering/sorting todos: ${error.message}`);
        } else {
          setError(`Error fetching todos: ${error.message}`);
        }
      } finally {
        setIsTodoListLoading(false);
      }
    }

    if (token) {
      fetchTodos();
    }
  }, [token, sortBy, sortDirection, debouncedFilterTerm]);

  return (
    <div>
      <h1>My Todos</h1>

      {isTodoListLoading && <p>Loading todos...</p>}

      {error && (
        <div>
          <p style={{ color: "red" }}>{error}</p>

          <button onClick={() => setError("")}>Clear Error</button>
        </div>
      )}

      {/*//A conditional block that displays when filterError has a value*/}
      {filterError && (
        <div>
          <p>{filterError}</p>

          <button onClick={() => setFilterError("")}>Clear Filter Error</button>

          <button
            onClick={() => {
              setFilterTerm("");
              setSortBy("creationDate");
              setSortDirection("desc");
              setFilterError("");
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      <SortBy
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortByChange={setSortBy}
        onSortDirectionChange={setSortDirection}
      />

      <FilterInput
        filterTerm={filterTerm}
        onFilterChange={handleFilterChange}
      />

      <TodoForm onAddTodo={addTodo} />

      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        dataVersion={dataVersion}
      />
    </div>
  );
}

export default TodosPage;
