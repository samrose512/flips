const electron = require('electron');
const { dialog, app, Menu } = require('electron');

const transparentBackground = false;

function createWindow() {
    let window = new electron.BrowserWindow({
        width: 800,
        height: 600,
        transparent: transparentBackground,
        webPreferences: {
            nodeIntegration: true
        },
        icon: './Images/icon.png'
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
                                icon: "./Images/icon.png"
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
                                icon: "./Images/icon.png"
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
