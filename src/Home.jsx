import React from "react";
import "./Home.css";
import Header from "./header.jsx";
import Footer from "./footer.jsx";
import ThreeJSComponent from "./ThreeJSComponent.jsx";


function Home() {
  return (
    <div className="Home">
      <Header />
      <ThreeJSComponent />
      <Footer />
    </div>
  );
}

export default Home;
