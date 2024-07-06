import Database from 'better-sqlite3'
import { join } from 'path'
import * as fs from 'fs'
import { ProductSchema, SaleProductsSchema, SaleSchema } from './RetronDB.schema'

let DatabaseExists = false

export function connect() {
  try {
    const dbPath =
      process.env.NODE_ENV === 'development'
        ? './RetroPOS.db'
        : join(process.resourcesPath, './RetroPOS.db')

    console.info(`Connecting to ${dbPath}`)

    if (DatabaseExists || fs.existsSync(dbPath)) {
      return Database(dbPath, { verbose: console.log, fileMustExist: true })
    }

    console.info(`Creating database at ${dbPath}`)
    const DatabaseObj = Database(dbPath, { verbose: console.log, fileMustExist: false })
    DatabaseObj.exec(SaleSchema)
    DatabaseObj.exec(SaleProductsSchema)
    DatabaseObj.exec(ProductSchema)

    return DatabaseObj
  } catch (e) {
    console.error(e)
    // [Error: Uh oh!]
  }
}
