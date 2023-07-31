import { ipcRenderer } from 'electron'
import request from 'electron-request'

const SecurityKey = 'lNjczZn0v4.0'

export const GetPrinters = async () => {
  return await Request({ Endpoint: 'getPrinters' })
}

export const GetPrinterStatus = async () => {
  return await Request({ Endpoint: 'getPrinterStatus' })
}

interface RequestParams {
  Endpoint: string
  RequestData?: {
    securityKey?: string
  }
}

const Request = async ({ Endpoint, RequestData = {} }: RequestParams) => {
  RequestData.securityKey = SecurityKey

  const result = await ipcRenderer.invoke('mpcRequest', Endpoint)
}
