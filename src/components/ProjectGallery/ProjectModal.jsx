import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg"
            style={{
              background: "rgba(15, 23, 42, 0.95)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Media */}
            <div className="relative w-full aspect-video bg-slate-900">
              {project.mediaType === "video" ? (
                <video
                  key={project.src}
                  src={project.src}
                  controls
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={project.src}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-bold text-white/95">
                  {project.title}
                </h2>
                <button
                  onClick={onClose}
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors text-white/50 text-xl leading-none bg-transparent border-none cursor-pointer"
                >
                  &times;
                </button>
              </div>

              <p className="mt-3 text-sm text-white/60 leading-relaxed">
                {project.description}
              </p>

              {project.badges && project.badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.badges.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white/10 text-xs font-medium rounded text-white/70 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {project.link && (
                <a
                  href={project.link}
                  target={project.link.startsWith("/") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="inline-block mt-5 px-5 py-2.5 bg-white/10 text-white/90 font-semibold text-sm rounded border border-white/15 hover:bg-white/20 transition-colors no-underline"
                >
                  {project.btn_title || "View Project"}
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ProjectModal;
