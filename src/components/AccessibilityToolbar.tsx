import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Volume2, VolumeX, Type, Contrast, Mic, StopCircle, Sun, Moon, Eye, Minus, GripVertical, X, ChevronUp, AlignLeft, AlignJustify, Accessibility } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useVoiceCommand } from '../hooks/useVoiceCommand';
import { useLocation } from 'react-router-dom';

const AccessibilityToolbar: React.FC = () => {
  const { 
    highContrast, setHighContrast, 
    textSize, setTextSize,
    themeMode, toggleThemeMode,
    colorMode, setColorMode,
    isReading, stopReading, readAloud
  } = useAccessibility();
  
  const { isListening, toggleListening, isSupported } = useVoiceCommand();
  const location = useLocation();

  const isLight = themeMode === 'light';

  // Floating menu state
  const [isVisible, setIsVisible] = useState(() => localStorage.getItem('thrive_toolbar_visible') !== 'false');
  const [isCollapsed, setIsCollapsed] = useState(() => localStorage.getItem('thrive_toolbar_collapsed') === 'true');
  const [showLabels, setShowLabels] = useState(() => localStorage.getItem('thrive_toolbar_labels') !== 'false');
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState(() => {
    const saved = localStorage.getItem('thrive_toolbar_pos');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return { x: 24, y: 24 };
  });
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);

  useEffect(() => { localStorage.setItem('thrive_toolbar_visible', String(isVisible)); }, [isVisible]);
  useEffect(() => { localStorage.setItem('thrive_toolbar_collapsed', String(isCollapsed)); }, [isCollapsed]);
  useEffect(() => { localStorage.setItem('thrive_toolbar_labels', String(showLabels)); }, [showLabels]);
  useEffect(() => { localStorage.setItem('thrive_toolbar_pos', JSON.stringify(pos)); }, [pos]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { startX: e.clientX, startY: e.clientY, origX: pos.x, origY: pos.y };
    setIsDragging(true);
  };

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!dragRef.current || !isDragging) return;
    const dx = dragRef.current.startX - e.clientX;
    const dy = dragRef.current.startY - e.clientY;
    setPos({ x: dragRef.current.origX + dx, y: dragRef.current.origY + dy });
  }, [isDragging]);

  const onPointerUp = useCallback(() => {
    setIsDragging(false);
    dragRef.current = null;
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      return () => {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
      };
    }
  }, [isDragging, onPointerMove, onPointerUp]);

  const handleReadPage = () => {
    if (isReading) {
      stopReading();
    } else {
      const mainContent = document.querySelector('main')?.textContent || 'No content found to read.';
      readAloud(mainContent);
    }
  };

  const handleTextSize = () => {
    if (textSize === 'normal') setTextSize('large');
    else if (textSize === 'large') setTextSize('xlarge');
    else setTextSize('normal');
  };

  const handleColorBlindToggle = () => {
    if (colorMode === 'colorblind') setColorMode('dark');
    else setColorMode('colorblind');
  };

  if (location.pathname === '/dashboard') return null;

  const toolBtnBase = `p-3 rounded-xl flex items-center w-full text-left transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 ${
    isLight ? 'bg-gray-100 hover:bg-gray-200 text-gray-800' : 'bg-gray-700 hover:bg-gray-600 text-white'
  }`;

  const toggleBtn = isLight
    ? 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-xl'
    : 'bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 shadow-xl';

  // Hidden state -> show a small floating button to reopen
  if (!isVisible) {
    return (
      <>
        <div className="fixed z-50" style={{ right: 12, bottom: 12 }}>
          <button
            onClick={() => setIsVisible(true)}
            className={`p-3 rounded-full shadow-xl transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 ${toggleBtn}`}
            aria-label="Show accessibility controls"
            title="Show Accessibility Controls"
          >
            <Accessibility className="w-6 h-6" />
          </button>
        </div>
        <a href="#main-content" className="sr-only focus:not-sr-only bg-blue-600 text-white p-2 rounded whitespace-nowrap">Skip toolbar</a>
      </>
    );
  }

  return (
    <>
      <div
        className="fixed z-50 flex flex-col gap-2 touch-none select-none"
        style={{ right: pos.x, bottom: pos.y, cursor: isDragging ? 'grabbing' : 'grab' }}
        role="region"
        aria-label="Quick Accessibility Controls"
      >
        {/* Header / drag handle */}
        <div
          onPointerDown={onPointerDown}
          className={`flex items-center rounded-t-2xl px-2 py-2 gap-1 ${isLight ? 'bg-gray-100 text-gray-500 border border-gray-200' : 'bg-gray-800 text-gray-400 border border-gray-700'} ${
            isCollapsed ? 'rounded-b-2xl' : ''
          }`}
          style={{ cursor: 'grab' }}
          title="Drag to move"
        >
          {!isCollapsed && <GripVertical className="w-4 h-4" aria-hidden="true" />}
          {!isCollapsed && <span className="text-xs font-bold uppercase tracking-wider flex-1">Accessibility</span>}

          {isCollapsed && (
            <>
              <button
                onClick={() => setIsCollapsed(false)}
                className="p-1 rounded hover:bg-black/10 transition-colors"
                aria-label="Expand toolbar"
                title="Expand"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <span className="flex-1" />
              <button
                onClick={() => setIsVisible(false)}
                className="p-1 rounded hover:bg-black/10 transition-colors"
                aria-label="Hide toolbar"
                title="Hide toolbar"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}

          {!isCollapsed && (
            <>
              <button
                onClick={() => setShowLabels(!showLabels)}
                className={`p-1 rounded hover:bg-black/10 transition-colors ${showLabels ? '' : 'opacity-60'}`}
                aria-label={showLabels ? "Hide toolbar labels" : "Show toolbar labels"}
                title={showLabels ? "Hide labels" : "Show labels"}
              >
                {showLabels ? <AlignJustify className="w-4 h-4" /> : <AlignLeft className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsCollapsed(true)}
                className="p-1 rounded hover:bg-black/10 transition-colors"
                aria-label="Collapse toolbar to icon only"
                title="Collapse"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="p-1 rounded hover:bg-black/10 transition-colors"
                aria-label="Hide toolbar"
                title="Hide toolbar"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {!isCollapsed && (
          <div className={`rounded-b-2xl shadow-xl border p-2 flex flex-col gap-2 border-t-0 ${
            isLight ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
          }`}>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`${toolBtnBase} ${highContrast ? 'bg-yellow-400 text-black hover:bg-yellow-400' : ''} ${showLabels ? 'gap-3' : 'justify-center'}`}
              aria-label={highContrast ? "Disable high contrast mode" : "Enable high contrast mode"}
              aria-pressed={highContrast}
              title="Toggle High Contrast"
            >
              <Contrast className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
              {showLabels && <span>High Contrast</span>}
            </button>

            <button
              onClick={handleTextSize}
              className={`${toolBtnBase} ${showLabels ? 'gap-3' : 'justify-center'}`}
              aria-label={`Change text size. Current size: ${textSize}`}
              title={`Text Size (${textSize})`}
            >
              <Type className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
              {showLabels && <span>Text Size: {textSize.charAt(0).toUpperCase() + textSize.slice(1)}</span>}
            </button>

            <button
              onClick={toggleThemeMode}
              className={`${toolBtnBase} ${showLabels ? 'gap-3' : 'justify-center'}`}
              aria-label={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} theme`}
              title="Toggle Light/Dark Theme"
            >
              {isLight ? <Moon className="w-6 h-6 flex-shrink-0" /> : <Sun className="w-6 h-6 flex-shrink-0" />}
              {showLabels && <span>{isLight ? 'Dark Mode' : 'Light Mode'}</span>}
            </button>

            <button
              onClick={handleColorBlindToggle}
              className={colorMode === 'colorblind' 
                ? `p-3 rounded-xl flex items-center w-full text-left transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 ${showLabels ? 'gap-3' : 'justify-center'} ${isLight ? 'bg-purple-100 text-purple-800' : 'bg-purple-900 text-purple-200'}`
                : `${toolBtnBase} ${showLabels ? 'gap-3' : 'justify-center'}`
              }
              aria-label={colorMode === 'colorblind' ? "Disable color blind mode" : "Enable color blind mode"}
              aria-pressed={colorMode === 'colorblind'}
              title="Color Blind Mode"
            >
              <Eye className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
              {showLabels && <span>{colorMode === 'colorblind' ? 'Color Blind: On' : 'Color Blind Mode'}</span>}
            </button>

            <button
              onClick={handleReadPage}
              className={`${toolBtnBase} ${isReading ? (isLight ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-red-900 text-red-200 hover:bg-red-800') : ''} ${showLabels ? 'gap-3' : 'justify-center'}`}
              aria-label={isReading ? "Stop reading page" : "Read page aloud"}
              aria-pressed={isReading}
              title={isReading ? "Stop Reading" : "Read Page"}
            >
              {isReading ? <VolumeX className="w-6 h-6 flex-shrink-0" aria-hidden="true" /> : <Volume2 className="w-6 h-6 flex-shrink-0" aria-hidden="true" />}
              {showLabels && <span>{isReading ? 'Stop Reading' : 'Read Page'}</span>}
            </button>

            {isSupported && (
              <button
                onClick={toggleListening}
                className={`p-3 rounded-xl flex items-center w-full text-left transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 ${
                  isListening ? 'bg-red-600 text-white animate-pulse' : 'bg-blue-600 text-white hover:bg-blue-700'
                } ${showLabels ? 'gap-3' : 'justify-center'}`}
                aria-label={isListening ? "Stop voice recognition" : "Start voice recognition"}
                aria-pressed={isListening}
                title={isListening ? "Listening..." : "Voice Commands"}
              >
                {isListening ? <StopCircle className="w-6 h-6 flex-shrink-0" aria-hidden="true" /> : <Mic className="w-6 h-6 flex-shrink-0" aria-hidden="true" />}
                {showLabels && <span>{isListening ? 'Listening...' : 'Voice Commands'}</span>}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Collapsed state: icon-only strip */}
      {isCollapsed && (
        <div
          className="fixed z-50 flex flex-col gap-2 touch-none select-none"
          style={{ right: pos.x, bottom: pos.y + 44 }}
        >
          <div className={`rounded-2xl shadow-xl border p-1 flex flex-col gap-1 ${
            isLight ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
          }`}>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`p-2.5 rounded-xl flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 ${highContrast ? 'bg-yellow-400 text-black' : isLight ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-gray-700 text-white'}`}
              aria-label="Toggle high contrast"
              title="High Contrast"
            >
              <Contrast className="w-5 h-5" />
            </button>
            <button
              onClick={handleTextSize}
              className={`p-2.5 rounded-xl flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 ${isLight ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-gray-700 text-white'}`}
              aria-label="Change text size"
              title="Text Size"
            >
              <Type className="w-5 h-5" />
            </button>
            <button
              onClick={toggleThemeMode}
              className={`p-2.5 rounded-xl flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 ${isLight ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-gray-700 text-white'}`}
              aria-label="Toggle theme"
              title="Theme"
            >
              {isLight ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button
              onClick={handleColorBlindToggle}
              className={`p-2.5 rounded-xl flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 ${colorMode === 'colorblind' ? 'bg-purple-500 text-white' : isLight ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-gray-700 text-white'}`}
              aria-label="Toggle color blind mode"
              title="Color Blind"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={handleReadPage}
              className={`p-2.5 rounded-xl flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 ${isReading ? (isLight ? 'bg-red-100 text-red-700' : 'bg-red-900 text-red-200') : isLight ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-gray-700 text-white'}`}
              aria-label="Read page"
              title="Read Page"
            >
              {isReading ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            {isSupported && (
              <button
                onClick={toggleListening}
                className={`p-2.5 rounded-xl flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 ${isListening ? 'bg-red-600 text-white animate-pulse' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                aria-label="Voice commands"
                title="Voice Commands"
              >
                {isListening ? <StopCircle className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Floating button to fully hide the panel is in the header */}
      <a href="#main-content" className="sr-only focus:not-sr-only bg-blue-600 text-white p-2 rounded whitespace-nowrap">Skip toolbar</a>
    </>
  );
};

export default AccessibilityToolbar;
