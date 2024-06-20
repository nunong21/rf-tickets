import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { getAllSales } from './Database/Sales/Sales'

const DB = {
  getAllSales
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    console.log('Running in isolated')
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('db', DB)
  } catch (error) {
    console.error(error)
  }
} else {
  console.log('Running without isolated')
  // @ts-ignore (define in dts)
  window.electron = electronAPI

  // @ts-ignore (define in dts)
  window.db = DB
}
