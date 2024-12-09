/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-fallthrough */
import { WeekOfMonth, WeekDates } from '../types/weekOfMonthType'

export const getWeekOfMonth = (date: Date): WeekOfMonth => {
  const currentDay = date.getDate()
  const firstWeekday = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  const firstWeekDayCount = firstWeekday === 0 ? 1 : 7 - firstWeekday + 1

  const isFirstWeekOfPreviousMonth = firstWeekday === 0 || firstWeekday > 4
  const dayOfTheLastWeek = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay()

  const isLastWeekOfCurrentMonth = dayOfTheLastWeek >= 4 || dayOfTheLastWeek === 0

  switch (true) {
    case isFirstWeekOfPreviousMonth: {
      let startOfWeekDate = 1 + firstWeekDayCount
      if (currentDay < startOfWeekDate) {
        return {
          year: date.getMonth() - 1 === -1 ? date.getFullYear() - 1 : date.getFullYear(),
          month: date.getMonth(),
          weekOfMonth: 5,
        }
      }

      for (let i = 1; i < 6; i++) {
        if (i === 5) {
          if (!isLastWeekOfCurrentMonth) {
            return {
              year: date.getMonth() + 2 > 12 ? date.getFullYear() + 1 : date.getFullYear(),
              month: date.getMonth() + 2 > 12 ? 1 : date.getMonth() + 2,
              weekOfMonth: 1,
            }
          }
        }

        if (startOfWeekDate <= currentDay && currentDay <= startOfWeekDate + 6) {
          return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            weekOfMonth: i,
          }
        }
        startOfWeekDate += 7
      }
    }

    default: {
      let startOfWeekDate = 1

      if (currentDay >= startOfWeekDate && currentDay < startOfWeekDate + firstWeekDayCount) {
        return {
          year: date.getMonth() ? date.getFullYear() : date.getFullYear(),
          month: date.getMonth() + 1,
          weekOfMonth: 1,
        }
      }
      startOfWeekDate += firstWeekDayCount

      for (let i = 2; i < 6; i++) {
        if (i === 5) {
          if (!isLastWeekOfCurrentMonth) {
            return {
              year: date.getMonth() + 2 > 12 ? date.getFullYear() + 1 : date.getFullYear(),
              month: date.getMonth() + 2 > 12 ? 1 : date.getMonth() + 2,
              weekOfMonth: 1,
            }
          }
        }

        if (startOfWeekDate <= currentDay && currentDay <= startOfWeekDate + 6) {
          return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            weekOfMonth: i,
          }
        }
        startOfWeekDate += 7
      }
      return {
        year: 0,
        month: 0,
        weekOfMonth: 0,
      }
    }
  }
}

export const getWeekDates = (year: number, month: number, weekOfMonth: number): WeekDates => {
  const days = []

  let curDate = new Date()
  for (let i = 0; i < 5; i++) {
    curDate = new Date(year, month - 1, i === 0 ? 1 : i * 7)
    const { year: cYear, month: cMonth, weekOfMonth: cWeek } = getWeekOfMonth(curDate)
    if (year === cYear && month === cMonth && weekOfMonth === cWeek) break
  }

  let curDay = curDate?.getDay()
  if (curDay === 0) curDay = 7
  const startDate = new Date(year, month - 1, curDate.getDate() - curDay + 1)
  for (let i = 0; i < 7; i++) {
    days.push(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i))
  }
  return days
}

export const getPrevWeekOfMonth = (
  year: number,
  month: number,
  weekOfMonth: number,
): WeekOfMonth => {
  const prevMonthLastDay = new Date(year, month - 1, 0).getDate()
  const weekdayPrevMonthLastDay = new Date(year, month - 1, 0).getDay()
  const { weekOfMonth: prevMonthLastWeek } = getWeekOfMonth(new Date(year, month - 1, 0))
  const totalWeeksInPrevMonth =
    prevMonthLastWeek === 5 || prevMonthLastWeek === 4
      ? prevMonthLastWeek
      : getWeekOfMonth(new Date(year, month - 2, prevMonthLastDay - weekdayPrevMonthLastDay))
          .weekOfMonth

  if (weekOfMonth === 1) {
    return {
      year: month - 1 <= 0 ? year - 1 : year,
      month: month - 1 <= 0 ? 12 : month - 1,
      weekOfMonth: totalWeeksInPrevMonth,
    }
  }
  return {
    year,
    month,
    weekOfMonth: weekOfMonth - 1,
  }
}

export const getNextWeekOfMonth = (
  year: number,
  month: number,
  weekOfMonth: number,
): WeekOfMonth => {
  const theseMonthLastDay = new Date(year, month, 0).getDate()
  const weekdayTheseMonthLastDay = new Date(year, month, 0).getDay()
  const { weekOfMonth: lastWeekOfTheseMonth } = getWeekOfMonth(new Date(year, month, 0))
  const totalWeeksInTheseMonth =
    lastWeekOfTheseMonth === 5 || lastWeekOfTheseMonth === 4
      ? lastWeekOfTheseMonth
      : getWeekOfMonth(new Date(year, month - 2, theseMonthLastDay - weekdayTheseMonthLastDay))
          .weekOfMonth

  if (weekOfMonth === totalWeeksInTheseMonth) {
    return {
      year: month + 1 > 12 ? year + 1 : year,
      month: month + 1 > 12 ? 1 : month + 1,
      weekOfMonth: 1,
    }
  }
  return {
    year,
    month,
    weekOfMonth: weekOfMonth + 1,
  }
}
