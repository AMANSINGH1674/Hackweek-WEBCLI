# Hackweek-WEBCLI

<p align="center">
  <img src="https://raw.githubusercontent.com/AMANSINGH1674/Hackweek-WEBCLI/main/.github/banner.png" alt="Web CLI Terminal Banner" width="600"/>
</p>

<p align="center">
  <a href="https://github.com/AMANSINGH1674/Hackweek-WEBCLI/actions"><img src="https://img.shields.io/github/actions/workflow/status/AMANSINGH1674/Hackweek-WEBCLI/ci.yml?branch=main&style=flat-square" alt="Build Status"></a>
  <a href="https://github.com/AMANSINGH1674/Hackweek-WEBCLI/blob/main/LICENSE"><img src="https://img.shields.io/github/license/AMANSINGH1674/Hackweek-WEBCLI?style=flat-square" alt="License"></a>
  <img src="https://img.shields.io/badge/React-18-blue?style=flat-square" alt="React 18">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-square" alt="TypeScript 5">
  <img src="https://img.shields.io/badge/TailwindCSS-3-blue?style=flat-square" alt="TailwindCSS 3">
</p>

---

## Table of Contents
- [About](#about)
- [Features](#features)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Command Reference](#command-reference)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## About

**Hackweek-WEBCLI** is a beautiful, production-ready web-based command-line interface (CLI) simulator. It provides a realistic terminal experience in your browser, complete with a simulated file system, command history, tab completion, themes, and more. Perfect for demos, education, or just having fun with a terminal in the browser!

---

## Features

- 🎨 **Modern UI**: Responsive, themeable, and accessible terminal interface
- 🗂️ **Simulated File System**: Create, move, and manage files and directories
- 🧠 **Command Help & Suggestions**: Built-in help and command reference
- ⌨️ **Keyboard Shortcuts**: Tab completion, history navigation, and more
- 🌈 **Multiple Themes**: Switch between beautiful color schemes
- 🖥️ **System Commands**: Simulated system info, process list, and more
- 📦 **Built with React, TypeScript, and Tailwind CSS**

---

## Screenshots

<p align="center">
  <img src=".github/screenshot1.png" alt="Web CLI Terminal Screenshot" width="700"/>
  <br/>
  <img src=".github/screenshot2.png" alt="Command Help Screenshot" width="700"/>
</p>

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Running the App
```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

---

## Usage

- Type `help` to see all available commands
- Use <kbd>Tab</kbd> for command and path completion
- Navigate command history with <kbd>↑</kbd>/<kbd>↓</kbd> arrow keys
- Use <kbd>Ctrl+L</kbd> to clear the screen
- Try `neofetch` for system info, or `theme` to change colors

### Example Commands
```sh
ls -la
cd Documents
cat welcome.txt
mkdir new_folder
curl https://api.github.com/users/octocat
theme cyberpunk
```

---

## Command Reference

A comprehensive command reference is available in the app (click "Show Help").

**Categories:**
- File System: `ls`, `cd`, `mkdir`, `rmdir`, `touch`, `rm`, `mv`, `cp`, `cat`, `find`, `tree`
- System: `pwd`, `whoami`, `date`, `uptime`, `ps`, `top`, `df`, `free`, `neofetch`, `history`, `clear`
- Utilities: `echo`, `grep`, `which`, `man`
- Network: `curl`
- Customization: `theme`, `alias`, `export`

Use `man <command>` for detailed help on any command.

---

## Project Structure

```
project-root/
├── src/
│   ├── components/      # React components (Terminal, CommandHelp)
│   ├── hooks/           # Custom React hooks (useFileSystem, useTerminal)
│   ├── types/           # TypeScript type definitions
│   ├── index.css        # Global styles
│   └── main.tsx         # App entry point
├── public/              # Static assets
├── package.json         # Project metadata and scripts
├── tailwind.config.js   # Tailwind CSS config
└── README.md            # This file
```

---

## Technologies Used
- [React](https://react.dev/) (18+)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Lucide React](https://lucide.dev/icons/) (for icons)

---

## Contributing

Contributions are welcome! Please open issues or pull requests for new features, bug fixes, or suggestions.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

Created by [Aman Singh](https://github.com/AMANSINGH1674) · [GitHub](https://github.com/AMANSINGH1674/Hackweek-WEBCLI)

---

<p align="center">
  <em>Made with ❤️ for Hackweek</em>
</p> 