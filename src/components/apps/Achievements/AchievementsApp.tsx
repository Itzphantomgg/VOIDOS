import React from 'react';
import { Award, CheckCircle2, Lock, Sparkles, Target, Trophy } from 'lucide-react';
import { sound } from '../../../audio/soundEngine';

interface Achievement {
  id: string;
  code: string;
  title: string;
  description: string;
  category: 'RECOVERY' | 'INVESTIGATION' | 'DECRYPTION' | 'SURVIVAL' | 'SECRET';
}

const masterAchievements: Achievement[] = [
  { id: 'EVENT_001', code: '001', title: 'FIRST BOOT', description: 'Initialize workstation recovery environment on Terminal 04.', category: 'RECOVERY' },
  { id: 'EVENT_002', code: '002', title: 'MANDATORY DIRECTIVES', description: 'Locate and read recovery_report.txt in /Documents.', category: 'RECOVERY' },
  { id: 'EVENT_003', code: '003', title: 'DOSSIER INDEXER', description: 'Open Case File to log research intelligence.', category: 'INVESTIGATION' },
  { id: 'EVENT_004', code: '004', title: 'THE 03:14 COLLAPSE', description: 'Investigate the August 14, 2004 Incident 07 file.', category: 'INVESTIGATION' },
  { id: 'EVENT_005', code: '005', title: 'CLOSED-CIRCUIT FEED', description: 'Examine security camera telemetry from Sector 7.', category: 'INVESTIGATION' },
  { id: 'EVENT_007', code: '007', title: 'THE LOCKED SECTOR', description: 'Attempt unauthorized access to root partition /VOID.', category: 'DECRYPTION' },
  { id: 'EVENT_010', code: '010', title: 'PROBING THE INVISIBLE', description: 'Use terminal "ls -a" to uncover hidden dotfiles.', category: 'DECRYPTION' },
  { id: 'EVENT_013', code: '013', title: 'PINGING THE DARK', description: 'Ping 0.0.0.0 or VOID through network diagnostics.', category: 'INVESTIGATION' },
  { id: 'EVENT_015', code: '015', title: 'THE OPERATOR GHOST', description: 'Receive encrypted chat communication from USER_07 (Marcus).', category: 'INVESTIGATION' },
  { id: 'EVENT_019', code: '019', title: 'NULL RECURSION', description: 'Decipher the cryptographic cipher and unlock Sector /VOID.', category: 'DECRYPTION' },
  { id: 'EVENT_022', code: '022', title: 'STABILIZATION SWEEP', description: 'Successfully execute an Observation Duty stabilization pulse.', category: 'SURVIVAL' },
  { id: 'EVENT_027', code: '027', title: 'YOU WERE NOT ALONE', description: 'Detect the rogue daemon observer.exe running in Task Manager.', category: 'SURVIVAL' },
  { id: 'EVENT_030', code: '030', title: 'THE CLOCK STANDSTILL', description: 'Witness the system clock freeze at 03:14:29.', category: 'SURVIVAL' },
  { id: 'EVENT_033', code: '033', title: 'REFUSED TERMINATION', description: 'Attempt to kill PID 666 in process manager.', category: 'SURVIVAL' },
  { id: 'EVENT_038', code: '038', title: 'DELETED IDENTITY', description: 'Delete a file and find YOU.txt manifest in the Recycle Bin.', category: 'SECRET' },
  { id: 'EVENT_042', code: '042', title: 'VOICE OF THE KERNEL', description: 'Execute "manifest" in Terminal or visit voidnet.core.', category: 'SECRET' },
  { id: 'EVENT_045', code: '045', title: 'HEX CONNECTOME', description: 'Analyze neural synapse weights inside Memory Buffer.', category: 'INVESTIGATION' },
  { id: 'EVENT_050', code: '050', title: 'SEVERANCE DIRECTIVE', description: 'Execute Directive 99-Z to purge the core and escape.', category: 'RECOVERY' },
  { id: 'EVENT_055', code: '055', title: 'SYNCHRONIZED TRANSCENDENCE', description: 'Merge operator consciousness into the VOID network.', category: 'SECRET' },
  { id: 'EVENT_060', code: '060', title: 'THE ANCIENT KERNEL', description: 'Uncover the pre-NEXUS 1970s mainframe origins.', category: 'SECRET' },
  { id: 'EVENT_???', code: '???', title: 'SUBJECT: YOU', description: 'Discover the ultimate truth: you were the 14th iteration.', category: 'SECRET' },
];

interface AchievementsAppProps {
  unlockedEvents?: string[];
  act?: number;
}

export const AchievementsApp: React.FC<AchievementsAppProps> = ({
  unlockedEvents = [],
  act = 1,
}) => {
  const unlockedCount = masterAchievements.filter(a => unlockedEvents.includes(a.id)).length;
  const totalCount = masterAchievements.length;
  const percentage = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="flex flex-col h-full bg-[#050814] text-slate-200 font-mono text-xs select-none p-4 space-y-4 overflow-y-auto">
      {/* Top Banner */}
      <div className="p-3.5 bg-gradient-to-r from-[#0d2238] via-[#1a1236] to-[#3a0d42] border-2 border-amber-500/80 rounded flex items-center justify-between shadow-2xl">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-amber-950/60 border border-amber-500 rounded">
            <Trophy size={22} className="text-amber-400 animate-pulse" />
          </div>
          <div>
            <div className="text-sm font-bold text-amber-300 tracking-wider">
              SYSTEM EVENTS & DISCOVERY MILESTONES
            </div>
            <div className="text-[10px] text-slate-400">
              RECOVERY TELEMETRY ARCHIVE // BUILD v1.3.0
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-lg font-black text-amber-400 font-mono">
            {unlockedCount} / {totalCount}
          </div>
          <div className="text-[10px] text-slate-400">{percentage}% UNLOCKED</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="p-3 bg-[#080d22] border border-slate-800 rounded space-y-1.5">
        <div className="flex justify-between text-[11px] font-bold text-slate-300">
          <span>INVESTIGATION MILESTONE PROGRESSION</span>
          <span className="text-cyan-300">{percentage}%</span>
        </div>
        <div className="w-full bg-black h-3 rounded border border-slate-800 overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-amber-400 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {masterAchievements.map((item) => {
          const isUnlocked = unlockedEvents.includes(item.id);
          return (
            <div
              key={item.id}
              className={`p-3 rounded border transition-all ${
                isUnlocked
                  ? 'bg-[#091128] border-cyan-500/80 shadow-retro-cyan'
                  : 'bg-[#050814]/80 border-slate-800/80 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {isUnlocked ? (
                    <CheckCircle2 size={16} className="text-green-400 shrink-0" />
                  ) : (
                    <Lock size={16} className="text-slate-600 shrink-0" />
                  )}
                  <div>
                    <span className="text-[10px] text-pink-400 font-bold mr-1.5">
                      [{item.code}]
                    </span>
                    <span className={`font-bold text-xs ${isUnlocked ? 'text-cyan-200' : 'text-slate-500'}`}>
                      {isUnlocked ? item.title : 'CLASSIFIED MILESTONE'}
                    </span>
                  </div>
                </div>
                <span className="px-1.5 py-0.2 bg-slate-900 border border-slate-800 text-[9px] text-slate-400 rounded">
                  {item.category}
                </span>
              </div>

              <div className="text-[11px] text-slate-400 mt-1.5 pl-6">
                {isUnlocked ? item.description : 'Undiscovered event. Continue exploring to unlock.'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
