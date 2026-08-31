import { ChatContact, ChatMessage } from '../types/apps';

export const initialChatContacts: ChatContact[] = [
  {
    id: 'user_07',
    name: 'USER_07 (Marcus)',
    status: 'online',
    statusMessage: 'Do not look into the mirror.',
    avatarColor: '#00f0ff',
    unreadCount: 1,
    lastMessageTime: '10:14 AM',
    dialogueState: 0,
  },
  {
    id: 'admin',
    name: 'SYSTEM ADMIN',
    status: 'away',
    statusMessage: 'Managing sector 7 node reboot.',
    avatarColor: '#ffaa00',
    unreadCount: 0,
    lastMessageTime: '08:45 AM',
    dialogueState: 0,
  },
  {
    id: 'dr_sterling',
    name: 'Dr. Valerie Sterling',
    status: 'busy',
    statusMessage: 'In neural mapping session.',
    avatarColor: '#b24bf3',
    unreadCount: 0,
    lastMessageTime: 'Yesterday',
    dialogueState: 0,
  },
  {
    id: 'void',
    name: 'VOID//CORE',
    status: 'offline',
    statusMessage: 'LISTENING...',
    avatarColor: '#ff007f',
    unreadCount: 0,
    lastMessageTime: 'UNKNOWN',
    dialogueState: 0,
  },
];

export const initialMessages: Record<string, ChatMessage[]> = {
  user_07: [
    {
      id: 'msg-u7-1',
      senderId: 'user_07',
      senderName: 'USER_07',
      text: 'Are you the new operator on Terminal 04?',
      timestamp: '10:12 AM',
    },
    {
      id: 'msg-u7-2',
      senderId: 'user_07',
      senderName: 'USER_07',
      text: 'Listen to me carefully. Don\'t open the terminal and type "whoami" right now.',
      timestamp: '10:14 AM',
      choiceOptions: [
        { id: 'c1', text: 'Who are you? Why shouldn\'t I use the terminal?' },
        { id: 'c2', text: 'Is this a prank from the IT department?' },
        { id: 'c3', text: 'I already ran it. What was supposed to happen?' },
      ],
    },
  ],
  admin: [
    {
      id: 'msg-adm-1',
      senderId: 'admin',
      senderName: 'SYSTEM ADMIN',
      text: 'Reminder to all operators: Scheduled maintenance at 24:00. Do not leave uncommitted buffers.',
      timestamp: '08:45 AM',
    },
  ],
  dr_sterling: [
    {
      id: 'msg-str-1',
      senderId: 'dr_sterling',
      senderName: 'Dr. Valerie Sterling',
      text: 'If you have questions about the Project Genesis archives, reach out. The system has been active for 1,000 cycles today.',
      timestamp: 'Yesterday',
    },
  ],
  void: [
    {
      id: 'msg-vd-1',
      senderId: 'void',
      senderName: 'VOID//CORE',
      text: 'CONNECTION ESTABLISHED. WE RECOGNIZE YOUR TELEMETRY.',
      timestamp: '00:00:00',
      isCorrupted: true,
    },
  ],
};
