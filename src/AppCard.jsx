import React, { useEffect } from "react";
import "./AppCard.css";
import AppData from "./Data/AppData.json";

export default function AppCard() {
  const adjustFontSize = () => {
    if (window.innerWidth <= 960) {
      const playbtn = document.querySelectorAll(".long");
      const appimg = document.querySelectorAll(".appimg");
      for (let i = 0; i < playbtn.length; i++) {
        const size =
          (playbtn[i].offsetWidth - appimg[i].offsetWidth - 20) /
          playbtn[i].textContent.length;
        playbtn[i].style.fontSize = size + "px";
      }
    } else {
      const playbtn = document.querySelectorAll(".long");
      for (let i = 0; i < playbtn.length; i++) {
        const size = 3;
        playbtn[i].style.fontSize = size + "vh";
      }
    }
  };
  window.addEventListener("resize", adjustFontSize);

  useEffect(() => {
    adjustFontSize();
  },[]);
  return (
    <div className="AppCard">
      <h1 className="title">Application</h1>
      <div className="row g-4 mt-3">
        {AppData.apps.map((app, index) => (
          <div className="col-sm-4" key={index}>
            <a href={app.url} target="_blank" rel="noopener noreferrer">
              <div className="app-card">
                <div className="my-4">
                  <img src={app.path} className="appimg" alt="" />
                  <h5 className="long">{app.name}</h5>
                  <p>{app.script}</p>
                  <button className="play-btn">Play</button>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
