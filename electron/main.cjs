const { app, BrowserWindow, screen, Tray, Menu, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');

const isDev = !app.isPackaged;
let tray = null;
let backendProcess = null;

// Track all open windows
const allWindows = [];

/* ───────────────────────── Backend ───────────────────────── */

function findBackendExe() {
  const prodPath = path.join(process.resourcesPath, 'api', 'System Monitor API v2.exe');
  if (fs.existsSync(prodPath)) return prodPath;

  const candidates = [
    path.join(__dirname, '..', '..', 'system-monitor-api-v2', 'bin', 'Release', 'net10.0', 'win-x64', 'publish', 'System Monitor API v2.exe'),
    path.join(__dirname, '..', '..', 'system-monitor-api-v2', 'bin', 'Debug', 'net10.0', 'win-x64', 'publish', 'System Monitor API v2.exe'),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }

  return null;
}

function isBackendRunning() {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:5000/api/metrics', (res) => {
      resolve(res.statusCode === 200 || res.statusCode === 503);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(500, () => { req.destroy(); resolve(false); });
  });
}

async function startBackend() {
  if (await isBackendRunning()) {
    console.log('[Electron] Backend already running on port 5000.');
    return;
  }

  const exePath = findBackendExe();
  if (!exePath) {
    console.log('[Electron] Backend exe not found. Please start it manually (dotnet run --urls http://localhost:5000).');
    return;
  }

  console.log('[Electron] Starting backend:', exePath);
  backendProcess = spawn(exePath, ['--embedded'], {
    windowsHide: true,
    cwd: path.dirname(exePath),
  });

  backendProcess.stdout?.on('data', (data) => {
    console.log(`[Backend] ${data.toString().trim()}`);
  });

  backendProcess.stderr?.on('data', (data) => {
    console.error(`[Backend] ${data.toString().trim()}`);
  });

  backendProcess.on('error', (err) => {
    console.error('[Electron] Backend failed to start:', err);
  });

  backendProcess.on('exit', (code) => {
    console.log('[Electron] Backend exited with code', code);
    backendProcess = null;
  });

  // Wait up to 10 seconds for the backend to be ready before opening windows
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 500));
    if (await isBackendRunning()) {
      console.log('[Electron] Backend is ready.');
      return;
    }
  }
  console.warn('[Electron] Backend did not become ready within 10 seconds.');
}

function stopBackend() {
  if (backendProcess) {
    console.log('[Electron] Stopping backend...');
    backendProcess.kill();
    backendProcess = null;
  }
}

/* ───────────────────────── Display Helpers ───────────────────────── */

function getDisplays() {
  return screen.getAllDisplays().map((d, i) => ({
    index: i,
    label: `Display ${i + 1} (${d.bounds.width}×${d.bounds.height})`,
    bounds: d.bounds,
    primary: d.id === screen.getPrimaryDisplay().id,
  }));
}

function getDisplay(index) {
  const displays = screen.getAllDisplays();
  return displays[index] || displays[0] || screen.getPrimaryDisplay();
}

/* ───────────────────────── Menu Builders ───────────────────────── */

function buildMonitorSubmenu(page) {
  const displays = screen.getAllDisplays();
  return displays.map((d, i) => ({
    label: `Display ${i + 1}  ${d.bounds.width}×${d.bounds.height}${d.id === screen.getPrimaryDisplay().id ? '  (Primary)' : ''}`,
    click: () => createWindow(page, i),
  }));
}

function buildContextMenu(win) {
  return Menu.buildFromTemplate([
    {
      label: win.isMaximized() ? 'Exit Fullscreen' : 'Enter Fullscreen',
      click: () => toggleFullscreen(win),
    },
    { type: 'separator' },
    {
      label: 'Open Main',
      submenu: buildMonitorSubmenu('main'),
    },
    {
      label: 'Open System',
      submenu: buildMonitorSubmenu('system'),
    },
    {
      label: 'Open Settings',
      submenu: buildMonitorSubmenu('settings'),
    },
    { type: 'separator' },
    {
      label: 'Move to Display',
      submenu: screen.getAllDisplays().map((d, i) => ({
        label: `Display ${i + 1}`,
        click: () => win.setBounds(d.bounds),
      })),
    },
    { type: 'separator' },
    {
      label: 'Reload',
      click: () => win.reload(),
    },
    {
      label: 'Close',
      click: () => win.close(),
    },
  ]);
}

/* ───────────────────────── Window Management ───────────────────────── */

function toggleFullscreen(win) {
  if (win.isMaximized()) {
    // Restore to portrait widget size centered on current display
    const currentBounds = win.getBounds();
    const displays = screen.getAllDisplays();
    const currentDisplay = displays.find((d) => {
      const cx = currentBounds.x + currentBounds.width / 2;
      const cy = currentBounds.y + currentBounds.height / 2;
      return cx >= d.bounds.x && cx <= d.bounds.x + d.bounds.width &&
             cy >= d.bounds.y && cy <= d.bounds.y + d.bounds.height;
    }) || screen.getPrimaryDisplay();

    const PORTRAIT_WIDTH = 540;
    const PORTRAIT_HEIGHT = 960;
    const cx = currentDisplay.bounds.x + currentDisplay.bounds.width / 2;
    const cy = currentDisplay.bounds.y + currentDisplay.bounds.height / 2;

    win.setBounds({
      x: Math.round(cx - PORTRAIT_WIDTH / 2),
      y: Math.round(cy - PORTRAIT_HEIGHT / 2),
      width: PORTRAIT_WIDTH,
      height: PORTRAIT_HEIGHT,
    });
    win.setMaximizable(true);
  } else {
    // Fill the current display
    const currentBounds = win.getBounds();
    const displays = screen.getAllDisplays();
    const currentDisplay = displays.find((d) => {
      const cx = currentBounds.x + currentBounds.width / 2;
      const cy = currentBounds.y + currentBounds.height / 2;
      return cx >= d.bounds.x && cx <= d.bounds.x + d.bounds.width &&
             cy >= d.bounds.y && cy <= d.bounds.y + d.bounds.height;
    }) || screen.getPrimaryDisplay();

    win.setBounds(currentDisplay.bounds);
  }
}

function createWindow(page = 'main', displayIndex = 0, options = {}) {
  const target = getDisplay(displayIndex);
  const hashRoute = page === 'main' ? '' : page;
  const shouldFillDisplay = options.fullscreen !== false;

  const win = new BrowserWindow({
    x: target.bounds.x,
    y: target.bounds.y,
    width: shouldFillDisplay ? target.bounds.width : (options.width || 540),
    height: shouldFillDisplay ? target.bounds.height : (options.height || 960),
    frame: false,
    fullscreen: false,
    transparent: true,
    backgroundColor: '#00000000',
    hasShadow: false,
    resizable: true,
    movable: true,
    skipTaskbar: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  // Ensure the window exactly fills the target display when requested
  if (shouldFillDisplay) {
    win.setBounds(target.bounds);
  }

  // Load route
  const filePath = path.join(__dirname, '..', 'dist', 'index.html');
  if (isDev) {
    const devUrl = `http://localhost:5173/#/${hashRoute}`;
    const req = http.get(devUrl, () => {
      win.loadURL(devUrl);
      win.webContents.openDevTools({ mode: 'detach' });
    });
    req.on('error', () => {
      win.loadFile(filePath, { hash: hashRoute });
    });
    req.setTimeout(1000, () => { req.destroy(); });
  } else {
    win.loadFile(filePath, { hash: hashRoute });
  }

  // Right-click context menu
  win.webContents.on('context-menu', (_event, params) => {
    buildContextMenu(win).popup({ x: params.x, y: params.y });
  });

  // Keyboard shortcuts
  win.webContents.on('before-input-event', (_event, input) => {
    if (input.key === 'F11') {
      toggleFullscreen(win);
    }
    if (input.key === 'F5' && !input.control && !input.shift) {
      win.reload();
    }
  });

  allWindows.push({ id: win.id, page, displayIndex, win });

  win.on('closed', () => {
    const idx = allWindows.findIndex((w) => w.id === win.id);
    if (idx !== -1) allWindows.splice(idx, 1);
  });

  return win;
}

/* ───────────────────────── Tray ───────────────────────── */

function createTray() {
  const { nativeImage } = require('electron');
  let trayIcon = null;

  const candidates = [
    path.join(__dirname, '..', 'public', 'tray-icon.ico'),
    path.join(__dirname, '..', 'dist', 'tray-icon.ico'),
  ];

  for (const icoPath of candidates) {
    try {
      if (fs.existsSync(icoPath)) {
        trayIcon = nativeImage.createFromPath(icoPath);
        if (!trayIcon.isEmpty()) break;
      }
    } catch {
      trayIcon = null;
    }
  }

  tray = new Tray(trayIcon || nativeImage.createEmpty());

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open Main',
      submenu: buildMonitorSubmenu('main'),
    },
    {
      label: 'Open System',
      submenu: buildMonitorSubmenu('system'),
    },
    {
      label: 'Open Settings',
      submenu: buildMonitorSubmenu('settings'),
    },
    { type: 'separator' },
    {
      label: 'Close All Windows',
      click: () => {
        [...allWindows].forEach((w) => {
          if (w.win && !w.win.isDestroyed()) w.win.destroy();
        });
      },
    },
    {
      label: 'Quit',
      click: () => {
        [...allWindows].forEach((w) => {
          if (w.win && !w.win.isDestroyed()) w.win.destroy();
        });
        stopBackend();
        app.quit();
      },
    },
  ]);

  tray.setToolTip('System Monitor');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    createWindow('main', 0);
  });
}

/* ───────────────────────── IPC ───────────────────────── */

ipcMain.handle('get-displays', () => getDisplays());

ipcMain.on('create-window', (_event, page, displayIndex) => {
  createWindow(page, displayIndex);
});

ipcMain.on('close-current-window', (event) => {
  const w = BrowserWindow.fromWebContents(event.sender);
  if (w) w.close();
});

/* ───────────────────────── App Lifecycle ───────────────────────── */

app.whenReady().then(async () => {
  try {
    await startBackend();
  } catch (err) {
    console.error('[Electron] Backend startup failed, continuing without it:', err);
  }

  try {
    createTray();
  } catch (err) {
    console.error('[Electron] Tray creation failed:', err);
  }

  // Always open a window on first launch so the user sees something
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow('main', 0);
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow('main', 0);
    }
  });
}).catch((err) => {
  console.error('[Electron] App failed to start:', err);
});

app.on('window-all-closed', () => {
  // Keep running in tray; quit explicitly via tray menu
});

app.on('before-quit', () => {
  stopBackend();
});
