import { ReactElement, useContext, useState } from 'react'
import { ProductsCartContext } from '../context/ProductsCartContext'
import { Button } from '@mui/material'
import Coin from './Coin'
import { GeneralContext } from '../context/GeneralContext'
import { Edit } from '@mui/icons-material'
import ProductModal from './ProductModal'
import { ITProduct } from '../types/Definitions'

const ProductButton = (Props: { Product: ITProduct }): ReactElement => {
  let ImageBGClass = Props.Product.buttonColor || 'bg-white'
  let TextColor = Props.Product.buttonTextColor || 'text-black'

  let ImgBG = {}
  if (Props.Product.image) {
    const imageUrl = new URL(`/src/assets/Products/${Props.Product.image}`, import.meta.url).href
    ImageBGClass = ''
    ImgBG = {
      // backgroundImage: `url('file:///../resources/Products/Cartaz_sardinhas.png')`
      backgroundImage: `url('${imageUrl}')`
    }
  }

  const { AddProduct } = useContext(ProductsCartContext)
  const { ViewMode } = useContext(GeneralContext)

  const [openEdit, setOpenEditEdit] = useState(false)
  const handleOpenEdit = () => setOpenEditEdit(true)
  const handleCloseEdit = () => setOpenEditEdit(false)

  const AddProductToCart = (): void => {
    AddProduct(Props.Product)
  }

  if (Props.Product.disabled) {
    return <></>
  }

  return (
    <>
      <Button
        onClick={ViewMode === 'view' ? AddProductToCart : handleOpenEdit}
        className={`${ImageBGClass} ${TextColor}`}
      >
        <div
          className={`w-40 h-40 relative bg-cover bg-center text-left ${TextColor}`}
          style={ImgBG}
        >
          {ViewMode === 'edit' ? (
            <div
              className={
                'absolute w-full h-full flex flex-col items-center justify-center opacity-20'
              }
            >
              <Edit color={'inherit'} className={'w-12 h-12'}>
                Teste
              </Edit>
            </div>
          ) : null}
          <div className="flex flex-col h-full justify-between">
            <span className="text-xl font-semibold">{Props.Product.name}</span>
            <span className="text-2xl font-semibold text-right">{Coin(Props.Product.price)}</span>
          </div>
        </div>
      </Button>

      <ProductModal Product={Props.Product} open={openEdit} handleClose={handleCloseEdit} />
    </>
  )
}

export default ProductButton
