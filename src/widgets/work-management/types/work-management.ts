import { UseFormReturn } from 'react-hook-form'

export type Form = UseFormReturn<
  {
    memberId: string
    workingDate: Date
    workingTime: {
      'start-front': string
      'start-back': string
      'end-front': string
      'end-back': string
    }
  },
  unknown,
  undefined
>
