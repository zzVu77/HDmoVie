import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 300000,
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
  (response: AxiosResponse) => {
    const newAccessToken = response.headers['x-access-token']
    if (newAccessToken) {
      localStorage.setItem('access-token', newAccessToken)
    }
    return response
  },
  (error) => {
    // Xử lý các lỗi xác thực và chuyển hướng ngay lập tức
    if (
      error.response?.status === 403 ||
      error.message?.includes('Error in fetching your profile') ||
      (error.response?.data?.message &&
        (error.response.data.message === 'Can not decode token' ||
          error.response.data.message === 'Authentication failed'))
    ) {
      // Xóa token và chuyển hướng ngay lập tức
      localStorage.removeItem('access-token')
      return new Promise(() => {}) // Ngăn chặn promise rejection để tránh hiển thị lỗi
    }
    return Promise.reject(error)
  },
)

export const apiGet = <T>(url: string, config?: AxiosRequestConfig) =>
  axiosInstance.get<T>(url, config).then((response) => ({ data: response.data }))

export const apiPost = <T, D = unknown>(url: string, data: D, config?: AxiosRequestConfig) =>
  axiosInstance.post<T>(url, data, config).then((response) => ({ data: response.data }))

export const apiPut = <T, D = unknown>(url: string, data: D, config?: AxiosRequestConfig) =>
  axiosInstance.put<T>(url, data, config).then((response) => ({ data: response.data }))

export const apiDelete = <T>(url: string, config?: AxiosRequestConfig) => axiosInstance.delete<T>(url, config)

export default axiosInstance
