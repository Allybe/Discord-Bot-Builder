import fs = require("fs");
import path =  require("path");
import electronMain = require("electron");
import DefaultConfigs = require("./scripts/interfaces/botSettings");
import BotCreation = require("./scripts/createBot");

if (require('electron-squirrel-startup')) electronMain.app.quit();

function createWindow() {
    const { width, height } = electronMain.screen.getPrimaryDisplay().workAreaSize;

    const win = new electronMain.BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
          }
    });

    win.loadFile('src/web/index.html');
}

electronMain.app.whenReady().then(() => {
    createWindow();

    electronMain.app.on('activate', () => {
        if (electronMain.BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    });

    if (!fs.existsSync(path.join(__dirname, './bot'))) {
        fs.mkdirSync(path.join(__dirname, './bot'));
        console.log("Bot folder created");
    }
    if (!fs.existsSync(path.join(__dirname, './asset'))) {
        fs.mkdirSync(path.join(__dirname, './asset'));
        console.log("Assets folder created");
    }
})

electronMain.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electronMain.app.quit()
    }
})

//IPC

electronMain.ipcMain.on("createBot", (event, args: DefaultConfigs.BotSettings) => {
    BotCreation.createBot(args);
});

electronMain.ipcMain.on("changePage", (event, args: string) => {
    console.log("Changing page to " + args);
    //TODO: gotta make sure this doesn't cause an include exploit thingy
    event.sender.loadFile('src/web/pages/' + args + '.html');
});

