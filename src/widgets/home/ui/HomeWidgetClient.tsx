'use client'

import Header from '@/widgets/home/ui/Header'
import FlexBox from '@/shared/ui/Flexbox'
import AddPhotoButton from '@/widgets/home/ui/AddPhotoButton'
import HomeNotice from '@/widgets/home/ui/HomeNotice'
import TodayWork from '@/widgets/home/ui/TodayWork'
import OrderList from '@/widgets/home/ui/OrderList'
import { formatCurrentDate } from '@/features'
import { useAtom } from 'jotai'
import { storeInfoAtom, StoreInfoT } from '@/entities'
import { useHydrateAtoms } from 'jotai/utils'
import { useEffect } from 'react'
import { sendRNFunction } from '@/shared'
import { useGetOrder } from '../model/useGetOrder'
import { useGetTodayDuty } from '../model/useGetTodyDuty'

interface HomeWidgetClientProps {
  storeId: string
  initialStoreInfo: StoreInfoT
  isOwner: boolean
}

export default function HomeWidgetClient({
  storeId,
  initialStoreInfo,
  isOwner = false,
}: HomeWidgetClientProps) {
  useHydrateAtoms([[storeInfoAtom, initialStoreInfo]])

  const { data: orderList } = useGetOrder(storeId)
  const { data: workList } = useGetTodayDuty(storeId, formatCurrentDate())
  const [storeInfo] = useAtom(storeInfoAtom)

  useEffect(() => {
    sendRNFunction('setStatusbarStyle', { color: '#000', style: 'light' })
  }, [])

  return (
    <>
      <Header title={storeInfo.name || ''} storeCode={storeId.slice(0, 4)} />
      <div className="mt-[76px]">
        {isOwner && storeInfo.image === 'NONE' ? <AddPhotoButton storeId={storeId} /> : null}
        <FlexBox direction="col" className="gap-8 mx-4">
          <HomeNotice storeId={storeId} notice={storeInfo.internalNotice || ''} />
          <TodayWork workList={workList?.histories || []} />
          <OrderList storeId={storeId} orderList={orderList || []} />
        </FlexBox>
      </div>
    </>
  )
}
