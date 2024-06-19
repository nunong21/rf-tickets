import { FunctionComponent, useContext } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { ProductsCartContext } from '../context/ProductsCartContext'
import { ITCartProduct } from '../types/Definitions'
import Coin from './Coin'
import { Button } from '@mui/material'

interface ThisProps {
  Product: ITCartProduct
}

const CartListItem: FunctionComponent<ThisProps> = ({ Product }: ThisProps) => {
  const { RemoveProduct } = useContext(ProductsCartContext)

  const RemoveLine = () => {
    return RemoveProduct(Product.id)
  }

  return (
    <div className="flex flex-col text-2xl py-2 border-b border-black">
      <div className="flex w-full items-center">
        <div className="flex-1">
          {Product.name} <span className="text-gray-400">x</span> {Product.qty}
        </div>

        <div className="mr-4">{Coin(Product.price * Product.qty)}</div>

        <Button variant={'contained'} color={'error'} onClick={RemoveLine}>
          <RxCross1 color="white" className={'h-8 w-8'}></RxCross1>
        </Button>
      </div>
      {Product?.bundle?.map((item, bundleIndex) => {
        return (
          <div key={bundleIndex} className="text-lg text-gray-700">
            {item.name}
          </div>
        )
      })}
    </div>
  )
}

export default CartListItem
