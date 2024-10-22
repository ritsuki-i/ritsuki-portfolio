import React, { useState, useEffect } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group"; // 追加
import "./Home.css";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import ThreeJSComponent from "./ThreeJSComponent.jsx";
import About from "./About.jsx";
import Application from "./Application.jsx";
import Contact from "./Contact.jsx";
import Welcome from "./Welcome.jsx";
import AppData from "./Data/AppData.json";
import UsedTecs from "./Data/UsedTec.json";

export default function Home() {
  const [nowPage, setPage] = useState(sessionStorage.getItem('nowPage') || 'Home');
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 960);

  const handleValueChange = (newValue) => {
    const Hambuegermenu = document.querySelector(".nav_toggle");
    const HambuegermenuElement = document.querySelector(".nav");
    Hambuegermenu.classList.remove("show");
    HambuegermenuElement.classList.remove("show");

    setPage(newValue);
    sessionStorage.setItem('nowPage', newValue);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 960);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const loadPage = () => {
    if (nowPage === "Home") {
      return (
        <div>
          {isDesktop && <Welcome />}
          <ThreeJSComponent />
        </div>
      );
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
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={nowPage} // ページが変わるたびにキーを変更
          timeout={800} // アニメーションの時間
          classNames="fade" // CSSクラス名
        >
          <div>{loadPage()}</div>
        </CSSTransition>
      </SwitchTransition>
      <Footer />
    </div>
  );
}
