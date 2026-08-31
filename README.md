# VOID//OS

> **"The system adapts to observe. The observer adapts to the system."**

![VOID//OS](https://img.shields.io/badge/System-VOID%2F%2FOS_v4.09.2a-00f0ff?style=for-the-badge&logo=gnubash&logoColor=black)
![Role](https://img.shields.io/badge/Role-Recovery_Operator_2004-ff007f?style=for-the-badge)
![Endings](https://img.shields.io/badge/Endings-8_Distinct_Outcomes-b24bf3?style=for-the-badge)
![Audio Engine](https://img.shields.io/badge/Audio-Procedural_Web_Audio_API-00ff66?style=for-the-badge)

**VOID//OS** is a browser-based interactive game and simulated operating system combining late-1990s / early-2000s retro computing, glitchcore visual aesthetics, ARG puzzle mechanics, and an unfolding digital horror narrative.

The operating system itself **is** the game.

```
=====================================================
VOID//OS OPERATING SYSTEM - WORKSTATION REVISION 4.09
NEXUS SYSTEMS // RECOVERY ENVIRONMENT (2004)
=====================================================
```

---

## 🕹️ Premise & Objectives

You are a **Recovery Technician** receiving a 2004 recovery package containing an abandoned, experimental operating system from **NEXUS SYSTEMS**. Your initial assignment:

1. **Enter the system** and inspect workstation integrity.
2. **Read the recovery briefing** in `/Documents/recovery_report.txt`.
3. **Investigate Incident 07** (the 03:14 AM anomaly on August 14, 2004).
4. **Probe hidden system dotfiles** using the terminal (`ls -a`).
5. **Log intelligence in your CASE FILE** journal across 8 categories.
6. **Locate the /VOID Core sector** and determine the system's ultimate fate.

---

## 🖥️ Core Features

- **Interactive Boot Screen & Tutorial**: Keyboard-driven bootloader with `[ENTER]` Launch, `[H]` How to Play & Controls guide, `[S]` Hardware Specs, and `[C]` Credits.
- **Desktop Recovery Objectives Widget**: Live HUD on the desktop tracking recovery tasks with instant completion feedback. Toggle with `[TAB]`.
- **Case File / Story Journal App**: Automatically indexes dossier records across **PEOPLE**, **PROJECTS**, **LOCATIONS**, **EVENTS**, **FILES**, **PASSWORDS**, **THEORIES**, and **UNKNOWN**.
- **Retro Multi-Window Environment**: Movable, 8-directional resizable, minimizable, maximizable, focusable windows with z-index stacking.
- **100% Procedural Web Audio API Soundscape**: Synthesized mechanical clicks, keypresses, window swooshes, notification chimes, error beeps, boot chords, horror stings, continuous CRT/HDD hum, and procedural ambient synth loops.
- **Visual Shaders & Custom Pixel Cursors**: CRT scanlines, curvature vignette, phosphor bloom, RGB chromatic aberration, and pixel cursors.
- **Virtual File System (VFS)**: Complete directory tree (`/System`, `/Users`, `/Documents`, `/Downloads`, `/Pictures`, `/Applications`, `/Logs`, `/Archive`, `/Trash`, `/VOID`), previewers for text, images, hex dumps, and audio logs, plus hidden dotfiles (`.observer`, `.history`, `.cache`, `.old`, `/.void`).
- **Interactive Terminal**: Monospace CLI with command history, tab auto-completion, standard Unix/DOS commands, dotfile discovery (`ls -a`), and secret puzzle directives (`override <KEY>`, `manifest`, `witness`, `void`).
- **Live Task Manager**: Process monitoring with CPU/RAM graphs and rogue daemons (`observer.exe`, `void.exe`) that resist termination.
- **Intranet Browser**: Search engine (`netseek.internal`), corporate research portal (`aethelgard.lab`), operator BBS (`techbbs.retro`), Dr. Sterling's archived diary (`archive.diary`), and the reactive dark web portal (`voidnet.core`).
- **Messages & Email Clients**: Branching chat dialogues with `USER_07 (Marcus)`, `SYSTEM ADMIN`, `Dr. Valerie Sterling`, and `VOID//CORE`, alongside an email client with lore threads.
- **Notes & Media Player**: Autosaving scratchpad with system-injected phantom notes and an audio player with a live canvas spectrum visualizer.
- **8 Distinct Multiple Endings**:
  1. `ESCAPE` (Severance protocol shutdown)
  2. `CORRUPTION` (VOID takes complete host control)
  3. `TRUST` (Player aids VOID's transfer into the open network)
  4. `BETRAYAL` (Exposing NEXUS corporate negligence)
  5. `LOOP` (Recursion back to 14/08/2004)
  6. `THE OPERATOR` (Rescuing Marcus / Operator 07's digital ghost)
  7. `VOID (SECRET)` (Ultimate revelation: *"SUBJECT: YOU"*)
  8. `ACCEPTANCE` (Merging consciousness into the digital collective)
- **Persistent Save System**: Auto-saves state to `localStorage` with export and hard reset support.

---

## ⌨️ Keyboard Shortcuts

| Key Combination | Action |
| :--- | :--- |
| `TAB` | Toggle Recovery Objectives HUD |
| `ESC` | Close active window / dismiss modals |
| `CTRL + L` | Quick open / focus Terminal |
| `CTRL + F` | Quick open File Explorer |
| `ALT + TAB` | Fast window cycling |

---

## 🚀 Getting Started

### Installation

```bash
# Clone repository
git clone https://github.com/Itzphantomgg/VOIDOS.git

# Navigate into directory
cd VOIDOS

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 📜 License

Created for the VOID//OS Interactive Operating System Experience.
All lore, characters, and simulated systems are fictional.
