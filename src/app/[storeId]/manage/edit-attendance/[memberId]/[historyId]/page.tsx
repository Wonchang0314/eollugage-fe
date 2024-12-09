import { AttendanceForm } from '@/widgets'

export default function EditAttendancePage({
  params,
}: {
  params: { historyId: string; storeId: string; memberId: string }
}) {
  return (
    <AttendanceForm
      type="edit"
      historyId={params.historyId}
      storeId={params.storeId}
      memberId={params.memberId}
    />
  )
}
