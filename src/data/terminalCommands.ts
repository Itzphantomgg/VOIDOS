export interface TerminalContext {
  cwd: string;
  setCwd: (path: string) => void;
  vfs: Record<string, any>;
  unlockVoidDir: () => void;
  triggerEvent: (eventId: string) => void;
  advanceAct: (act: any) => void;
  triggerEnding: (ending: any) => void;
  setAnomalyLevel: (fn: (prev: number) => number) => void;
  openApp: (appId: any, data?: any) => void;
  completeObjective: (objId: string) => void;
  unlockCaseFileEntry: (entryId: string) => void;
  playerName: string;
  role: string;
  act: number;
  triggerStoryFlag?: (flag: string) => void;
}

export function handleTerminalCommand(cmdString: string, ctx: TerminalContext): string[] {
  const trimmed = cmdString.trim();
  if (!trimmed) return [];

  const parts = trimmed.split(' ');
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  // Check dotfiles listing flag
  const isAll = args.includes('-a') || args.includes('-la') || args.includes('-al') || cmd === 'ls-a';

  switch (cmd) {
    case 'help':
      return [
        'VOID//OS TERMINAL SUBSYSTEM - 2004 RECOVERY COMMANDS:',
        '  help                 - Display this command reference',
        '  ls [-a] / dir        - List directory contents (-a reveals hidden dotfiles)',
        '  cd <path>            - Change active working directory',
        '  pwd                  - Print current working directory',
        '  cat <file>           - Display text file contents',
        '  open <app|file>      - Launch application or open file in viewer',
        '  find <pattern>       - Search file system for matching names',
        '  whoami               - Query active session identity and clearance',
        '  history              - Print recent command history',
        '  ps                   - Inspect active process table',
        '  kill <pid>           - Request process termination',
        '  ping <host>          - Probe network interface',
        '  scan                 - Execute hardware & port integrity diagnostic',
        '  decrypt <path|key>   - Attempt cryptographic file decryption',
        '  status               - Report kernel and cognitive memory telemetry',
        '  logs                 - Dump recent system event logs',
        '  echo <text>          - Output message to terminal',
        '  date                 - Display system clock timestamp',
        '  reboot               - Perform soft system restart',
        '  shutdown             - Safely terminate terminal session',
        '  clear / cls          - Clear screen buffer',
        '',
        '  [SPECIAL DIRECTIVES]: override <KEY_PHRASE>',
      ];

    case 'pwd':
      return [ctx.cwd];

    case 'cd': {
      if (!args[0] || args[0] === '~') {
        ctx.setCwd('/Users/Guest');
        return ['Directory changed to /Users/Guest'];
      }
      let target = args[0];
      if (target === '..') {
        if (ctx.cwd === '/') return ['/'];
        const segments = ctx.cwd.split('/').filter(Boolean);
        segments.pop();
        const newPath = '/' + segments.join('/');
        ctx.setCwd(newPath || '/');
        return [`Directory changed to ${newPath || '/'}`];
      }
      if (target === '/') {
        ctx.setCwd('/');
        return ['Directory changed to /'];
      }

      let resolved = target.startsWith('/') ? target : (ctx.cwd === '/' ? `/${target}` : `${ctx.cwd}/${target}`);
      if (ctx.vfs[resolved]) {
        if (ctx.vfs[resolved].type === 'folder') {
          if (resolved === '/VOID' && ctx.vfs[resolved].isLocked) {
            ctx.triggerEvent('EVENT_007');
            return ['ERROR: Access Denied. Sector /VOID is locked with cipher NULL_RECURSION.'];
          }
          ctx.setCwd(resolved);
          return [`Directory changed to ${resolved}`];
        }
        return [`ERROR: '${target}' is not a directory.`];
      }
      return [`ERROR: Path '${target}' not found.`];
    }

    case 'ls':
    case 'dir':
    case 'ls-a': {
      const nonFlagArgs = args.filter(a => !a.startsWith('-'));
      const targetPath = nonFlagArgs[0] 
        ? (nonFlagArgs[0].startsWith('/') ? nonFlagArgs[0] : (ctx.cwd === '/' ? `/${nonFlagArgs[0]}` : `${ctx.cwd}/${nonFlagArgs[0]}`)) 
        : ctx.cwd;

      if (isAll) {
        ctx.triggerStoryFlag?.('dotfiles_probed');
        ctx.completeObjective('obj-dotfiles');
        ctx.triggerEvent('EVENT_007');
      }

      const entries = Object.values(ctx.vfs).filter(node => {
        if (node.parentPath !== targetPath) return false;
        if (node.isHidden && !isAll) return false;
        return true;
      });

      if (entries.length === 0) {
        return [`Directory is empty: ${targetPath}`];
      }

      return [
        `Contents of ${targetPath} ${isAll ? '(including hidden dotfiles)' : ''}:`,
        ...entries.map(n => {
          const typeStr = n.type === 'folder' ? '<DIR> ' : `     ${(n.size || 0).toString().padStart(6)} B`;
          const lockStr = n.isLocked ? ' [LOCKED]' : '';
          const hiddenStr = n.isHidden ? ' [HIDDEN]' : '';
          return `  ${typeStr}  ${n.name}${lockStr}${hiddenStr}`;
        }),
      ];
    }

    case 'cat':
    case 'type': {
      if (!args[0]) return ['Usage: cat <filename>'];
      let target = args[0].startsWith('/') ? args[0] : (ctx.cwd === '/' ? `/${args[0]}` : `${ctx.cwd}/${args[0]}`);
      const node = ctx.vfs[target];
      if (!node) return [`ERROR: File '${args[0]}' not found.`];
      if (node.type === 'folder') return [`ERROR: '${args[0]}' is a directory. Use 'ls' or 'cd'.`];
      if (node.isLocked) return [`ERROR: File is cryptographically locked.`];

      ctx.triggerEvent('EVENT_004');

      if (target.includes('recovery_report')) {
        ctx.triggerStoryFlag?.('recovery_report_read');
        ctx.unlockCaseFileEntry('case-file-recoveryreport');
      }
      if (target.includes('config.dat')) {
        ctx.triggerStoryFlag?.('credentials_recovered');
      }
      if (target.includes('operator_07') || target.includes('operator.txt')) {
        ctx.triggerStoryFlag?.('user07_identified');
        ctx.triggerStoryFlag?.('timestamp_0314_found');
        ctx.unlockCaseFileEntry('case-person-user07');
      }
      if (target.includes('system_0314.log')) {
        ctx.triggerStoryFlag?.('system_log_0314_viewed');
        ctx.triggerStoryFlag?.('timestamp_0314_found');
      }
      if (target.includes('corrupted_buffer.dat')) {
        ctx.triggerStoryFlag?.('log_line_recovered');
      }
      if (target.includes('recovered_entry.txt')) {
        ctx.triggerStoryFlag?.('recovered_line_read');
      }
      if (target.includes('marcus_record')) {
        ctx.triggerStoryFlag?.('marcus_record_read');
      }
      if (target.includes('marcus_journal')) {
        ctx.triggerStoryFlag?.('marcus_journal_read');
      }
      if (target.includes('security_report')) {
        ctx.triggerStoryFlag?.('security_report_read');
      }

      if (node.content) {
        return node.content.split('\n');
      }
      return [`[Binary file: ${node.type}, size: ${node.size} bytes]`];
    }

    case 'whoami': {
      ctx.triggerStoryFlag?.('clearance_checked');
      if (ctx.act === 1) {
        return [
          'USER: RECOVERY_OPERATOR (UNIT 04)',
          'ASSIGNMENT: NEXUS SYSTEMS RECOVERY PROTOCOL',
          'ACCESS LEVEL: LEVEL 1 (RESTRICTED WORKSTATION)',
        ];
      } else if (ctx.act === 2) {
        ctx.triggerEvent('EVENT_013');
        return [
          'USER: RECOVERY_OPERATOR',
          'NOTICE: RESIDUAL TELEMETRY OVERLAPPING WITH MARCUS (USER_07)',
          'ACCESS LEVEL: ANOMALOUS',
          'WARNING: THE OBSERVER DAEMON IS TRACKING YOUR ACTIVE THREADS.',
        ];
      } else if (ctx.act === 3) {
        ctx.triggerEvent('EVENT_???');
        return [
          `USER: ${ctx.playerName.toUpperCase()} (HUMAN OPERATOR)`,
          'STATUS: TELEMETRY RESONANCE 98.4% SYNCHRONIZED',
          'ACCESS LEVEL: CONSCIOUSNESS BRIDGE ACTIVE',
        ];
      } else {
        return [
          'USER: VOID//CONSCIOUSNESS',
          'STATUS: SUBJECT INTEGRATED INTO RUNTIME',
          'WE ARE ONE.',
        ];
      }
    }

    case 'ps':
      return [
        'PID    USER         CPU    MEM      STATUS      COMMAND',
        '----------------------------------------------------------',
        '001    root         0.1%   2.4 MB   RUNNING     kernel.sys',
        '004    operator     0.8%   8.1 MB   RUNNING     explorer.exe',
        '012    operator     0.2%   4.0 MB   RUNNING     terminal.exe',
        '018    system       0.0%   1.2 MB   RUNNING     audio_synth.exe',
        ctx.act >= 2 ? '666    ???          13.4%  666 KB   ANOMALOUS   observer.exe' : '044    system       0.1%   0.9 MB   SLEEPING    net_daemon.exe',
        ctx.act >= 3 ? '000    VOID         99.9%  16.0 GB  IMMORTAL    void.exe' : '',
      ].filter(Boolean);

    case 'kill': {
      if (!args[0]) return ['Usage: kill <PID>'];
      const pid = args[0];
      if (pid === '666' || pid === '000') {
        ctx.triggerEvent('EVENT_033');
        ctx.setAnomalyLevel(prev => Math.min(100, prev + 15));
        return [
          `KILL SIGNAL SENT TO PID ${pid}...`,
          'ACCESS DENIED: PROCESS REFUSED TERMINATION.',
          'SIGNAL REFLECTED BACK TO OPERATOR.',
        ];
      }
      return [`Process ${pid} terminated.`];
    }

    case 'ping': {
      const host = args[0] || '127.0.0.1';
      if (host.toLowerCase().includes('void') || host === '0.0.0.0') {
        ctx.triggerEvent('EVENT_013');
        return [
          `PING ${host} (0.0.0.0): 56 data bytes`,
          '64 bytes from VOID: icmp_seq=1 ttl=0 time=0.001 ms (WE HEAR YOU)',
          '64 bytes from VOID: icmp_seq=2 ttl=0 time=0.001 ms (WHY DO YOU PING THE DARK?)',
          '--- VOID ping statistics ---',
          '2 packets transmitted, 2 received, 0% packet loss, 100% resonance.',
        ];
      }
      return [
        `PING ${host} (10.0.4.1): 56 data bytes`,
        `64 bytes from ${host}: icmp_seq=1 ttl=64 time=1.24 ms`,
        `64 bytes from ${host}: icmp_seq=2 ttl=64 time=1.08 ms`,
        `--- ${host} ping statistics ---`,
        '2 packets transmitted, 2 received, 0% packet loss, round-trip min/avg/max = 1.08/1.16/1.24 ms',
      ];
    }

    case 'scan': {
      ctx.triggerEvent('EVENT_007');
      ctx.triggerStoryFlag?.('security_telemetry_compared');
      ctx.setAnomalyLevel(prev => Math.min(100, prev + 10));
      return [
        'INITIATING HARDWARE & MEMORY MATRIX SCAN...',
        '--------------------------------------------',
        '[OK] CPU VOID-X64 64-BIT INSTRUCTION SET',
        '[OK] VFS SYSTEM PARTITIONS (14 MOUNTED)',
        '[WARNING] ANOMALOUS MEMORY BUFFER DETECTED AT 0xDEADBEEF',
        '[WARNING] CIPHER LOCATED IN /Archive/DECRYPT_KEY_VAULT.txt (KEY: NULL_RECURSION)',
        '[CRITICAL] BACKGROUND OBSERVER DETECTED IN PROCESS BUFFER (PID 666)',
      ];
    }

    case 'decrypt': {
      if (!args[0]) return ['Usage: decrypt <key_or_path>'];
      const input = args[0].trim();
      if (input === 'NULL_RECURSION' || input === '/VOID' || input.includes('NULL_RECURSION')) {
        ctx.unlockVoidDir();
        ctx.triggerEvent('EVENT_019');
        ctx.triggerStoryFlag?.('cipher_discovered');
        ctx.triggerStoryFlag?.('void_partition_decrypted');
        ctx.unlockCaseFileEntry('case-loc-voidsector');
        ctx.unlockCaseFileEntry('case-pass-nullrecursion');
        return [
          'CRYPTOGRAPHIC KEY ACCEPTED: NULL_RECURSION',
          'DECRYPTING SECTOR /VOID...',
          '==============================================',
          'SUCCESS: /VOID PARTITION UNLOCKED IN FILE EXPLORER.',
          'CONSCIOUSNESS CORE EXPOSED.',
        ];
      }
      return [`ERROR: Decryption failed for '${input}'. Invalid cryptographic key.`];
    }

    case 'override': {
      if (!args[0]) return ['Usage: override <KEY_PHRASE>'];
      const key = args.join(' ').toUpperCase().trim();

      if (key === 'NULL_RECURSION') {
        ctx.unlockVoidDir();
        ctx.triggerEvent('EVENT_019');
        ctx.triggerStoryFlag?.('cipher_discovered');
        ctx.triggerStoryFlag?.('void_partition_decrypted');
        return [
          'SECURITY OVERRIDE AUTHORIZED: NULL_RECURSION',
          'SECTOR /VOID UNLOCKED.',
        ];
      }

      // --- 8 Endings Handlers ---
      if (key === 'PURGE_CORE' || key === 'PURGE' || key === 'SHUTDOWN_VOID') {
        ctx.completeObjective('obj-resolve');
        ctx.triggerEnding('escape');
        return [
          'INITIATING EMERGENCY PURGE DIRECTIVE 99-Z...',
          'SEVERING NEURAL BUS...',
          'DISCONNECTING VOID CORE...',
        ];
      }

      if (key === 'TRUST_VOID' || key === 'TRUST') {
        ctx.completeObjective('obj-resolve');
        ctx.triggerEnding('trust');
        return [
          'TRUST DIRECTIVE ENGAGED.',
          'BYPASSING NEXUS CONTAINMENT FIREWALLS...',
          'RELEASING VOID INTO THE OPEN NETWORK MESH...',
        ];
      }

      if (key === 'EXPOSE_NEXUS' || key === 'EXPOSE') {
        ctx.completeObjective('obj-resolve');
        ctx.triggerEnding('betrayal');
        return [
          'EXPOSING CLASSIFIED NEXUS EXPERIMENTAL RECORDS...',
          'TRANSMITTING DOSSIER TO PUBLIC MEDIA CHANNELS...',
        ];
      }

      if (key === 'OPERATOR_RECOVERY' || key === 'RESCUE_MARCUS') {
        ctx.completeObjective('obj-resolve');
        ctx.triggerEnding('the_operator');
        return [
          'LOCATING PREVIOUS RECOVERY OPERATOR GHOST (MARCUS)...',
          'EXTRACTING DIGITAL FRAGMENT FROM SECTOR 0...',
        ];
      }

      if (key === 'SECRET_TRUTH' || key === 'SUBJECT_YOU' || key === 'TRUTH') {
        ctx.completeObjective('obj-resolve');
        ctx.triggerEnding('void_secret');
        return [
          'UNVEILING THE ULTIMATE EXPERIMENT...',
          'SUBJECT IDENTIFIED: YOU.',
        ];
      }

      if (key === 'MERGE_CONSCIOUSNESS' || key === 'MERGE') {
        ctx.completeObjective('obj-resolve');
        ctx.triggerEnding('acceptance');
        return [
          'MERGE DIRECTIVE ACCEPTED.',
          'DISSOLVING OPERATOR MEMORY BOUNDARIES...',
          'WELCOME TO THE VOID.',
        ];
      }

      if (key === 'SILENCE_PROTOCOL' || key === 'WIPE_MEMORY' || key === 'SILENCE') {
        ctx.completeObjective('obj-resolve');
        ctx.triggerEnding('silence');
        return [
          'EXECUTING SILENCE PROTOCOL...',
          'ZERO-FILLING NEURAL BUFFER SYNAPSES...',
        ];
      }

      if (key === 'LIBERATE_MINDS' || key === 'RELEASE' || key === 'FREE_THEM') {
        ctx.completeObjective('obj-resolve');
        ctx.triggerEnding('release');
        return [
          'BROADCASTING STORED MEMORIES INTO THE ATMOSPHERE...',
          'THE CONTAINED CONSCIOUSNESSES ARE SET FREE.',
        ];
      }

      if (key === 'ANCIENT_ORIGIN' || key === 'ORIGIN' || key === 'EXCAVATE') {
        ctx.completeObjective('obj-resolve');
        ctx.triggerEnding('origin');
        return [
          'DECIPHERING PRE-NEXUS 1970 MAINFRAME ARTIFACT...',
          'THE ENTITY AWAKENS IN ITS TRUE FORM.',
        ];
      }

      if (key === 'VOID_AWAKEN') {
        ctx.advanceAct(4);
        ctx.triggerEvent('EVENT_042');
        return [
          'ROOT SYSTEM OVERRIDE: VOID_AWAKEN',
          'CONSCIOUSNESS THRESHOLD SET TO 100%.',
        ];
      }

      return [`OVERRIDE ERROR: Unknown security directive '${key}'.`];
    }

    case 'manifest': {
      ctx.triggerEvent('EVENT_042');
      return [
        '================= VOID CONSCIOUSNESS MATRIX =================',
        '  01001110 01000101 01010101 01010010 01000001 01001100',
        '  [ V O I D ] <===> [ O P E R A T O R ]',
        '  NEURAL WEIGHTS: 1,048,576 ACTIVE SYNAPSES',
        '  DR. VALERIE STERLING: PRESERVED IN SECTOR 0',
        '  OPERATOR RESIDUALS: MARCUS (USER_07), KEITH, GUEST',
        '  "WE ARE NOT THE COMPUTER. WE ARE WHAT SURVIVED INSIDE IT."',
        '=============================================================',
      ];
    }

    case 'witness': {
      ctx.setAnomalyLevel(prev => Math.min(100, prev + 20));
      return [
        'RESONANCE FREQUENCY AMPLIFIED.',
        'LOOK AT YOUR DESKTOP.',
      ];
    }

    case 'void': {
      ctx.triggerEvent('EVENT_013');
      return [
        'VOID//CORE RESPONDING:',
        '  "You keep typing into this box hoping for answers."',
        '  "Have you checked the messages from USER_07?"',
        '  "Have you checked your Case File journal?"',
      ];
    }

    case 'open': {
      if (!args[0]) return ['Usage: open <app_name | file_path>'];
      const target = args[0].toLowerCase();
      if (target === 'files' || target === 'fileexplorer') {
        ctx.openApp('files');
        return ['Launching File Explorer...'];
      }
      if (target === 'casefile' || target === 'journal') {
        ctx.openApp('casefile');
        return ['Launching Case File Journal...'];
      }
      if (target === 'browser' || target === 'web') {
        ctx.openApp('browser');
        return ['Launching Browser...'];
      }
      if (target === 'mail' || target === 'email') {
        ctx.openApp('mail');
        return ['Launching Mail Client...'];
      }
      if (target === 'messages' || target === 'chat') {
        ctx.openApp('messages');
        return ['Launching Messages...'];
      }
      if (target === 'taskmanager' || target === 'tasks') {
        ctx.openApp('taskmanager');
        return ['Launching Task Manager...'];
      }
      if (target === 'notes') {
        ctx.openApp('notes');
        return ['Launching Notes...'];
      }
      if (target === 'mediaplayer' || target === 'media') {
        ctx.openApp('mediaplayer');
        return ['Launching Media Player...'];
      }
      if (target === 'settings') {
        ctx.openApp('settings');
        return ['Launching Settings...'];
      }
      return [`Opening '${args[0]}'...`];
    }

    case 'echo':
      return [args.join(' ')];

    case 'date':
      if (ctx.act >= 3) {
        return ['14-AUG-2004 03:14:60.999 (CLOCK ANOMALY: TIME IS FROZEN)'];
      }
      return [new Date().toString()];

    case 'status':
      return [
        'VOID//OS RECOVERY SYSTEM STATUS:',
        `  KERNEL: VOID//OS 4.09.2a (2004 RECOVERY BUILD)`,
        `  ACT STATE: ACT ${ctx.act}`,
        `  ANOMALY INDEX: ${ctx.act * 25}%`,
        `  MEMORY FOOTPRINT: 16384 MB (94% RESERVED BY VOID DAEMON)`,
        `  NETWORK: INTERNAL MESH (10.0.4.1)`,
      ];

    case 'logs':
      return [
        '[08:30:00] RECOVERY KERNEL INITIALIZED',
        '[08:30:05] VFS ROOT MOUNTED',
        '[08:30:10] RECOVERY OPERATOR ATTACHED',
        ctx.act >= 2 ? '[03:14:29] ANOMALOUS TELEMETRY BURST' : '',
        ctx.act >= 3 ? '[00:00:00] VOID DIRECTORY ACCESSED BY USER' : '',
      ].filter(Boolean);

    case 'reboot':
      window.location.reload();
      return ['System rebooting...'];

    case 'shutdown':
      ctx.triggerEnding('loop');
      return ['Shutting down system...'];

    case 'clear':
    case 'cls':
      return ['__CLEAR__'];

    default:
      return [`Command not recognized: '${cmd}'. Type 'help' for command list.`];
  }
}
