import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

            <motion.div className="gallery-grid">
                <AnimatePresence>
                    {filteredProjects.map((project) => (
                        <motion.div
                            layout 
                            key={project.id}
                            className={project.isPinned ? 'pinned-wrapper' : ''} 
                            
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4 }}
                        >
                            {project.isPinned ? (
                                <PinedProjectViewCard 
                                    project={project} 
                                    onClick={setSelectedProject} 
                                />
                            ) : (
                                <ProjectViewCard 
                                    project={project} 
                                    onClick={setSelectedProject} 
                                />
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            <ProjectDesCard 
                isOpen={!!selectedProject}
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
};

export default ProjectGallery;