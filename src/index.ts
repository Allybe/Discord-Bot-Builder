import { existsSync, mkdirSync } from "fs";
import path from "path";
import { app, BrowserWindow, ipcMain } from 'electron';
import { BotSettings } from "./scripts/interfaces/botSettings";
import { createBot } from "./scripts/createBot"

if (require('electron-squirrel-startup')) app.quit();

function createWindow() {
    const { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize;

    const win = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
          }
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
    if (!existsSync(path.join(__dirname, './asset'))) {
        mkdirSync(path.join(__dirname, './asset'));
        console.log("Assets folder created");
    }
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

//IPC

ipcMain.on("createBot", (event, args: BotSettings) => {
    createBot(args);
});

ipcMain.on("changePage", (event, args: string) => {
    console.log("Changing page to " + args);
    event.sender.loadFile('src/web/' + args + '.html');
});

