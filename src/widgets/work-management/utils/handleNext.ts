import { SetStateAction } from 'react'
import { SetAtom } from '@/shared'
import getObjectWeekOfMonth from './getObjectOfWeekOfMonth'

const handleNext = (
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
  const lastDayOfTheseMonth = new Date(yearWeekly, monthWeekly, 0).getDate()
  const dayOfTheseMonthLastDay = new Date(yearWeekly, monthWeekly, 0).getDay()
  const { weekOfMonth: monthWeekOfTheseMonthLastDay } = getObjectWeekOfMonth(
    new Date(yearWeekly, monthWeekly, 0),
  )
  const weeksInTheseMonth =
    monthWeekOfTheseMonthLastDay === 5 || monthWeekOfTheseMonthLastDay === 4
      ? monthWeekOfTheseMonthLastDay
      : getObjectWeekOfMonth(
          new Date(yearWeekly, monthWeekly - 2, lastDayOfTheseMonth - dayOfTheseMonthLastDay),
        ).weekOfMonth

  switch (type) {
    case 'MONTHLY':
      if (monthMonthly === 12) {
        setYearMonthly(yearMonthly + 1)
        setMonthMonthly(1)
      } else {
        setYearMonthly(yearMonthly)
        setMonthMonthly(monthMonthly + 1)
      }
      break
    case 'WEEKLY':
      if (weekOfMonthWeekly === weeksInTheseMonth) {
        setYearWeekly(monthWeekly + 1 > 12 ? yearWeekly + 1 : yearWeekly)
        setMonthWeekly(monthWeekly + 1 > 12 ? 1 : monthWeekly + 1)
        setWeekOfMonthWeekly(1)
      } else {
        setYearWeekly(yearWeekly)
        setMonthWeekly(monthWeekly)
        setWeekOfMonthWeekly(weekOfMonthWeekly + 1)
      }
      break
    default:
      break
  }
}
export default handleNext
