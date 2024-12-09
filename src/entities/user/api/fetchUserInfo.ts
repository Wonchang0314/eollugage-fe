'use server'

import { axiosServerInstance } from '@/shared'
import { UserInfo } from '../types/user'

export default async function fetchUserInfo(): Promise<UserInfo | undefined> {
  try {
    const { data } = await axiosServerInstance.get('/v1/my')
    return data
  } catch (error) {
    return undefined
  }
}
