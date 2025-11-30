import React, { useEffect, useState } from "react";
import projects from "../assets/projects.js";
import ProjectCard from "./ProjectCard";
import PinedProjectCard from "./PinedProjectCard.jsx";


function ProjectsSection() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const els = document.querySelectorAll(".reveal");
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("in");
              }
            });
          },
          { threshold: 0.2 }
        );
    
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
      }, []);

    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isSmallScreen = windowWidth < 900;

    return (
        <section id="projects" className="projects-section">
          <div className="projects-header reveal up">
            <h2>Projects</h2>
          </div>
          {isSmallScreen ? (
            // On small screens, use regular ProjectCard in the grid
            <div className="projects-grid">
              {projects.map((project, idx) => (
                <ProjectCard
                  key={project.id || idx}
                  project={project}
                  direction={idx % 2 === 0 ? "from-left" : "from-right"}
                />
              ))}
            </div>
          ) : (
            // On larger screens, use PinedProjectCard for first project
            <>
              <div className="pined-project">
                <PinedProjectCard 
                  key={projects[0].id}
                  project={projects[0]}
                  direction={"from-left"}
                  />
              </div>
              <div className="projects-grid">
                {projects.slice(1).map((project, idx) => (
                  <ProjectCard
                    key={project.id || idx}
                    project={project}
                    direction={idx % 2 === 0 ? "from-left" : "from-right"}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      );
}

export default ProjectsSection;
