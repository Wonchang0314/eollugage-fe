import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { sendRNFunction, setTokenFromCookie } from '@/shared'
import { RelationT } from '@/entities'
import { postLogin } from '../api/postLogin'
import { UserInfoT } from '../api/user'
import { StoreT } from '../api/store'

function usePostLogin(
  userInfo: UserInfoT,
  handleStoreListCheck: (storelist: StoreT[], relationList: RelationT[], memberId: string) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onErrorCallback: (error: any) => void,
) {
  const { mutate } = useMutation({
    mutationKey: ['postLogin'],
    mutationFn: () => postLogin(userInfo),
    onSuccess: async res => {
      setTokenFromCookie(res.token, 7)
      sendRNFunction('setLoginToken', res.token)

      try {
        const response = await axios.get('/api/v1/my', {
          headers: {
            Authorization: `Bearer ${res.token}`,
          },
        })

        const { storeList, id, relationList } = response.data
        handleStoreListCheck(storeList, relationList, id)
      } catch (error) {
        console.error('Failed to fetch storelist:', error)
      }
    },
    onError: error => {
      onErrorCallback(error)
    },
  })

  return { mutate }
}

export { usePostLogin }
