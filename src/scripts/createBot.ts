import DefaultConfigs = require("./interfaces/botSettings");
import unzipper = require("unzipper");
import download = require("download");
import fs = require("fs-extra");
import path = require("path");
import {Utils} from "./utils";

const url = 'https://github.com/Allybe/DBB-BotScripts/releases/latest/download/distribution.zip';

export const createBot = (settings: DefaultConfigs.BotSettings ) => {
    console.log("Download starting");

    if (fs.existsSync(Utils.getAssetsPath()) && fs.readdirSync(Utils.getAssetsPath()).length != 0) {
        //TODO: Add version checking for the bot assets
        copyScripts(settings);
        return;
    }

    download(url, Utils.getTempPath())
        .then(() => {
            console.log('Download Completed, unzipping');
            unzipFile(Utils.getTempPath() + "/distribution.zip", settings);
        });
}

const unzipFile = (filePath: string, settings: DefaultConfigs.BotSettings) => {
    fs.createReadStream(filePath)
        .pipe(unzipper.Extract({ path: Utils.getAssetsPath() }))
        .on('finish', () => {
            console.log('File unzipped successfully.');
            fs.unlinkSync(filePath);
            copyScripts(settings);
        })
        .on('error', (err) => {
            console.error('Error occurred while unzipping the file:', err);
        });
};

const copyScripts = (settings: DefaultConfigs.BotSettings) => {
    let srcDir = Utils.getAssetsPath();
    let destDir = path.join(Utils.getBotsPath(), settings.name);

    if (!fs.existsSync(destDir)){
        console.log("Creating directory");
        fs.mkdirSync(destDir, { recursive: true });
    }

    fs.copySync(srcDir, destDir);
    createConfigFile(settings);
};

const createConfigFile = (settings: DefaultConfigs.BotSettings) => { 
    let config = {
        name: settings.name,
        token: settings.token,
        clientId: settings.clientId
    }
    fs.writeFileSync(path.join(Utils.getBotsPath(), settings.name, "config.json"), JSON.stringify(config));
};