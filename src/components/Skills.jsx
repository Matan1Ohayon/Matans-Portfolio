import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const allSkills = [
  { label: "Python", icon: "https://cdn.simpleicons.org/python/white" },
  { label: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/white" },
  { label: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/white" },
  { label: "HTML", icon: "https://cdn.simpleicons.org/html5/white" },
  { label: "SQL", icon: "https://cdn.simpleicons.org/postgresql/white" },
  { label: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { label: "C++", icon: "https://cdn.simpleicons.org/cplusplus/white" },
  { label: "React", icon: "https://cdn.simpleicons.org/react/white" },
  { label: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/white" },
  { label: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/white" },
  { label: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/white" },
  { label: "FastAPI", icon: "https://cdn.simpleicons.org/fastapi/white" },
  { label: "Docker", icon: "https://cdn.simpleicons.org/docker/white" },
  { label: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/white" },
  { label: "Firebase", icon: "https://cdn.simpleicons.org/firebase/white" },
  { label: "GCP", icon: "https://cdn.simpleicons.org/googlecloud/white" },
  { label: "AWS", icon: "https://svgl.app/library/aws_dark.svg" },
  { label: "OpenAI", icon: "https://svgl.app/library/openai_dark.svg" },
  { label: "Claude", icon: "https://cdn.simpleicons.org/anthropic/white" },
  { label: "LangChain", icon: "https://cdn.simpleicons.org/langchain/white" },
  { label: "PyTorch", icon: "https://cdn.simpleicons.org/pytorch/white" },
  { label: "Neo4j", icon: "https://cdn.simpleicons.org/neo4j/white" },
  { label: "Framer", icon: "https://cdn.simpleicons.org/framer/white" },
  { label: "Vercel", icon: "https://cdn.simpleicons.org/vercel/white" },
  { label: "Git", icon: "https://cdn.simpleicons.org/git/white" },
];

function lighten(hex, amount) {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0x00ff) + amount);
  const b = Math.min(255, (num & 0x0000ff) + amount);
  return `rgb(${r},${g},${b})`;
}

function getCyanMagentaColor(index, total) {
  const t = index / (total - 1);
  const r = Math.round(t * 230);
  const g = Math.round(217 * (1 - t));
  const b = 255;
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

const isMobile = () =>
  typeof window !== "undefined" &&
  (("ontouchstart" in window) || window.matchMedia("(max-width: 768px)").matches);

function Skills() {
  const areaRef = useRef(null);
  const ballRefsArr = useRef([]);
  const [tooltip, setTooltip] = useState(null);
  const hasDroppedRef = useRef(false);
  const mobile = isMobile();

  useEffect(() => {
    const area = areaRef.current;
    if (!area) return;

    const { Engine, World, Bodies, Mouse, MouseConstraint, Events, Runner, Body, Sleeping } = Matter;

    const w = area.clientWidth;
    const h = area.clientHeight;

    const skills = allSkills;

    const engine = Engine.create({ gravity: { x: 0, y: 0 } });

    // Walls: thick rectangles positioned so their inner edge aligns with the container boundary
    const T = 200;
    const wallOpts = { isStatic: true, restitution: mobile ? 0.6 : 0.3, friction: 0.2 };
    const walls = [
      Bodies.rectangle(w / 2, h + T / 2, w + T * 2, T, wallOpts),   // floor — inner edge at y = h
      Bodies.rectangle(w / 2, -T / 2, w + T * 2, T, wallOpts),      // ceiling — inner edge at y = 0
      Bodies.rectangle(-T / 2, h / 2, T, h + T * 2, wallOpts),      // left — inner edge at x = 0
      Bodies.rectangle(w + T / 2, h / 2, T, h + T * 2, wallOpts),   // right — inner edge at x = w
    ];
    World.add(engine.world, walls);

    const ballR = mobile ? [26, 6] : [40, 16];
    const balls = skills.map((skill) => {
      const r = ballR[0] + Math.random() * ballR[1];
      const x = r + Math.random() * (w - r * 2);
      const body = Bodies.circle(x, -r - 50, r, {
        restitution: mobile ? 0.55 : 0.3,
        friction: 0.15,
        frictionAir: mobile ? 0.015 : 0.03,
        density: mobile ? 0.0012 : 0.002,
        isSleeping: true,
      });
      body.skillData = skill;
      body.radius = r;
      return body;
    });
    World.add(engine.world, balls);

    let deviceTiltActive = false;

    const ballEls = balls.map((body, i) => {
      const el = document.createElement("div");
      const r = body.radius;
      const skill = skills[i];
      const c = getCyanMagentaColor(i, skills.length);
      const light = lighten(c, 60);

      el.style.cssText = `
        position: absolute; left: 0; top: 0;
        width: ${r * 2}px; height: ${r * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle at 30% 25%, ${light}, ${c} 60%, ${lighten(c, -40)});
        box-shadow: ${mobile
          ? "0 2px 8px rgba(0,0,0,0.4), inset 0 -2px 4px rgba(0,0,0,0.15)"
          : "0 4px 16px rgba(0,0,0,0.5), inset 0 -3px 8px rgba(0,0,0,0.15), inset 0 3px 8px rgba(255,255,255,0.2)"};
        display: flex; align-items: center; justify-content: center;
        pointer-events: none; user-select: none;
        border: 1px solid rgba(255,255,255,0.15);
        will-change: transform; z-index: 2;
        opacity: 0; transition: opacity 0.3s;
      `;
      const img = document.createElement("img");
      const iconSize = Math.max(18, r * 0.65);
      img.src = skill.icon;
      img.alt = skill.label;
      img.draggable = false;
      img.style.cssText = `
        width: ${iconSize}px; height: ${iconSize}px;
        object-fit: contain; pointer-events: none; user-select: none;
        filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3))${skill.invert ? " invert(1) brightness(2)" : ""};
      `;
      el.appendChild(img);
      area.appendChild(el);
      return el;
    });
    ballRefsArr.current = ballEls;

    // Interaction canvas (invisible, sits on top for mouse/touch events)
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    canvas.style.cssText = `position:absolute;top:0;left:0;width:100%;height:100%;z-index:10;opacity:0;cursor:grab;`;
    area.appendChild(canvas);

    const mouse = Mouse.create(canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    World.add(engine.world, mouseConstraint);
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    // Click / tap ball → show tooltip + bounce
    Events.on(mouseConstraint, "mousedown", (e) => {
      const { x, y } = e.mouse.position;
      for (let i = 0; i < balls.length; i++) {
        const body = balls[i];
        const dx = body.position.x - x;
        const dy = body.position.y - y;
        if (Math.sqrt(dx * dx + dy * dy) < body.radius) {
          setTooltip({ label: body.skillData.label, x: body.position.x, y: body.position.y - body.radius - 16 });
          setTimeout(() => setTooltip(null), 2000);
          Body.applyForce(body, body.position, { x: 0, y: -0.008 });
          break;
        }
      }
    });

    // Right-click scatter (desktop)
    const handleContext = (e) => {
      e.preventDefault();
      const rect = area.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      balls.forEach((body) => {
        const dx = body.position.x - mx;
        const dy = body.position.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 250) {
          const force = 0.025 * (1 - dist / 250);
          Body.applyForce(body, body.position, { x: (dx / dist) * force, y: (dy / dist) * force });
        }
      });
    };
    canvas.addEventListener("contextmenu", handleContext);

    // Fast mouse scatter (desktop)
    let lastMouse = { x: 0, y: 0 };
    const handleMouseMove = (e) => {
      const rect = area.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const speed = Math.sqrt((mx - lastMouse.x) ** 2 + (my - lastMouse.y) ** 2);
      lastMouse = { x: mx, y: my };
      if (speed > 25) {
        balls.forEach((body) => {
          const dx = body.position.x - mx;
          const dy = body.position.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const force = 0.006 * (speed / 25) * (1 - dist / 130);
            Body.applyForce(body, body.position, { x: (dx / dist) * force, y: (dy / dist) * force });
          }
        });
      }
      let hoveredBody = null;
      for (let i = 0; i < balls.length; i++) {
        const body = balls[i];
        const dx = body.position.x - mx;
        const dy = body.position.y - my;
        if (Math.sqrt(dx * dx + dy * dy) < body.radius) { hoveredBody = body; break; }
      }
      if (hoveredBody) {
        canvas.style.cursor = "pointer";
        setTooltip({ label: hoveredBody.skillData.label, x: hoveredBody.position.x, y: hoveredBody.position.y - hoveredBody.radius - 16 });
      } else {
        canvas.style.cursor = "grab";
        setTooltip(null);
      }
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    const handleMouseLeave = () => { canvas.style.cursor = "grab"; setTooltip(null); };
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Touch scatter (mobile) — swipe finger through balls to fling them
    let lastTouch = { x: 0, y: 0 };
    const handleTouchMove = (e) => {
      const t = e.touches[0];
      if (!t) return;
      const rect = area.getBoundingClientRect();
      const tx = t.clientX - rect.left;
      const ty = t.clientY - rect.top;
      const speed = Math.sqrt((tx - lastTouch.x) ** 2 + (ty - lastTouch.y) ** 2);
      lastTouch = { x: tx, y: ty };
      if (speed > 6) {
        balls.forEach((body) => {
          const dx = body.position.x - tx;
          const dy = body.position.y - ty;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            const force = 0.015 * (speed / 12) * (1 - dist / 90);
            Body.applyForce(body, body.position, { x: (dx / dist) * force, y: (dy / dist) * force });
          }
        });
      }
    };
    const handleTouchStart = (e) => {
      const t = e.touches[0];
      if (!t) return;
      const rect = area.getBoundingClientRect();
      lastTouch = { x: t.clientX - rect.left, y: t.clientY - rect.top };
      for (let i = 0; i < balls.length; i++) {
        const body = balls[i];
        const dx = body.position.x - lastTouch.x;
        const dy = body.position.y - lastTouch.y;
        if (Math.sqrt(dx * dx + dy * dy) < body.radius + 12) {
          setTooltip({ label: body.skillData.label, x: body.position.x, y: body.position.y - body.radius - 16 });
          setTimeout(() => setTooltip(null), 1500);
          Body.applyForce(body, body.position, { x: (Math.random() - 0.5) * 0.012, y: -0.015 });
          break;
        }
      }
    };
    if (mobile) {
      canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
      canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    }

    // --- Physics runner ---
    engine.timing.timeScale = mobile ? 1 : 0.75;
    const runner = Runner.create();
    Runner.run(runner, engine);

    // --- Drop trigger: IntersectionObserver ---
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasDroppedRef.current) {
          hasDroppedRef.current = true;

          // Immediately set strong gravity so balls actually fall
          engine.gravity.y = mobile ? 1 : 0.15;

          balls.forEach((body, i) => {
            const delay = mobile ? i * 45 : i * 110;
            setTimeout(() => {
              // Spread across full width in columns
              const cols = mobile ? 5 : 5;
              const col = i % cols;
              const spacing = w / cols;
              Body.setPosition(body, {
                x: spacing * (col + 0.5) + (Math.random() - 0.5) * spacing * 0.5,
                y: 2,
              });
              Sleeping.set(body, false);
              Body.setVelocity(body, {
                x: (Math.random() - 0.5) * 2,
                y: mobile ? 5 + Math.random() * 3 : 0.2 + Math.random() * 0.5,
              });
              if (ballEls[i]) ballEls[i].style.opacity = "1";
            }, delay);
          });
        }
        // Desktop: adaptive gravity based on scroll visibility
        if (hasDroppedRef.current && !deviceTiltActive && !mobile) {
          engine.gravity.y = 0.08 + entry.intersectionRatio * 0.35;
        }
      },
      { threshold: Array.from({ length: 11 }, (_, i) => i / 10) }
    );
    observer.observe(area);

    // --- Device orientation tilt control (mobile only) ---
    let orientationHandler = null;
    if (mobile) {
      let smoothGamma = 0, smoothBeta = 0;

      const activateTilt = () => {
        deviceTiltActive = true;
        orientationHandler = (e) => {
          // gamma: left/right tilt in degrees (-90 to 90). Positive = tilted right.
          // beta:  front/back tilt in degrees (-180 to 180). ~0 = flat, ~90 = upright.
          const gamma = e.gamma ?? 0;
          const beta = e.beta ?? 0;

          smoothGamma += (gamma - smoothGamma) * 0.3;
          smoothBeta += (beta - smoothBeta) * 0.3;

          // Map tilt to gravity. Clamp gamma to ±45 for usable range.
          const clampedGamma = Math.max(-45, Math.min(45, smoothGamma));
          engine.gravity.x = (clampedGamma / 45) * 1.2;

          // Beta ~90 = phone upright (normal). Lower = tilted back, higher = tilted forward.
          // Map so upright (90) = gravity 1 down, flat (0) = gravity ~0.2
          const clampedBeta = Math.max(0, Math.min(150, smoothBeta));
          engine.gravity.y = 0.15 + (clampedBeta / 90) * 0.85;
        };
        window.addEventListener("deviceorientation", orientationHandler);
      };

      const showToast = (msg, duration = 3000) => {
        const toast = document.createElement("div");
        toast.textContent = msg;
        toast.style.cssText = `
          position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%);
          padding: 8px 18px; border-radius: 9999px; z-index: 30;
          background: rgba(20,20,20,0.92); color: #fff; font-size: 12px;
          font-weight: 500; white-space: nowrap; pointer-events: none;
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          animation: fadeInUp 0.3s ease-out;
        `;
        area.appendChild(toast);
        setTimeout(() => { toast.style.opacity = "0"; toast.style.transition = "opacity 0.3s"; }, duration - 400);
        setTimeout(() => toast.remove(), duration);
      };

      if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
        const wrap = document.createElement("div");
        wrap.style.cssText = `position: absolute; top: 10px; right: 10px; z-index: 20; display: flex; flex-direction: column; align-items: flex-end; gap: 4px;`;

        const btn = document.createElement("button");
        btn.textContent = "Enable tilt control";
        btn.style.cssText = `
          padding: 8px 16px; border-radius: 9999px;
          border: 1px solid rgba(0,217,255,0.4);
          background: rgba(0,217,255,0.1); color: #00d9ff;
          font-size: 12px; font-weight: 600; cursor: pointer;
          backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
        `;

        const hint = document.createElement("span");
        hint.textContent = "Requires HTTPS";
        hint.style.cssText = `font-size: 10px; color: rgba(255,255,255,0.3); padding-right: 4px;`;

        wrap.appendChild(btn);
        wrap.appendChild(hint);

        btn.onclick = async () => {
          try {
            const perm = await DeviceOrientationEvent.requestPermission();
            if (perm === "granted") {
              activateTilt();
              wrap.remove();
              showToast("Tilt control enabled! Tilt your phone to move the balls");
            } else {
              showToast("Permission denied. Check your browser settings.");
            }
          } catch (err) {
            console.error("Tilt permission error:", err);
            if (location.protocol !== "https:") {
              showToast("Tilt control requires HTTPS. Deploy the site to test!", 4000);
            } else {
              showToast("Could not enable tilt control. Try again.");
            }
          }
        };
        area.appendChild(wrap);
      } else {
        activateTilt();
        showToast("Tilt control active! Tilt your phone", 2500);
      }
    }

    // --- DOM sync loop ---
    let rafId;
    const syncLoop = () => {
      for (let i = 0; i < balls.length; i++) {
        const body = balls[i];
        const el = ballEls[i];
        if (el) {
          el.style.transform = `translate(${body.position.x - body.radius}px, ${body.position.y - body.radius}px) rotate(${body.angle}rad)`;
        }
      }
      rafId = requestAnimationFrame(syncLoop);
    };
    rafId = requestAnimationFrame(syncLoop);

    const handleResize = () => {
      const newW = area.clientWidth;
      canvas.width = newW;
      Body.setPosition(walls[0], { x: newW / 2, y: h + T / 2 });
      Body.setPosition(walls[1], { x: newW / 2, y: -T / 2 });
      Body.setPosition(walls[2], { x: -T / 2, y: h / 2 });
      Body.setPosition(walls[3], { x: newW + T / 2, y: h / 2 });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      Runner.stop(runner);
      World.clear(engine.world);
      Engine.clear(engine);
      ballEls.forEach((el) => el.remove());
      canvas.remove();
      canvas.removeEventListener("contextmenu", handleContext);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("resize", handleResize);
      if (orientationHandler) window.removeEventListener("deviceorientation", orientationHandler);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="skills" className="relative z-10 py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <span className="text-xs font-medium tracking-[0.3em] uppercase" style={{ color: "#00d9ff" }}>
            Tech Stack
          </span>
          <div className="w-12 h-px mt-3" style={{ background: "linear-gradient(90deg, #00d9ff, transparent)" }} />
        </div>

        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Technologies I{" "}
          <span className="gradient-text">work with</span>
        </h2>
        <p className="text-sm mb-10" style={{ color: "#555" }}>
          <span className="hidden md:inline">Drag, toss, or swipe the balls around.</span>
          <span className="md:hidden">Tap the balls — or tilt your phone!</span>
        </p>

        <div
          ref={areaRef}
          className="relative w-full overflow-hidden"
          style={{
            height: mobile ? 400 : 500,
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.06)",
            background: "#0d0d0d",
          }}
        >
          {tooltip && (
            <div
              className="absolute pointer-events-none px-4 py-2 rounded-lg text-sm font-bold"
              style={{
                left: tooltip.x,
                top: tooltip.y,
                transform: "translate(-50%, -100%)",
                background: "rgba(255,255,255,0.95)",
                color: "#0a0a0a",
                whiteSpace: "nowrap",
                animation: "fadeInUp 0.3s ease-out",
                zIndex: 30,
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                backdropFilter: "blur(8px)",
              }}
            >
              {tooltip.label}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Skills;
