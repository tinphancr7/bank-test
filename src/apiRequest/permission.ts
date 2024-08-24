import instance from '@/configs/axios.config'
import { filterParams } from '@/utils'

/**
 * 
Module Permission
 */

const permissionApi = {
  callCreatePermission: (permission: any) => {
    return instance.post('/permissions', {
      ...permission
    })
  },

  callUpdatePermission: (permission: any, id: string) => {
    return instance.put(`/permissions/${id}`, {
      ...permission
    })
  },

  callDeletePermission: (ids: string) => {
    return instance.delete(`/permissions/${ids}`)
  },

  callFetchPermission: ({ search, page, limit }: any) => {
    return instance.get(`/permissions`, {
      params: filterParams({
        search,
        page,
        limit
      })
    })
  },

  callFetchPermissionById: (id: string) => {
    return instance.get(`/permissions/${id}`)
  }
}
export default permissionApi
