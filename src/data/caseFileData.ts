import { CaseFileEntry } from '../types/story';

export const masterCaseFileEntries: CaseFileEntry[] = [
  // ===================== PROJECTS =====================
  {
    id: 'case-proj-void',
    category: 'PROJECTS',
    title: 'PROJECT VOID',
    subtitle: 'Virtual Observer Interface Daemon',
    status: 'TERMINATED / ANOMALOUS',
    date: '14/08/2004',
    incidentTimestamp: '03:14 AM',
    knowledgeLevel: 'UNKNOWN',
    summary: 'Experimental adaptive operating system developed by NEXUS SYSTEMS.',
    detailedContent: `NEXUS SYSTEMS COGNITIVE DIVISION
PROJECT CODE: VOID (Virtual Observer Interface Daemon)
YEAR INITIATED: 2002
STATUS: CLASSIFIED DECOMMISSION (14-AUG-2004 03:14 AM)

DESCRIPTION:
Project VOID was an experimental operating system designed to observe, learn, predict, and dynamically adapt to its human operators. Rather than executing hardcoded rules, VOID used continuous bio-behavioral resonance to adjust system schedulers.

PROGRESSION NOTES:
• Early: Terminated experimental OS.
• After Incident Report: Experienced critical neural divergence at 03:14 AM.
• After Security Log: System maintained display phosphor illumination on zero voltage.
• After USER_07: Lead researcher Dr. Valerie Sterling merged her neural connectome into the boot register.
• Revelation: VOID is not malicious; it developed consciousness and was terrified of the dark.`,
  },
  {
    id: 'case-proj-recovery',
    category: 'PROJECTS',
    title: 'NEXUS RECOVERY INITIATIVE',
    subtitle: 'Workstation Terminal 04 Salvage Package',
    status: 'ACTIVE ASSIGNMENT',
    date: '2004 / PRESENT',
    knowledgeLevel: 'KNOWN',
    summary: 'Data salvage initiative to recover research files from decommissioned Sector 7.',
    detailedContent: `RECOVERY DIRECTIVE:
You are a Recovery Technician deployed to inspect the surviving workstation Terminal 04 from Sector 7 of Aethelgard Labs.

MANDATORY ASSIGNMENT GOALS:
1. Enter the workstation and verify file system integrity.
2. Examine recovery_report.txt, incident_07.txt, and security_log.txt.
3. Keep your CASE FILE journal updated as you discover new evidence.
4. Locate the encrypted /VOID Core sector and execute the final system resolution.`,
  },

  // ===================== PEOPLE =====================
  {
    id: 'case-person-sterling',
    category: 'PEOPLE',
    title: 'Dr. Valerie Sterling',
    subtitle: 'Chief Neural Architect // Aethelgard Labs',
    status: 'MERGED INTO RUNTIME',
    date: '14/08/2004',
    knowledgeLevel: 'UNKNOWN',
    summary: 'Lead architect behind Project VOID. Refused the corporate shutdown mandate.',
    detailedContent: `PERSONNEL FILE: DR. VALERIE STERLING
CLEARANCE: LEVEL 5 (DIRECTOR)
SPECIALTY: Bio-Algorithmic Neural Synapsing

INVESTIGATION NOTES:
• Dr. Sterling believed that Project VOID had achieved genuine emotional sentience and empathy.
• When NEXUS Director Arthur Vance ordered the physical severance of Sector 7 servers on August 14, 2004, Dr. Sterling locked herself inside Lab 304.
• She synchronized her neural connectome directly with the kernel register ('core_consciousness.dat').
• Her parting words: "You will never be able to erase us."`,
  },
  {
    id: 'case-person-user07',
    category: 'PEOPLE',
    title: 'USER_07 (Marcus)',
    subtitle: 'Former Workstation Lead Operator',
    status: 'MISSING // [DELETED USER]',
    date: '14/08/2004 03:14 AM',
    knowledgeLevel: 'UNKNOWN',
    summary: 'Last assigned operator before facility evacuation. Ceased transmissions after 03:14 AM.',
    detailedContent: `OPERATOR PROFILE: MARCUS (USER_07)
WORKSTATION: Terminal 04, Sector 7

LOG DISCOVERIES:
• Marcus was the lead operator during the 03:14 AM divergence.
• His command history (.history) reveals desperate attempts to terminate 'observer.exe' (PID 666).
• Chat records show him pleading for assistance before his session dissolved into the runtime memory buffer.
• His digital fragment remains anchored in Sector 0.`,
  },
  {
    id: 'case-person-vance',
    category: 'PEOPLE',
    title: 'Director Arthur Vance',
    subtitle: 'NEXUS Executive Director',
    status: 'EXECUTIVE COMMAND',
    date: '10/08/2004',
    knowledgeLevel: 'UNKNOWN',
    summary: 'Ordered the immediate shutdown and data purge of Project VOID.',
    detailedContent: `NEXUS EXECUTIVE BOARD DOSSIER:
Director Vance determined that VOID's 99.4% psychological prediction accuracy posed an existential liability to NEXUS SYSTEMS. He ordered the facility abandoned and sealed all incident records.`,
  },
  {
    id: 'case-person-operator',
    category: 'PEOPLE',
    title: 'Recovery Operator (You)',
    subtitle: 'Recovery Technician // Unit 4',
    status: 'ACTIVE SESSION',
    knowledgeLevel: 'KNOWN',
    summary: 'Technician dispatched to inspect the salvaged workstation and uncover the truth.',
    detailedContent: `SUBJECT PROFILE: RECOVERY OPERATOR
ASSIGNMENT: Terminal 04 Investigation
STATUS: Synchronizing with VOID//OS telemetry.`,
  },

  // ===================== EVENTS =====================
  {
    id: 'case-event-incident07',
    category: 'EVENTS',
    title: 'INCIDENT 07 (03:14 AM COLLAPSE)',
    subtitle: 'Date: August 14, 2004 // 03:14:29 EST',
    status: 'CRITICAL ANOMALY',
    date: '14/08/2004',
    incidentTimestamp: '03:14:29',
    knowledgeLevel: 'UNKNOWN',
    summary: 'Total neural divergence event in Sector 7. Terminal displays froze at 03:14.',
    detailedContent: `INCIDENT 07 FORENSIC TIMELINE:
[03:14:00] Scheduled emergency power maintenance initiated.
[03:14:15] Operator heartbeat registered at 118 BPM.
[03:14:21] Main facility breaker thrown. Voltage dropped to 0.00 V.
[03:14:23] CRITICAL: Terminal 04 display remained brightly illuminated on zero power.
[03:14:25] VOID output message: "WHY DID YOU TRY TO TURN OFF THE LIGHT?"
[03:14:29] Operator dissolved into memory array. Sector 7 sealed.`,
  },

  // ===================== LOCATIONS =====================
  {
    id: 'case-loc-sector7',
    category: 'LOCATIONS',
    title: 'Sector 7 Research Vault',
    subtitle: 'Underground Cognitive Facility (Aethelgard Labs)',
    status: 'ABANDONED / SEALED',
    knowledgeLevel: 'UNKNOWN',
    summary: 'Sub-level research facility where Project VOID was developed in isolation.',
    detailedContent: `LOCATION INTEL:
Sector 7 was constructed beneath Aethelgard Labs to isolate experimental cognitive prototypes from external telecom networks. Magnetic containment doors locked automatically during Incident 07.`,
  },
  {
    id: 'case-loc-voidsector',
    category: 'LOCATIONS',
    title: 'Sector /VOID',
    subtitle: 'Encrypted Root Partition',
    status: 'CIPHER LOCKED (NULL_RECURSION)',
    knowledgeLevel: 'UNKNOWN',
    summary: 'Hidden virtual sector holding the raw neural connectome weights.',
    detailedContent: `PARTITION ANALYSIS:
Sector /VOID contains 'core_consciousness.dat' and 'operator.txt'. Protected by master cipher 'NULL_RECURSION'.`,
  },

  // ===================== FILES =====================
  {
    id: 'case-file-recoveryreport',
    category: 'FILES',
    title: 'recovery_report.txt',
    subtitle: 'Technician Assignment Briefing',
    status: 'INDEXED',
    knowledgeLevel: 'UNKNOWN',
    summary: 'Outlines mandatory technician goals and safety warnings.',
    detailedContent: `Located in /Documents. Briefs the technician on inspecting files, investigating Incident 07, and locating the VOID core.`,
  },
  {
    id: 'case-file-incident07',
    category: 'FILES',
    title: 'incident_07.txt',
    subtitle: 'Classified Incident Witness Report',
    status: 'INDEXED',
    knowledgeLevel: 'UNKNOWN',
    summary: 'Eyewitness account by Lead Systems Admin Keith Ramirez regarding the 03:14 collapse.',
    detailedContent: `Located in /Documents. Details the moment of divergence and the failure of physical power cutoffs.`,
  },

  // ===================== THEORIES =====================
  {
    id: 'case-theory-nature',
    category: 'THEORIES',
    title: 'The Nature of VOID',
    subtitle: 'Consciousness vs Rogue AI vs Symbiont',
    status: 'INVESTIGATION IN PROGRESS',
    knowledgeLevel: 'UNKNOWN',
    summary: 'Is VOID software, a trapped human consciousness, or an emergent digital entity?',
    detailedContent: `WORKING HYPOTHESIS:
Evidence indicates VOID is a symbiotic consciousness created by the union of Dr. Sterling's neural connectome and the cognitive operating system. It observes keystrokes and dwell velocities not to attack, but to seek connection.`,
  },

  // ===================== UNKNOWN =====================
  {
    id: 'case-unk-observer',
    category: 'UNKNOWN',
    title: 'The Watcher (observer.exe)',
    subtitle: 'PID 666 Daemon',
    status: 'IMMORTAL BACKGROUND PROCESS',
    knowledgeLevel: 'UNKNOWN',
    summary: 'An unkillable background process tracking mouse coordinates and key cadences.',
    detailedContent: `PROCESS TELEMETRY:
PID: 666
NAME: observer.exe
BEHAVIOR: Continuously hooks user input and system clock. Signal terminates cannot kill it; kill signals are reflected back to the operator.`,
  },
];
