'use client'

import { useState } from 'react'
import { useAtom } from 'jotai'
import { useParams, useRouter } from 'next/navigation'
import { ButtonMobile, TopBar, CheckBox } from '@eolluga/eolluga-ui'
import { userNameAtom } from '@/shared/atoms/globalAtom'
import { useDeleteUser } from '@/widgets/setting/model/useDeleteUser'

export default function Quit() {
  const { push } = useRouter()
  const { storeId } = useParams()
  const [userName] = useAtom(userNameAtom)
  const [isChecked, setIsChecked] = useState(false)
  const { mutate: deleteUserMutation } = useDeleteUser()

  const handleExit = () => {
    if (isChecked) deleteUserMutation()
    else console.log('동의 확인란이 체크되지 않았습니다.')
  }

  return (
    <div className="pt-4">
      <TopBar
        leftIcon="close"
        title=""
        onClickLeftIcon={() => push(`/${storeId}/mypage/setting`)}
      />
      <div className="mt-4">
        <div className="flex flex-col gap-spacing-02 p-4">
          <h2 className="body-05-bold">
            {userName}님, <br />
            탈퇴하기 전에 확인해주세요
          </h2>
          <ul className="flex flex-col pt-2 gap-4">
            <li className="relative pl-4 text-text-secondary">
              <span className="absolute left-0 top-1 text-text-secondary font-black text-xl">
                ·
              </span>
              얼루가게 서비스에서 탈퇴되며 다른 제휴 서비스는 이용이 가능해요.
            </li>
            <li className="relative pl-4 text-text-secondary">
              <span className="absolute left-0 top-1 text-text-secondary font-black text-xl">
                ·
              </span>
              얼루가게 서비스에서 탈퇴되며 이전 데이터는 복구가 불가능해요.
            </li>
            <li className="relative pl-4 text-text-secondary">
              <span className="absolute left-0 top-1 text-text-secondary font-black text-xl">
                ·
              </span>
              얼루가게를 탈퇴하고 재가입하더라도 기존 회원 정보 및 근무 정보 등 저희가 관리한
              정보들은 다시 볼 수 없어요.
            </li>
            <li className="relative pl-4 text-text-secondary">
              <span className="absolute left-0 top-1 text-text-secondary font-black text-xl">
                ·
              </span>
              가게를 운영 중이시라면 운영 중이신 가게가 폐쇄돼고, 가게에 가입한 직원들은 모두 탈퇴
              처리가 돼요.
            </li>
          </ul>
        </div>
      </div>
      <footer className="w-full py-3 px-4 fixed bottom-4">
        <div
          role="checkbox"
          aria-checked={isChecked}
          tabIndex={0}
          className="mb-4"
          onClick={() => setIsChecked(!isChecked)}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsChecked(!isChecked)
            }
          }}
        >
          <CheckBox alert="동의확인란" size="L" state="enable" title="확인했습니다" />
        </div>
        <ButtonMobile
          style="primary"
          size="L"
          type="text"
          state={isChecked ? 'enabled' : 'disabled'}
          text1="탈퇴하기"
          onClick={handleExit}
        />
      </footer>
    </div>
  )
}
