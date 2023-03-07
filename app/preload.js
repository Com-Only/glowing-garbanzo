process.once("loaded", () => {
    const { contextBridge, shell, ipcRenderer } = require('electron')
    const os = require('os')

    contextBridge.exposeInMainWorld(
        'electron',
        {
            shellOpenPath: (url) => {
                console.log(url)
                shell.openPath(url)
            },
            shellOpenExternal: (url) => {
                // remove focus on Electron window
                ipcRenderer.send('blur-window')

                // open url or file path
                shell.openExternal(url, {activate: true})
            },
            getCurrentUser: () => {
                return os.userInfo().username;
            }
        }
    )
});
