import { useAtom } from 'jotai'
import { Dialog, Scrim } from '@eolluga/eolluga-ui'
import { isSuccessAtom } from '../atoms/uploadImageAtoms'

interface ImageErrorDialogProps {
  onRetry: () => void
}

export default function ImageErrorDialog({ onRetry }: ImageErrorDialogProps) {
  const [isImageSuccess, setIsImageSuccess] = useAtom(isSuccessAtom)

  const handleCloseDialog = () => {
    setIsImageSuccess(false)
  }

  const retryImageUpload = () => {
    setIsImageSuccess(undefined)
    onRetry()
  }

  if (isImageSuccess === false)
    return (
      <Scrim
        className="fixed inset-0 z-40 flex items-center justify-center"
        onClick={handleCloseDialog}
      >
        <Dialog
          open={isImageSuccess === false}
          onClose={handleCloseDialog}
          title="사진 업로드에 문제가 생겼어요"
          description="같은 문제가 반복된다면 앱을 껐다 켜주세요."
          leftText="닫기"
          rightText="다시 시도하기"
          dismissible
          leftOnClick={handleCloseDialog}
          rightOnClick={retryImageUpload}
        />
      </Scrim>
    )

  return null
}
