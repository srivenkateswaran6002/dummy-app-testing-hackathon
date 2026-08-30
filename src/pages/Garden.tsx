import React from 'react';
import FilterBubbleGarden from '../components/garden/FilterBubbleGarden';
import { useGarden } from '../context/GardenContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { RotateCcw, Zap } from 'lucide-react';

const Garden: React.FC = () => {
  const { day, setDay, resetGarden, breakBubble, diversityScore, plants } = useGarden();
  const { themeMode, reduceMotion } = useAccessibility();
  const isMonoculture = diversityScore < 20;
  const isLight = themeMode === 'light';

  return (
    <main id="main-content" className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 flex flex-col items-center" tabIndex={-1}>
      <div className="text-center mb-6 max-w-3xl">
        <h1 className={`text-3xl font-bold mb-2 ${isLight ? 'text-gray-900' : ''}`}>Choose what you pay attention to.</h1>
        <p className={isLight ? 'text-gray-600' : 'text-gray-400'}>
          Click on a plant to grow that interest. Watch how the garden reacts to your attention.
        </p>
        <div className={`mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm ${
          isLight
            ? 'bg-emerald-100/70 text-emerald-700 border border-emerald-200/60'
            : 'bg-emerald-900/10 text-emerald-300/80 border border-emerald-500/20'
        }`}>
          <span className="opacity-70">Click the plants below to grow them</span>
        </div>
      </div>

      {/* Accessible Screen Reader Only View */}
      <div className="sr-only" aria-live="polite">
        <h2>Garden Status:</h2>
        <ul>
          {plants.map(p => (
            <li key={p.id}>
              {p.name} — {p.engagement > 10 ? 'dominant' : p.engagement > 5 ? 'growing' : p.engagement < 2 && day > 5 ? 'declining' : 'healthy'} — {p.engagement} engagements
            </li>
          ))}
        </ul>
      </div>

      <FilterBubbleGarden />

      {/* Timeline Controls */}
      <div className={`w-full max-w-3xl mt-8 p-6 rounded-2xl border ${isLight ? 'bg-white border-gray-200' : 'bg-gray-900/50 border-gray-800'}`}>
        <h2 className={`text-sm font-bold uppercase tracking-widest mb-6 text-center ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
          Watch Your Garden Change
        </h2>

        <div className="flex items-center gap-4">
          <span className={`text-sm font-bold w-12 text-right ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>Day 1</span>
          <input
            type="range"
            min="1"
            max="30"
            value={day}
            onChange={(e) => setDay(parseInt(e.target.value))}
            className={`flex-1 h-2 rounded-lg appearance-none cursor-pointer accent-blue-500 ${isLight ? 'bg-gray-200' : 'bg-gray-800'}`}
            aria-label="Simulation Timeline"
          />
          <span className={`text-sm font-bold w-12 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>Day 30</span>
        </div>
      </div>

      {/* Action Area */}
      <div className="w-full max-w-3xl mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <button
          id="reset-btn"
          onClick={resetGarden}
          className={`flex items-center gap-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded p-2 ${isLight ? 'text-gray-500 hover:text-gray-900' : 'text-gray-500 hover:text-white'}`}
        >
          <RotateCcw className="w-4 h-4" />
          Reset Garden
        </button>

        <div className={`transition-all duration-700 ${isMonoculture ? 'opacity-100 translate-y-0' : 'opacity-50 grayscale translate-y-2'}`} style={reduceMotion ? { transition: 'none' } : undefined}>
          <button
            id="break-bubble-btn"
            onClick={breakBubble}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400 shadow-lg shadow-blue-900/20"
            aria-label="Break the bubble and redistribute attention"
          >
            <Zap className="w-5 h-5 fill-current" />
            BREAK THE BUBBLE
          </button>
        </div>
      </div>
    </main>
  );
};

export default Garden;
