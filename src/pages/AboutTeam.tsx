import React from 'react';
import { Users, GraduationCap, BookOpen } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

const teamMembers = [
  {
    name: "S Sri Venkateswaran",
    regNo: "727824TUCS410",
    icon: <Users className="w-6 h-6" />
  },
  {
    name: "S Swathi",
    regNo: "727824TUCS428",
    icon: <Users className="w-6 h-6" />
  },
  {
    name: "M Srihari",
    regNo: "727824TUCS412",
    icon: <Users className="w-6 h-6" />
  },
];

const AboutTeam: React.FC = () => {
  const { themeMode } = useAccessibility();
  const isLight = themeMode === 'light';

  return (
    <main id="main-content" className="flex-1 w-full max-w-5xl mx-auto px-4 py-16" tabIndex={-1}>
      <div className="text-center mb-16">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full border mb-6 ${
          isLight ? 'bg-emerald-100 border-emerald-300 text-emerald-600' : 'bg-emerald-900/30 border-emerald-500/30 text-emerald-400'
        }`}>
          <Users className="w-10 h-10" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isLight ? 'text-gray-900' : ''}`}>About the Team</h1>
        <p className={`text-xl max-w-2xl mx-auto ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
          The minds behind the Filter Bubble Garden.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {teamMembers.map((member, index) => (
          <div
            key={member.regNo}
            className={`border rounded-3xl p-8 text-center transition-colors ${
              isLight
                ? 'bg-white border-gray-200 hover:border-emerald-300'
                : 'bg-[#111] border-gray-800 hover:border-emerald-500/40'
            }`}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold ${
              isLight ? 'bg-emerald-100 text-emerald-600' : 'bg-emerald-900/30 text-emerald-400'
            }`}>
              {member.name.split(' ').filter(w => w[0] === w[0]?.toUpperCase() && w.length > 0).map(w => w[0]).join('').slice(0, 2)}
            </div>
            <h2 className={`text-xl font-bold mb-2 ${isLight ? 'text-gray-900' : ''}`}>{member.name}</h2>
            <p className={`font-mono text-sm mb-4 ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>{member.regNo}</p>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold uppercase ${
              isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-emerald-900/20 border-emerald-500/20 text-emerald-400'
            }`}>
              {member.icon}
              Team Member {index + 1}
            </div>
          </div>
        ))}
      </div>

      <div className={`border rounded-3xl p-10 transition-colors ${
        isLight ? 'bg-white border-gray-200' : 'bg-[#111] border-gray-800'
      }`}>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <GraduationCap className={`w-8 h-8 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} aria-hidden="true" />
            <div>
              <h3 className={`text-sm font-bold uppercase tracking-wider mb-1 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Class</h3>
              <p className={`text-lg font-bold ${isLight ? 'text-gray-900' : ''}`}>CSE I</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <BookOpen className={`w-8 h-8 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} aria-hidden="true" />
            <div>
              <h3 className={`text-sm font-bold uppercase tracking-wider mb-1 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Department</h3>
              <p className={`text-lg font-bold ${isLight ? 'text-gray-900' : ''}`}>B.E Computer Science and Engineering</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <GraduationCap className={`w-8 h-8 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} aria-hidden="true" />
            <div>
              <h3 className={`text-sm font-bold uppercase tracking-wider mb-1 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Year</h3>
              <p className={`text-lg font-bold ${isLight ? 'text-gray-900' : ''}`}>III Year</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutTeam;
