import { atom } from 'jotai'

export const isSuccessAtom = atom<boolean | undefined>(undefined)
export const imageNameAtom = atom<string>('')
export const isImageLoadingAtom = atom<boolean>(true)
