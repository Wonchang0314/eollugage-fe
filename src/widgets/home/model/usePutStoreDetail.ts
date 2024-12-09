import { useMutation, useQueryClient } from '@tanstack/react-query'
import { storeInfoAtom } from '@/entities'
import { useAtom } from 'jotai'
import { putStoreDetail } from '../api/putStoreDetail'

function usePutStoreDetail(storeId: string) {
  const [storeInfo, setStoreInfo] = useAtom(storeInfoAtom)
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['putStoreDetail', storeId],
    mutationFn: () => putStoreDetail(storeInfo, storeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getStoreInfo', storeId] })
    },
  })

  const updateNotice = (notice: string) => {
    setStoreInfo(prev => ({
      ...prev,
      internalNotice: notice,
    }))
  }

  return { mutate, updateNotice }
}

export { usePutStoreDetail }
