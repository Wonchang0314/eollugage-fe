import { Icon } from '@eolluga/eolluga-ui'
import { useRouter } from 'next/navigation'

export default function Header({ type }: { type: 'add' | 'edit' }) {
  const router = useRouter()
  return (
    <header className="h-[32px] text-center relative flex items-center justify-center  font-medium pt-[18px] mb-[32px]">
      <button
        className="absolute left-[14px] top-1/2 -translate-y-1/2 pt-[18px] "
        type="button"
        aria-label="뒤로가기"
        onClick={() => router.back()}
      >
        <Icon icon="chevron_left_outlined" />
      </button>

      <h2>{type === 'edit' ? '근무 수정' : '근무 추가'}</h2>
    </header>
  )
}
