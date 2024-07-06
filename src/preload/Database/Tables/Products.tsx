import { ITModelProduct } from '../RetronDB.types'
import { connect } from '../RetronDB'

const getAllProducts = () => {
  console.log('Getting all products...')
  const db = connect()
  console.log('Getting all products...')
  const stm = db.prepare(`
      SELECT *
      FROM Products P
      ORDER BY \`order\`,
               name
  `)

  console.log(stm.all() as ITModelProduct[])

  return stm.all() as ITModelProduct[]
}

const insertProduct = (Product: ITModelProduct) => {
  const db = connect()
  const stm = db.prepare(`
      INSERT INTO Products
          (name, price, "order", category, buttonColor)
      VALUES (?, ?, ?, ?, ?)
  `)

  stm.run(Product.name, Product.price, Product.order, Product.category, Product.buttonColor)
  return true
}

const updateProduct = (Product: ITModelProduct) => {
  const db = connect()
  const stm = db.prepare(`
      UPDATE Products
      SET name        = ?,
          price       = ?,
          "order"     = ?,
          category    = ?,
          buttonColor = ?
      WHERE id = ?
  `)

  stm.run(
    Product.name,
    Product.price,
    Product.order,
    Product.category,
    Product.buttonColor,
    Product.id
  )
  return true
}

const deleteProduct = (Product: ITModelProduct) => {
  const db = connect()

  const stm = db.prepare('DELETE FROM Products WHERE id = ?')

  stm.run(Product.id)
}

export const Products = {
  getAllProducts,
  insertProduct,
  updateProduct,
  deleteProduct
}
