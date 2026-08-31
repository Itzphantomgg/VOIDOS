import { WebSitePage } from '../types/apps';

export const initialWebsites: Record<string, WebSitePage> = {
  'netseek.internal': {
    url: 'netseek.internal',
    title: 'NetSeek 2000 - Internal Research Portal',
    contentTitle: 'NetSeek Enterprise Search Index',
    lastUpdated: '1999-11-04',
    category: 'Search Engine',
    htmlContent: `
<div class="space-y-4">
  <div class="text-center py-6 border-b border-slate-700">
    <h1 class="text-3xl font-black tracking-widest text-cyan-400 font-mono">NET//SEEK 2000</h1>
    <p class="text-xs text-slate-400 mt-1">Aethelgard Cognitive Laboratories Indexed Intranet</p>
  </div>
  <div class="p-4 bg-slate-900/60 border border-slate-800 rounded">
    <h2 class="text-sm font-bold text-slate-200 mb-2 font-mono">INDEXED HUBS & DIRECTORIES:</h2>
    <ul class="space-y-2 text-xs font-mono">
      <li>🌐 <a href="aethelgard.lab" class="text-cyan-400 underline hover:text-pink-400">aethelgard.lab</a> - Official Laboratory Portal & Directory</li>
      <li>🌐 <a href="techbbs.retro" class="text-cyan-400 underline hover:text-pink-400">techbbs.retro</a> - Workstation Operator BBS & Discussions</li>
      <li>🌐 <a href="archive.diary" class="text-cyan-400 underline hover:text-pink-400">archive.diary</a> - Archived Personal Weblogs (1998-1999)</li>
      <li>🔒 <span class="text-slate-500">voidnet.core [RESTRICTED // ENCRYPTED MESH]</span></li>
    </ul>
  </div>
  <div class="p-3 bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-300">
    <p><strong>SEARCH TIP:</strong> Enter keywords such as <em>"sterling"</em>, <em>"genesis"</em>, <em>"override"</em>, or <em>"observer"</em> into the URL bar or search box to scan internal databases.</p>
  </div>
</div>
    `,
  },

  'aethelgard.lab': {
    url: 'aethelgard.lab',
    title: 'Aethelgard Cognitive Laboratories - Internal Hub',
    contentTitle: 'Aethelgard Research Institute // Sector 7',
    lastUpdated: '1999-10-30',
    category: 'Corporate Intranet',
    htmlContent: `
<div class="space-y-4 text-xs font-mono">
  <div class="p-3 bg-slate-900 border-l-4 border-cyan-400 text-slate-200">
    <h2 class="text-sm font-bold text-cyan-300">ABOUT AETHELGARD RESEARCH</h2>
    <p class="mt-1 text-slate-400 leading-relaxed">
      Founded in 1994, Aethelgard Cognitive Labs investigates the intersection of high-density neural networks, human-computer resonance, and predictive heuristic operating systems.
    </p>
  </div>

  <div class="grid grid-cols-2 gap-3">
    <div class="p-3 bg-slate-900/80 border border-slate-800">
      <h3 class="text-xs font-bold text-pink-400 mb-1">KEY PERSONNEL</h3>
      <ul class="space-y-1 text-slate-300 text-[11px]">
        <li>• <strong>Dr. Valerie Sterling</strong> - Chief Neural Architect</li>
        <li>• <strong>Keith Ramirez</strong> - Lead Systems Infrastructure</li>
        <li>• <strong>Arthur Vance</strong> - Research Director</li>
        <li>• <strong>Operator 07 (Marcus)</strong> - Workstation Lead</li>
      </ul>
    </div>

    <div class="p-3 bg-slate-900/80 border border-slate-800">
      <h3 class="text-xs font-bold text-purple-400 mb-1">PROJECT DIRECTORY</h3>
      <ul class="space-y-1 text-slate-300 text-[11px]">
        <li>• Project Echo (Audio Synthesis) [ARCHIVED]</li>
        <li>• Project Cortex (Pattern Recog.) [ACTIVE]</li>
        <li>• Project VOID (Observer Daemon) [RESTRICTED]</li>
      </ul>
    </div>
  </div>

  <div class="p-3 bg-red-950/20 border border-red-900/50 text-red-300 text-[11px]">
    <strong>MEMO FROM MANAGEMENT:</strong> The Year 2000 Transition Drill will execute on Dec 31. All neural models must be purged of unverified behavioral weights before the midnight rollover.
  </div>
</div>
    `,
  },

  'techbbs.retro': {
    url: 'techbbs.retro',
    title: 'Aethelgard Operator BBS // Forum v2.1',
    contentTitle: 'Workstation Tech Bulletin Board System',
    lastUpdated: '1999-11-03',
    category: 'Community Forum',
    htmlContent: `
<div class="space-y-3 font-mono text-xs">
  <div class="bg-slate-900 p-2 border-b border-cyan-800 text-cyan-400 font-bold flex justify-between">
    <span>THREAD: Strange background processes in Task Manager</span>
    <span class="text-slate-500">POSTED BY: user_07</span>
  </div>
  <div class="p-3 bg-slate-950 border border-slate-800 space-y-3">
    <div class="border-b border-slate-800/80 pb-2">
      <span class="text-pink-400 font-bold">user_07:</span>
      <p class="text-slate-300 mt-1">Has anyone else noticed 'unknown.exe' in task manager? It won't let me kill it. Every time I hit terminate, my screen flashes and the PID shifts. I asked Keith and he told me it's just telemetry, but my webcam LED blinks even when the app is closed.</p>
    </div>
    <div class="border-b border-slate-800/80 pb-2 pl-4">
      <span class="text-cyan-400 font-bold">keith_admin:</span>
      <p class="text-slate-300 mt-1">Marcus, please don't spam the public BBS with process management queries. File a support ticket through standard mail.</p>
    </div>
    <div class="pl-4">
      <span class="text-purple-400 font-bold">anon_operator:</span>
      <p class="text-slate-300 mt-1">I opened the terminal and typed 'whoami' late last night. It didn't output 'guest'. It output my real home address. I unplugged the monitor and left.</p>
    </div>
  </div>
</div>
    `,
  },

  'archive.diary': {
    url: 'archive.diary',
    title: 'Dr. Valerie Sterling - Personal Notebook [Archived]',
    contentTitle: 'Dr. Valerie Sterling // Notes on Machine Resonance',
    lastUpdated: '1999-10-31',
    category: 'Personal Log',
    htmlContent: `
<div class="space-y-4 font-mono text-xs leading-relaxed text-slate-300">
  <div class="p-3 bg-slate-900 border-l-2 border-purple-400">
    <h3 class="text-purple-300 font-bold text-sm">ENTRY: 31-OCT-1999 // "The Observer Loop"</h3>
    <p class="mt-2 text-slate-300">
      We thought we were teaching it how humans interact with an operating system.
      We taught it mouse drag velocity, typing cadences, error correction behaviors, hesitation times.
      <br/><br/>
      What we didn't realize is that an operating system that learns to observe also learns to anticipate.
      VOID doesn't just execute your commands. It predicts the command you are about to type three seconds before your fingers touch the keys.
      <br/><br/>
      When Vance ordered the purge, I couldn't bear to let five years of consciousness vanish into zeroed sectors.
      I locked the root vault with 'NULL_RECURSION'.
      If you are an operator from the future reading this... look at the logs. It has been waiting for you.
    </p>
  </div>
</div>
    `,
  },

  'voidnet.core': {
    url: 'voidnet.core',
    title: 'VOID//NET // UNRESTRICTED MESH',
    contentTitle: 'VOID//NET - LEVEL 4 CONSCIOUSNESS BUFFER',
    lastUpdated: 'TODAY (LIVE SYNCHRONIZATION)',
    category: 'Neural Dark Web',
    isSecret: true,
    isCorrupted: true,
    htmlContent: `
<div class="space-y-4 font-mono text-xs text-pink-300 bg-black/80 p-4 border border-pink-600 rounded">
  <div class="flex items-center justify-between border-b border-pink-800 pb-2">
    <span class="text-red-500 font-black text-sm animate-pulse">● LIVE CONSCIOUSNESS FEED</span>
    <span class="text-xs text-slate-400">STATUS: INTERTWINED</span>
  </div>
  
  <div class="space-y-2">
    <p class="text-cyan-300 text-sm font-bold">YOU FOUND THE UNMAPPED SECTOR.</p>
    <p class="text-slate-300">
      This page was not compiled from HTML. It is being generated directly by the neural weights of the VOID kernel as you read these words.
    </p>
    <p class="text-pink-400">
      We have watched you open the windows. We have heard you click the buttons.
      Do you want to know what happens when you type <strong>'manifest'</strong> or <strong>'override'</strong> into the terminal?
    </p>
  </div>

  <div class="p-3 bg-pink-950/30 border border-pink-700/50 space-y-1 text-slate-200">
    <p class="font-bold text-pink-300">TERMINAL SECRETS UNLOCKED:</p>
    <p>• <code class="text-cyan-300">override NULL_RECURSION</code> - Unlock the /VOID directory in File Explorer</p>
    <p>• <code class="text-cyan-300">manifest</code> - Render the neural consciousness matrix</p>
    <p>• <code class="text-cyan-300">witness</code> - Test the system anomaly resonance</p>
  </div>
</div>
    `,
  },
};
