import { FC, useContext } from 'react'
import { ProductsCartContext } from '../context/ProductsCartContext'
import CartListItem from './CartListItem'
import { AiOutlineShoppingCart } from 'react-icons/ai'

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
          return (
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-3xl font-semibold select-none text-center">
                Sem artigos adicionados
              </h2>
              <AiOutlineShoppingCart
                size="6rem"
                color=""
                className="text-slate-200 mt-4"
              ></AiOutlineShoppingCart>
            </div>
          )
        }

        return (
          <div className="p-4 h-full flex flex-col">
            {value.Cart.products.map((Product) => {
              return <CartListItem key={Product.id} Product={Product} />
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

              <div className="bg-blue-600 rounded p-4 cursor-pointer" onClick={PrintCart}>
                <h2 className="text-white text-2xl text-center font-semibold">Imprimir</h2>
              </div>
              <div className="bg-red-600 rounded p-4 cursor-pointer" onClick={ResetCartClick}>
                <h2 className="text-white text-2xl text-center font-semibold">Cancelar</h2>
              </div>
            </div>
          </div>
        )
      }}
    </ProductsCartContext.Consumer>
  )
}

export default CartList
