import React from 'react';
import { Link } from 'react-router-dom';
import { useAccessibility } from '../context/AccessibilityContext';
import { Sprout } from 'lucide-react';

const Footer: React.FC = () => {
  const { highContrast, themeMode } = useAccessibility();

  const footerClass = highContrast 
    ? 'bg-black text-gray-300 border-t border-gray-700' 
    : themeMode === 'light'
      ? 'bg-gray-100 text-gray-600 border-t border-gray-200'
      : 'bg-[#050505] text-gray-500 border-t border-gray-900';

  return (
    <footer className={`${footerClass} py-12 mt-auto`} aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start mb-6 md:mb-0">
            <div className="text-center md:text-left flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 mb-2">
                <Sprout className="w-5 h-5" aria-hidden="true" />
                <span className="text-lg font-bold tracking-widest uppercase text-gray-400">FILTER BUBBLE GARDEN</span>
              </div>
              <p className="mt-1 text-sm italic opacity-60">Created as a conceptual prototype for the THRIVE 2026 challenge.</p>
            </div>
          </div>
          <div className="flex justify-center space-x-6 md:order-2">
            <Link to="/accessibility" className="hover:text-emerald-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500 rounded px-2 py-1">
              Accessibility
            </Link>
            <Link to="/about" className="hover:text-emerald-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500 rounded px-2 py-1">
              About
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-900 pt-8 md:flex md:items-center md:justify-between">
          <p className="text-center md:text-left text-sm opacity-50">
            &copy; 2026 Filter Bubble Garden. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
