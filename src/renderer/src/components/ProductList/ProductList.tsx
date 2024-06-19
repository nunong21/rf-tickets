import { ReactElement } from 'react'
import {
  ProductListBundles,
  ProductListDrinks,
  ProductListFood
} from '../../content/ProductListDrinks'
import { ProductListSingle } from './ProductListSingle'

export const ProductList = (): ReactElement => {
  return (
    <div className="row-start-2 p-4 flex flex-col content-start gap-4 overflow-y-auto max-h-[calc(100vh-2rem)] bg-slate-200">
      <ProductListSingle productList={ProductListDrinks} title={'Bebidas'} />
      <ProductListSingle productList={ProductListFood} title={'Comidas'} />
      {ProductListBundles.length ? (
        <ProductListSingle productList={ProductListBundles} title={'Outros'} />
      ) : null}
    </div>
  )
}
