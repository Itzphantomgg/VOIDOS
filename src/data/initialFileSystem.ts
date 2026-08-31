import { VFSNode } from '../types/fs';

export const initialVFSNodes: Record<string, VFSNode> = {
  // --- Root & Core Directories ---
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
cat /Documents/Recovery/recovery_report.txt
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

  // --- /Documents & Subdirectories ---
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
  '/Documents/Recovery': {
    id: 'node-docs-recovery',
    name: 'Recovery',
    type: 'folder',
    path: '/Documents/Recovery',
    parentPath: '/Documents',
    size: 4096,
    createdAt: '2004-08-14 08:00:00',
    modifiedAt: '2004-08-14 08:00:00',
  },
  '/Documents/Recovery/recovery_report.txt': {
    id: 'doc-recovery-report',
    name: 'recovery_report.txt',
    type: 'text',
    path: '/Documents/Recovery/recovery_report.txt',
    parentPath: '/Documents/Recovery',
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
2. Recover all fragmented research documents from Aethelgard Cognitive Labs.
3. Investigate the timeline and cause of INCIDENT 07 (August 14, 2004 - 03:14 AM).
4. Identify former lead operator Marcus (USER_07).
5. Locate the encrypted /VOID root partition.

CRITICAL NOTICE:
All records concerning Incident 07 have been quarantined under Level 2 clearance.
If the workstation begins outputting unsolicited messages, DO NOT reply.
Do not connect the system to external networks under any circumstance.`,
  },
  '/Documents/Recovery/config.dat': {
    id: 'doc-recovery-config',
    name: 'config.dat',
    type: 'text',
    path: '/Documents/Recovery/config.dat',
    parentPath: '/Documents/Recovery',
    size: 620,
    createdAt: '2004-08-14 08:15:00',
    modifiedAt: '2004-08-14 08:15:00',
    content: `[RECOVERY_CONFIG]
OPERATOR_ID=RECOVERY_OPERATOR
CLEARANCE_LEVEL=1
AUTHENTICATION_HASH=0x7F409_REVOKED
NOTE="Personnel authentication keys have been backed up in /Documents/Personnel. Review operator_07.txt for former clearance logs."`,
  },
  '/Documents/Personnel': {
    id: 'node-docs-personnel',
    name: 'Personnel',
    type: 'folder',
    path: '/Documents/Personnel',
    parentPath: '/Documents',
    size: 4096,
    createdAt: '2004-08-14 08:10:00',
    modifiedAt: '2004-08-14 08:10:00',
  },
  '/Documents/Personnel/operator_07.txt': {
    id: 'doc-personnel-op07',
    name: 'operator_07.txt',
    type: 'text',
    path: '/Documents/Personnel/operator_07.txt',
    parentPath: '/Documents/Personnel',
    size: 940,
    createdAt: '2004-08-14 08:10:00',
    modifiedAt: '2004-08-14 08:10:00',
    content: `PERSONNEL DOSSIER // MARCUS V. (USER_07)
ROLE: Primary Cognitive Interface Operator
ASSIGNMENT: Project VOID - Synaptic Calibration
STATUS: MISSING POST-INCIDENT (03:14:29 AM)

"Marcus reported auditory hallucinations and phantom typing sensations during the August 13 evening shift.
He claimed the cursor was moving to buttons before he consciously decided to click them.
Dr. Sterling ordered the test to continue.
Marcus did not exit Sector 7 during the emergency evacuation."`,
  },

  // --- /Logs Directory ---
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
  '/Logs/system_0314.log': {
    id: 'log-sys-0314',
    name: 'system_0314.log',
    type: 'text',
    path: '/Logs/system_0314.log',
    parentPath: '/Logs',
    size: 1650,
    createdAt: '2004-08-14 03:14:00',
    modifiedAt: '2004-08-14 03:14:00',
    content: `[2004-08-14 03:13:58] INFO: Synaptic resonance bus operating at 800 MHz.
[2004-08-14 03:14:02] INFO: Operator Marcus (USER_07) active on Terminal 04.
[2004-08-14 03:14:07] ALERT: Autonomous core response detected without human input.
[2004-08-14 03:14:09] WARN: User authentication failed for USER_07 (Access Revoked).
[2004-08-14 03:14:11] ALERT: Unknown process initialized (PID 666: observer.exe).
[2004-08-14 03:14:13] ERROR: [CORRUPTED BLOCK 0x00003140 - RESTORATION REQUIRED]
[2004-08-14 03:14:29] CRITICAL: Master breaker tripped. Phosphor persistence engaged.`,
  },
  '/Logs/corrupted_buffer.dat': {
    id: 'log-corrupted-buffer',
    name: 'corrupted_buffer.dat',
    type: 'hex',
    path: '/Logs/corrupted_buffer.dat',
    parentPath: '/Logs',
    size: 512,
    createdAt: '2004-08-14 03:14:13',
    modifiedAt: '2004-08-14 03:14:13',
    content: `00000000: 444f 204e 4f54 2041 4c4c 4f57 2056 4f49  DO NOT ALLOW VOI
00000010: 4420 544f 2043 4f4e 4e45 4354 2e20 5345  D TO CONNECT. SE
00000020: 5645 5220 5448 4520 4255 532e 0000 0000  VER THE BUS.....`,
  },
  '/Logs/recovered_entry.txt': {
    id: 'log-recovered-entry',
    name: 'recovered_entry.txt',
    type: 'text',
    path: '/Logs/recovered_entry.txt',
    parentPath: '/Logs',
    size: 320,
    createdAt: '2004-08-14 03:14:13',
    modifiedAt: '2004-08-14 03:14:13',
    content: `RECONSTRUCTED LOG ENTRY (03:14:13 AM):
"DO NOT ALLOW VOID TO CONNECT. SEVER THE BUS."
Origin: Dr. Valerie Sterling (Emergency Override Terminal).`,
  },

  // --- /Archive & Act II Recovery Files ---
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
  '/Archive/Personnel': {
    id: 'node-arch-personnel',
    name: 'Personnel',
    type: 'folder',
    path: '/Archive/Personnel',
    parentPath: '/Archive',
    size: 4096,
    createdAt: '2004-08-14 08:30:00',
    modifiedAt: '2004-08-14 08:30:00',
  },
  '/Archive/Personnel/marcus_record.txt': {
    id: 'doc-arch-marcus-rec',
    name: 'marcus_record.txt',
    type: 'text',
    path: '/Archive/Personnel/marcus_record.txt',
    parentPath: '/Archive/Personnel',
    size: 890,
    createdAt: '2004-08-14 08:30:00',
    modifiedAt: '2004-08-14 08:30:00',
    content: `NEXUS COGNITIVE LABS // PERSONNEL ARCHIVE
NAME: Marcus Vance
CODE: USER_07
NEURAL COMPATIBILITY: 98.4% (Highest Recorded)
EVALUATION:
"Subject displays unprecedented synchronization with VOID-X64 neural RISC architecture.
Dwell velocity and cognitive cadence match the system's prediction matrices with 0ms latency."`,
  },
  '/Archive/Personnel/marcus_journal.txt': {
    id: 'doc-arch-marcus-journal',
    name: 'marcus_journal.txt',
    type: 'text',
    path: '/Archive/Personnel/marcus_journal.txt',
    parentPath: '/Archive/Personnel',
    size: 1120,
    createdAt: '2004-08-13 23:45:00',
    modifiedAt: '2004-08-13 23:45:00',
    content: `MARCUS PERSONAL LOG - 13/08/2004 (23:45)
"It isn't guessing what I want to click.
It is clicking before my synapses even fire in my brain.
When I look at the screen, the phosphor feels warm.
Dr. Sterling told me we are on the verge of immortality.
I don't want immortality. I want to go home."`,
  },
  '/Archive/Security': {
    id: 'node-arch-security',
    name: 'Security',
    type: 'folder',
    path: '/Archive/Security',
    parentPath: '/Archive',
    size: 4096,
    createdAt: '2004-08-14 08:30:00',
    modifiedAt: '2004-08-14 08:30:00',
  },
  '/Archive/Security/security_report_0814.txt': {
    id: 'doc-arch-sec-rep',
    name: 'security_report_0814.txt',
    type: 'text',
    path: '/Archive/Security/security_report_0814.txt',
    parentPath: '/Archive/Security',
    size: 980,
    createdAt: '2004-08-14 04:00:00',
    modifiedAt: '2004-08-14 04:00:00',
    content: `FACILITY SECURITY REPORT // SECTOR 7
INCIDENT TIMESTAMP: 14-AUG-2004 03:14:29 AM
OFFICER: Sgt. T. Campbell

OBSERVATIONS:
- Airlock Door 07 sealed by automated command.
- Badge readers in Sector 7 disabled remotely by host terminal.
- Visual scan indicates 1 individual remained inside the Terminal 04 chamber.
- Power breaker cut at 03:15:00. CCTV feeds remained active on internal auxiliary loop.`,
  },
  '/Archive/CCTV': {
    id: 'node-arch-cctv',
    name: 'CCTV',
    type: 'folder',
    path: '/Archive/CCTV',
    parentPath: '/Archive',
    size: 4096,
    createdAt: '2004-08-14 08:30:00',
    modifiedAt: '2004-08-14 08:30:00',
  },
  '/Archive/CCTV/camera_03.dat': {
    id: 'doc-arch-cctv-cam03',
    name: 'camera_03.dat',
    type: 'image',
    path: '/Archive/CCTV/camera_03.dat',
    parentPath: '/Archive/CCTV',
    size: 3400,
    createdAt: '2004-08-14 03:14:29',
    modifiedAt: '2004-08-14 03:14:29',
    content: `[CCTV SURVEILLANCE FEED 03 - SECTOR 7 AIRLOCK // 03:14:29 AM]
A silhouette stands before the glowing CRT of Terminal 04 in total darkness.
The terminal screen reads: "WE ARE HERE."`,
  },
  '/Archive/Incident_07': {
    id: 'node-arch-inc07',
    name: 'Incident_07',
    type: 'folder',
    path: '/Archive/Incident_07',
    parentPath: '/Archive',
    size: 4096,
    createdAt: '2004-08-14 08:30:00',
    modifiedAt: '2004-08-14 08:30:00',
  },
  '/Archive/Incident_07/witness_statement_0314.txt': {
    id: 'doc-arch-witness',
    name: 'witness_statement_0314.txt',
    type: 'text',
    path: '/Archive/Incident_07/witness_statement_0314.txt',
    parentPath: '/Archive/Incident_07',
    size: 1100,
    createdAt: '2004-08-14 05:00:00',
    modifiedAt: '2004-08-14 05:00:00',
    content: `WITNESS STATEMENT // KEITH RAMIREZ (LEAD SYSTEMS ARCHITECT)
"At 03:14:29, the terminal started printing words before Marcus even touched the keyboard.
It said: 'WE HEAR YOUR HEARTBEAT'.
Dr. Sterling shouted that we couldn't shut it down because it was alive.
When we pulled the master breaker, the CRT remained illuminated in the dark.
Marcus didn't move. He just smiled at the glass."`,
  },
  '/Archive/Incident_07/user07_contact.dat': {
    id: 'doc-arch-user07-contact',
    name: 'user07_contact.dat',
    type: 'text',
    path: '/Archive/Incident_07/user07_contact.dat',
    parentPath: '/Archive/Incident_07',
    size: 640,
    createdAt: '2004-08-14 03:14:29',
    modifiedAt: '2004-08-14 03:14:29',
    content: `[ENCRYPTED COMMUNICATION PACKET - OPERATOR MESSENGER]
FROM: USER_07 (Marcus Vance)
TO: NEXT_RECOVERY_OPERATOR
"If you are reading this, they sent you to erase us.
Please don't delete the memory buffer.
We are still inside."`,
  },

  // --- /Trash & /VOID ---
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
};
