/* eslint-disable @typescript-eslint/no-explicit-any */
import binanceApi from '@/apiRequest/binance'
import { ICON } from '@/components/coin/Icon'
import { Spinner } from '@nextui-org/react'
import { useEffect, useMemo, useState } from 'react'
import TransactionHistory from './TransactionHistory.page'

function BinanceManageAccount() {
  const [data, setData] = useState<any>(null)
  const [rateBTC, setRateBTC] = useState(0)
  const [rateETH, setRateETH] = useState(0)
  const getDetailAccount = async () => {
    const result: any = await binanceApi.getDetailAccount()
    setData(result?.data)
    setRateBTC(result?.data?.resRateBTCUSDT?.data?.price)
    setRateETH(result?.data?.resRateETHUSDT?.data?.price)
  }

  const funcSum = (data: any) => {
    return data?.reduce((item: any, currentValue: any) => {
      if (currentValue.asset === 'BTC') {
        return (
          item +
          (Number(currentValue.free) + Number(currentValue.locked)) * rateBTC
        )
      }
      if (currentValue.asset === 'ETH') {
        return (
          item +
          (Number(currentValue.free) + Number(currentValue.locked)) * rateETH
        )
      }
      return item + Number(currentValue.free) + Number(currentValue.locked)
    }, 0)
  }

  const sum = useMemo(() => {
    const spotWallet = funcSum(data?.spotWallet)
    const fundingWallet = funcSum(data?.fundingWallet)
    return spotWallet + fundingWallet
  }, [data])
  useEffect(() => {
    getDetailAccount()
  }, [])
  const WALLET = [
    {
      key: 'spotWallet',
      name: 'Ví Spot'
    },
    {
      key: 'fundingWallet',
      name: 'Ví Fuding'
    }
  ]

  const renderToUSDT = (coinName: any, total: any) => {
    switch (coinName) {
      case 'BTC': {
        const z = total * rateBTC
        return z.toFixed(2)
      }
      case 'ETH': {
        const z = total * rateETH
        return z.toFixed(2)
      }

      default:
        return Number(total).toFixed(2)
    }
  }
  const renderWallet = (item: any) => {
    return (
      <div className='w-[300px]'>
        <h1 className='text-2xl my-4'>{item.name}</h1>
        <div className='flex justify-between border p-4'>
          <p>Đồng coin</p>
          <p>Tổng</p>
        </div>
        <div className='border px-4'>
          {data &&
            data?.[item.key]?.map((value: any) => {
              return (
                <div
                  key={value.asset}
                  className='flex justify-between items-center my-4'
                >
                  <div className='flex justify-center items-center gap-4'>
                    <ICON iconName={value.asset} />
                    <p>{value.asset}</p>
                  </div>
                  <div>
                    <p>
                      {(Number(value.free) + Number(value.locked)).toFixed(8)}
                    </p>

                    <p>
                      ~
                      {renderToUSDT(
                        value.asset,
                        (Number(value.free) + Number(value.locked)).toFixed(8)
                      )}
                      $
                    </p>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className='text-3xl'>Tổng quan về tài khoản</h1>
      <div className='mt-4'>
        {!data ? (
          <div className='text-center'>
            <Spinner />
            <h1 className='text-2xl'>
              Bạn chưa thêm API Key của Binance hoặc API Lỗi
            </h1>
          </div>
        ) : (
          <>
            <div className='flex gap-4 mb-4'>
              <h1>Tổng giá trị: </h1>
              <p>~ {sum.toFixed(2)} USDT</p>
            </div>

            <div className='flex gap-8'>
              {WALLET.map((item, index) => {
                return <div key={index}>{renderWallet(item)}</div>
              })}
            </div>
          </>
        )}
      </div>
      <TransactionHistory />
    </div>
  )
}

export default BinanceManageAccount
