import { RootState } from "@/redux/store"
import { Chip } from "@nextui-org/react"
import { useSelector } from "react-redux"

const CardTotalTransaction = () => {
  const { totalItems } = useSelector((state: RootState)=> state.transaction)

  return (
    <div className='border p-5 rounded-lg bg-white shadow-md'>
      <div className='flex items-center justify-between'>
        <p className="text-grayNormal">Tổng số giao dịch</p>
        <p>{totalItems}</p>
      </div>
      <hr className='h-px w-full my-2 border-0 bg-grayNormal'></hr>
      <div className='flex items-center justify-between'>
        <p className="text-grayNormal">Tổng giá trị</p>
        <p>Đang cập nhật</p>
      </div>
      <hr className='h-px w-full my-2 border-0 bg-grayNormal'></hr>
      <div className='flex items-center justify-between'>
        <p className="text-grayNormal">Tình trạng</p>
        <Chip color="success" className="text-white">Khớp</Chip>
      </div>
    </div>
  )
}

export default CardTotalTransaction

