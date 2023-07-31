const SecurityKey = 'lNjczZn0v4.0'
let PrinterName = ''

export const SetPrinterName = (PrinterNewName) => {
  PrinterName = PrinterNewName
}

export const LoadFirstPrinter = async () => {
  const MPCPrinters = await Request({ Endpoint: 'getPrinters' })

  PrinterName = MPCPrinters.data[0]

  return PrinterName
}

export const GetPrinters = async () => {
  return await Request({ Endpoint: 'getPrinters' })
}

export const GetPrinterStatus = async () => {
  return await Request({ Endpoint: 'getPrinterStatus' })
}

export const Print = async (Data) => {
  let RequestData = {
    printer: PrinterName,
    job: [
      {
        op: 'settings',
        data: {
          normalLineWidth: 48,
          condensed: 48,
          condensedLineWidth: 64,
          dotWidth: 576,
          hasCutter: true,
          hasDrawer: true,
          lowDensity: false,
          imagePrintMode: '0',
          alternativeCharset: false,
          replaceAccentedChars: false,
          continuousPrint: true,
          copies: 1
        }
      }
    ]
  }

  RequestData.job.push({
    op: 'text',
    data: 'Testes Moloni\n'
  })

  return await Request({
    Endpoint: 'sendJob',
    RequestData: RequestData
  })
}

interface RequestParams {
  Endpoint: string
  RequestData?: {
    securityKey?: string
  }
}

const Request = async ({ Endpoint, RequestData = {} }: RequestParams) => {
  try {
    RequestData.securityKey = SecurityKey

    const result = await window.fetch('https://localhost:5080/' + Endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(RequestData)
    })

    return await result.json()
  } catch (error) {
    console.error('Error:', error)
  }
}
