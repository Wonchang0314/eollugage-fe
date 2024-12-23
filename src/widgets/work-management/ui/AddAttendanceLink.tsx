import Icon from '@eolluga/eolluga-ui/icon/Icon'
import Link from 'next/link'

export default function AddAttendanceLink({ storeId }: { storeId: string }) {
  return (
    <Link
      href={`/${storeId}/manage/add-attendance`}
      className="space-x-1 flex items-center px-4 py-3 bg-[#131313] rounded-full"
    >
      <Icon icon="add" className="fill-white" />
      <span className="text-white text-sm font-bold tracking-tighter" aria-label="근무추가">
        근무추가
      </span>
    </Link>
  )
}
