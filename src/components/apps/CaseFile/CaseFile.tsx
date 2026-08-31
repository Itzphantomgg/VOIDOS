import React, { useState } from 'react';
import { CaseFileEntry } from '../../../types/story';
import { initialCaseFileEntries } from '../../../data/caseFileData';
import { sound } from '../../../audio/soundEngine';
import { 
  Users, 
  FolderGit2, 
  MapPin, 
  Clock, 
  FileText, 
  KeyRound, 
  Lightbulb, 
  HelpCircle, 
  Search, 
  Lock 
} from 'lucide-react';

interface CaseFileProps {
  unlockedEntryIds: string[];
  act: number;
}

export const CaseFile: React.FC<CaseFileProps> = ({ unlockedEntryIds, act }) => {
  const [activeCategory, setActiveCategory] = useState<CaseFileEntry['category']>('PEOPLE');
  const [selectedEntryId, setSelectedEntryId] = useState<string>('case-person-operator');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: CaseFileEntry['category']; label: string; icon: any }[] = [
    { id: 'PEOPLE', label: 'People', icon: Users },
    { id: 'PROJECTS', label: 'Projects', icon: FolderGit2 },
    { id: 'LOCATIONS', label: 'Locations', icon: MapPin },
    { id: 'EVENTS', label: 'Events', icon: Clock },
    { id: 'FILES', label: 'Key Files', icon: FileText },
    { id: 'PASSWORDS', label: 'Passwords', icon: KeyRound },
    { id: 'THEORIES', label: 'Theories', icon: Lightbulb },
    { id: 'UNKNOWN', label: 'Unknown', icon: HelpCircle },
  ];

  // Merge unlocked state
  const allEntries: CaseFileEntry[] = initialCaseFileEntries.map(e => ({
    ...e,
    unlocked: e.unlocked || unlockedEntryIds.includes(e.id) || (act >= 3 && e.category === 'THEORIES'),
  }));

  const categoryEntries = allEntries.filter(e => {
    if (e.category !== activeCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return e.title.toLowerCase().includes(q) || e.subtitle.toLowerCase().includes(q);
    }
    return true;
  });

  const selectedEntry = allEntries.find(e => e.id === selectedEntryId);

  return (
    <div className="flex h-full bg-[#070b1a] text-slate-200 font-mono text-xs select-none">
      {/* Category Sidebar */}
      <div className="w-36 sm:w-44 bg-[#0a0f22] border-r border-slate-800 flex flex-col p-2 space-y-1">
        <div className="font-bold text-pink-400 px-2 py-1 text-xs tracking-wider border-b border-slate-800 mb-1">
          CASE DOSSIER
        </div>

        {categories.map(cat => {
          const Icon = cat.icon;
          const isSelected = activeCategory === cat.id;
          const count = allEntries.filter(e => e.category === cat.id && e.unlocked).length;

          return (
            <button
              key={cat.id}
              onClick={() => {
                sound.playClick();
                setActiveCategory(cat.id);
                const first = allEntries.find(e => e.category === cat.id);
                if (first) setSelectedEntryId(first.id);
              }}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-left transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-pink-950/80 border border-pink-700 text-pink-300 font-bold shadow-retro-magenta'
                  : 'hover:bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2 truncate">
                <Icon size={14} className={isSelected ? 'text-pink-400' : 'text-slate-500'} />
                <span className="truncate">{cat.label}</span>
              </div>
              <span className="text-[10px] text-slate-500 font-normal">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Entry List Middle Pane */}
      <div className="w-52 sm:w-64 bg-[#090d20] border-r border-slate-800 flex flex-col overflow-hidden">
        {/* Search */}
        <div className="p-2 bg-[#0c1226] border-b border-slate-800 flex items-center space-x-1.5">
          <Search size={12} className="text-slate-500" />
          <input
            type="text"
            placeholder="Search dossier..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-slate-200 text-xs w-full font-mono placeholder:text-slate-600"
          />
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/50">
          {categoryEntries.map(entry => {
            const isSelected = entry.id === selectedEntryId;
            return (
              <div
                key={entry.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedEntryId(entry.id);
                }}
                className={`p-2.5 cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-cyan-950/80 border-l-2 border-cyan-400 text-cyan-300 font-bold'
                    : 'hover:bg-slate-900/60 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-0.5">
                  <span className="truncate">{entry.unlocked ? entry.title : '[REDACTED ENTRY]'}</span>
                  {!entry.unlocked && <Lock size={11} className="text-slate-600 ml-1" />}
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  {entry.unlocked ? entry.subtitle : 'Investigation required to unlock'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reader Pane */}
      <div className="flex-1 flex flex-col bg-[#050814] overflow-y-auto p-4 select-text">
        {selectedEntry ? (
          selectedEntry.unlocked ? (
            <div className="space-y-4 max-w-2xl">
              <div className="border-b border-slate-800 pb-3 space-y-1">
                <div className="text-[10px] text-pink-400 uppercase tracking-widest font-bold">
                  CATEGORY: {selectedEntry.category}
                </div>
                <h1 className="text-lg font-bold text-cyan-300">
                  {selectedEntry.title}
                </h1>
                <div className="text-xs text-slate-400 italic">
                  {selectedEntry.subtitle}
                </div>
              </div>

              <div className="text-xs leading-relaxed text-slate-200 font-mono whitespace-pre-wrap">
                {selectedEntry.content}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-600 space-y-2 py-12">
              <Lock size={32} className="opacity-40 text-pink-500 mb-2" />
              <div className="text-sm font-bold text-slate-400">DATA FILE ENCRYPTED // UNDISCOVERED</div>
              <p className="text-[11px] text-slate-500 max-w-xs text-center">
                Explore file system partitions, read emails, and experiment in the terminal to reveal this intelligence.
              </p>
            </div>
          )
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-600">
            Select a dossier record.
          </div>
        )}
      </div>
    </div>
  );
};
