import { ReactElement, useState } from 'react'
import { Button } from '@mui/material'
import ProductModal from './ProductModal'
import AddIcon from '@mui/icons-material/Add'

const ProductButtonAdd = (): ReactElement => {
  const [openEdit, setOpenEditEdit] = useState(false)
  const handleOpenEdit = () => setOpenEditEdit(true)
  const handleCloseEdit = () => setOpenEditEdit(false)

  return (
    <>
      <Button onClick={handleOpenEdit} variant={'outlined'} color={'info'}>
        <div className={`w-40 h-40 flex flex-col justify-center items-center`}>
          <AddIcon className={'h-16 w-16 mb-2'} />
          <span className="text-xl font-semibold">Adicionar</span>
        </div>
      </Button>

      <ProductModal open={openEdit} handleClose={handleCloseEdit} />
    </>
  )
}

export default ProductButtonAdd
