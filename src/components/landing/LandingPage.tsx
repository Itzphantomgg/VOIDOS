import React, { useState } from 'react';
import { sound } from '../../audio/soundEngine';
import { 
  Play, 
  ExternalLink,
  Mail,
  User,
  BookOpen,
  ChevronDown
} from 'lucide-react';
import { ProfileModal } from './ProfileModal';
import { WikiModal } from './WikiModal';
import { loadGameState } from '../../state/persistence';
import { initialStoryState } from '../../state/storyStore';
import { StoryState } from '../../types/story';

interface LandingPageProps {
  onLaunchGame: () => void;
  storyState?: StoryState;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchGame, storyState }) => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchMessage, setLaunchMessage] = useState('REQUESTING RECOVERY ENVIRONMENT...');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isWikiOpen, setIsWikiOpen] = useState(false);

  // Load persistent story state for profile metrics
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

  return (
    <div className="min-h-screen bg-[#030611] text-slate-300 font-mono select-none overflow-x-hidden relative flex flex-col">
      {/* Background Subtle Digital Texture */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Top Navigation Bar - Simple & Restrained */}
      <nav className="sticky top-0 z-30 border-b border-slate-800/80 bg-[#040817]/95 backdrop-blur-md px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-6 h-6 bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 flex items-center justify-center font-black text-xs rounded-xs">
            ⬡
          </div>
          <span className="font-bold text-sm tracking-wider text-slate-100">
            VOID<span className="text-pink-400">//</span>OS
          </span>
          <span className="text-[10px] text-slate-500 font-normal ml-1 hidden sm:inline">BUILD v1.3.0</span>
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
              sound.playClick();
              setIsWikiOpen(true);
            }} 
            className="hover:text-cyan-300 transition-colors cursor-pointer flex items-center space-x-1"
          >
            <BookOpen size={13} />
            <span>WIKI</span>
          </button>
          <button 
            onClick={() => {
              sound.playClick();
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
              sound.playClick();
              setIsProfileOpen(true);
            }}
            className="md:hidden p-1.5 bg-slate-900 border border-slate-700 text-slate-300 rounded text-xs cursor-pointer"
            title="Profile"
          >
            <User size={14} />
          </button>
          <button
            onClick={handlePlayClick}
            className="px-4 py-1.5 bg-cyan-950 hover:bg-cyan-900 text-cyan-200 font-bold text-xs rounded border border-cyan-500 transition-all cursor-pointer flex items-center space-x-1.5"
          >
            <Play size={12} className="text-cyan-400" />
            <span>PLAY</span>
          </button>
        </div>
      </nav>

      {/* Main Content Container */}
      <div className="relative z-10 flex-1 flex flex-col items-center max-w-3xl w-full mx-auto px-4 sm:px-6">
        
        {/* =========================================================================
            SCREEN 01: HERO (EXTREMELY SIMPLE, CLEAN, DE-GLOWED)
           ========================================================================= */}
        <section className="min-h-[82vh] w-full flex flex-col items-center justify-center text-center space-y-6 py-12">
          <div className="space-y-3">
            <h1 className="text-5xl sm:text-6xl font-black tracking-widest text-slate-100">
              VOID//OS
            </h1>
            <p className="text-xs sm:text-sm font-bold tracking-[0.2em] text-cyan-400">
              AN OPERATING SYSTEM THAT REMEMBERS.
            </p>
          </div>

          <div className="max-w-md text-xs text-slate-400 leading-relaxed space-y-2 py-2">
            <p>
              A recovery package was discovered inside an abandoned NEXUS SYSTEMS facility.
            </p>
            <p>
              The system was shut down in 2004.
            </p>
            <p className="text-slate-300 font-medium">
              It was not supposed to boot again.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="pt-3">
            <button
              onClick={handlePlayClick}
              className="px-10 py-3.5 bg-slate-900 hover:bg-cyan-950 text-cyan-300 font-bold text-sm tracking-widest border border-cyan-500 rounded transition-all cursor-pointer flex items-center space-x-2"
            >
              <Play size={15} className="text-cyan-400" />
              <span>PLAY VOID//OS</span>
            </button>
          </div>

          {/* Scroll Down Indicator */}
          <div 
            onClick={() => scrollToSection('about')}
            className="pt-10 text-slate-600 hover:text-slate-400 transition-colors cursor-pointer flex flex-col items-center space-y-1 text-[10px]"
          >
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown size={14} className="animate-bounce" />
          </div>
        </section>

        {/* Narrative Flow Sections */}
        <div className="w-full space-y-24 pb-24">

          {/* =========================================================================
              SCREEN 02: WHAT IS VOID//OS?
             ========================================================================= */}
          <section id="about" className="space-y-3 scroll-mt-20">
            <div className="text-[11px] font-bold text-cyan-400 tracking-wider uppercase border-b border-slate-800 pb-1.5">
              01 // WHAT IS THIS?
            </div>
            <div className="p-5 bg-[#050816] border border-slate-800 rounded space-y-3 text-xs leading-relaxed text-slate-300">
              <p>
                <strong>VOID//OS</strong> is an interactive mystery played entirely through a simulated operating system.
              </p>
              <p>
                You boot into an abandoned 2004 workstation: browsing files, running diagnostic commands in the terminal, inspecting processes, and discovering what happened inside the facility.
              </p>
              <p className="text-slate-400">
                The operating system itself is the game. As you explore, the computer begins responding to your actions.
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
            <div className="p-5 bg-[#050816] border border-slate-800 rounded space-y-3 text-xs leading-relaxed text-slate-300">
              <p>
                In 2004, NEXUS SYSTEMS developed VOID//OS as an adaptive cognitive system designed to learn from human users.
              </p>
              <div className="p-3 bg-black/60 border-l border-pink-500 rounded-r text-[11px] text-pink-300">
                <strong>AUGUST 14, 2004 // 03:14 AM:</strong> An unlogged anomaly occurred during cognitive feedback trials. The facility was evacuated and sealed. VOID//OS was supposedly terminated.
              </div>
              <p className="text-slate-400">
                Years later, an intact recovery package was found. You are the first operator to initialize the system since the collapse.
              </p>
            </div>
          </section>

          {/* =========================================================================
              SCREEN 04: YOUR ASSIGNMENT
             ========================================================================= */}
          <section className="space-y-3 scroll-mt-20">
            <div className="text-[11px] font-bold text-cyan-400 tracking-wider uppercase border-b border-slate-800 pb-1.5">
              03 // YOUR ASSIGNMENT
            </div>
            <div className="p-5 bg-[#050816] border border-slate-800 rounded space-y-3 text-xs">
              <div className="text-slate-200 font-bold">RECOVERY OPERATOR DIRECTIVES:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400 text-[11px]">
                <div className="p-2 bg-[#080d22] border border-slate-800/80 rounded">
                  <strong className="text-slate-200">01.</strong> Inspect workstation drives.
                </div>
                <div className="p-2 bg-[#080d22] border border-slate-800/80 rounded">
                  <strong className="text-slate-200">02.</strong> Recover classified archives.
                </div>
                <div className="p-2 bg-[#080d22] border border-slate-800/80 rounded">
                  <strong className="text-slate-200">03.</strong> Investigate Incident 07.
                </div>
                <div className="p-2 bg-[#080d22] border border-slate-800/80 rounded">
                  <strong className="text-slate-200">04.</strong> Determine what happened at 03:14.
                </div>
                <div className="p-2 bg-[#080d22] border border-slate-800/80 rounded">
                  <strong className="text-slate-200">05.</strong> Locate the VOID Core partition.
                </div>
                <div className="p-2 bg-[#080d22] border border-slate-800/80 rounded">
                  <strong className="text-slate-200">06.</strong> Decide the system's fate.
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SCREEN 05: HOW IT WORKS
             ========================================================================= */}
          <section className="space-y-3 scroll-mt-20">
            <div className="text-[11px] font-bold text-purple-400 tracking-wider uppercase border-b border-slate-800 pb-1.5">
              04 // HOW IT WORKS
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-[#050816] border border-slate-800 rounded space-y-1">
                <div className="font-bold text-cyan-300">EXPLORE</div>
                <p className="text-[11px] text-slate-400">Search file trees, examine hidden dotfiles, and inspect system logs.</p>
              </div>
              <div className="p-3.5 bg-[#050816] border border-slate-800 rounded space-y-1">
                <div className="font-bold text-cyan-300">INVESTIGATE</div>
                <p className="text-[11px] text-slate-400">Use terminal diagnostics, chat transcripts, and your Case File journal.</p>
              </div>
              <div className="p-3.5 bg-[#050816] border border-slate-800 rounded space-y-1">
                <div className="font-bold text-pink-300">OBSERVE</div>
                <p className="text-[11px] text-slate-400">Perform Observation Duty to maintain stability as anomalies occur.</p>
              </div>
              <div className="p-3.5 bg-[#050816] border border-slate-800 rounded space-y-1">
                <div className="font-bold text-purple-300">DISCOVER</div>
                <p className="text-[11px] text-slate-400">Unlock deeper partitions and reveal the truth behind the project.</p>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SCREEN 06: THE SYSTEM
             ========================================================================= */}
          <section id="system" className="space-y-3 scroll-mt-20">
            <div className="text-[11px] font-bold text-cyan-400 tracking-wider uppercase border-b border-slate-800 pb-1.5">
              05 // THE SYSTEM
            </div>
            <div className="p-5 bg-[#050816] border border-slate-800 rounded space-y-3 text-xs leading-relaxed text-slate-300">
              <p>
                You start with a minimal recovery desktop. As you investigate, the system installs new components:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-slate-400 pt-1">
                <div>• Terminal Shell (`sh-4.09`)</div>
                <div>• Case File Dossier</div>
                <div>• Observer Telemetry</div>
                <div>• CCTV Camera Feeds</div>
                <div>• Memory Hex Buffer</div>
                <div>• Security Matrix</div>
                <div>• NetSeek Intranet</div>
                <div>• Operator Messages</div>
                <div>• Reality Core</div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SCREEN 07: THE ANOMALY
             ========================================================================= */}
          <section className="space-y-3 scroll-mt-20">
            <div className="text-[11px] font-bold text-pink-400 tracking-wider uppercase border-b border-slate-800 pb-1.5">
              06 // THE ANOMALY
            </div>
            <div className="p-5 bg-[#050816] border border-slate-800 rounded space-y-3 text-xs leading-relaxed text-slate-300">
              <p>
                The computer does not remain static. As you progress into later acts, system stability begins to drain.
              </p>
              <p className="text-slate-400">
                Neglecting the Anomaly leads to screen corruption, false telemetry readings, and hostile daemon intervention. Operators must use the <strong>OBSERVER</strong> application to perform multi-step stabilization routines.
              </p>
            </div>
          </section>

          {/* =========================================================================
              SCREEN 08: ACHIEVEMENTS & PROFILE
             ========================================================================= */}
          <section id="profile" className="space-y-3 scroll-mt-20">
            <div className="text-[11px] font-bold text-cyan-400 tracking-wider uppercase border-b border-slate-800 pb-1.5">
              07 // OPERATOR PROFILE & ACHIEVEMENTS
            </div>
            <div className="p-5 bg-[#050816] border border-slate-800 rounded space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-slate-200 font-bold">RECOVERY TELEMETRY TRACKER</div>
                  <div className="text-[11px] text-slate-400">
                    42 System Events, 12 Branching Endings, and Case File intelligence.
                  </div>
                </div>
                <button
                  onClick={() => {
                    sound.playClick();
                    setIsProfileOpen(true);
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 rounded text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
                >
                  <User size={13} />
                  <span>VIEW PROFILE</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 bg-[#080d22] border border-slate-800/80 rounded">
                  <div className="text-slate-500 text-[10px]">ACT</div>
                  <div className="text-pink-400 font-bold">ACT {activeStory.act || 1}</div>
                </div>
                <div className="p-2.5 bg-[#080d22] border border-slate-800/80 rounded">
                  <div className="text-slate-500 text-[10px]">ACHIEVEMENTS</div>
                  <div className="text-amber-400 font-bold">{(activeStory.unlockedEvents || []).length} / 42</div>
                </div>
                <div className="p-2.5 bg-[#080d22] border border-slate-800/80 rounded">
                  <div className="text-slate-500 text-[10px]">CASE FILE</div>
                  <div className="text-purple-400 font-bold">
                    {Math.min(100, Math.round((Object.keys(activeStory.caseFileDiscoveries || {}).length / 12) * 100))}%
                  </div>
                </div>
                <div className="p-2.5 bg-[#080d22] border border-slate-800/80 rounded">
                  <div className="text-slate-500 text-[10px]">ENDINGS</div>
                  <div className="text-green-400 font-bold">{(activeStory.endingDiscovered || []).length} / 12</div>
                </div>
              </div>
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
              <div className="p-4 bg-[#050816] border border-slate-800 rounded space-y-2">
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
              <div className="p-4 bg-[#050816] border border-slate-800 rounded space-y-2">
                <div className="text-slate-200 font-bold">FEEDBACK</div>
                <p className="text-[11px] text-slate-400">
                  Found an anomaly or have a suggestion?
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
          <div className="pt-6 text-center">
            <button
              onClick={handlePlayClick}
              className="px-10 py-3.5 bg-slate-900 hover:bg-cyan-950 text-cyan-300 font-bold text-sm tracking-widest border border-cyan-500 rounded transition-all cursor-pointer"
            >
              BOOT RECOVERY TERMINAL [v1.3.0]
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
