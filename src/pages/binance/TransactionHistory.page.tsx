/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tab, Tabs } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import TransactionHistoryFundingWallet from './TransactionHistoryFundingWallet.page'
import TransactionHistoryBinancePay from './TransactionHistoryBinancePay.page'

function TransactionHistory() {
  const [selectedTab, setSelectedTab] = useState<any>('fundingWallet')

  return (
    <div className='my-4'>
      <h1 className='text-2xl'>Lịch sử giao dịch</h1>
      <div className='flex w-full flex-col'>
        <Tabs
          aria-label='Options'
          color='primary'
          variant='bordered'
          radius='none'
          className='my-4'
          defaultSelectedKey={selectedTab}
        >
          <Tab
            key='fundingWallet'
            title={
              <div className='flex items-center space-x-2'>
                {/* <GalleryIcon /> */}
                <span>Ví Funding</span>
              </div>
            }
          >
            <div className='border p-4'>
              <TransactionHistoryFundingWallet />
            </div>
          </Tab>
          <Tab
            key='binancePay'
            title={
              <div className='flex items-center space-x-2'>
                {/* <MusicIcon /> */}
                <span>Binance Pay</span>
              </div>
            }
          >
            <div className='border p-4'>
              <TransactionHistoryBinancePay />
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default TransactionHistory
