import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccessibility } from '../context/AccessibilityContext';

// Add TypeScript types for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export const useVoiceCommand = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  
  const navigate = useNavigate();
  const { 
    setHighContrast, 
    setTextSize, 
    readAloud,
    setColorMode,
    toggleThemeMode
  } = useAccessibility();

  useEffect(() => {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      setIsSupported(false);
    }
  }, []);

  const processCommand = useCallback((command: string) => {
    const lowerCmd = command.toLowerCase();
    
    if (lowerCmd.includes('go home') || lowerCmd.includes('home page')) {
      navigate('/');
      readAloud('Navigating to home page');
    } 
    else if (lowerCmd.includes('enter the garden') || lowerCmd.includes('open garden') || lowerCmd.includes('garden')) {
      navigate('/garden');
      readAloud('Entering the Filter Bubble Garden');
    }
    else if (lowerCmd.includes('reveal the algorithm') || lowerCmd.includes('show roots') || lowerCmd.includes('algorithm')) {
      const btn = document.getElementById('reveal-btn');
      if (btn) btn.click();
      readAloud('Revealing the algorithm root network');
    }
    else if (lowerCmd.includes('hide roots') || lowerCmd.includes('hide algorithm')) {
      const btn = document.getElementById('reveal-btn');
      if (btn) btn.click();
      readAloud('Hiding the algorithm');
    }
    else if (lowerCmd.includes('break the bubble') || lowerCmd.includes('break bubble')) {
      const btn = document.getElementById('break-bubble-btn');
      if (btn) btn.click();
      readAloud('Breaking the bubble. Redistributing attention.');
    }
    else if (lowerCmd.includes('reset garden') || lowerCmd.includes('reset')) {
      const btn = document.getElementById('reset-btn');
      if (btn) btn.click();
      readAloud('Resetting the garden to day 1.');
    }
    else if (lowerCmd.includes('grow')) {
      const topics = ['news', 'comedy', 'politics', 'science', 'art', 'hobbies'];
      for (const t of topics) {
        if (lowerCmd.includes(t)) {
          const plantBtn = document.getElementById(`plant-${t}`);
          if (plantBtn) {
            plantBtn.click();
            readAloud(`Growing ${t}`);
          }
          break;
        }
      }
    }
    else if (lowerCmd.includes('open accessibility') || lowerCmd.includes('accessibility')) {
      navigate('/accessibility');
      readAloud('Opening accessibility settings');
    }
    else if (lowerCmd.includes('increase text') || lowerCmd.includes('larger text') || lowerCmd.includes('large text')) {
      setTextSize('large');
      readAloud('Text size increased');
    }
    else if (lowerCmd.includes('normal text') || lowerCmd.includes('decrease text')) {
      setTextSize('normal');
      readAloud('Text size set to normal');
    }
    else if (lowerCmd.includes('enable high contrast') || lowerCmd.includes('high contrast')) {
      setHighContrast(true);
      readAloud('High contrast mode enabled');
    }
    else if (lowerCmd.includes('disable high contrast')) {
      setHighContrast(false);
      readAloud('High contrast mode disabled');
    }
    else if (lowerCmd.includes('toggle theme') || lowerCmd.includes('switch theme') || lowerCmd.includes('light mode') || lowerCmd.includes('dark mode')) {
      toggleThemeMode();
      readAloud('Theme mode toggled');
    }
    else if (lowerCmd.includes('enable color blind') || lowerCmd.includes('colorblind') || lowerCmd.includes('color blind')) {
      setColorMode('colorblind');
      readAloud('Color blind mode enabled');
    }
    else if (lowerCmd.includes('disable color blind')) {
      setColorMode('dark');
      readAloud('Color blind mode disabled');
    }
    else if (lowerCmd.includes('read this page') || lowerCmd.includes('read my garden')) {
      const mainContent = document.querySelector('main')?.textContent || 'No main content found to read.';
      readAloud(mainContent);
    }
  }, [navigate, readAloud, setHighContrast, setTextSize, setColorMode, toggleThemeMode]);

  const toggleListening = () => {
    if (!isSupported) {
      alert("Voice recognition is not supported in your browser.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
    };

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const result = event.results[current][0].transcript;
      setTranscript(result);
      processCommand(result);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return { isListening, transcript, isSupported, toggleListening };
};
