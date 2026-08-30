import React from 'react';
import { Smartphone, Newspaper, Film, ShoppingBag } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

const YourAttention: React.FC = () => {
  const { themeMode } = useAccessibility();
  const isLight = themeMode === 'light';

  const examples = [
    {
      title: 'Social Media',
      icon: <Smartphone className="w-12 h-12" />,
      text: 'You watch one type of video format. The algorithm quickly assumes this is your permanent preference. Your feed learns to show you more, completely burying other creators.',
      color: isLight ? 'text-blue-600' : 'text-blue-400',
      bg: isLight ? 'bg-blue-50' : 'bg-blue-900/20',
      border: isLight ? 'border-blue-300' : 'border-blue-500/30',
      iconBg: isLight ? 'bg-blue-100' : 'bg-black/50',
    },
    {
      title: 'News & Information',
      icon: <Newspaper className="w-12 h-12" />,
      text: 'You repeatedly engage with one political or ideological viewpoint. The recommendation root network strengthens those pathways, and other perspectives appear less often.',
      color: isLight ? 'text-orange-600' : 'text-orange-400',
      bg: isLight ? 'bg-orange-50' : 'bg-orange-900/20',
      border: isLight ? 'border-orange-300' : 'border-orange-500/30',
      iconBg: isLight ? 'bg-orange-100' : 'bg-black/50',
    },
    {
      title: 'Entertainment',
      icon: <Film className="w-12 h-12" />,
      text: 'You binge-watch a specific genre. Recommendations increasingly favor it, making it harder to discover indie films, documentaries, or new genres you might love.',
      color: isLight ? 'text-purple-600' : 'text-purple-400',
      bg: isLight ? 'bg-purple-50' : 'bg-purple-900/20',
      border: isLight ? 'border-purple-300' : 'border-purple-500/30',
      iconBg: isLight ? 'bg-purple-100' : 'bg-black/50',
    },
    {
      title: 'Shopping',
      icon: <ShoppingBag className="w-12 h-12" />,
      text: 'You browse one product category. Similar products dominate your recommendations and targeted ads for weeks, creating a hyper-focused consumer bubble.',
      color: isLight ? 'text-emerald-600' : 'text-emerald-400',
      bg: isLight ? 'bg-emerald-50' : 'bg-emerald-900/20',
      border: isLight ? 'border-emerald-300' : 'border-emerald-500/30',
      iconBg: isLight ? 'bg-emerald-100' : 'bg-black/50',
    }
  ];

  return (
    <main id="main-content" className="flex-1 w-full max-w-7xl mx-auto px-4 py-16" tabIndex={-1}>
      <div className="text-center mb-20">
        <h1 className={`text-4xl md:text-5xl font-bold mb-6 uppercase tracking-tighter ${isLight ? 'text-gray-900' : ''}`}>
          This happens outside the garden.
        </h1>
        <p className={`text-xl max-w-3xl mx-auto ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
          The algorithmic root system governs nearly every digital platform you use.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {examples.map((ex, i) => (
          <div
            key={i}
            className={`p-10 rounded-3xl border ${ex.border} ${ex.bg} flex flex-col md:flex-row gap-8 items-start`}
          >
            <div className={`shrink-0 p-4 rounded-2xl ${ex.iconBg} ${ex.color}`}>
              {ex.icon}
            </div>
            <div>
              <h2 className={`text-3xl font-bold mb-4 ${ex.color}`}>{ex.title}</h2>
              <p className={`text-lg leading-relaxed ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                {ex.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default YourAttention;
