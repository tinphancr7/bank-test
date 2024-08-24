import binanceApi from '@/apiRequest/binance'
import moment from 'moment'
import { Key, useCallback, useEffect, useState } from 'react'
import NextUITable from './NextTable'

const columns = [
  {
    id: 'transactionTime',
    name: 'Thời gian'
  },
  {
    id: 'orderId',
    name: 'Transaction ID'
  },
  {
    id: 'amount',
    name: 'Tiền'
  },
  {
    id: 'note',
    name: 'Note'
  },
  {
    id: 'payerInfo',
    name: 'Nguời trả'
  },
  {
    id: 'receiverInfo',
    name: 'Nguời nhận'
  }
]

function TransactionHistoryBinancePay() {
  const [dataPay, setDataPay] = useState([])
  const renderCell = useCallback((data: any, columnKey: Key) => {
    const cellValue = data[columnKey as any]
    switch (columnKey) {
      case 'transactionTime':
        return (
          <p>{moment(data.transactionTime).format('DD-MM-YYYY HH:mm:ss')}</p>
        )
      case 'amount':
        return (
          <p>
            {data.amount} {data.currency}
          </p>
        )
      case 'payerInfo':
        return <p>{data.payerInfo.binanceId}</p>
      case 'receiverInfo':
        return (
          <>
            <p>{data.receiverInfo.name}</p>
            <p>{data.receiverInfo.accountId}</p>
          </>
        )
      default:
        return cellValue
    }
  }, [])
  const getTransactionHistoryBinancePay = async () => {
    const result = await binanceApi.getTransactionHistoryBinancePay()
    setDataPay(result.data)
  }

  useEffect(() => {
    getTransactionHistoryBinancePay()
  }, [])
  return (
    <div>
      <NextUITable columns={columns} data={dataPay} renderCell={renderCell} />
    </div>
  )
}

export default TransactionHistoryBinancePay
