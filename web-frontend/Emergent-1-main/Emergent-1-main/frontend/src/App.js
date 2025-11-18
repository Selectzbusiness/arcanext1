import React from 'react';
import './App.css';
import Header from './components/Header';
import HeroWithBackground from './components/HeroWithBackground';
import VisualShowcase from './components/VisualShowcase';
import CodeDemo from './components/CodeDemo';
import Features from './components/Features';
import AIFeatures from './components/AIFeatures';
import Pricing from './components/Pricing';
import Addons from './components/Addons';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App bg-[#0d1117] min-h-screen">
      <Header />
      <main>
        <HeroWithBackground />
        <div className="relative z-20 bg-[#0d1117]">
          <VisualShowcase />
          <CodeDemo />
          <Features />
          <AIFeatures />
          <Pricing />
          <Addons />
          <Testimonials />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;