import { FC } from 'react'
import { RxCross1 } from 'react-icons/rx'
import Ripples from 'react-ripples'

interface CartListProps {
  Name: string
  Price: number
  Qty: number
}

const CartListItem: FC<CartListProps> = ({ Name, Price, Qty }) => {
  const RemoveLine = () => {
    console.log('Remove Line')
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
