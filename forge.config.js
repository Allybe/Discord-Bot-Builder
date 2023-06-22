module.exports = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "DiscordBotBuilder",
        authors: "Allison",
        description: "An app to build discord bots, without coding!",
        noMSI: false,
        setupExe: "DBBSetup.exe",
        setupMSI: "DBBSetup.msi",
      },
      //One day I'll have a signing certificate ;-;
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          maintainer: "Allison",
          homepage: "https://github.com/Allybe/Discord-Bot-Builder",
        },
      },
    },
    {
      name: "@electron-forge/maker-dmg",
      config: {
        format: "ULFO",
      },
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
  ],
  buildIdentifier: "beta",
};
