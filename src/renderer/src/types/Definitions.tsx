export interface ITProduct {
  id: string
  name: string
  price: number
  image: string
}

export interface ITMPCTextLine {
  op: string
  data: string | number
}

/**********************
 * Cart related types
 *********************/

export interface ITProductsCartContext {
  Cart: {
    total: number
    products: ITCartProduct[]
  }
  AddProduct: (any) => void
  RemoveProduct: (number) => void
  ResetCart: () => void
  PrintCart: () => void
}

export interface ITCartProduct {
  id: number
  name: string
  price: number
  qty: number
  bundle?: ITCartProduct[]
}
