import React from 'react';
import type { PlantData } from '../../context/GardenContext';

interface Props {
  plants: PlantData[];
  maxEngagement: number;
  isLight: boolean;
  useColorblind?: boolean;
  colorBlindType?: string;
}

const RootNetwork: React.FC<Props> = ({ plants, maxEngagement, isLight, useColorblind, colorBlindType }) => {
  const coreColor = useColorblind && colorBlindType === 'tritanopia' ? '#fbbf24' : '#f59e0b';

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      {/* Dark underground backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: isLight
            ? 'linear-gradient(180deg, rgba(180,150,110,0.5) 0%, rgba(110,80,50,0.85) 100%)'
            : 'linear-gradient(180deg, rgba(16,20,26,0.8) 0%, rgba(70,40,20,0.95) 100%)'
        }}
      />

      {/* Algorithm core glow */}
      <div
        className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2 w-[130%] h-40 rounded-full blur-3xl"
        style={{ background: `${coreColor}55` }}
      />

      {/* Data lines */}
      <div className="absolute inset-0 flex items-start justify-around px-8 pt-6">
        {plants.map((plant, index) => {
          const thickness = Math.max(1, (plant.engagement / maxEngagement) * 7);
          const opacity = Math.max(0.12, plant.engagement / maxEngagement);
          const isDominant = plant.engagement === maxEngagement && maxEngagement > 5;

          const xOffset = (index % 2 === 0 ? 1 : -1) * (18 + (index * 9));

          return (
            <div key={`root-${plant.id}`} className="relative h-full w-24 flex justify-center">
              <svg className="absolute top-0 w-48 h-full overflow-visible transition-all duration-700" style={{ opacity }}>
                <defs>
                  <filter id={`glow-${plant.id}`} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation={isDominant ? 4 : 2} result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Main algorithmic root */}
                <path
                  d={`M30 0 Q${30 + xOffset} 45, 30 90 T${30 - xOffset} 180`}
                  fill="none"
                  stroke={isDominant ? '#fbbf24' : coreColor}
                  strokeWidth={thickness}
                  strokeLinecap="round"
                  filter={`url(#glow-${plant.id})`}
                  className={isDominant ? 'animate-pulse' : ''}
                  style={{
                    strokeDasharray: '5 4',
                    animation: isDominant ? 'dash 22s linear infinite' : 'none'
                  }}
                />

                {/* Sub roots branching */}
                {plant.engagement > 3 && (
                  <>
                    <path
                      d={`M30 55 Q${30 + xOffset * 1.6} 95, ${30 + xOffset * 0.6} 150`}
                      fill="none"
                      stroke={isDominant ? '#fbbf24' : '#b45309'}
                      strokeWidth={thickness * 0.5}
                      strokeLinecap="round"
                    />
                    <path
                      d={`M30 30 Q${30 - xOffset * 1.3} 70, ${30 - xOffset * 0.4} 120`}
                      fill="none"
                      stroke={isDominant ? '#fbbf24' : '#b45309'}
                      strokeWidth={thickness * 0.4}
                      strokeLinecap="round"
                    />
                  </>
                )}

                {/* Connection node */}
                <circle cx="30" cy="90" r={isDominant ? 4 : 2.5} fill={coreColor} />
              </svg>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -900; }
        }
      `}</style>
    </div>
  );
};

export default RootNetwork;
