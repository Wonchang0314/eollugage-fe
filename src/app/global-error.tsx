'use client'

import * as Sentry from '@sentry/nextjs'
import Error from 'next/error'
import { useEffect } from 'react'
import { Flexbox, deleteTokenFromCookie } from '@/shared'
import ButtonMobile from '@eolluga/eolluga-ui/Navigation/ButtonMobile'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string; message?: string }
  reset: () => void
}) {
  const onClickHomeBtn = () => {
    deleteTokenFromCookie()
  }

  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="en">
      <body className="h-dvh">
        <Flexbox direction="col" className="w-full h-full justify-center gap-10">
          <div>{error.message}</div>
          <Flexbox direction="col" className="w-full gap-4 px-4">
            <ButtonMobile
              size="L"
              mode="primary"
              state="enabled"
              type="text"
              text1="다시 시도하기"
              onClick={() => reset()}
            />
            <Link
              href="/"
              onClick={onClickHomeBtn}
              className="w-full label-03-bold text-text-on-color py-spacing-05 rounded-radius-04 bg-button-primary text-center"
            >
              홈으로 돌아가기
            </Link>
          </Flexbox>
        </Flexbox>
      </body>
    </html>
  )
}
