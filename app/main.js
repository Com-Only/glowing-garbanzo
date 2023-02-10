const { app, BrowserWindow, session, screen } = require('electron')
const path = require('path')

require('update-electron-app')({
    repo: 'Com-Only/glowing-garbanzo',
    updateInterval: '1 hour',
    logger: require('electron-log')
})

const createWindow = () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const win = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        },
        maximizable: true,
        resizable: false
    })

    win.maximize();
    
    win.loadURL('https://intranet.carreaudutemple.org:65401');
}

if (require('electron-squirrel-startup')) app.quit();

app.whenReady().then(() => {
    
    session.defaultSession.allowNTLMCredentialsForDomains('*');
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})