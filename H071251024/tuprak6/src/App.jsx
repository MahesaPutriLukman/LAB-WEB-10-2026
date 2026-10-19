import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from './components/About';
import Skills from './components/Skills';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import Project from './components/project'

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Gallery />
      <Project />
      <Footer />
    </div>
  );
}

export default App;

