import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./Home.jsx";
import Notfound from "./Notfound.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router basename="/ritsuki-portfolio">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
