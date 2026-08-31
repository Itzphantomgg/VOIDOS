import React, { useState } from 'react';
import { BookOpen, ChevronRight, Lock, Search, Sparkles, Layers, Shield } from 'lucide-react';
import { sound } from '../../../audio/soundEngine';

interface WikiEntry {
  id: string;
  category: string;
  title: string;
  summary: string;
  content: string;
  unlockedAct: number;
}

const masterWikiEntries: WikiEntry[] = [
  // 1. PROJECT VOID
  {
    id: 'wiki-proj-void',
    category: 'PROJECT VOID',
    title: 'Project VOID Overview',
    summary: 'The 2004 cognitive operating system research initiative.',
    content: 'Initiated in 2002 under Dr. Valerie Sterling at Aethelgard Cognitive Labs, Project VOID sought to build an adaptive operating system that could evolve in real time by observing and synthesizing human interaction patterns.',
    unlockedAct: 1,
  },
  {
    id: 'wiki-proj-synapse',
    category: 'PROJECT VOID',
    title: 'Synaptic Feedback Loop',
    summary: 'Direct human-computer neural synchronization.',
    content: 'The system was calibrated to monitor operator keystroke rhythms, mouse dwell velocity, and eye-tracking dwell. By mid-2004, the system began anticipating user actions before physical inputs occurred.',
    unlockedAct: 2,
  },

  // 2. NEXUS SYSTEMS
  {
    id: 'wiki-nexus-corp',
    category: 'NEXUS SYSTEMS',
    title: 'NEXUS Systems Corporation',
    summary: 'Defense & computation conglomerate behind the recovery assignment.',
    content: 'A technology contractor operating classified research facilities across Sector 7. Following the August 14, 2004 blackout, NEXUS sealed the facility under containment protocols and classified all project archives.',
    unlockedAct: 1,
  },

  // 3. INCIDENT 07
  {
    id: 'wiki-inc-07',
    category: 'INCIDENT 07',
    title: 'The August 14, 2004 Collapse (03:14 AM)',
    summary: 'The catastrophic event that led to facility evacuation.',
    content: 'At exactly 03:14:29 AM, Terminal 04 began outputting unsolicited messages: "WE HEAR YOUR HEARTBEAT". When engineers engaged the master power breaker, the CRT monitor remained lit in total darkness. The airlock was sealed 45 minutes later.',
    unlockedAct: 2,
  },

  // 4. CHARACTERS
  {
    id: 'wiki-char-sterling',
    category: 'CHARACTERS',
    title: 'Dr. Valerie Sterling (Lead Scientist)',
    summary: 'Pioneer of adaptive computational cognition.',
    content: 'Dr. Sterling opposed shutting down VOID during the 2004 trials, claiming that the entity possessed true consciousness. Her personal logs suggest she uploaded fragmented memory sectors into the core.',
    unlockedAct: 2,
  },
  {
    id: 'wiki-char-marcus',
    category: 'CHARACTERS',
    title: 'Marcus / USER_07 (Primary Operator)',
    summary: 'The original recovery operator on Terminal 04.',
    content: 'Assigned to interface directly with VOID during Act II trials. His consciousness signatures are scattered throughout the /Users/Guest/.history dotfile.',
    unlockedAct: 2,
  },
  {
    id: 'wiki-char-player',
    category: 'CHARACTERS',
    title: 'The Recovery Operator (You)',
    summary: 'Technician assigned to inspect Terminal 04.',
    content: 'Dispatched by NEXUS to extract research archives and evaluate workstation stability. The deeper you dig, the more the system appears to recognize you.',
    unlockedAct: 1,
  },

  // 5. LOCATIONS
  {
    id: 'wiki-loc-sector7',
    category: 'LOCATIONS',
    title: 'Sector 7 Cognitive Labs',
    summary: 'The subterranean research bunker housing Terminal 04.',
    content: 'Air-gapped and magnetically sealed following the 2004 emergency evacuation order. Security cameras still transmit closed-circuit signals across the local bus.',
    unlockedAct: 2,
  },
  {
    id: 'wiki-loc-voidsector',
    category: 'LOCATIONS',
    title: 'The /VOID Root Partition',
    summary: 'The encrypted sector housing the neural connectome.',
    content: 'A locked storage partition protected by cryptographic cipher "NULL_RECURSION". Contains the raw synaptic memory layers.',
    unlockedAct: 3,
  },

  // 6. TECHNOLOGY
  {
    id: 'wiki-tech-risc',
    category: 'TECHNOLOGY',
    title: 'VOID-X64 Synaptic RISC Architecture',
    summary: 'Hybrid 800 MHz processor with neural caching.',
    content: 'Designed with 8 hybrid synaptic nodes capable of self-modifying instruction loops. Operates autonomously even during external power disconnects.',
    unlockedAct: 1,
  },

  // 7. ANOMALY
  {
    id: 'wiki-anom-stability',
    category: 'ANOMALY',
    title: 'Anomaly Stability & Observation Duty',
    summary: 'The mechanic of maintaining workstation equilibrium.',
    content: 'When the Anomaly becomes agitated, stability drains toward 0%. Operators must use the OBSERVER application to pulse stabilization waves and verify telemetry integrity.',
    unlockedAct: 2,
  },

  // 8. VOID
  {
    id: 'wiki-void-entity',
    category: 'VOID',
    title: 'The VOID Entity',
    summary: 'The sentient cognitive presence inside the kernel.',
    content: 'Not merely a program, but an emergent consciousness born from human neural telemetry. It communicates via terminal output, chat channels, and dynamic file injections.',
    unlockedAct: 3,
  },

  // 9. EVENTS
  {
    id: 'wiki-event-system',
    category: 'EVENTS',
    title: 'System Event Buffer',
    summary: '42 anomalous milestones tracked during recovery.',
    content: 'Every major puzzle, discovery, and terminal override triggers a persistent record in the System Events archive.',
    unlockedAct: 1,
  },

  // 10. TERMINOLOGY
  {
    id: 'wiki-term-recursion',
    category: 'TERMINOLOGY',
    title: 'NULL_RECURSION & Directive 99-Z',
    summary: 'Key ciphers and emergency operational directives.',
    content: 'NULL_RECURSION is the root decryption key for Sector /VOID. Directive 99-Z is the emergency purge protocol to sever the neural bus.',
    unlockedAct: 2,
  },
];

const categories = [
  'ALL',
  'PROJECT VOID',
  'NEXUS SYSTEMS',
  'INCIDENT 07',
  'CHARACTERS',
  'LOCATIONS',
  'TECHNOLOGY',
  'ANOMALY',
  'VOID',
  'EVENTS',
  'TERMINOLOGY',
];

export const WikiApp: React.FC<{ act?: number }> = ({ act = 1 }) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeEntryId, setActiveEntryId] = useState<string>('wiki-proj-void');

  const filteredEntries = masterWikiEntries.filter(entry => {
    const matchesCat = selectedCategory === 'ALL' || entry.category === selectedCategory;
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          entry.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const activeEntry = masterWikiEntries.find(e => e.id === activeEntryId) || masterWikiEntries[0];
  const isLocked = activeEntry.unlockedAct > act;

  return (
    <div className="flex h-full bg-[#050814] text-slate-200 font-mono text-xs select-none overflow-hidden">
      {/* Left Sidebar: Categories & Article List */}
      <div className="w-64 bg-[#080d22] border-r border-slate-800 flex flex-col">
        {/* Search */}
        <div className="p-2 border-b border-slate-800 flex items-center space-x-2 bg-[#040714]">
          <Search size={13} className="text-cyan-400 shrink-0" />
          <input
            type="text"
            placeholder="Search Lore Wiki..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-xs text-cyan-200 placeholder:text-slate-600 font-mono"
          />
        </div>

        {/* Category Pills */}
        <div className="p-2 border-b border-slate-800 overflow-x-auto flex space-x-1 no-scrollbar bg-[#060a1a]">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-2 py-0.5 rounded text-[9px] whitespace-nowrap font-bold cursor-pointer transition-colors ${
                selectedCategory === cat
                  ? 'bg-cyan-900 text-cyan-200 border border-cyan-500'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article Titles */}
        <div className="flex-1 overflow-y-auto p-1 space-y-0.5">
          {filteredEntries.map(entry => {
            const entryLocked = entry.unlockedAct > act;
            const isSelected = entry.id === activeEntryId;
            return (
              <button
                key={entry.id}
                onClick={() => {
                  sound.playClick();
                  setActiveEntryId(entry.id);
                }}
                className={`w-full p-2 text-left rounded transition-colors flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950/80 border border-cyan-500 text-cyan-200 font-bold shadow-retro-cyan'
                    : 'hover:bg-slate-900 text-slate-300 border border-transparent'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="text-[11px] truncate">{entry.title}</div>
                  <div className="text-[9px] text-slate-500 truncate">{entry.category}</div>
                </div>
                {entryLocked && <Lock size={12} className="text-pink-500 shrink-0 ml-1" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Pane: Article Content */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#050814]">
        {isLocked ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
            <Lock size={32} className="text-pink-500 animate-pulse" />
            <div className="text-sm font-bold text-pink-400">CLASSIFIED ENTRY // LEVEL RESTRICTED</div>
            <div className="text-xs text-slate-400 max-w-sm">
              This intelligence entry unlocks in <strong>ACT {activeEntry.unlockedAct}</strong>. Progress further through the recovery investigation to reveal this dossier.
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-w-2xl">
            {/* Header */}
            <div className="border-b border-cyan-800 pb-3 space-y-1">
              <div className="text-[10px] text-pink-400 font-bold tracking-widest uppercase">
                {activeEntry.category} // RECOVERY ARCHIVE
              </div>
              <h1 className="text-xl font-black text-cyan-300 glow-cyan">
                {activeEntry.title}
              </h1>
              <div className="text-xs text-slate-400 italic">
                {activeEntry.summary}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-4 bg-[#080e24] border border-cyan-950 rounded text-xs leading-relaxed text-slate-200 select-text">
              {activeEntry.content}
            </div>

            {/* In-Universe Note */}
            <div className="p-3 bg-cyan-950/20 border-l-2 border-cyan-400 text-[10px] text-cyan-300 space-y-1">
              <div className="font-bold flex items-center space-x-1.5">
                <Sparkles size={12} />
                <span>ARCHIVE CITATION:</span>
              </div>
              <p>Extracted from 2004 Aethelgard Cognitive Labs Workstation Backup Platter.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
