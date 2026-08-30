import React from 'react';
import { useGarden } from '../../context/GardenContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { Eye, EyeOff } from 'lucide-react';

interface Props {
  isLight?: boolean;
}

const AlgorithmReveal: React.FC<Props> = ({ isLight }) => {
  const { showRoots, setShowRoots } = useGarden();
  const { readAloud } = useAccessibility();

  const handleToggle = () => {
    const newState = !showRoots;
    setShowRoots(newState);
    readAloud(newState ? "Revealed the underground algorithm." : "Hid the algorithm.");
  };

  return (
    <button
      id="reveal-btn"
      onClick={handleToggle}
      className={`px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 flex items-center gap-2 backdrop-blur-md ${
        showRoots
          ? 'bg-orange-500 hover:bg-orange-600 text-black focus-visible:ring-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.4)]'
          : isLight
            ? 'bg-white/80 hover:bg-white text-gray-800 border border-white/60 focus-visible:ring-gray-400'
            : 'bg-black/40 hover:bg-black/60 text-white border border-white/15 focus-visible:ring-gray-400'
      }`}
      aria-label={showRoots ? "Hide the algorithm root network" : "Reveal the algorithm root network"}
      aria-pressed={showRoots}
    >
      {showRoots ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      {showRoots ? "Hide the Algorithm" : "Reveal the Algorithm"}
    </button>
  );
};

export default AlgorithmReveal;
