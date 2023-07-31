import { ReactElement, useEffect, useState } from 'react'
import { LoadFirstPrinter, Print } from '../context/MPCClient'

const Menu = (): ReactElement => {
  const [PrinterName, setPrinterName] = useState('')

  const LoadMPCPrinter = async () => {
    const PrinterName = await LoadFirstPrinter()
    setPrinterName(PrinterName)
  }

  useEffect(() => {
    LoadMPCPrinter()
  }, [])

  return (
    <div className="col-span-2 bg-blue-400 text-white flex items-center p-4">
      Connected to printer {PrinterName}
    </div>
  )
}

export default Menu
