import { Button } from '@nextui-org/react'
import CardBank from './components/cards/card.bank'
import CardSkeleton from './components/cards/card.skeleton'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { getListBanks } from '@/redux/slices/bank.slice'
import { toast } from 'react-toastify'
import banks from '@/apiRequest/bank'

const BankManagement = () => {
  const [isLoading, setIsLoadiong] = useState(false)

  const dispatch = useAppDispatch()
  const { listBanks, loading } = useSelector((state: RootState) => state.bank)

  const synchronizeBankAccounts = async () => {
    try {
      setIsLoadiong(true)
      const res = await banks.synchronizeBankAccounts()
      toast.success('Đồng bộ các tài khoản thành công')
      dispatch(getListBanks())
    } catch (e: any) {
      toast.error(e?.message || 'Vui lòng thử lại sau')
    } finally {
      setIsLoadiong(false)
    }
  }

  useEffect(() => {
    dispatch(getListBanks())
  }, [])

  return (
    <div>
      <div className='mb-3'>
        <Button
          radius='sm'
          onPress={synchronizeBankAccounts}
          isLoading={isLoading}
        >
          Đồng bộ các tài khoản
        </Button>
      </div>
      {loading ? (
        <div className='flex flex-wrap gap-4'>
          {[...Array(4).keys()].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className='flex flex-wrap gap-4 w-full'>
          {listBanks.map((item) => (
            <CardBank item={item} key={item._id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default BankManagement
