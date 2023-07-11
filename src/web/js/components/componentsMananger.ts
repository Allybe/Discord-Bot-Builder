import { readdirSync } from "fs";
import { Command } from "../interfaces/component.js";
import { join } from "path";

export default class ComponentsManager {
  componentsCollection: Map<String, Command> = new Map<string, any>();

  constructor(componentsCollection: string) {
    var botDirPath = join(
      __dirname,
      `../../dist/web/js/components/${componentsCollection}`
    );

    readdirSync(botDirPath).forEach((file: string) => {
      var componentName = file.split(".")[0];
      var componentPath = join(
        __dirname,
        `../../dist/web/js/components/${componentsCollection}/${file}`
      );
      var component = require(componentPath);
      this.componentsCollection.set(componentName, component.component);
    });
  }

  loadComponent(componentName: string) {
    if (!this.componentsCollection.has(componentName)) {
      console.log(`Component ${componentName} not found`);
      return;
    }
    var component: Command = this.componentsCollection.get(componentName);
    var data: any[] = component.data();
    var element = document.getElementById(component.targetId);

    for (let i = 0; i < data.length; i++) {
      var newChild: HTMLElement = document.createElement(component.elementType);
      newChild.textContent = data[i];
      newChild.onclick = component.methods.onclick;

      element.appendChild(newChild);
    }
  }
}
