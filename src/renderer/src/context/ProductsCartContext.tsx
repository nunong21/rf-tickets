import { createContext, ReactElement, useState } from 'react'
import { ITCartProduct, ITProductsCartContext } from '../types/Definitions'
import { Print } from './MPCClient'

const Default: ITProductsCartContext = {
  Cart: {
    total: 0,
    products: []
  },
  AddProduct: (): void => {},
  RemoveProduct: (): void => {},
  ResetCart: (): void => {},
  PrintCart: (): void => {}
}

export const ProductsCartContext = createContext<ITProductsCartContext>(Default)

const ProductsCartContextProvider = (props): ReactElement => {
  const [CartState, setCartState] = useState(Default.Cart)

  const AddProductToCart = (Product): void => {
    const CartProduct: ITCartProduct = {
      id: Product.id,
      name: Product.name,
      price: Product.price,
      qty: 1
    }

    let ProductExistsInCart = false
    let ProductList: ITCartProduct[] = [...CartState.products]

    ProductList.map((ListProduct: ITCartProduct) => {
      if (ListProduct.id === CartProduct.id) {
        ListProduct.qty++
        ProductExistsInCart = true
      }
    })

    if (!ProductExistsInCart) {
      ProductList = [...ProductList, CartProduct]
    }

    setCartState({
      total: CartState.total + Product.price,
      products: [...ProductList]
    })
  }

  const RemoveProductFromCart = (ProductId: number): void => {
    const ProductList: ITCartProduct[] = [...CartState.products]

    const NewProductList = ProductList.filter((value) => value.id !== ProductId)
    const CartTotal = NewProductList.reduce((total, item) => {
      return total + item.price * item.qty
    }, 0)

    setCartState({
      total: CartTotal,
      products: [...NewProductList]
    })
  }

  const ResetCart = (): void => {
    setCartState({
      total: 0,
      products: []
    })
  }

  const PrintCart = async (): Promise<void> => {
    await Print({})
  }

  return (
    <ProductsCartContext.Provider
      value={{
        Cart: CartState,
        AddProduct: AddProductToCart,
        RemoveProduct: RemoveProductFromCart,
        ResetCart: ResetCart,
        PrintCart: PrintCart
      }}
    >
      {props.children}
    </ProductsCartContext.Provider>
  )
}

export default ProductsCartContextProvider
