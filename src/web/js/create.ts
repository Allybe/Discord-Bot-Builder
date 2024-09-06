window.onload = () => {
    document.getElementById("createBot").addEventListener("click", () => {
        let settings: any = {
            name: document.getElementById("discordName").innerText,
            token: document.getElementById("discordToken").innerText,
            clientId: document.getElementById("discordClientId").innerText
        }
        window.api.createDiscordBot(settings);
        window.api.changePage("bot");
    });
};