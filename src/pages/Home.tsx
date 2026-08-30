import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sprout } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

const Home: React.FC = () => {
  const { themeMode, highContrast } = useAccessibility();
  const isLight = themeMode === 'light' && !highContrast;
  const titleGradient = isLight ? 'from-gray-900 to-gray-500' : 'from-gray-100 to-gray-500';

  return (
    <main id="main-content" className="flex-1 w-full flex flex-col items-center justify-center relative overflow-hidden min-h-[90vh]" tabIndex={-1}>
      
      {/* Background Ambience */}
      <div className={`absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${isLight ? 'from-green-200 via-white to-gray-100' : 'from-green-900/20 via-[#0a0a0c] to-black'}`}></div>
      
      {/* Animated subtle roots in background */}
      {!isLight && (
        <div className="absolute inset-0 pointer-events-none opacity-10 flex justify-center items-end pb-32">
          <svg viewBox="0 0 100 100" className="w-full max-w-4xl h-auto" preserveAspectRatio="none">
            <path d="M50 0 Q40 50 20 100" fill="none" stroke="#fbbf24" strokeWidth="0.5" className="animate-pulse" />
            <path d="M50 0 Q60 50 80 100" fill="none" stroke="#fbbf24" strokeWidth="0.5" className="animate-pulse" style={{ animationDelay: '1s' }} />
            <path d="M50 0 Q50 50 50 100" fill="none" stroke="#fbbf24" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
          </svg>
        </div>
      )}

      <div className="relative z-10 text-center max-w-4xl px-4 flex flex-col items-center">
        <div className={`mb-6 p-4 rounded-full border shadow-[0_0_30px_rgba(34,197,94,0.1)] ${isLight ? 'bg-white border-gray-200' : 'bg-[#111] border-gray-800'}`}>
          <Sprout className="w-12 h-12 text-emerald-500" />
        </div>
        
        <h1 className={`text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-r ${titleGradient}`}>
          THE FILTER BUBBLE GARDEN
        </h1>
        
        <p className="text-2xl md:text-3xl font-medium text-emerald-500 mb-8 max-w-2xl">
          Your feed doesn't just reflect what you like. It learns to grow more of it.
        </p>
        
        <p className={`text-lg md:text-xl mb-12 max-w-2xl leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
          Every click, like, pause and scroll feeds the algorithm. Over time, your diverse garden can quietly become a monoculture.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <Link
            to="/garden"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-black bg-emerald-500 hover:bg-emerald-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] w-full sm:w-auto hover:scale-105"
          >
            ENTER THE GARDEN
          </Link>
          <Link
            to="/how-it-works"
            className={`inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-gray-400 transition-all w-full sm:w-auto ${isLight ? 'text-gray-800 bg-white border border-gray-300 hover:bg-gray-100' : 'text-white bg-transparent border border-gray-700 hover:bg-gray-800 hover:border-gray-500'}`}
          >
            SEE HOW IT WORKS
            <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
