import React, { useState } from "react";
import LinksCard from "./LinksCard";

function HeroSection() {
    return (
      <div id="home" className="hero-section">
        <div className="hero-content">
          <div className="hero-profile">
            <img className="hero-img" src="img/Matan-copy.png" alt="Profile" />
          </div>
          <div>
            <h1 className="hero-name">Hey! I'm Matan</h1>
            <div className="hero-title">A Full Stack Developer</div>
            <LinksCard />
          </div>
        </div>
      </div>
      );
  }
  
  export default HeroSection;
  