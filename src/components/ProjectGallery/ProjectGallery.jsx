import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projectsData from "../../assets/projects";

gsap.registerPlugin(ScrollTrigger);

function TiltCard({ project, onClick }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 8,
        rotateX: -y * 8,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 800,
      });
    };
    const handleLeave = () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "elastic.out(1, 0.6)" });
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", handleLeave);
    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const categoryLabel = Array.isArray(project.category) ? project.category.join(" / ") : project.category;

  return (
    <div
      ref={cardRef}
      className="proj-card rounded-xl overflow-hidden cursor-pointer group transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        transformStyle: "preserve-3d",
      }}
      onClick={() => onClick(project)}
      data-cursor-hover
    >
      {/* Media */}
      <div className="relative overflow-hidden" style={{ height: 200 }}>
        {project.mediaType === "video" ? (
          <video
            src={project.src}
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <img
            src={project.src}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: "linear-gradient(to top, #0a0a0a 0%, transparent 60%)",
          }}
        />
        {/* Hover glow line */}
        <div
          className="absolute bottom-0 left-0 w-full h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "linear-gradient(90deg, #00d9ff, #ff006e)" }}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <span className="text-[10px] uppercase tracking-widest font-medium" style={{ color: "#555" }}>
          {categoryLabel}
        </span>
        <h3 className="text-base font-semibold text-white mt-1.5 group-hover:text-cyan transition-colors">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.badges?.slice(0, 4).map((b) => (
            <span
              key={b}
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#555",
              }}
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-xl"
            style={{
              background: "#111",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="relative w-full aspect-video bg-black">
              {project.mediaType === "video" ? (
                <video key={project.src} src={project.src} controls loop playsInline preload="auto" className="w-full h-full object-cover" />
              ) : (
                <img src={project.src} alt={project.title} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start gap-4">
                <h2 className="text-xl font-bold text-white">{project.title}</h2>
                <button onClick={onClose} className="text-white/40 hover:text-white text-xl bg-transparent border-none" data-cursor-hover>&times;</button>
              </div>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#888" }}>{project.description}</p>
              {project.badges && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.badges.map((t, i) => (
                    <span key={i} className="px-2.5 py-1 text-[10px] font-medium rounded-full" style={{ border: "1px solid rgba(0,217,255,0.2)", color: "#00d9ff", background: "rgba(0,217,255,0.05)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {project.link && (
                <a href={project.link} target={project.link.startsWith("/") ? "_self" : "_blank"} rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 text-sm font-semibold rounded-full no-underline transition-all" style={{ background: "linear-gradient(135deg, #00d9ff, #ff006e)", color: "#0a0a0a" }} data-cursor-hover>
                  {project.btn_title || "View Project"}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const MOBILE_INITIAL_COUNT = 4;

function useIsMobile() {
  const [mobile, setMobile] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e) => setMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return mobile;
}

function ProjectGallery() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();

  const categories = ["All", "Web Development", "Mobile App", "AI & Machine Learning", "System Programming"];

  const filtered = [...projectsData].reverse().filter((p) =>
    filter === "All" ? true : Array.isArray(p.category) ? p.category.includes(filter) : p.category === filter
  ).sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

  const visibleProjects = isMobile && !showAll ? filtered.slice(0, MOBILE_INITIAL_COUNT) : filtered;
  const hasMore = isMobile && !showAll && filtered.length > MOBILE_INITIAL_COUNT;

  // Use batch animation so cards appear reliably on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".proj-card", { y: 30, opacity: 0 });
      ScrollTrigger.batch(".proj-card", {
        onEnter: (batch) => {
          gsap.to(batch, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: 0.06 });
        },
        start: "top 92%",
      });
    }, sectionRef);
    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <section ref={sectionRef} id="projects" className="relative z-10 py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="text-xs font-medium tracking-[0.3em] uppercase" style={{ color: "#ff006e" }}>
            Projects
          </span>
          <div className="w-12 h-px mt-3" style={{ background: "linear-gradient(90deg, #ff006e, transparent)" }} />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-10" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Selected <span className="gradient-text">works</span>
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => { setFilter(c); setShowAll(false); }}
              className="px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 border"
              style={{
                borderColor: filter === c ? "#00d9ff44" : "rgba(255,255,255,0.08)",
                background: filter === c ? "rgba(0,217,255,0.1)" : "transparent",
                color: filter === c ? "#00d9ff" : "#555",
              }}
              data-cursor-hover
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid — clean 2-col on md, 3-col on lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleProjects.map((p) => (
            <TiltCard key={p.id} project={p} onClick={setSelected} />
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 active:scale-95"
              style={{
                border: "1px solid rgba(0,217,255,0.3)",
                background: "rgba(0,217,255,0.06)",
                color: "#00d9ff",
              }}
            >
              Show all projects ({filtered.length - MOBILE_INITIAL_COUNT} more)
            </button>
          </div>
        )}

        {isMobile && showAll && filtered.length > MOBILE_INITIAL_COUNT && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(false)}
              className="px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 active:scale-95"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#555",
              }}
            >
              Show less
            </button>
          </div>
        )}

        <ProjectModal project={selected} isOpen={!!selected} onClose={() => setSelected(null)} />
      </div>
    </section>
  );
}

export default ProjectGallery;
