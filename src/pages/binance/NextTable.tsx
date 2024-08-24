import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'

interface Column {
  name: string
  id: string
}

interface Props {
  columns: Column[]
  data: any
  renderCell: any
}

const NextUITable = ({ columns, data, renderCell }: Props) => {
  return (
    <>
      <Table
        aria-label='Table droplet basic'
        fullWidth
        removeWrapper
        classNames={{
          th: '!bg-white py-4 text-lg text-black !font-semibold',
          thead: 'max-[800px]:!text-sm',
          tr: 'border-b',
          td: 'py-4 text-lg text-gray-light max-[800px]:!text-sm'
        }}
      >
        <TableHeader columns={columns}>
          {(column: any) => (
            <TableColumn key={column.id} align='start'>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={'Không có dữ liệu'} items={data}>
          {(item: any) => (
            <TableRow key={item?.orderNumber || item?.tranId || item?.orderId}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}

export default NextUITable
