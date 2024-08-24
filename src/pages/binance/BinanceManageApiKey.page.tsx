/* eslint-disable @typescript-eslint/no-explicit-any */
import binanceApi from '@/apiRequest/binance'
import { Button, Input } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

function BinanceManageApiKey() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      apiKey: '',
      skKey: ''
    }
  })

  const onSubmit = async (data: any) => {
    const result = await binanceApi.saveApiKey(data)
    if (result.statusCode === 201) {
      reset()
      toast.success("Lưu khóa thành công")
      return
    }
    toast.error('Lưu khóa thất bại')
  }

  return (
    <div>
      <h1>Quản lý API Key Binance</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4 mt-4'>
          <Input
            {...register('apiKey', { required: true })}
            placeholder='Nhập API Key'
            variant='bordered'
            radius='none'
          />
          {errors.apiKey && <p>This field is required</p>}
          <Input
            {...register('skKey', { required: true })}
            placeholder='Nhập Sercret Key'
            variant='bordered'
            radius='none'
          />
          {errors.skKey && <p>This field is required</p>}

          <Button  color='primary' radius='sm'>
            Lưu
          </Button>
        </div>
      </form>
    </div>
  )
}

export default BinanceManageApiKey
