import React, { useState } from "react";
import "./Home.css";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import ThreeJSComponent from "./ThreeJSComponent.jsx";
import About from "./About.jsx";
import Application from "./Application.jsx";
import Contact from "./Contact.jsx";
import AppData from "./Data/AppData.json";
import UsedTecs from "./Data/UsedTec.json";

export default function Home() {

  const [nowPage, setPage] = useState(sessionStorage.getItem('nowPage') || 'Home');
  const handleValueChange = (newValue) => {
    const Hambuegermenu = document.querySelector(".nav_toggle");
    const HambuegermenuElement = document.querySelector(".nav");
    Hambuegermenu.classList.remove("show");
    HambuegermenuElement.classList.remove("show");

    setPage(newValue);
    sessionStorage.setItem('nowPage', newValue)
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

  const preloadImages = () => {
    const images = ["img/myicon.png"];

    AppData.apps.forEach((app) => {
      images.push(app.path);
    });
    UsedTecs.tecs.forEach((tec) => {
      images.push(tec.path);
    });

    images.forEach((imagePath) => {
      const img = new Image();
      img.src = imagePath;
    });
  };

  preloadImages();

  return (
    <div className="Home">
      <Header handleValueChange={handleValueChange} nowPage={nowPage} />
      {loadPage()}
      <Footer />
    </div>
  );
}
