import { useAppDispatch } from '@/hooks/useAppDispatch'
import { handleLogout } from '@/redux/slices/auth.slice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ButtonLogout = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const logout = () => {
    dispatch(handleLogout())
    toast.success('Đăng xuất thành công')
    navigate('/login')
  }

  return <button onClick={logout}>Đăng xuất</button>
}

export default ButtonLogout
