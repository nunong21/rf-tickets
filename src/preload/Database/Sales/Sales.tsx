import { ITModelSale } from '../RetronDB.types'
import { connect } from '../RetronDB'

export const insertSale = () => {}

export const getAllSales = () => {
  const db = connect()
  const stm = db.prepare('SELECT * FROM Sales')

  return stm.all() as ITModelSale[]
}
