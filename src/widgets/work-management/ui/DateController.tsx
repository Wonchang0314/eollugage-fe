'use client'

import DateSelector from './DateSelector'
import ViewModeToggle from './ViewModeToggle'

export default function DateController() {
  return (
    <div className="h-[70px] w-full flex justify-between p-4 items-center">
      <DateSelector />
      <ViewModeToggle />
    </div>
  )
}
