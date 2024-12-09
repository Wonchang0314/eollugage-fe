import { useMutation } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { postNotification, NotificationPayload } from '../api/postNotification'

function usePostNotification() {
  const { storeId }: { storeId: string } = useParams()
  const { mutate, status } = useMutation({
    mutationKey: ['postNotification', storeId],
    mutationFn: (body: NotificationPayload) => postNotification(storeId, body),
  })
  return { mutate, status }
}

export { usePostNotification }
