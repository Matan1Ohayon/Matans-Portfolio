import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "96", label: "GPA", suffix: "" },
  { value: "8", label: "Projects", suffix: "+" },
  { value: "1", label: "Years Exp", suffix: "+" },
];

function AboutMe() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-reveal", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative z-10 py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <div className="about-reveal mb-12">
          <span
            className="text-xs font-medium tracking-[0.3em] uppercase"
            style={{ color: "#00d9ff" }}
          >
            About Me
          </span>
          <div className="w-12 h-px mt-3" style={{ background: "linear-gradient(90deg, #00d9ff, transparent)" }} />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: Text */}
          <div>
            <h2
              className="about-reveal text-3xl md:text-4xl font-bold leading-tight mb-8"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Crafting digital experiences with{" "}
              <span className="gradient-text">code & creativity</span>
            </h2>

            <p className="about-reveal text-base leading-relaxed mb-4" style={{ color: "#999" }}>
              I&apos;m a third-year Computer Science student at SCE with a{" "}
              <span className="text-white font-medium">94 GPA</span> and a spot on the{" "}
              <span className="text-white font-medium">Dean&apos;s List</span>. 
              <br />Currently working as a Founding Software Engineer at{" "}
              <span className="text-cyan font-medium">Parry.io</span>, building
              an AI-powered contract intelligence platform for procurement departments.
            </p>

            <p className="about-reveal text-base leading-relaxed mb-8" style={{ color: "#666" }}>
              I have hands-on experience in software development, algorithms, and
              building full-stack projects from start to finish. I&apos;m especially
              interested in AI and machine learning, and I enjoy breaking down complex
              problems into clear, practical solutions.
            </p>

            <a
              href="Matan-Ohayon-CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="about-reveal inline-flex items-center gap-2 text-sm font-medium transition-colors no-underline group"
              style={{ color: "#00d9ff" }}
              data-cursor-hover
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M12 4v12m0 0l-4-4m4 4l4-4M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download Resume
              <span className="block w-0 group-hover:w-full h-px bg-cyan transition-all duration-300" />
            </a>
          </div>

          {/* Right: Stats + Photo */}
          <div className="max-w-xs">
            {/* Photo with border treatment */}
            <div className="about-reveal relative mb-6">
              <div
                className="relative overflow-hidden rounded-xl"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <img
                  src="img/Matan-copy.png"
                  alt="Matan Ohayon"
                  loading="lazy"
                  className="w-full object-cover"
                  style={{ filter: "saturate(0.8) brightness(0.9)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, #0a0a0a 0%, transparent 50%)",
                  }}
                />
              </div>
              <div
                className="absolute -inset-px -z-10 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, #00d9ff33, transparent, #ff006e33)",
                  transform: "translate(6px, 6px)",
                  borderRadius: "0.75rem",
                  opacity: 0.5,
                }}
              />
            </div>

            {/* Stats row */}
            <div className="about-reveal grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-3 rounded-lg transition-colors duration-300 hover:border-white/10"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div className="text-xl font-bold gradient-text">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <div className="text-[10px] mt-1" style={{ color: "#666" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
