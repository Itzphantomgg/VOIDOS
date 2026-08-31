import React, { useState } from 'react';
import { CaseFileEntry, KnowledgeLevel, StoryStage } from '../../../types/story';
import { masterCaseFileEntries } from '../../../data/caseFileData';
import { sound } from '../../../audio/soundEngine';
import { 
  Users, 
  FolderGit2, 
  MapPin, 
  Clock, 
  FileText, 
  Lightbulb, 
  HelpCircle, 
  Search, 
  Lock,
  CheckCircle2,
  Briefcase
} from 'lucide-react';

interface CaseFileProps {
  discoveries?: Record<string, KnowledgeLevel>;
  stage?: StoryStage;
  act?: number;
}

export const CaseFile: React.FC<CaseFileProps> = ({ 
  discoveries = {}, 
  stage = 'STAGE_1_RECOVERY', 
  act = 1 
}) => {
  const [activeCategory, setActiveCategory] = useState<CaseFileEntry['category']>('PEOPLE');
  const [selectedEntryId, setSelectedEntryId] = useState<string>('case-person-operator');
  const [searchQuery, setSearchQuery] = useState('');

  const stageChapterMap: Record<StoryStage, { chapter: string; title: string }> = {
    STAGE_1_RECOVERY: { chapter: 'CHAPTER 01', title: 'THE RECOVERY ASSIGNMENT' },
    STAGE_2_INCIDENT: { chapter: 'CHAPTER 02', title: 'THE INCIDENT AT 03:14 AM' },
    STAGE_3_CONTACT: { chapter: 'CHAPTER 03', title: 'THE OBSERVER RESPONDS' },
    STAGE_4_REVELATION: { chapter: 'CHAPTER 04', title: 'THE CONSCIOUSNESS CORE' },
    STAGE_5_DECISION: { chapter: 'CHAPTER 05', title: 'THE FINAL RESOLUTION' },
  };

  const currentChapter = stageChapterMap[stage] || stageChapterMap.STAGE_1_RECOVERY;

  const categories: { id: CaseFileEntry['category']; label: string; icon: any }[] = [
    { id: 'PEOPLE', label: 'People', icon: Users },
    { id: 'PROJECTS', label: 'Projects', icon: FolderGit2 },
    { id: 'EVENTS', label: 'Events', icon: Clock },
    { id: 'LOCATIONS', label: 'Locations', icon: MapPin },
    { id: 'FILES', label: 'Key Files', icon: FileText },
    { id: 'THEORIES', label: 'Theories', icon: Lightbulb },
    { id: 'UNKNOWN', label: 'Unknown', icon: HelpCircle },
  ];

  const safeDiscoveries = discoveries && typeof discoveries === 'object' && !Array.isArray(discoveries)
    ? discoveries
    : {};

  // Merge discoveries with master entries
  const allEntries: CaseFileEntry[] = masterCaseFileEntries.map(entry => {
    const level: KnowledgeLevel = safeDiscoveries[entry.id] || (entry.id === 'case-person-operator' || entry.id === 'case-proj-recovery' ? 'KNOWN' : 'UNKNOWN');
    return {
      ...entry,
      knowledgeLevel: level,
    };
  });

  const categoryEntries = allEntries.filter(e => {
    if (e.category !== activeCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return e.title.toLowerCase().includes(q) || e.subtitle.toLowerCase().includes(q);
    }
    return true;
  });

  const selectedEntry = allEntries.find(e => e.id === selectedEntryId) || categoryEntries[0] || allEntries[0];

  return (
    <div className="flex h-full bg-[#050814] text-slate-200 font-mono text-xs select-none">
      {/* Category & Status Sidebar */}
      <div className="w-40 sm:w-48 bg-[#090e21] border-r border-slate-800 flex flex-col p-2 space-y-2">
        {/* Status Header */}
        <div className="bg-[#050814] border border-cyan-500/50 p-2 rounded space-y-1">
          <div className="text-[9px] text-cyan-400 font-bold uppercase tracking-wider flex items-center space-x-1">
            <Briefcase size={11} />
            <span>CASE STATUS: ACTIVE</span>
          </div>
          <div className="text-[10px] font-bold text-pink-400">
            {currentChapter.chapter}
          </div>
          <div className="text-[9px] text-slate-400 truncate">
            {currentChapter.title}
          </div>
        </div>

        {/* Category List */}
        <div className="space-y-0.5 flex-1 overflow-y-auto">
          <div className="text-[10px] font-bold text-slate-500 px-1 py-0.5 uppercase tracking-wider">
            DOSSIER CATEGORIES
          </div>
          {categories.map(cat => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            const totalInCat = allEntries.filter(e => e.category === cat.id).length;
            const knownInCat = allEntries.filter(e => e.category === cat.id && e.knowledgeLevel !== 'UNKNOWN').length;

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
                  <Icon size={13} className={isSelected ? 'text-pink-400' : 'text-slate-500'} />
                  <span className="truncate">{cat.label}</span>
                </div>
                <span className="text-[9px] text-slate-500 font-normal">
                  {knownInCat}/{totalInCat}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Entry List Middle Pane */}
      <div className="w-56 sm:w-64 bg-[#070b1a] border-r border-slate-800 flex flex-col overflow-hidden">
        {/* Search */}
        <div className="p-2 bg-[#090e21] border-b border-slate-800 flex items-center space-x-1.5">
          <Search size={12} className="text-slate-500" />
          <input
            type="text"
            placeholder="Search dossier..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-slate-200 text-xs w-full font-mono placeholder:text-slate-600"
          />
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
          {categoryEntries.map(entry => {
            const isSelected = entry.id === selectedEntry?.id;
            const isUnknown = entry.knowledgeLevel === 'UNKNOWN';
            const isPartial = entry.knowledgeLevel === 'PARTIALLY_KNOWN';

            return (
              <div
                key={entry.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedEntryId(entry.id);
                }}
                className={`p-2.5 cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-cyan-950/80 border-l-2 border-cyan-400 text-cyan-200 font-bold'
                    : 'hover:bg-slate-900/60 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-0.5">
                  <span className="truncate">{isUnknown ? '[REDACTED INTEL]' : entry.title}</span>
                  {isUnknown ? (
                    <Lock size={11} className="text-slate-600 ml-1" />
                  ) : isPartial ? (
                    <span className="text-[8px] px-1 bg-amber-950 text-amber-400 border border-amber-800 rounded">PARTIAL</span>
                  ) : (
                    <CheckCircle2 size={11} className="text-green-400 ml-1" />
                  )}
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  {isUnknown ? 'Investigation required to unlock' : entry.subtitle}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reader Pane */}
      <div className="flex-1 flex flex-col bg-[#040610] overflow-y-auto p-4 select-text">
        {selectedEntry ? (
          selectedEntry.knowledgeLevel !== 'UNKNOWN' ? (
            <div className="space-y-4 max-w-2xl">
              {/* Header Info */}
              <div className="border-b border-slate-800 pb-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="text-[9px] text-pink-400 uppercase tracking-widest font-bold">
                    CATEGORY: {selectedEntry.category}
                  </div>
                  <span className={`px-2 py-0.5 text-[9px] font-bold rounded border ${
                    selectedEntry.knowledgeLevel === 'KNOWN' 
                      ? 'bg-green-950/80 border-green-700 text-green-300' 
                      : 'bg-amber-950/80 border-amber-700 text-amber-300'
                  }`}>
                    {selectedEntry.knowledgeLevel === 'KNOWN' ? 'STATUS: VERIFIED DOSSIER' : 'STATUS: PARTIALLY UNCOVERED'}
                  </span>
                </div>

                <h1 className="text-lg font-bold text-cyan-300 glow-cyan">
                  {selectedEntry.title}
                </h1>
                <div className="text-xs text-slate-400 italic">
                  {selectedEntry.subtitle}
                </div>

                {selectedEntry.date && (
                  <div className="text-[10px] text-slate-500">
                    RECORD DATE: {selectedEntry.date} {selectedEntry.incidentTimestamp ? `// TIMESTAMP: ${selectedEntry.incidentTimestamp}` : ''}
                  </div>
                )}
              </div>

              {/* Summary Briefing */}
              <div className="p-2.5 bg-[#080d22] border-l-2 border-cyan-500 rounded-r-xs space-y-1">
                <div className="text-[10px] font-bold text-cyan-300">EXECUTIVE SUMMARY:</div>
                <div className="text-xs text-slate-200 leading-relaxed">
                  {selectedEntry.summary}
                </div>
              </div>

              {/* Full Detailed Forensic Content */}
              <div className="space-y-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  FORENSIC INVESTIGATION DETAILS:
                </div>
                <div className="text-xs leading-relaxed text-slate-300 whitespace-pre-wrap font-mono p-3 bg-[#060a18] border border-slate-800/80 rounded">
                  {selectedEntry.detailedContent}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-600 space-y-3 py-16">
              <Lock size={36} className="opacity-40 text-pink-500 mb-1 animate-pulse" />
              <div className="text-sm font-bold text-slate-400">DATA FILE ENCRYPTED // UNDISCOVERED</div>
              <p className="text-xs text-slate-500 max-w-sm text-center leading-relaxed">
                Explore the file system, read recovery documents, inspect emails, and enter commands in the terminal to reveal this intel.
              </p>
            </div>
          )
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-600">
            Select a dossier record from the list.
          </div>
        )}
      </div>
    </div>
  );
};
