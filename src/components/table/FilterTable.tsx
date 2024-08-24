import { Button, Input } from '@nextui-org/react'

import { BiPlus, BiSearch } from 'react-icons/bi'
import { BsTrash } from 'react-icons/bs'

const FilterTable = ({
  filterValue,
  onSearchChange,
  onClear,
  onOpenAddEdit,
  onOpenDelete,
  selectedKeys
}) => {
  return (
    <div className='h-[100px] bg-white shadow rounded-xl border mb-5 flex gap-4 items-center justify-between p-4'>
      <div className=' w-[500px]'>
        <Input
          isClearable
          className=' w-full '
          classNames={{
            inputWrapper:
              'bg-white border border-gray-300 rounded-xl text-black'
          }}
          placeholder='Tìm kiếm'
          startContent={<BiSearch className='text-black' />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
      </div>
      <div className='flex items-center gap-4'>
        <Button
          startContent={<BiPlus />}
          className='bg-blue-600 text-white'
          onClick={onOpenAddEdit}
        >
          Thêm mới
        </Button>
        <Button
          startContent={<BsTrash />}
          className={`${
            [...selectedKeys].length === 0 ? 'bg-gray-300' : 'bg-red-600'
          } text-white`}
          onClick={onOpenDelete}
          disabled={[...selectedKeys].length === 0}
        >
          Xóa
        </Button>
      </div>
    </div>
  )
}

export default FilterTable
