import {app} from "electron";
import * as fs from "node:fs";

export class Utils {
    public static getBotsPath() {
        return app.getPath('userData') + "/bots";
    }

    public static getAssetsPath() {
        return app.getPath('userData') + "/assets";
    }

    public static getTempPath() {
        return app.getPath('temp');
    }

    public static getValidBots(): string[] {
        if (fs.existsSync(this.getBotsPath())) {
            return fs.readdirSync(this.getBotsPath(), {withFileTypes: true})
                .filter((dirent) => dirent.isDirectory())
                .map((dirent) => dirent.name);
        }

        return [];
    }
}