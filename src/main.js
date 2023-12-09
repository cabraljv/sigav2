// João Victor Cabral - 202135027

const { app, BrowserWindow } = require('electron');
try {
  require('electron-reloader')(module)
} catch (_) {}

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
    });

    win.loadFile('public/login.html');
}

app.whenReady().then(createWindow);
