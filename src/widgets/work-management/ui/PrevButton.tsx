/* eslint-disable import/no-cycle */
import { Icon } from '@eolluga/eolluga-ui'
import handlePrev from '../utils/handlePrev'
import useAttendance from '../hooks/useAttendance'

export default function PrevButton() {
  const {
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
  } = useAttendance()
  return (
    <button
      type="button"
      onClick={() =>
        handlePrev(
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
      aria-label="이전"
    >
      <Icon icon="chevron_left_outlined" />
    </button>
  )
}
