import fs = require("fs");
import IComponent =  require("../../interfaces/component.js");
import path = require("path");

export const recentsComponent: IComponent.Component = {
  targetId: "recents",
  elementType: "button",
  data: () => {
    let botPath = path.join(__dirname, "../../../../bot");
    let dirFiles: string[];
    if (fs.existsSync(botPath)) {
      dirFiles = fs.readdirSync(botPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
    }

    if (dirFiles.length === 0) {
      dirFiles.push("No recent bots found");
    }
    return dirFiles;
  },
  methods: {
    onclick: function () {
      console.log("Recents clicked");
    },
  },
};
