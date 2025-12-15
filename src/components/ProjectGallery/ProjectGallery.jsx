import React, { useState } from 'react';
import './ProjectGallery.css'; 
import ProjectViewCard from './ProjectViewCard';
import PinedProjectViewCard from './PinedProjectViewCard';
import ProjectDesCard from './ProjectDesCard';
import projectsData from '../../assets/projects';

const ProjectGallery = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = ["All", "Web Development", "Mobile App", "AI & Machine Learning", "System Programming"];
    const reverseProjects = [...projectsData].reverse();
    
    const filteredProjects = activeCategory === "All" 
        ? reverseProjects 
        : reverseProjects.filter(project => project.category === activeCategory);

    return (
        <section className="gallery-container">
            <div className="projects-section">
                <div className="projects-header">
                    <h2 id='projects'>Projects</h2>
                </div>

                <div className="filter-menu">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="gallery-grid">
                {filteredProjects.map((project) => {
                    const CardComponent = project.isPinned ? PinedProjectViewCard : ProjectViewCard;
                    
                    return (
                        <div 
                            key={project.id}
                            className={project.isPinned ? 'pinned-wrapper' : ''}
                        >
                            <CardComponent 
                                project={project} 
                                onClick={setSelectedProject} 
                            />
                        </div>
                    );
                })}
            </div>

            <ProjectDesCard 
                isOpen={!!selectedProject}
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
};

export default ProjectGallery;