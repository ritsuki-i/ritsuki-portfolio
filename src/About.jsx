import React from 'react';
import AboutContents from "./AboutContents.jsx";
import Header from "./header.jsx";
import Footer from "./footer.jsx";
import "./About.css";

export default function About() {
  return (
    <div className="About">
      <Header />
      <div className="main">
        <AboutContents />
      </div>
      <Footer />
    </div>
  );
};
