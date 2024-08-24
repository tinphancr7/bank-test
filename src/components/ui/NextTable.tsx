import usePushQueryString from '@/hooks/usePushQueryString'
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import { memo } from 'react'
import { useSearchParams } from 'react-router-dom'

const NextTable = ({
  columns,
  data,
  renderCell,
  totalPages = 1,
  totalItems = 0
}: {
  columns: any
  data: any
  renderCell: any
  totalPages?: number
  totalItems?: number
}) => {
  const [searchParams] = useSearchParams()
  const pushQueryString = usePushQueryString()

  const handleOnChangePage = (page: number) => {
    pushQueryString({ page: page })
  }

  return (
    <div className='my-4'>
      <Table
        aria-label='Danh sách giao dịch'
        radius='none'
        classNames={{
          wrapper: 'p-0 border-none shadow-none',
          th: 'bg-white',
          tr: 'border-b'
        }}
      >
        <TableHeader columns={columns}>
          {(column: any) => (
            <TableColumn
              key={column.id}
              align={column.id === 'actions' ? 'center' : 'start'}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={'No data'}
          items={data ?? []}
          // loadingContent={<Spinner />}
          // loadingState='loading'
        >
          {(item: any) => (
            <TableRow key={item?._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {totalItems > 1 && (
        <div className='mt-4'>
          <Pagination
            total={totalPages}
            page={parseInt(searchParams.get('page') || '1')}
            onChange={handleOnChangePage}
          />
        </div>
      )}
    </div>
  )
}

export default memo(NextTable)
