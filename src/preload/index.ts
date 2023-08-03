import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  LoadDatabase: async (): Promise<void> => {
    try {
      const path = 'database/RFTicketsMain.db'
      await ipcRenderer.invoke('LoadDatabase', path)
    } catch (error) {
      console.log(error)
    }
  },
  ExecuteQuery: async (query, values): Promise<void> => {
    try {
      await ipcRenderer.invoke('ExecuteQuery', query, '', values)
    } catch (error) {
      console.log('Error: ' + error)
    }
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
