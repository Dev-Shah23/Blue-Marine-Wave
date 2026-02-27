import { useState, useCallback, useRef } from "react";

export default function useParallax(max = 5) {
  const [style, setStyle] = useState({});
  const rafId = useRef(null);

  const handleMove = useCallback(
    (e) => {
      if (rafId.current) return; // debounce via rAF
      rafId.current = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * max;
        const y = (e.clientY / window.innerHeight - 0.5) * max;
        setStyle({
          transform: `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg)`,
          transition: "transform 0.15s ease-out",
          willChange: "transform",
        });
        rafId.current = null;
      });
    },
    [max]
  );

  const handleLeave = useCallback(() => {
    setStyle({
      transform: "perspective(800px) rotateY(0deg) rotateX(0deg)",
      transition: "transform 0.4s ease-out",
      willChange: "transform",
    });
  }, []);

  return { style, handleMove, handleLeave };
}
