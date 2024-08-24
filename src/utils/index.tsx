import { isNil, omitBy } from 'lodash'

export function colorMethod(
  method: 'POST' | 'PUT' | 'GET' | 'DELETE' | string
) {
  switch (method) {
    case 'POST':
      return 'text-green-600'
    case 'PUT':
      return 'text-orange-600'
    case 'GET':
      return 'text-blue-600'
    case 'DELETE':
      return 'text-red-600'
    default:
      return 'text-black'
  }
}
const isNilOrEmpty = (value: any) => isNil(value) || value === ''
export const filterParams = (params: any) => {
  return omitBy(params, isNilOrEmpty)
}
