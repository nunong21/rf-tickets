import { ReactElement, useEffect, useState } from 'react'
import { LoadFirstPrinter } from '../context/MPCClient'

const Menu = (): ReactElement => {
  const [PrinterName, setPrinterName] = useState('')

  const LoadMPCPrinter: () => Promise<void> = async () => {
    const PrinterName = await LoadFirstPrinter()
    setPrinterName(PrinterName)
  }

  useEffect(() => {
    LoadMPCPrinter().then((r) => console.log(r))
  }, [])

  return (
    <div className="col-span-2 bg-blue-600 text-white flex items-center p-2 text-sm h-8">
      Connected to printer {PrinterName}
    </div>
  )
}

export default Menu
