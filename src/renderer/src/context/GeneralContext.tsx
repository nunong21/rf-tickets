import { createContext, ReactElement, useState } from 'react'
import { productsGetAll } from './DBClient'

const Default: any = {}

export const GeneralContext = createContext<any>(Default)

const GeneralContextProvider = ({ children: children }: any): ReactElement => {
  const [ViewMode, setViewMode] = useState('view')
  const [ProductList, setProductList] = useState(productsGetAll)

  const ChangeViewMode = () => {
    if (ViewMode && ViewMode === 'view') {
      setViewMode('edit')
    } else {
      setViewMode('view')
    }
  }

  const RefreshProducts = () => {
    setProductList(productsGetAll)
  }

  return (
    <GeneralContext.Provider
      value={{
        ChangeViewMode: ChangeViewMode,
        RefreshProducts: RefreshProducts,
        ProductList: ProductList,
        ViewMode: ViewMode
      }}
    >
      {children}
    </GeneralContext.Provider>
  )
}

export default GeneralContextProvider
