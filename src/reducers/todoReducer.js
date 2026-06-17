export const TODO_ACTIONS = {
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",

  ADD_TODO_START: "ADD_TODO_START",
  ADD_TODO_SUCCESS: "ADD_TODO_SUCCESS",
  ADD_TODO_ERROR: "ADD_TODO_ERROR",

  COMPLETE_TODO_START: "COMPLETE_TODO_START",
  COMPLETE_TODO_SUCCESS: "COMPLETE_TODO_SUCCESS",
  COMPLETE_TODO_ERROR: "COMPLETE_TODO_ERROR",

  UPDATE_TODO_START: "UPDATE_TODO_START",
  UPDATE_TODO_SUCCESS: "UPDATE_TODO_SUCCESS",
  UPDATE_TODO_ERROR: "UPDATE_TODO_ERROR",

  DELETE_TODO_SUCCESS: "DELETE_TODO_SUCCESS",
  DELETE_TODO_ERROR: "DELETE_TODO_ERROR",

  SET_SORT: "SET_SORT",
  SET_FILTER: "SET_FILTER",
  CLEAR_ERROR: "CLEAR_ERROR",
  RESET_FILTERS: "RESET_FILTERS",
};

export const initialTodoState = {
  todoList: [],
  error: "",
  filterError: "",
  isTodoListLoading: true,
  sortBy: "createdAt",
  sortDirection: "desc",
  filterTerm: "",
  dataVersion: 0,
};

export function todoReducer(state, action) {
  switch (action.type) {
    // FETCH TODOS
    case TODO_ACTIONS.FETCH_START:
      return {
        ...state,
        isTodoListLoading: true,
        error: "",
        filterError: "",
      };

    case TODO_ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        todoList: action.payload,
        isTodoListLoading: false,
      };

    case TODO_ACTIONS.FETCH_ERROR:
      return {
        ...state,
        isTodoListLoading: false,
        error: action.payload,
      };

    case TODO_ACTIONS.ADD_TODO_START:
      return {
        ...state,
        error: "",
        todoList: [...state.todoList, action.payload],
      };

    case TODO_ACTIONS.ADD_TODO_SUCCESS:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload.tempId ? action.payload.newTodoData : todo,
        ),
        dataVersion: state.dataVersion + 1, // Trigger cache invalidation
      };

    case TODO_ACTIONS.ADD_TODO_ERROR:
      return {
        ...state,
        error: action.payload.message,
        todoList: state.todoList.filter(
          (todo) => todo.id !== action.payload.tempId,
        ),
      };

    case TODO_ACTIONS.COMPLETE_TODO_SUCCESS:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          //todo.id === action.payload ? { ...todo, isCompleted: true } : todo,
        //todo.id === action.payload ? { ...todo, isCompleted: !todo.isCompleted} : todo,
        todo.id === action.payload.id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
        ),
        dataVersion: state.dataVersion + 1,
      };

    case TODO_ACTIONS.COMPLETE_TODO_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case TODO_ACTIONS.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo,
        ),
        dataVersion: state.dataVersion + 1,
      };

    case TODO_ACTIONS.UPDATE_TODO_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case TODO_ACTIONS.DELETE_TODO_SUCCESS:
      return {
        ...state,
        todoList: state.todoList.filter((todo) => todo.id !== action.payload),
        dataVersion: state.dataVersion + 1,
      };

    case TODO_ACTIONS.DELETE_TODO_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case TODO_ACTIONS.SET_SORT:
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortDirection: action.payload.sortDirection,
      };

    case TODO_ACTIONS.SET_FILTER:
      return {
        ...state,
        filterTerm: action.payload,
      };

    case TODO_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: "",
        filterError: "",
      };

    case TODO_ACTIONS.RESET_FILTERS:
      return {
        ...state,
        filterTerm: "",
        sortBy: "createdAt",
        sortDirection: "desc",
        filterError: "",
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
