import { ITModelProduct } from '../RetronDB.types'
import { connect } from '../RetronDB'

const getAllProducts = () => {
  const db = connect()
  const stm = db.prepare('SELECT * FROM Products')

  console.log(stm.all() as ITModelProduct[])

  return stm.all() as ITModelProduct[]
}

export const Products = {
  getAllProducts
}
