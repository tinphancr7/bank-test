import { IBank } from '@/types/bank.type'
import { formatAccountNumber } from '@/utils/formatAccountNumber'
import { Link } from 'react-router-dom'

const CardBank = ({ item }: { item: IBank }) => {
  return (
    <Link
      to={`/bank-management/${item._id}`}
      className='block w-96 h-56 bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform'
    >
      <img
        className='relative object-cover w-full h-full rounded-xl'
        src='https://i.imgur.com/kGkSg1v.png'
      />
      <div className='w-full px-8 absolute top-8'>
        <div className='flex justify-between'>
          <p className='font-light'>{item?.accountName}</p>
          <img className='w-14 h-14' src='https://i.imgur.com/bbPHJVe.png' />
        </div>
        <div className='pt-1'>
          <p className='font-light'>Card Number</p>
          <p className='font-medium tracking-more-wider'>
            {formatAccountNumber(item?.accountNumber)}
          </p>
        </div>
        <div className='pt-6 pr-6'>
          <div className='flex justify-between'>
            <div className=''>
              <p className='font-light text-xs'>Valid</p>
              <p className='font-medium tracking-wider text-sm'>11/15</p>
            </div>
            <div className=''>
              <p className='font-light text-xs'>Expiry</p>
              <p className='font-medium tracking-wider text-sm'>03/25</p>
            </div>

            <div className=''>
              <p className='font-light text-xs'>CVV</p>
              <p className='font-bold tracking-more-wider text-sm'>···</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CardBank
