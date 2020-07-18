const electron = require('electron');

function createWindow() {
  let window = new electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  window.loadFile('index.html');
  window.setMenu(null);
}

electron.app.on('ready', createWindow);