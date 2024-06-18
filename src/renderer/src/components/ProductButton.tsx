import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useContext } from 'react'
import { ProductsCartContext } from '../context/ProductsCartContext'
import { Button } from '@mui/material'
import Coin from './Coin'

const ProductButton = (Props: {
  Product: {
    buttonColor?: string | null | undefined
    buttonTextColor?: string | null | undefined
    image?: any
    disabled?: any
    name:
      | string
      | number
      | boolean
      | ReactElement<any, string | JSXElementConstructor<any>>
      | Iterable<ReactNode>
      | ReactPortal
      | null
      | undefined
    price: number | bigint
  }
}): ReactElement => {
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

  const AddProductToCart = (): void => {
    AddProduct(Props.Product)
  }

  if (Props.Product.disabled) {
    return <></>
  }

  return (
    <Button onClick={AddProductToCart} className={`${ImageBGClass} ${TextColor}`}>
      <div className={`w-40 h-40 bg-cover bg-center text-left ${TextColor}`} style={ImgBG}>
        <div className="flex flex-col h-full justify-between">
          <span className="text-xl font-semibold">{Props.Product.name}</span>
          <span className="text-2xl font-semibold text-right">{Coin(Props.Product.price)}</span>
        </div>
      </div>
    </Button>
  )
}

export default ProductButton
