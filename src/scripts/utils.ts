import { app } from "electron";

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

    public static getValidBots() {

    }
}