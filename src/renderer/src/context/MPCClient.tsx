import { ITMPCTextLine } from '../types/Definitions'

let PrinterName = ''
const Printers: string[] = []

// const SecurityKey = '2Y2JjYn0v4.0'
const SecurityKey = 'yMTdkNX0v4.0'
const PrinterConfig = {
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

interface RequestParams {
  Endpoint: string
  RequestData?: {
    printer?: string
    securityKey?: string
    job?: ITRequestOperation[]
  }
}

interface ITRequestOperation {
  op: string
  data: string | boolean | object | number
}

export const ListAvailablePrinters = (): string[] => {
  return Printers
}

export const LoadFirstPrinter: () => Promise<string> = async () => {
  const MPCPrinters = await Request({ Endpoint: 'getPrinters' })

  PrinterName = MPCPrinters.data[0]

  MPCPrinters.data.map((PrinterName: string) => {
    Printers.push(PrinterName)
  })

  return PrinterName
}

export const GetPrinterWidth = (): number => {
  return PrinterConfig.normalLineWidth
}

export const GetPrinters: () => Promise<string> = async () => {
  return await Request({ Endpoint: 'getPrinters' })
}

export const GetPrinterStatus: () => Promise<string> = async () => {
  return await Request({ Endpoint: 'getPrinterStatus' })
}

export const AddText = (TextLine: string | number): any => {
  return [
    { op: 'double', data: { width: false, height: false } },
    { op: 'alignment', data: 1 },
    { op: 'condensed', data: false },
    { op: 'text', data: TextLine as string },
    { op: 'double', data: { width: true, height: true } },
    { op: 'condensed', data: true },
  ]
}

export const AddSpacedText = (
  TextLine: string | number,
  Ending: string | number,
  Divider?: string | null
): ITMPCTextLine => {
  Divider = Divider || '.';
  let TextLineLength = TextLine.toString().length
  const ProductQtyLenght = Ending.toString().length

  if (TextLineLength > 32) {
    TextLineLength = TextLineLength - 32
  }

  let Line = TextLine
  const Spacing = Math.floor(32 - TextLineLength - ProductQtyLenght)

  for (let i = 0; i < Spacing; i++) {
    Line += Divider
  }

  Line += Ending.toString()

  return { op: 'text', data: Line }
}

export const AddCenteredText = (TextLine: string | number): ITMPCTextLine[] => {
  return [
    { op: 'alignment', data: 1 },
    { op: 'text', data: TextLine.toString() },
    { op: 'alignment', data: 0 }
  ]
}

export const AddLineBreak = (): ITMPCTextLine => {
  return { op: 'text', data: '\n' }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Print = async (Data: ITRequestOperation[], SelectedPrinter?: string) => {
  SelectedPrinter = SelectedPrinter ?? PrinterName

  const job: ITRequestOperation[] = [
    {
      op: 'settings',
      data: PrinterConfig
    },
    { op: 'condensed', data: false },
    { op: 'style', data: { underlined: false, emphasized: false } },
    { op: 'double', data: { width: false, height: false } },
    { op: 'alignment', data: 0 },
    { op: 'condensed', data: true },
    { op: 'double', data: { width: true, height: true } },
    { op: 'text', data: '\n' },
    { op: 'text', data: '\n' },
    { op: 'text', data: '\n' }
  ]

  if (Data.length) job.push(...Data)

  job.push(
    ...[
      { op: 'text', data: '\n' },
      { op: 'text', data: '\n' },
      { op: 'text', data: '\n' },
      { op: 'text', data: '\n' },
      { op: 'text', data: '\n' },
      { op: 'condensed', data: false },
      { op: 'style', data: { underlined: false, emphasized: false } },
      { op: 'alignment', data: 0 },
      { op: 'cut', data: 'feed' },
      { op: 'pulse', data: { drawer: 0, pulse: 50 } }
    ]
  )

  console.log(JSON.stringify(job))

  return await Request({
    Endpoint: 'sendJob',
    RequestData: {
      printer: SelectedPrinter,
      job: job
    }
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
