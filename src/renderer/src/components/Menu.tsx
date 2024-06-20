import { ReactElement, useContext, useEffect, useState } from 'react'
import { LoadFirstPrinter } from '../context/MPCClient'
import { Button } from '@mui/material'
import { GeneralContext } from '../context/GeneralContext'

const Menu = (): ReactElement => {
  const [PrinterName, setPrinterName] = useState('')

  const { ViewMode, ChangeViewMode } = useContext(GeneralContext)

  const LoadMPCPrinter: () => Promise<void> = async () => {
    const PrinterName = await LoadFirstPrinter()
    setPrinterName(PrinterName)
  }

  useEffect(() => {
    LoadMPCPrinter().then((r) => console.log(r))
  }, [])

  return (
    <div className="col-span-2 bg-blue-600 text-white flex items-center p-2 text-sm justify-between max-h-16">
      <span className={'text-lg'}>
        {PrinterName?.length ? `Ligado à impressora: ${PrinterName}` : 'Sem ligação à impressora'}
      </span>

      {ViewMode === 'view' ? (
        <Button color={'success'} variant={'contained'} onClick={ChangeViewMode}>
          Visualização
        </Button>
      ) : (
        <Button color={'warning'} variant={'contained'} onClick={ChangeViewMode}>
          Edição
        </Button>
      )}
    </div>
  )
}

export default Menu
