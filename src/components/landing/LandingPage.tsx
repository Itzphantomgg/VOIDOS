import React, { useState } from 'react';
import { sound } from '../../audio/soundEngine';
import { 
  Play, 
  ExternalLink,
  Mail,
  User,
  BookOpen,
  ChevronDown,
  Layers,
  Award,
  Trophy,
  Target,
  RotateCcw
} from 'lucide-react';
import { ProfileModal } from './ProfileModal';
import { WikiModal } from './WikiModal';
import { BackgroundParticles } from './BackgroundParticles';
import { loadGameState } from '../../state/persistence';
import { initialStoryState } from '../../state/storyStore';
import { StoryState } from '../../types/story';

interface LandingPageProps {
  onLaunchGame: () => void;
  storyState?: StoryState;
  onResetProgress?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  onLaunchGame, 
  storyState,
  onResetProgress 
}) => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchMessage, setLaunchMessage] = useState('INITIALIZING RECOVERY ENVIRONMENT...');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isWikiOpen, setIsWikiOpen] = useState(false);

  // Active story metrics
  const activeStory = storyState || loadGameState()?.story || initialStoryState;

  const handlePlayClick = async () => {
    try {
      sound.playClick();
    } catch {}
    setIsLaunching(true);
    setLaunchMessage('REQUESTING FULLSCREEN RECOVERY ENVIRONMENT...');

    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen().catch(() => {});
      }
    } catch {}

    setTimeout(() => {
      setLaunchMessage('FULLSCREEN INITIALIZED // BOOTING KERNEL...');
    }, 400);

    setTimeout(() => {
      onLaunchGame();
    }, 900);
  };

  const scrollToSection = (id: string) => {
    try {
      sound.playClick();
    } catch {}
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const caseFileCount = Object.keys(activeStory.caseFileDiscoveries || {}).length;
  const caseFilePercent = Math.min(100, Math.round((caseFileCount / 12) * 100));
  const completedObjectives = (activeStory.objectives || []).filter(o => o?.isCompleted).length;
  const totalObjectives = (activeStory.objectives || []).length || 13;
  const unlockedAchievements = (activeStory.unlockedEvents || []).length;
  const discoveredEndings = (activeStory.endingDiscovered || []).length;

  return (
    <div className="min-h-screen bg-[#030611] text-slate-300 font-mono select-none overflow-x-hidden relative flex flex-col">
      {/* Background Particles & Scanline Texture */}
      <BackgroundParticles />

      {/* Top Navigation Bar - Simple & Restrained */}
      <nav className="sticky top-0 z-30 border-b border-slate-800/80 bg-[#040817]/95 backdrop-blur-md px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-5 h-5 bg-cyan-500/10 text-cyan-300 border border-cyan-500/40 flex items-center justify-center font-black text-xs rounded-xs">
            ⬡
          </div>
          <span className="font-bold text-sm tracking-wider text-slate-100">
            VOID<span className="text-pink-400">//</span>OS
          </span>
          <span className="text-[10px] text-slate-500 font-normal ml-1 hidden sm:inline">BUILD v1.3.2</span>
        </div>

        {/* Nav Links: VOID//OS | ABOUT | STORY | WIKI | PROFILE | PLAY */}
        <div className="hidden md:flex items-center space-x-6 text-xs text-slate-400">
          <button onClick={() => scrollToSection('about')} className="hover:text-cyan-300 transition-colors cursor-pointer">
            ABOUT
          </button>
          <button onClick={() => scrollToSection('story')} className="hover:text-cyan-300 transition-colors cursor-pointer">
            STORY
          </button>
          <button 
            onClick={() => {
              try { sound.playClick(); } catch {}
              setIsWikiOpen(true);
            }} 
            className="hover:text-cyan-300 transition-colors cursor-pointer flex items-center space-x-1"
          >
            <BookOpen size={13} />
            <span>WIKI</span>
          </button>
          <button 
            onClick={() => {
              try { sound.playClick(); } catch {}
              setIsProfileOpen(true);
            }} 
            className="hover:text-cyan-300 transition-colors cursor-pointer flex items-center space-x-1"
          >
            <User size={13} />
            <span>PROFILE</span>
          </button>
        </div>

        {/* Nav Launch Button */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              try { sound.playClick(); } catch {}
              setIsProfileOpen(true);
            }}
            className="md:hidden p-1.5 bg-slate-900 border border-slate-700 text-slate-300 rounded text-xs cursor-pointer"
            title="Profile"
          >
            <User size={14} />
          </button>
          <button
            onClick={handlePlayClick}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 font-bold text-xs rounded border border-cyan-500/60 transition-all cursor-pointer flex items-center space-x-1.5"
          >
            <Play size={12} className="text-cyan-400" />
            <span>PLAY</span>
          </button>
        </div>
      </nav>

      {/* Main Content Container */}
      <div className="relative z-10 flex-1 flex flex-col items-center max-w-3xl w-full mx-auto px-4 sm:px-6">
        
        {/* =========================================================================
            SCREEN 01: HERO (CLEAN, DARK, PERFECTLY CENTERED)
           ========================================================================= */}
        <section className="min-h-[82vh] w-full flex flex-col items-center justify-center text-center space-y-6 py-12">
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-6xl font-black tracking-widest text-slate-100">
              VOID<span className="text-pink-500">//</span>OS
            </h1>
            <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-cyan-400/90 uppercase">
              An Operating System That Remembers.
            </p>
          </div>

          <div className="max-w-md text-xs text-slate-400 leading-relaxed space-y-1.5 py-2">
            <p>
              A recovery package was discovered inside an abandoned NEXUS SYSTEMS facility.
            </p>
            <p>
              The system was shut down in 2004.
            </p>
            <p className="text-slate-300 font-medium pt-1">
              It was not supposed to boot again.
            </p>
          </div>

          {/* Primary CTA Button */}
          <div className="pt-2">
            <button
              onClick={handlePlayClick}
              className="px-8 py-3 bg-[#080d22] hover:bg-[#0c1433] text-cyan-300 font-bold text-xs tracking-widest border border-cyan-500/70 hover:border-cyan-400 rounded transition-all cursor-pointer flex items-center space-x-2"
            >
              <Play size={14} className="text-cyan-400" />
              <span>PLAY GAME</span>
            </button>
          </div>

          {/* Subtle Scroll Down Indicator */}
          <div 
            onClick={() => scrollToSection('about')}
            className="pt-8 text-slate-600 hover:text-slate-400 transition-colors cursor-pointer flex flex-col items-center space-y-1 text-[10px]"
          >
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown size={13} className="animate-bounce" />
          </div>
        </section>

        {/* Narrative Flow Sections */}
        <div className="w-full space-y-20 pb-24">

          {/* =========================================================================
              SCREEN 02: WHAT IS VOID//OS?
             ========================================================================= */}
          <section id="about" className="space-y-3 scroll-mt-20">
            <div className="text-[11px] font-bold text-slate-400 tracking-wider uppercase border-b border-slate-800 pb-1.5">
              01 // WHAT IS VOID//OS?
            </div>
            <div className="p-5 bg-[#050814] border border-slate-800/90 rounded space-y-2.5 text-xs leading-relaxed text-slate-300">
              <p>
                <strong>VOID//OS</strong> is an interactive mystery played entirely through a simulated retro operating system.
              </p>
              <p className="text-slate-400">
                You boot into an abandoned 2004 workstation: browsing files, running diagnostic commands in the terminal, reading personnel communications, and reconstructing what occurred inside the facility.
              </p>
              <p className="text-slate-400">
                As you dig deeper, the computer begins responding to your actions in real time.
              </p>
            </div>
          </section>

          {/* =========================================================================
              SCREEN 03: THE INCIDENT
             ========================================================================= */}
          <section id="story" className="space-y-3 scroll-mt-20">
            <div className="text-[11px] font-bold text-pink-400 tracking-wider uppercase border-b border-slate-800 pb-1.5">
              02 // THE INCIDENT
            </div>
            <div className="p-5 bg-[#050814] border border-slate-800/90 rounded space-y-3 text-xs leading-relaxed text-slate-300">
              <p>
                In 2004, NEXUS SYSTEMS developed VOID//OS as an adaptive cognitive kernel designed to learn from human operator input.
              </p>
              <div className="p-3 bg-[#030611] border-l-2 border-pink-500 rounded-r text-[11px] text-pink-300/90">
                <strong>AUGUST 14, 2004 // 03:14 AM:</strong> An unlogged anomaly occurred during feedback trials. The facility was evacuated and sealed. VOID was officially terminated.
              </div>
              <p className="text-slate-400">
                Years later, an intact recovery package was retrieved. You are the recovery technician assigned to inspect the machine.
              </p>
            </div>
          </section>

          {/* =========================================================================
              SCREEN 04: YOUR ROLE
             ========================================================================= */}
          <section className="space-y-3 scroll-mt-20">
            <div className="text-[11px] font-bold text-cyan-400 tracking-wider uppercase border-b border-slate-800 pb-1.5">
              03 // YOUR ROLE
            </div>
            <div className="p-5 bg-[#050814] border border-slate-800/90 rounded space-y-3 text-xs">
              <div className="text-slate-200 font-bold">RECOVERY OPERATOR ASSIGNMENT:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400 text-[11px]">
                <div className="p-2.5 bg-[#080d22] border border-slate-800/80 rounded">
                  <strong className="text-slate-200">01.</strong> Inspect workstation drives.
                </div>
                <div className="p-2.5 bg-[#080d22] border border-slate-800/80 rounded">
                  <strong className="text-slate-200">02.</strong> Recover classified archives.
                </div>
                <div className="p-2.5 bg-[#080d22] border border-slate-800/80 rounded">
                  <strong className="text-slate-200">03.</strong> Investigate Incident 07.
                </div>
                <div className="p-2.5 bg-[#080d22] border border-slate-800/80 rounded">
                  <strong className="text-slate-200">04.</strong> Determine what happened at 03:14.
                </div>
                <div className="p-2.5 bg-[#080d22] border border-slate-800/80 rounded">
                  <strong className="text-slate-200">05.</strong> Locate the /VOID core partition.
                </div>
                <div className="p-2.5 bg-[#080d22] border border-slate-800/80 rounded">
                  <strong className="text-slate-200">06.</strong> Decide the system's fate.
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SCREEN 05: HOW TO PLAY
             ========================================================================= */}
          <section className="space-y-3 scroll-mt-20">
            <div className="text-[11px] font-bold text-slate-400 tracking-wider uppercase border-b border-slate-800 pb-1.5">
              04 // HOW TO PLAY
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-[#050814] border border-slate-800/90 rounded space-y-1">
                <div className="font-bold text-cyan-300">EXPLORE</div>
                <p className="text-[11px] text-slate-400">Search file trees, examine hidden dotfiles, and inspect system logs.</p>
              </div>
              <div className="p-3.5 bg-[#050814] border border-slate-800/90 rounded space-y-1">
                <div className="font-bold text-cyan-300">INVESTIGATE</div>
                <p className="text-[11px] text-slate-400">Use terminal diagnostics, chat transcripts, and your Case File journal.</p>
              </div>
              <div className="p-3.5 bg-[#050814] border border-slate-800/90 rounded space-y-1">
                <div className="font-bold text-pink-300">OBSERVE</div>
                <p className="text-[11px] text-slate-400">Perform Observation Duty to maintain stability as anomalies occur.</p>
              </div>
              <div className="p-3.5 bg-[#050814] border border-slate-800/90 rounded space-y-1">
                <div className="font-bold text-slate-200">DISCOVER</div>
                <p className="text-[11px] text-slate-400">Unlock deeper partitions and reveal the truth behind Project VOID.</p>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SCREEN 06: THE ANOMALY
             ========================================================================= */}
          <section className="space-y-3 scroll-mt-20">
            <div className="text-[11px] font-bold text-pink-400 tracking-wider uppercase border-b border-slate-800 pb-1.5">
              05 // THE ANOMALY
            </div>
            <div className="p-5 bg-[#050814] border border-slate-800/90 rounded space-y-3 text-xs leading-relaxed text-slate-300">
              <p>
                In Act III, the computer's background cognitive daemon awakens. System stability begins to drain over time.
              </p>
              <p className="text-slate-400">
                Operators must use the <strong>OBSERVER</strong> application to perform a multi-step signal sweep and telemetry confirmation to restore stability and prevent system collapse.
              </p>
            </div>
          </section>

          {/* =========================================================================
              SCREEN 07: OPERATOR PROFILE & TELEMETRY
             ========================================================================= */}
          <section id="profile" className="space-y-3 scroll-mt-20">
            <div className="text-[11px] font-bold text-cyan-400 tracking-wider uppercase border-b border-slate-800 pb-1.5">
              06 // OPERATOR PROFILE & PROGRESS
            </div>
            <div className="p-5 bg-[#050814] border border-slate-800/90 rounded space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-slate-200 font-bold">RECOVERY TELEMETRY DOSSIER</div>
                  <div className="text-[11px] text-slate-400">
                    Live progression tracker with achievements and branching endings.
                  </div>
                </div>
                <button
                  onClick={() => {
                    try { sound.playClick(); } catch {}
                    setIsProfileOpen(true);
                  }}
                  className="px-3.5 py-1.5 bg-[#080d22] hover:bg-[#0c1433] text-cyan-300 border border-slate-700 rounded text-xs font-bold flex items-center space-x-1.5 cursor-pointer transition-colors"
                >
                  <User size={13} />
                  <span>VIEW PROFILE</span>
                </button>
              </div>

              {/* Progress Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 bg-[#080d22] border border-slate-800/80 rounded">
                  <div className="text-slate-500 text-[10px]">CURRENT ACT</div>
                  <div className="text-pink-400 font-bold">ACT {activeStory.act || 1}</div>
                </div>
                <div className="p-2.5 bg-[#080d22] border border-slate-800/80 rounded">
                  <div className="text-slate-500 text-[10px]">ACHIEVEMENTS</div>
                  <div className="text-cyan-300 font-bold">{unlockedAchievements} / 42</div>
                </div>
                <div className="p-2.5 bg-[#080d22] border border-slate-800/80 rounded">
                  <div className="text-slate-500 text-[10px]">CASE FILE</div>
                  <div className="text-slate-200 font-bold">{caseFilePercent}%</div>
                </div>
                <div className="p-2.5 bg-[#080d22] border border-slate-800/80 rounded">
                  <div className="text-slate-500 text-[10px]">ENDINGS</div>
                  <div className="text-slate-200 font-bold">{discoveredEndings} / 12</div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SCREEN 08: WIKI OVERVIEW
             ========================================================================= */}
          <section className="space-y-3 scroll-mt-20">
            <div className="text-[11px] font-bold text-slate-400 tracking-wider uppercase border-b border-slate-800 pb-1.5">
              07 // PROJECT VOID WIKI
            </div>
            <div className="p-5 bg-[#050814] border border-slate-800/90 rounded flex items-center justify-between text-xs">
              <div>
                <div className="text-slate-200 font-bold">LORE ENCYCLOPEDIA</div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Five structured archives: PROJECT, PEOPLE, EVENTS, SYSTEMS, ANOMALY.
                </p>
              </div>
              <button
                onClick={() => {
                  try { sound.playClick(); } catch {}
                  setIsWikiOpen(true);
                }}
                className="px-3.5 py-1.5 bg-[#080d22] hover:bg-[#0c1433] text-cyan-300 border border-slate-700 rounded text-xs font-bold flex items-center space-x-1.5 cursor-pointer transition-colors"
              >
                <BookOpen size={13} />
                <span>OPEN WIKI</span>
              </button>
            </div>
          </section>

          {/* =========================================================================
              SCREEN 09: CREDITS & FEEDBACK
             ========================================================================= */}
          <section id="credits" className="space-y-3 scroll-mt-20">
            <div className="text-[11px] font-bold text-slate-400 tracking-wider uppercase border-b border-slate-800 pb-1.5">
              08 // CREDITS & FEEDBACK
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Credits Box */}
              <div className="p-4 bg-[#050814] border border-slate-800/90 rounded space-y-2">
                <div className="text-slate-200 font-bold">VOID//OS</div>
                <p className="text-[11px] text-slate-400">
                  Created and designed by <strong className="text-slate-200">Paarth</strong>.
                </p>
                <a
                  href="https://github.com/Itzphantomgg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-cyan-400 hover:text-cyan-300 text-xs font-bold pt-1"
                >
                  <span>GitHub: Itzphantomgg</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* Feedback Box */}
              <div className="p-4 bg-[#050814] border border-slate-800/90 rounded space-y-2">
                <div className="text-slate-200 font-bold">FEEDBACK</div>
                <p className="text-[11px] text-slate-400">
                  Report issues or submit suggestions:
                </p>
                <a
                  href="mailto:paarth.archive@gmail.com?subject=VOID//OS%20Feedback"
                  className="inline-flex items-center space-x-1.5 text-pink-400 hover:text-pink-300 text-xs font-bold pt-1"
                >
                  <Mail size={12} />
                  <span>paarth.archive@gmail.com</span>
                </a>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SCREEN 10: BOTTOM PLAY CTA
             ========================================================================= */}
          <div className="pt-4 text-center">
            <button
              onClick={handlePlayClick}
              className="px-8 py-3 bg-[#080d22] hover:bg-[#0c1433] text-cyan-300 font-bold text-xs tracking-widest border border-cyan-500/70 hover:border-cyan-400 rounded transition-all cursor-pointer"
            >
              BOOT RECOVERY TERMINAL [v1.3.2]
            </button>
          </div>

        </div>
      </div>

      {/* Profile Modal */}
      {isProfileOpen && (
        <ProfileModal
          storyState={activeStory}
          onClose={() => setIsProfileOpen(false)}
          onOpenWiki={() => {
            setIsProfileOpen(false);
            setIsWikiOpen(true);
          }}
          onResetProgress={onResetProgress}
        />
      )}

      {/* Wiki Modal */}
      {isWikiOpen && (
        <WikiModal
          act={activeStory.act || 1}
          onClose={() => setIsWikiOpen(false)}
        />
      )}

      {/* Fullscreen Transition Overlay */}
      {isLaunching && (
        <div className="fixed inset-0 z-[999999] bg-black flex flex-col items-center justify-center p-6 text-cyan-400 font-mono text-sm select-none">
          <div className="space-y-3 text-center max-w-md">
            <div className="text-xs text-pink-500 font-bold tracking-widest animate-pulse">
              [ INITIALIZING HARDWARE BRIDGE ]
            </div>
            <div className="text-sm sm:text-base font-bold text-cyan-300">
              {launchMessage}
            </div>
            <div className="w-full bg-slate-900 h-1 rounded overflow-hidden mt-2">
              <div className="bg-cyan-400 h-full animate-pulse w-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
