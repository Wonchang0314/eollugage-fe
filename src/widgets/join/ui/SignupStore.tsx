/* eslint-disable implicit-arrow-linebreak */

'use client'

import FlexBox from '@/shared/ui/Flexbox'
import { ButtonMobile, Dialog, Scrim, TextField, TopBar } from '@eolluga/eolluga-ui'
import { useState } from 'react'
import ToastMessage from '@/shared/ui/ToastMessage'
import { useAtom } from 'jotai'
import useJoin from '../hooks/useJoin'
import BottomSheet from './BottomSheet'
import { usePostStoreInfo } from '../model/usePostStoreInfo'
import { useGetStoreInfoPrefix } from '../model/useGetStoreInfoPrefix'
import { isValidCodeAtom, memberIdAtom, storeNameAtom } from '../atoms/joinAtoms'
import { usePostMember } from '../model/usePostMember'

interface SignupStoreProps {
  name: string
  store: string
  setStore: React.Dispatch<React.SetStateAction<string>>
  storeId: string
  setStoreId: React.Dispatch<React.SetStateAction<string>>
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleStoreChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  hadleStoreIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleNextStep: () => void
  handlePreviousStep: () => void
}

export default function SignupStore({
  name,
  store,
  storeId,
  handleNameChange,
  handleStoreChange,
  hadleStoreIdChange,
  handleNextStep,
  handlePreviousStep,
  setStore,
  setStoreId,
}: SignupStoreProps) {
  const { isOwner } = useJoin()
  const [openDialog, setOpenDialog] = useState(false)
  const [openBottomSheet, setOpenBottomSheet] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [approvalFailed, setApprovalFailed] = useState(false)

  const [storeName] = useAtom(storeNameAtom)
  const [isValidCode] = useAtom(isValidCodeAtom)
  const [memberId] = useAtom(memberIdAtom)

  const { mutate: postStoreInfoMutate } = usePostStoreInfo(storeName)
  const { mutate: getStoreInfoPrefixMutate } = useGetStoreInfoPrefix(storeId.slice(0, 4))
  const { mutate: postMemberMutate } = usePostMember(storeId, memberId)
  const handleOpenDialog = () => {
    setApprovalFailed(false)

    getStoreInfoPrefixMutate(undefined, {
      onSuccess: res => {
        setOpenDialog(true)
        setShowToast(false)
        setStoreId(res.storeId)
      },
      onError: () => {
        setApprovalFailed(true)
      },
    })
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleOpenBottomSheet = () => {
    if (!storeId) {
      postStoreInfoMutate(undefined, { onSuccess: res => setStoreId(res.id) })
    }
    setOpenBottomSheet(true)
  }

  const handleDisagree = () => {
    setShowToast(true)
    setOpenDialog(false)
  }

  const handleAgree = () => {
    postMemberMutate(undefined, {
      onSuccess: () => {
        handleNextStep()
      },
      onError: error => {
        setApprovalFailed(true)
        setStore('')
        setOpenDialog(false)
        setShowToast(true)
        console.error('멤버 추가 실패:', error)
      },
    })
  }
  const getGreetingText = () =>
    isOwner ? (
      <>
        사장님의 <br />
        가게 이름을 알려주세요
      </>
    ) : (
      <>
        근무 중인 가게의
        <br />
        코드를 입력해주세요
      </>
    )

  const getButtonState = () => {
    if (isOwner) {
      return store.length >= 1 ? 'enabled' : 'disabled'
    }
    return storeId.length === 4 ? 'enabled' : 'disabled'
  }

  return (
    <>
      <TopBar leftIcon="chevron_left_outlined" onClickLeftIcon={handlePreviousStep} />
      <div className="w-full head-02-bold h-[52px] px-spacing-04 text-left mt-spacing-06 mb-[66px]">
        {getGreetingText()}
      </div>
      <FlexBox direction="col" className="w-full px-spacing-04 gap-spacing-08">
        <TextField
          onChange={isOwner ? handleStoreChange : hadleStoreIdChange}
          size="L"
          style="underlined"
          label={isOwner ? '가게 이름' : '근무 중인 가게 코드'}
          placeholder={isOwner ? '가게 이름을 입력해주세요' : '가게 코드를 입력해주세요'}
          value={isOwner ? store : storeId.slice(0, 4)}
          state={approvalFailed ? 'error' : 'enable'}
          description={approvalFailed ? '가게 코드를 확인해주세요' : ''}
        />
        <TextField
          onChange={handleNameChange}
          size="L"
          style="underlined"
          label="이름"
          placeholder="이름을 입력해주세요"
          state="readOnly"
          value={name}
        />
        <FlexBox direction="col" className="w-full p-spacing-04 absolute bottom-4">
          {showToast && (
            <div className="w-full mb-spacing-03">
              <ToastMessage
                message="가게 코드를 확인해주세요"
                icon="warning"
                open={showToast}
                setOpen={setShowToast}
              />
            </div>
          )}
          <ButtonMobile
            size="L"
            style="primary"
            state={getButtonState()}
            type="text"
            text1={isOwner ? '가게 코드 받기' : '코드 승인 받기'}
            onClick={isOwner ? handleOpenBottomSheet : handleOpenDialog}
          />
        </FlexBox>
        {isValidCode && openDialog && (
          <Scrim
            className="fixed inset-0 z-40 flex items-center justify-center"
            onClick={handleCloseDialog}
          >
            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              title="코드 승인"
              description={`코드가 승인되었습니다. 가게 이름이 ${storeName} 맞나요?`}
              leftText="아니요"
              rightText="네"
              dismissible
              leftOnClick={handleDisagree}
              rightOnClick={handleAgree}
            />
          </Scrim>
        )}
        {openBottomSheet && (
          <BottomSheet
            storeId={storeId}
            openBottomSheet={openBottomSheet}
            setOpenBottomSheet={setOpenBottomSheet}
            handleNextStep={handleNextStep}
          />
        )}
      </FlexBox>
    </>
  )
}
