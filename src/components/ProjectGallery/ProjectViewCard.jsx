import React, { useRef, useEffect } from 'react';

const ProjectViewCard = ({ project, onClick }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (project.mediaType !== 'video') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
          } else {
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [project.mediaType]);

  return (
    <div className="project-card" onClick={() => onClick(project)}>
      <div className="card-media">
        {project.mediaType === 'video' ? (
          <video 
            ref={videoRef}
            src={project.src} 
            muted 
            loop 
            playsInline 
            preload="metadata" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
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