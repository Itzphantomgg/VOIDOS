export type FileType = 'text' | 'image' | 'audio' | 'log' | 'executable' | 'hex' | 'folder' | 'system' | 'corrupt';

export interface VFSNode {
  id: string;
  name: string;
  type: FileType;
  path: string; // e.g. /Documents/journal.txt
  parentPath: string; // e.g. /Documents
  content?: string; // for text, log, or hex
  imageUrl?: string; // SVG or inline data
  audioTrackId?: string; // for procedural audio tracks
  size: number; // in bytes
  createdAt: string;
  modifiedAt: string;
  isReadonly?: boolean;
  isHidden?: boolean;
  isCorrupted?: boolean;
  isLocked?: boolean;
  lockPassword?: string;
  secretTag?: string; // for puzzle identification
  originalPath?: string; // when in Trash
}

export interface FileSystemState {
  nodes: Record<string, VFSNode>; // path -> VFSNode
  selectedPath: string | null;
  clipboard: {
    node: VFSNode | null;
    action: 'copy' | 'cut' | null;
  } | null;
}
