'use client'

import { useSearchParams } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './shadcn/alert-dialog'
import { formatTime } from '../utils/time'

export default function AttendanceButton({
  buttonText,
  onClick,
  status,
  error,
  disabled,
}: {
  buttonText: string
  onClick: () => void
  status: string
  error?: Error | null
  disabled: boolean
}) {
  const searchParams = useSearchParams()
  const isQr: boolean = searchParams.get('qr') === 'true'

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="bg-[#161616] h-[80px] w-full rounded-lg text-white body-03-bold disabled:bg-button-disabled disabled:text-white disabled:cursor-not-allowed"
          onClick={onClick}
          disabled={!isQr || disabled}
        >
          {buttonText}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-lg max-w-[calc(100%-48px)] space-y-[24px] gap-0">
        <AlertDialogHeader className="space-y-4 text-left">
          <AlertDialogTitle className="body-05-bold">
            {status === 'success' && `${buttonText} 처리 완료`}
            {status === 'error' && `${buttonText} 처리 실패`}
          </AlertDialogTitle>
          <AlertDialogDescription className="body-02-regular text-[#161616]">
            {status === 'success' && formatTime(new Date())}
            {status === 'error' && error?.message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:flex-col">
          <AlertDialogAction className="h-[40px]">확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
