import { useMutation, useQueryClient } from '@tanstack/react-query'
import patchCheckOutWork from '../api/patchCheckOutWork'

const useCheckOut = () => {
  const queryClient = useQueryClient()

  const {
    mutate: checkOut,
    status: checkOutStatus,
    error: checkOutError,
  } = useMutation({
    mutationFn: async ({ storeId }: { storeId: string }) => patchCheckOutWork(storeId),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['histories'] })
      await queryClient.setQueryData(['workStatus'], () => 'END_WORKING')
    },
  })
  return { checkOut, checkOutStatus, checkOutError }
}
export default useCheckOut
