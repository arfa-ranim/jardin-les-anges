import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import './App.css';

const Home = React.lazy(() => import('./pages/Home.jsx'));
const About = React.lazy(() => import('./pages/About.jsx'));
const Activities = React.lazy(() => import('./pages/Activities.jsx'));
const Gallery = React.lazy(() => import('./pages/Gallery.jsx'));
const Contact = React.lazy(() => import('./pages/Contact.jsx'));
const Admin = React.lazy(() => import('./pages/Admin.jsx'));

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 via-white to-sky-50 text-slate-900">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="py-24 text-center text-slate-500">Chargement…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
