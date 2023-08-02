import { createContext, ReactElement, useState } from 'react'
import { ITCartProduct, ITMPCTextLine, ITProductsCartContext } from '../types/Definitions'
import { AddCenteredText, AddLineBreak, AddSpacedText, Print } from './MPCClient'

interface ThisChildren {
  children: string | JSX.Element | JSX.Element[]
}

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

const ProductsCartContextProvider = ({ children: children }: ThisChildren): ReactElement => {
  const [CartState, setCartState] = useState(Default.Cart)

  const AddProductToCart = (Product): void => {
    const CartProduct: ITCartProduct = {
      id: Product.id,
      name: Product.name,
      price: Product.price,
      bundle: Product?.bundle,
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
    const Data: ITMPCTextLine[] = []

    CartState.products.map((CartProduct) => {
      if (CartProduct.bundle?.length) {
        Data.push(...AddCenteredText(CartProduct.name + ' x ' + CartProduct.qty))
        Data.push(AddLineBreak())
        Data.push(AddLineBreak())
        CartProduct.bundle.map((BundleProduct) => {
          const BundleQty = BundleProduct.qty
            ? BundleProduct.qty * CartProduct.qty
            : CartProduct.qty

          Data.push(AddSpacedText(BundleProduct.name, BundleQty))
          Data.push(AddLineBreak())
          Data.push(AddLineBreak())
        })
        Data.push(...AddCenteredText('XXXXXXX'))
      } else {
        Data.push(AddSpacedText(CartProduct.name, CartProduct.qty))
      }
      Data.push(AddLineBreak())
      Data.push(AddLineBreak())
    })

    await Print(Data)
    // ResetCart()
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
      {children}
    </ProductsCartContext.Provider>
  )
}

export default ProductsCartContextProvider
