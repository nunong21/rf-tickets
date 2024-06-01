import { RippleSurface } from 'react-ripples-continued'
import { ReactElement, useContext } from 'react'
import { ProductsCartContext } from '../context/ProductsCartContext'

const ProductButton = (Props): ReactElement => {
  let ImageBGClass = Props.Product.buttonColor || 'bg-white'
  let TaxtColor = Props.Product.buttonTextColor || 'text-black'

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

  const AddProductToCart = (): void => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    AddProduct(Props.Product)
  }

  if (Props.Product.disabled) {
    return <></>
  }

  return (
    <RippleSurface onClick={AddProductToCart} className={"cursor-pointer"} opacity={0}>
      <div
        key={1}
        className={`rounded w-40 h-40 shadow p-4  select-none bg-cover bg-center ${ImageBGClass} ${TaxtColor}`}
        style={ImgBG}
      >
        <div className="flex flex-col h-full justify-between">
          <span className="text-2xl font-semibold">{Props.Product.name}</span>
          <span className="text-2xl font-semibold text-right">
            {Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(
              Props.Product.price
            )}
          </span>
        </div>
      </div>
    </RippleSurface>
  )
}

export default ProductButton
