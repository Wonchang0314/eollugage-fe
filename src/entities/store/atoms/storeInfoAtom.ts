import { atom } from 'jotai'
import { StoreInfoT } from '../api/store'

export const storeInfoAtom = atom<StoreInfoT>({
  name: 'default store name',
  introduction: 'default store introduction',
  image: 'default store image',
  phone: 'default store phone',
  address: 'default store address',
  openingHour: 'default store openingHour',
  originalInfo: 'default store originalInfo',
  externalNotice: 'default store externalNotice',
  internalNotice: 'default store internalNotice',
})
