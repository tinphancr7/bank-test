import ListboxWrapper from '@/components/ui/ListboxWrapper'
import NextInput from '@/components/ui/NextInput'
import NextTable from '@/components/ui/NextTable'
import { Button, Listbox, ListboxItem } from '@nextui-org/react'
import { Key, useCallback, useEffect } from 'react'
import { columns } from './columns'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { getListTransactions } from '@/redux/slices/transaction.slice'
import moment from 'moment'
import { useSearchParams } from 'react-router-dom'
import useQueryString from '@/hooks/useQueryString'

const TransactionHistory = () => {
  let [searchParams] = useSearchParams()
  const { page, limit } = useQueryString()
  const dispatch = useAppDispatch()

  const { bankDetail } = useSelector((state: RootState) => state.bankDetail)
  const { listTransactions, totalItems, totalPages } = useSelector(
    (state: RootState) => state.transaction
  )

  const renderCell = useCallback((transaction: any, columnKey: Key) => {
    const cellValue = transaction[columnKey as keyof any]

    switch (columnKey) {
      case 'when':
        return <p>{moment(transaction?.when).format('HH:mm DD/MM/YYYY')}</p>
      case 'amount':
        return (
          <p className={cellValue > 0 ? 'text-green-600' : 'text-red-400'}>
            {cellValue?.toLocaleString()}
          </p>
        )
      case 'runningBalance':
        return (
          <p className={cellValue >= 0 ? 'text-green-600' : 'text-red-400'}>
            {cellValue?.toLocaleString()}
          </p>
        )
      default:
        return cellValue
    }
  }, [])

  useEffect(() => {
    dispatch(
      getListTransactions({
        _id: bankDetail?.id,
        filter: searchParams.toString()
      })
    )
  }, [page, limit])

  return (
    <div className='grid grid-cols-12 gap-x-5'>
      <div className='col-span-2 flex flex-col gap-2'>
        <div>
          <Button radius='none' className='bg-white border w-full'>
            Tất cả giao dịch
          </Button>
        </div>
        <div>
          <p>Tài khoản</p>
          <p className='bg-primary p-2 text-white line-clamp-1'>
            {bankDetail?.accountName}
          </p>
        </div>
        <div className='w-full'>
          <p>Loại</p>
          <ListboxWrapper>
            <Listbox
              aria-label='Multiple selection example'
              variant='flat'
              disallowEmptySelection
              selectionMode='single'
              classNames={{
                base: 'p-0'
              }}
              itemClasses={{
                base: 'rounded-none'
              }}
            >
              <ListboxItem key='text'>Tất cả</ListboxItem>
              <ListboxItem key='number'>Tiền vào</ListboxItem>
              <ListboxItem key='date'>Tiền ra</ListboxItem>
            </Listbox>
          </ListboxWrapper>
        </div>
        <div className='w-full'>
          <p>Thời gian</p>
          <ListboxWrapper>
            <Listbox
              aria-label='Multiple selection example'
              variant='flat'
              disallowEmptySelection
              selectionMode='single'
              classNames={{
                base: 'p-0'
              }}
              itemClasses={{
                base: 'rounded-none'
              }}
            >
              <ListboxItem key='text'>Trong 30 ngày</ListboxItem>
              <ListboxItem key='number'>Tháng này</ListboxItem>
              <ListboxItem key='date'>Tháng trước</ListboxItem>
              <ListboxItem key='single_date'>Tháng 6</ListboxItem>
            </Listbox>
          </ListboxWrapper>
        </div>
        <div className='w-full'>
          <p>Sự kiện</p>
          <ListboxWrapper>
            <Listbox
              aria-label='Multiple selection example'
              variant='flat'
              disallowEmptySelection
              selectionMode='single'
              classNames={{
                base: 'p-0'
              }}
              itemClasses={{
                base: 'rounded-none'
              }}
            >
              <ListboxItem key='text'>Tất cả</ListboxItem>
              <ListboxItem key='number'>Thử lại</ListboxItem>
              <ListboxItem key='date'>Tạm giữ</ListboxItem>
              <ListboxItem key='single_date'>Thất bại</ListboxItem>
            </Listbox>
          </ListboxWrapper>
        </div>
        <div className='flex justify-center gap-x-2'>
          <Button className='rounded-md' radius='none'>
            Reset
          </Button>
          <Button className='rounded-md bg-primary text-white' radius='none'>
            Lọc
          </Button>
        </div>
      </div>
      <div className='col-span-10'>
        <div className='mb-4'>
          <NextInput
            placeholder='Lọc nhanh...'
            name='name'
            aria-label='Lọc nhanh'
            className='!mt-0 block w-full'
          />
        </div>
        <div>
          <NextTable
            columns={columns}
            data={listTransactions}
            renderCell={renderCell}
            totalPages={totalItems}
            totalItems={totalPages}
          />
        </div>
      </div>
    </div>
  )
}

export default TransactionHistory
