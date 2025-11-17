import React, { useState } from "react";
import "../index.css";

function Navbar() {
  return (
    <nav className="main-navbar">
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#footer">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;