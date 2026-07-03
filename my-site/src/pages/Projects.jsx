import { useState } from "react";
import ProjectScroller from "../components/ProjectScroller";

const projects = [
  {
    title: "P2P File Sharing System",
    description:
      "A distributed peer-to-peer file sharing system with tracker coordination, chunked downloads, and concurrent peer communication.",
    images: [
      "/assets/p2p-1.png",
      "/assets/p2p-2.png",
      "/assets/p2p-3.png",
    ],
  },
  {
    title: "Bigram Language Model",
    description:
      "Java + MySQL-based language model for predicting word sequences using probabilistic transitions.",
    images: [
      "/assets/bigram-1.png",
      "/assets/bigram-2.png",
    ],
  },
  {
    title: "Machine Learning Projects",
    description:
      "Implemented Naive Bayes, CNNs, and neural networks using PyTorch and scikit-learn for classification tasks.",
    images: [],
  },
];

function ProjectCard({ project }) {
  const hasImages = project.images?.length > 0;

const nextImage = () => {
  if (!hasImages) return;
  setIndex((prev) => (prev + 1) % project.images.length);
};

const prevImage = () => {
  if (!hasImages) return;
  setIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
};

  return (
    <div className="project-card-glass">
      <h2>{project.title}</h2>

      <p className="project-desc">{project.description}</p>

      {hasImages && (
        <div className="media-viewer">
          <div className="image-frame">
            <img
              src={project.images[index]}
              alt={project.title}
              className="project-image"
            />
          </div>

          <div className="carousel-controls">
            <button onClick={prevImage}>◀</button>
            <button onClick={nextImage}>▶</button>
          </div>

          <div className="image-dots">
            {project.images.map((_, i) => (
              <span
                key={i}
                className={i === index ? "dot active" : "dot"}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Projects() {
  return (
    <section className="projects-section">
      <h1>Projects</h1>

      <div className="projects-grid">
        {projects.map((p, i) => (
          <ProjectCard key={i} project={p} />
        ))}
      </div>
    </section>
  );
}

export default Projects;