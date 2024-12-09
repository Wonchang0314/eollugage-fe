import { useWorkStatus } from '@/entities'
import { AttendanceButtonDialog } from '@/shared'
import useCheckIn from '../model/useCheckIn'

export default function CheckInWorkButton({ storeId }: { storeId: string }) {
  const { workStatus } = useWorkStatus(storeId)
  const { checkIn, checkInStatus, checkInError } = useCheckIn()
  const handleClick = async () => {
    checkIn({ storeId })
  }
  return (
    <AttendanceButtonDialog
      buttonText="출근"
      onClick={handleClick}
      status={checkInStatus}
      error={checkInError}
      disabled={
        workStatus === 'END_WORKING' || workStatus === 'START_WORKING' || workStatus === null
      }
    />
  )
}
