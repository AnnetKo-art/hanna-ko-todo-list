
export const TODO_ACTIONS = {
  // Fetch operations
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
  
  // Add todo operations
  ADD_TODO_START: 'ADD_TODO_START',
  ADD_TODO_SUCCESS: 'ADD_TODO_SUCCESS',
  ADD_TODO_ERROR: 'ADD_TODO_ERROR',

  // Complete todo operations
  COMPLETE_TODO_START: 'COMPLETE_TODO_START',
  COMPLETE_TODO_SUCCESS: 'COMPLETE_TODO_SUCCESS',
  COMPLETE_TODO_ERROR: 'COMPLETE_TODO_ERROR',

  // Update todo operations
  UPDATE_TODO_START: 'UPDATE_TODO_START',
  UPDATE_TODO_SUCCESS: 'UPDATE_TODO_SUCCESS',
  UPDATE_TODO_ERROR: 'UPDATE_TODO_ERROR',

  // UI operations
  SET_SORT: 'SET_SORT',
  SET_FILTER: 'SET_FILTER',
  CLEAR_ERROR: 'CLEAR_ERROR',
  RESET_FILTERS: 'RESET_FILTERS',
};

export const initialTodoState = {
  todoList: [],
  error: "",
  filterError: "",
  isTodoListLoading: false,
  sortBy: "creationDate",
  sortDirection: "desc",
  filterTerm: "",
  dataVersion: 0,
};

export function todoReducer(state, action) {
 // console.log('Dispatched action:', action.type, action.payload); // Remove this before committing
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

    // ADD TODO
    case TODO_ACTIONS.ADD_TODO_START:
      return {
        ...state,
        error: "",
        // Optimistically add the temporary todo to the list
        todoList: [...state.todoList, action.payload], 
      };

    case TODO_ACTIONS.ADD_TODO_SUCCESS:
      return {
        ...state,
        // Replace the temporary todo with the real one from the DB
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload.tempId ? action.payload.newTodoData : todo
        ),
        dataVersion: state.dataVersion + 1, // Trigger cache invalidation
      };

    case TODO_ACTIONS.ADD_TODO_ERROR:
      return {
        ...state,
        error: action.payload.message,
        // Remove the temporary todo if the API call failed
        todoList: state.todoList.filter(
          (todo) => todo.id !== action.payload.tempId
        ),
      };

    // COMPLETE
    case TODO_ACTIONS.COMPLETE_TODO_SUCCESS:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload
            ? { ...todo, isCompleted: true }
            : todo
        ),
        dataVersion: state.dataVersion + 1,
      };

    case TODO_ACTIONS.COMPLETE_TODO_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    // UPDATE
    case TODO_ACTIONS.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload.id
            ? action.payload
            : todo
        ),
        dataVersion: state.dataVersion + 1,
      };

    case TODO_ACTIONS.UPDATE_TODO_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    // UI
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
        sortBy: "creationDate",
        sortDirection: "desc",
        filterError: "",
      };
      
    // DEFAULT SAFETY
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}