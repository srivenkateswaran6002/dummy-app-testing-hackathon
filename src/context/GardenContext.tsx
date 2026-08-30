import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { useAccessibility } from './AccessibilityContext';

export interface PlantData {
  id: string;
  name: string;
  engagement: number;
  color: string;
}

const INITIAL_PLANTS: PlantData[] = [
  { id: 'news', name: 'News', engagement: 1, color: '#3b82f6' }, // blue-500
  { id: 'comedy', name: 'Comedy', engagement: 1, color: '#f59e0b' }, // amber-500
  { id: 'politics', name: 'Politics', engagement: 1, color: '#ef4444' }, // red-500
  { id: 'science', name: 'Science', engagement: 1, color: '#10b981' }, // emerald-500
  { id: 'art', name: 'Art', engagement: 1, color: '#8b5cf6' }, // violet-500
  { id: 'hobbies', name: 'Hobbies', engagement: 1, color: '#ec4899' }, // pink-500
];

interface GardenState {
  plants: PlantData[];
  showRoots: boolean;
  diversityScore: number;
  day: number;
  totalEngagement: number;
}

interface GardenContextType extends GardenState {
  interact: (id: string) => void;
  setShowRoots: (val: boolean) => void;
  breakBubble: () => void;
  resetGarden: () => void;
  setDay: (day: number) => void; // for timeline
}

const GardenContext = createContext<GardenContextType | undefined>(undefined);

export const GardenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [plants, setPlants] = useState<PlantData[]>(INITIAL_PLANTS);
  const [showRoots, setShowRoots] = useState(false);
  const [day, setDay] = useState(1);
  const { readAloud, stopReading } = useAccessibility();

  const totalEngagement = plants.reduce((sum, p) => sum + p.engagement, 0);

  // Calculate Diversity Score based on standard deviation or normalized entropy
  // A perfectly equal garden has entropy = 1 (100%), a single plant has entropy = 0.
  const calculateDiversity = useCallback((currentPlants: PlantData[]) => {
    const total = currentPlants.reduce((sum, p) => sum + p.engagement, 0);
    if (total === 0) return 100;
    
    let entropy = 0;
    for (const p of currentPlants) {
      const prob = p.engagement / total;
      if (prob > 0) {
        entropy -= prob * Math.log2(prob);
      }
    }
    
    const maxEntropy = Math.log2(currentPlants.length);
    const score = Math.max(0, Math.min(100, Math.round((entropy / maxEntropy) * 100)));
    return score;
  }, []);

  const diversityScore = calculateDiversity(plants);

  useEffect(() => {
    // Determine the simulated day based on total engagement (roughly 1 engagement = half a day)
    const simulatedDay = Math.max(1, Math.min(30, 1 + Math.floor((totalEngagement - 6) / 2)));
    setDay(simulatedDay);
  }, [totalEngagement]);

  const interact = (id: string) => {
    // Stop any ongoing read-aloud when interacting with a plant
    stopReading();
    setPlants(prev => {
      const newPlants = prev.map(p => {
        if (p.id === id) {
          return { ...p, engagement: p.engagement + 1 };
        }
        // Neglected plants slowly decay conceptually (their ratio decreases as total increases)
        return p;
      });
      return newPlants;
    });
  };

  const breakBubble = () => {
    setPlants(prev => {
      // Find the least engaged plants and boost them, while reducing the most engaged
      const sorted = [...prev].sort((a, b) => b.engagement - a.engagement);
      const topEngaged = sorted[0].engagement;
      
      return prev.map(p => {
        if (p.engagement < topEngaged) {
          // Boost neglected plants
          return { ...p, engagement: Math.max(1, p.engagement + Math.floor(topEngaged / 2)) };
        }
        // Slightly reduce dominant plant
        return { ...p, engagement: Math.max(1, Math.floor(p.engagement * 0.7)) };
      });
    });
    setShowRoots(false);
    readAloud("Bubble broken. Attention redistributed to neglected topics.");
  };

  const resetGarden = () => {
    setPlants(INITIAL_PLANTS);
    setShowRoots(false);
    setDay(1);
    readAloud("Garden reset to Day 1.");
  };

  const manualSetDay = (targetDay: number) => {
    // This allows the timeline slider to simulate future/past states
    setDay(targetDay);
    if (targetDay === 1) {
      resetGarden();
    } else {
      // Simulate skewed engagement for the demo
      setPlants(prev => {
        const sorted = [...prev].sort((a, b) => b.engagement - a.engagement);
        const topId = sorted[0].id;
        return prev.map(p => {
          if (p.id === topId) {
            return { ...p, engagement: targetDay * 2 };
          }
          return { ...p, engagement: 1 };
        });
      });
    }
  };

  return (
    <GardenContext.Provider value={{
      plants,
      showRoots,
      diversityScore,
      day,
      totalEngagement,
      interact,
      setShowRoots,
      breakBubble,
      resetGarden,
      setDay: manualSetDay
    }}>
      {children}
    </GardenContext.Provider>
  );
};

export const useGarden = () => {
  const context = useContext(GardenContext);
  if (!context) {
    throw new Error('useGarden must be used within GardenProvider');
  }
  return context;
};
