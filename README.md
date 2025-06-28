# Web CLI Terminal

<p align="center">
  <img src="https://raw.githubusercontent.com/AMANSINGH1674/Hackweek-WEBCLI/main/.github/banner.png" alt="Web CLI Terminal Banner" width="600"/>
</p>

<p align="center">
  <a href="https://github.com/AMANSINGH1674/Hackweek-WEBCLI/actions"><img src="https://img.shields.io/github/actions/workflow/status/AMANSINGH1674/Hackweek-WEBCLI/ci.yml?branch=main&style=flat-square" alt="Build Status"></a>
  <a href="https://github.com/AMANSINGH1674/Hackweek-WEBCLI/blob/main/LICENSE"><img src="https://img.shields.io/github/license/AMANSINGH1674/Hackweek-WEBCLI?style=flat-square" alt="License"></a>
  <img src="https://img.shields.io/badge/React-18-blue?style=flat-square" alt="React 18">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-square" alt="TypeScript 5">
  <img src="https://img.shields.io/badge/TailwindCSS-3-blue?style=flat-square" alt="TailwindCSS 3">
  <a href="https://hackweek-webcli.netlify.app/" target="_blank"><img src="https://img.shields.io/badge/Live%20Demo-Netlify-green?style=flat-square" alt="Live Demo"></a>
</p>

---

## 🏆 Challenge Overview

**Category:** Full Stack & UI/UX  
**Difficulty:** Intermediate  
**Points:** 400  

> Build a browser-based terminal interface that mimics a real command-line experience. The web CLI should allow users to execute common file system commands with in-browser state management—no actual file system access is required. Your web-based CLI should support a defined set of commands: `mkdir`, `ls`, `cd`, `rmdir`, `rm`, `touch`, `mv`, `cp`, and `curl` (simulated). The terminal must reject any commands outside this list with an appropriate error message. All operations should occur in a simulated, in-memory file system, and the entire interface must run fully in the browser.

---

## 🎯 Solution Summary

**Web CLI Terminal** is a production-ready, browser-based command-line interface that simulates a real terminal experience. It features a fully in-memory file system, robust command support, and a beautiful, responsive UI. All operations are performed client-side, ensuring security and speed. The project is deployed at: [https://hackweek-webcli.netlify.app/](https://hackweek-webcli.netlify.app/)

---

## 🗂️ Repository Structure

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

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/AMANSINGH1674/Hackweek-WEBCLI.git
cd Hackweek-WEBCLI
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the App Locally
```bash
npm run dev
```

Open your browser and navigate to [http://localhost:5173](http://localhost:5173)

### 4. Try the Live Demo
[https://hackweek-webcli.netlify.app/](https://hackweek-webcli.netlify.app/)

---

## 🖥️ Features

- **Modern Terminal UI:** Responsive, themeable, and accessible
- **In-Memory File System:** All operations are simulated in-browser
- **Supported Commands:**
  - `ls` — List directory contents
  - `cd` — Change directory
  - `mkdir` — Create directory
  - `rmdir` — Remove empty directory
  - `rm` — Remove file or directory
  - `touch` — Create empty file
  - `mv` — Move/rename file or directory
  - `cp` — Copy file or directory
  - `cat` — Display file contents
  - `curl` — Simulate fetching data from a URL (returns dummy JSON)
- **Command Help & Suggestions:** Built-in help panel and usage hints
- **Keyboard Shortcuts:** Tab completion, history navigation, clear screen, and more
- **Multiple Themes:** Switch between beautiful color schemes
- **Error Handling:** Unrecognized commands are rejected with clear messages
- **No Backend Required:** 100% client-side, secure, and fast

---

## 🧑‍💻 Usage Examples

```sh
# List files and directories
ls -la

# Create and navigate directories
mkdir projects
cd projects

# Create a file and view its contents
touch hello.txt
cat hello.txt

# Move and copy files
mv hello.txt greetings.txt
cp greetings.txt backup.txt

# Remove files and directories
rm backup.txt
cd ..
rmdir projects

# Simulate fetching data from a URL
curl https://api.github.com/users/octocat
```

---

## 📋 Command Reference

| Command   | Description                        | Example Usage                  |
|-----------|------------------------------------|-------------------------------|
| ls        | List directory contents            | ls -l /home                   |
| cd        | Change directory                   | cd Documents                  |
| mkdir     | Create directory                   | mkdir newdir                  |
| rmdir     | Remove empty directory             | rmdir olddir                  |
| rm        | Remove file or directory           | rm file.txt                   |
| touch     | Create empty file                  | touch notes.txt               |
| mv        | Move/rename file or directory      | mv old.txt new.txt            |
| cp        | Copy file or directory             | cp file.txt backup.txt        |
| cat       | Display file contents              | cat readme.txt                |
| curl      | Simulate fetching data from a URL  | curl https://api.example.com  |

- Any command outside this list will return: `Command not recognized.`
- All operations are performed in a simulated, in-memory file system.

---

## 🛠️ Technologies Used
- [React](https://react.dev/) (18+)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Lucide React](https://lucide.dev/icons/) (for icons)

---

## 🤝 Contributing

Contributions are welcome! Please open issues or pull requests for new features, bug fixes, or suggestions.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact

Created by [Aman Singh](https://github.com/AMANSINGH1674)  
Project Repository: [AMANSINGH1674/Hackweek-WEBCLI](https://github.com/AMANSINGH1674/Hackweek-WEBCLI)  
Live Demo: [https://hackweek-webcli.netlify.app/](https://hackweek-webcli.netlify.app/)

---

<p align="center">
  <em>Made with ❤️ for Hackweek & the Web CLI Challenge</em>
</p> 