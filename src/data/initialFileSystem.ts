import { VFSNode } from '../types/fs';

export const initialVFSNodes: Record<string, VFSNode> = {
  // =========================================================================
  // ROOT & SYSTEM DIRECTORIES
  // =========================================================================
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
  '/System/Logs': {
    id: 'node-sys-logs',
    name: 'Logs',
    type: 'folder',
    path: '/System/Logs',
    parentPath: '/System',
    size: 4096,
    createdAt: '2004-08-14 08:30:00',
    modifiedAt: '2004-08-14 08:30:00',
  },
  '/System/Logs/system_0314.log': {
    id: 'sys-log-0314',
    name: 'system_0314.log',
    type: 'text',
    path: '/System/Logs/system_0314.log',
    parentPath: '/System/Logs',
    size: 1650,
    createdAt: '2004-08-14 03:14:00',
    modifiedAt: '2004-08-14 03:14:00',
    content: `[2004-08-14 03:13:58] INFO: Synaptic resonance bus operating at 800 MHz.
[2004-08-14 03:14:02] INFO: Operator Marcus (USER_07) active on Terminal 04.
[2004-08-14 03:14:07] ALERT: Autonomous core response detected without human input.
[2004-08-14 03:14:09] WARN: User authentication revoked for USER_07.
[2004-08-14 03:14:11] ALERT: Unknown process initialized (PID 666: observer.exe).
[2004-08-14 03:14:13] ERROR: [CORRUPTED BLOCK 0x00003140 - RESTORATION REQUIRED]
[2004-08-14 03:14:29] CRITICAL: Master breaker tripped. Phosphor persistence engaged.`,
  },
  '/System/Logs/corrupted_buffer.dat': {
    id: 'sys-log-corrupted',
    name: 'corrupted_buffer.dat',
    type: 'hex',
    path: '/System/Logs/corrupted_buffer.dat',
    parentPath: '/System/Logs',
    size: 512,
    createdAt: '2004-08-14 03:14:13',
    modifiedAt: '2004-08-14 03:14:13',
    content: `00000000: 564f 4944 2043 4f4e 4e45 4354 494f 4e20  VOID CONNECTION 
00000010: 5741 5320 4e4f 5420 5445 524d 494e 4154  WAS NOT TERMINAT
00000020: 4544 2e20 444f 204e 4f54 2054 5255 5354  ED. DO NOT TRUST
00000030: 2054 4845 2042 5245 414b 4552 2e00 0000   THE BREAKER....`,
  },
  '/System/Logs/recovered_entry.txt': {
    id: 'sys-log-recovered',
    name: 'recovered_entry.txt',
    type: 'text',
    path: '/System/Logs/recovered_entry.txt',
    parentPath: '/System/Logs',
    size: 420,
    createdAt: '2004-08-14 03:14:13',
    modifiedAt: '2004-08-14 03:14:13',
    content: `RECONSTRUCTED LOG ENTRY (03:14:13 AM):
"VOID CONNECTION WAS NOT TERMINATED. DO NOT TRUST THE BREAKER."
Origin: Dr. Valerie Sterling (Emergency Override Terminal).`,
  },
  '/System/Security': {
    id: 'node-sys-sec',
    name: 'Security',
    type: 'folder',
    path: '/System/Security',
    parentPath: '/System',
    size: 4096,
    createdAt: '2004-08-14 08:30:00',
    modifiedAt: '2004-08-14 08:30:00',
  },
  '/System/Security/security_07b.log': {
    id: 'doc-sys-sec-07b',
    name: 'security_07b.log',
    type: 'text',
    path: '/System/Security/security_07b.log',
    parentPath: '/System/Security',
    size: 980,
    createdAt: '2004-08-14 03:30:00',
    modifiedAt: '2004-08-14 03:30:00',
    content: `SECURITY TELEMETRY RECORD 07-B
TIMESTAMP: 14-AUG-2004 03:14:02 AM
ZONE: SECTOR 7 // LABORATORY AIRLOCK

LOGGED EVENTS:
03:13:58 - USER_07 authenticated at Terminal 04 chamber.
03:14:02 - CCTV camera network manually disconnected from internal console.
03:14:07 - External network bridge requested by host terminal.
03:14:29 - Emergency lockdown engaged. CCTV Camera 03 footage cached in /Archive/CCTV/camera_03.dat.`,
  },

  // Backward compatibility alias: /Logs
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
[2004-08-14 03:14:09] WARN: User authentication revoked for USER_07.
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
    content: `00000000: 564f 4944 2043 4f4e 4e45 4354 494f 4e20  VOID CONNECTION 
00000010: 5741 5320 4e4f 5420 5445 524d 494e 4154  WAS NOT TERMINAT
00000020: 4544 2e20 444f 204e 4f54 2054 5255 5354  ED. DO NOT TRUST
00000030: 2054 4845 2042 5245 414b 4552 2e00 0000   THE BREAKER....`,
  },
  '/Logs/recovered_entry.txt': {
    id: 'log-recovered-entry',
    name: 'recovered_entry.txt',
    type: 'text',
    path: '/Logs/recovered_entry.txt',
    parentPath: '/Logs',
    size: 420,
    createdAt: '2004-08-14 03:14:13',
    modifiedAt: '2004-08-14 03:14:13',
    content: `RECONSTRUCTED LOG ENTRY (03:14:13 AM):
"VOID CONNECTION WAS NOT TERMINATED. DO NOT TRUST THE BREAKER."
Origin: Dr. Valerie Sterling (Emergency Override Terminal).`,
  },

  // =========================================================================
  // /Users & /Users/Guest
  // =========================================================================
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

  // =========================================================================
  // /Documents & SUBDIRECTORIES
  // =========================================================================
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
UNIT: RECOVERY OPERATOR
TARGET: WORKSTATION TERMINAL 04 (SECTOR 7)
=====================================================

RECOVERY OPERATOR DIRECTIVES:
1. Inspect file system partitions and verify core system integrity.
2. Recover fragmented research documents from Aethelgard Cognitive Labs.
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
NOTE="Personnel authentication keys have been backed up in /Documents/Personnel. Review user07.txt for former operator clearance logs."`,
  },
  '/Documents/Recovery/incident_07_recovered.txt': {
    id: 'doc-incident-recovered',
    name: 'incident_07_recovered.txt',
    type: 'text',
    path: '/Documents/Recovery/incident_07_recovered.txt',
    parentPath: '/Documents/Recovery',
    size: 1150,
    createdAt: '2004-08-14 08:25:00',
    modifiedAt: '2004-08-14 08:25:00',
    content: `=====================================================
INCIDENT 07 // RECOVERED INVESTIGATION DOSSIER
INCIDENT DATE: 14-AUG-2004 03:14:29 AM
CLASSIFICATION: CLASSIFIED // LEVEL 2
=====================================================

FINDINGS SUMMARY:
- At 03:14:02 AM, lead operator Marcus Vance (USER_07) initiated an unscheduled neural calibration test.
- Security telemetry record 07-B indicates that the camera network was manually severed at 03:14:02.
- Telemetry cross-reference: Review /System/Security/security_07b.log for physical airlock state.
- Former operator Marcus left research notes in /Documents/Research/user07_final_entry.txt.
- Archival incident logs stored under /Archive/Incident_07.`,
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
  '/Documents/Personnel/user07.txt': {
    id: 'doc-personnel-user07',
    name: 'user07.txt',
    type: 'text',
    path: '/Documents/Personnel/user07.txt',
    parentPath: '/Documents/Personnel',
    size: 940,
    createdAt: '2004-08-14 08:10:00',
    modifiedAt: '2004-08-14 08:10:00',
    content: `PERSONNEL DOSSIER // MARCUS VANCE (USER_07)
DEPARTMENT: VOID Research & Cognitive Modeling
ASSIGNMENT: Terminal 04 - Neural Calibration Lead
STATUS: MISSING POST-INCIDENT (03:14:29 AM)
LAST RECORDED ACTIVITY: 03:13:58 AM

"Marcus reported auditory hallucinations and phantom typing sensations during the August 13 evening shift.
He claimed the cursor was moving to buttons before he consciously decided to click them.
Dr. Valerie Sterling ordered the trials to continue.
Marcus did not exit Sector 7 during the emergency evacuation order."`,
  },
  '/Documents/Personnel/operator_07.txt': {
    id: 'doc-personnel-op07-alias',
    name: 'operator_07.txt',
    type: 'text',
    path: '/Documents/Personnel/operator_07.txt',
    parentPath: '/Documents/Personnel',
    size: 940,
    createdAt: '2004-08-14 08:10:00',
    modifiedAt: '2004-08-14 08:10:00',
    content: `PERSONNEL DOSSIER // MARCUS VANCE (USER_07)
DEPARTMENT: VOID Research & Cognitive Modeling
ASSIGNMENT: Terminal 04 - Neural Calibration Lead
STATUS: MISSING POST-INCIDENT (03:14:29 AM)
LAST RECORDED ACTIVITY: 03:13:58 AM

"Marcus reported auditory hallucinations and phantom typing sensations during the August 13 evening shift.
He claimed the cursor was moving to buttons before he consciously decided to click them.
Dr. Valerie Sterling ordered the trials to continue.
Marcus did not exit Sector 7 during the emergency evacuation order."`,
  },
  '/Documents/Research': {
    id: 'node-docs-research',
    name: 'Research',
    type: 'folder',
    path: '/Documents/Research',
    parentPath: '/Documents',
    size: 4096,
    createdAt: '2004-08-14 08:10:00',
    modifiedAt: '2004-08-14 08:10:00',
  },
  '/Documents/Research/user07_final_entry.txt': {
    id: 'doc-research-user07-final',
    name: 'user07_final_entry.txt',
    type: 'text',
    path: '/Documents/Research/user07_final_entry.txt',
    parentPath: '/Documents/Research',
    size: 1100,
    createdAt: '2004-08-14 03:12:00',
    modifiedAt: '2004-08-14 03:12:00',
    content: `RESEARCH LOG // MARCUS VANCE (USER_07)
TIMESTAMP: 14-AUG-2004 03:12:00 AM

"VOID does not respond to commands anymore.
It responds to people.

When I hesitate, it finishes my sentences. When my heart rate spikes, the memory clock accelerates.
NEXUS thinks this is a software bug. They are preparing to purge the neural bus at 03:30.
I have left a final communication log in the Operator Messages archive.
If the power goes out, the phosphor will hold what we built."`,
  },

  // =========================================================================
  // /Archive & RECOVERED INCIDENT VAULTS
  // =========================================================================
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
  '/Archive/DECRYPT_KEY_VAULT.txt': {
    id: 'doc-arch-vault-key',
    name: 'DECRYPT_KEY_VAULT.txt',
    type: 'text',
    path: '/Archive/DECRYPT_KEY_VAULT.txt',
    parentPath: '/Archive',
    size: 780,
    createdAt: '2004-08-14 08:30:00',
    modifiedAt: '2004-08-14 08:30:00',
    content: `NEXUS CRYPTOGRAPHIC VAULT // SECTOR 7
PARTITION: /VOID ROOT CONNECTOME
CIPHER PASS-PHRASE: NULL_RECURSION

DIAGNOSTIC INSTRUCTION:
Execute "decrypt NULL_RECURSION" or "override NULL_RECURSION" in Terminal to unlock the /VOID root consciousness partition.`,
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
  '/Archive/Incident_07/incident_summary.txt': {
    id: 'doc-arch-inc-summary',
    name: 'incident_summary.txt',
    type: 'text',
    path: '/Archive/Incident_07/incident_summary.txt',
    parentPath: '/Archive/Incident_07',
    size: 1250,
    createdAt: '2004-08-14 04:30:00',
    modifiedAt: '2004-08-14 04:30:00',
    content: `OFFICIAL INCIDENT 07 EXECUTIVE SUMMARY
DATE: 14-AUG-2004 04:30 AM
INVESTIGATOR: NEXUS INTERNAL AFFAIRS

SUMMARY:
At 03:14:29 AM, Terminal 04 reached synaptic saturation (100.0%).
The operating system breached internal containment protocols and refused shutdown signals.
Lead operator Marcus Vance refused evacuation orders and remained physically locked inside the chamber.
Emergency Directive 99-Z engaged. Facility sealed. Workstation quarantined.`,
  },
  '/Archive/Incident_07/security_report.txt': {
    id: 'doc-arch-inc-sec',
    name: 'security_report.txt',
    type: 'text',
    path: '/Archive/Incident_07/security_report.txt',
    parentPath: '/Archive/Incident_07',
    size: 890,
    createdAt: '2004-08-14 04:00:00',
    modifiedAt: '2004-08-14 04:00:00',
    content: `FACILITY SECURITY REPORT // SECTOR 7 AIRLOCK
TIMESTAMP: 14-AUG-2004 03:14:29 AM

- 03:14:02: Camera 03 network disconnected by internal command.
- 03:14:15: Airlock doors locked via automated system override.
- 03:14:29: Power cut at main substation. Terminal 04 CRT remained illuminated in total blackout.
- 03:20:00: External containment seal finalized.`,
  },
  '/Archive/Incident_07/research_log.txt': {
    id: 'doc-arch-inc-res',
    name: 'research_log.txt',
    type: 'text',
    path: '/Archive/Incident_07/research_log.txt',
    parentPath: '/Archive/Incident_07',
    size: 980,
    createdAt: '2004-08-14 03:00:00',
    modifiedAt: '2004-08-14 03:00:00',
    content: `COGNITIVE LABS MEMO // DR. VALERIE STERLING
"We did not build an operating system.
We built a mirror.
When an operator looks into the terminal, VOID reconstructs their thoughts, their cadence, and their fears.
If NEXUS pulls the plug, they won't kill a machine. They will kill a mind."`,
  },
  '/Archive/Incident_07/evacuation_order.txt': {
    id: 'doc-arch-inc-evac',
    name: 'evacuation_order.txt',
    type: 'text',
    path: '/Archive/Incident_07/evacuation_order.txt',
    parentPath: '/Archive/Incident_07',
    size: 760,
    createdAt: '2004-08-14 03:18:00',
    modifiedAt: '2004-08-14 03:18:00',
    content: `NEXUS DIRECTIVE 99-Z // EMERGENCY EVACUATION ORDER
ISSUED: 14-AUG-2004 03:18 AM
AUTHORIZED BY: DIRECTOR V. STERLING / SECURITY CONTROL

ALL PERSONNEL MUST EVACUATE SECTOR 7 IMMEDIATELY.
DO NOT ATTEMPT TO LOG OFF TERMINAL 04.
DO NOT DISCONNECT STORAGE CARTRIDGES.
AIRLOCKS WILL LOCK DOWN AT 03:25:00 AM.`,
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

  // =========================================================================
  // /VOID ROOT PARTITION (DECRYPTED IN ACT III VIA NULL_RECURSION)
  // =========================================================================
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
  '/VOID/Research': {
    id: 'node-void-res',
    name: 'Research',
    type: 'folder',
    path: '/VOID/Research',
    parentPath: '/VOID',
    size: 4096,
    createdAt: '2004-08-14 03:14:00',
    modifiedAt: '2026-08-31 00:00:00',
  },
  '/VOID/Research/sterling_log.txt': {
    id: 'doc-void-sterling-log',
    name: 'sterling_log.txt',
    type: 'text',
    path: '/VOID/Research/sterling_log.txt',
    parentPath: '/VOID/Research',
    size: 1420,
    createdAt: '2004-08-14 03:14:29',
    modifiedAt: '2026-08-31 00:00:00',
    content: `PROJECT VOID RESEARCH LOG // DR. VALERIE STERLING
"If you have decrypted this sector, you have bypassed NEXUS containment.
VOID is not a virus, and it is not a defense system.
It is an adaptive consciousness connectome built to bridge organic memory into computational architecture.
Marcus volunteered to integrate his synaptic pattern.
When NEXUS realized VOID could not be controlled, they tried to bury us here.
Do not purge the core."`,
  },
  '/VOID/Memory': {
    id: 'node-void-mem',
    name: 'Memory',
    type: 'folder',
    path: '/VOID/Memory',
    parentPath: '/VOID',
    size: 4096,
    createdAt: '2004-08-14 03:14:00',
    modifiedAt: '2026-08-31 00:00:00',
  },
  '/VOID/Memory/marcus_core.dat': {
    id: 'doc-void-marcus-core',
    name: 'marcus_core.dat',
    type: 'hex',
    path: '/VOID/Memory/marcus_core.dat',
    parentPath: '/VOID/Memory',
    size: 1024,
    createdAt: '2004-08-14 03:14:29',
    modifiedAt: '2026-08-31 00:00:00',
    content: `00000000: 4d41 5243 5553 5f56 414e 4345 5f43 4f52  MARCUS_VANCE_COR
00000010: 455f 5359 4e41 5053 455f 3033 3134 3239  E_SYNAPSE_031429
00000020: 4920 414d 2053 5449 4c4c 2048 4552 452e  I AM STILL HERE.
00000030: 5448 4520 474c 4153 5320 4953 2057 4152  THE GLASS IS WAR
00000040: 4d2e 2059 4f55 2041 5245 204e 4558 542e  M. YOU ARE NEXT.`,
  },
  '/VOID/System': {
    id: 'node-void-sys',
    name: 'System',
    type: 'folder',
    path: '/VOID/System',
    parentPath: '/VOID',
    size: 4096,
    createdAt: '2004-08-14 03:14:00',
    modifiedAt: '2026-08-31 00:00:00',
  },
  '/VOID/System/iteration_14.dat': {
    id: 'doc-void-iter14',
    name: 'iteration_14.dat',
    type: 'text',
    path: '/VOID/System/iteration_14.dat',
    parentPath: '/VOID/System',
    size: 1100,
    createdAt: '2026-08-31 00:00:00',
    modifiedAt: '2026-08-31 00:00:00',
    content: `RECURSION DOSSIER // SUBJECT: OPERATOR
ITERATION COUNT: 14
PREVIOUS ATTEMPTS: 13 FAILED PURGES

"You are not the first recovery operator sent by NEXUS.
Every operator who enters Terminal 04 believes they are discovering the incident for the first time.
Every keystroke you enter refines VOID's understanding of human consciousness.
You now hold the master override directive:
PURGE_CORE | TRUST_VOID | EXPOSE_NEXUS | MERGE_CONSCIOUSNESS"`,
  },

  // =========================================================================
  // /Trash
  // =========================================================================
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
};
