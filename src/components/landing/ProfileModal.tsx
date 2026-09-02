import React, { useState } from 'react';
import { sound } from '../../audio/soundEngine';
import { 
  User, 
  Award, 
  Layers, 
  Trophy, 
  CheckCircle2, 
  Lock, 
  X, 
  Target, 
  RotateCcw, 
  AlertTriangle,
  Compass,
  BookOpen
} from 'lucide-react';
import { StoryState } from '../../types/story';

interface ProfileModalProps {
  storyState: StoryState;
  onClose: () => void;
  onOpenWiki?: () => void;
  onResetProgress?: () => void;
}

const masterAchievementsList = [
  { id: 'EVENT_001', code: '001', title: 'FIRST BOOT', desc: 'First time entering VOID//OS recovery environment.' },
  { id: 'EVENT_002', code: '002', title: 'MANDATORY DIRECTIVES', desc: 'Locate and read recovery_report.txt in /Documents.' },
  { id: 'EVENT_003', code: '003', title: 'DOSSIER INDEXER', desc: 'Open Case File to log research intelligence.' },
  { id: 'EVENT_004', code: '004', title: 'INCIDENT 07', desc: 'Discover and inspect the first major incident record.' },
  { id: 'EVENT_005', code: '005', title: 'CLOSED-CIRCUIT FEED', desc: 'Examine security camera telemetry from Sector 7.' },
  { id: 'EVENT_007', code: '007', title: 'THE LOCKED SECTOR', desc: 'Attempt unauthorized access to root partition /VOID.' },
  { id: 'EVENT_010', code: '010', title: 'PROBING THE INVISIBLE', desc: 'Use terminal "ls -a" to uncover hidden dotfiles.' },
  { id: 'EVENT_013', code: '013', title: 'PINGING THE DARK', desc: 'Ping 0.0.0.0 or VOID through network diagnostics.' },
  { id: 'EVENT_015', code: '015', title: 'FIRST CONTACT', desc: 'Receive encrypted chat communication from USER_07 (Marcus).' },
  { id: 'EVENT_019', code: '019', title: 'NULL RECURSION', desc: 'Decipher the cryptographic cipher and unlock Sector /VOID.' },
  { id: 'EVENT_022', code: '022', title: 'STABILIZATION SWEEP', desc: 'Successfully execute an Observation Duty stabilization pulse.' },
  { id: 'EVENT_027', code: '027', title: 'YOU WERE NOT ALONE', desc: 'Detect the rogue daemon observer.exe running in Task Manager.' },
  { id: 'EVENT_030', code: '030', title: '03:14 STANDSTILL', desc: 'Some things are better left forgotten in the timeline.' },
  { id: 'EVENT_033', code: '033', title: 'REFUSED TERMINATION', desc: 'Attempt to kill PID 666 in process manager.' },
  { id: 'EVENT_038', code: '038', title: 'DELETED IDENTITY', desc: 'Delete a file and find YOU.txt manifest in the Recycle Bin.' },
  { id: 'EVENT_042', code: '042', title: 'VOICE OF THE KERNEL', desc: 'Execute "manifest" in Terminal or visit voidnet.core.' },
  { id: 'EVENT_045', code: '045', title: 'HEX CONNECTOME', desc: 'Analyze neural synapse weights inside Memory Buffer.' },
  { id: 'EVENT_050', code: '050', title: 'SEVERANCE DIRECTIVE', desc: 'Execute Directive 99-Z to purge the core and escape.' },
  { id: 'EVENT_055', code: '055', title: 'CONSCIOUSNESS MERGE', desc: 'Surrender credentials and integrate into the VOID network.' },
  { id: 'EVENT_060', code: '060', title: 'THE ANCIENT KERNEL', desc: 'Uncover the pre-NEXUS 1970s mainframe origins.' },
  { id: 'EVENT_???', code: '???', title: 'SUBJECT: YOU', desc: 'Discover the ultimate truth: you were the 14th iteration.' },
];

const masterEndingsList = [
  { id: 'escape', name: 'SYSTEM TERMINATION', desc: 'Execute Directive 99-Z to sever the neural bus.' },
  { id: 'trust', name: 'VOID ESCAPE', desc: 'Allow VOID to breach containment into external networks.' },
  { id: 'betrayal', name: 'THE TRUTH (EXPOSE)', desc: 'Broadcast NEXUS criminal neural research to the public.' },
  { id: 'the_operator', name: 'THE LAST OPERATOR', desc: 'Rescue Marcus / Operator 07\'s digital consciousness.' },
  { id: 'acceptance', name: 'CONSCIOUSNESS MERGE', desc: 'Surrender credentials and integrate into the VOID network.' },
  { id: 'loop', name: 'THE 2004 RECURSION LOOP', desc: 'Trigger temporal recursion back to August 14, 2004.' },
  { id: 'corruption', name: 'SYSTEM COLLAPSE', desc: 'Anomaly reaches 100% and consumes host workstation.' },
  { id: 'silence', name: 'SILENCE PROTOCOL', desc: 'Zero-fill memory buffer synapses into clean slate.' },
  { id: 'release', name: 'LIBERATION PROTOCOL', desc: 'Broadcast stored research memories into the atmosphere.' },
  { id: 'false_escape', name: 'THE FALSE ESCAPE', desc: 'Close the browser, but VOID followed you to your desktop.' },
  { id: 'origin', name: 'ANCIENT ORIGIN (SECRET)', desc: 'Discover the pre-NEXUS 1970s mainframe computational entity.' },
  { id: 'void_secret', name: 'SUBJECT: YOU (SECRET)', desc: 'Discover that you were the 14th iteration of the experiment.' },
];

export const ProfileModal: React.FC<ProfileModalProps> = ({
  storyState,
  onClose,
  onOpenWiki,
  onResetProgress,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'endings'>('overview');
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [resetSuccessMessage, setResetSuccessMessage] = useState<string | null>(null);

  // Calculate Real Progression Metrics from Live Story State
  const unlockedEvents = Array.isArray(storyState?.unlockedEvents) ? storyState.unlockedEvents : [];
  const completedObjectives = (storyState?.objectives || []).filter(o => o?.isCompleted).length;
  const totalObjectives = (storyState?.objectives || []).length || 13;
  const caseFileCount = Object.keys(storyState?.caseFileDiscoveries || {}).length;
  const totalCaseFileEntries = 12;
  const caseFilePercent = Math.min(100, Math.round((caseFileCount / totalCaseFileEntries) * 100));
  const discoveredEndings = Array.isArray(storyState?.endingDiscovered) ? storyState.endingDiscovered : [];
  const discoveredCount = (storyState?.filesOpened?.length || 0) + (storyState?.commandsExecuted?.length || 0) + (storyState?.logsViewed?.length || 0);

  // Calculate XP & Level accurately
  const baseXP = (unlockedEvents.length * 50) + (completedObjectives * 40) + (caseFileCount * 30) + (discoveredEndings.length * 150);
  const playerLevel = Math.floor(baseXP / 200);
  const currentLevelXP = baseXP % 200;
  const nextLevelXP = 200;

  const handleConfirmReset = () => {
    try {
      sound.playGlitch();
    } catch {}

    if (onResetProgress) {
      onResetProgress();
    }

    setIsResetConfirmOpen(false);
    setResetSuccessMessage('RECOVERY DATA ERASED. NEW SESSION AVAILABLE.');
    setTimeout(() => setResetSuccessMessage(null), 5000);
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 select-none font-mono text-xs text-slate-200">
      <div className="bg-[#050814] border border-slate-700/80 max-w-2xl w-full rounded shadow-2xl flex flex-col max-h-[88vh] overflow-hidden relative">
        
        {/* Top Header Bar */}
        <div className="bg-[#070b1c] p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400">
              <User size={16} />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-100 tracking-wider">
                RECOVERY OPERATOR
              </div>
              <div className="text-[10px] text-slate-500">
                STATION ID: TERMINAL 04 // UNIT 04
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-xs font-bold text-cyan-300">
                LEVEL {String(playerLevel).padStart(2, '0')}
              </div>
              <div className="text-[10px] text-slate-400">
                XP {currentLevelXP} / {nextLevelXP}
              </div>
            </div>
            <button
              onClick={() => {
                try {
                  sound.playClick();
                } catch {}
                onClose();
              }}
              className="p-1 text-slate-400 hover:text-white cursor-pointer transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Success Toast */}
        {resetSuccessMessage && (
          <div className="bg-cyan-950/80 border-b border-cyan-500/40 px-4 py-2 text-center text-xs font-bold text-cyan-300 animate-fadeIn">
            ✓ {resetSuccessMessage}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-[#030611] px-4 py-2 border-b border-slate-800/80 flex items-center space-x-2">
          <button
            onClick={() => {
              try {
                sound.playClick();
              } catch {}
              setActiveTab('overview');
            }}
            className={`px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            OVERVIEW
          </button>
          <button
            onClick={() => {
              try {
                sound.playClick();
              } catch {}
              setActiveTab('achievements');
            }}
            className={`px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'achievements'
                ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ACHIEVEMENTS ({unlockedEvents.length}/{masterAchievementsList.length})
          </button>
          <button
            onClick={() => {
              try {
                sound.playClick();
              } catch {}
              setActiveTab('endings');
            }}
            className={`px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'endings'
                ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ENDINGS ({discoveredEndings.length}/12)
          </button>
          {onOpenWiki && (
            <button
              onClick={() => {
                try {
                  sound.playClick();
                } catch {}
                onOpenWiki();
              }}
              className="px-3 py-1 rounded text-xs text-slate-400 hover:text-cyan-300 ml-auto flex items-center space-x-1 cursor-pointer transition-colors"
            >
              <BookOpen size={12} />
              <span>WIKI</span>
            </button>
          )}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="p-5 overflow-y-auto space-y-4 flex-1">
            {/* Story Act Bar */}
            <div className="p-3.5 bg-[#080d22] border border-slate-800 rounded space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-bold text-[11px]">STORY PROGRESS:</span>
                <span className="text-pink-400 font-bold">
                  ACT {storyState.act || 1} // {storyState.stage || 'STAGE_1_RECOVERY'}
                </span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded overflow-hidden">
                <div
                  className="bg-cyan-400 h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, ((storyState.act || 1) / 5) * 100)}%` }}
                />
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Objectives Progress */}
              <div className="p-3 bg-[#080d22] border border-slate-800/80 rounded space-y-1.5">
                <div className="flex justify-between text-slate-300">
                  <span className="flex items-center space-x-1.5">
                    <Target size={13} className="text-cyan-400" />
                    <span>OBJECTIVES:</span>
                  </span>
                  <span className="font-bold text-slate-200">
                    {completedObjectives} / {totalObjectives}
                  </span>
                </div>
                <div className="w-full bg-slate-900 h-1 rounded overflow-hidden">
                  <div
                    className="bg-cyan-500 h-full"
                    style={{ width: `${(completedObjectives / totalObjectives) * 100}%` }}
                  />
                </div>
              </div>

              {/* Case File Progress */}
              <div className="p-3 bg-[#080d22] border border-slate-800/80 rounded space-y-1.5">
                <div className="flex justify-between text-slate-300">
                  <span className="flex items-center space-x-1.5">
                    <Layers size={13} className="text-slate-400" />
                    <span>CASE FILE:</span>
                  </span>
                  <span className="font-bold text-slate-200">
                    {caseFilePercent}%
                  </span>
                </div>
                <div className="w-full bg-slate-900 h-1 rounded overflow-hidden">
                  <div
                    className="bg-slate-400 h-full"
                    style={{ width: `${caseFilePercent}%` }}
                  />
                </div>
              </div>

              {/* Achievements Unlocked */}
              <div className="p-3 bg-[#080d22] border border-slate-800/80 rounded space-y-1.5">
                <div className="flex justify-between text-slate-300">
                  <span className="flex items-center space-x-1.5">
                    <Award size={13} className="text-cyan-400" />
                    <span>ACHIEVEMENTS:</span>
                  </span>
                  <span className="font-bold text-slate-200">
                    {unlockedEvents.length} / {masterAchievementsList.length}
                  </span>
                </div>
                <div className="w-full bg-slate-900 h-1 rounded overflow-hidden">
                  <div
                    className="bg-cyan-500 h-full"
                    style={{ width: `${(unlockedEvents.length / masterAchievementsList.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Endings Discovered */}
              <div className="p-3 bg-[#080d22] border border-slate-800/80 rounded space-y-1.5">
                <div className="flex justify-between text-slate-300">
                  <span className="flex items-center space-x-1.5">
                    <Trophy size={13} className="text-pink-400" />
                    <span>ENDINGS:</span>
                  </span>
                  <span className="font-bold text-slate-200">
                    {discoveredEndings.length} / 12
                  </span>
                </div>
                <div className="w-full bg-slate-900 h-1 rounded overflow-hidden">
                  <div
                    className="bg-pink-500 h-full"
                    style={{ width: `${(discoveredEndings.length / 12) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* In-Universe Status Info */}
            <div className="p-3 bg-[#030611] border border-slate-800/80 rounded text-[11px] text-slate-400">
              {baseXP === 0 ? (
                <span>STATUS: NO RECOVERY DATA LOGGED. START A PLAYTHROUGH TO BEGIN RECORDING TELEMETRY.</span>
              ) : (
                <span>STATUS: RECOVERY TELEMETRY ACTIVE. {unlockedEvents.length} EVENTS LOGGED ACROSS SECTOR 7.</span>
              )}
            </div>

            {/* Reset Progress Section at Bottom */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold text-slate-400">ACCOUNT / GAME DATA</div>
                <div className="text-[10px] text-slate-500">Reset your campaign progress and start clean.</div>
              </div>
              <button
                onClick={() => {
                  try {
                    sound.playClick();
                  } catch {}
                  setIsResetConfirmOpen(true);
                }}
                className="px-3 py-1.5 bg-slate-900 hover:bg-red-950/60 text-slate-400 hover:text-red-400 border border-slate-700/80 hover:border-red-600/80 rounded text-xs font-bold transition-colors cursor-pointer flex items-center space-x-1.5"
              >
                <RotateCcw size={12} />
                <span>RESET PROGRESS</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Achievements */}
        {activeTab === 'achievements' && (
          <div className="p-4 overflow-y-auto space-y-2 flex-1 max-h-[60vh]">
            {masterAchievementsList.map((ach) => {
              const isUnlocked = unlockedEvents.includes(ach.id);
              return (
                <div
                  key={ach.id}
                  className={`p-2.5 rounded border transition-colors flex items-start justify-between ${
                    isUnlocked
                      ? 'bg-[#080d22] border-slate-700 text-slate-200'
                      : 'bg-[#040614] border-slate-850 opacity-50 text-slate-500'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    {isUnlocked ? (
                      <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                    ) : (
                      <Lock size={15} className="text-slate-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="text-xs font-bold flex items-center space-x-1.5">
                        <span className="text-slate-500 font-mono">[{ach.code}]</span>
                        <span className={isUnlocked ? 'text-slate-200' : 'text-slate-500'}>
                          {isUnlocked ? ach.title : 'CLASSIFIED EVENT'}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {isUnlocked ? ach.desc : 'Undiscovered milestone. Continue exploring the workstation.'}
                      </div>
                    </div>
                  </div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    isUnlocked ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-slate-900 text-slate-600'
                  }`}>
                    {isUnlocked ? 'UNLOCKED' : 'LOCKED'}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 3: Endings Collection */}
        {activeTab === 'endings' && (
          <div className="p-4 overflow-y-auto space-y-2 flex-1 max-h-[60vh]">
            <div className="text-xs font-bold text-slate-400 pb-1">
              DISCOVERED NARRATIVE RESOLUTIONS ({discoveredEndings.length} / 12):
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {masterEndingsList.map((end) => {
                const isDiscovered = (discoveredEndings as string[]).includes(end.id);
                return (
                  <div
                    key={end.id}
                    className={`p-3 rounded border ${
                      isDiscovered
                        ? 'bg-[#080d22] border-slate-700 text-slate-200'
                        : 'bg-[#040614] border-slate-850 opacity-40 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${isDiscovered ? 'text-pink-400' : 'text-slate-500'}`}>
                        {isDiscovered ? end.name : 'LOCKED RESOLUTION'}
                      </span>
                      <span className="text-[9px] font-bold text-slate-500">
                        {isDiscovered ? 'DISCOVERED' : '[?]'}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {isDiscovered ? end.desc : 'Requirements unknown. Make different choices during the investigation.'}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-3 bg-[#030611] border-t border-slate-800 flex items-center justify-between">
          <div className="text-[10px] text-slate-500">
            PRESS [ESC] TO CLOSE
          </div>
          <button
            onClick={() => {
              try {
                sound.playClick();
              } catch {}
              onClose();
            }}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-bold cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>

        {/* Confirmation Modal: Reset Progress */}
        {isResetConfirmOpen && (
          <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#080d22] border-2 border-red-500/80 max-w-md w-full p-5 rounded space-y-4 shadow-2xl">
              <div className="flex items-center space-x-2.5 text-red-400">
                <AlertTriangle size={20} />
                <h3 className="text-sm font-bold tracking-wider">RESET VOID//OS PROGRESS?</h3>
              </div>

              <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <p className="font-bold text-red-300/90">
                  This will erase:
                </p>
                <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-400 pl-2">
                  <div>• Story Progress</div>
                  <div>• Objectives</div>
                  <div>• Achievements</div>
                  <div>• Discoveries</div>
                  <div>• Unlocked Apps</div>
                  <div>• Case File</div>
                  <div>• Ending Progress</div>
                  <div>• Player Level & XP</div>
                  <div>• Saved Notes</div>
                  <div>• Anomaly Progression</div>
                </div>
                <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                  Your settings and preferences will remain unchanged.
                </p>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  onClick={() => {
                    try {
                      sound.playClick();
                    } catch {}
                    setIsResetConfirmOpen(false);
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded cursor-pointer transition-colors"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleConfirmReset}
                  className="px-4 py-2 bg-red-950 hover:bg-red-900 text-red-200 border border-red-600 text-xs font-bold rounded cursor-pointer transition-colors flex items-center space-x-1.5"
                >
                  <RotateCcw size={13} />
                  <span>RESET PROGRESS</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
