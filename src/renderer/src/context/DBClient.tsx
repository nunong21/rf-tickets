import { ITProduct } from '../types/Definitions'
// @ts-ignore
import { ITModelSale, ITModelSaleProducts } from '../../../preload/Database/RetronDB.types'

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

export const DBGetAllSales = (): ITModelSale => {
  return window.api.Sales.getAllSales()
}

export const DBInsertSale = (Product: ITModelSale) => {
  return window.api.Sales.insertSale({
    cashflowId: Product.cashflowId,
    number: Product.number,
    total: Product.total
  })
}

export const DBInsertSaleProduct = (Product: ITModelSaleProducts) => {
  return window.api.Sales.insertSaleProduct({
    saleId: Product.saleId,
    productId: Product.productId ?? 0,
    productName: Product.productName,
    qty: Product.qty ?? 0,
    priceUnit: Product.priceUnit ?? 0,
    bundleId: Product.bundleId ?? 0
  })
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
