import { SetStateAction } from 'react'
import { SetAtom } from '@/shared'
import getObjectWeekOfMonth from './getObjectOfWeekOfMonth'

const handlePrev = (
  type: 'MONTHLY' | 'WEEKLY',
  monthMonthly: number,
  monthWeekly: number,
  yearMonthly: number,
  yearWeekly: number,
  weekOfMonthWeekly: number,
  setYearMonthly: SetAtom<[SetStateAction<number>], void>,
  setMonthMonthly: SetAtom<[SetStateAction<number>], void>,
  setMonthWeekly: SetAtom<[SetStateAction<number>], void>,
  setWeekOfMonthWeekly: SetAtom<[SetStateAction<number>], void>,
  setYearWeekly: SetAtom<[SetStateAction<number>], void>,
) => {
  const lastDayOfThePrevMonth = new Date(yearWeekly, monthWeekly - 1, 0).getDate()
  const dayOfThePrevMonthLastDay = new Date(yearWeekly, monthWeekly - 1, 0).getDay()
  const { weekOfMonth: monthWeekOfPrevMonthLastDay } = getObjectWeekOfMonth(
    new Date(yearWeekly, monthWeekly - 1, 0),
  )
  const weeksInPrevMonth =
    monthWeekOfPrevMonthLastDay === 5 || monthWeekOfPrevMonthLastDay === 4
      ? monthWeekOfPrevMonthLastDay
      : getObjectWeekOfMonth(
          new Date(yearWeekly, monthWeekly - 2, lastDayOfThePrevMonth - dayOfThePrevMonthLastDay),
        ).weekOfMonth

  switch (type) {
    case 'MONTHLY':
      if (monthMonthly === 1) {
        setYearMonthly(yearMonthly - 1)
        setMonthMonthly(12)
      } else {
        setYearMonthly(yearMonthly)
        setMonthMonthly(monthMonthly - 1)
      }
      break
    case 'WEEKLY':
      if (weekOfMonthWeekly === 1) {
        setYearWeekly(monthWeekly - 1 <= 0 ? yearWeekly - 1 : yearWeekly)
        setMonthWeekly(monthWeekly - 1 <= 0 ? 12 : monthWeekly - 1)
        setWeekOfMonthWeekly(weeksInPrevMonth)
      } else {
        setYearWeekly(yearWeekly)
        setMonthWeekly(monthWeekly)
        setWeekOfMonthWeekly(weekOfMonthWeekly - 1)
      }
      break
    default:
      break
  }
}
export default handlePrev
