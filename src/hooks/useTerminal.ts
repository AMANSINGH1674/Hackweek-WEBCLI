import { useState, useCallback, useRef } from 'react';
import { TerminalCommand, TerminalOutput, TerminalTheme, SystemInfo } from '../types/FileSystem';
import { useFileSystem } from './useFileSystem';

const themes: TerminalTheme[] = [
  {
    name: 'matrix',
    background: 'from-gray-900 via-gray-800 to-gray-900',
    text: 'text-green-400',
    accent: 'text-green-300',
    error: 'text-red-400',
    success: 'text-green-500',
    warning: 'text-yellow-400'
  },
  {
    name: 'cyberpunk',
    background: 'from-purple-900 via-pink-900 to-purple-900',
    text: 'text-cyan-400',
    accent: 'text-pink-300',
    error: 'text-red-400',
    success: 'text-green-400',
    warning: 'text-yellow-400'
  },
  {
    name: 'ocean',
    background: 'from-blue-900 via-indigo-900 to-blue-900',
    text: 'text-blue-300',
    accent: 'text-blue-200',
    error: 'text-red-400',
    success: 'text-green-400',
    warning: 'text-yellow-400'
  },
  {
    name: 'retro',
    background: 'from-orange-900 via-red-900 to-orange-900',
    text: 'text-orange-300',
    accent: 'text-orange-200',
    error: 'text-red-400',
    success: 'text-green-400',
    warning: 'text-yellow-400'
  }
];

export const useTerminal = () => {
  const [outputs, setOutputs] = useState<TerminalOutput[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentTheme, setCurrentTheme] = useState<TerminalTheme>(themes[0]);
  const outputCounter = useRef(0);

  const {
    fileSystem,
    getCurrentPath,
    getNode,
    listDirectory,
    createDirectory,
    createFile,
    removeNode,
    changeDirectory,
    moveNode,
    copyNode,
    writeFile
  } = useFileSystem();

  const addOutput = useCallback((command: string, output: string, isError: boolean = false, executionTime?: number) => {
    const newOutput: TerminalOutput = {
      id: `output-${outputCounter.current++}`,
      command,
      output,
      isError,
      timestamp: new Date(),
      executionTime
    };
    setOutputs(prev => [...prev, newOutput]);
  }, []);

  const parseCommand = useCallback((input: string): TerminalCommand => {
    const trimmed = input.trim();
    const parts = trimmed.split(/\s+/);
    const command = parts[0] || '';
    const args: string[] = [];
    const flags: string[] = [];
    
    for (let i = 1; i < parts.length; i++) {
      if (parts[i].startsWith('-')) {
        flags.push(parts[i]);
      } else {
        args.push(parts[i]);
      }
    }
    
    return {
      command,
      args,
      flags,
      fullCommand: trimmed
    };
  }, []);

  const formatFileSize = (bytes: number): string => {
    const units = ['B', 'K', 'M', 'G'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${Math.round(size)}${units[unitIndex]}`;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSystemInfo = (): SystemInfo => {
    return {
      os: 'WebOS 1.0',
      kernel: 'Browser-Kernel 5.4.0',
      uptime: '2 days, 14:32',
      memory: '8GB / 16GB',
      cpu: 'Virtual CPU @ 2.4GHz'
    };
  };

  const executeCommand = useCallback((input: string) => {
    const startTime = performance.now();
    const { command, args, flags, fullCommand } = parseCommand(input);
    
    if (!command) {
      return;
    }

    if (fullCommand) {
      setCommandHistory(prev => [...prev, fullCommand]);
      setHistoryIndex(-1);
    }

    const supportedCommands = [
      'ls', 'cd', 'mkdir', 'rmdir', 'rm', 'touch', 'mv', 'cp', 'curl', 'clear', 'pwd', 'cat',
      'help', 'whoami', 'date', 'echo', 'grep', 'find', 'tree', 'history', 'theme', 'neofetch',
      'ps', 'top', 'df', 'free', 'uptime', 'uname', 'which', 'man', 'alias', 'export'
    ];
    
    if (!supportedCommands.includes(command)) {
      const executionTime = performance.now() - startTime;
      addOutput(fullCommand, `bash: ${command}: command not found\n\nDid you mean one of these?\n${supportedCommands.filter(cmd => cmd.includes(command.charAt(0))).slice(0, 5).join(', ')}`, true, executionTime);
      return;
    }

    let output = '';
    let isError = false;

    switch (command) {
      case 'clear':
        setOutputs([]);
        return;

      case 'help':
        output = `Web CLI Terminal - Available Commands:

File System:
  ls [path] [-l] [-a]     List directory contents
  cd [path]               Change directory
  mkdir <name>            Create directory
  rmdir <name>            Remove empty directory
  rm <name> [-r]          Remove file or directory
  touch <name>            Create empty file
  mv <src> <dest>         Move/rename file or directory
  cp <src> <dest> [-r]    Copy file or directory
  cat <file>              Display file contents
  find <name>             Find files and directories
  tree                    Display directory tree

System:
  pwd                     Print working directory
  whoami                  Display current user
  date                    Display current date and time
  echo <text>             Display text
  history                 Show command history
  clear                   Clear terminal screen
  neofetch                Display system information
  ps                      List running processes
  top                     Display system processes
  df                      Display disk usage
  free                    Display memory usage
  uptime                  Display system uptime
  uname                   Display system information

Network:
  curl <url>              Fetch data from URL

Customization:
  theme [name]            Change terminal theme
  alias                   List aliases
  export                  List environment variables

Utilities:
  grep <pattern> <file>   Search for patterns in files
  which <command>         Locate command
  man <command>           Display manual for command

Use 'man <command>' for detailed help on specific commands.`;
        break;

      case 'pwd':
        output = getCurrentPath();
        break;

      case 'whoami':
        output = 'user';
        break;

      case 'date':
        output = new Date().toString();
        break;

      case 'echo':
        output = args.join(' ');
        break;

      case 'history':
        output = commandHistory.map((cmd, index) => `${index + 1}  ${cmd}`).join('\n');
        break;

      case 'theme':
        if (args.length === 0) {
          output = `Available themes: ${themes.map(t => t.name).join(', ')}\nCurrent theme: ${currentTheme.name}`;
        } else {
          const newTheme = themes.find(t => t.name === args[0]);
          if (newTheme) {
            setCurrentTheme(newTheme);
            output = `Theme changed to: ${newTheme.name}`;
          } else {
            output = `Theme '${args[0]}' not found. Available: ${themes.map(t => t.name).join(', ')}`;
            isError = true;
          }
        }
        break;

      case 'neofetch':
        const sysInfo = getSystemInfo();
        output = `
     ██████╗ ██╗    ██╗███████╗██████╗      user@webcli
    ██╔═══██╗██║    ██║██╔════╝██╔══██╗     -----------
    ██║   ██║██║ █╗ ██║█████╗  ██████╔╝     OS: ${sysInfo.os}
    ██║   ██║██║███╗██║██╔══╝  ██╔══██╗     Kernel: ${sysInfo.kernel}
    ╚██████╔╝╚███╔███╔╝███████╗██████╔╝     Uptime: ${sysInfo.uptime}
     ╚═════╝  ╚══╝╚══╝ ╚══════╝╚═════╝      Memory: ${sysInfo.memory}
                                            CPU: ${sysInfo.cpu}
    ██╗    ██╗███████╗██████╗                Shell: WebCLI 1.0
    ██║    ██║██╔════╝██╔══██╗               Terminal: Web Terminal
    ██║ █╗ ██║█████╗  ██████╔╝               Theme: ${currentTheme.name}
    ██║███╗██║██╔══╝  ██╔══██╗
    ╚███╔███╔╝███████╗██████╔╝
     ╚══╝╚══╝ ╚══════╝╚═════╝`;
        break;

      case 'ps':
        output = `  PID TTY          TIME CMD
    1 pts/0    00:00:01 webcli
  123 pts/0    00:00:00 terminal
  456 pts/0    00:00:00 filesystem`;
        break;

      case 'top':
        output = `Tasks: 3 total,   1 running,   2 sleeping
%Cpu(s):  2.1 us,  0.8 sy,  0.0 ni, 97.1 id
MiB Mem :  16384 total,   8192 free,   4096 used,   4096 buff/cache

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
    1 user      20   0  102400  32768  16384 S   1.0   0.2   0:01.23 webcli
  123 user      20   0   65536  16384   8192 S   0.3   0.1   0:00.45 terminal
  456 user      20   0   32768   8192   4096 S   0.1   0.1   0:00.12 filesystem`;
        break;

      case 'df':
        output = `Filesystem     1K-blocks    Used Available Use% Mounted on
/dev/web           1048576  524288    524288  50% /
tmpfs               262144   32768    229376  13% /tmp
devfs                 4096    1024     3072  25% /dev`;
        break;

      case 'free':
        output = `              total        used        free      shared  buff/cache   available
Mem:       16777216     4194304     8388608      524288     4194304    12058624
Swap:       2097152           0     2097152`;
        break;

      case 'uptime':
        output = ` ${new Date().toTimeString().split(' ')[0]} up 2 days, 14:32,  1 user,  load average: 0.15, 0.12, 0.08`;
        break;

      case 'uname':
        if (flags.includes('-a')) {
          output = 'WebOS webcli 5.4.0-web #1 SMP Browser PREEMPT Dynamic x86_64 GNU/Linux';
        } else {
          output = 'WebOS';
        }
        break;

      case 'which':
        if (args.length === 0) {
          output = 'which: missing argument';
          isError = true;
        } else {
          const cmd = args[0];
          if (supportedCommands.includes(cmd)) {
            output = `/usr/bin/${cmd}`;
          } else {
            output = `${cmd} not found`;
            isError = true;
          }
        }
        break;

      case 'man':
        if (args.length === 0) {
          output = 'What manual page do you want?';
          isError = true;
        } else {
          const cmd = args[0];
          output = `Manual page for ${cmd}:\n\nNAME\n    ${cmd} - Web CLI command\n\nSYNOPSIS\n    ${cmd} [options] [arguments]\n\nDESCRIPTION\n    This is a simulated manual page for the ${cmd} command.\n    For detailed help, use 'help' command.\n\nSEE ALSO\n    help(1), webcli(1)`;
        }
        break;

      case 'alias':
        output = `alias ll='ls -l'
alias la='ls -la'
alias ..='cd ..'
alias ...='cd ../..'
alias grep='grep --color=auto'
alias cls='clear'`;
        break;

      case 'export':
        output = `PATH=/usr/local/bin:/usr/bin:/bin
HOME=/home/user
USER=user
SHELL=/bin/webcli
TERM=xterm-256color
PWD=${getCurrentPath()}`;
        break;

      case 'ls':
        const path = args.find(arg => !arg.startsWith('-')) || '.';
        const showLong = flags.includes('-l');
        const showHidden = flags.includes('-a');
        const items = listDirectory(path, showHidden);
        
        if (items.length === 0) {
          const targetNode = getNode(path);
          if (!targetNode) {
            output = `ls: cannot access '${path}': No such file or directory`;
            isError = true;
          } else if (targetNode.type === 'file') {
            output = showLong 
              ? `${targetNode.permissions} 1 ${targetNode.owner} ${targetNode.owner} ${formatFileSize(targetNode.size || 0)} ${formatDate(targetNode.modified)} ${targetNode.name}`
              : targetNode.name;
          } else {
            output = '';
          }
        } else {
          if (showLong) {
            output = items.map(item => {
              const size = item.type === 'directory' ? '4096' : formatFileSize(item.size || 0);
              return `${item.permissions} 1 ${item.owner} ${item.owner} ${size.padStart(8)} ${formatDate(item.modified)} ${item.name}`;
            }).join('\n');
          } else {
            output = items.map(item => {
              const icon = item.type === 'directory' ? '📁' : '📄';
              return `${icon} ${item.name}`;
            }).join('\n');
          }
        }
        break;

      case 'tree':
        const buildTree = (node: any, prefix: string = '', isLast: boolean = true): string => {
          const connector = isLast ? '└── ' : '├── ';
          const icon = node.type === 'directory' ? '📁' : '📄';
          let result = `${prefix}${connector}${icon} ${node.name}\n`;
          
          if (node.type === 'directory' && node.children) {
            const children = Object.values(node.children);
            children.forEach((child: any, index: number) => {
              const isLastChild = index === children.length - 1;
              const newPrefix = prefix + (isLast ? '    ' : '│   ');
              result += buildTree(child, newPrefix, isLastChild);
            });
          }
          
          return result;
        };
        
        const currentDir = fileSystem.currentDirectory;
        output = `📁 ${currentDir.name}\n${buildTree(currentDir).split('\n').slice(1).join('\n')}`;
        break;

      case 'find':
        if (args.length === 0) {
          output = 'find: missing argument';
          isError = true;
        } else {
          const searchTerm = args[0];
          const findInDirectory = (dir: any, currentPath: string): string[] => {
            const results: string[] = [];
            if (dir.children) {
              Object.values(dir.children).forEach((child: any) => {
                const childPath = `${currentPath}/${child.name}`;
                if (child.name.includes(searchTerm)) {
                  results.push(childPath);
                }
                if (child.type === 'directory') {
                  results.push(...findInDirectory(child, childPath));
                }
              });
            }
            return results;
          };
          
          const results = findInDirectory(fileSystem.currentDirectory, '.');
          output = results.length > 0 ? results.join('\n') : `find: '${searchTerm}' not found`;
        }
        break;

      case 'grep':
        if (args.length < 2) {
          output = 'grep: missing arguments\nUsage: grep <pattern> <file>';
          isError = true;
        } else {
          const pattern = args[0];
          const fileName = args[1];
          const targetNode = getNode(fileName);
          
          if (!targetNode) {
            output = `grep: ${fileName}: No such file or directory`;
            isError = true;
          } else if (targetNode.type === 'directory') {
            output = `grep: ${fileName}: Is a directory`;
            isError = true;
          } else {
            const content = targetNode.content || '';
            const lines = content.split('\n');
            const matches = lines.filter(line => line.includes(pattern));
            output = matches.length > 0 ? matches.join('\n') : `grep: no matches found for '${pattern}'`;
          }
        }
        break;

      case 'cd':
        const targetPath = args[0] || '/home/user';
        if (changeDirectory(targetPath)) {
          output = '';
        } else {
          output = `cd: no such file or directory: ${targetPath}`;
          isError = true;
        }
        break;

      case 'mkdir':
        if (args.length === 0) {
          output = 'mkdir: missing operand';
          isError = true;
        } else {
          const dirName = args[0];
          if (createDirectory(dirName)) {
            output = '';
          } else {
            output = `mkdir: cannot create directory '${dirName}': File exists`;
            isError = true;
          }
        }
        break;

      case 'rmdir':
        if (args.length === 0) {
          output = 'rmdir: missing operand';
          isError = true;
        } else {
          const dirName = args[0];
          const targetNode = getNode(dirName);
          if (!targetNode) {
            output = `rmdir: failed to remove '${dirName}': No such file or directory`;
            isError = true;
          } else if (targetNode.type !== 'directory') {
            output = `rmdir: failed to remove '${dirName}': Not a directory`;
            isError = true;
          } else if (targetNode.children && Object.keys(targetNode.children).length > 0) {
            output = `rmdir: failed to remove '${dirName}': Directory not empty`;
            isError = true;
          } else {
            if (removeNode(dirName)) {
              output = '';
            } else {
              output = `rmdir: failed to remove '${dirName}'`;
              isError = true;
            }
          }
        }
        break;

      case 'rm':
        if (args.length === 0) {
          output = 'rm: missing operand';
          isError = true;
        } else {
          const fileName = args[0];
          const recursive = flags.includes('-r') || flags.includes('-rf');
          const targetNode = getNode(fileName);
          
          if (!targetNode) {
            output = `rm: cannot remove '${fileName}': No such file or directory`;
            isError = true;
          } else if (targetNode.type === 'directory' && !recursive) {
            output = `rm: cannot remove '${fileName}': Is a directory`;
            isError = true;
          } else {
            if (removeNode(fileName, undefined, recursive)) {
              output = '';
            } else {
              output = `rm: cannot remove '${fileName}'`;
              isError = true;
            }
          }
        }
        break;

      case 'touch':
        if (args.length === 0) {
          output = 'touch: missing file operand';
          isError = true;
        } else {
          const fileName = args[0];
          const existingNode = getNode(fileName);
          if (existingNode) {
            output = '';
          } else {
            if (createFile(fileName)) {
              output = '';
            } else {
              output = `touch: cannot touch '${fileName}'`;
              isError = true;
            }
          }
        }
        break;

      case 'mv':
        if (args.length < 2) {
          output = 'mv: missing file operand';
          isError = true;
        } else {
          const source = args[0];
          const destination = args[1];
          if (moveNode(source, destination)) {
            output = '';
          } else {
            output = `mv: cannot move '${source}' to '${destination}'`;
            isError = true;
          }
        }
        break;

      case 'cp':
        if (args.length < 2) {
          output = 'cp: missing file operand';
          isError = true;
        } else {
          const source = args[0];
          const destination = args[1];
          if (copyNode(source, destination)) {
            output = '';
          } else {
            output = `cp: cannot copy '${source}' to '${destination}'`;
            isError = true;
          }
        }
        break;

      case 'cat':
        if (args.length === 0) {
          output = 'cat: missing file operand';
          isError = true;
        } else {
          const fileName = args[0];
          const targetNode = getNode(fileName);
          if (!targetNode) {
            output = `cat: ${fileName}: No such file or directory`;
            isError = true;
          } else if (targetNode.type === 'directory') {
            output = `cat: ${fileName}: Is a directory`;
            isError = true;
          } else {
            output = targetNode.content || '';
          }
        }
        break;

      case 'curl':
        if (args.length === 0) {
          output = 'curl: no URL specified';
          isError = true;
        } else {
          const url = args[0];
          const mockResponses: { [key: string]: string } = {
            'https://api.github.com/users/octocat': JSON.stringify({
              login: 'octocat',
              id: 1,
              name: 'The Octocat',
              company: 'GitHub',
              blog: 'https://github.blog',
              location: 'San Francisco',
              bio: 'How people build software.',
              public_repos: 8,
              followers: 9001,
              following: 9
            }, null, 2),
            'https://jsonplaceholder.typicode.com/posts/1': JSON.stringify({
              userId: 1,
              id: 1,
              title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
              body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto'
            }, null, 2),
            'https://httpbin.org/ip': JSON.stringify({
              origin: '192.168.1.100'
            }, null, 2),
            'https://api.quotable.io/random': JSON.stringify({
              content: 'The only way to do great work is to love what you do.',
              author: 'Steve Jobs',
              tags: ['inspirational', 'motivational']
            }, null, 2)
          };
          
          const response = mockResponses[url] || `HTTP/1.1 200 OK
Content-Type: application/json
Date: ${new Date().toUTCString()}

{
  "message": "Hello from simulated API!",
  "url": "${url}",
  "timestamp": "${new Date().toISOString()}",
  "status": "success"
}`;
          output = response;
        }
        break;

      default:
        output = `Command not recognized: ${command}`;
        isError = true;
    }

    const executionTime = performance.now() - startTime;
    addOutput(fullCommand, output, isError, executionTime);
  }, [
    parseCommand,
    addOutput,
    getCurrentPath,
    getNode,
    listDirectory,
    changeDirectory,
    createDirectory,
    createFile,
    removeNode,
    moveNode,
    copyNode,
    writeFile,
    fileSystem,
    commandHistory,
    currentTheme
  ]);

  const navigateHistory = useCallback((direction: 'up' | 'down') => {
    if (commandHistory.length === 0) return '';

    let newIndex: number;
    if (direction === 'up') {
      newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
    } else {
      newIndex = historyIndex === -1 ? -1 : Math.min(commandHistory.length - 1, historyIndex + 1);
      if (newIndex === commandHistory.length - 1 && historyIndex === commandHistory.length - 1) {
        newIndex = -1;
      }
    }

    setHistoryIndex(newIndex);
    return newIndex === -1 ? '' : commandHistory[newIndex];
  }, [commandHistory, historyIndex]);

  const getTabCompletion = useCallback((input: string): string[] => {
    const parts = input.trim().split(/\s+/);
    const command = parts[0];
    const currentArg = parts[parts.length - 1] || '';
    
    if (parts.length === 1) {
      const commands = [
        'ls', 'cd', 'mkdir', 'rmdir', 'rm', 'touch', 'mv', 'cp', 'curl', 'clear', 'pwd', 'cat',
        'help', 'whoami', 'date', 'echo', 'grep', 'find', 'tree', 'history', 'theme', 'neofetch',
        'ps', 'top', 'df', 'free', 'uptime', 'uname', 'which', 'man', 'alias', 'export'
      ];
      return commands.filter(cmd => cmd.startsWith(currentArg));
    } else if (['ls', 'cd', 'rm', 'rmdir', 'cat', 'mv', 'cp', 'grep', 'find'].includes(command)) {
      const items = listDirectory();
      return items
        .filter(item => item.name.startsWith(currentArg))
        .map(item => item.name);
    } else if (command === 'theme') {
      return themes.map(t => t.name).filter(name => name.startsWith(currentArg));
    }
    
    return [];
  }, [listDirectory]);

  return {
    outputs,
    commandHistory,
    executeCommand,
    navigateHistory,
    getTabCompletion,
    fileSystem,
    getCurrentPath,
    currentTheme,
    themes
  };
};