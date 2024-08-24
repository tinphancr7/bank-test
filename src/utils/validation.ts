import * as yup from 'yup'

const permissionSchema = yup.object({
  name: yup.string().required('Name is required'),
  apiPath: yup.string().required('API is required'),
  method: yup.string().required('Method is required'),
  module: yup.string().required('Module is required')
})
export { permissionSchema }
