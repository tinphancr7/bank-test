import { Chip } from '@nextui-org/react'

const ConnectionStatus = ({ status }: { status: number }) => {
  switch (status) {
    case 1:
      return (
        <Chip color='success' className='text-white'>
          Đang kết nối
        </Chip>
      )
    default:
      return <span>{status}</span>
  }
}

export default ConnectionStatus
