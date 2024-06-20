declare global {
  interface Window {
    api: any
  }
}

export const getAllSales = () => {
  console.log('Trying to load all products from database')
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
