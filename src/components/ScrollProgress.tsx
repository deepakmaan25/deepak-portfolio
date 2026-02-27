import { useEffect, useRef, useState } from "react";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[2px] z-[9999]"
      style={{
        width: `${progress}%`,
        background: "linear-gradient(90deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)",
      }}
    />
  );
};

export default ScrollProgress;
