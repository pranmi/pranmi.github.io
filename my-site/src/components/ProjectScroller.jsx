import { useState } from "react";

export default function ProjectScroller({ projects }) {
  const [active, setActive] = useState(0);

  const current = projects[active];

  return (
    <div className="project-scroller">
      {/* LEFT: selector */}
      <div className="project-index">
        {projects.map((p, i) => (
          <div
            key={i}
            className={`project-dot ${i === active ? "active" : ""}`}
            onClick={() => setActive(i)}
          >
            {p.title}
          </div>
        ))}
      </div>

      {/* RIGHT: content */}
      <div className="project-display">
        <h2>{current.title}</h2>
        <p>{current.desc}</p>

        <div className="media-stack">
          {current.images.map((img, i) => (
            <img
              key={i}
              src={img}
              className="project-img"
              alt={`project-${i}`}
            />
          ))}
        </div>

        <div className="tag-row">
          {current.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}