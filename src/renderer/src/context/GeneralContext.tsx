import { createContext, ReactElement, useState } from 'react'

const Default: any = {}

export const GeneralContext = createContext<any>(Default)

const GeneralContextProvider = ({ children: children }: any): ReactElement => {
  const [ViewMode, setViewMode] = useState('view')
  const [ProductList, setProductList] = useState(window.api.Products.getAllProducts())

  const ChangeViewMode = () => {
    if (ViewMode && ViewMode === 'view') {
      setViewMode('edit')
    } else {
      setViewMode('view')
    }
  }

  const RefreshProducts = () => {
    setProductList(window.api.Products.getAllProducts())
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
