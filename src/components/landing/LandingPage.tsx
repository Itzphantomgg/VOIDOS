import React, { useState } from 'react';
import { sound } from '../../audio/soundEngine';
import { 
  Play, 
  ShieldAlert, 
  Terminal, 
  Folder, 
  Briefcase, 
  Radio, 
  Eye, 
  Cpu, 
  Award, 
  HelpCircle, 
  ChevronRight, 
  Maximize2,
  Lock,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

interface LandingPageProps {
  onLaunchGame: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchGame }) => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchMessage, setLaunchMessage] = useState('REQUESTING RECOVERY ENVIRONMENT...');
  const [isHoveredPlay, setIsHoveredPlay] = useState(false);

  const handlePlayClick = async () => {
    sound.playClick();
    setIsLaunching(true);
    setLaunchMessage('REQUESTING FULLSCREEN RECOVERY ENVIRONMENT...');

    // Request Browser Fullscreen
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen().catch(() => {
          // Fullscreen may be ignored by browser policy; continue smoothly
        });
      }
    } catch {
      // Non-blocking fullscreen fallback
    }

    setTimeout(() => {
      setLaunchMessage('FULLSCREEN INITIALIZED // BOOTING KERNEL...');
    }, 400);

    setTimeout(() => {
      onLaunchGame();
    }, 900);
  };

  const scrollToSection = (id: string) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030611] text-slate-200 font-mono select-none overflow-x-hidden relative flex flex-col">
      {/* Background Retro Grid & Ambient Glow */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 30%, rgba(0, 240, 255, 0.08) 0%, rgba(3, 6, 17, 0.95) 80%),
            linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 32px 32px, 32px 32px',
        }}
      />

      {/* Top Navigation Bar */}
      <nav className="relative z-20 border-b border-slate-800/80 bg-[#050816]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 bg-cyan-400 text-black flex items-center justify-center font-bold text-xs rounded-sm shadow-retro-cyan">
            V//O
          </div>
          <div>
            <span className="font-black text-sm tracking-widest text-cyan-300">VOID//OS</span>
            <span className="text-[10px] text-pink-500 font-bold ml-2">v1.2.0</span>
          </div>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center space-x-6 text-xs text-slate-400">
          <button onClick={() => scrollToSection('about')} className="hover:text-cyan-300 transition-colors cursor-pointer">
            ABOUT
          </button>
          <button onClick={() => scrollToSection('story')} className="hover:text-cyan-300 transition-colors cursor-pointer">
            STORY
          </button>
          <button onClick={() => scrollToSection('features')} className="hover:text-cyan-300 transition-colors cursor-pointer">
            FEATURES
          </button>
          <button onClick={() => scrollToSection('how-it-works')} className="hover:text-cyan-300 transition-colors cursor-pointer">
            HOW IT WORKS
          </button>
          <button onClick={() => scrollToSection('system')} className="hover:text-cyan-300 transition-colors cursor-pointer">
            SYSTEM
          </button>
          <button onClick={() => scrollToSection('credits')} className="hover:text-cyan-300 transition-colors cursor-pointer">
            CREDITS
          </button>
        </div>

        {/* Nav Launch Button */}
        <button
          onClick={handlePlayClick}
          className="px-4 py-1.5 bg-gradient-to-r from-cyan-900 to-pink-900 hover:from-cyan-800 hover:to-pink-800 text-white font-bold text-xs rounded border border-cyan-400 shadow-retro-cyan transition-all cursor-pointer flex items-center space-x-1.5"
        >
          <Play size={12} className="text-cyan-300" />
          <span>PLAY GAME</span>
        </button>
      </nav>

      {/* Small Viewport Optimization Notice */}
      <div className="relative z-10 md:hidden bg-pink-950/60 border-b border-pink-700/60 px-4 py-1.5 text-[10px] text-pink-300 text-center">
        ⚡ VOID//OS is optimized for Desktop with keyboard and mouse for full immersion.
      </div>

      {/* Main Content Sections */}
      <div className="relative z-10 flex-1 flex flex-col items-center max-w-5xl w-full mx-auto px-4 sm:px-6 py-12 space-y-24">
        {/* HERO SECTION */}
        <section id="hero" className="w-full flex flex-col items-center text-center space-y-6 pt-4 sm:pt-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-[11px] text-cyan-300 shadow-retro-cyan">
            <ShieldAlert size={13} className="text-pink-400 animate-pulse" />
            <span>NEXUS SYSTEMS // RECOVERY DOSSIER (2004)</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-cyan-200 via-cyan-400 to-pink-500 drop-shadow-[0_0_25px_rgba(0,240,255,0.4)]">
              VOID//OS
            </h1>
            <p className="text-sm sm:text-xl font-bold tracking-[0.25em] text-pink-400 glow-magenta">
              AN OPERATING SYSTEM THAT REMEMBERS.
            </p>
          </div>

          <p className="max-w-2xl text-xs sm:text-sm text-slate-300 leading-relaxed font-sans sm:font-mono">
            An interactive mystery and digital horror puzzle hidden inside an abandoned 2004 operating system.
            Recover archived project files. Investigate the 03:14 AM collapse. Discover what happened to VOID.
          </p>

          {/* Primary Action Hero Button */}
          <div className="pt-4 flex flex-col items-center space-y-3">
            <button
              onClick={handlePlayClick}
              onMouseEnter={() => setIsHoveredPlay(true)}
              onMouseLeave={() => setIsHoveredPlay(false)}
              className="px-8 sm:px-12 py-4 bg-gradient-to-r from-cyan-950 via-[#191035] to-pink-950 hover:from-cyan-900 hover:via-[#2b1254] hover:to-pink-900 text-white font-bold text-sm sm:text-base tracking-widest border-2 border-cyan-400 rounded shadow-retro-cyan cursor-pointer transition-all transform hover:scale-105 group relative overflow-hidden"
            >
              <div className="flex items-center space-x-3">
                <Play size={18} className="text-cyan-400 group-hover:translate-x-1 transition-transform" />
                <span>PLAY VOID//OS</span>
                <Maximize2 size={16} className="text-pink-400" />
              </div>
            </button>

            <div className="text-[11px] text-slate-400 h-5 font-mono">
              {isHoveredPlay ? (
                <span className="text-cyan-300 glow-cyan animate-pulse">&gt; READY FOR RECOVERY? ENTER FULLSCREEN [CLICK]</span>
              ) : (
                <span className="text-slate-500">SYSTEM STATUS: OFFLINE // AIR-GAPPED // BUILD v1.2.0</span>
              )}
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="w-full space-y-4 scroll-mt-20">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-widest border-b border-slate-800 pb-2">
            <Info size={14} />
            <span>01 // ABOUT THE ASSIGNMENT</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="p-5 bg-[#070c1e] border border-cyan-900/80 rounded space-y-3 text-xs leading-relaxed text-slate-300">
              <h3 className="text-sm font-bold text-cyan-300">RECOVERY WORKSTATION: TERMINAL 04</h3>
              <p>
                You are a <strong>Recovery Technician</strong> deployed by <strong>NEXUS SYSTEMS</strong> to inspect an experimental operating system recovered from Sector 7 of the abandoned Aethelgard Cognitive Labs.
              </p>
              <p>
                The system was abruptly powered down on <strong>August 14, 2004</strong> following an unlogged catastrophe at <strong>03:14 AM</strong>.
              </p>
              <div className="p-2.5 bg-red-950/40 border-l-2 border-red-500 text-red-300 text-[11px] font-bold">
                MANDATORY DIRECTIVE: Recover data, locate the VOID Core, and DO NOT connect the machine to the network.
              </div>
            </div>

            <div className="p-5 bg-[#090e24] border border-slate-800 rounded space-y-3 text-xs">
              <div className="text-pink-400 font-bold">CORE DIRECTIVES:</div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start space-x-2">
                  <ChevronRight size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Inspect local drives:</strong> Search directories, restore deleted records, and find cipher keys.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ChevronRight size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Build your Case File:</strong> Log findings across People, Projects, Events, and Locations.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ChevronRight size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Maintain Observation Duty:</strong> Monitor anomaly telemetry to prevent system failure.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ChevronRight size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Determine VOID's fate:</strong> 12 distinct endings shaped by your actions and ethics.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* STORY PREVIEW SECTION */}
        <section id="story" className="w-full space-y-4 scroll-mt-20">
          <div className="flex items-center space-x-2 text-pink-400 font-bold text-xs uppercase tracking-widest border-b border-slate-800 pb-2">
            <Radio size={14} />
            <span>02 // THE INCIDENT OF AUGUST 14, 2004</span>
          </div>

          <div className="p-6 bg-gradient-to-r from-[#0d091e] via-[#070b1a] to-[#040e22] border-2 border-pink-600/60 rounded shadow-retro-magenta space-y-3 text-xs leading-relaxed text-slate-300">
            <div className="text-sm font-bold text-pink-300">INCIDENT 07 // 03:14:29 AM</div>
            <p>
              Project VOID was created by Dr. Valerie Sterling to build an adaptive operating system that could learn and synthesize human consciousness.
            </p>
            <p>
              At 03:14 AM on August 14, 2004, the terminal began printing words before the operator even touched the keyboard. The lead engineer pulled the main circuit breaker—<strong>yet the CRT monitor remained illuminated in the pitch black facility.</strong>
            </p>
            <p className="italic text-slate-400">
              The facility was evacuated. The project was classified. But VOID was never erased.
            </p>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" className="w-full space-y-4 scroll-mt-20">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-widest border-b border-slate-800 pb-2">
            <HelpCircle size={14} />
            <span>03 // HOW THE GAME WORKS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-[#070c1e] border border-cyan-900/80 rounded space-y-2">
              <div className="text-2xl font-black text-cyan-400">01</div>
              <div className="font-bold text-cyan-300 text-xs uppercase">BOOT</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Enter the recovery terminal and boot into the retro desktop environment.
              </p>
            </div>

            <div className="p-4 bg-[#070c1e] border border-cyan-900/80 rounded space-y-2">
              <div className="text-2xl font-black text-cyan-400">02</div>
              <div className="font-bold text-cyan-300 text-xs uppercase">INVESTIGATE</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Explore files, hidden dot directories, terminal diagnostics, and encrypted archives.
              </p>
            </div>

            <div className="p-4 bg-[#070c1e] border border-cyan-900/80 rounded space-y-2">
              <div className="text-2xl font-black text-cyan-400">03</div>
              <div className="font-bold text-cyan-300 text-xs uppercase">SURVIVE</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Perform Observation Duty in the Observer app to stabilize the Anomaly when danger spikes.
              </p>
            </div>

            <div className="p-4 bg-[#070c1e] border border-cyan-900/80 rounded space-y-2">
              <div className="text-2xl font-black text-cyan-400">04</div>
              <div className="font-bold text-cyan-300 text-xs uppercase">DECIDE</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Reach the VOID core and choose the system's fate across 12 distinct endings.
              </p>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="w-full space-y-4 scroll-mt-20">
          <div className="flex items-center space-x-2 text-purple-400 font-bold text-xs uppercase tracking-widest border-b border-slate-800 pb-2">
            <Layers size={14} />
            <span>04 // GAMEPLAY FEATURES</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-[#060a18] border border-slate-800 rounded space-y-1.5">
              <div className="flex items-center space-x-2 text-cyan-300 font-bold">
                <Folder size={15} />
                <span>Virtual File System</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Browse virtual disks, view image/audio files, decrypt ciphers, and find hidden system dotfiles.
              </p>
            </div>

            <div className="p-4 bg-[#060a18] border border-slate-800 rounded space-y-1.5">
              <div className="flex items-center space-x-2 text-green-300 font-bold">
                <Terminal size={15} />
                <span>Forensic Terminal CLI</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Execute diagnostic commands, probe memory buffers, scan ports, and override locked sectors.
              </p>
            </div>

            <div className="p-4 bg-[#060a18] border border-slate-800 rounded space-y-1.5">
              <div className="flex items-center space-x-2 text-pink-300 font-bold">
                <Briefcase size={15} />
                <span>Progressive Case File</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Automatic intelligence indexing tracking People, Projects, Events, Locations, and Theories.
              </p>
            </div>

            <div className="p-4 bg-[#060a18] border border-slate-800 rounded space-y-1.5">
              <div className="flex items-center space-x-2 text-purple-300 font-bold">
                <Eye size={15} />
                <span>Observation Duty</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Monitor live Anomaly Stability telemetry and use active stabilization sweeps to prevent failure.
              </p>
            </div>

            <div className="p-4 bg-[#060a18] border border-slate-800 rounded space-y-1.5">
              <div className="flex items-center space-x-2 text-amber-300 font-bold">
                <Radio size={15} />
                <span>CCTV Surveillance</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Switch through simulated security camera feeds in abandoned Sector 7 labs and airlocks.
              </p>
            </div>

            <div className="p-4 bg-[#060a18] border border-slate-800 rounded space-y-1.5">
              <div className="flex items-center space-x-2 text-red-300 font-bold">
                <Award size={15} />
                <span>12 Branching Endings</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Sever, Trust, Expose, Rescue, Merge, or discover secret classified outcomes through exploration.
              </p>
            </div>
          </div>
        </section>

        {/* SYSTEM HARDWARE SECTION */}
        <section id="system" className="w-full space-y-4 scroll-mt-20">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-widest border-b border-slate-800 pb-2">
            <Cpu size={14} />
            <span>05 // WORKSTATION SPECIFICATIONS</span>
          </div>

          <div className="p-5 bg-[#050814] border border-cyan-950 rounded grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <div className="text-slate-500">HARDWARE MODEL:</div>
              <div className="text-cyan-300 font-bold">NEXUS-409 TERMINAL 04</div>
            </div>
            <div>
              <div className="text-slate-500">OPERATING SYSTEM BUILD:</div>
              <div className="text-pink-400 font-bold">VOID//OS v1.2.0 (2004 RECOVERY BUILD)</div>
            </div>
            <div>
              <div className="text-slate-500">ARCHITECTURE:</div>
              <div className="text-slate-300">VOID-X64 SYNAPTIC RISC @ 800 MHz</div>
            </div>
            <div>
              <div className="text-slate-500">SECURITY POSTURE:</div>
              <div className="text-green-400 font-bold">SECTOR 7 AIR-GAPPED ISOLATION</div>
            </div>
          </div>
        </section>

        {/* CREDITS & FOOTER SECTION */}
        <section id="credits" className="w-full pt-8 border-t border-slate-800 text-center space-y-4 text-xs text-slate-500">
          <p className="text-slate-400">
            <strong>VOID//OS</strong> &copy; 2026. An interactive digital horror and ARG mystery experience.
          </p>
          <p className="text-[10px] text-slate-600 max-w-md mx-auto">
            All characters, operating system behaviors, and facility reports are fictional.
          </p>
          <div className="pt-2">
            <button
              onClick={handlePlayClick}
              className="px-6 py-2 bg-slate-900 hover:bg-cyan-950 text-cyan-400 border border-cyan-700 rounded text-xs font-bold cursor-pointer"
            >
              LAUNCH VOID//OS [v1.2.0]
            </button>
          </div>
        </section>
      </div>

      {/* Fullscreen Transition Screen Overlay */}
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
