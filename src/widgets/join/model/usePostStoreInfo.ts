import { useMutation } from '@tanstack/react-query'
import { StoreInfoT } from '@/entities'
import { postStoreInfo } from '../api/postStoreInfo'

function usePostStoreInfo(name: string) {
  const storeInfo: StoreInfoT = {
    name,
    introduction: 'asdf',
    image: 'NONE',
    phone: 'asdf',
    address: 'asdf',
    openingHour: 'asdf',
    originalInfo: '',
    externalNotice: '',
    internalNotice: '',
  }

  const { mutate } = useMutation({
    mutationKey: ['postStoreInfo'],
    mutationFn: () => postStoreInfo(storeInfo),
  })

  return { mutate }
}

export { usePostStoreInfo }
