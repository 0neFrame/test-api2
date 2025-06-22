import { auth } from '@/api'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    authorization: {
      toString() {
        const token = localStorage.getItem('token')
        return `Bearer ${token}`
      },
    },
    'content-type': 'multipart/form-data',
  },
  validateStatus: function (status) {
    return status >= 200 && status < 300 // default
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    if (!localStorage.getItem('token') && config.method !== 'post' && config.url !== '/auth') {
      auth.logout()
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (config) => {
    return config
  },
  (error) => {
    if (error.status === 401) auth.logout()
    return Promise.reject(error)
  },
)

export default axiosInstance
