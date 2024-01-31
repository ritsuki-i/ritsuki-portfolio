import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";

function header() {
  const ShowHambuegermenu = () => {
    const Hambuegermenu = document.querySelector(".nav_toggle");
    const HambuegermenuElement = document.querySelector(".nav");
    Hambuegermenu.classList.toggle("show");
    HambuegermenuElement.classList.toggle("show");
  };
  return (
    <div className="header">
      <a href="./">
        <div className="header-logo">Ritsuki Ishikawa</div>
      </a>
      <div className="hamburger-menu">
        <span class="nav_toggle" onClick={ShowHambuegermenu}>
          <i></i>
          <i></i>
          <i></i>
        </span>
        <nav className="nav">
          <ul className="nav_menu_ul">
            <li className="nav_menu_li">
              <NavLink style={({ active }) => (active ? { color: "color: rgb(0, 0, 0);" } : undefined)} to="/">Home</NavLink>
            </li>
            <li className="nav_menu_li">
              <NavLink style={({ active }) => (active ? { color: "color: rgb(0, 0, 0);" } : undefined)} to="/about">About</NavLink>
            </li>
            <li className="nav_menu_li">
              <NavLink style={({ active }) => (active ? { color: "color: rgb(0, 0, 0);" } : undefined)} to="/application">Applications</NavLink>
            </li>
            <li className="nav_menu_li">
              <NavLink style={({ active }) => (active ? { color: "color: rgb(0, 0, 0);" } : undefined)} to="/contact">Contact</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="header-menu">
        <ul>
          <li>
            <NavLink style={({ active }) => (active ? { color: "color: rgb(0, 0, 0);" } : undefined)} to="/">Home</NavLink>
          </li>
          <li>
            <NavLink style={({ active }) => (active ? { color: "color: rgb(0, 0, 0);" } : undefined)} to="/about">About</NavLink>
          </li>
          <li>
            <NavLink style={({ active }) => (active ? { color: "color: rgb(0, 0, 0);" } : undefined)} to="/application">Applications</NavLink>
          </li>
          <li>
            <NavLink style={({ active }) => (active ? { color: "color: rgb(0, 0, 0);" } : undefined)} to="/contact">Contact</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default header;
