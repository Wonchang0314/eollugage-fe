import { WorkManagement } from '@/widgets'

export default function ManagePage({ params }: { params: { storeId: string } }) {
  return <WorkManagement storeId={params.storeId} />
}
