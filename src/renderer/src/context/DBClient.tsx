declare global {
  interface Window {
    api: {
      LoadDatabase: () => void
      ExecuteQuery: (query: string, values?: object) => void
      SaveSale: (values?: object) => void
    }
  }
}

export const LoadProducts = () => {
  console.log('Trying to load all products from database')
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
