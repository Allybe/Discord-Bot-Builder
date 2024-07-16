import { BotSettings } from "./interfaces/botSettings";

import unzipper from "unzipper";
import download from "download";
import fs from "fs";
import path from "path";
import ncp from 'ncp';

const url = 'https://github.com/Allybe/DBB-BotScripts/releases/latest/download/distribution.zip';
const filePath = __dirname + "../../../../dist/asset/";

export const createBot = (settings: BotSettings ) => {
    console.log("Download starting");

    download(url, filePath)
        .then(() => {
            console.log('Download Completed, unzipping');
            unzipFile(filePath + "distribution.zip", settings);
        });
}

const unzipFile = (filePath, settings: BotSettings) => {
    fs.createReadStream(filePath)
        .pipe(unzipper.Extract({ path: './dist/asset/' }))
        .on('finish', () => {
            console.log('File unzipped successfully.');
            fs.unlinkSync(filePath);
            copyScripts(settings);
        })
        .on('error', (err) => {
            console.error('Error occurred while unzipping the file:', err);
        });
};

const copyScripts = (settings: BotSettings) => {
    let srcDir = path.join(__dirname, "../../../dist/asset");
    let destDir = path.join(__dirname, "../../../dist/bot/", settings.name);

    if (!fs.existsSync(destDir)){
        console.log("Creating directory");
        fs.mkdirSync(destDir, { recursive: true });
    }

    ncp(srcDir, destDir, (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('Copied directory!');
        createConfigFile(settings);
    });
};

const createConfigFile = (settings: BotSettings) => { 
    let config = {
        name: settings.name,
        token: settings.token,
        clientId: settings.clientId
    }
    fs.writeFileSync(__dirname + "../../../dist/bot/" + settings.name + "/config.json", JSON.stringify(config));

    
};