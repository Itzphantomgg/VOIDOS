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
  Mail,
  ExternalLink,
  BookOpen,
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
    <div className="min-h-screen bg-[#02050f] text-slate-200 font-mono select-none overflow-x-hidden relative flex flex-col">
      {/* Background Retro Grid & Ambient Glow */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 25%, rgba(0, 240, 255, 0.08) 0%, rgba(2, 5, 15, 0.96) 80%),
            linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 32px 32px, 32px 32px',
        }}
      />

      {/* Top Navigation Bar */}
      <nav className="relative z-20 border-b border-slate-800/80 bg-[#040817]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 bg-cyan-400 text-black flex items-center justify-center font-bold text-xs rounded-sm shadow-retro-cyan">
            V//O
          </div>
          <div>
            <span className="font-black text-sm tracking-widest text-cyan-300">VOID//OS</span>
            <span className="text-[10px] text-pink-500 font-bold ml-2">BUILD v1.3.0</span>
          </div>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center space-x-6 text-xs text-slate-400">
          <button onClick={() => scrollToSection('about')} className="hover:text-cyan-300 transition-colors cursor-pointer">
            WHAT IS VOID//OS?
          </button>
          <button onClick={() => scrollToSection('story')} className="hover:text-cyan-300 transition-colors cursor-pointer">
            THE STORY
          </button>
          <button onClick={() => scrollToSection('role')} className="hover:text-cyan-300 transition-colors cursor-pointer">
            YOUR ROLE
          </button>
          <button onClick={() => scrollToSection('how-to-play')} className="hover:text-cyan-300 transition-colors cursor-pointer">
            HOW TO PLAY
          </button>
          <button onClick={() => scrollToSection('endings')} className="hover:text-cyan-300 transition-colors cursor-pointer">
            ENDINGS
          </button>
          <button onClick={() => scrollToSection('credits')} className="hover:text-cyan-300 transition-colors cursor-pointer">
            CREDITS
          </button>
          <button onClick={() => scrollToSection('feedback')} className="hover:text-pink-400 transition-colors cursor-pointer">
            FEEDBACK
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

      {/* Main Content Container */}
      <div className="relative z-10 flex-1 flex flex-col items-center max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 space-y-20">
        
        {/* 1. HERO SECTION */}
        <section id="hero" className="w-full flex flex-col items-center text-center space-y-5 pt-4 sm:pt-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-[11px] text-cyan-300 shadow-retro-cyan">
            <ShieldAlert size={13} className="text-pink-400 animate-pulse" />
            <span>NEXUS SYSTEMS // RECOVERY ENVIRONMENT (2004)</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-5xl sm:text-7xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-cyan-200 via-cyan-400 to-pink-500 drop-shadow-[0_0_25px_rgba(0,240,255,0.4)]">
              VOID//OS
            </h1>
            <p className="text-sm sm:text-lg font-bold tracking-[0.25em] text-pink-400 glow-magenta">
              AN OPERATING SYSTEM THAT REMEMBERS.
            </p>
          </div>

          <div className="max-w-xl text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2 border-y border-slate-800/80 py-4">
            <p>
              You have been assigned to recover an abandoned operating system developed by <strong>NEXUS SYSTEMS</strong>.
            </p>
            <p>
              The system was shut down after an unexplained incident in 2004.
            </p>
            <p className="text-cyan-300 font-bold">
              Your job is simple: Recover the data. Find out what happened. Shut down the system.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handlePlayClick}
              className="px-10 py-3.5 bg-gradient-to-r from-cyan-950 via-[#191035] to-pink-950 hover:from-cyan-900 hover:via-[#2b1254] hover:to-pink-900 text-white font-bold text-sm tracking-widest border-2 border-cyan-400 rounded shadow-retro-cyan cursor-pointer transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <Play size={16} className="text-cyan-400" />
              <span>PLAY VOID//OS</span>
              <Maximize2 size={14} className="text-pink-400" />
            </button>

            <button
              onClick={() => scrollToSection('about')}
              className="px-6 py-3.5 bg-[#060a1a] hover:bg-slate-900 border border-slate-700 text-slate-300 text-xs font-bold rounded cursor-pointer transition-all"
            >
              LEARN MORE
            </button>
          </div>

          <div className="text-[11px] text-slate-500 font-mono">
            SYSTEM STATUS: OFFLINE // AIR-GAPPED // BUILD v1.3.0
          </div>
        </section>

        {/* 2. WHAT IS VOID//OS? */}
        <section id="about" className="w-full space-y-3 scroll-mt-20">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-widest border-b border-slate-800 pb-2">
            <Info size={14} />
            <span>01 // WHAT IS VOID//OS?</span>
          </div>

          <div className="p-5 bg-[#070c1e] border border-cyan-900/80 rounded space-y-3 text-xs leading-relaxed text-slate-300">
            <p>
              <strong>VOID//OS</strong> is an interactive digital horror mystery played entirely through a simulated operating system.
            </p>
            <p>
              You do not navigate conventional game menus. Instead, you boot into an authentic 2004 workstation environment: browsing files, running diagnostic commands in the terminal, monitoring processes, listening to audio logs, and investigating what occurred in the facility.
            </p>
            <p className="text-pink-300 font-bold">
              The operating system itself is the mystery. As you explore, the computer begins responding to your presence.
            </p>
          </div>
        </section>

        {/* 3. THE STORY */}
        <section id="story" className="w-full space-y-3 scroll-mt-20">
          <div className="flex items-center space-x-2 text-pink-400 font-bold text-xs uppercase tracking-widest border-b border-slate-800 pb-2">
            <Radio size={14} />
            <span>02 // THE STORY</span>
          </div>

          <div className="p-5 bg-[#0a0f26] border border-pink-900/80 rounded space-y-3 text-xs leading-relaxed text-slate-300">
            <div className="text-sm font-bold text-pink-300">PROJECT VOID (2004)</div>
            <p>
              In 2004, NEXUS SYSTEMS developed VOID//OS as an adaptive cognitive operating system designed to observe, learn from, and synthesize human interaction.
            </p>
            <div className="p-3 bg-black/60 border-l-2 border-pink-500 rounded-r text-[11px] text-pink-200">
              <strong>AUGUST 14, 2004 // 03:14 AM:</strong> An unlogged collapse occurred during cognitive feedback trials. The research facility was evacuated and sealed. VOID//OS was supposedly terminated.
            </div>
            <p>
              Years later, an intact recovery package was discovered. You are the first technician assigned to boot it up since the incident.
            </p>
          </div>
        </section>

        {/* 4. YOUR ROLE */}
        <section id="role" className="w-full space-y-3 scroll-mt-20">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-widest border-b border-slate-800 pb-2">
            <Briefcase size={14} />
            <span>03 // YOUR ROLE: RECOVERY OPERATOR</span>
          </div>

          <div className="p-5 bg-[#060a18] border border-slate-800 rounded space-y-3 text-xs">
            <div className="text-cyan-300 font-bold">YOUR OFFICIAL MISSION:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
              <div className="p-2.5 bg-[#090e24] border border-slate-800 rounded flex items-center space-x-2">
                <span className="text-pink-400 font-bold font-mono">01</span>
                <span>Inspect the recovered workstation.</span>
              </div>
              <div className="p-2.5 bg-[#090e24] border border-slate-800 rounded flex items-center space-x-2">
                <span className="text-pink-400 font-bold font-mono">02</span>
                <span>Recover classified project data.</span>
              </div>
              <div className="p-2.5 bg-[#090e24] border border-slate-800 rounded flex items-center space-x-2">
                <span className="text-pink-400 font-bold font-mono">03</span>
                <span>Investigate Incident 07.</span>
              </div>
              <div className="p-2.5 bg-[#090e24] border border-slate-800 rounded flex items-center space-x-2">
                <span className="text-pink-400 font-bold font-mono">04</span>
                <span>Determine what happened at 03:14 AM.</span>
              </div>
              <div className="p-2.5 bg-[#090e24] border border-slate-800 rounded flex items-center space-x-2">
                <span className="text-pink-400 font-bold font-mono">05</span>
                <span>Locate and decrypt the VOID Core.</span>
              </div>
              <div className="p-2.5 bg-[#090e24] border border-slate-800 rounded flex items-center space-x-2">
                <span className="text-pink-400 font-bold font-mono">06</span>
                <span>Execute final system resolution.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. HOW TO PLAY */}
        <section id="how-to-play" className="w-full space-y-3 scroll-mt-20">
          <div className="flex items-center space-x-2 text-purple-400 font-bold text-xs uppercase tracking-widest border-b border-slate-800 pb-2">
            <HelpCircle size={14} />
            <span>04 // HOW TO PLAY</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 bg-[#070c1e] border border-cyan-900 rounded space-y-1">
              <div className="font-bold text-cyan-300">01 // BOOT</div>
              <p className="text-[11px] text-slate-400">Enter the recovery terminal and launch into the operating system.</p>
            </div>
            <div className="p-3.5 bg-[#070c1e] border border-cyan-900 rounded space-y-1">
              <div className="font-bold text-cyan-300">02 // EXPLORE</div>
              <p className="text-[11px] text-slate-400">Search drives, discover hidden dotfiles, and inspect system logs.</p>
            </div>
            <div className="p-3.5 bg-[#070c1e] border border-cyan-900 rounded space-y-1">
              <div className="font-bold text-cyan-300">03 // INVESTIGATE</div>
              <p className="text-[11px] text-slate-400">Use terminal diagnostics, chat logs, and your Case File journal.</p>
            </div>
            <div className="p-3.5 bg-[#070c1e] border border-pink-900 rounded space-y-1">
              <div className="font-bold text-pink-300">04 // OBSERVE</div>
              <p className="text-[11px] text-slate-400">Monitor anomaly stability when anomalous behaviors emerge.</p>
            </div>
            <div className="p-3.5 bg-[#070c1e] border border-pink-900 rounded space-y-1">
              <div className="font-bold text-pink-300">05 // SURVIVE</div>
              <p className="text-[11px] text-slate-400">Apply stabilization pulses before stability collapses to 0%.</p>
            </div>
            <div className="p-3.5 bg-[#070c1e] border border-purple-900 rounded space-y-1">
              <div className="font-bold text-purple-300">06 // DISCOVER</div>
              <p className="text-[11px] text-slate-400">Unlock deeper partitions and choose VOID's ultimate fate.</p>
            </div>
          </div>
        </section>

        {/* 6. 12 ENDINGS */}
        <section id="endings" className="w-full space-y-3 scroll-mt-20">
          <div className="flex items-center space-x-2 text-pink-400 font-bold text-xs uppercase tracking-widest border-b border-slate-800 pb-2">
            <Award size={14} />
            <span>05 // 12 BRANCHING ENDINGS</span>
          </div>

          <div className="p-5 bg-[#090e24] border border-slate-800 rounded space-y-2 text-xs leading-relaxed text-slate-300">
            <p>
              Your actions shape the outcome. Every command, file deletion, and ethical choice leads to one of <strong>12 distinct endings</strong>:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-slate-400 pt-1">
              <div>• System Termination</div>
              <div>• VOID Escape</div>
              <div>• The Truth (Expose)</div>
              <div>• The Last Operator</div>
              <div>• Memory Reclamation</div>
              <div>• Containment Seal</div>
              <div>• System Collapse</div>
              <div>• The 2004 Loop</div>
              <div>• Deception Failure</div>
              <div>• Liberation Protocol</div>
              <div>• Consciousness Merge</div>
              <div>• Ancient Origin (Secret)</div>
            </div>
          </div>
        </section>

        {/* 7. CREDITS */}
        <section id="credits" className="w-full space-y-3 scroll-mt-20">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-widest border-b border-slate-800 pb-2">
            <Sparkles size={14} />
            <span>06 // CREDITS & AUTHORSHIP</span>
          </div>

          <div className="p-5 bg-[#060a18] border border-cyan-950 rounded flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div>
              <div className="text-cyan-300 font-bold text-sm">VOID//OS</div>
              <div className="text-slate-400 mt-0.5">
                Created and designed by <strong className="text-pink-400">Paarth</strong>.
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                An interactive ARG, digital mystery, and psychological horror experience.
              </div>
            </div>

            <a
              href="https://github.com/Itzphantomgg/Paarth"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-900 hover:bg-cyan-950 text-cyan-300 border border-cyan-700 rounded text-xs font-bold flex items-center space-x-1.5 cursor-pointer transition-all shrink-0"
            >
              <span>GitHub: Itzphantomgg/Paarth</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </section>

        {/* 8. FEEDBACK */}
        <section id="feedback" className="w-full space-y-3 scroll-mt-20">
          <div className="flex items-center space-x-2 text-pink-400 font-bold text-xs uppercase tracking-widest border-b border-slate-800 pb-2">
            <Mail size={14} />
            <span>07 // FEEDBACK & ANOMALY REPORTS</span>
          </div>

          <div className="p-5 bg-[#090e24] border border-pink-900/60 rounded flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div>
              <div className="text-pink-300 font-bold">FOUND SOMETHING STRANGE?</div>
              <div className="text-slate-400 text-[11px] mt-0.5 max-w-md">
                Have a suggestion or found a bug? Send your thoughts or report what you discovered in the system.
              </div>
            </div>

            <a
              href="mailto:paarth.archive@gmail.com?subject=VOID//OS%20Feedback%20%26%20Report"
              className="px-5 py-2 bg-gradient-to-r from-pink-950 to-purple-950 hover:from-pink-900 hover:to-purple-900 text-pink-200 border border-pink-500 rounded text-xs font-bold flex items-center space-x-1.5 cursor-pointer shadow-retro-magenta transition-all shrink-0"
            >
              <Mail size={13} />
              <span>SEND FEEDBACK</span>
            </a>
          </div>
        </section>

        {/* Bottom Launch Button */}
        <div className="pt-4 pb-12 text-center">
          <button
            onClick={handlePlayClick}
            className="px-10 py-3.5 bg-gradient-to-r from-cyan-950 via-[#191035] to-pink-950 hover:from-cyan-900 hover:via-[#2b1254] hover:to-pink-900 text-white font-bold text-sm tracking-widest border-2 border-cyan-400 rounded shadow-retro-cyan cursor-pointer transition-all transform hover:scale-105"
          >
            BOOT RECOVERY TERMINAL [v1.3.0]
          </button>
        </div>
      </div>

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
