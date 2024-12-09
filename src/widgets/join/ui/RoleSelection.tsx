'use client'

import { ButtonMobile, TopBar } from '@eolluga/eolluga-ui'
import { Flexbox } from '@/shared'
import BadgeCard from './BadgeCard'
import useJoin from '../hooks/useJoin'

interface RoleSelectionProps {
  handlePreviousStep: () => void
}
export default function RoleSelection({ handlePreviousStep }: RoleSelectionProps) {
  const { setMemberRole, setOwnerRole, handleNextStep } = useJoin()

  const handleMemberClick = () => {
    setMemberRole()
    handleNextStep()
  }

  const handleOwnerClick = () => {
    setOwnerRole()
    handleNextStep()
  }

  return (
    <>
      <TopBar leftIcon="chevron_left_outlined" onClickLeftIcon={handlePreviousStep} />
      <div className="w-full head-02-bold px-spacing-04 text-left mt-spacing-06 mb-[66px]">
        직원으로 근무 중인가요?
      </div>
      <BadgeCard />
      <Flexbox direction="col" className="w-full px-spacing-04 py-spacing-03 gap-spacing-02">
        <ButtonMobile
          onClick={handleMemberClick}
          size="L"
          state="enabled"
          style="primary"
          text1="네 직원이에요"
          type="text"
        />
        <Flexbox className="w-full justify-center">
          <button
            type="button"
            onClick={handleOwnerClick}
            className="py-3 label-02-bold text-text-disabled"
          >
            아니요 사장님이에요
          </button>
        </Flexbox>
      </Flexbox>
    </>
  )
}
