import { ReactElement, useContext } from 'react'
import { ITProduct } from '../../types/Definitions'
import ProductButton from '../ProductButton'
import ProductButtonAdd from '../ProductButtonAdd'
import { GeneralContext } from '../../context/GeneralContext'

export const ProductList = (Props: { productList: ITProduct[]; title: string }): ReactElement => {
  const { productList, title } = Props
  const { ViewMode } = useContext(GeneralContext)

  return (
    <>
      <h2 className="text-2xl">{title}</h2>
      <div className="flex content-start gap-4 flex-wrap">
        {productList.map((Product) => {
          return <ProductButton key={Product.id} Product={{ ...Product }} />
        })}

        {ViewMode === 'edit' ? <ProductButtonAdd /> : null}
      </div>
    </>
  )
}
