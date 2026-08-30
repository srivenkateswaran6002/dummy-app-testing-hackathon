import React from 'react';
import { useGarden } from '../../context/GardenContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import GardenPlant from './GardenPlant';
import RootNetwork from './RootNetwork';
import AlgorithmReveal from './AlgorithmReveal';
import { MousePointerClick } from 'lucide-react';

const FilterBubbleGarden: React.FC = () => {
  const { plants, showRoots, diversityScore, day } = useGarden();
  const { themeMode, reduceMotion, colorMode, colorBlindType } = useAccessibility();

  const isLight = themeMode === 'light';
  const useColorblind = colorMode === 'colorblind';

  const maxEngagement = Math.max(...plants.map(p => p.engagement));

  let gardenStateMsg = "";
  if (diversityScore >= 80) gardenStateMsg = "Your garden is thriving.";
  else if (diversityScore >= 60) gardenStateMsg = "Some plants are receiving more attention.";
  else if (diversityScore >= 40) gardenStateMsg = "Your garden is becoming less diverse.";
  else if (diversityScore >= 20) gardenStateMsg = "The algorithm is narrowing your garden.";
  else gardenStateMsg = "You've entered a filter bubble.";

  const isMonoculture = diversityScore < 20;

  return (
    <div
      className={`relative w-full h-[80vh] min-h-[620px] flex flex-col overflow-hidden rounded-3xl border shadow-2xl ${
        isLight ? 'border-gray-300 shadow-gray-200/60' : 'border-gray-800'
      }`}
      style={{
        background: isLight
          ? 'linear-gradient(180deg, #e8f4ff 0%, #fff6e5 55%, #c9d6b8 100%)'
          : 'linear-gradient(180deg, #0a1420 0%, #132a2a 45%, #2a2a1a 100%)'
      }}
    >
      {/* Sky ambience */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          background: isLight
            ? 'radial-gradient(circle at 70% 20%, #fff3c4 0%, transparent 35%)'
            : 'radial-gradient(circle at 70% 20%, #fde68a22 0%, transparent 40%)'
        }}
      />

      {/* Sun / moon */}
      <div
        className={`absolute pointer-events-none rounded-full ${
          isLight ? 'bg-gradient-to-br from-yellow-200 to-orange-300' : 'bg-gradient-to-br from-gray-200 to-gray-400'
        }`}
        style={{
          width: 64, height: 64,
          top: 36, right: 40,
          boxShadow: isLight ? '0 0 60px 20px rgba(253,224,71,0.4)' : '0 0 40px 10px rgba(255,255,255,0.15)'
        }}
      />

      {/* HUD overlay */}
      <div className="absolute top-5 left-5 z-20 hidden md:block">
        <div className={`rounded-2xl p-4 border backdrop-blur-md ${
          isLight ? 'bg-white/70 border-gray-200' : 'bg-black/30 border-gray-700/60'
        }`}>
          <GardenPanel />
        </div>
      </div>

      <div className={`absolute top-5 right-5 z-20 text-right ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
        <div className={`text-sm uppercase tracking-widest font-bold mb-1 ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
          Day {day}
        </div>
        <div className="text-xl font-bold max-w-xs">{gardenStateMsg}</div>
        {isMonoculture && (
          <div className={`mt-3 p-4 rounded-xl backdrop-blur-sm border ${
            isLight ? 'bg-red-100/80 border-red-300 text-red-800' : 'bg-red-950/60 border-red-900/60 text-red-200'
          }`}>
            <h3 className="font-bold mb-1 uppercase tracking-wider text-sm text-red-500">Filter Bubble Active</h3>
            <p className="text-sm">One dominant topic is choking out everything else.</p>
          </div>
        )}
      </div>

      {/* Above ground: garden */}
      <div className={`relative flex-1 flex items-end pb-10 px-6 transition-opacity duration-700 ${showRoots ? 'opacity-30' : 'opacity-100'}`}>
        {/* Rolling hills background */}
        <div
          className="absolute bottom-16 left-0 right-0 h-[45%] pointer-events-none opacity-60"
          style={{
            background: isLight
              ? 'radial-gradient(120% 120% at 20% 20%, #cde8c0 0%, #b5dcae 50%, #9cc99a 100%)'
              : 'radial-gradient(120% 120% at 20% 20%, #16331f 0%, #13301d 50%, #0f2818 100%)'
          }}
        />

        {/* Grass floor */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 z-10"
          style={{
            background: isLight
              ? 'linear-gradient(180deg, #86b56b 0%, #5f9a4e 100%)'
              : 'linear-gradient(180deg, #274d26 0%, #1a3a20 100%)'
          }}
        />
        {/* Soil band with texture */}
        <div
          className="absolute bottom-0 left-0 right-0 h-8 z-10"
          style={{
            background: isLight
              ? 'linear-gradient(180deg, #7a5c40 0%, #6b4f36 100%)'
              : 'linear-gradient(180deg, #3a2a1a 0%, #2e2016 100%)'
          }}
        />

        <div className="relative z-10 flex w-full items-end justify-around">
          {plants.map(plant => (
            <GardenPlant
              key={plant.id}
              plant={plant}
              maxEngagement={maxEngagement}
              isMonoculture={isMonoculture && plant.engagement < maxEngagement * 0.5}
              isLight={isLight}
            />
          ))}
        </div>
      </div>

      {/* Below ground: roots / algorithm */}
      <div className={`absolute bottom-0 left-0 right-0 h-1/2 transition-all duration-1000 origin-bottom ${
        showRoots ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 pointer-events-none'
      }`}>
        <RootNetwork plants={plants} maxEngagement={maxEngagement} isLight={isLight} useColorblind={useColorblind} colorBlindType={colorBlindType} />
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        <AlgorithmReveal isLight={isLight} />
      </div>

      {/* Subtle click hint that fades away naturally */}
      {!reduceMotion && !showRoots && (
        <div className="absolute top-[38%] left-0 right-0 z-20 flex justify-center pointer-events-none">
          <div className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium backdrop-blur-sm border transition-opacity ${
            isLight
              ? 'bg-white/40 border-white/50 text-gray-600'
              : 'bg-black/30 border-white/10 text-gray-200'
          }`}>
            <MousePointerClick className="w-4 h-4 opacity-60" aria-hidden="true" />
            <span className="opacity-80">Click a plant to grow it</span>
          </div>
        </div>
      )}
    </div>
  );
};

const GardenPanel: React.FC = () => {
  const { diversityScore, plants } = useGarden();
  const maxEngagement = Math.max(...plants.map(p => p.engagement));

  let statusColor = 'text-emerald-400';
  if (diversityScore < 40) statusColor = 'text-yellow-400';
  if (diversityScore < 20) statusColor = 'text-red-400';

  return (
    <>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm uppercase tracking-widest text-gray-500 font-bold">Diversity</span>
      </div>
      <div className="text-3xl font-bold mb-4" style={{ color: statusColor.includes('emerald') ? '#34d399' : statusColor.includes('yellow') ? '#fbbf24' : '#f87171' }}>
        {diversityScore}%
      </div>
      <div className="space-y-2 min-w-[200px]">
        {plants.map(plant => (
          <div key={plant.id} className="flex items-center gap-2">
            <span className="text-xs text-gray-400 w-16">{plant.name}</span>
            <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500 ease-out rounded-full"
                style={{
                  width: `${(plant.engagement / maxEngagement) * 100}%`,
                  backgroundColor: plant.color
                }}
              />
            </div>
            <span className="text-xs text-gray-400 w-4 text-right">{plant.engagement}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default FilterBubbleGarden;
