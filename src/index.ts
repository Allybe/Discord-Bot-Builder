const { app, BrowserWindow } = require('electron');

if (require('electron-squirrel-startup')) app.quit();

function createWindow() {
    const { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize;

    const win = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            webSecurity: false,
            nodeIntegrationInWorker: true,
        },
    });

    win.loadFile('src/web/index.html');
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
