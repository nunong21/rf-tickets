export interface ITProduct {
  order: number
  id?: number
  name: string
  price: number
  image?: string | null
  buttonColor?: string | null
  buttonTextColor?: string | null
  disabled?: boolean
  category?: number
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
  AddProduct: (arg0: any) => void
  RemoveProduct: (arg0: number) => void
  ResetCart: () => void
  PrintCart: () => void
  PrintCartSplited: () => void
  ChangeKitchenPrint: (checked: boolean) => void
  GetKitchenPrint: () => boolean
}

export interface ITCartProduct {
  id: number
  name: string
  price: number
  qty: number
  bundle?: ITCartProduct[]
}
