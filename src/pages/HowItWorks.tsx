import React from 'react';
import { MousePointerClick, Eye, RefreshCw, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAccessibility } from '../context/AccessibilityContext';

const STEPS = [
  {
    icon: <MousePointerClick className="w-10 h-10" />,
    title: '1. You Engage',
    text: 'You click, watch, or hover over a specific piece of content. The system registers this as "attention".',
    circle: 'bg-blue-900/30 border-blue-500/30 text-blue-400',
    lightCircle: 'bg-blue-100 border-blue-300 text-blue-600',
  },
  {
    icon: <Eye className="w-10 h-10" />,
    title: '2. The Algorithm Observes',
    text: 'The underlying root network (recommendation system) analyzes the tags and categories of that content.',
    circle: 'bg-orange-900/30 border-orange-500/30 text-orange-400',
    lightCircle: 'bg-orange-100 border-orange-300 text-orange-600',
  },
  {
    icon: <Layers className="w-10 h-10" />,
    title: '3. Content is Prioritized',
    text: 'The system alters your feed, quietly removing diverse topics to make room for more of what you just engaged with.',
    circle: 'bg-emerald-900/30 border-emerald-500/30 text-emerald-400',
    lightCircle: 'bg-emerald-100 border-emerald-300 text-emerald-600',
  },
  {
    icon: <RefreshCw className="w-10 h-10" />,
    title: '4. The Cycle Reinforces',
    text: 'You see more of it, you engage more, and the garden becomes a monoculture. The filter bubble is complete.',
    circle: 'bg-purple-900/30 border-purple-500/30 text-purple-400',
    lightCircle: 'bg-purple-100 border-purple-300 text-purple-600',
  },
];

const HowItWorks: React.FC = () => {
  const { themeMode } = useAccessibility();
  const isLight = themeMode === 'light';

  return (
    <main id="main-content" className="flex-1 w-full max-w-5xl mx-auto px-4 py-16" tabIndex={-1}>
      <div className="text-center mb-20">
        <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${isLight ? 'text-gray-900' : ''}`}>How the Bubble Grows</h1>
        <p className={`text-xl max-w-2xl mx-auto ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
          The algorithm is invisible, but its feedback loop shapes everything you see online.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-24 relative">
        {/* Connecting line for desktop */}
        <div className={`hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-1 z-0 ${isLight ? 'bg-gray-200' : 'bg-gray-800'}`}></div>

        {STEPS.map((step) => (
          <div
            key={step.title}
            className={`p-8 rounded-3xl relative z-10 text-center flex flex-col items-center border transition-colors ${
              isLight ? 'bg-white border-gray-200' : 'bg-[#111] border-gray-800'
            }`}
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 border ${isLight ? step.lightCircle : step.circle}`}>
              {step.icon}
            </div>
            <h2 className={`text-2xl font-bold mb-4 ${isLight ? 'text-gray-900' : ''}`}>{step.title}</h2>
            <p className={isLight ? 'text-gray-600' : 'text-gray-400'}>{step.text}</p>
          </div>
        ))}
      </div>

      <div className={`p-10 rounded-3xl mb-16 border transition-colors ${
        isLight ? 'bg-white border-gray-200' : 'bg-gray-900 border-gray-700'
      }`}>
        <h2 className={`text-3xl font-bold mb-6 ${isLight ? 'text-gray-900' : 'text-white'}`}>Why it matters</h2>
        <ul className={`space-y-4 text-lg ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
          <li className="flex items-start gap-3">
            <span className="text-emerald-500 font-bold">•</span>
            Reduced exposure to different viewpoints and unexpected discoveries.
          </li>
          <li className="flex items-start gap-3">
            <span className="text-emerald-500 font-bold">•</span>
            Repetitive content environments that feel stale.
          </li>
          <li className="flex items-start gap-3">
            <span className="text-emerald-500 font-bold">•</span>
            Extreme reinforcement of existing interests or biases.
          </li>
          <li className="flex items-start gap-3">
            <span className="text-emerald-500 font-bold">•</span>
            An increasingly fragmented digital reality where users see entirely different versions of the world.
          </li>
        </ul>
      </div>

      <div className="text-center">
        <Link
          to="/garden"
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-black bg-emerald-500 hover:bg-emerald-400 transition-colors"
        >
          EXPERIENCE THE GARDEN
        </Link>
      </div>
    </main>
  );
};

export default HowItWorks;
