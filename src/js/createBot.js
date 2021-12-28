const fs = require('fs');
const path = require('path');

 function createBot(projectName) {

  fs.mkdir(`./projects/${projectName}`, (err) => {
    if (err) {
      return console.log(err);
    } else {
      console.log(`Created ${projectName} directory successfully`)
    }
  });
}