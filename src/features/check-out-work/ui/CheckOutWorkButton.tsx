import { useWorkStatus } from '@/entities'

import { AttendanceButtonDialog } from '@/shared'
import useCheckOut from '../model/useCheckOut'

export default function CheckOutWorkButton({ storeId }: { storeId: string }) {
  const { workStatus } = useWorkStatus(storeId)
  const { checkOut, checkOutError, checkOutStatus } = useCheckOut()
  const handleClick = async () => {
    checkOut({ storeId })
  }
  return (
    <AttendanceButtonDialog
      buttonText="퇴근"
      onClick={handleClick}
      status={checkOutStatus}
      error={checkOutError}
      disabled={workStatus === 'END_WORKING' || workStatus === 'NOT_WORKING' || workStatus === null}
    />
  )
}
