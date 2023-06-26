import * as fs from 'fs';
import * as path from 'path';

var botDirPath = path.join(__dirname, '/bot');

var doesBotDirExists = fs.existsSync(botDirPath);

if (!doesBotDirExists) {
    fs.mkdirSync(botDirPath);
}