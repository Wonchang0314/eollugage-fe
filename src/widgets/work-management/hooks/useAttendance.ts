'use client'

import { useAtom } from 'jotai'
import {
  monthAtom,
  monthMONTHLYAtom,
  selectedMemberAtom,
  selectedTypeAtom,
  weekAtom,
  yearAtom,
  yearMONTHLYAtom,
} from '../atoms/workManagementAtoms'

const useAttendance = () => {
  const [memberId, setMemberId] = useAtom(selectedMemberAtom)
  const [type, setType] = useAtom(selectedTypeAtom)
  const [yearWeekly, setYearWeekly] = useAtom(yearAtom)
  const [monthWeekly, setMonthWeekly] = useAtom(monthAtom)
  const [weekOfMonthWeekly, setWeekOfMonthWeekly] = useAtom(weekAtom)
  const [yearMonthly, setYearMonthly] = useAtom(yearMONTHLYAtom)
  const [monthMonthly, setMonthMonthly] = useAtom(monthMONTHLYAtom)

  return {
    memberId,
    setMemberId,
    type,
    setType,

    yearWeekly,
    setYearWeekly,
    monthWeekly,
    setMonthWeekly,
    weekOfMonthWeekly,
    setWeekOfMonthWeekly,

    yearMonthly,
    setYearMonthly,
    monthMonthly,
    setMonthMonthly,
  }
}

export default useAttendance
