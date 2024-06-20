import { ITModelSale } from '../RetronDB.types'
import { connect } from '../RetronDB'

export const insertSale = (Sale: ITModelSale) => {
  const db = connect()
  const stm = db.prepare('INSERT INTO Sales () VALUES (?, ?, ?, NOW())')

  stm.run(Sale.CashflowId ?? 0, Sale.Number, Sale.Total)
}

export const getAllSales = () => {
  const db = connect()
  const stm = db.prepare('SELECT * FROM Sales')

  return stm.all() as ITModelSale[]
}