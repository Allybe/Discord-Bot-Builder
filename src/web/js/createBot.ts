const unzipper = require('unzipper');
const download = require("download");
const fs = require("fs");
const path = require("path");
const ncp = require('ncp').ncp;
const url = 'https://github.com/Allybe/DBB-BotScripts/releases/latest/download/distribution.zip';
const filePath = __dirname + "../../../../dist/asset/";

ncp.limit = 16;

onload = () => {
    var button = document.getElementById("createBot");

    button.onclick = () => {
        console.log("Download starting");

        download(url, filePath)
            .then(() => {
                console.log('Download Completed, unzipping');
                unzipFile(filePath + "distribution.zip");
            });
    };
};

const unzipFile = (filePath) => {
    fs.createReadStream(filePath)
        .pipe(unzipper.Extract({ path: './dist/asset/' }))
        .on('finish', () => {
            console.log('File unzipped successfully.');
            // Optionally, you can delete the original ZIP file
            fs.unlinkSync(filePath);

            copyScripts("testBot");
        })
        .on('error', (err) => {
            console.error('Error occurred while unzipping the file:', err);
        });
};

const copyScripts = (folderName) => {
    let srcDir = path.join(__dirname, "../../../dist/asset");
    let destDir = path.join(__dirname, "../../../dist/bot/", folderName);

    // Check if destination directory exists, if not, create it
    if (!fs.existsSync(destDir)){
        fs.mkdirSync(destDir, { recursive: true });
    }

    ncp(srcDir, destDir, (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('Copied directory!');
    });
};
