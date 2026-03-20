import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" &&
    (("ontouchstart" in window) || window.matchMedia("(max-width: 768px)").matches)
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e) => setIsMobile(e.matches || "ontouchstart" in window);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.3, ease: "power2.out" });
    };

    const onEnterLink = () => {
      gsap.to(ring, { scale: 1.8, borderColor: "#00d9ff", duration: 0.3 });
      gsap.to(dot, { scale: 0.5, backgroundColor: "#00d9ff", duration: 0.3 });
    };

    const onLeaveLink = () => {
      gsap.to(ring, { scale: 1, borderColor: "rgba(255,255,255,0.3)", duration: 0.3 });
      gsap.to(dot, { scale: 1, backgroundColor: "#ffffff", duration: 0.3 });
    };

    window.addEventListener("mousemove", onMove);

    const addLinkListeners = () => {
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
        el.addEventListener("mouseenter", onEnterLink);
        el.addEventListener("mouseleave", onLeaveLink);
      });
    };

    addLinkListeners();
    const observer = new MutationObserver(addLinkListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#fff",
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.3)",
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}

export default CustomCursor;
