import { createContext, ReactElement, useState } from 'react'
import { ITCartProduct, ITProductsCartContext } from '../types/Definitions'
import fetch from 'electron-fetch'

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

  const RemoveProductFromCart = (Product): void => {
    console.log(Product)
    console.log('Teste2')
  }

  const ResetCart = (): void => {
    setCartState({
      total: 0,
      products: []
    })
  }

  const PrintCart = async (): Promise<void> => {
    console.log('Print')
    try {
      const result = await fetch('https://localhost:5080/getPrinterStatus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          securityKey: 'lNjczZn0v4.0'
        })
      })

      console.log(result)
    } catch (error) {
      console.error('Error:', error)
    }
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
