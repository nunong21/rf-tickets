import { ITProduct } from '../types/Definitions'

declare global {
  interface Window {
    api: any
  }
}

export const productsGetAll = (): ITProduct[] => {
  return window.api.Products.getAllProducts()
}

export const DBProductsInsert = (Product: ITProduct) => {
  window.api.Products.insertProduct({
    name: Product.name,
    price: Product.price ?? 0,
    order: Product.order ?? 0,
    category: Product.category ?? 3,
    buttonColor: Product.buttonColor ?? 'bg-amber-300'
  })

  return true
}

export const DBProductsUpdate = (Product: ITProduct) => {
  window.api.Products.updateProduct({
    id: Product.id ?? 0,
    name: Product.name,
    price: Product.price ?? 0,
    order: Product.order ?? 0,
    category: Product.category ?? 3,
    buttonColor: Product.buttonColor ?? 'bg-amber-300'
  })

  return true
}

export const DBProductsDelete = (ProductId: number) => {
  window.api.Products.deleteProduct({
    id: ProductId
  })

  return true
}

export const getAllSales = () => {
  const cenas = window.api.getAllSales()
  console.log(cenas)
}

export const InsertSale = () => {}

/**
 export const InsertSale = ({
 ProductId,
 ProductName,
 SaleQty,
 SaleTotal,
 SaleNumber,
 SaleNumberIncrementor,
 BundleId
 }): void => {
 const Query = `INSERT INTO Sales(ProductId, ProductName, SaleQty, SaleTotal, SaleNumber, BundleId) VALUES (?, ?, ?, ?, ?, ?);`
 console.log(Query)

 window.db.getAllSales()
 }
 **/
