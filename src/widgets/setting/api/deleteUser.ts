import { axiosInstance } from '@/shared'

async function deleteUser() {
  return axiosInstance.delete('/v1/members')
}

export { deleteUser }
