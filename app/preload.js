process.once("loaded", () => {
    const { contextBridge, shell, ipcRenderer } = require('electron')
    const os = require('os')

    contextBridge.exposeInMainWorld(
        'electron',
        {
            shellOpenPath: (url) => {
                console.log(url)
                if (process.platform === 'win32') {
                    shell.openPath(url)
                } else {
                    // replace backslashes with forward slashes
                    url = url.replace(/\\/g, '/')

                    // prefix with smb://
                    url = 'smb:' + url
                    shell.openExternal(url)
                }
            },
            shellOpenExternal: (url) => {
                // check if platform is windows
                if (process.platform === 'win32') {
                    // remove focus on Electron window
                    ipcRenderer.send('blur-window')

                    shell.openExternal(url)
                } else {
                    // open url or file path
                    shell.openExternal(url, {activate: true})
                }
            },
            getCurrentUser: () => {
                return os.userInfo().username;
            }
        }
    )
});
