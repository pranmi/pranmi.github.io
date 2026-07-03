import { useRef, useState } from "react";

export default function SwipeGallery({ images = [] }) {
  const [index, setIndex] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);

  if (!images.length) return null;

  const next = () => setIndex((i) => Math.min(i + 1, images.length - 1));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  const onStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const onEnd = (e) => {
    if (!isDragging.current) return;

    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diff = endX - startX.current;

    if (diff > 40) prev();
    if (diff < -40) next();

    isDragging.current = false;
  };

  return (
    <div
      className="swipe-gallery"
      onMouseDown={onStart}
      onMouseUp={onEnd}
      onTouchStart={onStart}
      onTouchEnd={onEnd}
    >
      <div
        className="swipe-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <img key={i} src={img} className="swipe-img" />
        ))}
      </div>

      {/* dots */}
      <div className="swipe-dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}