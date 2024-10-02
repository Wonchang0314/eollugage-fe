'use client'

import { TopBar, Icon } from '@eolluga/eolluga-ui'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import AlarmPage from './alarm'
import PrivacyPage from './privacy'
import privacyPolicyData from '@/data/privacyPolicy.json'
import AppInfoPage from './appInfo'
import BusinessInfoPage from './businessInfo'
import LogOutModal from './logOut'
import QuitPage from './quit'

export type SettingsView = 'alarm' | 'appInfo' | 'businessInfo' | 'privacy' | 'quit' | 'settings'

export default function SettingPage() {
  const router = useRouter()
  const [currentView, setCurrentView] = useState<SettingsView>('settings')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleChangeView = (value: SettingsView) => {
    setCurrentView(value)
  }

  return (
    <main className="body-03-medium">
      {currentView === 'settings' && (
        <div className="pt-4 pb-24">
          <TopBar leftIcon="chevron_left_outlined" title="설정" onClickLeftIcon={() => router.push('/mypage')} />
          <div className="pt-4">
            <ul className="flex flex-col gap-spacing-02 p-4">
              <li className="flex justify-between py-spacing-04">
                <span>알림</span>
                <div onClick={() => handleChangeView('alarm')}>
                  <Icon icon="chevron_right_outlined" />
                </div>
              </li>
            </ul>

            <div className="h-[12px] bg-Gray-10" />

            <ul className="flex flex-col gap-spacing-02 p-4">
              <li className="flex justify-between py-spacing-04">
                <span>개인정보 처리방침</span>
                <div onClick={() => handleChangeView('privacy')}>
                  <Icon icon="chevron_right_outlined" />
                </div>
              </li>
              <li className="flex justify-between py-spacing-04">
                <span>문의하기</span>
                <div onClick={() => router.push('/mypage/setting/inquire')}>
                  <Icon icon="chevron_right_outlined" />
                </div>
              </li>
            </ul>

            <div className="h-[12px] bg-Gray-10" />

            <ul className="flex flex-col gap-spacing-02 p-4">
              <li className="flex justify-between py-spacing-04">
                <span>앱 버전</span>
                <div onClick={() => handleChangeView('appInfo')}>
                  <Icon icon="chevron_right_outlined" />
                </div>
              </li>
              <li className="flex justify-between py-spacing-04">
                <span>사업자 정보</span>
                <div onClick={() => handleChangeView('businessInfo')}>
                  <Icon icon="chevron_right_outlined" />
                </div>
              </li>
            </ul>

            <div className="h-[12px] bg-Gray-10" />

            <ul className="flex flex-col gap-spacing-02 p-4">
              <li className="flex justify-between py-spacing-04">
                <span>로그아웃</span>
                <div onClick={() => setIsModalOpen(true)}>
                  <Icon icon="chevron_right_outlined" />
                </div>
              </li>
              <li className="flex justify-between py-spacing-04">
                <span>탈퇴하기</span>
                <div onClick={() => handleChangeView('quit')}>
                  <Icon icon="chevron_right_outlined" />
                </div>
              </li>
            </ul>
          </div>
          {isModalOpen && <LogOutModal setIsModalOpen={() => setIsModalOpen(false)} />}
        </div>
      )}

      {currentView === 'alarm' && <AlarmPage handleChangeView={handleChangeView} />}
      {currentView === 'privacy' && (
        <PrivacyPage privacyPolicyData={privacyPolicyData} handleChangeView={handleChangeView} />
      )}
      {currentView === 'appInfo' && <AppInfoPage handleChangeView={handleChangeView} />}
      {currentView === 'businessInfo' && <BusinessInfoPage handleChangeView={handleChangeView} />}
      {currentView === 'quit' && <QuitPage handleChangeView={handleChangeView} />}
    </main>
  )
}
