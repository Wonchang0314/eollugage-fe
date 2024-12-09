import { axiosInstance } from '@/shared'
import { UserInfoT } from './user'

interface PostLoginResponse {
  token: string
}

async function postLogin(body: UserInfoT): Promise<PostLoginResponse> {
  const { data } = await axiosInstance.post('/v1/login/phone', body)
  return data
}

export { postLogin }
