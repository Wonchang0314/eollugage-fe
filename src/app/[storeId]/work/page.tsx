'use client'

import { Flexbox } from '@/shared'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import AppIcon from '@public/image/appIcon.png'

export default function AppRedirectPage({ params }: { params: { storeId: string } }) {
  useEffect(() => {
    const now = new Date().getTime()
    const appStoreTimeout = setTimeout(() => {
      const delay = new Date().getTime() - now

      if (delay < 5000) {
        window.location.href =
          'https://apps.apple.com/kr/app/%EC%96%BC%EB%A3%A8%EA%B0%80%EA%B2%8C/id6477911531'
      }
    }, 4000)

    window.location.href = `eollugage://manage/${params.storeId}`

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        clearTimeout(appStoreTimeout)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <Flexbox direction="col" className="w-full justify-center h-full">
      <Image
        src={AppIcon}
        width={200}
        height={200}
        alt="얼루가게 앱 아이콘"
        className="shadow-lg mb-spacing-05"
        style={{ borderRadius: '25%' }}
      />
      <div className="label-03-medium text-text-primary mb-spacing-10">
        얼루가게 앱으로 이동 중 입니다 . . .
      </div>
      <Flexbox className="body-02-medium gap-spacing-02">
        <span>앱이 없으신가요?</span>
        <Link
          href="https://apps.apple.com/kr/app/%EC%96%BC%EB%A3%A8%EA%B0%80%EA%B2%8C/id6477911531"
          className="underline text-text-placeholder label-02-bold"
        >
          앱 설치하기
        </Link>
      </Flexbox>
    </Flexbox>
  )
}
