const { contextBridge, ipcRenderer } = require('electron');

/**
 * Expose a minimal API to the renderer process.
 * When running inside Electron, the frontend uses these values
 * instead of the VITE_ env vars (which are meant for GitHub Pages).
 *
 * The --embedded flag on the .NET API skips ApiKeyMiddleware,
 * so the apiKey here is only passed to satisfy the query param.
 */
contextBridge.exposeInMainWorld('electronAPI', {
  systemMonitorApi: {
    baseUrl: 'http://localhost:5000',
    apiKey: 'embedded',
  },

  // Display / multi-window management
  getDisplays: () => ipcRenderer.invoke('get-displays'),
  createWindow: (page, displayIndex) => ipcRenderer.send('create-window', page, displayIndex),
  closeCurrentWindow: () => ipcRenderer.send('close-current-window'),
});
