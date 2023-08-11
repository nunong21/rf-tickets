declare global {
  interface Window {
    api: {
      LoadDatabase: () => void
      ExecuteQuery: (query: string, values?: object) => void
      SaveSale: (values?: object) => void
    }
  }
}

window.api.LoadDatabase()
window.api.ExecuteQuery(
  'CREATE TABLE IF NOT EXISTS Sales (Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, ProductId CHAR(250) NOT NULL, ProductName CHAR(250), SaleQty FLOAT DEFAULT 0, SaleTotal FLOAT DEFAULT 0,  SaleNumber INT DEFAULT 0,  BundleId INT DEFAULT 0, SaleDate DATETIME DEFAULT CURRENT_TIMESTAMP)'
)
export const DBQuery = (values): void => {
  window.api.SaveSale(values)
}

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
  DBQuery([
    ProductId,
    ProductName.replace('/', '').replace('Á', 'A').replace('á', 'a'),
    SaleQty,
    SaleTotal,
    SaleNumber,
    SaleNumberIncrementor,
    BundleId
  ])
}
