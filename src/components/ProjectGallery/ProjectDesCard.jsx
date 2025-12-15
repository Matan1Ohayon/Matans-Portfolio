import React from 'react';

const ProjectDesCard = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-card">
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="modal-media-container">
          {project.mediaType === 'video' ? (
            <video 
              src={project.src} 
              controls               
              preload="metadata"
              className="video-element"
            />
          ) : (
            <img src={project.src} alt={project.title} />
          )}
        </div>

        <div className="modal-body">
          <h2 className="modal-title">{project.title}</h2>
          <p className="modal-text">{project.description}</p>
          
          {project.badges && project.badges.length > 0 && (
            <div className="modal-tags">
              {project.badges.map((tag, index) => (
                <span key={index} className="tech-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
          {project.link && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="modal-action-btn"
            >
              {project.btn_title}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDesCard;