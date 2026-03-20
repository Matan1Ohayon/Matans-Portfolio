import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

function HeroSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        y: 120,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.15,
        delay: 0.3,
      });
      gsap.from(".hero-sub", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.0,
      });
      gsap.fromTo(".hero-cta",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.1, delay: 1.3 }
      );
      gsap.from(".hero-scroll", {
        opacity: 0,
        duration: 0.6,
        delay: 2.0,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 z-10"
    >
      <div className="text-center max-w-5xl relative">
        {/* Overline */}
        <div className="hero-sub mb-6">
          <span
            className="inline-block px-4 py-1.5 text-xs font-medium tracking-[0.25em] uppercase rounded-full"
            style={{
              border: "1px solid rgba(0, 217, 255, 0.3)",
              color: "#00d9ff",
              background: "rgba(0, 217, 255, 0.05)",
            }}
          >
            Full Stack Developer &middot; Software Developer
          </span>
        </div>

        {/* Name */}
        <div className="overflow-hidden">
          <h1
            className="hero-line font-display font-bold tracking-tighter leading-[0.85]"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(3.5rem, 10vw, 9rem)",
            }}
          >
            MATAN
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1
            className="hero-line font-display font-bold tracking-tighter leading-[0.85] gradient-text"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(3.5rem, 10vw, 9rem)",
            }}
          >
            OHAYON
          </h1>
        </div>

        {/* Tagline */}
        <p
          className="hero-sub mt-8 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
          style={{ color: "#999" }}
        >
          Building AI-powered products & crafting exceptional digital experiences. 
          <br /> Currently Founding Full-Stack Developer at{" "}
          <span className="text-cyan font-medium">Parry.io</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-10">
          <a
            href="#projects"
            className="hero-cta group relative inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full no-underline overflow-hidden transition-colors duration-300"
            style={{
              background: "linear-gradient(135deg, #00d9ff, #ff006e)",
              color: "#0a0a0a",
            }}
          >
            <span className="relative z-10">View Projects</span>
            <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#contact"
            className="hero-cta inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full no-underline transition-colors duration-300 hover:bg-white/10"
            style={{
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
            }}
          >
            Get in Touch
          </a>
        </div>

        {/* Tech badges */}
        <div className="hero-sub flex flex-wrap justify-center gap-3 mt-12">
          {["React", "Python", "TypeScript", "AI/ML", "Node.js", "Cloud"].map((tech, i) => (
            <span
              key={tech}
              className="px-3 py-1 text-[11px] font-medium tracking-wider uppercase rounded-full transition-all duration-300 hover:border-cyan/50 hover:text-cyan"
              style={{
                border: "1px solid rgba(211, 206, 206, 0.41)",
                color: "#888",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <div
            className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
            style={{ border: "1.5px solid rgba(255,255,255,0.2)" }}
          >
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-1.5 rounded-full bg-white/50"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
