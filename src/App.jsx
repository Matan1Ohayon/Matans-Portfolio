import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutMe from "./components/AboutMe";
import ProjectsSection from "./components/ProjectsSection";
import Footer from "./components/Footer";
import SpenderDemo from "./screens/SpenderDemo";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div>
            <Navbar />
            <HeroSection />
            <AboutMe />
            <ProjectsSection />
            <Footer />
          </div>
        } />
        <Route path="/spender-demo" element={<SpenderDemo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
