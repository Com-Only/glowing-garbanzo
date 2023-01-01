process.once("loaded", () => {
    const { contextBridge, ipcRenderer, shell } = require('electron')
    const os = require('os')

    contextBridge.exposeInMainWorld(
        'electron',
        {
            shellOpenPath: (url) => {
                console.log(url)
                shell.openPath(url)
            },
            shellOpenExternal: (url) => {
                console.log(url)
                shell.openExternal(url, {activate: true})
            },
            getCurrentUser: () => {
                return os.userInfo().username;
            }
        }
    )
});
