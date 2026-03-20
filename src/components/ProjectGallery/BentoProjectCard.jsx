import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedCard from "../AnimatedCard";

function BentoProjectCard({ project, index, onClick, className = "" }) {
  const videoRef = useRef(null);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [mediaError, setMediaError] = useState(false);

  useEffect(() => {
    if (project.mediaType !== "video" || !videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => {});
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [project.mediaType]);

  const categoryLabel = Array.isArray(project.category)
    ? project.category.join(" / ")
    : project.category;

  return (
    <AnimatedCard index={index} className={className}>
      <motion.div
        whileHover={{ y: -3, borderColor: "rgba(255,255,255,0.2)" }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={() => onClick(project)}
        className="relative w-full h-full rounded-lg overflow-hidden cursor-pointer group"
        style={{
          background: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Loading skeleton */}
        {!mediaLoaded && !mediaError && (
          <div className="absolute inset-0 bg-slate-800/50 animate-pulse" />
        )}

        {/* Media */}
        {project.mediaType === "video" ? (
          <video
            ref={videoRef}
            src={project.src}
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => setMediaLoaded(true)}
            onError={() => setMediaError(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              mediaLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <img
            src={project.src}
            alt={project.title}
            loading="lazy"
            onLoad={() => setMediaLoaded(true)}
            onError={() => setMediaError(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              mediaLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Error fallback */}
        {mediaError && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800/80">
            <span className="text-white/40 text-sm">Media unavailable</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/85 transition-all duration-300" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <span className="text-[11px] uppercase tracking-widest text-white/60 font-semibold">
            {categoryLabel}
          </span>
          <h3 className="text-lg font-bold mt-1.5 leading-tight text-white/95">
            {project.title}
          </h3>

          {/* Tags on hover */}
          {project.badges && (
            <div className="flex flex-wrap gap-1.5 mt-2.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              {project.badges.slice(0, 4).map((badge) => (
                <span
                  key={badge}
                  className="text-[11px] px-2.5 py-0.5 bg-white/10 border border-white/10 rounded text-white/70 font-medium"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Hover indicator */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-white/70">
            <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </motion.div>
    </AnimatedCard>
  );
}

export default BentoProjectCard;
