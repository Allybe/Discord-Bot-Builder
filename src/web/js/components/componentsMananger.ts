import fs = require("fs");
import IComponent = require("../interfaces/component.js");
import path = require("path");

export default class ComponentsManager {
  //because the world needed another component manager
  componentsCollection: Map<String, IComponent.Component> = new Map<string, any>();

  constructor(componentsCollection: string) {
    var botDirPath = path.join(
      __dirname,
      `../../dist/web/js/components/${componentsCollection}`
    );

    fs.readdirSync(botDirPath).forEach((file: string) => {
      var componentName = file.split(".")[0];
      var componentPath = path.join(
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
    var component: IComponent.Component = this.componentsCollection.get(componentName);
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
