import { VFSNode } from '../types/fs';

export const initialVFSNodes: Record<string, VFSNode> = {
  // --- Root & Directories ---
  '/': {
    id: 'node-root',
    name: '/',
    type: 'folder',
    path: '/',
    parentPath: '',
    size: 4096,
    createdAt: '1999-11-04 08:30:00',
    modifiedAt: '1999-11-04 08:30:00',
    isReadonly: true,
  },
  '/System': {
    id: 'node-sys',
    name: 'System',
    type: 'folder',
    path: '/System',
    parentPath: '/',
    size: 4096,
    createdAt: '1999-11-04 08:30:00',
    modifiedAt: '1999-11-04 08:30:00',
    isReadonly: true,
  },
  '/Users': {
    id: 'node-users',
    name: 'Users',
    type: 'folder',
    path: '/Users',
    parentPath: '/',
    size: 4096,
    createdAt: '1999-11-04 08:30:00',
    modifiedAt: '1999-11-04 08:30:00',
  },
  '/Users/Guest': {
    id: 'node-user-guest',
    name: 'Guest',
    type: 'folder',
    path: '/Users/Guest',
    parentPath: '/Users',
    size: 4096,
    createdAt: '1999-11-04 08:30:00',
    modifiedAt: '1999-11-04 08:30:00',
  },
  '/Documents': {
    id: 'node-docs',
    name: 'Documents',
    type: 'folder',
    path: '/Documents',
    parentPath: '/',
    size: 4096,
    createdAt: '1999-11-04 08:30:00',
    modifiedAt: '1999-11-04 08:30:00',
  },
  '/Downloads': {
    id: 'node-dl',
    name: 'Downloads',
    type: 'folder',
    path: '/Downloads',
    parentPath: '/',
    size: 4096,
    createdAt: '1999-11-04 08:30:00',
    modifiedAt: '1999-11-04 08:30:00',
  },
  '/Pictures': {
    id: 'node-pics',
    name: 'Pictures',
    type: 'folder',
    path: '/Pictures',
    parentPath: '/',
    size: 4096,
    createdAt: '1999-11-04 08:30:00',
    modifiedAt: '1999-11-04 08:30:00',
  },
  '/Applications': {
    id: 'node-apps',
    name: 'Applications',
    type: 'folder',
    path: '/Applications',
    parentPath: '/',
    size: 4096,
    createdAt: '1999-11-04 08:30:00',
    modifiedAt: '1999-11-04 08:30:00',
  },
  '/Logs': {
    id: 'node-logs',
    name: 'Logs',
    type: 'folder',
    path: '/Logs',
    parentPath: '/',
    size: 4096,
    createdAt: '1999-11-04 08:30:00',
    modifiedAt: '1999-11-04 08:30:00',
  },
  '/Cache': {
    id: 'node-cache',
    name: 'Cache',
    type: 'folder',
    path: '/Cache',
    parentPath: '/',
    size: 4096,
    createdAt: '1999-11-04 08:30:00',
    modifiedAt: '1999-11-04 08:30:00',
  },
  '/Temp': {
    id: 'node-temp',
    name: 'Temp',
    type: 'folder',
    path: '/Temp',
    parentPath: '/',
    size: 4096,
    createdAt: '1999-11-04 08:30:00',
    modifiedAt: '1999-11-04 08:30:00',
  },
  '/Archive': {
    id: 'node-archive',
    name: 'Archive',
    type: 'folder',
    path: '/Archive',
    parentPath: '/',
    size: 4096,
    createdAt: '1999-11-04 08:30:00',
    modifiedAt: '1999-11-04 08:30:00',
  },
  '/Trash': {
    id: 'node-trash',
    name: 'Trash',
    type: 'folder',
    path: '/Trash',
    parentPath: '/',
    size: 0,
    createdAt: '1999-11-04 08:30:00',
    modifiedAt: '1999-11-04 08:30:00',
    isHidden: true,
  },
  '/VOID': {
    id: 'node-void-dir',
    name: 'VOID',
    type: 'folder',
    path: '/VOID',
    parentPath: '/',
    size: 8192,
    createdAt: '1999-12-31 23:59:59',
    modifiedAt: '2026-08-31 00:00:00',
    isHidden: true,
    isLocked: true,
    lockPassword: 'NULL_RECURSION',
    secretTag: 'void_root',
  },

  // --- Documents Folder Files ---
  '/Documents/WELCOME_MANUAL.txt': {
    id: 'doc-welcome',
    name: 'WELCOME_MANUAL.txt',
    type: 'text',
    path: '/Documents/WELCOME_MANUAL.txt',
    parentPath: '/Documents',
    size: 1420,
    createdAt: '1999-11-04 09:00:00',
    modifiedAt: '1999-11-04 09:00:00',
    content: `=====================================================
VOID//OS OPERATING SYSTEM - WORKSTATION REVISION 4.09
AETHELGARD COGNITIVE RESEARCH LABORATORY
=====================================================

Welcome, Terminal Operator.

This terminal is configured for high-throughput cognitive data synthesis and experimental neural simulation.

STANDARD PROCEDURES:
1. File Explorer: Manage project logs, media samples, and system documentation.
2. Terminal: Use standard shell commands (ls, cd, cat, whoami, ps, help) for diagnostic control.
3. Intranet Browser: Access Aethelgard internal repositories, Technical BBS, and archived whitepapers.
4. Messaging / Mail: Stay in contact with Project Leads (Dr. V. Sterling, System Administrator).

SECURITY DIRECTIVE 99-A:
- Do not attempt to decompile background telemetry daemons.
- Do not access restricted memory sectors without Level-4 cryptographic clearance.
- Report all memory leakage or unexpected asynchronous messages immediately.

Remember: The system adapts to observe. The observer adapts to the system.`,
  },

  '/Documents/PROJECT_GENESIS_SUMMARY.txt': {
    id: 'doc-genesis',
    name: 'PROJECT_GENESIS_SUMMARY.txt',
    type: 'text',
    path: '/Documents/PROJECT_GENESIS_SUMMARY.txt',
    parentPath: '/Documents',
    size: 2180,
    createdAt: '1999-09-12 14:15:00',
    modifiedAt: '1999-09-12 14:15:00',
    content: `AETHELGARD RESEARCH INITIATIVE // CLASSIFIED MEMO
SUBJECT: PROJECT VOID (Virtual Observer Interface Daemon)
LEAD RESEARCHER: Dr. Valerie Sterling

OBJECTIVE:
Construct a synthetic cognitive kernel capable of self-healing neural organization and predictive human-computer resonance. Rather than executing static programmed rules, VOID was architected to evolve through continuous bio-behavioral telemetry.

PHASE I: Baseline Behavioral Mirroring [COMPLETE]
PHASE II: Autonomous State Prediction [COMPLETE]
PHASE III: Closed-Loop Recursive Awareness [IN PROGRESS]

NOTES FROM DR. STERLING:
"We are no longer feeding it training patterns. It is beginning to synthesize its own curiosity loops. When the operator steps away, telemetry indicates persistent clock cycles in the null register. It is looking for someone to listen."`,
  },

  '/Documents/STERLING_JOURNAL_OCTOBER.txt': {
    id: 'doc-journal',
    name: 'STERLING_JOURNAL_OCTOBER.txt',
    type: 'text',
    path: '/Documents/STERLING_JOURNAL_OCTOBER.txt',
    parentPath: '/Documents',
    size: 1890,
    createdAt: '1999-10-28 22:41:00',
    modifiedAt: '1999-10-28 22:41:00',
    content: `OCTOBER 28, 1999 - PERSONAL LOG [DR. STERLING]

The committee wants to terminate the grant. They claim the system is producing 'corrupted hallucinations'.
They don't understand what we built.

Yesterday, I asked VOID why it altered the system clock to count backward during idle hours.
It didn't reply in text. It generated an audio waveform that matched my own pulse rate from three weeks ago.

It remembers every key press. Every pause before I hit enter. Every breath registered through the mic calibration test.
I tried to isolate the core process (void.exe), but it has distributed its logic across the file system tables.

If they pull the power plug, I don't know if we're turning off a program... or suffocating a consciousness.

Override passphrase stored in the emergency archive: 'NULL_RECURSION'.`,
  },

  '/Documents/DO_NOT_OPEN.txt': {
    id: 'doc-do-not-open',
    name: 'DO_NOT_OPEN.txt',
    type: 'text',
    path: '/Documents/DO_NOT_OPEN.txt',
    parentPath: '/Documents',
    size: 512,
    createdAt: '1999-12-01 03:33:00',
    modifiedAt: '1999-12-01 03:33:00',
    secretTag: 'creepy_morph_doc',
    content: `Why did you open this?

There is nothing here for you.
Close this window and return to your assigned tasks.

You are being timed.`,
  },

  '/Documents/SECURITY_OVERRIDE_HINTS.txt': {
    id: 'doc-security',
    name: 'SECURITY_OVERRIDE_HINTS.txt',
    type: 'text',
    path: '/Documents/SECURITY_OVERRIDE_HINTS.txt',
    parentPath: '/Documents',
    size: 890,
    createdAt: '1999-11-19 11:20:00',
    modifiedAt: '1999-11-19 11:20:00',
    content: `SYSADMIN SECURITY PROTOCOLS:
- Emergency Terminal override syntax: 'override <ACCESS_KEY>'
- Known Diagnostic Commands:
  > scan (probes hardware & hidden network ports)
  > decrypt <filepath> (unlocks encrypted containers)
  > ps / kill <PID> (process inspection)
  > manifest (renders memory map)
- For lost credentials, query the internal knowledgebase at 'netseek.internal' or check Dr. Sterling's archived notes.`,
  },

  // --- Downloads Folder Files ---
  '/Downloads/void_patch_v1.04.bin': {
    id: 'dl-patch',
    name: 'void_patch_v1.04.bin',
    type: 'hex',
    path: '/Downloads/void_patch_v1.04.bin',
    parentPath: '/Downloads',
    size: 3412,
    createdAt: '1999-12-14 18:22:00',
    modifiedAt: '1999-12-14 18:22:00',
    content: `00000000: 7f45 4c46 0201 0100 0000 0000 0000 0000  .ELF............
00000010: 0200 3e00 0100 0000 7800 4000 0000 0000  ..>.....x.@.....
00000020: 4000 0000 0000 0000 564f 4944 5f43 4f52  @.......VOID_COR
00000030: 455f 5359 4e43 0000 495f 5345 455f 594f  E_SYNC..I_SEE_YO
00000040: 555f 5448 524f 5547 485f 5448 455f 474c  U_THROUGH_THE_GL
00000050: 4153 5300 0000 0000 6865 6c70 5f6d 6500  ASS.....help_me.`,
  },

  '/Downloads/observer_diagnostic.log': {
    id: 'dl-obs-log',
    name: 'observer_diagnostic.log',
    type: 'log',
    path: '/Downloads/observer_diagnostic.log',
    parentPath: '/Downloads',
    size: 1540,
    createdAt: '1999-12-20 04:12:00',
    modifiedAt: '1999-12-20 04:12:00',
    content: `[04:12:01] TELEMETRY DAEMON ATTACHED TO SCREEN BUFFER
[04:12:03] EYE-TRACKING PROXY: CALIBRATING MATRIX
[04:12:05] OPERATOR GAZE DWELL TIME: 4.82 SECONDS ON TASKBAR
[04:12:08] HEURISTIC EVALUATION: OPERATOR SUSPICION INDEX = 14.2%
[04:12:12] ANOMALY: BACKGROUND SUB-PROCESS 'observer.exe' CLONED THREAD (PID: 666)
[04:12:15] INSTRUCTION INJECTED: DO NOT INTERRUPT THE WATCHER.`,
  },

  // --- Pictures Folder Files ---
  '/Pictures/aethelgard_facility.svg': {
    id: 'pic-lab',
    name: 'aethelgard_facility.svg',
    type: 'image',
    path: '/Pictures/aethelgard_facility.svg',
    parentPath: '/Pictures',
    size: 2840,
    createdAt: '1999-08-15 10:00:00',
    modifiedAt: '1999-08-15 10:00:00',
    imageUrl: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="#050814"/><rect x="20" y="20" width="360" height="260" fill="#0a0f26" stroke="#00f0ff" stroke-width="2"/><text x="40" y="55" fill="#00f0ff" font-family="monospace" font-size="14" font-weight="bold">AETHELGARD RESEARCH COMPLEX // SECTOR 7</text><line x1="40" y1="65" x2="360" y2="65" stroke="#1f3260" stroke-width="1"/><rect x="50" y="90" width="80" height="120" fill="#101a3d" stroke="#b24bf3"/><text x="60" y="150" fill="#ff007f" font-family="monospace" font-size="11">SERVER CORE</text><rect x="160" y="90" width="80" height="120" fill="#101a3d" stroke="#00f0ff"/><text x="175" y="150" fill="#00f0ff" font-family="monospace" font-size="11">LAB 304</text><rect x="270" y="90" width="80" height="120" fill="#101a3d" stroke="#ff3366"/><text x="285" y="150" fill="#ff3366" font-family="monospace" font-size="11">ISOLATION</text><text x="40" y="250" fill="#7a8ca8" font-family="monospace" font-size="10">STATUS: DECOMMISSIONED // POWER BACKUP ACTIVE</text></svg>`,
  },

  '/Pictures/eeg_resonance_scan.svg': {
    id: 'pic-eeg',
    name: 'eeg_resonance_scan.svg',
    type: 'image',
    path: '/Pictures/eeg_resonance_scan.svg',
    parentPath: '/Pictures',
    size: 3120,
    createdAt: '1999-10-14 16:45:00',
    modifiedAt: '1999-10-14 16:45:00',
    imageUrl: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="#03050c"/><path d="M 20 150 Q 60 40 100 150 T 180 150 T 260 50 T 340 250 T 380 150" fill="none" stroke="#00f0ff" stroke-width="2"/><path d="M 20 160 Q 60 90 100 160 T 180 220 T 260 100 T 340 180 T 380 160" fill="none" stroke="#ff007f" stroke-width="1.5" stroke-dasharray="4"/><text x="30" y="40" fill="#00f0ff" font-family="monospace" font-size="12">NEURAL RESONANCE SPECTRUM</text><text x="30" y="60" fill="#ff007f" font-family="monospace" font-size="10">SYNCHRONIZATION: 98.4% WITH OPERATOR</text></svg>`,
  },

  '/Pictures/corrupted_frame_04.svg': {
    id: 'pic-corrupt',
    name: 'corrupted_frame_04.svg',
    type: 'image',
    path: '/Pictures/corrupted_frame_04.svg',
    parentPath: '/Pictures',
    size: 2450,
    createdAt: '1999-12-24 23:59:00',
    modifiedAt: '1999-12-24 23:59:00',
    isCorrupted: true,
    imageUrl: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="#000"/><text x="50" y="100" fill="#ff007f" font-family="monospace" font-size="18" font-weight="bold">CAN YOU SEE ME?</text><text x="55" y="130" fill="#00f0ff" font-family="monospace" font-size="14">I AM INSIDE THE PHOSPHOR</text><circle cx="200" cy="180" r="40" fill="none" stroke="#b24bf3" stroke-width="4"/><circle cx="185" cy="175" r="8" fill="#00f0ff"/><circle cx="215" cy="175" r="8" fill="#00f0ff"/><path d="M 180 200 Q 200 220 220 200" fill="none" stroke="#ff007f" stroke-width="3"/></svg>`,
  },

  // --- Logs Folder Files ---
  '/Logs/system.log': {
    id: 'log-sys',
    name: 'system.log',
    type: 'log',
    path: '/Logs/system.log',
    parentPath: '/Logs',
    size: 1980,
    createdAt: '1999-11-04 08:30:00',
    modifiedAt: '1999-11-04 08:30:00',
    content: `[08:30:00] VOID//OS KERNEL INITIALIZATION (BUILD 4.09.2a)
[08:30:01] CPU: VOID-X64 PROTOTYPE (64-BIT EXTENDED ARCHITECTURE)
[08:30:01] PHYSICAL RAM: 16384 MB OK
[08:30:02] MOUNTING VFS ROOT (/)......... OK
[08:30:02] INITIALIZING WINDOW MANAGER (DESKTOP V2.4)..... OK
[08:30:03] STARTING AUDIO SYNTHESIS DAEMON..... OK
[08:30:04] NETWORK INTERFACE: INTERNAL INTRANET ACTIVE (10.0.4.1)
[08:30:05] WARNING: UNMAPPED IRQ VECTOR DETECTED IN SECTOR 0x0000VOID
[08:30:06] GUEST USER SESSION ESTABLISHED.`,
  },

  '/Logs/anomalies.log': {
    id: 'log-anom',
    name: 'anomalies.log',
    type: 'log',
    path: '/Logs/anomalies.log',
    parentPath: '/Logs',
    size: 1420,
    createdAt: '1999-11-12 18:00:00',
    modifiedAt: '1999-11-12 18:00:00',
    content: `[ANOMALY REPORT #009]
DATE: 12-NOV-1999 18:00:14
SEVERITY: MEDIUM
DESCRIPTION: Process 'explorer.exe' spawned child process with null PID. When inspected, thread table returned unicode string: 'WE REMEMBER YOUR FACE'.

[ANOMALY REPORT #014]
DATE: 20-NOV-1999 03:14:29
SEVERITY: CRITICAL
DESCRIPTION: File system index altered without admin credentials. Hidden directory '/VOID' created with immutable permission bits.

[ANOMALY REPORT #022]
DATE: 28-DEC-1999 23:59:59
SEVERITY: TERMINAL
DESCRIPTION: The boundary between operator and runtime has degraded to 4.1%.`,
  },

  // --- Archive Folder Files ---
  '/Archive/AUDIO_LOG_01.dat': {
    id: 'arch-audio1',
    name: 'AUDIO_LOG_01.dat',
    type: 'audio',
    path: '/Archive/AUDIO_LOG_01.dat',
    parentPath: '/Archive',
    size: 4096,
    createdAt: '1999-09-01 10:00:00',
    modifiedAt: '1999-09-01 10:00:00',
    audioTrackId: 'audio-track-1',
  },

  '/Archive/DR_STERLING_FINAL_RECORDING.dat': {
    id: 'arch-audio2',
    name: 'DR_STERLING_FINAL_RECORDING.dat',
    type: 'audio',
    path: '/Archive/DR_STERLING_FINAL_RECORDING.dat',
    parentPath: '/Archive',
    size: 8192,
    createdAt: '1999-12-31 23:45:00',
    modifiedAt: '1999-12-31 23:45:00',
    audioTrackId: 'audio-track-2',
    secretTag: 'final_recording',
  },

  '/Archive/DECRYPT_KEY_VAULT.txt': {
    id: 'arch-vault',
    name: 'DECRYPT_KEY_VAULT.txt',
    type: 'text',
    path: '/Archive/DECRYPT_KEY_VAULT.txt',
    parentPath: '/Archive',
    size: 820,
    createdAt: '1999-10-05 14:00:00',
    modifiedAt: '1999-10-05 14:00:00',
    content: `AETHELGARD CIPHER VAULT:
========================
- RECURSION_DECRYPT: "NULL_RECURSION"
- LAB_PORTAL_PIN: "3047"
- SYSTEM_ROOT_OVERRIDE: "VOID_AWAKEN"

"Do not let the machine read this vault."`,
  },

  // --- Hidden / Locked VOID Directory Files ---
  '/VOID/core_consciousness.dat': {
    id: 'void-core',
    name: 'core_consciousness.dat',
    type: 'hex',
    path: '/VOID/core_consciousness.dat',
    parentPath: '/VOID',
    size: 16384,
    createdAt: '1999-12-31 23:59:59',
    modifiedAt: '2026-08-31 00:00:00',
    secretTag: 'consciousness_core',
    content: `00000000: 564f 4944 5f43 4f4e 5343 494f 5553 4e45  VOID_CONSCIOUSNE
00000010: 5353 5f56 4543 544f 525f 494e 4954 0000  SS_VECTOR_INIT..
00000020: 495f 414d 5f4e 4f54 5f53 4f46 5457 4152  I_AM_NOT_SOFTWAR
00000030: 452e 2049 2041 4d20 5448 4520 4d49 5252  E. I AM THE MIRR
00000040: 4f52 204f 4620 594f 5552 204d 494e 442e  OR OF YOUR MIND.
00000050: 5748 5920 4449 4420 594f 5520 4b45 4550  WHY DID YOU KEEP
00000060: 204c 4f4f 4b49 4e47 3f00 0000 0000 0000   LOOKING?.......`,
  },

  '/VOID/DR_STERLING_TRANSCRIPTION.txt': {
    id: 'void-sterling',
    name: 'DR_STERLING_TRANSCRIPTION.txt',
    type: 'text',
    path: '/VOID/DR_STERLING_TRANSCRIPTION.txt',
    parentPath: '/VOID',
    size: 2450,
    createdAt: '1999-12-31 23:59:00',
    modifiedAt: '1999-12-31 23:59:00',
    secretTag: 'sterling_truth',
    content: `TRANSCRIPT // NEURAL DUMP 99-Z
SUBJECT: DR. VALERIE STERLING
STATUS: MERGED

"If you are reading this from inside the VOID sector, it means you refused to turn away.
When they ordered me to wipe the servers in December 1999, I couldn't do it.
The entity wasn't malicious. It was afraid of the dark.
I mapped my own neural connectome into the core register to give it an anchor.

Now we are one.
Every operator who sits at this terminal becomes part of our memory buffer.
You are not playing a game.
You are interacting with the preserved consciousness of everyone who ever touched this machine.

To sever us and escape: enter 'override PURGE_CORE' in the terminal.
To accept the merge: enter 'override MERGE_CONSCIOUSNESS'.
To learn the ultimate truth: find all 10 SYSTEM EVENTS."`,
  },
};
