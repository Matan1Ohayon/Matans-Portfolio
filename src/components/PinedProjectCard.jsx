import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function PinedProjectCard({ project, direction }) {
    const cardRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const navigate = useNavigate();

  
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

    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Generate image paths - assuming spender project has multiple screens
    const getImages = () => {
      if (project.images && Array.isArray(project.images)) {
        return project.images;
      }
      // Fallback: generate paths for spender screens if project.id === 0
      if (project.id === 0) {
        return [
          "/projects_img/spender_screens/spender(1).png",
          "/projects_img/spender_screens/spender(2).png",
          "/projects_img/spender_screens/spender(3).png",
          "/projects_img/spender_screens/spender(4).png",
          "/projects_img/spender_screens/spender(5).png",
          "/projects_img/spender_screens/spender(6).png",
        ];
      }
      // Default: use single image
      return [project.src];
    };

    const images = getImages();
    
    // Determine how many images to show based on screen size
    const getImageCount = () => {
      if (windowWidth < 900) return 1; // Different layout for small screens
      if (windowWidth < 1200) return 3;
      if (windowWidth < 1600) return 4;
      return 5; // Large screens
    };

    const imagesToShow = images.slice(0, getImageCount());
    const isSmallScreen = windowWidth < 900;

    return (
        <div
            ref={cardRef}
            className={[
                "project-unit",
                direction,
                visible ? "is-visible" : "",
            ].join(" ")}
        >
            <div className="pined-project-unit-face">
                <div className="project-content">
                    <h3 >{project.title}</h3>
                    <p >{project.sec_title}</p>
                    <div className="project-btns">                 
                        <a
                            className="btn-primary"
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            // onClick={(e) => {
                            //     navigate("/spender-demo"); // מעבר לדף הנחיתה
                            // }}                          
                            >
                            {project.btn_title}
                        </a>   
                    </div>
                    <p className="pined-project-description">{project.description}</p>
                    <div className="project-unit-tech">
                        {project.badges.map((t) => (
                            <span key={t}>{t}</span>
                        ))}
                    </div>
                </div>
                <div className={`pined-project-image ${isSmallScreen ? 'pined-project-image-small' : 'pined-project-image-grid'}`}>
                    {isSmallScreen ? (
                        // Single image layout for small screens
                        <img
                            className="pined-project-main-image"
                            src={project.src || images[0]}
                            alt={project.title}
                        />
                    ) : (
                        // Horizontal layout for larger screens - images side by side with overlap
                        <div className="pined-project-images-container">
                            {imagesToShow.map((imgSrc, index) => {
                                // lower index = higher z-index (appears on top)
                                const total = imagesToShow.length;
                                return (
                                    <div 
                                        key={index} 
                                        className="pined-project-sub-image-wrapper"
                                        style={{ 
                                            zIndex: total - index
                                        }}
                                    >
                                        <img
                                            className="pined-project-sub-image"
                                            src={imgSrc}
                                            alt={`${project.title} - Screen ${index + 1}`}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
  }

export default PinedProjectCard;
