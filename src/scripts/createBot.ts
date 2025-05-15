import DefaultConfigs = require("./interfaces/botSettings");
import { app } from 'electron';
import unzipper = require("unzipper");
import download = require("download");
import fs = require("fs");
import path = require("path");
import ncp = require('ncp');
import {Utils} from "./utils";

const url = 'https://github.com/Allybe/DBB-BotScripts/releases/latest/download/distribution.zip';

export const createBot = (settings: DefaultConfigs.BotSettings ) => {
    console.log("Download starting");

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
    console.log(destDir.toString())

    if (!fs.existsSync(destDir)){
        console.log("Creating directory");
        fs.mkdirSync(destDir, { recursive: true });
    }

    ncp(srcDir, destDir, (err) => {
        if (err) {
            return console.error(err);
        }
        // NCP ALLOWS CALLBACK TO RUN EVEN WITHOUT FINISHING, DELAY FOR MAKING SURE WE COPY EVERYTHING
        setTimeout(() =>{
            console.log('Copied directory!');
            createConfigFile(settings);
        }, 1000);
    });
};

const createConfigFile = (settings: DefaultConfigs.BotSettings) => { 
    let config = {
        name: settings.name,
        token: settings.token,
        clientId: settings.clientId
    }
    fs.writeFileSync(path.join(Utils.getBotsPath(), settings.name, "config.json"), JSON.stringify(config));
};