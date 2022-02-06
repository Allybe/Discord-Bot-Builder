const {
  ipcRenderer
} = require('electron');
const fs = require('fs');

window.onload = () => {

  document.getElementById('submitData').addEventListener('click', () => {

    let name = document.getElementById('botName').value;
    let token = document.getElementById('botToken').value;
    let prefix = document.getElementById('botPrefix').value;


    if (name === "") {
      return ipcRenderer.send('dialog:error', "You need to fill the name field!");
    }
    if (token === "") {
      return ipcRenderer.send('dialog:error', "You need to fill the token field!");
    }
    if (prefix === "") {
      return ipcRenderer.send('dialog:error', "You need to fill the prefix field!")
    }


    let configData =
      `{
    "name": "${name}",
    "token": "${token}",
    "prefix": "${prefix}"

        }`;


    fs.mkdir(`./projects/${name}`, (err) => {
      if (err) {
        return console.log(err);
      } else {
        console.log(`Created ${name} directory successfully`)
      }
    });

    fs.writeFile(`./projects/${name}/config.json`, configData, (err) => {

      console.log(err);

    });


  });

}