import { useAuth } from "../contexts/AuthContext.jsx";
import Logoff from "./Logoff.jsx";
import Navigation from "./Navigation.jsx";

export default function Header() {
  const { isAuthenticated } = useAuth();
  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px" }}>
      <h1>Todo List</h1>
      <Navigation />
      {isAuthenticated && <Logoff />}
    </header>
  );
}