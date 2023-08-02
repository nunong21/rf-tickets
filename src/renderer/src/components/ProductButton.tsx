import Ripples from 'react-ripples'
import { ReactElement, useContext } from 'react'
import { ProductsCartContext } from '../context/ProductsCartContext'

const ProductButton = (Props): ReactElement => {
  let ImageBGClass = 'bg-white'
  let ImgBG = {}
  if (Props.Product.image) {
    const imageUrl = new URL('icon.png', import.meta.url).href
    console.log(imageUrl)
    ImageBGClass = ''
    ImgBG = {
      backgroundImage: `url('${imageUrl}')`
    }
  }

  const { AddProduct } = useContext(ProductsCartContext)

  const AddProductToCart = (): void => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    AddProduct(Props.Product)
  }

  return (
    <Ripples>
      <div
        key={1}
        className={`rounded w-52 h-52 shadow p-4 cursor-pointer select-none bg-cover ${ImageBGClass}`}
        style={ImgBG}
        onClick={AddProductToCart}
      >
        <div className="flex flex-col h-full justify-between">
          <span className="text-3xl font-semibold">{Props.Product.name}</span>
          <span className="text-2xl font-semibold text-right">
            {Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(
              Props.Product.price
            )}
          </span>
        </div>
      </div>
    </Ripples>
  )
}

export default ProductButton
