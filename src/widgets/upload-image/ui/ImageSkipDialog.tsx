import { Dialog, Scrim } from '@eolluga/eolluga-ui'
import { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'

interface ImageSkipDialogProps {
  storeId: string
  isShowDialog: boolean
  setIsShowDialog: Dispatch<SetStateAction<boolean>>
  onSelectImage: () => void
}

export default function ImageSkipDialog({
  storeId,
  isShowDialog,
  setIsShowDialog,
  onSelectImage,
}: ImageSkipDialogProps) {
  const router = useRouter()

  const closeDialog = () => setIsShowDialog(false)

  const skipImageUpload = () => {
    setIsShowDialog(false)
    router.replace(`/${storeId}/home`)
  }

  const retryImageUpload = () => {
    setIsShowDialog(false)
    onSelectImage()
  }

  if (isShowDialog)
    return (
      <Scrim className="fixed inset-0 z-40 flex items-center justify-center" onClick={closeDialog}>
        <Dialog
          open={isShowDialog}
          onClose={closeDialog}
          title="가게를 이대로 완성하실 건가요?"
          description={`가게 사진을 추가했을 때 손님들이 더 좋아해요.\n이대로 가게를 완성하실 건가요?`}
          leftText="사진 추가하기"
          rightText="이대로 완성하기"
          dismissible
          leftOnClick={retryImageUpload}
          rightOnClick={skipImageUpload}
        />
      </Scrim>
    )

  return null
}
