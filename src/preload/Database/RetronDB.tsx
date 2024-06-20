import Database from 'better-sqlite3'
import { join } from 'path'
import * as fs from 'fs'
import { ProductSchema, SaleProductsSchema, SaleSchema } from './RetronDB.schema'

let DatabaseExists = false

export function connect() {
  const dbPath =
    process.env.NODE_ENV === 'development'
      ? join(process.resourcesPath, 'RetroPOS.db')
      : join(process.resourcesPath, './RetroPOS.db')

  console.info(`Connecting to ${dbPath}`)

  if (DatabaseExists || fs.existsSync(dbPath)) {
    console.info(`Database exists`)
    return Database(dbPath, { verbose: console.log, fileMustExist: true })
  }

  console.info(`Creating database at ${dbPath}`)
  const DatabaseObj = Database(dbPath, { verbose: console.log, fileMustExist: false })
  DatabaseObj.exec(SaleSchema)
  DatabaseObj.exec(SaleProductsSchema)
  DatabaseObj.exec(ProductSchema)

  return DatabaseObj
}

/**
 export function deleteArticle(id: number) {
 const db = connect()

 const stm = db.prepare('DELETE FROM articles WHERE id = @id')

 stm.run({ id })
 }

 export function getArticleById(id: number) {
 const db = connect()

 const stm = db.prepare('SELECT * FROM articles WHERE id = @id')
 return stm.get({ id }) as Article
 }

 export function searchArticles(keyword: string): Article[] {
 const db = connect()

 const stm = db.prepare(`
 SELECT *
 FROM articles
 WHERE title LIKE @keyword
 OR author LIKE @keyword
 OR year LIKE @keyword
 OR publication LIKE @keyword
 `)

 const keywordWithWildcards = `%${keyword}%`
 const results = stm.all({ keyword: keywordWithWildcards }) as Article[]

 return results
 }
 **/
