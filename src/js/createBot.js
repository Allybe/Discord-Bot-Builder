const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

window.onclick = () => {

  document.getElementById('submitData').addEventListener('click', () => {

    let name = document.getElementById('botName').value;
    let token = document.getElementById('botToken').value;
    let prefix = document.getElementById('botPrefix').value;


    //Fix this code later
    //if(name, token, prefix === "") {

     //   return ipcRenderer.send('dialog:error', "A name is needed to create a bot!")

    //}


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

    })


  })

}