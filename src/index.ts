import fs = require("fs");
import path =  require("path");
import electronMain = require("electron");
import DefaultConfigs = require("./scripts/interfaces/botSettings");
import BotManagement = require("./scripts/createBot");
import pm2 = require("pm2");
import {BotSettings} from "./scripts/interfaces/botSettings";
import {Utils} from "./scripts/utils";

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

    if (!fs.existsSync(Utils.getBotsPath())) {
        fs.mkdirSync(Utils.getBotsPath());
        console.log("Bot folder created");
    }
    if (!fs.existsSync(Utils.getAssetsPath())) {
        fs.mkdirSync(Utils.getAssetsPath());
        console.log("Assets folder created");
    }
})

electronMain.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electronMain.app.quit()
    }
})

pm2.connect((err) => {
    if (err) {
        console.log(err);
        //TODO: Research error logging libs
    }
})

//IPC

electronMain.ipcMain.on("createBot", (event, args: DefaultConfigs.BotSettings) => {
    console.log(args)
    BotManagement.createBot(args);
});

// electronMain.ipcMain.on("changePage", (event, args: string) => {
//     console.log("Changing page to " + args);
//     event.sender.loadFile('src/web/pages/' + args + '.html');
// });

electronMain.ipcMain.on("changeToBotManagementPage", (event, args: string) => {

})

electronMain.ipcMain.on("startBot", (event, args: BotSettings) => {
    pm2.connect(function(err) {
        if (err) {
            console.error(err);
            return;
        }

        let botPath = path.join(Utils.getBotsPath(), args.name);

        pm2.start({
            script: '',
            name: args.name,
        }, function (err, result) {
            if (err) {
                console.error(err);
                return pm2.disconnect();
            }
        })
    })
})

