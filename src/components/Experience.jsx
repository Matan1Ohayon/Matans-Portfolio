import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import experienceData from "../assets/experience";

gsap.registerPlugin(ScrollTrigger);

function Experience() {
  const [expandedId, setExpandedId] = useState(null);
  const sectionRef = useRef(null);
  const firstCardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".exp-head", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      gsap.set(".exp-card", { y: 40, opacity: 0 });
      ScrollTrigger.batch(".exp-card", {
        onEnter: (batch) => {
          gsap.to(batch, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.1 });
        },
        start: "top 90%",
      });

      if (firstCardRef.current) {
        ScrollTrigger.create({
          trigger: firstCardRef.current,
          start: "top 75%",
          once: true,
          onEnter: () => {
            setTimeout(() => {
              setExpandedId(experienceData[0].id);
            }, 400);
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="relative z-10 py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="exp-head mb-12">
          <span className="text-xs font-medium tracking-[0.3em] uppercase" style={{ color: "#ff006e" }}>
            Experience
          </span>
          <div className="w-12 h-px mt-3" style={{ background: "linear-gradient(90deg, #ff006e, transparent)" }} />
        </div>

        <div className="space-y-4">
          {experienceData.map((exp, index) => (
            <div
              key={exp.id}
              ref={index === 0 ? firstCardRef : undefined}
              className="exp-card rounded-xl overflow-hidden transition-all duration-500 cursor-pointer group"
              style={{
                background: expandedId === exp.id ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${expandedId === exp.id ? "rgba(0,217,255,0.2)" : "rgba(255,255,255,0.05)"}`,
                boxShadow: expandedId === exp.id ? "0 0 30px rgba(0,217,255,0.05), 0 8px 32px rgba(0,0,0,0.3)" : "none",
              }}
              onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
            >
              <div className="p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                  <p className="text-sm mt-1">
                    <span style={{ color: "#00d9ff" }}>{exp.company}</span>
                    <span style={{ color: "#444" }}> &middot; {exp.location}</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono" style={{ color: "#555" }}>
                    {exp.period}
                  </span>
                  <motion.svg
                    animate={{ rotate: expandedId === exp.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    style={{ color: "#555" }}
                  >
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                </div>
              </div>

              <AnimatePresence>
                {expandedId === exp.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.4 }}
                        className="text-sm leading-relaxed mt-4"
                        style={{ color: "#777" }}
                      >
                        {exp.description}
                      </motion.p>
                      {exp.highlights && (
                        <ul className="mt-4 space-y-2">
                          {exp.highlights.map((h, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.25 + i * 0.08, duration: 0.35 }}
                              className="text-sm flex items-start gap-2"
                              style={{ color: "#999" }}
                            >
                              <span className="mt-1 text-xs" style={{ color: "#00d9ff" }}>&#9656;</span>
                              {h}
                            </motion.li>
                          ))}
                        </ul>
                      )}
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.35 }}
                        className="flex flex-wrap gap-2 mt-4"
                      >
                        {exp.technologies.map((t, i) => (
                          <motion.span
                            key={t}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.45 + i * 0.03, duration: 0.25 }}
                            className="px-2.5 py-1 text-[10px] font-medium rounded-full"
                            style={{
                              border: "1px solid rgba(0,217,255,0.15)",
                              color: "#00d9ff",
                              background: "rgba(0,217,255,0.05)",
                            }}
                          >
                            {t}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
