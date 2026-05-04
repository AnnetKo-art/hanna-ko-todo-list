/*OPTION 1
onSubmit={handleAddTodo} was added to the form. 
onClick={handleAddTodo} was removed from the button
*/

import { useRef } from 'react';
function TodoForm({ onAddTodo }) {
  const inputRef = useRef();
  const handleAddTodo = (event) => {
    event.preventDefault();
  
    // .trim prevents whitespace only todos
    const todoTitle = event.target.todoTitle.value.trim();
    if (todoTitle) {
      onAddTodo(todoTitle);
      event.target.reset();
      inputRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
    <label htmlFor="todoTitle">Todo</label>
    <input
      ref={inputRef}
      type="text"
      id="todoTitle"
      name="todoTitle"
      placeholder={'Todo text'}
      required
    />
    <button type="submit">
      Add Todo
    </button>
  </form>
  );
}
export default TodoForm;



/*  OPTION 2  FOR THIS FILE   - onClick={handleAddTodo} --is still on Button
More lines of code was added.
import { useRef } from 'react';

function TodoForm({ onAddTodo }) {
const inputRef = useRef();

  const handleAddTodo = (event) => {
    event.preventDefault();
  
    // .trim prevents whitespace only todos
    //const todoTitle = event.target.todoTitle.value.trim();
    const todoTitle = inputRef.current.value.trim();
    if (todoTitle && todoTitle !== "") {
      onAddTodo(todoTitle);
     inputRef.current.value = "";   // clear input
     inputRef.current.focus();
    }
  };


  return (
    <form>
    <label htmlFor="todoTitle">Todo</label>
    <input
      ref={inputRef}
      type="text"
      id="todoTitle"
      name="todoTitle"
      placeholder={'Todo text'}
      required
    />
    <button type="submit" onClick={handleAddTodo}>
      Add Todo
    </button>
  </form>
  );
}
export default TodoForm;

//Explanation: 
//I removed the usage of event.target because my event handler is attached to the button
//  (onClick), not to the form (onSubmit). Because of this, event.target refers to the button 
// element instead of the form, so I cannot access the input field through 
// event.target.todoTitle or reset the form using event.target.reset().

//To fix this, I used useRef to get direct access to the input element. 
// I read the input value using inputRef.current.value, trimmed it,
//  and passed it to the onAddTodo function.

//Since I no longer rely on the form, I also replaced event.target.reset() with manually
//  clearing the input using inputRef.current.value = "". After that, I called 
// inputRef.current.focus() to keep the cursor in the input field for a better
//  user experience.*/