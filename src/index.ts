import { app, BrowserWindow, ipcMain, screen } from 'electron';
import * as path from 'path';

if (require('electron-squirrel-startup')) app.quit();

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize

    const win = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
        }
    })

    win.loadFile('src/web/index.html');
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
