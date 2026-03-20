import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";

function Sphere({ position, color, speed, distort, size }) {
  const meshRef = useRef();
  const mousePos = useRef({ x: 0, y: 0 });

  useFrame(({ mouse }) => {
    mousePos.current.x += (mouse.x * 0.5 - mousePos.current.x) * 0.02;
    mousePos.current.y += (mouse.y * 0.3 - mousePos.current.y) * 0.02;

    if (meshRef.current) {
      meshRef.current.position.x = position[0] + mousePos.current.x * 1.5;
      meshRef.current.position.y = position[1] + mousePos.current.y * 1.0;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.6}
          roughness={0.1}
          metalness={0.8}
          distort={distort}
          speed={2}
          envMapIntensity={0.5}
        />
      </mesh>
    </Float>
  );
}

function Particles({ count = 80 }) {
  const points = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 20;
      pos[i + 1] = (Math.random() - 0.5) * 20;
      pos[i + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
      points.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function InnerScene() {
  const spheres = useMemo(
    () => [
      { position: [-3.5, 1.5, -2], color: "#00d9ff", speed: 1.5, distort: 0.3, size: 0.6 },
      { position: [3.8, -1.2, -3], color: "#ff006e", speed: 1.2, distort: 0.4, size: 0.8 },
      { position: [-2, -2, -1], color: "#00d9ff", speed: 1.8, distort: 0.2, size: 0.4 },
      { position: [2, 2.5, -4], color: "#ff006e", speed: 1.0, distort: 0.35, size: 0.5 },
      { position: [4.5, 0.5, -2], color: "#00d9ff", speed: 1.4, distort: 0.25, size: 0.35 },
      { position: [-4, -0.5, -3], color: "#ff006e", speed: 1.6, distort: 0.3, size: 0.45 },
      { position: [0.5, 3, -5], color: "#00d9ff", speed: 1.1, distort: 0.2, size: 0.3 },
      { position: [-1, -3, -2], color: "#ff006e", speed: 1.3, distort: 0.4, size: 0.5 },
    ],
    []
  );

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <pointLight position={[-5, 2, 3]} intensity={0.8} color="#00d9ff" />
      <pointLight position={[5, -2, 3]} intensity={0.8} color="#ff006e" />

      {spheres.map((s, i) => (
        <Sphere key={i} {...s} />
      ))}
      <Particles />
    </>
  );
}

function Scene3D() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Unmount the 3D scene when #skills is near the viewport to avoid WebGL compositing issues
    const tryObserve = () => {
      const skills = document.getElementById("skills");
      if (!skills) {
        setTimeout(tryObserve, 500);
        return;
      }
      const observer = new IntersectionObserver(
        ([entry]) => {
          setHidden(entry.isIntersecting);
        },
        { threshold: 0, rootMargin: "200px" }
      );
      observer.observe(skills);
      return observer;
    };
    const observer = tryObserve();
    return () => observer?.disconnect?.();
  }, []);

  // Fully unmount Canvas when hidden to avoid WebGL compositing artifacts
  if (hidden) return null;

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <InnerScene />
      </Canvas>
    </div>
  );
}

export default Scene3D;
