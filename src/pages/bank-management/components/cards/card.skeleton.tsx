import { Card, Skeleton } from '@nextui-org/react'

const CardSkeleton = () => {
  return (
    <Card className='w-96 h-56 space-y-5 p-4' radius='lg'>
      <Skeleton className='rounded-lg'>
        <div className='h-56 rounded-lg bg-default-300'></div>
      </Skeleton>
    </Card>
  )
}

export default CardSkeleton
