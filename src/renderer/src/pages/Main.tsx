import ProductButton from '../components/ProductButton'
import CartList from '../components/CartList'
import { ProductList, ProductListFood, ProductListBundles } from '../content/ProductList'
import ProductsCartContextProvider from '../context/ProductsCartContext'
import Menu from '../components/Menu'

function Main(): JSX.Element {
  return (
    <div className="h-screen grid grid-cols-[auto_33%] grid-rows-[4rem_auto]">
      <Menu></Menu>
      <ProductsCartContextProvider>
        <div className="row-start-2 p-4 flex flex-col content-start gap-4 overflow-y-auto max-h-[calc(100vh-4rem)] bg-slate-200">
          <h2 className="text-2xl">Bebidas</h2>
          <div className="flex content-start gap-4 flex-wrap">
            {ProductList.map((Product) => {
              return <ProductButton key={Product.id} Product={{ ...Product }} />
            })}
          </div>

          <h2 className="text-2xl">Comidas</h2>
          <div className="flex content-start gap-4 flex-wrap">
            {ProductListFood.map((Product) => {
              return <ProductButton key={Product.id} Product={{ ...Product }} />
            })}
          </div>

          <h2 className="text-2xl">Bundles</h2>
          <div className="flex content-start gap-4 flex-wrap">
            {ProductListBundles.map((Product) => {
              return <ProductButton key={Product.id} Product={{ ...Product }} />
            })}
          </div>
        </div>
        <div className="row-start-2 overflow-y-auto max-h-[calc(100vh-4rem)] bg-white">
          <CartList></CartList>
        </div>
      </ProductsCartContextProvider>
    </div>
  )
}

export default Main
