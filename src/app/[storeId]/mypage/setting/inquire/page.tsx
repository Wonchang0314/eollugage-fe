import InquireWidget from '@/widgets/inquire/ui/InquireWidget'

export default function InquirePage({ params }: { params: { storeId: string } }) {
  return (
    <main>
      <InquireWidget storeId={params.storeId} />
    </main>
  )
}
