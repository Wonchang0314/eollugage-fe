import { Drawer, DrawerContent } from '@/shared/ui/shadcn/drawer'
import FlexBox from '@/shared/ui/Flexbox'
import { ButtonMobile, TextField } from '@eolluga/eolluga-ui'

interface BottomSheetProps {
  openBottomSheet: boolean
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>
  handleNextStep: () => void
  storeId: string
}

export default function BottomSheet({
  openBottomSheet,
  setOpenBottomSheet,
  handleNextStep,
  storeId,
}: BottomSheetProps) {
  return (
    <Drawer open={openBottomSheet} onOpenChange={setOpenBottomSheet}>
      <DrawerContent>
        <FlexBox direction="col" className="p-spacing-04">
          <FlexBox direction="col" className="w-full text-left items-start gap-spacing-01 ">
            <div className="body-04-bold">가게 코드는 홈에서 확인할 수 있어요</div>
            <div className="body-01-regular-compact text-[#6F6F6F]">
              새 직원을 가게에 초대할 때 필요합니다. <br />
              직원에게 가게 코드를 공유해주세요.
            </div>
          </FlexBox>
          <div className="w-full mt-[48px] mb-[80px]">
            <TextField
              value={storeId.slice(0, 4)}
              label="가게 코드"
              size="L"
              style="underlined"
              state="readOnly"
              onChange={() => console.log('')}
            />
          </div>
          <div className="w-full">
            <ButtonMobile
              size="L"
              state="enabled"
              style="primary"
              text1="확인했습니다"
              type="text"
              onClick={() => handleNextStep()}
            />
          </div>
        </FlexBox>
      </DrawerContent>
    </Drawer>
  )
}
