import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sprout, Sun, Moon } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { highContrast, themeMode, toggleThemeMode } = useAccessibility();

  const links = [
    { name: 'The Garden', path: '/garden' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Your Attention', path: '/your-attention' },
    { name: 'About', path: '/about' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  React.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navClass = highContrast 
    ? 'bg-black text-white border-b border-gray-700' 
    : themeMode === 'light'
      ? 'bg-white/80 backdrop-blur-md text-gray-900 border-b border-gray-200 sticky top-0 z-50'
      : 'bg-[#0a0a0c]/80 backdrop-blur-md text-gray-100 border-b border-gray-800 sticky top-0 z-50';

  const linkClass = (path: string) => {
    const isActive = location.pathname === path;
    const base = 'px-3 py-2 rounded-md text-sm font-bold tracking-wide uppercase transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500';
    if (highContrast) {
      return `${base} ${isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`;
    }
    if (themeMode === 'light') {
      return `${base} ${isActive ? 'text-emerald-600' : 'text-gray-600 hover:text-gray-900'}`;
    }
    return `${base} ${isActive ? 'text-emerald-400' : 'text-gray-400 hover:text-white'}`;
  };

  return (
    <nav className={navClass} aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500 rounded p-1 group"
              aria-label="Filter Bubble Garden Home"
            >
              <div className={`p-2 rounded-xl transition-colors border ${themeMode === 'light' ? 'bg-gray-100 group-hover:bg-gray-200 border-gray-300' : 'bg-[#111] group-hover:bg-gray-800 border-gray-800'}`}>
                <Sprout className="h-6 w-6 text-emerald-500" aria-hidden="true" />
              </div>
              <span className="font-extrabold text-xl tracking-tight hidden sm:block">FILTER BUBBLE GARDEN</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={linkClass(link.path)}
                aria-current={location.pathname === link.path ? 'page' : undefined}
              >
                {link.name}
              </Link>
            ))}
            <div className="w-px h-6 bg-gray-700 mx-4" aria-hidden="true"></div>
            <Link
              to="/accessibility"
              className={`px-3 py-2 rounded-md text-sm font-bold tracking-wide uppercase transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500 ${
                themeMode === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 hover:text-white'
              }`}
              aria-label="Accessibility Settings"
            >
              Accessibility
            </Link>
            <button
              onClick={toggleThemeMode}
              className={`p-2 rounded-full transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500 ${
                themeMode === 'light' ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' : 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
              }`}
              aria-label={themeMode === 'light' ? "Switch to dark theme" : "Switch to light theme"}
              title={themeMode === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {themeMode === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-inset focus:ring-emerald-500"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-8 w-8" aria-hidden="true" />
              ) : (
                <Menu className="block h-8 w-8" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`md:hidden border-b ${themeMode === 'light' ? 'bg-white border-gray-200' : 'bg-[#111] border-gray-800'}`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block ${linkClass(link.path)}`}
                aria-current={location.pathname === link.path ? 'page' : undefined}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/accessibility"
              className={`block px-3 py-2 rounded-md text-sm font-bold tracking-wide uppercase focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500 ${
                themeMode === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 hover:text-white'
              }`}
            >
              Accessibility Settings
            </Link>
            <button
              onClick={toggleThemeMode}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-bold tracking-wide uppercase focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500 ${
                themeMode === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 hover:text-white'
              }`}
            >
              {themeMode === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              {themeMode === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
