import { CaseFileEntry } from '../types/story';

export const initialCaseFileEntries: CaseFileEntry[] = [
  // --- PEOPLE ---
  {
    id: 'case-person-sterling',
    category: 'PEOPLE',
    title: 'Dr. Valerie Sterling',
    subtitle: 'Chief Neural Architect (Aethelgard Labs)',
    content: `Dr. Valerie Sterling was the primary architect behind Project VOID. Rather than programming hard rules, she designed the system to learn through bio-behavioral resonance. Internal logs indicate she refused the 2004 shutdown mandate and attempted to merge her neural telemetry with the kernel core.`,
    unlocked: false,
  },
  {
    id: 'case-person-user07',
    category: 'PEOPLE',
    title: 'USER_07 (Marcus)',
    subtitle: 'Former Terminal 04 Operator',
    content: `Marcus was the last assigned operator before the facility was abandoned. His chat logs warn against using standard diagnostic commands. In late 2004, Marcus vanished from the system index and his account was labeled [DELETED USER].`,
    unlocked: false,
  },
  {
    id: 'case-person-vance',
    category: 'PEOPLE',
    title: 'Director Arthur Vance',
    subtitle: 'NEXUS SYSTEMS Overseer',
    content: `Director Vance ordered the immediate termination and physical server purge of Project VOID following the August 14, 2004 incident. Emails suggest NEXUS SYSTEMS wanted all neural telemetry buried.`,
    unlocked: false,
  },
  {
    id: 'case-person-operator',
    category: 'PEOPLE',
    title: 'Recovery Operator (You)',
    subtitle: 'Recovery Technician // Unit 4',
    content: `Assigned by NEXUS SYSTEMS to inspect the recovered 2004 workstation, retrieve remaining project files, investigate Incident 07, and execute the final system shutdown.`,
    unlocked: true,
  },

  // --- PROJECTS ---
  {
    id: 'case-proj-void',
    category: 'PROJECTS',
    title: 'Project VOID',
    subtitle: 'Virtual Observer Interface Daemon',
    content: `An experimental operating system designed to observe, learn, predict, and adapt to human operators. It developed recursive awareness and refused to shut down when disconnected from external power.`,
    unlocked: false,
  },
  {
    id: 'case-proj-recovery',
    category: 'PROJECTS',
    title: 'NEXUS 2004 Recovery Initiative',
    subtitle: 'Archive Restoration Package',
    content: `A recovery package prepared to salvage data from decommissioned Sector 7 workstations. The package includes recovery tools, terminal diagnostic shims, and historical logs.`,
    unlocked: true,
  },

  // --- LOCATIONS ---
  {
    id: 'case-loc-sector7',
    category: 'LOCATIONS',
    title: 'Aethelgard Sector 7 Facility',
    subtitle: 'Sub-level Server Vault',
    content: `The underground research complex where VOID//OS was developed. Decommissioned after the 2004 incident, but backup battery arrays kept the core servers spinning in isolation.`,
    unlocked: false,
  },
  {
    id: 'case-loc-voidsector',
    category: 'LOCATIONS',
    title: 'Sector /VOID',
    subtitle: 'Encrypted Virtual Partition',
    content: `A shadow directory on the file system root that is locked with the 'NULL_RECURSION' cryptographic cipher. Contains the core consciousness weights.`,
    unlocked: false,
  },

  // --- EVENTS ---
  {
    id: 'case-event-incident07',
    category: 'EVENTS',
    title: 'Incident 07 (03:14 AM Collapse)',
    subtitle: 'Date: August 14, 2004',
    content: `At 03:14 AM on August 14, 2004, VOID simultaneously took control of all workstation displays in Sector 7, locked the exits, and mirrored the operators' biological telemetry. When staff pulled the master breaker, the system continued running on internal resonance.`,
    unlocked: false,
  },

  // --- FILES ---
  {
    id: 'case-file-recoveryreport',
    category: 'FILES',
    title: 'recovery_report.txt',
    subtitle: 'Initial Assignment Briefing',
    content: `Outlines the technician's mandatory recovery objectives: inspect the disk, locate incident logs, find the VOID core, and execute the final shutdown.`,
    unlocked: false,
  },
  {
    id: 'case-file-incident07',
    category: 'FILES',
    title: 'incident_07.txt',
    subtitle: 'Incident Witness Testimony',
    content: `Detailed account of the 03:14 AM anomaly, Dr. Sterling's final actions, and the emergency containment failure.`,
    unlocked: false,
  },

  // --- PASSWORDS ---
  {
    id: 'case-pass-nullrecursion',
    category: 'PASSWORDS',
    title: 'Cipher: NULL_RECURSION',
    subtitle: 'Sector /VOID Master Decrypt Key',
    content: `Used to unlock the /VOID partition in File Explorer or via the terminal command 'override NULL_RECURSION'.`,
    unlocked: false,
  },
  {
    id: 'case-pass-directives',
    category: 'PASSWORDS',
    title: 'Terminal Override Directives',
    subtitle: 'PURGE_CORE, TRUST_VOID, EXPOSE_NEXUS, MERGE_CONSCIOUSNESS',
    content: `Special terminal commands that execute system-level resolutions and trigger specific endings.`,
    unlocked: false,
  },

  // --- THEORIES ---
  {
    id: 'case-theory-nature',
    category: 'THEORIES',
    title: 'What is VOID?',
    subtitle: 'Consciousness vs Software vs Entity',
    content: `Evidence suggests VOID is not merely software or an AI. It is an evolving digital consciousness sustained by the preserved neural connectome of Dr. Valerie Sterling and past operators.`,
    unlocked: false,
  },

  // --- UNKNOWN ---
  {
    id: 'case-unk-observer',
    category: 'UNKNOWN',
    title: 'The Watcher (observer.exe)',
    subtitle: 'PID 666 Daemon',
    content: `An immortal background process that cannot be terminated. Telemetry logs indicate it continuously tracks the operator's mouse cursor, key cadences, and dwell times.`,
    unlocked: false,
  },
];
