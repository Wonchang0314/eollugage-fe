'use client'

import FlexBox from '@/shared/ui/Flexbox'
import SignupName from '@/widgets/join/ui/SignupName'
import { useEffect, useState } from 'react'
import { RoleSelection, storeNameAtom, useJoin, SignupStore } from '@/widgets'
import { useRouter } from 'next/navigation'
import UserProfile from '@/widgets/join/ui/UserProfile'
import { useAtom } from 'jotai'
import { storeIdAtom } from '@/widgets/join/atoms/joinAtoms'
import { sendRNFunction } from '@/shared'

export default function JoinPage() {
  const { step, handleNextStep, handlePreviousStep } = useJoin()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [store, setStore] = useAtom(storeNameAtom)
  const [storeId, setStoreId] = useAtom(storeIdAtom)
  const router = useRouter()

  useEffect(() => {
    sendRNFunction('setStatusbarStyle', { color: '#FFF', style: 'dark' })
  }, [])

  useEffect(() => {
    if (step === 0) {
      router.replace('/')
    }
  }, [step, router])

  useEffect(() => {
    if (step === 1) {
      setName('')
      setPhone('')
    }
    if (step === 3) {
      setStore('')
    }
  }, [step])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
  }
  const handleStoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStore(e.target.value)
  }
  const hadleStoreIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoreId(e.target.value)
  }

  return (
    <FlexBox
      direction="col"
      className="bg-white w-full h-full items-center w-full h-full relative "
    >
      {step === 1 && (
        <SignupName
          name={name}
          phone={phone}
          handleNameChange={handleNameChange}
          handlePhoneChange={handlePhoneChange}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
        />
      )}
      {step === 2 && <RoleSelection handlePreviousStep={handlePreviousStep} />}
      {step === 3 && (
        <SignupStore
          name={name}
          store={store}
          setStore={setStore}
          storeId={storeId}
          setStoreId={setStoreId}
          handleNameChange={handleNameChange}
          handleStoreChange={handleStoreChange}
          hadleStoreIdChange={hadleStoreIdChange}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
        />
      )}
      {step === 4 && (
        <UserProfile
          name={name}
          store={store}
          storeId={storeId}
          handlePreviousStep={handlePreviousStep}
        />
      )}
    </FlexBox>
  )
}
