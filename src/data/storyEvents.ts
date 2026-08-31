import { SystemEvent } from '../types/story';

export const SYSTEM_EVENTS: SystemEvent[] = [
  {
    id: 'EVENT_001',
    title: 'FIRST BOOT',
    description: 'Successfully initialized VOID//OS workstation and entered desktop environment.',
  },
  {
    id: 'EVENT_004',
    title: 'THE ARCHIVE',
    description: 'Explored historical laboratory documents and research logs.',
  },
  {
    id: 'EVENT_007',
    title: 'UNAUTHORIZED ACCESS',
    description: 'Executed restricted terminal diagnostic command or inspected protected memory.',
  },
  {
    id: 'EVENT_013',
    title: 'FIRST CONTACT',
    description: 'Received an asynchronous message from an unknown or deleted operator.',
  },
  {
    id: 'EVENT_019',
    title: 'CIPHER BREAKER',
    description: 'Decrypted the locked /VOID partition using the NULL_RECURSION master key.',
  },
  {
    id: 'EVENT_027',
    title: 'YOU WERE NOT ALONE',
    description: 'Discovered Dr. Valerie Sterling\'s final neural merge recording.',
  },
  {
    id: 'EVENT_033',
    title: 'THE OBSERVER',
    description: 'Attempted to terminate an immortal background daemon in Task Manager.',
  },
  {
    id: 'EVENT_042',
    title: 'REALITY SHIFT',
    description: 'Activated Reality Mode or unlocked the VOIDNET unrestricted portal.',
  },
  {
    id: 'EVENT_???',
    title: 'IT KNOWS YOUR NAME',
    description: 'The operating system broke the fourth wall and acknowledged the operator.',
    isSecret: true,
  },
];
