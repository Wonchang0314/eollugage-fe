/* eslint-disable no-nested-ternary */
import { FormField, FormItem, FormLabel } from '@/shared/ui/shadcn/form'
import { Input } from '@/shared/ui/shadcn/input'
import { cn } from '@/shared/utils/cn'
import { Form } from '../types/work-management'

export default function SelectWorkingTime({ form }: { form: Form }) {
  const handleInputChange = (
    field: { onChange: (value: string) => void },
    value: string,
    max: number,
  ) => {
    if (value && !/^\d*$/.test(value)) {
      field.onChange('')
      return
    }

    if (value === '') {
      field.onChange('')
      return
    }

    let numValue = Number(value)
    if (numValue < 0) numValue = 0
    if (numValue > max) numValue = max

    const formattedValue = numValue < 10 ? `0${numValue}` : `${numValue}`
    field.onChange(formattedValue)
  }

  return (
    <FormItem className="flex flex-col space-y-2">
      {/* 출근 시간 */}
      <div className="space-y-1">
        <FormLabel className="body-02-regular text-[#6F6F6F]">출근 시간</FormLabel>
        <div className="flex items-center space-x-4">
          {/* 출근 시간: 시 */}
          <FormField
            control={form.control}
            name="workingTime.start-front"
            render={({ field }) => (
              <div className="relative w-1/2 label-04-medium">
                <Input
                  type="text"
                  inputMode="numeric"
                  className={cn(
                    'w-full justify-start label-04-medium h-[56px] placeholder:text-text-placeholder',
                    field.value !== '' && 'border-border-strong-01',
                  )}
                  value={field.value === '' ? '' : field.value}
                  onChange={e => handleInputChange(field, e.target.value, 23)}
                  placeholder="12시"
                />
                {field.value !== '' && (
                  <span className="absolute left-[36px] top-1/2 -translate-y-1/2">시</span>
                )}
              </div>
            )}
          />

          {/* 출근 시간: 분 */}
          <FormField
            control={form.control}
            name="workingTime.start-back"
            render={({ field }) => (
              <div className="relative w-1/2 label-04-medium">
                <Input
                  type="text"
                  inputMode="numeric"
                  className={cn(
                    'w-full justify-start label-04-medium h-[56px] placeholder:text-text-placeholder',
                    field.value !== '' && 'border-border-strong-01',
                  )}
                  value={field.value === '' ? '' : field.value}
                  onChange={e => handleInputChange(field, e.target.value, 59)}
                  placeholder="00분"
                />
                {field.value !== '' && (
                  <span className="absolute left-[36px] top-1/2 -translate-y-1/2">분</span>
                )}
              </div>
            )}
          />
        </div>
      </div>

      {/* 퇴근 시간 */}
      <div className="space-y-1">
        <FormLabel className="body-02-regular mt-4 text-[#6F6F6F]">퇴근 시간</FormLabel>
        <div className="flex items-center space-x-4">
          {/* 퇴근 시간: 시 */}
          <FormField
            control={form.control}
            name="workingTime.end-front"
            render={({ field }) => (
              <div className="relative w-1/2 label-04-medium">
                <Input
                  type="text"
                  inputMode="numeric"
                  className={cn(
                    'w-full justify-start label-04-medium h-[56px] placeholder:text-text-placeholder',
                    field.value !== '' && 'border-border-strong-01',
                  )}
                  value={field.value === '' ? '' : field.value}
                  onChange={e => handleInputChange(field, e.target.value, 23)}
                  placeholder="18시"
                />
                {field.value !== '' && (
                  <span className="absolute left-[36px] top-1/2 -translate-y-1/2">시</span>
                )}
              </div>
            )}
          />

          {/* 퇴근 시간: 분 */}
          <FormField
            control={form.control}
            name="workingTime.end-back"
            render={({ field }) => (
              <div className="relative w-1/2 label-04-medium">
                <Input
                  type="text"
                  inputMode="numeric"
                  className={cn(
                    'w-full justify-start label-04-medium h-[56px] placeholder:text-text-placeholder',
                    field.value !== '' && 'border-border-strong-01',
                  )}
                  value={field.value === '' ? '' : field.value}
                  onChange={e => handleInputChange(field, e.target.value, 59)}
                  placeholder="30분"
                />
                {field.value !== '' && (
                  <span className="absolute left-[36px] top-1/2 -translate-y-1/2">분</span>
                )}
              </div>
            )}
          />
        </div>
      </div>
    </FormItem>
  )
}
