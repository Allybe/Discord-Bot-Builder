window.onload = () => {
    document.getElementById("createBot").addEventListener("click", () => {
        let nameInput: HTMLInputElement = document.getElementById("discordName") as HTMLInputElement;
        let tokenInput: HTMLInputElement = document.getElementById("discordToken") as HTMLInputElement;
        let clientIdInput: HTMLInputElement = document.getElementById("discordClientId") as HTMLInputElement;

        let settings = {
            name: nameInput.value,
            token: tokenInput.value,
            clientId: clientIdInput.value,
        }

        window.api.createDiscordBot(settings);
    });
};