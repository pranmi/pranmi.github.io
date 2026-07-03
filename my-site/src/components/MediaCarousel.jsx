import { useEffect, useState } from "react";

export default function MediaCarousel({ media = [], interval = 3000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!media.length) return;

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % media.length);
    }, interval);

    return () => clearInterval(id);
  }, [media, interval]);

  if (!media.length) return null;

  return (
    <div className="media-carousel">
      <div className="media-frame">
        {media.map((src, i) => (
          <img
            key={i}
            src={src}
            className={`media-item ${i === index ? "active" : ""}`}
            alt=""
          />
        ))}
      </div>

      <div className="media-controls">
        <button onClick={() => setIndex((index - 1 + media.length) % media.length)}>
          ◀
        </button>

        <div className="dots">
          {media.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>

        <button onClick={() => setIndex((index + 1) % media.length)}>
          ▶
        </button>
      </div>
    </div>
  );
}