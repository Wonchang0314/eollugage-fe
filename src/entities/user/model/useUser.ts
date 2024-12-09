import { useQuery } from '@tanstack/react-query'
import fetchUserInfo from '../api/fetchUserInfo'

const useUser = (enabled: boolean) => {
  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => fetchUserInfo(),
    enabled,
  })
  return { userInfo }
}
export default useUser
