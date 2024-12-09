import { useMutation, useQueryClient } from '@tanstack/react-query'
import { StoreInfoT, putStoreInfo, storeInfoAtom } from '@/entities'
import { useAtom } from 'jotai'

function usePutStoreImage(
  imageName: string | undefined,
  storeInfo: StoreInfoT | undefined,
  storeId: string,
) {
  const [, setStoreInfo] = useAtom(storeInfoAtom)
  const queryClient = useQueryClient()
  const newStoreInfo = storeInfo as StoreInfoT
  if (imageName && newStoreInfo) newStoreInfo.image = imageName

  const { mutate } = useMutation({
    mutationKey: ['putStoreInfo', storeInfo],
    mutationFn: () => putStoreInfo(newStoreInfo, storeId),
    onSuccess: async () => {
      setStoreInfo(newStoreInfo)
      await queryClient.refetchQueries({ queryKey: ['getStoreInfo', storeId] })
      await queryClient.refetchQueries({ queryKey: ['getPresignedURL', storeId] })
      await queryClient.refetchQueries({ queryKey: ['getStoreImage', storeId, imageName] })
    },
  })

  return { mutate }
}

export { usePutStoreImage }
