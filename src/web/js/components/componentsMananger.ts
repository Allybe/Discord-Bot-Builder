import { Command } from "../interfaces/component";

const fs = require('fs');
const path = require('path');

export default class ComponentsManager {

    componentsCollection:Map<String, Command> = new Map<string, any>();

    constructor(componentsCollection: string) {
        var botDirPath = path.join(__dirname, `../../dist/web/js/components/${componentsCollection}`);
        
        fs.readdir(botDirPath, (err: Error, files) => {
            if (err) throw err;
            
            files.forEach((file: string) => {
                var componentName = file.split('.')[0];
                var componentPath = path.join(__dirname, `../../dist/web/js/components/${componentsCollection}/${file}`);
                var component = require(componentPath);
                this.componentsCollection.set(componentName, component);
            });
        });
    }

    loadComponent(componentName: string) {

    }
}