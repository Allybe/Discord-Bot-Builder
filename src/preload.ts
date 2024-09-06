import DefaultConfigs = require("./scripts/interfaces/botSettings");
import ElectronRender = require("electron/renderer");

type api = {
  createDiscordBot: (settings: DefaultConfigs.BotSettings) => void;
  changePage: (page: string) => void;
};

const api: api = {
  createDiscordBot: (settings: DefaultConfigs.BotSettings) =>
    ElectronRender.ipcRenderer.send("createBot", settings),
  changePage: (page: string) => ElectronRender.ipcRenderer.send("changePage", page),
};

ElectronRender.contextBridge.exposeInMainWorld("api", api);

declare global {
  interface Window {
    api: api;
  }
}