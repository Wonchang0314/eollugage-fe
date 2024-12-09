import FlexBox from '@/shared/ui/Flexbox'
import { Avatar, ButtonMobile, TopBar } from '@eolluga/eolluga-ui'
import { useRouter } from 'next/navigation'
import useJoin from '../hooks/useJoin'

interface UserProfileProps {
  name: string
  store: string
  storeId: string
  handlePreviousStep: () => void
}

export default function UserProfile({
  name,
  store,
  storeId,
  handlePreviousStep,
}: UserProfileProps) {
  const router = useRouter()
  const { isOwner } = useJoin()
  return (
    <>
      <TopBar leftIcon="chevron_left_outlined" onClickLeftIcon={handlePreviousStep} />
      <FlexBox direction="col" className="gap-spacing-04 mt-[152px]">
        <div className="text-white">
          <Avatar size="XL" backgroundColor="in-gray" text={name[0]} />
        </div>
        <FlexBox direction="col" className="gap-spacing-01">
          <div className="head-02-bold">
            {name} {isOwner ? '사장님' : '직원'}
          </div>
          <div className="body-03-medium text-text-secondary">{store}</div>
        </FlexBox>
        <FlexBox direction="col" className="w-full px-spacing-04 py-spacing-03 absolute bottom-4">
          <ButtonMobile
            size="L"
            style="primary"
            state="enabled"
            type="text"
            text1={isOwner ? '프로필 생성하기' : '출근하기'}
            onClick={
              isOwner
                ? () => router.push(`join/upload-image?storeId=${storeId}`)
                : () => router.push(`/${storeId}/home`)
            }
          />
        </FlexBox>
      </FlexBox>
    </>
  )
}
