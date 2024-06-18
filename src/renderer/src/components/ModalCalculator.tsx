import { ReactElement, useState } from 'react'
import { BiCalculator } from 'react-icons/bi'
import Coin from './Coin'
import { Button } from '@mui/material'

const ModalCalculator = (Props: { total: number }): ReactElement => {
  const CartTotal = Props.total ?? 0
  const [Money, setMoney] = useState(0)
  const [showModal, setShowModal] = useState(false)

  const Coins = [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1.0, 2.0, 5.0, 10.0, 20.0, 50.0]

  const CloseModal = () => {
    setMoney(0)
    setShowModal(false)
  }

  const ShowModal = () => {
    setMoney(0)
    setShowModal(true)
  }

  return (
    <>
      <Button onClick={ShowModal} variant={'contained'} className={'h-14 w-14 ml-4 p-0'}>
        <BiCalculator color="white" className={'w-8 h-8'}></BiCalculator>
      </Button>

      {showModal ? (
        <>
          <div
            className="flex justify-center items-center overflow-x-hidden overflow-y-auto
          absolute inset-0 z-40 outline-none focus:outline-none bg-opacity-60 bg-black left-0 top-0"
            onClick={CloseModal}
          ></div>

          <div
            className={
              'absolute flex flex-col justify-center items-center z-50 top-12 left-1/4 w-1/2'
            }
          >
            <div className={'w-full h-full bg-white rounded p-4 flex flex-col justify-between'}>
              <div className={'flex flex-wrap'}>
                {Coins.map((Value) => {
                  return (
                    <div className={'p-4 w-1/3'}>
                      <Button
                        variant="contained"
                        color={'info'}
                        className={'w-full h-20 text-2xl'}
                        onClick={() => setMoney(Money + Value)}
                      >
                        {Coin(Value)}
                      </Button>
                    </div>
                  )
                })}
              </div>

              <ul className={'flex flex-col gap-2 p-4'}>
                <li className={'flex justify-between text-3xl'}>
                  <span>Entregue:</span>
                  <span>{Coin(Money)}</span>
                </li>

                <li className={'flex justify-between text-3xl'}>
                  <span>Venda:</span>
                  <span>{Coin(CartTotal)}</span>
                </li>

                <li className={'flex justify-between'}>
                  <span>Troco:</span>
                  {Money - CartTotal > 0 ? (
                    <span className={'text-green-600'}>{Coin(Money - CartTotal)}</span>
                  ) : (
                    <span className={'text-red-600'}>{Coin(Money - CartTotal)}</span>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

export default ModalCalculator
