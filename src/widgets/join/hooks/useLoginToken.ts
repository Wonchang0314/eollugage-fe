'use client'

import { useUser } from '@/entities'
import { sendRNFunction, setTokenFromCookie } from '@/shared'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useLoginToken() {
  const router = useRouter()
  const pathname = usePathname()
  const [enabled, setEnabled] = useState<boolean>(false)
  const { userInfo } = useUser(enabled)

  const onSuccessGetToken = (token: string | undefined) => {
    if (token) {
      setTokenFromCookie(token, 7)
      setEnabled(true)
    }
  }

  useEffect(() => {
    sendRNFunction('getLoginToken')
  }, [])

  useEffect(() => {
    if (userInfo && pathname === '/') {
      if (userInfo.storeList.length > 0) router.replace(`/${userInfo.storeList[0].storeId}/home`)
      else if (userInfo.relationList.length > 0)
        router.replace(`/${userInfo.relationList[0].storeId}/home`)
    }
  }, [userInfo, pathname])

  return { onSuccessGetToken }
}
