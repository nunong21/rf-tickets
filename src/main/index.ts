import { app, BrowserWindow, shell, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import sqlite from 'sqlite-electron'
import fs from 'fs'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    show: true,
    title: 'RF-Ticket',
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: false
    },
    fullscreenable: true,
    icon: icon
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.commandLine.appendSwitch('ignore-certificate-errors')

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

ipcMain.handle('LoadDatabase', async () => {
  try {
    const FullPath = getDatabasePath()
    console.log(`Creating DB @ ${FullPath}`)
    return await sqlite.setdbPath(FullPath)
  } catch (error) {
    return true
  }
})

ipcMain.handle('ExecuteQuery', async (_event, query, values) => {
  return await sqlite.executeQuery(query, values)
})

ipcMain.handle('executeMany', async (_event, query, values) => {
  return await sqlite.executeMany(query, values)
})

ipcMain.handle('executeScript', async (_event, scriptpath) => {
  try {
    return await sqlite.executeScript(scriptpath)
  } catch (error) {
    return error
  }
})

ipcMain.handle('SaveSale', async (_event, data) => {
  const FullPath = join(app.getPath('userData'), '/resources/db.csv')

  if (!fs.existsSync(FullPath)) {
    console.log('create')
    await fs.writeFileSync(FullPath, '', { flag: 'wx' })
  } else {
    console.log('File exists')
  }

  const currentDate = new Date()

  data.push(currentDate)
  const dataString = '"' + data.join('","') + '"\n'
  await fs.appendFileSync(FullPath, dataString)
})

const getDatabasePath = () => {
  const dbPath = is.dev
    ? join(__dirname, '../..', 'resources/database', 'RFTicketsMain.db')
    : join(app.getPath('userData'), 'RetroPOS.db')

  return dbPath
}
