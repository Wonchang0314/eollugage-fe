import { Members } from '@/entities'
import DragScrollWrapper from './DragScrollWrapper'
import MemberItem from './MemberItem'

export default function MemberList({ members }: { members: Members | undefined }) {
  if (!members) return null
  return (
    <DragScrollWrapper>
      {members.map((member, i) => (
        <>
          {i === 0 && <span className="w-[16px] h-1" />}
          <MemberItem member={member} key={member.memberId} isFirstItem={i === 0} />
        </>
      ))}
    </DragScrollWrapper>
  )
}
