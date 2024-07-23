import { BotSettings } from "./scripts/interfaces/botSettings";

import { contextBridge, ipcRenderer } from "electron/renderer";

type api = {
  createDiscordBot: (settings: BotSettings) => void;
  changePage: (page: string) => void;
};

const api: api = {
  createDiscordBot: (settings: BotSettings) =>
    ipcRenderer.send("createBot", settings),
  changePage: (page: string) => ipcRenderer.send("changePage", page),
};

contextBridge.exposeInMainWorld("api", api);

declare global {
  interface Window {
    api: api;
  }
}