'use client'

import { z } from 'zod'
import { Form } from '@/shared/ui/shadcn/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHistory } from '@/entities'
import { format } from 'date-fns'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { sendRNFunction } from '@/shared'
import Header from './Header'
import SelectWorkingDateCalendar from './SelectWorkingDateCalendar'
import SelectWorkingTime from './SelectWorkingTime'
import SelectMemberDrawer from './SelectMemberDrawer'

const formSchema = z.object({
  memberId: z.string(),
  workingDate: z.date(),
  workingTime: z.object({
    'start-front': z.string(),
    'start-back': z.string(),
    'end-front': z.string(),
    'end-back': z.string(),
  }),
})

export default function AttendanceFormClient({
  storeId,
  type,
  historyId,
  memberId,
}: {
  storeId: string
  type: 'add' | 'edit'
  historyId?: string
  memberId?: string
}) {
  const { data: editingHistory } = useQuery<{
    relation: { member: { id: string } }
    memberId: string
    date: string
    startTime: string
    endTime: string
  }>({
    queryKey: ['history', historyId, memberId],
  })
  const { back } = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memberId: '',
      workingDate: undefined,
      workingTime: {
        'start-front': '',
        'start-back': '',
        'end-front': '',
        'end-back': '',
      },
    },
  })

  const { createHistory, updateHistory, createHistoryStatus, updateHistoryStatus } =
    useHistory(storeId)

  useEffect(() => {
    if (type === 'edit' && editingHistory) {
      form.setValue('memberId', editingHistory?.relation?.member?.id)
      form.setValue('workingDate', new Date(editingHistory.date))
      form.setValue('workingTime', {
        'start-front': editingHistory.startTime?.slice(0, 2),
        'start-back': editingHistory.startTime?.slice(3),
        'end-front': editingHistory.endTime?.slice(0, 2),
        'end-back': editingHistory.endTime?.slice(3),
      })
    }
  }, [editingHistory])

  const isFormComplete =
    form.watch('memberId') !== '' &&
    form.watch('workingDate') !== undefined &&
    form.watch('workingTime')['start-front'] !== '' &&
    form.watch('workingTime')['start-back'] !== '' &&
    form.watch('workingTime')['end-front'] !== '' &&
    form.watch('workingTime')['end-back'] !== ''

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (data.memberId === null) return
    if (type === 'add') {
      createHistory({
        selectedMemberId: data.memberId,
        reqBody: {
          date: format(data.workingDate, 'yyyy-MM-dd'),
          startTime: data.workingTime['start-front'].concat(':', data.workingTime['start-back']),
          endTime: data.workingTime['end-front'].concat(':', data.workingTime['end-back']),
        },
      })
    } else {
      if (!historyId) return

      updateHistory({
        selectedMemberId: data.memberId,
        historyId,
        reqBody: {
          date: format(data.workingDate, 'yyyy-MM-dd'),
          startTime: data.workingTime['start-front'].concat(':', data.workingTime['start-back']),
          endTime: data.workingTime['end-front'].concat(':', data.workingTime['end-back']),
        },
      })
    }
  }

  useEffect(() => {
    if (createHistoryStatus === 'success' || updateHistoryStatus === 'success') back()
  }, [createHistoryStatus, updateHistoryStatus])

  useEffect(() => {
    sendRNFunction('setStatusbarStyle', { color: '#FFF', style: 'dark' })
  }, [])

  return (
    <>
      <Header type={type} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="px-4 space-y-2">
            <SelectMemberDrawer form={form} storeId={storeId} type={type} />
            <SelectWorkingDateCalendar form={form} />
            <SelectWorkingTime form={form} />
          </div>
          <div className="w-full">
            <div
              className={`fixed bottom-[12px] w-full px-[16px] ${
                isFormComplete ? 'block' : 'hidden'
              }`}
            >
              <button
                type="submit"
                className=" label-03-bold w-full h-[64px] py-spacing-05 px-spacing-07 gap-spacing-04 flex justify-center items-center bg-button-primary text-text-on-color rounded-radius-04"
                disabled={createHistoryStatus === 'pending'}
              >
                {type === 'add' ? '근무 추가하기' : '근무 수정하기'}
              </button>
            </div>
          </div>
        </form>
      </Form>
    </>
  )
}
