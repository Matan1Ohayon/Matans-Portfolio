import React, { useEffect } from "react";
import projects from "../assets/projects.js";
import ProjectCard from "./ProjectCard";


function ProjectsSection() {
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

    return (
        <section id="projects" className="projects-section">
          <div className="projects-header">
            <h2 className="reveal up">Projects</h2>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id || index}
                project={project}
                direction={index % 2 === 0 ? "from-left" : "from-right"}
              />
            ))}
          </div>
        </section>
      );
}

export default ProjectsSection;
