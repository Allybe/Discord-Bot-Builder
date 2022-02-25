const {
    ipcRenderer
  } = require('electron');
  const fs = require('fs');
  const $ = require('jquery');
  
  window.onload = () => {
  
    $("#newBot").click(() => {
      $(".newBotForm").show();
    });
  
    //Creates a new directory with the bot infomation
    $("#submitData").click(() => {

        let input = [`${$("#botName").val()}`, `${$('#botToken').val()}`, `${$('#botPrefix').val()}`]

        //Checks for invalid bot data
        for (i = 0; i < input.length; i++) {
          if (input[i] == "") {
            return ipcRenderer.send("dialog:error", "You need to fill out each field");
          } 
        } 

      let configData = JSON.stringify(input);
  
      fs.mkdir(`./projects/${input[0]}`, (err) => {
        if (err) {
          return console.log(err);
        } else {
          console.log(`Created ${input[0]} directory successfully`)
        }
      });
  
      fs.writeFile(`./projects/${input[0]}/config.json`, configData, (err) => {
  
        console.log(err);
  
      });
  
    });
  
  }