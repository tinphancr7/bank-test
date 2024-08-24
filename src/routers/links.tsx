import { AiOutlineSecurityScan } from 'react-icons/ai'
import { PiCarProfileThin, PiUsersThin, PiUserSwitchThin } from 'react-icons/pi'

export const LIST_NAV_ITEM = [
  {
    name: 'Quản lý ngân hàng',
    href: '/bank-management',
    icon: PiUsersThin
  },
  {
    name: 'Quản lý binance',
    icon: PiUserSwitchThin,
    subMenu: [
      {
        name: 'Quản lý tài khoản',
        href: '/binance/user-management',
        icon: PiCarProfileThin
      },
      {
        name: 'Quản lý API Key',
        href: '/binance/api-key-management',
        icon: PiCarProfileThin
      }
    ]
  },
  {
    name: 'Quản lý reminatio',
    icon: PiUserSwitchThin,
    subMenu: [
      {
        name: 'Quản lý tài khoản',
        href: '/reminato/user-management',
        icon: PiCarProfileThin
      },
      {
        name: 'Quản lý API Key',
        href: '/reminato/api-key-management',
        icon: PiCarProfileThin
      }
    ]
  },
  {
    name: 'Role Management',
    href: '/role-management',
    icon: AiOutlineSecurityScan,
  },
  {
    name: 'Quản lý người dùng',
    href: '/user-management',
    icon: PiUsersThin,
  },
  {
    name: 'Permission Management',
    href: '/permission-management',
    icon: AiOutlineSecurityScan
  }
]
