'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { TopBar, Switch } from '@eolluga/eolluga-ui'
import { usePostNotification } from '../model/usePostNotification'

export default function AlarmWidget() {
  const { push } = useRouter()
  const { storeId } = useParams()
  const [isActive, setIsActive] = useState(false)
  const postNotification = usePostNotification()

  const handleSwitchChange = () => {
    setIsActive(prevState => !prevState)
    if (isActive && process.env.NEXT_PUBLIC_SECRET_KEY) {
      postNotification.mutate({
        title: '푸시 알림',
        content: '신규 직원 합류 알림이 활성화되었습니다.',
        type: 'ALL',
        secretKey: process.env.NEXT_PUBLIC_SECRET_KEY,
      })
    } else if (process.env.NEXT_PUBLIC_SECRET_KEY) {
      postNotification.mutate({
        title: '푸시 알림',
        content: '신규 직원 합류 알림이 비활성화되었습니다.',
        type: 'ALL',
        secretKey: process.env.NEXT_PUBLIC_SECRET_KEY,
      })
    } else {
      console.log('시크릿 키가 존재하지 않습니다')
    }
  }

  return (
    <div className="pt-4">
      <TopBar
        leftIcon="close"
        title="알림"
        onClickLeftIcon={() => push(`/${storeId}/mypage/setting`)}
      />
      <div className="mt-4">
        <ul className="flex flex-col gap-spacing-02 p-4">
          <li className="flex justify-between py-spacing-04">
            <span>신규 직원 합류 알림</span>
            <Switch state="enable" onClick={handleSwitchChange} />
          </li>
        </ul>
      </div>
    </div>
  )
}
