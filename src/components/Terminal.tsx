import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Terminal as TerminalIcon, User, Server, Clock, Zap } from 'lucide-react';
import { useTerminal } from '../hooks/useTerminal';

interface TerminalProps {
  className?: string;
}

export const Terminal: React.FC<TerminalProps> = ({ className = '' }) => {
  const [input, setInput] = useState('');
  const [isBlinking, setIsBlinking] = useState(true);
  const [showTimestamps, setShowTimestamps] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const {
    outputs,
    executeCommand,
    navigateHistory,
    getTabCompletion,
    getCurrentPath,
    currentTheme
  } = useTerminal();

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [outputs]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim()) {
        executeCommand(input);
        setInput('');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const historyCommand = navigateHistory('up');
      setInput(historyCommand);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const historyCommand = navigateHistory('down');
      setInput(historyCommand);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const completions = getTabCompletion(input);
      if (completions.length === 1) {
        const parts = input.trim().split(/\s+/);
        if (parts.length === 1) {
          setInput(completions[0] + ' ');
        } else {
          parts[parts.length - 1] = completions[0];
          setInput(parts.join(' ') + ' ');
        }
      }
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      executeCommand('clear');
    } else if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      setInput('');
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const currentPath = getCurrentPath();
  const username = 'user';
  const hostname = 'webcli';

  return (
    <div 
      className={`bg-gradient-to-br ${currentTheme.background} text-gray-100 font-mono text-sm overflow-hidden flex flex-col ${className} border border-gray-700 shadow-2xl`}
      onClick={handleContainerClick}
    >
      {/* Terminal Header */}
      <div className="bg-gray-800/90 backdrop-blur-sm px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer"></div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <TerminalIcon size={16} className={currentTheme.accent} />
            <span className="text-gray-300 font-semibold">Web CLI Terminal</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-xs">
          <button
            onClick={() => setShowTimestamps(!showTimestamps)}
            className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
              showTimestamps ? 'bg-gray-700 text-green-400' : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Clock size={12} />
            Timestamps
          </button>
          <div className="flex items-center gap-1 text-gray-400">
            <Server size={12} />
            <span>{hostname}</span>
          </div>
        </div>
      </div>

      {/* Terminal Output */}
      <div 
        ref={outputRef}
        className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
        style={{ scrollbarWidth: 'thin' }}
      >
        {/* Welcome Message */}
        <div className={`mb-6 ${currentTheme.accent} animate-fade-in`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
              <Server size={24} className="text-white" />
            </div>
            <div>
              <div className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Welcome to Web CLI Terminal
              </div>
              <div className="text-sm opacity-80">
                Advanced browser-based terminal simulator
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div>
              <div className="font-semibold mb-2 text-green-400">🚀 Quick Start:</div>
              <div className="space-y-1 text-gray-300">
                <div>• Type <span className="text-yellow-400 font-mono">help</span> for commands</div>
                <div>• Use <span className="text-yellow-400 font-mono">Tab</span> for completion</div>
                <div>• Try <span className="text-yellow-400 font-mono">neofetch</span> for system info</div>
                <div>• Use <span className="text-yellow-400 font-mono">theme</span> to change colors</div>
              </div>
            </div>
            <div>
              <div className="font-semibold mb-2 text-blue-400">⌨️ Shortcuts:</div>
              <div className="space-y-1 text-gray-300">
                <div>• <span className="text-yellow-400 font-mono">Ctrl+L</span> - Clear screen</div>
                <div>• <span className="text-yellow-400 font-mono">Ctrl+C</span> - Cancel input</div>
                <div>• <span className="text-yellow-400 font-mono">↑/↓</span> - Command history</div>
                <div>• <span className="text-yellow-400 font-mono">Tab</span> - Auto-complete</div>
              </div>
            </div>
          </div>
        </div>

        {/* Command History */}
        {outputs.map((output) => (
          <div key={output.id} className="mb-3 animate-fade-in">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              {showTimestamps && (
                <span className="text-xs text-gray-500 font-mono">
                  [{output.timestamp.toLocaleTimeString()}]
                </span>
              )}
              <span className={`${currentTheme.accent} flex items-center gap-1 font-semibold`}>
                <User size={14} />
                {username}@{hostname}
              </span>
              <span className="text-gray-500">:</span>
              <span className="text-purple-400 font-semibold">{currentPath}</span>
              <span className="text-gray-500">$</span>
              <span className="text-gray-300 font-mono">{output.command}</span>
              {output.executionTime && (
                <span className="text-xs text-gray-500 flex items-center gap-1 ml-auto">
                  <Zap size={10} />
                  {output.executionTime.toFixed(1)}ms
                </span>
              )}
            </div>
            {output.output && (
              <div className={`pl-4 whitespace-pre-wrap font-mono text-sm ${
                output.isError ? currentTheme.error : 'text-gray-300'
              } leading-relaxed`}>
                {output.output}
              </div>
            )}
          </div>
        ))}

        {/* Current Input Line */}
        <div className="flex items-center gap-2 animate-fade-in">
          {showTimestamps && (
            <span className="text-xs text-gray-500 font-mono">
              [{new Date().toLocaleTimeString()}]
            </span>
          )}
          <span className={`${currentTheme.accent} flex items-center gap-1 font-semibold`}>
            <User size={14} />
            {username}@{hostname}
          </span>
          <span className="text-gray-500">:</span>
          <span className="text-purple-400 font-semibold">{currentPath}</span>
          <span className="text-gray-500">$</span>
          <div className="flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent outline-none text-gray-300 flex-1 font-mono"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
            <span className={`w-2 h-5 ${currentTheme.text} ml-1 ${
              isBlinking ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-300`}>
              ▋
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};