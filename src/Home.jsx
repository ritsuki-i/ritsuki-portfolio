import React, { useState } from "react";
import "./Home.css";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import ThreeJSComponent from "./ThreeJSComponent.jsx";
import About from "./About.jsx";
import Application from "./Application.jsx";
import Contact from "./Contact.jsx";

export default function Home() {
  const [nowPage, setPage] = useState("Home");
  const handleValueChange = (newValue, event) => {
    const currentActive = document.querySelector(".nav_active");
    if (currentActive) {
      currentActive.classList.remove("nav_active");
    }

    if (event.target) {
      event.target.classList.add("nav_active");
    }

    setPage(newValue);
  };

  const loadPage = () => {
    if (nowPage === "Home") {
      return <ThreeJSComponent />;
    } else if (nowPage === "About") {
      return <About />;
    } else if (nowPage === "Application") {
      return <Application />;
    } else {
      return <Contact handleValueChange={handleValueChange} />;
    }
  };
  
  return (
    <div className="Home">
      <Header handleValueChange={handleValueChange} />
      {loadPage()}
      <Footer />
    </div>
  );
}
