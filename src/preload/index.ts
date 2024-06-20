import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { getAllSales } from './Database/Sales/Sales'
import { Products } from './Database/Sales/Products'

const api = {
  getAllSales,
  Products
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    console.log('Running in isolated')
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  console.log('Running without isolated')
  // @ts-ignore (define in dts)
  window.electron = electronAPI

  // @ts-ignore (define in dts)
  window.api = api
}
