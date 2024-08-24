export const LocalStorageEventTarget = new EventTarget()
export const setAccessTokenToLS = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken)
}
export const setRefreshTokenToLS = (refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken)
}

export const clearLS = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('user')
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const getAccessTokenFromLS = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken') || ''
  }

  return ''
}
export const getRefreshTokenFromLS = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('refreshToken') || ''
  }

  return ''
}

export const getUserFromLS = () => {
  let result

  if (typeof window !== 'undefined') {
    result = window.localStorage.getItem('user')
  }

  return result ? JSON.parse(result) : null
}
export const setUserToLS = (user: any) => {
  localStorage.setItem('user', JSON.stringify(user))
}
