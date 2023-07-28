import { FC } from 'react'

interface CartListProps {
  Name: string
  Price: number
  Qty: number
}

const CartListItem: FC<CartListProps> = ({ Name, Price, Qty }) => {
  const RemoveLine = () => {
    console.log("Remove Line")
  }

  return (
    <div className="flex text-2xl py-2 border-b border-black items-center">
      <div className="flex-1">
        {Name} <span className="text-gray-400">x</span> {Qty}
      </div>
      <div>
        {Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(Price * Qty)}
      </div>
      <div className="ml-4 p-2 cursor-pointer" onClick={RemoveLine}>
        X
      </div>
    </div>
  )
}

export default CartListItem
