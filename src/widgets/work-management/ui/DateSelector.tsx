'use client'

/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/no-shadow */

import PrevButton from './PrevButton'
import NextButton from './NextButton'

import useAttendance from '../hooks/useAttendance'

export default function DateSelector() {
  const { type, monthMonthly, monthWeekly, yearMonthly, weekOfMonthWeekly } = useAttendance()

  return (
    <div className="flex space-x-2 justify-between body-04-bold-compact items-center">
      <PrevButton />
      {type === 'WEEKLY' ? (
        <p>{`${monthWeekly || ''}월 ${weekOfMonthWeekly || ''}주차`}</p>
      ) : (
        <p>
          {yearMonthly || ''}년 {monthMonthly || ''}월
        </p>
      )}
      <NextButton />
    </div>
  )
}
