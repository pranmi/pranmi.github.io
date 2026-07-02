import "./App.css";
import TronProximityCanvas from "./components/TronProximityCanvas";
import { Routes, Route, Link } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";
import Projects from "./pages/Projects";
import logo from "./assets/3h.png";
import { useEffect, useState, useRef } from "react";

function Home() {
  return (
    <div className="app">
      <header className="hero">
        <div className="hero-content">
          <h2>Computer Science Graduate</h2>
          <p>
            Software Engineer interested in backend development, machine learning,
            AI systems, and scalable applications.
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="btn primary">
              View Projects
            </a>

            <a
              href="https://github.com/pranmi"
              target="_blank"
              rel="noreferrer"
              className="btn secondary"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      <main>
        <section id="about" className="section">
          <h2>About Me</h2>
          <p>
            I recently graduated with a B.S. in Computer Science from the
            University of Texas at Dallas. My interests include backend
            engineering, machine learning, distributed systems, and AI-powered
            applications.
          </p>
        </section>

        <section id="projects" className="section">
          <h2>Featured Projects</h2>
          <Link to="/projects" className="btn primary">
            View Full Projects Page
          </Link>
        </section>

        <section id="contact" className="section">
          <h2>Contact</h2>
          <p>Email: pmullapudi1@gmail.com</p>
        </section>
      </main>
    </div>
  );
}

export default function App() {
  const [hidden, setHidden] = useState(false);
  const [themeTransitioning, setThemeTransitioning] = useState(false);
  const timeoutRef = useRef(null);

  // -----------------------------
  // Navbar scroll + cursor logic
  // -----------------------------
  useEffect(() => {
  let lastScrollY = window.scrollY;
  const TOP_ZONE = 240;

  const handleScroll = () => {
    const currentY = window.scrollY;

    if (currentY > lastScrollY && currentY > 80) {
      setHidden(true);
    }

    if (currentY < lastScrollY || currentY < 80) {
      setHidden(false);
    }

    lastScrollY = currentY;
  };

  const handleMouseMove = (e) => {
    // SIMPLE RULE: cursor near top ALWAYS shows navbar
    if (e.clientY < TOP_ZONE) {
      setHidden(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("mousemove", handleMouseMove);

  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("mousemove", handleMouseMove);
  };
}, []);

  // -----------------------------
  // Cinematic theme transition
  // -----------------------------
  useEffect(() => {
  let timeout;

  const observer = new MutationObserver(() => {
    setThemeTransitioning(true);

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setThemeTransitioning(false);
    }, 800);
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  return () => {
    observer.disconnect();
    clearTimeout(timeout);
  };
}, []);

  return (
    <>
      {/* BACKGROUND CANVAS */}
      <TronProximityCanvas />

      {/* FLOATING GLASS NAVBAR */}
      <nav
        className={`glass-nav 
        ${hidden ? "nav-hidden" : "nav-visible"} 
        ${themeTransitioning ? "theme-fade" : ""}`}
      >
        <div className="nav-left">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Logo" className="nav-avatar" />

            <h1 className="logo neon-name">
              {"Pranith Mullapudi".split("").map((char, i) => (
                <span key={i} className="neon-char" style={{ "--i": i }}>
                  {char}
                </span>
              ))}
            </h1>
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/" className="tron-link">Home</Link>
          <Link to="/projects" className="tron-link">Projects</Link>
        </div>

        <div className="nav-right">
          <ThemeToggle />
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className={`app-content ${themeTransitioning ? "theme-fade" : ""}`}>
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