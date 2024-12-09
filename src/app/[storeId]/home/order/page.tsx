import OrderWidget from '@/widgets/home/ui/OrderWidget'

interface OrderPageProps {
  params: {
    storeId: string
  }
}

export default function OrderPage({ params }: OrderPageProps) {
  return <OrderWidget storeId={params.storeId} />
}
