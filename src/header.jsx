import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";



function Header({ handleValueChange }) {
  const ShowHambuegermenu = () => {
    const Hambuegermenu = document.querySelector(".nav_toggle");
    const HambuegermenuElement = document.querySelector(".nav");
    Hambuegermenu.classList.toggle("show");
    HambuegermenuElement.classList.toggle("show");
  };

  return (
    <div className="header">
      <a onClick={() => handleValueChange("Home")}>
        <div className="header-logo">Ritsuki Ishikawa</div>
      </a>
      <div className="hamburger-menu">
        <span className="nav_toggle" onClick={ShowHambuegermenu}>
          <i></i>
          <i></i>
          <i></i>
        </span>
        <nav className="nav">
          <ul className="nav_menu_ul">
            <li className="nav_menu_li">
              <NavLink onClick={(e) => handleValueChange("Home",e)}>Home</NavLink>
            </li>
            <li className="nav_menu_li">
              <NavLink onClick={(e) => handleValueChange("About",e)}>About</NavLink>
            </li>
            <li className="nav_menu_li">
              <NavLink onClick={(e) => handleValueChange("Application",e)}>Application</NavLink>
            </li>
            <li className="nav_menu_li">
              <NavLink onClick={(e) => handleValueChange("Contact",e)}>Contact</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="header-menu">
        <ul>
          <li>
            <NavLink onClick={(e) => handleValueChange("Home",e)}>Home</NavLink>
          </li>
          <li>
            <NavLink onClick={(e) => handleValueChange("About",e)}>About</NavLink>
          </li>
          <li>
            <NavLink onClick={(e) => handleValueChange("Application",e)}>Application</NavLink>
          </li>
          <li>
            <NavLink onClick={(e) => handleValueChange("Contact",e)}>Contact</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
