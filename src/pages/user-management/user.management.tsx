import { useSelector } from 'react-redux'
import UserFilter from './components/user.filter'
import { RootState } from '@/redux/store'
import { Key, useCallback, useEffect } from 'react'
import { IUser } from '@/types/user.type'
import NextTable from '@/components/ui/NextTable'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { getListUsers } from '@/redux/slices/user.slice'
import { Tooltip } from '@nextui-org/react'
import { MdDeleteOutline } from 'react-icons/md'
import { CiEdit } from 'react-icons/ci'
import { useSearchParams } from 'react-router-dom'
import AddEditUser from './components/AddEditUser'

const columns = [
  { name: 'Họ tên', id: 'name' },
  { name: 'Email', id: 'email' },
  { name: 'Vai trò', id: 'role' },
  { name: 'Trạng thái', id: 'status' },
  { name: '', id: 'actions' }
]

const UserManagement = () => {
  const dispatch = useAppDispatch()
  const { listUsers, loading, totalPages, totalItems } = useSelector(
    (state: RootState) => state.user
  )
  let [searchParams] = useSearchParams()

  const renderCell = useCallback((user: IUser, columnKey: Key) => {
    const cellValue = user[columnKey as keyof IUser]

    switch (columnKey) {
      case 'name':
        return <p>{user?.name}</p>
      case 'role':
        return <p>{user?.role?.name}</p>
      case 'status':
        return <p>{user?.role?.name}</p>
      case 'actions':
        return (
          <div className='relative flex items-center gap-3'>
            <Tooltip content='Edit user'>
              <span className='text-2xl text-default-400 cursor-pointer active:opacity-50'>
                <CiEdit />
              </span>
            </Tooltip>
            <Tooltip color='danger' content='Delete user'>
              <span className='text-2xl text-danger cursor-pointer active:opacity-50'>
                <MdDeleteOutline />
              </span>
            </Tooltip>
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  useEffect(() => {
    dispatch(getListUsers())
  }, [searchParams])

  return (
    <div>
      <UserFilter />
      <NextTable
        data={listUsers}
        renderCell={renderCell}
        columns={columns}
        totalPages={totalPages}
      />

      <AddEditUser />
    </div>
  )
}

export default UserManagement
