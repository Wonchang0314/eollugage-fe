import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { deleteTokenFromCookie, sendRNFunction } from '@/shared'
import { deleteUser } from '../api/deleteUser'

function useDeleteUser() {
  const { replace } = useRouter()
  const { mutate } = useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: () => deleteUser(),
    onSuccess: () => {
      deleteTokenFromCookie()
      sendRNFunction('deleteLoginToken')
      replace('/')
    },
  })
  return { mutate }
}

export { useDeleteUser }
