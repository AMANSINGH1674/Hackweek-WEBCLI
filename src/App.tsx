import React, { useState } from 'react';
import { Terminal } from './components/Terminal';
import { CommandHelp } from './components/CommandHelp';
import { Monitor, HelpCircle, Github, Palette, Maximize2, Minimize2 } from 'lucide-react';
import { useTerminal } from './hooks/useTerminal';

function App() {
  const [showHelp, setShowHelp] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { currentTheme, themes } = useTerminal();

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.background} transition-all duration-500`}>
      {/* Header */}
      <header className="bg-gray-800/90 backdrop-blur-sm border-b border-gray-700 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg">
              <Monitor size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Web CLI
              </h1>
              <p className="text-sm text-gray-400">
                Advanced Browser Terminal • Theme: <span className="text-green-400 capitalize">{currentTheme.name}</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200 hover:scale-105"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
            
            <button
              onClick={() => setShowHelp(!showHelp)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                showHelp 
                  ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
            >
              <HelpCircle size={18} />
              {showHelp ? 'Hide Help' : 'Show Help'}
            </button>
            
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200 hover:scale-105"
            >
              <Github size={18} />
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className={`grid gap-6 transition-all duration-300 ${
          showHelp ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'
        }`} style={{ height: 'calc(100vh - 140px)' }}>
          {/* Terminal */}
          <div className={`${showHelp ? 'lg:col-span-2' : 'col-span-1'} transition-all duration-300`}>
            <Terminal className="h-full rounded-xl shadow-2xl ring-1 ring-gray-700/50" />
          </div>
          
          {/* Help Panel */}
          {showHelp && (
            <div className="lg:col-span-1 transition-all duration-300 animate-slide-in">
              <CommandHelp className="h-full rounded-xl shadow-2xl ring-1 ring-gray-700/50" />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800/90 backdrop-blur-sm border-t border-gray-700 px-6 py-4 mt-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-300 font-semibold">Web CLI Terminal</p>
              <p className="text-sm text-gray-400">
                Full-featured browser-based terminal with advanced file system simulation
              </p>
            </div>
            
            <div className="flex items-center gap-6 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Palette size={14} />
                <span>Themes: {themes.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <Monitor size={14} />
                <span>Commands: 30+</span>
              </div>
              <div className="text-center">
                <div className="text-green-400 font-semibold">Built with React & TypeScript</div>
                <div>Features: History • Completion • Themes • System Info</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;