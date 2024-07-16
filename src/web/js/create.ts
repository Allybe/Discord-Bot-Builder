import { BotSettings } from "../../scripts/interfaces/botSettings";

window.onload = () => {
    document.getElementById("createBot").addEventListener("click", () => {
        let settings: BotSettings = {
            name: document.getElementById("discordName").innerText,
            token: document.getElementById("discordToken").innerText,
            clientId: document.getElementById("discordClientId").innerText
        }
        window.api.createDiscordBot(settings);
        window.api.changePage("bot");
    });
};