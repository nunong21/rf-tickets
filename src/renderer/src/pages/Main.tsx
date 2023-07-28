import ProductButton from '../components/ProductButton'
import { useEffect, useState } from 'react'
import CartList from '../components/CartList'
import { ProductList } from '../content/ProductList'
import ProductsCartContextProvider from '../context/ProductsCartContext'

function Main(): JSX.Element {
  const ProductsLocal = ProductList

  const [Products, setProducts] = useState(ProductsLocal)

  useEffect(() => {
    setProducts(ProductsLocal)
  }, [])

  return (
    <div className="h-screen grid grid-cols-[auto_33%] grid-rows-[4rem_auto] gap-4">
      <div className="col-span-2 bg-green-100">Top menu</div>
      <ProductsCartContextProvider>
        <div className="row-start-2 p-4 flex content-start gap-4 flex-wrap overflow-y-auto max-h-[calc(100vh-6rem)]">
          {Products.map((Product) => {
            return <ProductButton key={Product.id} Product={{ ...Product }} />
          })}
        </div>
        <div className="row-start-2 overflow-y-auto max-h-[calc(100vh-6rem)]">
          <CartList></CartList>
        </div>
      </ProductsCartContextProvider>
    </div>
  )
}

export default Main
