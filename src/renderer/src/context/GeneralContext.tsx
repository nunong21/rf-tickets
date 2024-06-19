import { createContext, ReactElement, useState } from 'react'

const Default: any = {}

export const GeneralContext = createContext<any>(Default)

const GeneralContextProvider = ({ children: children }: any): ReactElement => {
  const [ViewMode, setViewMode] = useState('view')

  const ChangeViewMode = () => {
    if (ViewMode && ViewMode === 'view') {
      setViewMode('edit')
    } else {
      setViewMode('view')
    }
  }

  return (
    <GeneralContext.Provider
      value={{
        ChangeViewMode: ChangeViewMode,
        ViewMode: ViewMode
      }}
    >
      {children}
    </GeneralContext.Provider>
  )
}

export default GeneralContextProvider
