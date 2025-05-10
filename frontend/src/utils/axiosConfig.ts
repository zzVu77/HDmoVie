import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // để gửi cookie (refresh token)
  timeout: 10000,
})

// ✅ Correct way: use .set() on AxiosHeaders
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('access-token')
    if (token && config.headers) {
      config.headers.set('Authorization', `Bearer ${token}`)
    }
    return config
  },
  (error) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => Promise.reject(error),
)

export const apiGet = <T>(url: string, config?: AxiosRequestConfig) => axiosInstance.get<T>(url, config)

export const apiPost = <T, D = unknown>(url: string, data: D, config?: AxiosRequestConfig) =>
  axiosInstance.post<T>(url, data, config)

export const apiPut = <T, D = unknown>(url: string, data: D, config?: AxiosRequestConfig) =>
  axiosInstance.put<T>(url, data, config)

export default axiosInstance
