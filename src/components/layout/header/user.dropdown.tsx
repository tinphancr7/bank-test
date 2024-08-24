import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import auth from '@/apiRequest/auth'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useNavigate } from 'react-router-dom'
import NotifyMessage from '@/utils/notify'
import { handleLogout } from '@/redux/slices/auth.slice'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { LocalStorageEventTarget } from '@/utils/auth'

const UserDropdown = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const handleLogoutUser = async () => {
    const res = await auth.callLogout()
    if (res && res.data?.data) {
      dispatch(handleLogout())
      NotifyMessage('Đăng xuất thành công', 'success')
      navigate('/login')
    }
  }
  const { isLoggedIn } = useSelector((state) => state.auth)
  const autoLogout = () => {
    dispatch(handleLogout())
    navigate('/login')
  }
  useEffect(() => {
    if (isLoggedIn) {
      LocalStorageEventTarget.addEventListener('clearLS', autoLogout)
    }

    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', autoLogout)
    }
  }, [isLoggedIn])
  return (
    <Dropdown>
      <DropdownTrigger>
        <button>
          <Avatar isDisabled name='Joe' className='h-[42px] w-[42px]' />
        </button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Static Actions'>
        <DropdownItem key='new'>Trang cá nhân</DropdownItem>
        <DropdownItem
          key='delete'
          className='text-danger'
          color='danger'
          onClick={handleLogoutUser}
        >
          Đăng xuất
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default UserDropdown
