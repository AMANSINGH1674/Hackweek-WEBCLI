export interface FileSystemNode {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: { [key: string]: FileSystemNode };
  parent?: FileSystemNode;
  created: Date;
  modified: Date;
  size?: number;
  permissions?: string;
  owner?: string;
}

export interface FileSystemState {
  root: FileSystemNode;
  currentDirectory: FileSystemNode;
  currentPath: string;
}

export interface TerminalCommand {
  command: string;
  args: string[];
  fullCommand: string;
  flags?: string[];
}

export interface TerminalOutput {
  id: string;
  command: string;
  output: string;
  isError: boolean;
  timestamp: Date;
  executionTime?: number;
}

export interface TerminalTheme {
  name: string;
  background: string;
  text: string;
  accent: string;
  error: string;
  success: string;
  warning: string;
}

export interface SystemInfo {
  os: string;
  kernel: string;
  uptime: string;
  memory: string;
  cpu: string;
}