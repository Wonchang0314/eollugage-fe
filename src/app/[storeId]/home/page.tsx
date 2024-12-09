import { HomeWidgetServer } from '@/widgets'

interface HomePageProps {
  params: {
    storeId: string
  }
}

export default function HomePage({ params }: HomePageProps) {
  return <HomeWidgetServer storeId={params.storeId} />
}
