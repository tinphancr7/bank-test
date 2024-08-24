import { useEffect } from 'react'
import CardBank from './components/cards/card.bank'
import NextInput from '@/components/ui/NextInput'
import CardTransaction from './components/cards/card.transaction'
import CardTotalTransaction from './components/cards/card.total.transaction'
import { Button } from '@nextui-org/react'
import { Link, useParams } from 'react-router-dom'
import { MdOutlineArrowRightAlt } from 'react-icons/md'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { getBankDetail } from '@/redux/slices/bank.detail.slice'
import ConnectionStatus from './components/status/connection.status'
import TransactionHistory from './components/tables/TransactionHistory'

const BankDetail = () => {
  let { id } = useParams()
  const dispatch = useAppDispatch()

  const { bankDetail } = useSelector((state: RootState) => state.bankDetail)

  useEffect(() => {
    dispatch(getBankDetail(id || ''))
  }, [id])

  if (!bankDetail) {
    return (
      <div>
        <Link
          to='/bank-management'
          className='flex items-center gap-2 w-fit p-2'
        >
          <MdOutlineArrowRightAlt className='rotate-180' />
          Quay lại
        </Link>
        <div>Ngân hàng không tồn tại</div>
      </div>
    )
  }

  return (
    <div>
      <div className='mb-4'>
        <Link
          to='/bank-management'
          className='flex items-center gap-2 w-fit p-2'
        >
          <MdOutlineArrowRightAlt className='rotate-180' />
          Quay lại
        </Link>
      </div>
      <div className='flex items-start gap-x-5 mb-4'>
        <div onClick={() => alert('dsad')}>
          {bankDetail && <CardBank item={bankDetail} />}
        </div>
        <div className='w-[350px]'>
          <form>
            <NextInput
              placeholder='Tên gợi nhớ'
              name='name'
              aria-label='Tên gợi nhớ'
              className='!mt-0 block w-full'
            />
            <div className='flex justify-between my-4'>
              <p>Ngân hàng</p>
              <p>{bankDetail?.bankName}</p>
            </div>
            <div className='flex justify-between my-4'>
              <p>Trạng thái</p>
                <ConnectionStatus status={bankDetail?.connectStatus} />
            </div>
          </form>
        </div>
      </div>
      <div className='grid grid-cols-12 gap-x-4 mb-4'>
        <div className='col-span-4'>
          <CardTransaction />
        </div>
        <div className='col-span-4'>
          <CardTransaction />
        </div>
        <div className='col-span-4'>
          <CardTotalTransaction />
        </div>
      </div>
      <div className='mb-4'>
        <h3 className='mb-2'>Thiết lập</h3>
        <div className='flex gap-x-2'>
          <Button radius='sm' className='border bg-transparent'>
            Thay đổi ngày bắt đầu kết nối
          </Button>
          <Button radius='sm' className='border bg-transparent'>
            Đồng bộ giao dịch
          </Button>
          <Button radius='sm' className='border bg-transparent'>
            Đồng bộ lại từ đầu
          </Button>
        </div>
      </div>
      <div className='mb-4'>
        <h3 className='mb-2'>Thiết lập nâng cao</h3>
        <div className='flex gap-x-2'>
          <Button radius='sm' className='border bg-transparent'>
            Tạm dừng kết nối
          </Button>
          <Button radius='sm' className='border bg-transparent'>
            Xoá tài khoản ngân hàng
          </Button>
        </div>
      </div>
      <div>
        <TransactionHistory />
      </div>
    </div>
  )
}

export default BankDetail
