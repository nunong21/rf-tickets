export interface ITModelProduct {
  id?: number
  name: string
  order: number
  price: number
  category?: number
  image?: string | null
  buttonColor?: string | null
  buttonTextColor?: string | null
  disabled?: boolean
}

export interface ITModelSale {
  id?: number
  cashflowId: number
  number: number
  total: number
  date?: string
}

export interface ITModelSaleProducts {
  id?: number
  saleId: number
  productId: number
  productName: string
  qty: number
  priceUnit: number
  bundleId?: number
}
