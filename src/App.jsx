import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scene3D from "./components/Scene3D";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutMe from "./components/AboutMe";
import Experience from "./components/Experience";
import ProjectGallery from "./components/ProjectGallery/ProjectGallery";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const SpenderDemo = lazy(() => import("./screens/SpenderDemo"));

function Portfolio() {
  return (
    <>
      {/* Fixed 3D background - sits behind everything */}
      <Scene3D />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Main content layer */}
      <div className="relative min-h-screen" style={{ color: "#fff", zIndex: 1 }}>
        {/* Noise overlay */}
        <div className="noise-overlay" />

        {/* Content */}
        <Navbar />
        <main>
          <HeroSection />
          <AboutMe />
          <Experience />
          <ProjectGallery />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route
          path="/spender-demo"
          element={
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a0a0a", color: "#555" }}>
                  Loading...
                </div>
              }
            >
              <SpenderDemo />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
