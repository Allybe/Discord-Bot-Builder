import { existsSync, fsync, mkdirSync } from "fs";
import path = require("path");

const { app, BrowserWindow } = require('electron');

if (require('electron-squirrel-startup')) app.quit();

function createWindow() {
    const { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize;

    const win = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            webSecurity: false,
            nodeIntegrationInWorker: true,
        },
    });

    win.loadFile('src/web/index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    });

    if (!existsSync(path.join(__dirname, './bot'))) {
        mkdirSync(path.join(__dirname, './bot'));
        console.log("Bot folder created");
    }
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})