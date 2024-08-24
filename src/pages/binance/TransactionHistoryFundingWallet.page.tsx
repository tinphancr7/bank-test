import binanceApi from '@/apiRequest/binance'
import { Select, SelectItem } from '@nextui-org/react'
import { Key, useCallback, useEffect, useState } from 'react'
import NextUITable from './NextTable'
import moment from 'moment'
const SELECT_TYPE_TRANSACTION = [
  {
    key: 'fund_p2p',
    name: 'P2P'
  },
  {
    key: 'fund_spot',
    name: 'Spot'
  }
]
function TransactionHistoryFundingWallet() {
  const [selectedTypeTransaction, setSelectedTypeTransaction] = useState<any>(
    new Set([SELECT_TYPE_TRANSACTION[0].key])
  )
  const [selectType] = [...selectedTypeTransaction]
  const [dataFUND_P2P, setDataFUND_P2P] = useState<any>([])
  const [dataFUND_SPOT, setDataFUND_SPOT] = useState<any>([])

  const getTransactionHistoryByType = async () => {
    const result = await binanceApi.getTransactionHistoryByType(selectType)
    if (selectType === 'fund_p2p') {
      const arrSELL = result?.data?.p2pHistorySELL
      const arrBUY = result?.data.p2pHistoryBUY
      const combined = arrSELL.concat(arrBUY)
      combined.sort((a: any, b: any) => {
        return b.createTime - a.createTime
      })
      setDataFUND_P2P(combined)
    }
    if (selectType === 'fund_spot') {
      setDataFUND_SPOT(result?.data)
    }
  }
  useEffect(() => {
    getTransactionHistoryByType()
  }, [selectedTypeTransaction])

  const columnsFUND_P2P = [
    {
      id: 'createTime',
      name: 'Thời gian'
    },
    {
      id: 'orderNumber',
      name: 'Order Number'
    },
    {
      id: 'payMethodName',
      name: 'Hình thức thanh toán'
    },
    {
      id: 'orderStatus',
      name: 'Tình trạng'
    },
    {
      id: 'tradeType',
      name: 'Loại'
    },
    {
      id: 'asset',
      name: 'Asset'
    },
    {
      id: 'unitPrice',
      name: 'Tỉ giá'
    },
    {
      id: 'totalPrice',
      name: 'Tổng tiền'
    },
    {
      id: 'counterPartNickName',
      name: 'Người bán'
    }
  ]

  const columnsFUND_SPOT = [
    {
      id: 'timestamp',
      name: 'Thời gian'
    },
    {
      id: 'tranId',
      name: 'Transaction ID'
    },
    {
      id: 'amount',
      name: 'Tiền'
    },
    {
      id: 'asset',
      name: 'Asset'
    },
    {
      id: 'status',
      name: 'Tình trạng'
    },
    {
      id: 'type',
      name: 'Loại'
    }
  ]

  const renderCellP2P = useCallback((data: any, columnKey: Key) => {
    const cellValue = data[columnKey as any]
    switch (columnKey) {
      case 'createTime':
        return <p>{moment(data.createTime).format('DD-MM-YYYY HH:mm:ss')}</p>
      case 'orderNumber':
        return <p>{data.orderNumber}</p>
      case 'asset':
        return (
          <p>
            {Number(data.amount).toFixed(5)}-{data.asset}
          </p>
        )
      case 'totalPrice':
        return (
          <p>
            {data.totalPrice}-{data.fiat}
          </p>
        )
      case 'unitPrice':
        return (
          <p>
            {data.unitPrice}-{data.fiat}
          </p>
        )
      case 'counterPartNickName':
        return <p>{data.counterPartNickName}</p>

      default:
        return cellValue
    }
  }, [])

  const renderCellSPOT = useCallback((data: any, columnKey: Key) => {
    const cellValue = data[columnKey as any]
    switch (columnKey) {
      case 'timestamp':
        return <p>{moment(data.timestamp).format('DD-MM-YYYY HH:mm:ss')}</p>
      case 'tranId':
        return <p>{data.tranId}</p>
      case 'type':
        if (data.type === 'FUNDING_MAIN') {
          return <p>Chuyển từ Ví Funding Sang Ví SPOT</p>
        }
        return <p>Chuyển từ Ví SPOT Sang Ví Funding </p>

      default:
        return cellValue
    }
  }, [])
  return (
    <div>
      <Select
        variant='bordered'
        label='Loại giao dịch'
        className='max-w-xs'
        labelPlacement='outside-left'
        classNames={{
          label: 'w-[200px] my-auto'
        }}
        disallowEmptySelection={true}
        selectedKeys={selectedTypeTransaction}
        onSelectionChange={setSelectedTypeTransaction}
      >
        {SELECT_TYPE_TRANSACTION.map((item) => (
          <SelectItem key={item.key}>{item.name}</SelectItem>
        ))}
      </Select>
      {selectType === 'fund_p2p' ? (
        <>
          <NextUITable
            columns={columnsFUND_P2P}
            data={dataFUND_P2P}
            renderCell={renderCellP2P}
          />
        </>
      ) : (
        <>
          <NextUITable
            columns={columnsFUND_SPOT}
            data={dataFUND_SPOT}
            renderCell={renderCellSPOT}
          />
        </>
      )}
    </div>
  )
}

export default TransactionHistoryFundingWallet
