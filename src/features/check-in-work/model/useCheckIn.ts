/* eslint-disable @typescript-eslint/no-unused-vars */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import patchCheckInWork from '../api/patchCheckInWork'

const useCheckIn = () => {
  const queryClient = useQueryClient()
  const {
    mutate: checkIn,
    status: checkInStatus,
    error: checkInError,
  } = useMutation({
    mutationFn: async ({ storeId }: { storeId: string | undefined }) => patchCheckInWork(storeId),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['histories'] })
      await queryClient.setQueryData(['workStatus'], () => 'START_WORKING')
    },
  })
  return { checkIn, checkInStatus, checkInError }
}
export default useCheckIn
