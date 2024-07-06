import { Box, Button, Fade, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ITProduct } from '../types/Definitions'
import { ReactElement, useContext } from 'react'
import { GeneralContext } from '../context/GeneralContext'
import { DBProductsDelete, DBProductsInsert, DBProductsUpdate } from '../context/DBClient'

interface IProductModalParams {
  handleClose: (event?: {}, reason?: 'backdropClick' | 'escapeKeyDown') => void
  open: boolean
  Product?: ITProduct
}

interface IProductForm {
  productName: string
  productPrice: number
  productCategory: number
  productOrder?: number
  productId?: number
  productButtonColor?: string
}

interface IProductDeleteForm {
  productId: number
}

const ProductModal = (Props: IProductModalParams): ReactElement => {
  const { RefreshProducts } = useContext(GeneralContext)

  const Product = Props.Product || null

  const ProductButtonColors = [
    'bg-amber-300',
    'bg-amber-500',
    'bg-amber-600',
    'bg-blue-600',
    'bg-green-500',
    'bg-green-600',
    'bg-purple-400',
    'bg-red-500',
    'bg-sky-300',
    'bg-yellow-600',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-400',
    'bg-cyan-500',
    'bg-lime-500',
    'bg-fuchsia-500',
    'bg-rose-500',
    'bg-orange-500',
    'bg-violet-500',
    'bg-emerald-500'
  ]

  const { register, handleSubmit, control, formState, reset } = useForm<IProductForm>()
  const onSubmit: SubmitHandler<IProductForm> = (data) => {
    if (data.productId && (data.productId as number) > 0) {
      DBProductsUpdate({
        id: data.productId,
        name: data.productName,
        price: data.productPrice ?? 0,
        order: data.productOrder ?? 0,
        category: data.productCategory,
        buttonColor: data.productButtonColor ?? 'bg-amber-300'
      })
    } else {
      DBProductsInsert({
        name: data.productName,
        price: data.productPrice ?? 0,
        order: data.productOrder ?? 0,
        category: data.productCategory,
        buttonColor: data.productButtonColor ?? 'bg-amber-300'
      })

      reset()
    }

    RefreshProducts()
    Props.handleClose()
  }

  const { register: registerDeleteForm, handleSubmit: handleDeleteSubmit } =
    useForm<IProductDeleteForm>()

  const onDelete: SubmitHandler<IProductDeleteForm> = (data) => {
    DBProductsDelete(data.productId)
    RefreshProducts()
    onModalClose()
  }

  const onModalClose = (event?: {}, reason?: 'backdropClick' | 'escapeKeyDown') => {
    reset()
    Props.handleClose(event, reason)
  }

  return (
    <Modal open={Props.open} onClose={onModalClose} closeAfterTransition>
      <Fade in={Props.open}>
        <Box
          className={
            'absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-6 rounded shadow flex flex-col w-1/2'
          }
        >
          {Product ? (
            <Typography variant={'h5'}>
              Atualizar artigo <strong>{Product.name}</strong>
            </Typography>
          ) : (
            <Typography variant={'h5'}>Inserir novo artigo</Typography>
          )}

          <form
            id={'productInsertUpdate'}
            className={'mt-12 flex flex-col gap-8'}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <input type={'hidden'} defaultValue={Product?.id ?? 0} {...register('productId')} />

            <TextField
              required
              id="product-name"
              label="Nome do artigo"
              defaultValue={Product?.name ?? ''}
              fullWidth
              {...register('productName', { required: true })}
              error={!!formState.errors.productName}
            />

            <TextField
              required
              id="product-price"
              label={'Preço do artigo'}
              defaultValue={Product?.price ?? ''}
              type={'number'}
              {...register('productPrice', { required: true })}
              error={!!formState.errors.productPrice}
            />

            <TextField
              id="product-order"
              label={'Ordenação (1 até 100)'}
              defaultValue={Product?.order ?? ''}
              type={'number'}
              {...register('productOrder')}
              error={!!formState.errors.productOrder}
            />

            <Controller
              control={control}
              name={'productCategory'}
              rules={{ required: true, min: 1, max: 3 }}
              defaultValue={Product?.category ?? 0}
              render={({ field }) => (
                <Select {...field} error={!!formState.errors.productCategory}>
                  <MenuItem value={0} disabled>
                    -- Categoria --
                  </MenuItem>
                  <MenuItem value={1} selected={(Product?.category as number) === 1}>
                    Bebidas
                  </MenuItem>
                  <MenuItem value={2} selected={(Product?.category as number) === 2}>
                    Comidas
                  </MenuItem>
                  <MenuItem value={3} selected={(Product?.category as number) === 3}>
                    Outros
                  </MenuItem>
                </Select>
              )}
            />

            <Controller
              control={control}
              name={'productButtonColor'}
              rules={{ required: true }}
              defaultValue={Product?.buttonColor ?? 'bg-amber-500'}
              render={({ field }) => (
                <Select {...field} error={!!formState.errors.productButtonColor}>
                  {ProductButtonColors.map((color) => {
                    return (
                      <MenuItem value={color} id={color} key={color}>
                        <div className={'flex items-center py-2'}>
                          <div className={`rounded-full w-6 h-6 mr-2 ${color}`}></div>
                          {color}
                        </div>
                      </MenuItem>
                    )
                  })}
                </Select>
              )}
            />
          </form>

          <form
            onSubmit={handleDeleteSubmit(onDelete)}
            className={'invisible'}
            id={'productDeleteForm'}
          >
            <input type={'hidden'} value={Product?.id ?? 0} {...registerDeleteForm('productId')} />
          </form>

          <div className={'mt-8'}>
            {Product ? (
              <div className={'flex gap-4'}>
                <Button
                  type={'submit'}
                  variant={'contained'}
                  size={'large'}
                  color={'error'}
                  form={'productDeleteForm'}
                >
                  Apagar
                </Button>

                <Button
                  form="productInsertUpdate"
                  type={'submit'}
                  variant={'contained'}
                  size={'large'}
                  className={'flex-1'}
                >
                  Atualizar
                </Button>
              </div>
            ) : (
              <Button
                form="productInsertUpdate"
                type={'submit'}
                variant={'contained'}
                size={'large'}
              >
                Adicionar
              </Button>
            )}
          </div>
        </Box>
      </Fade>
    </Modal>
  )
}

export default ProductModal
