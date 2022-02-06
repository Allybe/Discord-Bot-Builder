const fs = require('fs');

//Checks if the directory that projects are stored in exists
fs.access("./projects", function (error) {

  if (error) {
    console.log("Project directory doesn't exists! Trying to create...")

    //Creates the directory if it doesn't exists
    fs.mkdir('./projects', (err) => {
      if (err) {
        return console.log(err);
      } else {
        console.log("Project directory successfully created!")
      }
    })

  } else {
    console.log("Project directory exists!")
  }
})