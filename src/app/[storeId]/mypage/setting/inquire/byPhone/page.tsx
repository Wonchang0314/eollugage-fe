import ByPhoneWidget from '@/widgets/inquire/ui/ByPhoneWidget'

export default function ByPhonePage({ params }: { params: { storeId: string } }) {
  return <ByPhoneWidget storeId={params.storeId} />
}
