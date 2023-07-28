import { FC, useContext } from 'react'
import { ProductsCartContext } from '../context/ProductsCartContext'
import CartListItem from './CartListItem'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CartListProps {}

const CartList: FC<CartListProps> = () => {
  const { ResetCart, PrintCart } = useContext(ProductsCartContext)

  const ResetCartClick = (): void => {
    ResetCart()
  }

  return (
    <ProductsCartContext.Consumer>
      {(value): JSX.Element => {
        if (!value.Cart.products.length) {
          return <div></div>
        }

        return (
          <div className="p-4 h-full flex flex-col">
            {value.Cart.products.map((Product, Index) => {
              return (
                <CartListItem
                  key={Index}
                  Name={Product.name}
                  Price={Product.price}
                  Qty={Product.qty}
                />
              )
            })}

            <div className="flex flex-col gap-4 mt-auto">
              <div className="flex justify-between text-4xl font-semibold">
                <div>Total:</div>
                <div>
                  {Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(
                    value.Cart.total
                  )}
                </div>
              </div>

              <div
                className="bg-blue-400 rounded p-4 text-2xl text-center cursor-pointer"
                onClick={PrintCart}
              >
                Imprimir
              </div>
              <div
                className="bg-red-400 rounded p-4 text-2xl text-center cursor-pointer"
                onClick={ResetCartClick}
              >
                Reset
              </div>
            </div>
          </div>
        )
      }}
    </ProductsCartContext.Consumer>
  )
}

export default CartList
