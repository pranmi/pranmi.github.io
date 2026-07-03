import "./App.css";
import TronProximityCanvas from "./components/TronProximityCanvas";
import { Routes, Route, Link } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";
import Projects from "./pages/Projects";
import Home from "./pages/Home";
import logo from "./assets/3h.png";
import { useEffect, useState } from "react";

export default function App() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const TOP_ZONE = 240;

    const handle = (e) => {
      const y = window.scrollY;
      const mouseY = e?.clientY ?? Infinity;

      const nearTop = y < 80;
      const cursorNearTop = mouseY < TOP_ZONE;
      const scrollingDown = y > lastScrollY;

      if (nearTop || cursorNearTop) {
        setHidden(false);
      } else {
        setHidden(true);
      }

      lastScrollY = y;
    };

    window.addEventListener("scroll", handle);
    window.addEventListener("mousemove", handle);

    return () => {
      window.removeEventListener("scroll", handle);
      window.removeEventListener("mousemove", handle);
    };
  }, []);

  return (
    <>
      <TronProximityCanvas />

      <nav className={`glass-nav ${hidden ? "nav-hidden" : "nav-visible"}`}>
        <div className="nav-left">
          <Link to="/" className="logo-link">
            <img src={logo} className="nav-avatar" />
            <h1 className="logo">Pranith Mullapudi</h1>
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
        </div>

        <ThemeToggle />
      </nav>

      <div className="app-content">
        <div className="glass-shell">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </div>
      </div>
    </>
  );
}