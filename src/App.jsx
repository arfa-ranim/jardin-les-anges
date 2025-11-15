// src/App.jsx
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header.jsx";

const Home       = React.lazy(() => import("./pages/Home.jsx"));
const About      = React.lazy(() => import("./pages/About.jsx"));
const Activities = React.lazy(() => import("./pages/Activities.jsx"));
const Gallery    = React.lazy(() => import("./pages/Gallery.jsx"));
const Contact    = React.lazy(() => import("./pages/Contact.jsx"));
const Admin      = React.lazy(() => import("./pages/Admin.jsx"));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="loading">Chargement…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;