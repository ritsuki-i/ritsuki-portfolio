import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./Home.jsx";
import About from "./About.jsx";
import Application from "./Application.jsx";
import Contact from "./Contact.jsx";
import Notfound from "./Notfound.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route
          path="./"
          element={<Home />}
        />
        <Route
          path="./about"
          element={<About />}
        />
        <Route
          path="/ritsuki-portfolio/application"
          element={<Application />}
        />
        <Route
          path="https://ritsuki-i.github.io/ritsuki-portfolio/contact"
          element={<Contact />}
        />
        <Route
          path="*"
          element={<Notfound />}
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
