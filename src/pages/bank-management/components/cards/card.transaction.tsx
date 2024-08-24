const CardTransaction = () => {
  return (
    <div className='border p-5 rounded-lg h-full bg-white shadow-md'>
      <div className='flex items-center justify-between'>
        <p className="text-grayNormal">Bắt đầu kết nối</p>
        <p>20/05/2024</p>
      </div>
      <hr className='h-px w-full my-2 border-0 bg-grayNormal'></hr>
      <div className='flex items-center justify-between'>
        <p className="text-grayNormal">Số dư ban đầu</p>
        <p>0đ</p>
      </div>
    </div>
  )
}

export default CardTransaction
