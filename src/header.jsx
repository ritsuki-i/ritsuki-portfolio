import React from "react";
import "./Header.css";

function Header({ handleValueChange, nowPage }) {
  const ShowHambuegermenu = () => {
    const Hambuegermenu = document.querySelector(".nav_toggle");
    const HambuegermenuElement = document.querySelector(".nav");
    Hambuegermenu.classList.toggle("show");
    HambuegermenuElement.classList.toggle("show");
  };

  const LoadMenu = () =>{
    const navItems = ["Home", "About", "Application", "Contact"];
    const navigation = navItems.map((item, index) => (
      <li
        key={index}
        className={`menu_li ${nowPage === item ? "menu_active" : ""}`}
        onClick={() => handleValueChange(item)}
      >
        {item}
      </li>
    ));
    return navigation;
  }

  const LoadnavMenu = () => {
    const navItems = ["Home", "About", "Application", "Contact"];
    const navigation = navItems.map((item, index) => (
      <li
        key={index}
        className={`nav_menu_li ${nowPage === item ? "nav_active" : ""}`}
        onClick={() => handleValueChange(item)}
      >
        {item}
      </li>
    ));
    return navigation;
  };

  return (
    <div className="Header">
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
          <ul className="nav_menu_ul">{LoadnavMenu()}</ul>
        </nav>
      </div>
      <div className="header-menu">
        <ul className="menu_ul">{LoadMenu()}</ul>
      </div>
    </div>
  );
}

export default Header;
