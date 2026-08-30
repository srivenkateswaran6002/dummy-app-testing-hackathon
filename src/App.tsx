import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AccessibilityProvider, useAccessibility } from './context/AccessibilityContext';
import { GardenProvider } from './context/GardenContext';

// Components
import Navbar from './components/Navbar';
import AccessibilityToolbar from './components/AccessibilityToolbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Garden from './pages/Garden';
import HowItWorks from './pages/HowItWorks';
import YourAttention from './pages/YourAttention';
import Accessibility from './pages/Accessibility';
import AboutTeam from './pages/AboutTeam';

const AppContent: React.FC = () => {
  const { themeMode, highContrast } = useAccessibility();
  const rootBg = highContrast ? 'bg-black text-white' : (themeMode === 'light' ? 'bg-gray-50 text-gray-900' : 'bg-[#0a0a0c] text-gray-100');

  return (
    <>
      {/* Invisible skip link for keyboard users */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only bg-blue-600 text-white p-4 font-bold text-lg absolute z-50 left-4 top-4 rounded-xl"
      >
        Skip to main content
      </a>
      
      <div className={`min-h-screen flex flex-col w-full transition-colors duration-500 ${rootBg}`}>
        <Navbar />
        <div className="flex-1 flex flex-col w-full relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/garden" element={<Garden />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/your-attention" element={<YourAttention />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/about" element={<AboutTeam />} />
          </Routes>
        </div>
        <Footer />
        <AccessibilityToolbar />
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <AccessibilityProvider>
      <GardenProvider>
        <Router>
          <AppContent />
        </Router>
      </GardenProvider>
    </AccessibilityProvider>
  );
};

export default App;
