import React from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { Contrast, Type, Wind, Palette, Mic, Volume2, Sun, Moon } from 'lucide-react';

const Accessibility: React.FC = () => {
  const { 
    highContrast, setHighContrast,
    textSize, setTextSize,
    colorMode, setColorMode,
    colorBlindType, setColorBlindType,
    themeMode, toggleThemeMode,
    reduceMotion, setReduceMotion
  } = useAccessibility();
  const isLight = themeMode === 'light';

  const toggleTextSize = () => {
    if (textSize === 'normal') setTextSize('large');
    else if (textSize === 'large') setTextSize('xlarge');
    else setTextSize('normal');
  };

  const toggleColorBlind = () => {
    if (colorMode === 'colorblind') setColorMode('dark');
    else setColorMode('colorblind');
  };

  const colorBlindTypes = [
    { value: 'deuteranopia', label: 'Deuteranopia (Red-Green)', description: 'Most common type - difficulty with green' },
    { value: 'protanopia', label: 'Protanopia (Red-Green)', description: 'Difficulty with red light' },
    { value: 'tritanopia', label: 'Tritanopia (Blue-Yellow)', description: 'Difficulty with blue and yellow' },
    { value: 'achromatopsia', label: 'Achromatopsia (Monochrome)', description: 'No color vision - full grayscale' },
  ];

  // Reusable card classes for light/dark
  const cardBase = `text-left p-8 rounded-3xl border transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
    isLight ? 'focus-visible:ring-offset-white' : 'focus-visible:ring-offset-gray-900'
  }`;
  const inactiveCard = isLight
    ? 'border-gray-200 bg-white hover:border-gray-300'
    : 'border-gray-800 bg-[#111] hover:border-gray-600';
  const badgeOff = isLight ? 'bg-gray-200 text-gray-600' : 'bg-gray-800 text-gray-300';
  const bodyText = isLight ? 'text-gray-500' : 'text-gray-400';
  const panelPos = isLight ? 'border-gray-200 bg-white' : 'border-gray-800 bg-[#111]';

  return (
    <main id="main-content" className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full" tabIndex={-1}>
      <div className="mb-12">
        <h1 className={`text-4xl font-bold mb-4 ${isLight ? 'text-gray-900' : ''}`}>Accessibility Settings</h1>
        <p className={`text-xl ${bodyText}`}>
          Customize your experience in the Filter Bubble Garden. Your preferences are saved automatically.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* High Contrast */}
        <button 
          onClick={() => setHighContrast(!highContrast)}
          className={`${cardBase} ${
            highContrast ? 'border-yellow-400 bg-black text-white' : inactiveCard
          }`}
          aria-pressed={highContrast}
        >
          <div className="flex items-center justify-between mb-6">
            <Contrast className={`w-10 h-10 ${highContrast ? 'text-yellow-400' : 'text-gray-400'}`} aria-hidden="true" />
            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${highContrast ? 'bg-yellow-400 text-black' : badgeOff}`}>
              {highContrast ? 'Enabled' : 'Disabled'}
            </div>
          </div>
          <h2 className={`text-xl font-bold mb-2 ${highContrast ? '' : isLight ? 'text-gray-900' : ''}`}>High Contrast</h2>
          <p className={highContrast ? 'text-gray-300' : bodyText}>
            Maximum contrast for low vision users. Applies globally to all pages.
          </p>
        </button>

        {/* Text Size */}
        <button 
          onClick={toggleTextSize}
          className={`${cardBase} ${
            textSize !== 'normal'
              ? isLight ? 'border-blue-300 bg-blue-50' : 'border-blue-500 bg-blue-900/20'
              : inactiveCard
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <Type className={`w-10 h-10 ${textSize !== 'normal' ? (isLight ? 'text-blue-600' : 'text-blue-400') : 'text-gray-400'}`} aria-hidden="true" />
            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${textSize !== 'normal' ? (isLight ? 'bg-blue-200 text-blue-800' : 'bg-blue-500 text-white') : badgeOff}`}>
              {textSize}
            </div>
          </div>
          <h2 className={`text-xl font-bold mb-2 ${isLight ? 'text-gray-900' : ''}`}>Text Size</h2>
          <p className={bodyText}>
            Tap repeatedly to cycle through text sizes. Applies to all pages.
          </p>
        </button>

        {/* Theme Toggle */}
        <button 
          onClick={toggleThemeMode}
          className={`${cardBase} ${
            themeMode === 'light' ? 'border-gray-300 bg-gray-100' : 'border-gray-800 bg-[#111] hover:border-gray-600'
          }`}
          aria-pressed={themeMode === 'light'}
        >
          <div className="flex items-center justify-between mb-6">
            {themeMode === 'light' ? (
              <Sun className="w-10 h-10 text-yellow-500" aria-hidden="true" />
            ) : (
              <Moon className="w-10 h-10 text-gray-400" aria-hidden="true" />
            )}
            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${themeMode === 'light' ? 'bg-yellow-400 text-black' : badgeOff}`}>
              {themeMode}
            </div>
          </div>
          <h2 className={`text-xl font-bold mb-2 ${isLight ? 'text-gray-900' : ''}`}>Theme Mode</h2>
          <p className={bodyText}>
            Toggle between light and dark themes across the entire site.
          </p>
        </button>

        {/* Reduce Motion */}
        <button 
          onClick={() => setReduceMotion(!reduceMotion)}
          className={`${cardBase} ${
            reduceMotion
              ? isLight ? 'border-emerald-300 bg-emerald-50' : 'border-emerald-500 bg-emerald-900/20'
              : inactiveCard
          }`}
          aria-pressed={reduceMotion}
        >
          <div className="flex items-center justify-between mb-6">
            <Wind className={`w-10 h-10 ${reduceMotion ? (isLight ? 'text-emerald-600' : 'text-emerald-400') : 'text-gray-400'}`} aria-hidden="true" />
            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${reduceMotion ? (isLight ? 'bg-emerald-200 text-emerald-800' : 'bg-emerald-500 text-black') : badgeOff}`}>
              {reduceMotion ? 'Enabled' : 'Disabled'}
            </div>
          </div>
          <h2 className={`text-xl font-bold mb-2 ${isLight ? 'text-gray-900' : ''}`}>Reduce Motion</h2>
          <p className={bodyText}>
            Disables all animations and transitions across the site, including gardens.
          </p>
        </button>
      </div>

      {/* Color Blind Section - full width */}
      <div className={`mt-6 p-8 rounded-3xl border transition-all ${
        colorMode === 'colorblind'
          ? isLight ? 'border-purple-300 bg-purple-50' : 'border-purple-500 bg-purple-900/20'
          : panelPos
      }`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Palette className={`w-10 h-10 ${colorMode === 'colorblind' ? (isLight ? 'text-purple-600' : 'text-purple-400') : 'text-gray-400'}`} aria-hidden="true" />
            <div>
              <h2 className={`text-xl font-bold ${isLight ? 'text-gray-900' : ''}`}>Color Blind Friendly</h2>
              <p className={`${bodyText} text-sm`}>Adjusts colors to be more distinguishable for different types of color vision deficiency.</p>
            </div>
          </div>
          <button
            onClick={toggleColorBlind}
            className={`px-4 py-2 rounded-full text-sm font-bold uppercase focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 ${
              colorMode === 'colorblind'
                ? 'bg-purple-500 text-white'
                : isLight ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            aria-pressed={colorMode === 'colorblind'}
          >
            {colorMode === 'colorblind' ? 'Enabled' : 'Enable'}
          </button>
        </div>

        {colorMode === 'colorblind' && (
          <div className="mt-4">
            <label htmlFor="colorblind-type" className={`block text-sm font-bold mb-2 ${isLight ? 'text-gray-700' : 'text-gray-400'}`}>
              Select your color vision type
            </label>
            <select
              id="colorblind-type"
              value={colorBlindType}
              onChange={(e) => setColorBlindType(e.target.value as any)}
              className={`w-full p-3 rounded-xl border focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 ${
                isLight
                  ? 'bg-white border-gray-300 text-gray-900'
                  : 'bg-gray-900 border-gray-700 text-gray-200'
              }`}
            >
              {colorBlindTypes.map(t => (
                <option key={t.value} value={t.value}>
                  {t.label} — {t.description}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className={`mt-12 ${panelPos} rounded-3xl p-8`}>
        <h2 className={`text-2xl font-bold mb-6 border-b pb-4 ${isLight ? 'text-gray-900 border-gray-200' : 'border-gray-800'}`}>Other Features</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Mic className={`w-6 h-6 ${isLight ? 'text-gray-500' : 'text-gray-400'}`} />
              <h3 className={`text-lg font-bold ${isLight ? 'text-gray-900' : ''}`}>Voice Commands</h3>
            </div>
            <p className={`${bodyText} text-sm`}>
              Use the microphone icon in the floating toolbar to control the site via voice. Available commands:
            </p>
            <ul className={`mt-3 ${bodyText} text-sm space-y-1 list-disc pl-5`}>
              <li>"Go home" / "Home page"</li>
              <li>"Enter the garden" / "Open garden"</li>
              <li>"Reveal the algorithm" / "Show roots"</li>
              <li>"Hide roots" / "Hide algorithm"</li>
              <li>"Break the bubble"</li>
              <li>"Reset garden"</li>
              <li>"Grow Politics" / "Grow Science" (any topic)</li>
              <li>"Open accessibility"</li>
              <li>"Increase text" / "Larger text"</li>
              <li>"Enable high contrast" / "Disable high contrast"</li>
              <li>"Read this page"</li>
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Volume2 className={`w-6 h-6 ${isLight ? 'text-gray-500' : 'text-gray-400'}`} />
              <h3 className={`text-lg font-bold ${isLight ? 'text-gray-900' : ''}`}>Read Aloud</h3>
            </div>
            <p className={`${bodyText} text-sm`}>
              Use the speaker icon in the floating toolbar to have the current page's content read aloud.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Accessibility;
