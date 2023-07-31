import ProductButton from '../components/ProductButton'
import { useEffect, useState } from 'react'
import CartList from '../components/CartList'
import { ProductList } from '../content/ProductList'
import ProductsCartContextProvider from '../context/ProductsCartContext'
import Menu from '../components/Menu'

function Main(): JSX.Element {
  const ProductsLocal = ProductList

  const [Products, setProducts] = useState(ProductsLocal)

  useEffect(() => {
    setProducts(ProductsLocal)
  }, [])

  return (
    <div className="h-screen grid grid-cols-[auto_33%] grid-rows-[4rem_auto]">
      <Menu></Menu>
      <ProductsCartContextProvider>
        <div className="row-start-2 p-4 flex content-start gap-4 flex-wrap overflow-y-auto max-h-[calc(100vh-4rem)] bg-slate-200">
          {Products.map((Product) => {
            return <ProductButton key={Product.id} Product={{ ...Product }} />
          })}
        </div>
        <div className="row-start-2 overflow-y-auto max-h-[calc(100vh-4rem)] bg-white">
          <CartList></CartList>
        </div>
      </ProductsCartContextProvider>
    </div>
  )
}

export default Main
