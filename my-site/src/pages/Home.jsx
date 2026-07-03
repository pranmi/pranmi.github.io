import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ss1 from "../assets/ss1.gif";
import ss2 from "../assets/ss2.gif";
import ss3 from "../assets/ss3.gif";

export default function Home() {
  const [activeProject, setActiveProject] = useState(null);

  const previews = [
    {
      title: "ML Projects",
      description:
        "Regression, classification, and CNN-based models built in PyTorch.",
      summary:
        "Implemented several machine learning algorithms ranging from classical models to deep learning architectures.",
      technologies: ["Python", "PyTorch", "scikit-learn", "NumPy"],
      highlights: [
        "Convolutional Neural Networks",
        "Naive Bayes",
        "Regression",
        "Classification",
      ],
      challenges: [
        "Hyperparameter tuning",
        "Dataset preprocessing",
        "Model evaluation",
      ],
      images: [],
    },
    {
      title: "Solar System Rendering",
      description:
        "Rendering of a 3D solar system with orbital mechanics and textures using WebGL.",
      summary:
        "Built a Three.js application that simulates the solar system while implementing orbital mechanics, shaders, and camera controls from scratch.",
      technologies: ["Three.js", "WebGL2", "GLSL", "JavaScript"],
      highlights: [
        "Elliptical orbital mechanics",
        "Time scaling controls",
        "Camera tracking",
        "Dynamic lighting",
        "Procedural sun shader",
      ],
      challenges: [
        "Implemented Brownian-motion fragment shader for the Sun.",
        "Created accurate orbital movement and hierarchical transforms.",
        "Balanced rendering quality with real-time performance.",
      ],
      images: [ss1, ss2, ss3],
    },
  ];

  return (
    <div className="app">
      {/* HERO */}
      <header className="hero">
        <div className="hero-content">
          <h2>Computer Science Graduate</h2>
          <p>
            Software Engineer interested in backend systems, ML, and scalable applications.
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

      {/* ABOUT */}
      <section className="section">
        <h2>About Me</h2>
        <p>
          I recently graduated with a B.S. in Computer Science from UT Dallas.
        </p>
      </section>

      {/* PROJECT PREVIEW GRID */}
      <section id="projects" className="section">
        <h2>Featured Projects</h2>

        <div className="project-grid-inline">
          {previews.map((p, i) => {
            const isActive = activeProject === i;

            return (
              <div
                key={i}
                className={`inline-card ${isActive ? "expanded" : ""}`}
                onClick={() => setActiveProject(isActive ? null : i)}
              >
                {/* HEADER */}
                <div className="inline-card-header">
                  <h3>{p.title}</h3>

                  {/* COLLAPSED TECH PILLS */}
                  <div
                    className={`tech-pill-row collapsed ${
                      isActive ? "hide" : ""
                    }`}
                  >
                    {(p.technologies ?? []).slice(0, 3).map((tech) => (
                      <span key={tech} className="tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <span>{isActive ? "−" : "+"}</span>
                </div>

                {/* DESCRIPTION */}
                <p className="project-desc">{p.description}</p>

                {/* EXPANDED CONTENT */}
                <div
                  className={`expanded-content ${
                    isActive ? "open" : ""
                  }`}
                >
                  <div className="expanded-inner">
                    <section className="detail-section">
                      <h4>Overview</h4>
                      <p>{p.summary}</p>
                    </section>

                    <section className="detail-section">
                      <h4>Technologies</h4>

                      <div
                        className={`tech-list expanded ${
                          isActive ? "show" : ""
                        }`}
                      >
                        {(p.technologies ?? []).map((tech) => (
                          <span key={tech} className="tech-pill">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </section>

                    <section className="detail-section">
                      <h4>Highlights</h4>
                      <ul>
                        {(p.highlights ?? []).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </section>

                    <section className="detail-section">
                      <h4>Challenges</h4>
                      <ul>
                        {(p.challenges ?? []).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </section>

                    {/* IMAGE PREVIEW */}
                    <PreviewImages images={p.images} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="hero-buttons">
          <Link to="/projects" className="btn primary">
            Explore All Projects →
          </Link>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section">
        <h2>Contact</h2>
        <p>Email: pmullapudi1@gmail.com</p>
      </section>
    </div>
  );
}

/* =========================
   PREVIEW IMAGE COMPONENT
========================= */

function PreviewImages({ images = [] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images.length) return;

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(id);
  }, [images]);

  if (!images.length) return null;

  return (
    <div className="preview-image-box">
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          className={`preview-image ${i === index ? "active" : ""}`}
          alt=""
        />
      ))}
    </div>
  );
}