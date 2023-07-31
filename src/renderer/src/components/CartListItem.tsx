import { FC, useContext } from 'react'
import { RxCross1 } from 'react-icons/rx'
import Ripples from 'react-ripples'
import { ProductsCartContext } from '../context/ProductsCartContext'

interface CartListProps {
  Id: number
  Name: string
  Price: number
  Qty: number
}

const CartListItem: FC<CartListProps> = ({ Id, Name, Price, Qty }) => {
  const { RemoveProduct } = useContext(ProductsCartContext)

  const RemoveLine = () => {
    return RemoveProduct(Id)
  }

  return (
    <div className="flex text-2xl py-2 border-b border-black items-center">
      <div className="flex-1">
        {Name} <span className="text-gray-400">x</span> {Qty}
      </div>
      <div className="mr-4">
        {Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(Price * Qty)}
      </div>
      <Ripples>
        <div className="p-2 cursor-pointer rounded shadow bg-red-400" onClick={RemoveLine}>
          <RxCross1 color="white"></RxCross1>
        </div>
      </Ripples>
    </div>
  )
}

export default CartListItem
