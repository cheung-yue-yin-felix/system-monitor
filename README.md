# System Monitor

A glassmorphism-style system monitor dashboard for Windows. Displays real-time hardware metrics (CPU, GPU, RAM, disk, network) alongside Hong Kong weather forecasts. Originally a Rainmeter skin, now available as a web app and a standalone Electron desktop application.

![License](https://img.shields.io/badge/license-CC0-blue)

---

## Features

- **Hardware Monitoring** — CPU clock, temperature, power, usage; GPU stats; RAM usage & module info; disk partitions; network speeds, IPs, MAC address
- **Weather Widget** — Current weather and 9-day forecast from the Hong Kong Observatory
- **DateTime & Calendar** — Real-time clock with configurable formats and a monthly calendar
- **Glassmorphism UI** — Frosted glass cards with backdrop blur, matching the original Rainmeter aesthetic
- **i18n** — English, Traditional Chinese, Simplified Chinese
- **Responsive Grid** — 4 columns on landscape displays, 3 columns on portrait

---

## Architecture

```
┌─────────────────────┐     SSE      ┌──────────────────────────┐
│   React + Vite SPA  │  ◄─────────► │  .NET 10 Minimal API     │
│   (this repo)       │              │  (system-monitor-api-v2) │
└─────────────────────┘              └──────────────────────────┘
            │                                      │
            ▼                                      ▼
    GitHub Pages                          LibreHardwareMonitor
    Electron Desktop App                  Hardware.Info
```

---

## Three Ways to Run

### 1. GitHub Pages (Web App)

The frontend is deployed to GitHub Pages. You still need to run the [.NET API](https://github.com/cheung-yue-yin-felix/system-monitor-api-v2) locally on your machine.

**Live site:** `https://cheung-yue-yin-felix.github.io/system-monitor/`

### 2. Rainmeter Skin (Legacy)

Build the frontend and copy `dist/` into the Rainmeter skin's `@Resources` folder.

```powershell
npm run build:rainmeter
```

### 3. Electron Desktop App (Recommended)

A single installer that bundles both the React frontend and the .NET backend. No manual setup required.

Download the latest `System-Monitor-Setup-x.x.x.exe` from [Releases](../../releases).

---

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) 22+
- [.NET 10 SDK](https://dotnet.microsoft.com/download) (for backend)

### Clone

```bash
git clone https://github.com/cheung-yue-yin-felix/system-monitor.git
cd system-monitor
npm install
```

### Frontend Dev Server

```bash
npm run dev
```

The frontend runs on `http://localhost:5173` and expects the backend at `http://localhost:5000`.

### Build Targets

| Command | Output | Purpose |
|---|---|---|
| `npm run build:github` | `dist/` | Deploy to GitHub Pages |
| `npm run build:rainmeter` | `dist/` | Copy into Rainmeter skin |
| `npm run build:electron` | `dist/` | Bundle into Electron app |
| `npm run electron:dev` | — | Launch Electron locally |
| `npm run electron:build` | `release/*.exe` | Build Windows installer |

### Electron Local Build

```powershell
# 1. Build the backend (run from system-monitor-api-v2 repo)
dotnet publish "System Monitor API v2.csproj" -c Release -r win-x64 --self-contained true `
  /p:PublishSingleFile=true /p:IncludeNativeLibrariesForSelfExtract=true

# 2. Build the Electron installer (run from this repo)
npm run electron:build
# Output: release/System-Monitor-Setup-0.0.0.exe
```

---

## Auto-Release via GitHub Actions

Push a version tag to automatically build and publish the Windows installer:

```bash
git tag v1.0.0
git push origin v1.0.0
```

The [`.github/workflows/release.yml`](.github/workflows/release.yml) workflow will:
1. Check out both the frontend and backend repos
2. Publish the .NET API as a self-contained executable
3. Build the Electron installer with `electron-builder`
4. Create a GitHub Release and attach the `.exe`

---

## Project Structure

```
src/
├── api/                  # API clients
├── components/           # Shared UI components
├── configs/              # Runtime config (URL, API key)
├── context/              # React context providers
├── features/
│   ├── calendar/         # Calendar widget
│   ├── dateTime/         # Clock widget
│   ├── settings/         # Settings panel
│   ├── systemMonitor/    # Hardware cards & SSE stream
│   └── weather/          # Weather widget & forecast
├── hooks/                # Shared hooks
├── i18n/                 # Translations (en, tc, sc)
├── pages/                # Main, System, Settings pages
└── App.css               # Global styles + responsive grid

electron/
├── main.cjs              # Electron main process
└── preload.cjs           # Secure IPC bridge
```

---

## Tech Stack

- **Frontend:** React 19, Vite, React Router, i18next, date-fns
- **Desktop:** Electron, electron-builder
- **Backend:** .NET 10, ASP.NET Core Minimal API, LibreHardwareMonitorLib, Hardware.Info
- **Weather API:** Hong Kong Observatory Open Data

---

## License

Creative Commons Zero 1.0 Universal
