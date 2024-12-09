'use client'

import { Dialog, Icon, Scrim } from '@eolluga/eolluga-ui'
import { useState } from 'react'
import Link from 'next/link'
import { OrderT } from '@/entities/home/api/home'
import HomeBundle from './HomeBundle'

interface OrderListProps {
  storeId: string
  orderList: OrderT[]
}

export default function OrderList({ storeId, orderList }: OrderListProps) {
  const [open, setOpen] = useState(false)
  const [nowModal, setNowModal] = useState<OrderT | null>(null)
  const handleOpen = (item: OrderT) => {
    setNowModal(item)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setNowModal(null)
  }

  return (
    <>
      <HomeBundle
        title="발주 리스트"
        description="발주 항목을 수정하려면 클릭해주세요"
        rightChild={
          <Link href={`/${storeId}/home/order`} passHref>
            <Icon icon="add" size={24} />
          </Link>
        }
        lowChild={
          <div className="grid grid-cols-2 gap-4 w-full">
            {orderList.map(item => (
              <div
                key={item.id}
                className="flex flex-col gap-2 p-4 border border-border-subtle-01 rounded"
                onClick={() => handleOpen(item)}
                aria-hidden="true"
              >
                <div className="body-04-medium-compact w-full">{item.title}</div>
                <div className="body-03-medium-compact text-text-secondary w-full line-clamp-2">
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        }
      />
      {open && nowModal && (
        <Scrim
          className="fixed inset-0 z-40 flex items-center justify-center"
          onClick={handleClose}
        >
          <Dialog
            open={open}
            onClose={handleClose}
            title={nowModal.title}
            description={nowModal.content}
            dismissible
          />
        </Scrim>
      )}
    </>
  )
}
