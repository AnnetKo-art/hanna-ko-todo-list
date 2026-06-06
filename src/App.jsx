import "./App.css";
import Header from "./shared/Header.jsx";
import TodosPage from "./features/Todos/TodosPage.jsx";
import Logon from "./features/Logon.jsx";
import { useAuth } from "./contexts/AuthContext.jsx";

function App() {
  const { isAuthenticated, token } = useAuth();

  return (
    <div>
      <Header />

      {isAuthenticated ? <TodosPage token={token} /> : <Logon />}
    </div>
  );
}
export default App;
