import NextInput from '@/components/ui/NextInput'
import { Button } from '@nextui-org/react'
import { CiSearch } from 'react-icons/ci'

const UserFilter = () => {
  return (
    <div className='flex items-center gap-x-5'>
      <NextInput
        placeholder='Tìm kiếm theo name hoặc email'
        className='max-w-[300px] !mt-0'
        startContent={<CiSearch size={24} />}
      />
      <Button radius='none' className='bg-primary text-white border'>
        Thêm người dùng
      </Button>
    </div>
  )
}

export default UserFilter
