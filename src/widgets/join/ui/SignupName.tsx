'use client'

import FlexBox from '@/shared/ui/Flexbox'
import { ButtonMobile, TextField, TopBar } from '@eolluga/eolluga-ui'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ToastMessage } from '@/shared'
import { useAtom } from 'jotai'
import { RelationT } from '@/entities'
import { usePostLogin } from '../model/usePostLogin'
import { StoreT } from '../api/store'
import { memberIdAtom } from '../atoms/joinAtoms'

interface SignupNameProps {
  name: string
  phone: string
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleNextStep: () => void
  handlePreviousStep: () => void
}

export default function SignupName({
  name,
  phone,
  handleNameChange,
  handlePhoneChange,
  handleNextStep,
  handlePreviousStep,
}: SignupNameProps) {
  const [isValid, setIsValid] = useState(true) // 전화번호 유효성 에러 상태
  const [showToast, setShowToast] = useState(false)
  const [errorMessage, setErrorMessage] = useState('') // 토스트 메시지의 에러 내용
  const [, setMemberId] = useAtom(memberIdAtom)
  const router = useRouter()

  const handleStoreListCheck = (
    storeList: StoreT[],
    relationList: RelationT[],
    memberId: string,
  ) => {
    setMemberId(memberId)
    if (storeList && storeList.length > 0) router.push(`/${storeList[0].storeId}/home`)
    else if (relationList && relationList.length > 0)
      router.push(`/${relationList[0].storeId}/home`)
    else handleNextStep()
  }

  const { mutate } = usePostLogin({ name, phone }, handleStoreListCheck, error => {
    const reason = error?.response?.data?.reason || '로그인에 실패했습니다.'

    if (reason.includes('유효하지 않은 형식의 휴대폰 번호')) {
      setIsValid(false)
    } else {
      setIsValid(true)
      setErrorMessage(reason)
      setShowToast(true)
    }
  })

  const handleStartClick = () => {
    setIsValid(true)
    mutate()
  }

  return (
    <>
      <TopBar
        leftIcon="chevron_left_outlined"
        onClickLeftIcon={handlePreviousStep}
        title="전화번호로 시작하기"
      />
      <FlexBox direction="col" className="w-full px-spacing-04 gap-spacing-08 pt-spacing-08">
        <TextField
          onChange={handleNameChange}
          size="L"
          style="outlined"
          label="이름"
          placeholder="이름을 입력해주세요"
          value={name}
          description=" "
        />
        <TextField
          onChange={handlePhoneChange}
          size="L"
          style="outlined"
          label="전화번호"
          placeholder="전화번호를 입력해주세요"
          value={phone}
          state={isValid ? 'enable' : 'error'} // 전화번호 유효성 에러 시 에러 상태 표시
          description={isValid ? '' : '유효하지 않은 전화번호 형식입니다.'}
        />
      </FlexBox>
      <FlexBox direction="col" className="w-full p-spacing-04 absolute bottom-4">
        <ButtonMobile
          size="L"
          style="primary"
          state={name && phone ? 'enabled' : 'disabled'}
          type="text"
          text1="시작하기"
          onClick={handleStartClick}
        />
      </FlexBox>

      {showToast && (
        <ToastMessage
          message={errorMessage}
          icon="warning"
          open={showToast}
          setOpen={setShowToast}
        />
      )}
    </>
  )
}
