import React, { useState } from 'react';
import { HelpCircle, Terminal, Folder, File, Copy, Move, Download, Search, Settings, Monitor, Zap, ChevronDown, ChevronRight } from 'lucide-react';

interface CommandHelpProps {
  className?: string;
}

interface CommandCategory {
  name: string;
  icon: React.ReactNode;
  commands: Array<{
    name: string;
    description: string;
    usage: string;
    examples?: string[];
  }>;
}

export const CommandHelp: React.FC<CommandHelpProps> = ({ className = '' }) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['filesystem']));

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  const categories: CommandCategory[] = [
    {
      name: 'filesystem',
      icon: <Folder size={16} />,
      commands: [
        {
          name: 'ls',
          description: 'List directory contents',
          usage: 'ls [directory] [-l] [-a]',
          examples: ['ls', 'ls -l', 'ls -la /home']
        },
        {
          name: 'cd',
          description: 'Change directory',
          usage: 'cd [directory]',
          examples: ['cd Documents', 'cd ..', 'cd /home/user']
        },
        {
          name: 'mkdir',
          description: 'Create directory',
          usage: 'mkdir <directory>',
          examples: ['mkdir newdir', 'mkdir "my folder"']
        },
        {
          name: 'rmdir',
          description: 'Remove empty directory',
          usage: 'rmdir <directory>',
          examples: ['rmdir olddir']
        },
        {
          name: 'touch',
          description: 'Create empty file',
          usage: 'touch <filename>',
          examples: ['touch newfile.txt', 'touch script.js']
        },
        {
          name: 'rm',
          description: 'Remove file or directory',
          usage: 'rm <filename> [-r]',
          examples: ['rm file.txt', 'rm -r directory']
        },
        {
          name: 'mv',
          description: 'Move/rename file or directory',
          usage: 'mv <source> <destination>',
          examples: ['mv old.txt new.txt', 'mv file.txt Documents/']
        },
        {
          name: 'cp',
          description: 'Copy file or directory',
          usage: 'cp <source> <destination> [-r]',
          examples: ['cp file.txt backup.txt', 'cp -r dir1 dir2']
        },
        {
          name: 'cat',
          description: 'Display file contents',
          usage: 'cat <filename>',
          examples: ['cat readme.txt', 'cat config.json']
        }
      ]
    },
    {
      name: 'system',
      icon: <Monitor size={16} />,
      commands: [
        {
          name: 'pwd',
          description: 'Print working directory',
          usage: 'pwd',
          examples: ['pwd']
        },
        {
          name: 'whoami',
          description: 'Display current user',
          usage: 'whoami',
          examples: ['whoami']
        },
        {
          name: 'date',
          description: 'Display current date and time',
          usage: 'date',
          examples: ['date']
        },
        {
          name: 'uptime',
          description: 'Display system uptime',
          usage: 'uptime',
          examples: ['uptime']
        },
        {
          name: 'ps',
          description: 'List running processes',
          usage: 'ps',
          examples: ['ps']
        },
        {
          name: 'top',
          description: 'Display system processes',
          usage: 'top',
          examples: ['top']
        },
        {
          name: 'df',
          description: 'Display disk usage',
          usage: 'df',
          examples: ['df']
        },
        {
          name: 'free',
          description: 'Display memory usage',
          usage: 'free',
          examples: ['free']
        },
        {
          name: 'neofetch',
          description: 'Display system information',
          usage: 'neofetch',
          examples: ['neofetch']
        }
      ]
    },
    {
      name: 'utilities',
      icon: <Search size={16} />,
      commands: [
        {
          name: 'echo',
          description: 'Display text',
          usage: 'echo <text>',
          examples: ['echo "Hello World"', 'echo $USER']
        },
        {
          name: 'grep',
          description: 'Search for patterns in files',
          usage: 'grep <pattern> <file>',
          examples: ['grep "error" log.txt', 'grep "function" script.js']
        },
        {
          name: 'find',
          description: 'Find files and directories',
          usage: 'find <name>',
          examples: ['find config', 'find .txt']
        },
        {
          name: 'tree',
          description: 'Display directory tree',
          usage: 'tree',
          examples: ['tree']
        },
        {
          name: 'history',
          description: 'Show command history',
          usage: 'history',
          examples: ['history']
        },
        {
          name: 'which',
          description: 'Locate command',
          usage: 'which <command>',
          examples: ['which ls', 'which grep']
        },
        {
          name: 'man',
          description: 'Display manual for command',
          usage: 'man <command>',
          examples: ['man ls', 'man grep']
        }
      ]
    },
    {
      name: 'network',
      icon: <Download size={16} />,
      commands: [
        {
          name: 'curl',
          description: 'Fetch data from URL (simulated)',
          usage: 'curl <url>',
          examples: [
            'curl https://api.github.com/users/octocat',
            'curl https://jsonplaceholder.typicode.com/posts/1'
          ]
        }
      ]
    },
    {
      name: 'customization',
      icon: <Settings size={16} />,
      commands: [
        {
          name: 'theme',
          description: 'Change terminal theme',
          usage: 'theme [name]',
          examples: ['theme', 'theme matrix', 'theme cyberpunk']
        },
        {
          name: 'alias',
          description: 'List aliases',
          usage: 'alias',
          examples: ['alias']
        },
        {
          name: 'export',
          description: 'List environment variables',
          usage: 'export',
          examples: ['export']
        },
        {
          name: 'clear',
          description: 'Clear terminal screen',
          usage: 'clear',
          examples: ['clear']
        }
      ]
    }
  ];

  return (
    <div className={`bg-gray-800 text-gray-300 rounded-lg overflow-hidden ${className}`}>
      <div className="bg-gray-900 px-6 py-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <HelpCircle size={20} className="text-blue-400" />
          <h2 className="text-xl font-bold text-white">Command Reference</h2>
        </div>
        <p className="text-sm text-gray-400 mt-1">
          Comprehensive guide to all available commands
        </p>
      </div>
      
      <div className="p-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {categories.map((category) => {
          const isExpanded = expandedCategories.has(category.name);
          
          return (
            <div key={category.name} className="border border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleCategory(category.name)}
                className="w-full flex items-center justify-between p-4 bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="text-green-400">
                    {category.icon}
                  </div>
                  <span className="font-semibold text-white capitalize">
                    {category.name} Commands
                  </span>
                  <span className="text-xs bg-gray-600 px-2 py-1 rounded-full">
                    {category.commands.length}
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronDown size={16} className="text-gray-400" />
                ) : (
                  <ChevronRight size={16} className="text-gray-400" />
                )}
              </button>
              
              {isExpanded && (
                <div className="bg-gray-800 divide-y divide-gray-700">
                  {category.commands.map((command) => (
                    <div key={command.name} className="p-4">
                      <div className="flex items-start gap-3 mb-2">
                        <Terminal size={14} className="text-green-400 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-green-400 font-bold text-sm">
                              {command.name}
                            </span>
                            <span className="text-xs text-gray-500 font-mono bg-gray-700 px-2 py-1 rounded">
                              {command.usage}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300 mb-2">
                            {command.description}
                          </p>
                          {command.examples && (
                            <div className="space-y-1">
                              <div className="text-xs text-gray-400 font-semibold">Examples:</div>
                              {command.examples.map((example, index) => (
                                <div key={index} className="text-xs font-mono text-yellow-300 bg-gray-900 px-2 py-1 rounded">
                                  $ {example}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg border border-blue-700/50">
          <h3 className="font-bold text-white mb-3 flex items-center gap-2">
            <Zap size={16} className="text-yellow-400" />
            Pro Tips
          </h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">•</span>
              <span>Use <code className="bg-gray-700 px-1 rounded text-yellow-300">Tab</code> for command and path completion</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">•</span>
              <span>Navigate command history with <code className="bg-gray-700 px-1 rounded text-yellow-300">↑/↓</code> arrow keys</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">•</span>
              <span>Use <code className="bg-gray-700 px-1 rounded text-yellow-300">Ctrl+L</code> to clear screen quickly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">•</span>
              <span>Try <code className="bg-gray-700 px-1 rounded text-yellow-300">ls -la</code> for detailed file listings</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">•</span>
              <span>Use <code className="bg-gray-700 px-1 rounded text-yellow-300">.</code> for current directory and <code className="bg-gray-700 px-1 rounded text-yellow-300">..</code> for parent</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">•</span>
              <span>Explore different themes with <code className="bg-gray-700 px-1 rounded text-yellow-300">theme cyberpunk</code></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};