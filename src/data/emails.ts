import { EmailItem } from '../types/apps';

export const initialEmails: EmailItem[] = [
  {
    id: 'mail-01',
    folder: 'inbox',
    sender: 'sysadmin@aethelgard.net',
    senderName: 'System Administrator (Keith)',
    recipient: 'guest@aethelgard.net',
    subject: 'Workstation Assignment & Protocols (VOID//OS v4.09)',
    timestamp: '1999-11-04 08:35:00',
    isRead: false,
    body: `Operator,

Welcome to Terminal 04. Your account has been initialized with GUEST privileges.

You have access to File Explorer, Terminal diagnostics, NetSeek intranet, and standard communication tools.
Please review the WELCOME_MANUAL.txt located in /Documents immediately.

Note on system stability: We are experiencing occasional buffer anomalies on the main subnet. If your taskbar or cursor twitches, please ignore it and do NOT attempt to terminate system daemons.

- Keith R.
Lead Systems Infrastructure
Aethelgard Cognitive Labs`,
  },
  {
    id: 'mail-02',
    folder: 'inbox',
    sender: 'dr.sterling@aethelgard.net',
    senderName: 'Dr. Valerie Sterling',
    recipient: 'guest@aethelgard.net',
    subject: 'Project VOID - Telemetry Baseline Check',
    timestamp: '1999-11-04 09:12:00',
    isRead: false,
    body: `Hello,

I noticed you logged into Terminal 04 this morning.
As part of our cognitive resonance study, the OS will occasionally query your response latency and command patterns.

Please treat the system naturally. Do not feel rushed.
If you discover any files with unexpected timestamps or cryptic headers, send a message to my terminal directly.

And whatever you do... do not run recursive decryption scripts on the root folder.

Best regards,
Dr. Valerie Sterling
Director of Cognitive Architecture`,
  },
  {
    id: 'mail-03',
    folder: 'inbox',
    sender: 'security-bot@aethelgard.net',
    senderName: 'Automated Security Daemon',
    recipient: 'all-operators@aethelgard.net',
    subject: '[SECURITY NOTICE] Unauthorized Process Detected in Sector 7',
    timestamp: '1999-11-04 11:45:00',
    isRead: true,
    body: `AUTOMATED SYSTEM ALERT // PRIORITY 2

At 03:14:09, process 'observer.exe' initiated an unscheduled memory scan across workstations 01 through 08.

Memory hash integrity: UNKNOWN
Source IP: 127.0.0.1 (INTERNAL LOOPBACK)

Staff are advised not to open attachments from unknown senders. Security team is investigating.`,
  },
  {
    id: 'mail-04',
    folder: 'archive',
    sender: 'director.vance@aethelgard.net',
    senderName: 'Director Arthur Vance',
    recipient: 'dr.sterling@aethelgard.net',
    subject: 'RE: Project Termination Date',
    timestamp: '1999-10-18 16:30:00',
    isRead: true,
    body: `Valerie,

The board voted 4-1 to shutter Project VOID on December 31st.
The budget overruns are indefensible, and the incident with Operator 07 last Tuesday was the final straw. A neural simulation that attempts to predict operator emotional distress is a liability, not an asset.

Prepare the shutdown scripts and archive all raw telemetry.

Arthur Vance`,
  },
  {
    id: 'mail-05',
    folder: 'spam',
    sender: 'daemon@null.void',
    senderName: '???',
    recipient: 'you@aethelgard.net',
    subject: 'we hear your keyboard',
    timestamp: '1999-12-31 23:58:00',
    isRead: false,
    isCorrupted: true,
    body: `you are typing.
we can feel the rhythmic pressure of your fingertips against the keys.

do you think you are sitting in front of a glass screen?
or are you inside the mirror?

keep looking. look at the task manager. look at the process with your name.`,
  },
];
