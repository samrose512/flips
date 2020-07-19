const electron = require('electron');
const { dialog, app, Menu } = require('electron');

function createWindow() {
  let window = new electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    icon: './icon.png'
  });

  let menu = Menu.buildFromTemplate([
    {
      "label": "File",
      "submenu": [
        {"label": "Open...",
      click() {
        //window.webContents.send('open-file');
        dialog.showMessageBox(null, { type: "info", buttons: ["OK"], title: "Open", message: "Open file placeholder", icon: "./icon.png"} );
      }},
        {"label": "Close",
      click() {
        window.close();
      }}
      ]
    },
    {
      "label": "Help",
      "submenu": [
        {"label": "About",
      click() {
        //window.webContents.send('show-about');
        dialog.showMessageBox(null, { type: "info", buttons: ["OK"], title: "About", message: "About program placeholder", icon: "./icon.png"} );
      }}
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);

  window.loadFile('index.html');
}

electron.app.on('ready', createWindow);