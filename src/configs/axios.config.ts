import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setRefreshTokenToLS,
  setUserToLS
} from '@/utils/auth'
import axios, { type AxiosInstance } from 'axios'

export const BACKEND_URL = 'http://localhost:8080/api/v1'

class Http {
  instance: AxiosInstance
  private accessToken: string | null

  private refreshTokenReq: Promise<any> | null

  constructor() {
    this.accessToken = getAccessTokenFromLS()

    this.refreshTokenReq = null
    this.instance = axios.create({
      baseURL: BACKEND_URL,
      timeout: 50000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (config.headers && this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config

        const data = response?.data?.data

        if (url === '/auth/login' || url === '/auth/register') {
          this.accessToken = data?.access_token

          setAccessTokenToLS(this.accessToken)

          setUserToLS(data?.user)
        } else if (url === '/auth/logout') {
          this.accessToken = null

          clearLS()
        }
        return response
      },

      async (error) => {
        const originalRequest = error.config
        if (
          error.response.status === 401 &&
          !originalRequest._retry &&
          error.response?.data?.message === 'EXPIRED_ACCESS_TOKEN'
        ) {
          if (!this.refreshTokenReq) {
            this.refreshTokenReq = this.refreshAccessToken()
          }
          originalRequest._retry = true

          try {
            const { accessToken } = await this.refreshTokenReq
            this.refreshTokenReq = null

            // Retry the original request with the new access token.
            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`
            return this.instance(originalRequest)
          } catch (refreshError) {
            this.refreshTokenReq = null
            console.error('Token refresh failed:', refreshError)
            this.accessToken = null
            this.refreshToken = null
            clearLS()
            return Promise.reject(refreshError)
          }
        }
        return Promise.reject(error) // For all other errors, return the error as is.
      }
    )
  }

  private async refreshAccessToken() {
    try {
      const response = await axios.get(`${BACKEND_URL}/auth/refresh`)
      const { access_token } = response?.data?.data

      this.accessToken = access_token

      setAccessTokenToLS(access_token)

      // Update the instance's default Authorization header.
      this.instance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${access_token}`

      return { accessToken: access_token }
    } catch (error) {
      throw new Error('Unable to refresh token')
    }
  }
}

const http = new Http().instance
export default http
