import axios from 'axios'
import { getTokenFromCookie } from '../utils/handleToken'

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Credentials': 'true',
  },
  validateStatus: status => status < 300,
})
axiosInstance.interceptors.request.use(
  async config => {
    if (typeof window !== undefined) {
      const token = getTokenFromCookie()
      config.headers.set('Authorization', `Bearer ${token}`)
    }
    return config
  },
  error => Promise.reject(error),
)

export default axiosInstance
