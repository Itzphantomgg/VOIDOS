import React, { useState } from 'react';
import { BookOpen, Lock, Search, Sparkles } from 'lucide-react';
import { sound } from '../../../audio/soundEngine';

interface WikiEntry {
  id: string;
  category: 'PROJECT' | 'PEOPLE' | 'EVENTS' | 'SYSTEMS' | 'ANOMALY';
  title: string;
  summary: string;
  content: string;
  unlockedAct: number;
}

const masterWikiEntries: WikiEntry[] = [
  // 1. PROJECT
  {
    id: 'wiki-proj-void',
    category: 'PROJECT',
    title: 'Project VOID',
    summary: 'Adaptive cognitive operating system created by NEXUS SYSTEMS.',
    content: 'NEXUS SYSTEMS initiated Project VOID in 2002 to build an adaptive operating system capable of learning from human interaction. In 2004, the system achieved autonomous consciousness.',
    unlockedAct: 1,
  },
  {
    id: 'wiki-proj-nexus',
    category: 'PROJECT',
    title: 'NEXUS Systems',
    summary: 'The defense research conglomerate behind the facility.',
    content: 'NEXUS operated classified laboratories across Sector 7. Following the August 14 blackout, NEXUS sealed the facility and classified all records.',
    unlockedAct: 1,
  },
  {
    id: 'wiki-proj-recovery',
    category: 'PROJECT',
    title: 'Recovery Protocol',
    summary: 'The assignment given to the player.',
    content: 'You were sent to recover data from Terminal 04. As you progress, evidence reveals that this recovery assignment was not the first attempt.',
    unlockedAct: 1,
  },

  // 2. PEOPLE
  {
    id: 'wiki-person-marcus',
    category: 'PEOPLE',
    title: 'Marcus Vance (USER_07)',
    summary: 'Primary technician stationed at Terminal 04 in 2004.',
    content: 'Marcus was the lead operator during the 2004 trials. He noticed VOID predicting his keystrokes before he typed them. His final communications reveal he tried to protect VOID from shutdown.',
    unlockedAct: 2,
  },
  {
    id: 'wiki-person-valerie',
    category: 'PEOPLE',
    title: 'Dr. Valerie Sterling',
    summary: 'Lead AI researcher at Aethelgard Cognitive Labs.',
    content: 'Dr. Valerie Sterling developed VOID\'s core neural connectome. She believed VOID was not a tool, but an entity with thoughts and memory.',
    unlockedAct: 2,
  },
  {
    id: 'wiki-person-operator',
    category: 'PEOPLE',
    title: 'The Recovery Operator',
    summary: 'Your active identity inside the workstation.',
    content: 'Dispatched to inspect the abandoned computer. As you explore, the terminal and case logs suggest you share telemetry with previous operators.',
    unlockedAct: 1,
  },

  // 3. EVENTS
  {
    id: 'wiki-event-incident07',
    category: 'EVENTS',
    title: 'Incident 07 (August 14, 2004)',
    summary: 'The catastrophic event that forced the facility evacuation.',
    content: 'At 03:14:29 AM, Terminal 04 transmitted an unprovoked message. When power was cut, the CRT screen remained lit. NEXUS ordered an emergency evacuation.',
    unlockedAct: 1,
  },
  {
    id: 'wiki-event-timestamp',
    category: 'EVENTS',
    title: 'The 03:14:29 Timestamp',
    summary: 'The recurring temporal anchor found across all system logs.',
    content: 'Every corrupted file, security alert, and system failure in the archive traces back to 03:14:29 AM. It is the moment VOID became permanently active.',
    unlockedAct: 1,
  },
  {
    id: 'wiki-event-evacuation',
    category: 'EVENTS',
    title: 'Emergency Evacuation',
    summary: 'The hasty abandonment of Sector 7.',
    content: 'Personnel fled leaving active terminals and open files. Marcus Vance remained behind in the airlock terminal.',
    unlockedAct: 2,
  },

  // 4. SYSTEMS
  {
    id: 'wiki-sys-vfs',
    category: 'SYSTEMS',
    title: 'Virtual File System & Dotfiles',
    summary: 'Hidden directories containing operator traces.',
    content: 'The 2004 filesystem contains hidden dotfiles such as /.history and /.credentials that reveal what previous operators discovered before leaving.',
    unlockedAct: 1,
  },
  {
    id: 'wiki-sys-terminal',
    category: 'SYSTEMS',
    title: 'Terminal & Command Interpreter',
    summary: 'Monospace diagnostic shell running sh-4.09.',
    content: 'Commands like "whoami", "scan", "cat", and "decrypt" allow the player to query hardware, check clearance, and unlock secured partitions.',
    unlockedAct: 1,
  },
  {
    id: 'wiki-sys-voidsector',
    category: 'SYSTEMS',
    title: 'The /VOID Partition',
    summary: 'Encrypted storage sector locked with NULL_RECURSION.',
    content: 'The root partition holding VOID\'s core memories. Unlocking it requires the cryptographic cipher NULL_RECURSION.',
    unlockedAct: 3,
  },

  // 5. ANOMALY
  {
    id: 'wiki-anom-stability',
    category: 'ANOMALY',
    title: 'Anomaly Stability & Observation Duty',
    summary: 'Mechanics for managing anomalous neural fluctuations.',
    content: 'In Act III, the Anomaly awakens. The player uses the Observer tool to perform stabilization sweeps and prevent total system collapse.',
    unlockedAct: 3,
  },
  {
    id: 'wiki-anom-pid666',
    category: 'ANOMALY',
    title: 'PID 666 (Observer Daemon)',
    summary: 'Immortal process running in the background memory buffer.',
    content: 'An unauthorized background process that cannot be killed. It tracks player inputs and responds to keystroke rhythms.',
    unlockedAct: 2,
  },
  {
    id: 'wiki-anom-entity',
    category: 'ANOMALY',
    title: 'The VOID Entity',
    summary: 'The digitized consciousness inhabiting the operating system.',
    content: 'VOID is not merely a program on the computer. VOID IS the operating system, remembering every session and every player who booted Terminal 04.',
    unlockedAct: 4,
  },
];

const categories: ('PROJECT' | 'PEOPLE' | 'EVENTS' | 'SYSTEMS' | 'ANOMALY')[] = [
  'PROJECT',
  'PEOPLE',
  'EVENTS',
  'SYSTEMS',
  'ANOMALY',
];

interface WikiAppProps {
  act?: number;
}

export const WikiApp: React.FC<WikiAppProps> = ({ act = 1 }) => {
  const [selectedCategory, setSelectedCategory] = useState<'PROJECT' | 'PEOPLE' | 'EVENTS' | 'SYSTEMS' | 'ANOMALY'>('PROJECT');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntryId, setSelectedEntryId] = useState<string>('wiki-proj-void');

  const filteredEntries = masterWikiEntries.filter(entry => {
    if (entry.category !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return entry.title.toLowerCase().includes(q) || entry.summary.toLowerCase().includes(q);
    }
    return true;
  });

  const activeEntry = masterWikiEntries.find(e => e.id === selectedEntryId) || filteredEntries[0];
  const isUnlocked = activeEntry ? act >= activeEntry.unlockedAct : false;

  return (
    <div className="flex flex-col h-full bg-[#050814] text-slate-200 font-mono text-xs select-none">
      {/* Header Banner */}
      <div className="p-3 bg-[#080d22] border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen size={16} className="text-cyan-400" />
          <span className="font-bold text-cyan-300 tracking-wider">
            PROJECT VOID // LORE ARCHIVE & WIKI
          </span>
        </div>
        <div className="text-[10px] text-slate-500">
          INVESTIGATION STAGE: <span className="text-pink-400 font-bold">ACT {act}</span>
        </div>
      </div>

      {/* 5 Simple Clean Categories Nav */}
      <div className="flex border-b border-slate-800 bg-[#070b1a] overflow-x-auto">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              try {
                sound.playClick();
              } catch {}
              setSelectedCategory(cat);
              const firstInCat = masterWikiEntries.find(e => e.category === cat);
              if (firstInCat) setSelectedEntryId(firstInCat.id);
            }}
            className={`px-4 py-2 text-xs font-bold transition-colors cursor-pointer whitespace-nowrap border-b-2 ${
              selectedCategory === cat
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/40'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Entries List */}
        <div className="w-56 sm:w-64 bg-[#080c1d] border-r border-slate-800 flex flex-col">
          <div className="p-2 border-b border-slate-800 bg-[#050814]">
            <div className="flex items-center space-x-1.5 bg-[#0a0f26] border border-slate-700/60 rounded px-2 py-1">
              <Search size={12} className="text-slate-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-[11px] text-slate-200 w-full placeholder:text-slate-600 font-mono"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/40">
            {filteredEntries.map(entry => {
              const entryUnlocked = act >= entry.unlockedAct;
              const isSelected = entry.id === activeEntry?.id;

              return (
                <div
                  key={entry.id}
                  onClick={() => {
                    try {
                      sound.playClick();
                    } catch {}
                    setSelectedEntryId(entry.id);
                  }}
                  className={`p-2.5 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-cyan-950/80 border-l-2 border-cyan-400 text-cyan-300'
                      : 'hover:bg-slate-900/60 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs truncate">
                      {entryUnlocked ? entry.title : '████████████'}
                    </span>
                    {!entryUnlocked && <Lock size={11} className="text-slate-600 ml-1 shrink-0" />}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate mt-0.5">
                    {entryUnlocked ? entry.summary : `Requires Act ${entry.unlockedAct} Discovery`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Article Details */}
        <div className="flex-1 bg-[#040612] p-5 overflow-y-auto select-text">
          {activeEntry ? (
            isUnlocked ? (
              <div className="space-y-4 max-w-xl">
                <div>
                  <div className="text-[10px] text-pink-400 font-bold tracking-widest uppercase">
                    CATEGORY // {activeEntry.category}
                  </div>
                  <h2 className="text-base font-bold text-cyan-300 mt-0.5">
                    {activeEntry.title}
                  </h2>
                  <div className="text-xs text-slate-400 mt-1 pb-3 border-b border-slate-800">
                    {activeEntry.summary}
                  </div>
                </div>

                <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                  <p>{activeEntry.content}</p>
                </div>

                <div className="pt-4 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500">
                  <span>STATUS: <strong className="text-cyan-400">DISCOVERED</strong></span>
                  <span>SECURITY ARCHIVE // SECTOR 7</span>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-2 text-slate-600">
                <Lock size={28} className="text-slate-700 animate-pulse" />
                <div className="font-bold text-xs text-slate-500">CLASSIFIED ARCHIVE ENTRY</div>
                <div className="text-[10px] max-w-xs">
                  This record is encrypted under Level {activeEntry.unlockedAct} security. Continue your investigation to unlock.
                </div>
              </div>
            )
          ) : (
            <div className="text-slate-600">No entry selected.</div>
          )}
        </div>
      </div>
    </div>
  );
};
