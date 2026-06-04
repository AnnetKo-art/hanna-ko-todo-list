import TodoForm from "./TodoForm.jsx";
import TodoList from "./TodoList/TodoList.jsx";
import SortBy from "./../../shared/SortBy.jsx";
import useDebounce from "./../../utils/useDebounce.js";
import FilterInput from "./../../shared/FilterInput.jsx";
import { useReducer, useEffect, useCallback } from "react";
import {
  todoReducer,
  initialTodoState,
  TODO_ACTIONS,
} from "../../reducers/todoReducer";

function TodosPage({ token }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);
  const {
    todoList,
    error,
    isTodoListLoading,
    sortBy,
    sortDirection,
    filterTerm,
    filterError,
    dataVersion,
  } = state;

  const debouncedFilterTerm = useDebounce(filterTerm, 300);

  const handleFilterChange = (newTerm) => {
    dispatch({
      type: TODO_ACTIONS.SET_FILTER,
      payload: newTerm,
    });
  };

  // cache invalidation function
  const invalidateCache = useCallback(() => {
    dispatch({
      type: TODO_ACTIONS.SET_SORT,
      payload: { sortBy, sortDirection },
    });
  }, [sortBy, sortDirection]);

  // ADD TODO - optimistic
  async function addTodo(todoTitle) {
    const tempId = Date.now();

    const newTodo = {
      id: tempId,
      title: todoTitle,
      isCompleted: false,
    };

    // 1. Dispatch START to optimistically add to UI
    dispatch({
      type: TODO_ACTIONS.ADD_TODO_START,
      payload: newTodo,
    });

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

      // 2. Dispatch SUCCESS to swap tempId with real data
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_SUCCESS,
        payload: {
          tempId: tempId,
          newTodoData: savedTodo,
        },
      });
      invalidateCache();
    } catch (err) {
      // 3. Dispatch ERROR to rollback UI to match teacher's string exactly
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_ERROR,
        payload: {
          message: `Error adding todo: ${newTodo.title} | Error message: ${err.message}`,
          tempId: tempId,
        },
      });
    }
  }

  // COMPLETE TODO
  async function completeTodo(id) {
    // Store original todo for rollback
    const originalTodo = todoList.find((todo) => todo.id === id);

    // Optimistically update UI
    dispatch({
      type: TODO_ACTIONS.UPDATE_TODO_SUCCESS,
      payload: { ...originalTodo, isCompleted: true },
    });

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
      // Rollback to original todo if request fails (Fixed variable name)
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_SUCCESS,
        payload: originalTodo,
      });

      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
        payload: err.message,
      });
    }
  }

  // UPDATE TODO
  async function updateTodo(editedTodo) {
    // Store original for rollback
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    // Optimistic update
    dispatch({
      type: TODO_ACTIONS.UPDATE_TODO_SUCCESS,
      payload: editedTodo,
    });

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
      // Rollback UI (Fixed variable name)
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_SUCCESS,
        payload: originalTodo,
      });

      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_ERROR,
        payload: err.message,
      });
    }
  }

  useEffect(() => {
    async function fetchTodos() {
      dispatch({ type: TODO_ACTIONS.FETCH_START });

      const paramsObject = {
        sortBy,
        sortDirection,
      };

      if (debouncedFilterTerm) {
        paramsObject.find = debouncedFilterTerm;
      }

      const params = new URLSearchParams(paramsObject);
      try {
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
        
        dispatch({
          type: TODO_ACTIONS.FETCH_SUCCESS,
          payload: data.tasks,
        });
      } catch (error) {
        dispatch({
          type: TODO_ACTIONS.FETCH_ERROR,
          payload: error.message,
        });
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
          <button onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_ERROR })}>Clear Error</button>
        </div>
      )}

      {filterError && (
        <div>
          <p>{filterError}</p>
          <button onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_ERROR })}>Clear Filter Error</button>
          <button onClick={() => dispatch({ type: TODO_ACTIONS.RESET_FILTERS })}>
            Reset Filters
          </button>
        </div>
      )}

      <SortBy
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortByChange={(value) =>
          dispatch({
            type: TODO_ACTIONS.SET_SORT,
            payload: { sortBy: value, sortDirection },
          })
        }
        onSortDirectionChange={(value) =>
          dispatch({
            type: TODO_ACTIONS.SET_SORT,
            payload: { sortBy, sortDirection: value },
          })
        }
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