import { FunctionComponent, useContext } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { RippleSurface } from 'react-ripples-continued'
import { ProductsCartContext } from '../context/ProductsCartContext'
import { ITCartProduct } from '../types/Definitions'

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
      <div className="flex w-full">
        <div className="flex-1">
          {Product.name} <span className="text-gray-400">x</span> {Product.qty}
        </div>
        <div className="mr-4">
          {Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(
            Product.price * Product.qty
          )}
        </div>
        <RippleSurface onClick={RemoveLine} className={"cursor-pointer"}>
          <div className="p-2 cursor-pointer rounded shadow bg-red-600">
            <RxCross1 color="white"></RxCross1>
          </div>
        </RippleSurface>
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
