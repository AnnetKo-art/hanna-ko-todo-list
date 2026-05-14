
import {useState} from 'react';
import { useRef } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel.jsx';
import { isValidTodoTitle } from '../utils/todoValidation';



function TodoForm({ onAddTodo }) {

const [workingTodoTitle, setWorkingTodoTitle]=useState("");
  const inputRef = useRef();
  const handleAddTodo = (event) => {
  event.preventDefault();

  const todoTitle = workingTodoTitle.trim();

  if (todoTitle) {
    onAddTodo(todoTitle);
    setWorkingTodoTitle("");
    inputRef.current.focus();
  }
};

  return (
    <form onSubmit={handleAddTodo}>
  <TextInputWithLabel
  ref={inputRef}
  onChange={(event) => setWorkingTodoTitle(event.target.value)}
  elementId="todoTitle"
  labelText="Todo"
  value={workingTodoTitle}
  
  />  
    <button disabled={!isValidTodoTitle(workingTodoTitle)}>Add Todo</button>
  </form>
  );
}
export default TodoForm;



