'use client'

import { useEffect, useRef, memo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ZINDEX } from '../constants/zIndex'

interface ToastMessageProps {
  message: string
  icon: 'check' | 'warning'
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function ToastMessage({ message, icon, open, setOpen }: ToastMessageProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (open) {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      timerRef.current = setTimeout(() => {
        setOpen(false)
        timerRef.current = null
      }, 2400)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [open, setOpen])

  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={open ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{ willChange: 'opacity, transform' }}
      className={`flex flex-row px-spacing-05 py-spacing-03 bg-layer-inverse rounded-full w-full max-w-[calc(100%-32px)] transition-opacity justify-between absolute bottom-[100px] z-[${ZINDEX.TOAST_MESSAGE}]`}
    >
      <div className="flex flex-row items-center">
        {icon === 'check' && (
          <Image height={20} width={20} alt="check icon" src="/image/check-icon.svg" />
        )}
        {icon === 'warning' && (
          <Image height={20} width={20} alt="warning icon" src="/image/warning-icon.svg" />
        )}
        <span className="pl-2 text-text-on-color body-01-medium">{message}</span>
      </div>
    </motion.div>
  )
}

export default memo(ToastMessage)
