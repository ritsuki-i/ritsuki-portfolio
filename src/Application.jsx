import React from "react";
import Header from "./header.jsx";
import Footer from "./footer.jsx";
import AppCard from "./AppCard.jsx";

export default function Application() {
  return (
    <div className="Application">
      <Header />
      <AppCard />
      <Footer />
    </div>
  );
}
