const {
  app,
  BrowserWindow,
  screen,
  ipcMain 
} = require('electron')
const path = require('path');
const {
  start
} = require('repl');

function createWindow() {

  var {
    width,
    height
  } = screen.getPrimaryDisplay;

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    webPreferences: {
      height: height,

      width: width,

      nodeIntegration: true,

      nodeIntegrationInWorker: true,

      contextIsolation: false,

      devTools: true


    }
  })

  // Create the start screen window 
  // It's a child to the main window
  const startWindow = new BrowserWindow({
    webPreferences: {

      height: 800,

      width: 600,

      alwaysOnTop: true,

      nodeIntegration: true,

      nodeIntegrationInWorker: true,

      contextIsolation: false,

      devTools: true,

      preload: path.join(__dirname, 'checks.js')

    }
  })


  mainWindow.removeMenu();
  mainWindow.maximize();
  mainWindow.loadFile('src/index.html')

  startWindow.loadFile('src/startScreen.html')
  startWindow.moveTop();
}


app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

//Start Code ^^^

//IPC Options Code
function createOptions() {





}