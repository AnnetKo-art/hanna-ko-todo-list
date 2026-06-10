import { useAuth } from "../contexts/AuthContext.jsx";
import Logoff from "./Logoff.jsx";

export default function Header() {
  const { isAuthenticated } = useAuth();
  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h1>Todo List</h1>
      {isAuthenticated && <Logoff />}
    </header>
  );
}