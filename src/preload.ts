
import ElectronRender = require("electron/renderer");
import { BotSettings } from "./scripts/interfaces/botSettings";

type api = {
  createDiscordBot: (settings: BotSettings) => void;
  changePage: (page: string) => void;
};

const api: api = {
  createDiscordBot: (settings: BotSettings) =>
    ElectronRender.ipcRenderer.send("createBot", settings),
  changePage: (page: string) => ElectronRender.ipcRenderer.send("changePage", page),
};

ElectronRender.contextBridge.exposeInMainWorld("api", api);

declare global {
  interface Window {
    api: api;
  }
}