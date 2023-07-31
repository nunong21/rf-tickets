import { ReactElement, useEffect } from 'react'
import { GetPrinters } from '../context/MPCClient'

const Menu = (): ReactElement => {
  const ShowPrinters = async () => {
    const Printers = await GetPrinters()
    console.log(Printers)
  }

  useEffect(() => {
    ShowPrinters()
  }, [])

  return <div className="col-span-2 bg-blue-400 text-white">Hello</div>
}

export default Menu
