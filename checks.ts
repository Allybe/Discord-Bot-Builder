const fs = require('fs');

//Checks if the directory that caches are stored in exists
fs.access("./cache", function(error) {
  
  if (error) {
    console.log("The cache directory doesn't exist! Trying to create...");

    //Creates the directory if it doesn't exist
    fs.mkdir('./cache', (err) => {
      if (err) {
        return console.log(err);
      } else {
        console.log("Cache directory successfully created!");
      }
    })

  } else {
    console.log("Cache directory exists!");
  }
})

//Checks if the directory that projects are stored in exists
fs.access("./projects", function (error) {

  if (error) {
    console.log("Project directory doesn't exist! Trying to create...")

    //Creates the directory if it doesn't exist
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
});