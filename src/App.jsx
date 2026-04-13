import "./App.css";

function App() {
  const todoList = [
    { id: 1, title: "Review resources" },
    { id: 2, title: "Take notes" },
    { id: 3, title: "Code out app" },
    { id: 4, title: "Add Styling" },
    { id: 5, title: "Issues check" },
    { id: 6, title: "Debugging if needed" },
    { id: 7, title: "Test functionality" },
    { id: 8, title: "Write README" },
    { id: 9, title: "Deploy project" },
    { id: 10, title: "Add new features" },
  ];
  return (
    <div>
      <h1>My Todos</h1>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
