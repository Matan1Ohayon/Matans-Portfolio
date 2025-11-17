import React, { useEffect, useRef, useState } from "react";

function ProjectCard({ project, direction }) {
    const cardRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [flipped, setFlipped] = useState(false);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setVisible(true);
        },
        { threshold: 0.25 }
      );
  
      if (cardRef.current) observer.observe(cardRef.current);
      return () => observer.disconnect();
    }, []);

    const toggleFlip = () => setFlipped((v) => !v);

    return (
        <div
            ref={cardRef}
            className={[
                "project-unit",
                direction,
                visible ? "is-visible" : "",
                flipped ? "is-flipped" : "",
            ].join(" ")}
            onClick={toggleFlip} 
        >
             <div className="project-unit-inner">
                {/* FRONT */}
                <div className="project-unit-face project-unit-front">
                    <div className="project-content">
                        <h3 >{project.title}</h3>
                        <p >{project.sec_title}</p>
                        <div className="project-btns">
                        
                            <a
                                className="btn-primary"
                                href={project.link}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}                             >
                                {project.btn_title}
                            </a>
                            
                            <a
                                type="button"
                                className="btn-secondary"
                                onClick={(e) => {
                                e.stopPropagation();
                                toggleFlip();
                                }}
                            >
                                {flipped ? "Close" : "Learn more"}
                            </a>
                        </div>
                    </div>

                    <div className="project-image">
                        <img
                            className=""
                            src={project.src}
                            alt={project.title}
                        />
                    </div>
                </div>

                {/* BACK */}
                <div className="project-unit-face project-unit-back">
                    <div className="project-unit-back-content">
                        <h3 className="project-unit-title">{project.title}</h3>
                        <p className="project-unit-description">
                        {project.description}
                        </p>

                        <div className="project-unit-tech">
                        {project.badges.map((t) => (
                            <span key={t}>{t}</span>
                        ))}
                        </div>

                        <button
                        type="button"
                        className="btn-close"
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleFlip();
                        }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
  }

export default ProjectCard;
