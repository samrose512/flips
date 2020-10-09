const electron = require('electron');
const { dialog, app, Menu } = require('electron');
const path = require('path');

const transparentBackground = false;
const iconPath = path.resolve(__dirname, 'Images', 'icon.png');

function createWindow() {
    let window = new electron.BrowserWindow({
        width: 800,
        height: 600,
        transparent: transparentBackground,
        webPreferences: {
            nodeIntegration: true
        },
        icon: iconPath
    });

    let menu = Menu.buildFromTemplate([
        {
            "label": "File",
            "submenu": [
                {
                    "label": "Open...",
                    click() {
                        //window.webContents.send('open-file');
                        dialog.showMessageBox(
                            null,
                            {
                                type: "info",
                                buttons: ["OK"],
                                title: "Open",
                                message: "Open file placeholder",
                                icon: iconPath
                            }
                        );
                    }
                },
                {
                    "label": "Close",
                    click() {
                        window.close();
                    }
                }
            ]
        },
        {
            "label": "Debug",
            "submenu": [
                {
                    "label": "DevTools",
                    click() {
                        window.webContents.toggleDevTools();
                    }
                },
                {
                    "label": "Reload",
                    click() {
                        window.reload();
                    }
                }
            ]
        },
        {
            "label": "Help",
            "submenu": [
                {
                    "label": "About",
                    click() {
                        //window.webContents.send('show-about');
                        dialog.showMessageBox(
                            null,
                            {
                                type: "info",
                                buttons: ["OK"],
                                title: "About",
                                message: "About program placeholder",
                                icon: iconPath
                            }
                        );
                    }
                }
            ]
        }
    ]);
    Menu.setApplicationMenu(menu);

    window.loadFile('index.html');
}

if (transparentBackground) {
    electron.app.on('ready',
        () => setTimeout(createWindow, 250)
    );
}
else {
    electron.app.on('ready', createWindow);
}
