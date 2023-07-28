import Ripples from 'react-ripples'
import { ReactElement, useContext } from 'react'
import { ProductsCartContext } from '../context/ProductsCartContext'

const ProductButton = (Props): ReactElement => {
  const { AddProduct } = useContext(ProductsCartContext)

  const AddProductToCart = (): void => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    AddProduct(Props.Product)
  }

  return (
    <Ripples>
      <div
        key={1}
        className="rounded w-52 h-52 shadow bg-white p-4 cursor-pointer select-none"
        onClick={AddProductToCart}
      >
        <div className="flex flex-col h-full justify-between">
          <span className="text-3xl">{Props.Product.name}</span>
          <span className="text-4xl text-right">a€</span>
        </div>
      </div>
    </Ripples>
  )
}

export default ProductButton
