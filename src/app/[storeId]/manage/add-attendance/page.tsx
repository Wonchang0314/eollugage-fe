import { AttendanceForm } from '@/widgets'

export default function AddAttendancePage({ params }: { params: { storeId: string } }) {
  return <AttendanceForm type="add" storeId={params.storeId} />
}
