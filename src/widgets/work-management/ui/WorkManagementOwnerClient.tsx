'use client'

import React, { useEffect } from 'react'

import { useAtom } from 'jotai'
import { useMembers } from '@/entities'
import { sendRNFunction } from '@/shared'
import { selectedMemberAtom } from '../atoms/workManagementAtoms'
import AttendanceInfo from './AttendanceInfo'
import AddAttendanceLink from './AddAttendanceLink'
import MemberSelector from './MemberSelector'

export default function WorkManagementOwnerClient({ storeId }: { storeId: string }) {
  const { members } = useMembers(storeId)
  const [selectedMemberId, setSelectedMemberID] = useAtom(selectedMemberAtom)
  useEffect(() => {
    if (selectedMemberId === null) {
      setSelectedMemberID(members ? members[0]?.memberId : null)
    }
  }, [selectedMemberId])

  useEffect(() => {
    sendRNFunction('setStatusbarStyle', { color: '#131313', style: 'light' })
  }, [])

  return (
    <>
      <MemberSelector storeId={storeId} />
      <AttendanceInfo storeId={storeId} memberId={selectedMemberId} isOwner />
      <div className="bottom-6 right-4 absolute">
        <AddAttendanceLink storeId={storeId} />
      </div>
    </>
  )
}
