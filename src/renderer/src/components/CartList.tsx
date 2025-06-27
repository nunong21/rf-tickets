import { FC, useContext } from 'react'
import { ProductsCartContext } from '../context/ProductsCartContext'
import CartListItem from './CartListItem'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ModalCalculator from './ModalCalculator'
import Coin from './Coin'
import { Button, Checkbox } from '@mui/material'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CartListProps {}

const CartList: FC<CartListProps> = () => {
  const { ResetCart, PrintCart, PrintCartSplited, ChangeKitchenPrint } =
    useContext(ProductsCartContext)

  const ResetCartClick = (): void => {
    ResetCart()
  }

  const onChangeKitchenPrint = (event: any): void => {
    console.log('onChangeKitchenPrint', event.target.checked)
    ChangeKitchenPrint(event.target.checked)
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
              <div className="flex justify-between items-center text-4xl font-semibold">
                <div>Total:</div>
                <div className={'flex items-center'}>
                  {Coin(value.Cart.total)}

                  <ModalCalculator total={value.Cart.total}></ModalCalculator>
                </div>
              </div>

              <div className="flex gap-1 justify-between items-center">
                <Checkbox color="success" size="large" onChange={onChangeKitchenPrint} />
                <Button
                  variant={'contained'}
                  onClick={PrintCart}
                  color={'primary'}
                  className={'p-4 flex-1'}
                >
                  Imprimir junto / Cozinha
                </Button>
              </div>

              <Button
                variant={'contained'}
                onClick={PrintCartSplited}
                color={'warning'}
                className={'p-4'}
              >
                Imprimir separado / Bar
              </Button>

              <Button
                variant={'contained'}
                onClick={ResetCartClick}
                color={'error'}
                className={'p-4'}
              >
                Cancelar
              </Button>
            </div>
          </div>
        )
      }}
    </ProductsCartContext.Consumer>
  )
}

export default CartList
