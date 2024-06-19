import CartList from '../components/CartList'
import {
  ProductListDrinks,
  ProductListFood,
  ProductListBundles
} from '../content/ProductListDrinks'
import ProductsCartContextProvider from '../context/ProductsCartContext'
import Menu from '../components/Menu'
import GeneralContextProvider from '../context/GeneralContext'
import { ProductList } from '../components/ProductList/ProductList'

function Main(): JSX.Element {
  return (
    <div className="h-screen grid grid-cols-[auto_33%]">
      <GeneralContextProvider>
        <Menu></Menu>
        <ProductsCartContextProvider>
          <div className="row-start-2 p-4 flex flex-col content-start gap-4 overflow-y-auto max-h-[calc(100vh-2rem)] bg-slate-200">
            <ProductList productList={ProductListDrinks} title={'Bebidas'} />
            <ProductList productList={ProductListFood} title={'Comidas'} />
            <ProductList productList={ProductListBundles} title={''} />
          </div>
          <div className="row-start-2 overflow-y-auto max-h-[calc(100vh-2rem)] bg-white">
            <CartList></CartList>
          </div>
        </ProductsCartContextProvider>
      </GeneralContextProvider>
    </div>
  )
}

export default Main
