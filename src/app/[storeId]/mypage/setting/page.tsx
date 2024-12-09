import SettingWidget from '@/widgets/setting/ui/SettingWidget'

export default function SettingPage({ params }: { params: { storeId: string } }) {
  return (
    <main className="body-03-medium">
      <SettingWidget storeId={params.storeId} />
    </main>
  )
}
