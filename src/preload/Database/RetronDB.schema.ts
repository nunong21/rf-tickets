export const ProductSchema = `
CREATE TABLE IF NOT EXISTS Products (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    price REAL NOT NULL,
    category INTEGER,
    image TEXT,
    buttonColor TEXT,
    buttonTextColor TEXT,
    disabled BOOLEAN
);
`
export const SaleSchema = `
  CREATE TABLE IF NOT EXISTS Sales
  (
    id         INTEGER PRIMARY KEY,
    cashflowId INT            NOT NULL,
    number     INT            NOT NULL,
    total      DECIMAL(10, 2) NOT NULL,
    date       DATETIME       NOT NULL
  );
`

export const SaleProductsSchema = `
  CREATE TABLE IF NOT EXISTS SaleProducts
  (
    id          INTEGER PRIMARY KEY,
    saleId      INTEGER NOT NULL,
    productId   INTEGER NOT NULL,
    productName TEXT    NOT NULL,
    qty         INTEGER NOT NULL,
    priceUnit   REAL    NOT NULL,
    bundleId    INTEGER NOT NULL
  );
`
