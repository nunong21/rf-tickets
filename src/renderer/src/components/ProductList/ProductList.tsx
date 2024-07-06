import { ReactElement, useContext } from 'react'

import { ProductListSingle } from './ProductListSingle'
import { GeneralContext } from '../../context/GeneralContext'
import { ITProduct } from '../../types/Definitions'

export const ProductList = (): ReactElement => {
  const { ProductList } = useContext(GeneralContext)

  console.log(ProductList)
  const Drinks = ProductList.filter((p: ITProduct) => (p.category as number) === 1)
  const Foods = ProductList.filter((p: ITProduct) => (p.category as number) === 2)
  const Other = ProductList.filter(
    (p: ITProduct) => (p.category as number) != 2 && (p.category as number) != 1
  )

  return (
    <div className="row-start-2 p-4 flex flex-col content-start gap-4 overflow-y-auto max-h-[calc(100vh-2rem)] bg-slate-200">
      <ProductListSingle productList={Drinks} title={'Bebidas'} />
      <ProductListSingle productList={Foods} title={'Comidas'} />
      {Other.length ? <ProductListSingle productList={Other} title={'Outros'} /> : null}
    </div>
  )
}
