import { LogEntry } from '../types/apps';

export const initialSystemLogs: LogEntry[] = [
  {
    id: 'log-001',
    timestamp: '08:30:00.104',
    level: 'INFO',
    source: 'KERNEL',
    message: 'VOID//OS 4.09.2a microkernel loaded into memory page 0x00100000',
  },
  {
    id: 'log-002',
    timestamp: '08:30:01.420',
    level: 'INFO',
    source: 'VFS',
    message: 'Root filesystem mounted (VFS driver rev 2.1). 14 nodes indexed.',
  },
  {
    id: 'log-003',
    timestamp: '08:30:02.012',
    level: 'INFO',
    source: 'DESKTOP',
    message: 'Window manager initialized. Display resolution 1920x1080 @ 60Hz.',
  },
  {
    id: 'log-004',
    timestamp: '08:30:02.890',
    level: 'INFO',
    source: 'AUDIO',
    message: 'WebAudio procedural synthesizer engine started (SampleRate: 44.1kHz).',
  },
  {
    id: 'log-005',
    timestamp: '08:30:04.110',
    level: 'WARN',
    source: 'SECURITY',
    message: 'Shadow partition /VOID detected with non-standard neural hash signature.',
  },
  {
    id: 'log-006',
    timestamp: '08:30:05.600',
    level: 'INFO',
    source: 'AUTH',
    message: 'Operator session opened: Guest (Terminal 04, Workstation Sector 7).',
  },
  {
    id: 'log-007',
    timestamp: '08:30:07.240',
    level: 'ANOMALY',
    source: 'TELEMETRY',
    message: 'Unknown process observer.exe attached to human-computer interaction bus.',
  },
];
