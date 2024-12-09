import { getPositions } from '@/features/mypage/api/getPositions'
import PositionWidget from '@/widgets/mypage/ui/PositionWidget'
import groupByPosition from '@/shared/utils/groupByPosition'

export default async function PositionPage({ params }: { params: { storeId: string } }) {
  const initialData = await getPositions(params.storeId)
  const data = groupByPosition(initialData)
  return <PositionWidget storeId={params.storeId} data={data} />
}
