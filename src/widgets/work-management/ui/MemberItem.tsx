'use client'

import { Avatar } from '@eolluga/eolluga-ui'
import { useAtom } from 'jotai'
import { Member } from '@/entities'
import { selectedMemberAtom } from '../atoms/workManagementAtoms'

export default function MemberItem({
  member,
  isFirstItem,
}: {
  member: Member
  isFirstItem: boolean
}) {
  const [selectedMemberIDAtom, setSelectedMemberIDAtom] = useAtom(selectedMemberAtom)
  return (
    <button
      className=" w-[48px] flex flex-col space-y-1 items-center justify-end text-center"
      type="button"
      onClick={() => setSelectedMemberIDAtom(member.memberId)}
    >
      <span
        className={`${(selectedMemberIDAtom === null && isFirstItem) || selectedMemberIDAtom === member.memberId ? 'border border-white rounded-full' : 'opacity-70'}`}
      >
        <Avatar size="S" />
      </span>
      <div>
        <p
          className={`body-02-medium-compact  ${(selectedMemberIDAtom === null && isFirstItem) || selectedMemberIDAtom === member.memberId ? 'text-white' : 'text-[#8D8D8D]'}`}
        >
          {member.name}
        </p>
        <p
          className={`body-01-medium-compact ${(selectedMemberIDAtom === null && isFirstItem) || selectedMemberIDAtom === member.memberId ? 'text-[#6F6F6F]' : 'text-[#8D8D8D]'}`}
        >
          {member.position}
        </p>
      </div>
    </button>
  )
}
