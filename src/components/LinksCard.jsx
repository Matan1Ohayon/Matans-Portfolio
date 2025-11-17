import React, { useState } from "react";
import "../index.css";

const LinksCard = () => {
  return (
    <div className="links-card">
    <a
      href="mailto:Matan1Ohayon@gmail.com" 
      target="_blank"
      className="links-card-link"
      aria-label="Email"
    >
        <lord-icon
            src="https://cdn.lordicon.com/dhzbkemf.json"
            trigger="hover"
            colors="primary:#121331,secondary:#000000"
            style={{width:"3em",height:"3em"}}>
        </lord-icon>
    </a>
    <a
      href="https://github.com/Matan1Ohayon"
      target="_blank"
      className="links-card-link"
      aria-label="GitHub"
    >
        <lord-icon
            src="https://cdn.lordicon.com/jjxzcivr.json"
            trigger="hover"
            colors="primary:#121331,secondary:#000000"
            style={{width:"3em",height:"3em"}}>
        </lord-icon>
    </a>
    <a
      href="https://www.linkedin.com/in/matan-ohayon-4101b6276/"
      target="_blank"
      className="links-card-link"
      aria-label="LinkedIn"
    >
        <lord-icon
            src="https://cdn.lordicon.com/qgebwute.json"
            trigger="hover"
            colors="primary:#121331,secondary:#000000"
            style={{width:"3em",height:"3em"}}>
        </lord-icon>
    </a>
  </div>
  );
};

export default LinksCard;
