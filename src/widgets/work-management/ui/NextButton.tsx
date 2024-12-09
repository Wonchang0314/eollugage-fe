/* eslint-disable import/no-cycle */
import { getWeekOfMonth } from '@/shared'
import { Icon } from '@eolluga/eolluga-ui'
import { useRef } from 'react'
import handleNext from '../utils/handleNext'
import useAttendance from '../hooks/useAttendance'

interface Today {
  yearMonthly: number
  monthMonthly: number
  weekOfMonth: number
  monthWeekly: number
}
export default function NextButton() {
  const todayRef = useRef<Today>({
    yearMonthly: new Date().getFullYear(),
    monthMonthly: new Date().getMonth() + 1,
    weekOfMonth: getWeekOfMonth(new Date()).weekOfMonth,
    monthWeekly: getWeekOfMonth(new Date()).month,
  })
  const {
    type,
    monthMonthly,
    monthWeekly,
    yearMonthly,
    yearWeekly,
    weekOfMonthWeekly,
    setMonthWeekly,
    setWeekOfMonthWeekly,
    setYearWeekly,
    setMonthMonthly,
    setYearMonthly,
  } = useAttendance()

  return (
    <button
      type="button"
      onClick={() =>
        handleNext(
          type,
          monthMonthly,
          monthWeekly,
          yearMonthly,
          yearWeekly,
          weekOfMonthWeekly,
          setYearMonthly,
          setMonthMonthly,
          setMonthWeekly,
          setWeekOfMonthWeekly,
          setYearWeekly,
        )
      }
      aria-label="다음"
      disabled={
        type === 'MONTHLY'
          ? todayRef.current.monthMonthly === monthMonthly &&
            todayRef.current.yearMonthly === yearMonthly
          : todayRef.current.weekOfMonth === weekOfMonthWeekly &&
            todayRef.current.monthWeekly === monthWeekly
      }
    >
      <Icon
        icon="chevron_right_outlined"
        className={`${
          type === 'MONTHLY'
            ? todayRef.current.monthMonthly === monthMonthly &&
              todayRef.current.yearMonthly === yearMonthly &&
              'fill-text-disabled'
            : todayRef.current.weekOfMonth === weekOfMonthWeekly &&
              todayRef.current.monthWeekly === monthWeekly &&
              'fill-text-disabled'
        }`}
      />
    </button>
  )
}
