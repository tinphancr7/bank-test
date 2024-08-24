import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner
} from '@nextui-org/react'
import { useCallback, useMemo, useState } from 'react'

const CustomTable = ({
  columns,
  data,
  renderCell,
  selectedKeys,
  setSelectedKeys,
  meta,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  isLoading
}) => {
  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value))
    setPage(1)
  }, [])
  const bottomContent = useMemo(() => {
    return (
      <div className='py-2 px-2 flex justify-between items-center'>
        <span className='w-[30%] text-small text-default-400'>
          {selectedKeys === 'all'
            ? 'All items selected'
            : `${selectedKeys.size} of 10 selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color='primary'
          page={page || 1}
          total={meta?.totalPages || 1}
          onChange={setPage}
        />
        <div className='hidden sm:flex w-[30%] justify-end gap-2'>
          <label className='flex items-center text-default-400 text-small'>
            Rows per page:
            <select
              className='bg-transparent outline-none text-default-400 text-small'
              onChange={onRowsPerPageChange}
              value={rowsPerPage}
            >
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
              <option value='15'>20</option>
            </select>
          </label>
        </div>
      </div>
    )
  }, [selectedKeys, page, meta])
  return (
    <div>
      <Table
        classNames={{
          tbody: 'divide-y-1'
        }}
        topContent={
          <div className='flex justify-between items-center'>
            <h2 className='text-xl font-bold text-black'>
              Danh sách Permissions (Quyền Hạn)
            </h2>
          </div>
        }
        bottomContent={bottomContent}
        aria-label='Example table with custom cells'
        selectionMode='multiple'
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        onCellAction={() => {}}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column?.uid}
              align={'start'}
              className='text-sm font-bold'
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={<Spinner label='Loading...' />}
          items={data}
        >
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default CustomTable
