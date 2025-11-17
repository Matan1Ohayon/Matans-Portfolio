import React, { useEffect } from "react";

function AboutMe() {
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
    <div className="about-section">
      <div className="about-content">
        <h1 className="about-title reveal up">About Me</h1>
        <div className="about-d reveal left">
          I’m a third-year Computer Science student at SCE, currently holding a   
          <strong> 96 GPA</strong> and listed on the <strong>Dean’s List</strong>. 
          I have hands-on experience in <strong>software development</strong>, 
          <strong> algorithms</strong>, and building <strong>full-stack projects </strong> 
          from start to finish. I’m especially interested in 
          <strong> AI and machine learning</strong>, and I enjoy breaking down complex 
          problems and turning them into clear, practical solutions. <br />
          I’m looking to join a development team where I can work on 
          real products, learn from experienced engineers, and continue growing.
        </div>
        <div className="about-actions reveal left">
            <a 
              className="btn-fill" 
              href="Matan-Ohayon-CV.pdf" 
              target="_blank" 
              rel="noreferrer">
                View Resume
            </a>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
