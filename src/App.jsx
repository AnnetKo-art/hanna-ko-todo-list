import "./App.css";
import {useState} from 'react';
import TodoList from "./TodoList.jsx";
import TodoForm from "./TodoForm.jsx";

function App() {
  const[todoList, setTodoList]=useState([]);
  function addTodo(todoTitle){
  let todo={
  id:Date.now(),//to generate a unique id
  title:todoTitle
}
    setTodoList(previous =>[todo, ...previous]);  
  } 
  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} />          
      <TodoList todoList={todoList} /> 
    </div>
  );
}

export default App;


