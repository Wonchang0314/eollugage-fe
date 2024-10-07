'use client'

import FlexBox from '@/component/shared/flexbox'
import RoleSelection from '@/widgets/join/ui/RoleSelection'
import SignupName from '@/widgets/join/ui/SignupName'
import { TopBar } from '@eolluga/eolluga-ui'
import { useState } from 'react'

export default function JoinPage() {
  return (
    <FlexBox direction="col" className="bg-white w-full h-full items-center w-full h-full relative ">
      <TopBar leftIcon="chevron_left_outlined" />
      <RoleSelection />
      <SignupName />
    </FlexBox>
  )
}
