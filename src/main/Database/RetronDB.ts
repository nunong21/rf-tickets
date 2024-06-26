import Database from 'better-sqlite3'

import { join } from 'path'
import { DbSaleType } from './RetronDB.types'
import { is } from '@electron-toolkit/utils'
import { app } from 'electron'

export function connect() {
  const dbPath = is.dev
    ? join(__dirname, '../../..', 'resources/database', 'RFTicketsMain.db')
    : join(app.getPath('userData'), 'RetroPOS.db')

  console.info(`Connecting to ${dbPath}`)

  return Database(dbPath, { verbose: console.log, fileMustExist: true })
}

export function insertSale(article: DbSaleType) {
  const db = connect()

  const stm = db.prepare(
    'INSERT INTO articles (type, title, author, publication, year, pdfFile) VALUES (?, ?, ?, ?, ?, ?)'
  )

  stm.run(
    article.type,
    article.title,
    article.author,
    article.publication,
    article.year,
    article.pdfFile
  )
}

export function insertArticle(article: DbSaleType) {
  const db = connect()

  const stm = db.prepare(
    'INSERT INTO articles (type, title, author, publication, year, pdfFile) VALUES (?, ?, ?, ?, ?, ?)'
  )

  stm.run(
    article.type,
    article.title,
    article.author,
    article.publication,
    article.year,
    article.pdfFile
  )
}

export function deleteArticle(id: number) {
  const db = connect()

  const stm = db.prepare('DELETE FROM articles WHERE id = @id')

  stm.run({ id })
}

export function getAllArticles() {
  const db = connect()

  const stm = db.prepare('SELECT * FROM articles')

  return stm.all() as Article[]
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
