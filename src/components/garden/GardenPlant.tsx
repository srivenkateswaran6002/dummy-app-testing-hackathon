import React, { useState, useCallback } from 'react';
import { useGarden } from '../../context/GardenContext';
import type { PlantData } from '../../context/GardenContext';

interface Props {
  plant: PlantData;
  maxEngagement: number;
  isMonoculture: boolean;
  isLight: boolean;
}

// Floral emoji / accent for each plant type
const BLOOM_STYLES: Record<string, { emoji: string }> = {
  news: { emoji: '🗞️' },
  comedy: { emoji: '🎭' },
  politics: { emoji: '⚖️' },
  science: { emoji: '🔬' },
  art: { emoji: '🎨' },
  hobbies: { emoji: '🎲' },
};

// Pre-generated leaf path variations
const LEAF_VARIANTS = [
  "M50 150 Q15 125 8 140 Q28 162 50 150",
  "M50 150 Q85 125 92 140 Q72 162 50 150",
  "M50 100 Q15 75 8 90 Q28 112 50 100",
  "M50 100 Q85 75 92 90 Q72 112 50 100",
  "M50 60 Q15 35 8 50 Q28 72 50 60",
  "M50 60 Q85 35 92 50 Q72 72 50 60",
];

const GardenPlant: React.FC<Props> = ({ plant, maxEngagement, isMonoculture, isLight }) => {
  const { interact } = useGarden();
  const [pulse, setPulse] = useState(false);

  const bloom = BLOOM_STYLES[plant.id]?.emoji || '🌱';

  const handleClick = useCallback(() => {
    interact(plant.id);
    setPulse(true);
    window.setTimeout(() => { setPulse(false); }, 500);
  }, [interact, plant.id]);

  // Growth scaling
  const scale = Math.max(0.55, Math.min(2.6, 0.6 + plant.engagement * 0.12));
  const dead = isMonoculture && plant.engagement < maxEngagement * 0.4;
  const flourish = plant.engagement > 3;

  const stemColor = dead ? '#6b6b6b' : plant.color;
  const leafColor = dead ? '#5a5a5a' : isLight ? plant.color : plant.color;

  return (
    <button
      id={`plant-${plant.id}`}
      onClick={handleClick}
      className="relative group flex flex-col items-center justify-end w-20 sm:w-24 outline-none transition-transform hover:scale-105 active:scale-95 focus-visible:ring-4 focus-visible:ring-blue-500 rounded-xl cursor-pointer"
      style={{ zIndex: Math.floor(plant.engagement) }}
      aria-label={`Engage with ${plant.name}. Click to grow this interest. Current engagement: ${plant.engagement}`}
    >
      {/* Plant graphic */}
      <div
        className="transition-all duration-700 ease-out origin-bottom"
        style={{
          transform: `scale(${scale})`,
          opacity: dead ? 0.35 : 1,
          filter: dead ? 'grayscale(80%) brightness(60%)' : 'none'
        }}
      >
        <svg viewBox="0 0 100 220" width="80" height="176" className="overflow-visible" style={{ filter: `drop-shadow(0 6px 8px rgba(0,0,0,${isLight ? 0.12 : 0.4}))` }}>
          {/* Soil mound at base */}
          <ellipse cx="50" cy="216" rx="34" ry="8" fill={isLight ? '#6b4f36' : '#3a2a1a'} opacity="0.8" />

          {/* Main stem (curved) */}
          <path
            d="M50 218 C 48 160, 46 100, 50 40"
            stroke={stemColor}
            strokeWidth={3 + Math.min(plant.engagement, 8)}
            fill="none"
            strokeLinecap="round"
            opacity={dead ? 0.5 : 0.95}
          />
          {/* Stem highlight */}
          <path
            d="M50 218 C 48 160, 46 100, 50 40"
            stroke="#ffffff"
            strokeWidth={0.8}
            fill="none"
            strokeLinecap="round"
            opacity={dead ? 0 : 0.35}
          />

          {/* Leaves - reveal progressively with engagement */}
          {plant.engagement >= 1 && (
            <path d={LEAF_VARIANTS[0]} fill={leafColor} opacity={0.85} />
          )}
          {plant.engagement >= 2 && (
            <path d={LEAF_VARIANTS[1]} fill={leafColor} opacity={0.85} />
          )}
          {plant.engagement >= 4 && (
            <path d={LEAF_VARIANTS[2]} fill={leafColor} opacity={0.85} />
          )}
          {plant.engagement >= 6 && (
            <path d={LEAF_VARIANTS[3]} fill={leafColor} opacity={0.85} />
          )}
          {plant.engagement >= 8 && (
            <path d={LEAF_VARIANTS[4]} fill={leafColor} opacity={0.85} />
          )}
          {plant.engagement >= 10 && (
            <path d={LEAF_VARIANTS[5]} fill={leafColor} opacity={0.85} />
          )}

          {/* Flower bloom - scales with engagement */}
          <g transform={`translate(50 ${20 - plant.engagement * 1.2})`}>
            {/* Petals */}
            {flourish && (
              <>
                <ellipse cx="0" cy="-7" rx="7" ry="11" fill={plant.color} opacity="0.75" />
                <ellipse cx="7" cy="0" rx="7" ry="11" fill={plant.color} opacity="0.75" />
                <ellipse cx="-7" cy="0" rx="7" ry="11" fill={plant.color} opacity="0.75" />
                <ellipse cx="0" cy="7" rx="7" ry="11" fill={plant.color} opacity="0.75" />
              </>
            )}
            {/* Core */}
            <circle r={dead ? 6 : 7 + Math.min(plant.engagement, 6)} fill={dead ? '#7a7a7a' : '#fff7cc'} />
            <circle r={dead ? 3.5 : 4 + Math.min(plant.engagement, 4) * 0.5} fill={plant.color} />
          </g>

          {/* Floating topic emoji when grown */}
          {plant.engagement >= 8 && (
            <text x="50" y={30 - plant.engagement} textAnchor="middle" fontSize="16" className="select-none">
              {bloom}
            </text>
          )}
        </svg>
      </div>

      {/* Name label */}
      <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-center w-full pointer-events-none">
        <span
          className={`text-xs font-bold uppercase tracking-wider block ${isLight ? 'text-gray-700' : 'text-gray-300'}`}
          style={dead ? undefined : { color: isLight ? plant.color : undefined }}
        >
          {plant.name}
        </span>
        <span className={`text-[10px] font-mono ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
          {plant.engagement}
        </span>
      </div>

      {/* Click-to-grow tooltip on hover */}
      <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 ${
        isLight ? 'bg-gray-800 text-white' : 'bg-emerald-500 text-black'
      }`}>
        Click to grow
      </div>

      {/* Pulse ring on click */}
      {pulse && (
        <div
          className="absolute inset-0 pointer-events-none rounded-full animate-ping"
          style={{ backgroundColor: plant.color, opacity: 0.25 }}
        />
      )}
    </button>
  );
};

export default GardenPlant;
