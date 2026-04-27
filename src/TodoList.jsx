import TodoListItem from "./TodoListItem.jsx";

// TodoList receives data from parent (App) via props
function TodoList({todoList}) {    
  return (
    <div>        
      <ul>
        {/* 
          KEY MOMENT:
          We use props (todoList) and map through it
          This is how React renders lists dynamically
        */}
        {todoList.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} /> 
         
        ))}
      </ul>
    </div>
  );
}

export default TodoList;