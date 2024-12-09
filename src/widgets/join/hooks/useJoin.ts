import { useCallback } from 'react'
import { useAtom } from 'jotai'
import { isOwnerAtom, stepAtom } from '../atoms/joinAtoms'

export default function useJoin() {
  const [step, setStep] = useAtom(stepAtom)
  const [isOwner, setIsOwner] = useAtom(isOwnerAtom)

  const handlePreviousStep = () => {
    setStep(prevStep => (prevStep > 0 ? prevStep - 1 : 0)) // 스텝을 0 이하로 내려가지 않도록 설정
  }

  const handleNextStep = () => {
    setStep(prevStep => prevStep + 1) // 동적으로 다음 스텝으로 이동
  }

  const setMemberRole = useCallback(() => {
    setIsOwner(false)
  }, [setIsOwner])

  const setOwnerRole = useCallback(() => {
    setIsOwner(true)
  }, [setIsOwner])

  return {
    step,
    handleNextStep,
    handlePreviousStep,
    isOwner,
    setMemberRole,
    setOwnerRole,
  }
}
