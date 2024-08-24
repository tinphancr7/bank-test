import { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'
import RenderFormData from '../RenderFormData/RenderFormData'
import CustomModal from '../modal/CustomModal'
import { permissionSchema } from '@/utils/validation'
import permissionApi from '@/apiRequest/permission'
import { toast } from 'react-toastify'
import NotifyMessage from '@/utils/notify'

const ModalPermission = ({
  isOpen,
  onClose,
  onOpenChange,
  reloadTable,
  dataInit,
  setDataInit
}: any) => {
  useEffect(() => {
    if (dataInit) {
      setValue('name', dataInit?.name)
      setValue('apiPath', dataInit?.apiPath)
      setValue('method', dataInit?.method)
      setValue('module', dataInit?.module)
    }
  }, [dataInit])

  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: '',
      apiPath: '',
      method: '',
      module: ''
    },
    resolver: yupResolver(permissionSchema)
  })

  const listData = [
    {
      label: 'Tên permission',
      name: 'name',
      kind: 'input',
      placeholder: 'Nhập dữ liệu',
      width: 'col-span-6',
      isRequired: true
    },
    {
      label: 'API',
      name: 'apiPath',
      kind: 'input',
      placeholder: 'Nhập dữ liệu',
      width: 'col-span-6',
      isRequired: true
    },
    {
      label: 'Method',
      name: 'method',
      kind: 'input',
      placeholder: 'Nhập dữ liệu',
      width: 'col-span-6',
      isRequired: true
    },
    {
      label: 'Thuộc Module',
      name: 'module',
      kind: 'input',
      placeholder: 'Nhập dữ liệu',
      width: 'col-span-6',
      isRequired: true
    }
  ]
  const resetForm = () => {
    onClose()
    setDataInit(null)
    setValue('name', '')
    setValue('apiPath', '')
    setValue('method', '')
    setValue('module', '')
  }
  const onSubmit = handleSubmit(async (values) => {
    const isUpdate = !!dataInit?._id
    const action = isUpdate
      ? permissionApi.callUpdatePermission(values, dataInit?._id)
      : permissionApi.callCreatePermission(values)

    const successMessage = isUpdate
      ? 'Cập nhật permission thành công'
      : 'Thêm mới permission thành công'
    const errorMessage = isUpdate
      ? 'Cập nhật permission không thành công'
      : 'Thêm mới permission không thành công'

    try {
      const res = await action
      if (res?.data) {
        toast.success(successMessage)
        resetForm()
        reloadTable()
      } else {
        NotifyMessage(errorMessage, 'error')
      }
    } catch (error) {
      NotifyMessage(error?.message || errorMessage, 'error')
    }
  })

  return (
    <CustomModal
      title={dataInit ? 'Cập nhật Permission' : 'Tạo mới Permission'}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onSubmit={onSubmit}
    >
      <div className='grid grid-cols-12 gap-4'>
        {listData?.map((item, index) => (
          <div key={index} className={item?.width}>
            <RenderFormData item={item} control={control} errors={errors} />
          </div>
        ))}
      </div>
    </CustomModal>
  )
}

export default ModalPermission
