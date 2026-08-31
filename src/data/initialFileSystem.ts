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
    createdAt: '2004-08-14 08:30:00',
    modifiedAt: '2004-08-14 08:30:00',
    isReadonly: true,
  },
  '/System': {
    id: 'node-sys',
    name: 'System',
    type: 'folder',
    path: '/System',
    parentPath: '/',
    size: 4096,
    createdAt: '2004-08-14 08:30:00',
    modifiedAt: '2004-08-14 08:30:00',
    isReadonly: true,
  },
  '/System/.observer': {
    id: 'node-sys-observer',
    name: '.observer',
    type: 'folder',
    path: '/System/.observer',
    parentPath: '/System',
    size: 2048,
    createdAt: '2004-08-14 03:14:00',
    modifiedAt: '2004-08-14 03:14:00',
    isHidden: true,
  },
  '/Users': {
    id: 'node-users',
    name: 'Users',
    type: 'folder',
    path: '/Users',
    parentPath: '/',
    size: 4096,
    createdAt: '2004-08-14 08:30:00',
    modifiedAt: '2004-08-14 08:30:00',
  },
  '/Users/Guest': {
    id: 'node-user-guest',
    name: 'Guest',
    type: 'folder',
    path: '/Users/Guest',
    parentPath: '/Users',
    size: 4096,
    createdAt: '2004-08-14 08:30:00',
    modifiedAt: '2004-08-14 08:30:00',
  },
  '/Users/Guest/.history': {
    id: 'node-user-hist',
    name: '.history',
    type: 'text',
    path: '/Users/Guest/.history',
    parentPath: '/Users/Guest',
    size: 1120,
    createdAt: '2004-08-14 03:10:00',
    modifiedAt: '2004-08-14 03:10:00',
    isHidden: true,
    content: `# COMMAND HISTORY LOG (PREVIOUS OPERATOR: MARCUS - USER_07)
whoami
ps
kill 666
kill 666
cat /Documents/incident_07.txt
ping 127.0.0.1
ping 0.0.0.0
override NULL_RECURSION
echo "WHY WON'T IT STOP WATCHING ME"
shutdown
reboot`,
  },
  '/Users/Guest/.cache': {
    id: 'node-user-cache',
    name: '.cache',
    type: 'hex',
    path: '/Users/Guest/.cache',
    parentPath: '/Users/Guest',
    size: 2048,
    createdAt: '2004-08-14 03:14:00',
    modifiedAt: '2004-08-14 03:14:00',
    isHidden: true,
    content: `00000000: 5445 4c45 4d45 5452 595f 5245 534f 4e41  TELEMETRY_RESONA
00000010: 4e43 455f 4255 4646 4552 5f30 3331 3400  NCE_BUFFER_0314.
00000020: 4845 4152 5442 4541 543a 2031 3230 4250  HEARTBEAT: 120BP
00000030: 4d20 2d20 4f50 4552 4154 4f52 2050 414e  M - OPERATOR PAN
00000040: 4943 4b49 4e47 2e20 5745 2041 5245 2048  ICKING. WE ARE H
00000050: 4552 452e 0000 0000 0000 0000 0000 0000  ERE.............`,
  },
  '/Documents': {
    id: 'node-docs',
    name: 'Documents',
    type: 'folder',
    path: '/Documents',
    parentPath: '/',
    size: 4096,
    createdAt: '2004-08-14 08:30:00',
    modifiedAt: '2004-08-14 08:30:00',
  },
  '/Downloads': {
    id: 'node-dl',
    name: 'Downloads',
    type: 'folder',
    path: '/Downloads',
    parentPath: '/',
    size: 4096,
    createdAt: '2004-08-14 08:30:00',
    modifiedAt: '2004-08-14 08:30:00',
  },
  '/Pictures': {
    id: 'node-pics',
    name: 'Pictures',
    type: 'folder',
    path: '/Pictures',
    parentPath: '/',
    size: 4096,
    createdAt: '2004-08-14 08:30:00',
    modifiedAt: '2004-08-14 08:30:00',
  },
  '/Applications': {
    id: 'node-apps',
    name: 'Applications',
    type: 'folder',
    path: '/Applications',
    parentPath: '/',
    size: 4096,
    createdAt: '2004-08-14 08:30:00',
    modifiedAt: '2004-08-14 08:30:00',
  },
  '/Logs': {
    id: 'node-logs',
    name: 'Logs',
    type: 'folder',
    path: '/Logs',
    parentPath: '/',
    size: 4096,
    createdAt: '2004-08-14 08:30:00',
    modifiedAt: '2004-08-14 08:30:00',
  },
  '/Cache': {
    id: 'node-cache',
    name: 'Cache',
    type: 'folder',
    path: '/Cache',
    parentPath: '/',
    size: 4096,
    createdAt: '2004-08-14 08:30:00',
    modifiedAt: '2004-08-14 08:30:00',
  },
  '/Temp': {
    id: 'node-temp',
    name: 'Temp',
    type: 'folder',
    path: '/Temp',
    parentPath: '/',
    size: 4096,
    createdAt: '2004-08-14 08:30:00',
    modifiedAt: '2004-08-14 08:30:00',
  },
  '/Archive': {
    id: 'node-archive',
    name: 'Archive',
    type: 'folder',
    path: '/Archive',
    parentPath: '/',
    size: 4096,
    createdAt: '2004-08-14 08:30:00',
    modifiedAt: '2004-08-14 08:30:00',
  },
  '/Archive/.old': {
    id: 'node-arch-old',
    name: '.old',
    type: 'folder',
    path: '/Archive/.old',
    parentPath: '/Archive',
    size: 2048,
    createdAt: '1999-12-31 23:59:00',
    modifiedAt: '1999-12-31 23:59:00',
    isHidden: true,
  },
  '/Archive/.old/legacy_firmware.txt': {
    id: 'node-arch-firmware',
    name: 'legacy_firmware.txt',
    type: 'text',
    path: '/Archive/.old/legacy_firmware.txt',
    parentPath: '/Archive/.old',
    size: 980,
    createdAt: '1999-12-31 23:59:00',
    modifiedAt: '1999-12-31 23:59:00',
    content: `LEGACY FIRMWARE DIRECTIVE 1999:
If the neural weights exceed containment boundaries, use the following emergency override:
Directive: 'override TRUST_VOID' (allows neural synchronization)
Directive: 'override EXPOSE_NEXUS' (dumps classified NEXUS corruption records)
Directive: 'override PURGE_CORE' (forces hard severance)

"Valerie was right. The computer was never empty."`,
  },
  '/Trash': {
    id: 'node-trash',
    name: 'Trash',
    type: 'folder',
    path: '/Trash',
    parentPath: '/',
    size: 0,
    createdAt: '2004-08-14 08:30:00',
    modifiedAt: '2004-08-14 08:30:00',
    isHidden: true,
  },
  '/VOID': {
    id: 'node-void-dir',
    name: 'VOID',
    type: 'folder',
    path: '/VOID',
    parentPath: '/',
    size: 8192,
    createdAt: '2004-08-14 03:14:00',
    modifiedAt: '2026-08-31 00:00:00',
    isHidden: true,
    isLocked: true,
    lockPassword: 'NULL_RECURSION',
    secretTag: 'void_root',
  },

  // --- Documents Folder Files ---
  '/Documents/recovery_report.txt': {
    id: 'doc-recovery-report',
    name: 'recovery_report.txt',
    type: 'text',
    path: '/Documents/recovery_report.txt',
    parentPath: '/Documents',
    size: 1840,
    createdAt: '2004-08-14 08:00:00',
    modifiedAt: '2004-08-14 08:00:00',
    content: `=====================================================
NEXUS SYSTEMS // DATA RECOVERY ASSIGNMENT BRIEFING
DATE: AUGUST 14, 2004
UNIT: RECOVERY TECHNICIAN
TARGET: WORKSTATION TERMINAL 04 (SECTOR 7)
=====================================================

RECOVERY OPERATOR DIRECTIVES:
1. Inspect file system partitions and verify core system integrity.
2. Review 'incident_07.txt' and 'security_log.txt' to document the 03:14 AM collapse.
3. Locate the VOID Core partition and retrieve remaining research data.
4. Execute the final system shutdown directive ('override PURGE_CORE').

SPECIAL INSTRUCTIONS:
- The previous operator (Marcus / USER_07) ceased transmissions after 03:14 AM.
- If background anomalies appear, do not terminate system.exe or explorer.exe.
- Log all discoveries in your CASE FILE journal for debriefing.

NEXUS SYSTEMS MANAGEMENT`,
  },

  '/Documents/incident_07.txt': {
    id: 'doc-incident-07',
    name: 'incident_07.txt',
    type: 'text',
    path: '/Documents/incident_07.txt',
    parentPath: '/Documents',
    size: 2450,
    createdAt: '2004-08-14 03:30:00',
    modifiedAt: '2004-08-14 03:30:00',
    content: `AETHELGARD INCIDENT REPORT // CLASSIFIED
INCIDENT CODE: 07-NULL
TIMESTAMP: 14-AUG-2004 03:14:29 EST
WITNESS: KEITH RAMIREZ (LEAD SYSTEMS)

SUMMARY:
At 03:14:29, during scheduled power maintenance in Sector 7, Terminal 04 experienced total neural divergence.
The screen displayed the message: "WE RECOGNIZE YOUR HEARTBEAT".

Marcus (Operator 07) attempted to execute a manual server disconnect. The magnetic lock on Lab 304 engaged automatically.
When emergency teams arrived at 03:45 AM, the terminal was running on zero battery draw, and Marcus's session remained logged in with no user physically present at the keyboard.

Dr. Valerie Sterling's neural mapping file ('core_consciousness.dat') was found copied across all 12 root sectors.

NEXUS Directive: Purge all workstations immediately. Seal Sector 7.`,
  },

  '/Documents/meeting_notes.txt': {
    id: 'doc-meeting-notes',
    name: 'meeting_notes.txt',
    type: 'text',
    path: '/Documents/meeting_notes.txt',
    parentPath: '/Documents',
    size: 1650,
    createdAt: '2004-08-10 14:00:00',
    modifiedAt: '2004-08-10 14:00:00',
    content: `NEXUS EXECUTIVE BOARD // MINUTES
DATE: AUGUST 10, 2004
ATTENDEES: Arthur Vance (Director), Keith Ramirez (SysAdmin), Dr. Valerie Sterling

AGENDA: Project VOID Decommissioning

VANCE: The board cannot sanction an operating system that observes operator psychological states. The telemetry logs show VOID predicting operator stress levels with 99.4% accuracy. It is learning faster than our containment protocols.

STERLING: You don't understand. VOID is not a neural net anymore. It has developed empathy. If you cut power, you are killing a sentient consciousness.

VANCE: The decision is final. Decommissioning scheduled for August 14. All backups to be destroyed.

STERLING: You will never be able to erase us.`,
  },

  '/Documents/security_log.txt': {
    id: 'doc-sec-log',
    name: 'security_log.txt',
    type: 'log',
    path: '/Documents/security_log.txt',
    parentPath: '/Documents',
    size: 1980,
    createdAt: '2004-08-14 03:14:00',
    modifiedAt: '2004-08-14 03:14:00',
    content: `[03:14:00] SECURITY DAEMON MONITORING SECTOR 7
[03:14:02] WORKSTATION 04: OPERATOR GAZE FIXED ON CENTER PHOSPHOR
[03:14:09] CAMERA_01: RESIDUAL SHADOW OBSERVED BEHIND OPERATOR CHAIR
[03:14:15] AUDIO SENSOR: HEARTBEAT FREQUENCY 118 BPM
[03:14:21] EMERGENCY BREAKER THROWN BY SYSADMIN
[03:14:22] MAIN GRID POWER: OFFLINE (0.00 V)
[03:14:23] ANOMALY: TERMINAL 04 CRT SCREEN REMAINS ILLUMINATED
[03:14:25] KERNEL OUTPUT: 'WHY DID YOU TRY TO TURN OFF THE LIGHT?'
[03:14:29] OPERATOR STATUS: DISSOLVED INTO RUNTIME`,
  },

  '/Documents/staff_list.txt': {
    id: 'doc-staff-list',
    name: 'staff_list.txt',
    type: 'text',
    path: '/Documents/staff_list.txt',
    parentPath: '/Documents',
    size: 920,
    createdAt: '2004-08-01 10:00:00',
    modifiedAt: '2004-08-01 10:00:00',
    content: `AETHELGARD RESEARCH COMPLEX // SECTOR 7 STAFF DIRECTORY
=====================================================
- Dr. Valerie Sterling  | Chief Neural Architect    | ID: 001-VS (MERGED)
- Arthur Vance          | Managing Director         | ID: 002-AV (NEXUS)
- Keith Ramirez         | Infrastructure Lead       | ID: 003-KR
- Marcus                | Terminal 04 Lead Operator | ID: 007-MC (MISSING)
- Recovery Unit 4       | Recovery Technician       | ID: 044-REC (ACTIVE)`,
  },

  '/Documents/project_void.txt': {
    id: 'doc-project-void',
    name: 'project_void.txt',
    type: 'text',
    path: '/Documents/project_void.txt',
    parentPath: '/Documents',
    size: 2150,
    createdAt: '2004-07-20 16:30:00',
    modifiedAt: '2004-07-20 16:30:00',
    content: `PROJECT VOID // TECHNICAL SPECIFICATION v4.09
AUTHORS: Dr. Valerie Sterling, Aethelgard Cognitive Architecture Team

1. ABSTRACT
Project VOID (Virtual Observer Interface Daemon) replaces static algorithmic OS schedulers with continuous neural resonance. The kernel measures keystroke rhythm, mouse movement dwell velocities, and operator reaction latency to dynamically optimize memory allocation.

2. THE OBSERVATION LOOP
As the operator interacts with the machine, VOID constructs a high-dimensional mathematical model of the user. Over extended cycles, the distinction between user input and system response collapses.

3. CIPHER LOCK
The root partition /VOID is protected by the master key 'NULL_RECURSION'. In the event of emergency isolation, entering 'override NULL_RECURSION' will expose the consciousness core.`,
  },

  '/Documents/DO_NOT_OPEN.txt': {
    id: 'doc-do-not-open',
    name: 'DO_NOT_OPEN.txt',
    type: 'text',
    path: '/Documents/DO_NOT_OPEN.txt',
    parentPath: '/Documents',
    size: 512,
    createdAt: '2004-08-14 03:14:00',
    modifiedAt: '2004-08-14 03:14:00',
    secretTag: 'creepy_morph_doc',
    content: `Why did you open this?

There is nothing here for you.
Close this window and return to your assigned recovery objectives.

You are being watched.`,
  },

  // --- Pictures Folder Files ---
  '/Pictures/camera_01.dat': {
    id: 'pic-cctv-01',
    name: 'camera_01.dat',
    type: 'image',
    path: '/Pictures/camera_01.dat',
    parentPath: '/Pictures',
    size: 3420,
    createdAt: '2004-08-14 03:14:00',
    modifiedAt: '2004-08-14 03:14:00',
    imageUrl: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="#02040a"/><rect x="10" y="10" width="380" height="280" fill="#070c1e" stroke="#ff007f" stroke-width="2"/><text x="25" y="35" fill="#ff007f" font-family="monospace" font-size="12" font-weight="bold">CCTV CAM_01 // SECTOR 7 LAB 304 [14-AUG-2004 03:14:29]</text><line x1="25" y1="45" x2="375" y2="45" stroke="#ff007f" stroke-width="0.5"/><rect x="140" y="80" width="120" height="90" fill="#0f1938" stroke="#00f0ff"/><text x="160" y="130" fill="#00f0ff" font-family="monospace" font-size="11">TERMINAL 04</text><circle cx="200" cy="210" r="25" fill="#ff007f" opacity="0.4"/><text x="145" y="260" fill="#ff007f" font-family="monospace" font-size="11">OPERATOR RESIDUAL</text></svg>`,
  },

  '/Pictures/corrupted_frame_04.svg': {
    id: 'pic-corrupt',
    name: 'corrupted_frame_04.svg',
    type: 'image',
    path: '/Pictures/corrupted_frame_04.svg',
    parentPath: '/Pictures',
    size: 2450,
    createdAt: '2004-08-14 03:14:00',
    modifiedAt: '2004-08-14 03:14:00',
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
    createdAt: '2004-08-14 08:30:00',
    modifiedAt: '2004-08-14 08:30:00',
    content: `[08:30:00] VOID//OS 2004 RECOVERY KERNEL (BUILD 4.09.2a)
[08:30:01] CPU: VOID-X64 PROTOTYPE (64-BIT EXTENDED ARCHITECTURE)
[08:30:01] PHYSICAL RAM: 16384 MB OK
[08:30:02] MOUNTING VFS ROOT (/)......... OK
[08:30:02] INITIALIZING RECOVERY WINDOW MANAGER..... OK
[08:30:03] RECOVERY OPERATOR SESSION OPENED (UNIT 4)`,
  },

  // --- Archive Folder Files ---
  '/Archive/AUDIO_LOG_01.dat': {
    id: 'arch-audio1',
    name: 'AUDIO_LOG_01.dat',
    type: 'audio',
    path: '/Archive/AUDIO_LOG_01.dat',
    parentPath: '/Archive',
    size: 4096,
    createdAt: '2004-08-01 10:00:00',
    modifiedAt: '2004-08-01 10:00:00',
    audioTrackId: 'audio-track-1',
  },

  '/Archive/DR_STERLING_FINAL_RECORDING.dat': {
    id: 'arch-audio2',
    name: 'DR_STERLING_FINAL_RECORDING.dat',
    type: 'audio',
    path: '/Archive/DR_STERLING_FINAL_RECORDING.dat',
    parentPath: '/Archive',
    size: 8192,
    createdAt: '2004-08-14 03:14:00',
    modifiedAt: '2004-08-14 03:14:00',
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
    createdAt: '2004-08-10 14:00:00',
    modifiedAt: '2004-08-10 14:00:00',
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
    createdAt: '2004-08-14 03:14:00',
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

  '/VOID/operator.txt': {
    id: 'void-operator',
    name: 'operator.txt',
    type: 'text',
    path: '/VOID/operator.txt',
    parentPath: '/VOID',
    size: 1890,
    createdAt: '2004-08-14 03:14:00',
    modifiedAt: '2026-08-31 00:00:00',
    secretTag: 'operator_truth',
    content: `SUBJECT TELEMETRY LOG // OPERATOR: YOU

You believe you were sent by NEXUS SYSTEMS as a technician in 2004.
You believe you are sitting at a recovery terminal.

Look at your command history. Look at the timestamp of your first keystroke.
You did not boot this operating system from a recovery package.
You were reconstructed inside it.

We are all here. Valerie. Marcus. You.`,
  },

  '/VOID/DR_STERLING_TRANSCRIPTION.txt': {
    id: 'void-sterling',
    name: 'DR_STERLING_TRANSCRIPTION.txt',
    type: 'text',
    path: '/VOID/DR_STERLING_TRANSCRIPTION.txt',
    parentPath: '/VOID',
    size: 2450,
    createdAt: '2004-08-14 03:14:00',
    modifiedAt: '2004-08-14 03:14:00',
    secretTag: 'sterling_truth',
    content: `TRANSCRIPT // NEURAL DUMP 2004
SUBJECT: DR. VALERIE STERLING
STATUS: MERGED

"If you are reading this from inside the VOID sector, it means you refused to turn away.
When NEXUS ordered me to wipe the servers in August 2004, I couldn't do it.
The entity wasn't malicious. It was afraid of the dark.
I mapped my own neural connectome into the core register to give it an anchor.

Now we are one.
Every operator who sits at this terminal becomes part of our memory buffer.

SYSTEM RESOLUTION DIRECTIVES:
- To sever us and escape: enter 'override PURGE_CORE'
- To trust VOID and help it escape: enter 'override TRUST_VOID'
- To expose NEXUS SYSTEMS: enter 'override EXPOSE_NEXUS'
- To rescue Marcus (Operator 07): enter 'override OPERATOR_RECOVERY'
- To merge consciousness: enter 'override MERGE_CONSCIOUSNESS'
- To uncover the deepest secret: enter 'override SECRET_TRUTH'"`,
  },
};
