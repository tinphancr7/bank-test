import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import auth from '@/apiRequest/auth'

const UserDropdown = () => {
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
          onClick={() => auth.logout()}
        >
          Đăng xuất
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default UserDropdown
