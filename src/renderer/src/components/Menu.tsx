import { ReactElement, useEffect, useState } from 'react'
import { LoadFirstPrinter } from '../context/MPCClient'
import { Button } from '@mui/material'

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
      {PrinterName?.length ? `Connected to printer ${PrinterName}` : 'Not connected'}

      <Button variant={'text'} className={'text-white'}>
        Teste
      </Button>
    </div>
  )
}

export default Menu
