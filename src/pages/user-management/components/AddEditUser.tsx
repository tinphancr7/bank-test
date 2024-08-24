import NextDrawer from '@/components/ui/NextDrawer'
import NextInput from '@/components/ui/NextInput'

const AddEditUser = () => {
  return (
    <NextDrawer title='Thêm mới người dùng' width='max-w-[400px]'>
      <div className='p-5'>
        <form className='flex flex-col gap-3'>
          <div>
            <NextInput placeholder='Nhập họ email' label='Email' />
          </div>
          <div>
            <NextInput placeholder='Nhập họ tên' label='Họ tên' />
          </div>
          <div>
            <NextInput
              placeholder='Nhập mật khẩu'
              label='Mật khẩu'
              type='password'
            />
          </div>
        </form>
      </div>
    </NextDrawer>
  )
}

export default AddEditUser
