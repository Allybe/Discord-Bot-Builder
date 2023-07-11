import { existsSync, readdirSync } from "fs";
import { Command } from "../../interfaces/component.js";
import { join } from "path";
export const component: Command = {
  targetId: "recents",
  elementType: "button",
  data: () => {
    var path = join(__dirname, "../../../../bot");
    var dirFiles: string[];
    if (existsSync(path)) {
      dirFiles = readdirSync(path, { withFileTypes: true })
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
