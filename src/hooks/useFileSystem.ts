import { useState, useCallback } from 'react';
import { FileSystemNode, FileSystemState } from '../types/FileSystem';

export const useFileSystem = () => {
  const [fileSystem, setFileSystem] = useState<FileSystemState>(() => {
    const createNode = (name: string, type: 'file' | 'directory', content?: string): FileSystemNode => ({
      name,
      type,
      content,
      children: type === 'directory' ? {} : undefined,
      created: new Date(),
      modified: new Date(),
      size: type === 'file' ? (content?.length || 0) : undefined,
      permissions: type === 'directory' ? 'drwxr-xr-x' : '-rw-r--r--',
      owner: 'user'
    });

    const root = createNode('/', 'directory');
    
    // Create a more realistic file system structure
    const home = createNode('home', 'directory');
    const user = createNode('user', 'directory');
    const documents = createNode('Documents', 'directory');
    const downloads = createNode('Downloads', 'directory');
    const projects = createNode('Projects', 'directory');
    const etc = createNode('etc', 'directory');
    const var_ = createNode('var', 'directory');
    const tmp = createNode('tmp', 'directory');
    const bin = createNode('bin', 'directory');
    const usr = createNode('usr', 'directory');

    // Add sample files
    const welcomeFile = createNode('welcome.txt', 'file', 
      'Welcome to Web CLI Terminal!\n\nThis is a fully-featured browser-based terminal simulator.\n\nFeatures:\n- Complete file system simulation\n- Command history and tab completion\n- Multiple themes\n- System information\n- File permissions\n- And much more!\n\nTry running "help" to see all available commands.');
    
    const readmeFile = createNode('README.md', 'file',
      '# Web CLI Terminal\n\nA powerful browser-based terminal interface.\n\n## Features\n- File system operations\n- Command history\n- Tab completion\n- Multiple themes\n- System monitoring\n\n## Commands\nRun `help` to see all available commands.');

    const configFile = createNode('config.json', 'file',
      '{\n  "theme": "matrix",\n  "fontSize": 14,\n  "showTimestamps": true,\n  "enableSounds": false\n}');

    const packageFile = createNode('package.json', 'file',
      '{\n  "name": "my-project",\n  "version": "1.0.0",\n  "description": "A sample project",\n  "main": "index.js",\n  "scripts": {\n    "start": "node index.js"\n  }\n}');

    const indexFile = createNode('index.js', 'file',
      'console.log("Hello, World!");\nconsole.log("Welcome to my project!");');

    // Build the tree structure
    root.children = { home, etc, var: var_, tmp, bin, usr };
    home.children = { user };
    user.children = { Documents: documents, Downloads: downloads, Projects: projects, 'welcome.txt': welcomeFile, 'README.md': readmeFile };
    documents.children = { 'config.json': configFile };
    projects.children = { 'package.json': packageFile, 'index.js': indexFile };

    // Set parent references
    const setParents = (node: FileSystemNode, parent?: FileSystemNode) => {
      node.parent = parent;
      if (node.children) {
        Object.values(node.children).forEach(child => setParents(child, node));
      }
    };
    setParents(root);

    return {
      root,
      currentDirectory: user,
      currentPath: '/home/user'
    };
  });

  const getCurrentPath = useCallback(() => {
    return fileSystem.currentPath;
  }, [fileSystem.currentPath]);

  const getNode = useCallback((path: string, baseDir?: FileSystemNode): FileSystemNode | null => {
    const targetDir = baseDir || fileSystem.currentDirectory;
    
    if (path === '.' || path === '') {
      return targetDir;
    }
    
    if (path === '..') {
      return targetDir.parent || fileSystem.root;
    }
    
    if (path.startsWith('/')) {
      const parts = path.split('/').filter(part => part !== '');
      let current = fileSystem.root;
      
      for (const part of parts) {
        if (!current.children || !current.children[part]) {
          return null;
        }
        current = current.children[part];
      }
      return current;
    } else {
      const parts = path.split('/').filter(part => part !== '');
      let current = targetDir;
      
      for (const part of parts) {
        if (part === '..') {
          current = current.parent || fileSystem.root;
        } else if (part === '.') {
          continue;
        } else {
          if (!current.children || !current.children[part]) {
            return null;
          }
          current = current.children[part];
        }
      }
      return current;
    }
  }, [fileSystem]);

  const listDirectory = useCallback((path?: string, showHidden: boolean = false): FileSystemNode[] => {
    const targetDir = path ? getNode(path) : fileSystem.currentDirectory;
    if (!targetDir || targetDir.type !== 'directory' || !targetDir.children) {
      return [];
    }
    
    return Object.values(targetDir.children)
      .filter(node => showHidden || !node.name.startsWith('.'))
      .sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === 'directory' ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      });
  }, [fileSystem, getNode]);

  const createDirectory = useCallback((name: string, path?: string): boolean => {
    const targetDir = path ? getNode(path) : fileSystem.currentDirectory;
    if (!targetDir || targetDir.type !== 'directory') {
      return false;
    }

    if (targetDir.children && targetDir.children[name]) {
      return false;
    }

    const newDir: FileSystemNode = {
      name,
      type: 'directory',
      children: {},
      parent: targetDir,
      created: new Date(),
      modified: new Date(),
      permissions: 'drwxr-xr-x',
      owner: 'user'
    };

    setFileSystem(prev => {
      const newState = { ...prev };
      if (!targetDir.children) {
        targetDir.children = {};
      }
      targetDir.children[name] = newDir;
      targetDir.modified = new Date();
      return newState;
    });

    return true;
  }, [fileSystem, getNode]);

  const createFile = useCallback((name: string, content: string = '', path?: string): boolean => {
    const targetDir = path ? getNode(path) : fileSystem.currentDirectory;
    if (!targetDir || targetDir.type !== 'directory') {
      return false;
    }

    const newFile: FileSystemNode = {
      name,
      type: 'file',
      content,
      parent: targetDir,
      created: new Date(),
      modified: new Date(),
      size: content.length,
      permissions: '-rw-r--r--',
      owner: 'user'
    };

    setFileSystem(prev => {
      const newState = { ...prev };
      if (!targetDir.children) {
        targetDir.children = {};
      }
      targetDir.children[name] = newFile;
      targetDir.modified = new Date();
      return newState;
    });

    return true;
  }, [fileSystem, getNode]);

  const removeNode = useCallback((name: string, path?: string, recursive: boolean = false): boolean => {
    const targetDir = path ? getNode(path) : fileSystem.currentDirectory;
    if (!targetDir || targetDir.type !== 'directory' || !targetDir.children) {
      return false;
    }

    const nodeToRemove = targetDir.children[name];
    if (!nodeToRemove) {
      return false;
    }

    if (nodeToRemove.type === 'directory' && nodeToRemove.children && Object.keys(nodeToRemove.children).length > 0 && !recursive) {
      return false;
    }

    setFileSystem(prev => {
      const newState = { ...prev };
      delete targetDir.children![name];
      targetDir.modified = new Date();
      return newState;
    });

    return true;
  }, [fileSystem, getNode]);

  const changeDirectory = useCallback((path: string): boolean => {
    const targetDir = getNode(path);
    if (!targetDir || targetDir.type !== 'directory') {
      return false;
    }

    let newPath: string;
    if (path.startsWith('/')) {
      newPath = path === '/' ? '/' : path;
    } else {
      const currentParts = fileSystem.currentPath === '/' ? [] : fileSystem.currentPath.split('/').filter(Boolean);
      const pathParts = path.split('/').filter(Boolean);
      
      for (const part of pathParts) {
        if (part === '..') {
          currentParts.pop();
        } else if (part !== '.') {
          currentParts.push(part);
        }
      }
      
      newPath = currentParts.length === 0 ? '/' : '/' + currentParts.join('/');
    }

    setFileSystem(prev => ({
      ...prev,
      currentDirectory: targetDir,
      currentPath: newPath
    }));

    return true;
  }, [fileSystem, getNode]);

  const moveNode = useCallback((source: string, destination: string): boolean => {
    const sourceNode = getNode(source);
    const sourceParts = source.split('/');
    const sourceName = sourceParts[sourceParts.length - 1];
    const sourceParent = sourceNode?.parent;
    
    if (!sourceNode || !sourceParent || !sourceParent.children) {
      return false;
    }

    const destNode = getNode(destination);
    let targetDir: FileSystemNode;
    let newName: string;

    if (destNode && destNode.type === 'directory') {
      targetDir = destNode;
      newName = sourceName;
    } else {
      const destParts = destination.split('/');
      newName = destParts[destParts.length - 1];
      const parentPath = destParts.slice(0, -1).join('/') || '.';
      const parentNode = getNode(parentPath);
      
      if (!parentNode || parentNode.type !== 'directory') {
        return false;
      }
      
      targetDir = parentNode;
    }

    if (targetDir.children && targetDir.children[newName]) {
      return false;
    }

    setFileSystem(prev => {
      const newState = { ...prev };
      
      delete sourceParent.children![sourceName];
      sourceParent.modified = new Date();
      
      if (!targetDir.children) {
        targetDir.children = {};
      }
      
      const movedNode = { ...sourceNode };
      movedNode.name = newName;
      movedNode.parent = targetDir;
      movedNode.modified = new Date();
      
      targetDir.children[newName] = movedNode;
      targetDir.modified = new Date();
      
      return newState;
    });

    return true;
  }, [getNode]);

  const copyNode = useCallback((source: string, destination: string): boolean => {
    const sourceNode = getNode(source);
    
    if (!sourceNode) {
      return false;
    }

    const copyNodeRecursive = (node: FileSystemNode): FileSystemNode => {
      const copy: FileSystemNode = {
        name: node.name,
        type: node.type,
        content: node.content,
        created: new Date(),
        modified: new Date(),
        size: node.size,
        permissions: node.permissions,
        owner: node.owner
      };

      if (node.type === 'directory' && node.children) {
        copy.children = {};
        Object.values(node.children).forEach(child => {
          const childCopy = copyNodeRecursive(child);
          childCopy.parent = copy;
          copy.children![childCopy.name] = childCopy;
        });
      }

      return copy;
    };

    const destNode = getNode(destination);
    let targetDir: FileSystemNode;
    let newName: string;

    if (destNode && destNode.type === 'directory') {
      targetDir = destNode;
      newName = sourceNode.name;
    } else {
      const destParts = destination.split('/');
      newName = destParts[destParts.length - 1];
      const parentPath = destParts.slice(0, -1).join('/') || '.';
      const parentNode = getNode(parentPath);
      
      if (!parentNode || parentNode.type !== 'directory') {
        return false;
      }
      
      targetDir = parentNode;
    }

    if (targetDir.children && targetDir.children[newName]) {
      return false;
    }

    setFileSystem(prev => {
      const newState = { ...prev };
      
      if (!targetDir.children) {
        targetDir.children = {};
      }
      
      const copiedNode = copyNodeRecursive(sourceNode);
      copiedNode.name = newName;
      copiedNode.parent = targetDir;
      
      targetDir.children[newName] = copiedNode;
      targetDir.modified = new Date();
      
      return newState;
    });

    return true;
  }, [getNode]);

  const writeFile = useCallback((name: string, content: string, append: boolean = false): boolean => {
    const existingNode = getNode(name);
    
    if (existingNode && existingNode.type === 'file') {
      setFileSystem(prev => {
        const newState = { ...prev };
        const newContent = append ? (existingNode.content || '') + content : content;
        existingNode.content = newContent;
        existingNode.size = newContent.length;
        existingNode.modified = new Date();
        return newState;
      });
      return true;
    } else if (!existingNode) {
      return createFile(name, content);
    }
    
    return false;
  }, [getNode, createFile]);

  return {
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
  };
};