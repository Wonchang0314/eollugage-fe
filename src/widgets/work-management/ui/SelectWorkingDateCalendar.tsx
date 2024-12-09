/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, FormField, FormItem, FormLabel } from '@/shared/ui/shadcn/form'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/shadcn/drawer'
import { Button } from '@/shared/ui/shadcn/button'
import { Icon } from '@eolluga/eolluga-ui'
import { getNextWeekOfMonth, getPrevWeekOfMonth, getWeekDates, getWeekOfMonth } from '@/shared'
import { cn } from '@/shared/utils/cn'
import { useState } from 'react'
import { Form } from '../types/work-management'

export default function SelectWorkingDateCalendar({ form }: { form: Form }) {
  const [curWeekOfMonth, setCurWeekOfMonth] = useState(getWeekOfMonth(new Date()))

  const weekDates = getWeekDates(
    curWeekOfMonth.year,
    curWeekOfMonth.month,
    curWeekOfMonth.weekOfMonth,
  )
  const todayWeekOfMonth = getWeekOfMonth(new Date())

  return (
    <FormField
      control={form.control}
      name="workingDate"
      render={({ field }) => (
        <FormItem className="flex flex-col space-y-1">
          <FormLabel className="body-02-regular text-[#6F6F6F]">근무 날짜</FormLabel>
          <FormControl>
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start label-04-medium h-[56px] border-border-strong-01 focus:border-border-strong-01',
                    !field.value && 'text-[#A8A8A8] border-[hsl(var(--input))]',
                  )}
                >
                  {field.value ? (
                    `${field.value.getMonth() + 1}월 ${field.value.getDate()}일`
                  ) : (
                    <span>근무한 날짜를 선택해 주세요.</span>
                  )}
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <div className="flex justify-between">
                    <DrawerTitle className="body-04-bold">
                      {curWeekOfMonth.month}월 {curWeekOfMonth.weekOfMonth}주차
                    </DrawerTitle>
                    <div className="space-x-4">
                      <button
                        type="button"
                        onClick={() => {
                          setCurWeekOfMonth(
                            getPrevWeekOfMonth(
                              curWeekOfMonth.year,
                              curWeekOfMonth.month,
                              curWeekOfMonth.weekOfMonth,
                            ),
                          )
                        }}
                      >
                        <Icon icon="chevron_left_outlined" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCurWeekOfMonth(
                            getNextWeekOfMonth(
                              curWeekOfMonth.year,
                              curWeekOfMonth.month,
                              curWeekOfMonth.weekOfMonth,
                            ),
                          )
                        }}
                        disabled={
                          todayWeekOfMonth.year === curWeekOfMonth.year &&
                          todayWeekOfMonth.month === curWeekOfMonth.month &&
                          todayWeekOfMonth.weekOfMonth === curWeekOfMonth.weekOfMonth
                        }
                      >
                        <Icon
                          icon="chevron_right_outlined"
                          className={
                            todayWeekOfMonth.year === curWeekOfMonth.year &&
                            todayWeekOfMonth.month === curWeekOfMonth.month &&
                            todayWeekOfMonth.weekOfMonth === curWeekOfMonth.weekOfMonth
                              ? 'fill-text-disabled'
                              : ''
                          }
                        />
                      </button>
                    </div>
                  </div>
                  <DrawerDescription className="hidden" />
                </DrawerHeader>
                <div className="flex flex-col  ">
                  {weekDates.map(weekDate => (
                    <DrawerClose key={weekDate.getMilliseconds()} asChild>
                      <Button
                        variant="ghost"
                        className={`justify-start ${field.value === weekDate ? 'text-[#161616]' : 'text-[#6F6F6F]'} body-02-medium `}
                        onClick={() => field.onChange(weekDate)}
                      >
                        {`${weekDate.getMonth() + 1}월 ${weekDate.getDate()}일`}
                        {field.value &&
                          weekDate.getMonth() === field.value.getMonth() &&
                          weekDate.getDate() === field.value.getDate() && (
                            <span className="ml-auto">
                              <Icon icon="checkmark" />
                            </span>
                          )}
                      </Button>
                    </DrawerClose>
                  ))}
                </div>
              </DrawerContent>
            </Drawer>
          </FormControl>
        </FormItem>
      )}
    />
  )
}
