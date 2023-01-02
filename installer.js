const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'out')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'cdt-app-win32-ia32/'),
    authors: 'Le Carreau du Temple',
    noMsi: false,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'cdt-app.exe',
    setupExe: 'cdt-app-installer.exe',
    setupIcon: path.join(rootPath, 'assets', 'icons', 'icon.ico')
  })
}
