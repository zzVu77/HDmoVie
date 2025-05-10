import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// Create Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // optional: 10 seconds timeout
})

// Optional: Add interceptors if needed
// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   (error) => {
//     console.error('API error:', error)
//     return Promise.reject(error)
//   },
// )

// Export helper methods
export const apiGet = <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
  axiosInstance.get<T>(url, config)

export const apiPost = <T, D = unknown>(url: string, data: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
  axiosInstance.post<T>(url, data, config)

export const apiPut = <T, D = unknown>(url: string, data: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
  axiosInstance.put<T>(url, data, config)

export default axiosInstance
