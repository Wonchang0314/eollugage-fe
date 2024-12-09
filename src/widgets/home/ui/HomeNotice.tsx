import { Icon } from '@eolluga/eolluga-ui'
import Link from 'next/link'
import HomeBundle from './HomeBundle'

interface HomeNoticeProps {
  storeId: string
  notice: string
}

export default function HomeNotice({ storeId, notice }: HomeNoticeProps) {
  return (
    <HomeBundle
      title="가게 공지"
      rightChild={
        <Link href={`/${storeId}/home/notice`} passHref>
          <Icon icon="chevron_right_outlined" size={20} />
        </Link>
      }
      lowChild={
        <Link
          href={`/${storeId}/home/notice`}
          className={`w-full border border-border-subtle-01 px-spacing-04 rounded-radius-04 py-[15px] label-04-medium ${notice.length === 0 ? 'text-text-placeholder' : 'text-text-primary'}`}
          passHref
        >
          {notice.length === 0 ? '공지가 아직 없어요' : notice}
        </Link>
      }
    />
  )
}
