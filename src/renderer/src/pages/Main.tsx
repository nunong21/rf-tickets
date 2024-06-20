import CartList from '../components/CartList'
import ProductsCartContextProvider from '../context/ProductsCartContext'
import Menu from '../components/Menu'
import GeneralContextProvider from '../context/GeneralContext'
import { ProductList } from '../components/ProductList/ProductList'

function Main(): JSX.Element {
  return (
    <div className="h-screen grid grid-cols-[auto_33%]">
      <GeneralContextProvider>
        <Menu />
        <ProductsCartContextProvider>
          <ProductList />
          <div className="row-start-2 overflow-y-auto max-h-[calc(100vh-2rem)] bg-white">
            <CartList />
          </div>
        </ProductsCartContextProvider>
      </GeneralContextProvider>
    </div>
  )
}

export default Main
