const { app, BrowserWindow, session, screen } = require('electron')
const path = require('path')


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
    
    win.loadURL('https://carreaudutemple.virtualonly.immo');
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