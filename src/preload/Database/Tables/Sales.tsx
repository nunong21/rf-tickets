import { ITModelSale, ITModelSaleProducts } from '../RetronDB.types'
import { connect } from '../RetronDB'

const getAllSales = () => {
  const db = connect()
  const stm = db.prepare('SELECT * FROM Sales ORDER BY id DESC')

  return stm.all() as ITModelSale[]
}

const getOneSale = (saleId: number) => {
  const db = connect()
  const stm = db.prepare('SELECT * FROM Sales WHERE Sales.id = ?')

  return stm.get(saleId) as ITModelSale
}

const insertSale = (Sale: ITModelSale) => {
  const db = connect()
  const stm = db.prepare(`
      INSERT INTO Sales
          (cashflowId, number, total, date)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
  `)

  const result = stm.run(Sale.cashflowId, Sale.number, Sale.total)

  return getOneSale(result.lastInsertRowid)
}

const insertSaleProduct = (SaleProduct: ITModelSaleProducts) => {
  const db = connect()
  const stm = db.prepare(`
      INSERT INTO SaleProducts
          (saleId, productId, productName, qty, priceUnit, bundleId)
      VALUES (?, ?, ?, ?, ?, ?)
  `)

  stm.run(
    SaleProduct.saleId,
    SaleProduct.productId,
    SaleProduct.productName,
    SaleProduct.qty,
    SaleProduct.priceUnit,
    SaleProduct.bundleId
  )
}

export const Sales = {
  getAllSales,
  insertSale,
  insertSaleProduct
}
