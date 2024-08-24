import { useCallback, useEffect, useState } from 'react'
import { Tooltip } from '@nextui-org/react'
import { FaRegEdit, FaTrash } from 'react-icons/fa'
import moment from 'moment'
import { colorMethod } from '@/utils'
import CustomTable from '@/components/table/CustomTable'
import ModalPermission from '@/components/permission/ModalPermission'
import FilterTable from '@/components/table/FilterTable'
import { fetchPermission } from '@/redux/slices/permission.slice'
import { useDispatch, useSelector } from 'react-redux'
import ModalDeletePermission from '@/components/permission/ModalDeletePermission'
import { useDebounce } from '@/hooks/useDebounce'

const columns = [
  {
    uid: 'name',
    name: 'Name'
  },
  {
    uid: 'apiPath',
    name: 'API Path'
  },
  {
    uid: 'method',
    name: 'Method'
  },
  {
    uid: 'module',
    name: 'Module'
  },
  {
    uid: 'createdBy',
    name: 'Created By'
  },
  {
    uid: 'createdAt',
    name: 'Created At'
  },

  {
    uid: 'actions',
    name: 'Actions'
  }
]

export default function PermissionPage() {
  const dispatch = useDispatch<any>()

  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set())
  const [dataInit, setDataInit] = useState(null)
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [filterValue, setFilterValue] = useState('')

  const searchMatch = useDebounce(filterValue, 500)
  const { result, meta, isLoading } = useSelector(
    (state) => state?.permission || []
  )

  // Modal state consolidated
  const [modalState, setModalState] = useState({
    isAddEditOpen: false,
    isDeleteOpen: false
  })

  const handleFetchPermission = useCallback(
    ({ page, limit, search }): any => {
      dispatch(fetchPermission({ page, limit, search }))
    },
    [dispatch]
  )

  useEffect(() => {
    handleFetchPermission({ page, limit: rowsPerPage, search: searchMatch })
  }, [page, rowsPerPage, searchMatch, handleFetchPermission])

  const onSearchChange = useCallback((value) => {
    setFilterValue(value || '')
    setPage(1)
  }, [])

  const onClear = useCallback(() => {
    setFilterValue('')
    setPage(1)
  }, [])

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey]
    switch (columnKey) {
      case 'name':
      case 'apiPath':
      case 'module':
        return <p className='text-bold text-black'>{cellValue}</p>
      case 'method':
        return (
          <p className={`${colorMethod(cellValue)} font-bold`}>{cellValue}</p>
        )
      case 'createdBy':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-black'>{cellValue?.name}</p>
            <p className='text-bold text-default-400'>{cellValue?.email}</p>
          </div>
        )
      case 'createdAt':
        return (
          <p className='text-bold text-black'>
            {moment(cellValue).format('DD/MM/YYYY HH:mm')}
          </p>
        )
      case 'actions':
        return (
          <div className='relative flex items-center gap-4'>
            <Tooltip className='bg-blue-600' content='Chỉnh sửa'>
              <span
                className='text-lg text-blue-600 cursor-pointer active:opacity-50'
                onClick={() => {
                  setDataInit(item)
                  setModalState((prev) => ({ ...prev, isAddEditOpen: true }))
                }}
              >
                <FaRegEdit />
              </span>
            </Tooltip>
            <Tooltip className='bg-red-600' content='Xóa'>
              <span
                className='text-lg text-red-600 cursor-pointer active:opacity-50'
                onClick={() => {
                  setSelectedKeys(new Set([item._id]))
                  setModalState((prev) => ({ ...prev, isDeleteOpen: true }))
                }}
              >
                <FaTrash />
              </span>
            </Tooltip>
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  return (
    <div>
      <FilterTable
        filterValue={filterValue}
        onSearchChange={onSearchChange}
        onClear={onClear}
        onOpenAddEdit={() =>
          setModalState((prev) => ({ ...prev, isAddEditOpen: true }))
        }
        onOpenDelete={() =>
          setModalState((prev) => ({ ...prev, isDeleteOpen: true }))
        }
        selectedKeys={selectedKeys}
      />
      <CustomTable
        data={result}
        columns={columns}
        selectedKeys={selectedKeys}
        setSelectedKeys={setSelectedKeys}
        renderCell={renderCell}
        page={page}
        setPage={setPage}
        meta={meta}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        isLoading={isLoading}
      />
      {modalState.isAddEditOpen && (
        <ModalPermission
          dataInit={dataInit}
          isOpen={modalState.isAddEditOpen}
          onClose={() =>
            setModalState((prev) => ({ ...prev, isAddEditOpen: false }))
          }
          onOpenChange={() =>
            setModalState((prev) => ({
              ...prev,
              isAddEditOpen: !prev.isAddEditOpen
            }))
          }
          setDataInit={setDataInit}
          reloadTable={() =>
            handleFetchPermission({ page: 1, limit: 10, search: '' })
          }
        />
      )}
      {modalState.isDeleteOpen && (
        <ModalDeletePermission
          isOpen={modalState.isDeleteOpen}
          onClose={() =>
            setModalState((prev) => ({ ...prev, isDeleteOpen: false }))
          }
          onOpenChange={() =>
            setModalState((prev) => ({
              ...prev,
              isDeleteOpen: !prev.isDeleteOpen
            }))
          }
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
          data={result}
          reloadTable={() =>
            handleFetchPermission({ page, limit: rowsPerPage })
          }
        />
      )}
    </div>
  )
}
