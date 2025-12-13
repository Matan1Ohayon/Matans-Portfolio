import { div } from 'framer-motion/client';
import React from 'react';

const ProjectViewCard = ({ project, onClick }) => {
  return (
    <div className="project-card" onClick={() => onClick(project)}>
      <div className="card-media">
        {project.mediaType === 'video' ? (
          <video src={project.src} muted loop autoPlay playsInline />
        ) : (
          <img src={project.src} alt={project.title} loading="lazy" />
        )}
      </div>
      
      <div className="card-content">
        <span className="card-category">{project.category} • {project.date}</span>
        <h3 className="card-title">{project.title}</h3>
        <p className="card-desc">{project.shortDesc}</p>

    

      </div>
    </div>
  );
};

export default ProjectViewCard;