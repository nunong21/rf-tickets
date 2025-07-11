import { createContext, ReactElement, useState } from 'react'
import { ITCartProduct, ITMPCTextLine, ITProductsCartContext } from '../types/Definitions'
import { AddCenteredText, AddLineBreak, AddSpacedText, AddText, Print } from './MPCClient'
import { DBInsertSale, DBInsertSaleProduct } from './DBClient'

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
  PrintCart: (): void => {},
  PrintCartSplited: (): void => {},
  ChangeKitchenPrint: (): void => {},
  GetKitchenPrint: (): boolean => false
}

let SaleNumberIncrementor = 0

export const ProductsCartContext = createContext<ITProductsCartContext>(Default)

const ProductsCartContextProvider = ({ children: children }: ThisChildren): ReactElement => {
  const [CartState, setCartState] = useState(Default.Cart)
  const [KitchenPrint, setKitchenPrint] = useState(false)

  const AddProductToCart = (Product: { id: any; name: any; price: number; bundle: any }): void => {
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
    if (SaleNumberIncrementor === 99) {
      SaleNumberIncrementor = 0
    }

    SaleNumberIncrementor++

    const Data: ITMPCTextLine[] = []

    Data.push(...AddCenteredText('---- MARCHA PARANHOS ----'))
    Data.push(AddLineBreak())
    Data.push(AddLineBreak())
    Data.push(AddLineBreak())
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

    Data.push(AddSpacedText('', CartState.total.toFixed(2) + 'EUR', ' '))
    Data.push(AddLineBreak())
    Data.push(AddLineBreak())
    Data.push(...AddText('Este documento não serve de fatura.'))
    await Print(Data)

    if (KitchenPrint) {
      Data.push(AddLineBreak())
      Data.push(...AddCenteredText('------- COZINHA -------'))

      console.log(`Printing to kitchen...`)
      // await Print(Data)
    }

    SaveSale(SaleNumberIncrementor)
    ResetCart()
  }

  const PrintCartSplited = async (): Promise<void> => {
    let counter = 0

    await Promise.all(
      CartState.products.map(async (CartProduct) => {
        for (let i = 0; i < CartProduct.qty; i++) {
          const Data: ITMPCTextLine[] = []
          Data.push(AddSpacedText(CartProduct.name, 1))
          await Print(Data)
          counter++
          console.log('Printing' + counter)
        }
      })
    )

    SaveSale()
    ResetCart()
  }

  const SaveSale = (SaleNumber?: number): void => {
    setCartState({
      total: CartState.total,
      products: CartState.products
    })

    const Sale = DBInsertSale({
      total: CartState.total,
      cashflowId: 0,
      number: SaleNumber ?? 0
    })

    CartState.products.map((CartProduct) => {
      if (CartProduct.bundle?.length) {
        CartProduct.bundle.map((BundleProduct) => {
          const BundleQty = BundleProduct.qty
            ? BundleProduct.qty * CartProduct.qty
            : CartProduct.qty

          DBInsertSaleProduct({
            saleId: Sale.id,
            productId: CartProduct.id,
            productName: BundleProduct.name,
            qty: BundleQty as number,
            priceUnit: 0,
            bundleId: BundleProduct.id
          })
        })
      } else {
        DBInsertSaleProduct({
          saleId: Sale.id,
          productId: CartProduct.id,
          productName: CartProduct.name,
          qty: CartProduct.qty as number,
          priceUnit: CartProduct.price,
          bundleId: 0
        })
      }
    })
  }

  const ChangeKitchenPrint = (checked: boolean): void => {
    setKitchenPrint(checked)
  }

  return (
    <ProductsCartContext.Provider
      value={{
        Cart: CartState,
        AddProduct: AddProductToCart,
        RemoveProduct: RemoveProductFromCart,
        ResetCart: ResetCart,
        PrintCart: PrintCart,
        PrintCartSplited: PrintCartSplited,
        ChangeKitchenPrint: ChangeKitchenPrint,
        GetKitchenPrint: (): boolean => KitchenPrint
      }}
    >
      {children}
    </ProductsCartContext.Provider>
  )
}

export default ProductsCartContextProvider
