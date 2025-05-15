import ElectronRender = require("electron/renderer");
import { BotSettings } from "./scripts/interfaces/botSettings";

type api = {
  createDiscordBot: (settings: BotSettings) => void;
  changeToBotManagementPage: (botName: string) => void;
  startBot: (botName: string) => void;
};

const api: api = {
  createDiscordBot: (settings: BotSettings) =>
    ElectronRender.ipcRenderer.send("createBot", settings),
  changeToBotManagementPage: (botName: string) =>
    ElectronRender.ipcRenderer.send("changeToBotManagementPage", botName),
  startBot: (botName: string) =>
    ElectronRender.ipcRenderer.send("startBot", botName),
};

ElectronRender.contextBridge.exposeInMainWorld("api", api);

declare global {
  interface Window {
    api: api;
  }
}