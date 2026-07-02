import ThemeToggle from "./components/ThemeToggle";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <nav className="navbar">
        <h1>Pranith  Mullapudi</h1>

        <div className="nav-right">
          <ThemeToggle />
        </div>
      </nav>
    </>
  );
}