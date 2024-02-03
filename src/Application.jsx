import React from "react";
import Header from "./header.jsx";
import Footer from "./footer.jsx";
import AppCard from "./AppCard.jsx";
import "./Application.css"

export default function Application() {
  return (
    <div className="Application">
      <Header />
      <div className="main">
        <AppCard />
      </div>
      <Footer />
    </div>
  );
}
