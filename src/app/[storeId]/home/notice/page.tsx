import NoticeWidget from '@/widgets/home/ui/NoticeWidget'

interface NoticePageProps {
  params: {
    storeId: string
  }
}

export default function NoticePage({ params }: NoticePageProps) {
  return <NoticeWidget storeId={params.storeId} />
}
