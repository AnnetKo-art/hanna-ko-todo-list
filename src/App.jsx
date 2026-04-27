import "./App.css";
import {useState} from 'react';
import TodoList from "./TodoList.jsx";
import TodoForm from "./TodoForm.jsx";


const todos = [
    { id: 1, title: "Review resources" },
    { id: 2, title: "Take notes" },
    { id: 3, title: "Code out app" },

  ];
function App() {
  /*
    KEY MOMENT: useState
    - todoList = current state value
    - setTodoList = function to update state
    - todos = initial value
  */
  const[todoList, setTodoList]=useState(todos);
  
  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm/>
      {/*
        KEY MOMENT:
        We pass state DOWN to child component via props
        This is called "lifting state down"
      */}   
      <TodoList todoList={todoList} />    
    </div>
  );
}

export default App;
