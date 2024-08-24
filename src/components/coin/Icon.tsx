/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image } from '@nextui-org/react'

export const ICON = ({ iconName }: any) => {
  switch (iconName) {
    case 'BTC':
      return (
        <Image
          width={40}
          height={40}
          alt='bitcoin'
          src='/public/coin-logo/BTC.png'
        />
      )
      break
    case 'ETH':
      return (
        <Image
          width={40}
          height={40}
          alt='eth'
          src='/public/coin-logo/ETH.png'
        />
      )
      break
    case 'USDT':
      return (
        <Image
          width={40}
          height={40}
          alt='eth'
          src='/public/coin-logo/USDT.png'
        />
      )
      break
    default:
      return <Image alt='eth' src='/public/coin-logo/eth.png' />
      break
  }
}
