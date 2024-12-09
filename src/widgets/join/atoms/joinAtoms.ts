import { atom } from 'jotai'

export const stepAtom = atom<number>(0)
export const isValidCodeAtom = atom<boolean>(false)
export const storeNameAtom = atom<string>('')
export const storeIdAtom = atom<string>('')
export const memberIdAtom = atom<string>('')
export const isOwnerAtom = atom<boolean>(true)
