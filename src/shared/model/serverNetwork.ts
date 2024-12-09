'use server'

import axios from 'axios'
import { cookies } from 'next/headers'

const axiosServerInstance = axios.create({
  baseURL: `${process.env.SERVER_URL}/api`,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
  },
  validateStatus: status => status < 300,
})
axiosServerInstance.interceptors.request.use(
  async config => {
    const cookieStore = cookies()
    const token = cookieStore.get('access_token')?.value
    config.headers.set('Authorization', `Bearer ${token}`)
    return config
  },
  error => Promise.reject(error),
)

export default axiosServerInstance
