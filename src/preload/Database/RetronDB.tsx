import Database from 'better-sqlite3'

import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import { app } from 'electron'
import * as fs from 'fs'
import { SaleSchema } from './Sales/Sales'

let DatabaseExists = false

export function connect() {
  const dbPath = is.dev
    ? join(__dirname, '../../..', 'resources/database', 'RetroPOS.db')
    : join(app.getPath('userData'), 'RetroPOS.db')

  console.info(`Connecting to ${dbPath}`)

  if (DatabaseExists || fs.existsSync(dbPath)) {
    console.info(`Database exists`)
    return Database(dbPath, { verbose: console.log, fileMustExist: true })
  }

  const DatabaseObj = Database(dbPath, { verbose: console.log, fileMustExist: false })
  DatabaseObj.run(SaleSchema)

  return
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
