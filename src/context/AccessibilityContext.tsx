import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type TextSize = 'normal' | 'large' | 'xlarge';
type ColorMode = 'light' | 'dark' | 'colorblind';
type ColorBlindType = 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';
type ThemeMode = 'light' | 'dark';

interface AccessibilityState {
  highContrast: boolean;
  textSize: TextSize;
  colorMode: ColorMode;
  colorBlindType: ColorBlindType;
  themeMode: ThemeMode;
  reduceMotion: boolean;
  isReading: boolean;
}

interface AccessibilityContextType extends AccessibilityState {
  setHighContrast: (val: boolean) => void;
  setTextSize: (val: TextSize) => void;
  setColorMode: (val: ColorMode) => void;
  setColorBlindType: (val: ColorBlindType) => void;
  setThemeMode: (val: ThemeMode) => void;
  toggleThemeMode: () => void;
  setReduceMotion: (val: boolean) => void;
  readAloud: (text: string) => void;
  stopReading: () => void;
  accessibilityScore: number;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('thrive_highContrast') === 'true';
  });
  
  const [textSize, setTextSize] = useState<TextSize>(() => {
    return (localStorage.getItem('thrive_textSize') as TextSize) || 'normal';
  });
  
  const [colorMode, setColorMode] = useState<ColorMode>(() => {
    return (localStorage.getItem('thrive_colorMode') as ColorMode) || 'light';
  });

  const [colorBlindType, setColorBlindType] = useState<ColorBlindType>(() => {
    return (localStorage.getItem('thrive_colorBlindType') as ColorBlindType) || 'deuteranopia';
  });

  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    return (localStorage.getItem('thrive_themeMode') as ThemeMode) || 'dark';
  });

  const [reduceMotion, setReduceMotion] = useState<boolean>(() => {
    return localStorage.getItem('thrive_reduceMotion') === 'true';
  });

  const [isReading, setIsReading] = useState(false);

  useEffect(() => {
    localStorage.setItem('thrive_highContrast', String(highContrast));
    localStorage.setItem('thrive_textSize', textSize);
    localStorage.setItem('thrive_colorMode', colorMode);
    localStorage.setItem('thrive_colorBlindType', colorBlindType);
    localStorage.setItem('thrive_themeMode', themeMode);
    localStorage.setItem('thrive_reduceMotion', String(reduceMotion));

    // Update body classes
    document.body.classList.remove(
      'high-contrast', 
      'dark-mode', 
      'light-mode', 
      'text-large', 
      'text-xlarge', 
      'reduce-motion', 
      'colorblind-mode',
      'colorblind-protanopia',
      'colorblind-deuteranopia',
      'colorblind-tritanopia',
      'colorblind-achromatopsia'
    );
    
    if (highContrast) document.body.classList.add('high-contrast');
    if (themeMode === 'dark') document.body.classList.add('dark-mode');
    if (themeMode === 'light') document.body.classList.add('light-mode');
    if (colorMode === 'colorblind') {
      document.body.classList.add('colorblind-mode');
      document.body.classList.add(`colorblind-${colorBlindType}`);
    }
    
    if (textSize === 'large') document.body.classList.add('text-large');
    if (textSize === 'xlarge') document.body.classList.add('text-xlarge');
    
    if (reduceMotion) document.body.classList.add('reduce-motion');
  }, [highContrast, textSize, colorMode, colorBlindType, themeMode, reduceMotion]);

  const readAloud = (text: string) => {
    if ('speechSynthesis' in window) {
      // Always cancel any ongoing speech before starting a new one
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsReading(false);
      utterance.onerror = () => setIsReading(false);
      setIsReading(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopReading = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Force cancel even if a queued utterance is pending
      try {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
      setIsReading(false);
    }
  };

  const toggleThemeMode = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  const calculateScore = () => {
    let score = 50; // base score
    if (highContrast) score += 10;
    if (textSize !== 'normal') score += 10;
    if (reduceMotion) score += 10;
    if (colorMode === 'colorblind') score += 10;
    // adding a base to always have a decent score since site is accessible by default
    return Math.min(score + 20, 100); 
  };

  return (
    <AccessibilityContext.Provider value={{
      highContrast, setHighContrast,
      textSize, setTextSize,
      colorMode, setColorMode,
      colorBlindType, setColorBlindType,
      themeMode, setThemeMode, toggleThemeMode,
      reduceMotion, setReduceMotion,
      isReading, readAloud, stopReading,
      accessibilityScore: calculateScore()
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};
