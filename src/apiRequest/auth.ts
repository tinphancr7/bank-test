import { store } from '@/redux/store'
import { IFormLogin, IResLogin } from '../types/auth.type'
import { handleLogout } from '@/redux/slices/auth.slice'
import { toast } from 'react-toastify'
import instance from '@/configs/axios.config'

const auth = {
  login: async (data: IFormLogin) => {
    const res = await instance.post<IResLogin>('/auth/login', data)
    return res.data
  },
  logout: () => {
    store.dispatch(handleLogout())
    toast.success('Đăng xuất thành công')
  },
  callLogout: async () => {
    return await instance.post('/auth/logout')
  }
}

export default auth
