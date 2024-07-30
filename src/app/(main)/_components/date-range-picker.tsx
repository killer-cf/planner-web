'use client'

import { useMediaQuery } from '@uidotdev/usehooks'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'
import { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type DatePickerWithRangeProps = React.HTMLAttributes<HTMLDivElement> & {
  value: DateRange | undefined
  onChangeValue: (date: DateRange | undefined) => void
  disabled?: boolean
}

export function DatePickerWithRange({
  className,
  value,
  disabled = false,
  onChangeValue,
}: DatePickerWithRangeProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'transparent'}
            disabled={disabled}
            className={cn(
              'justify-start text-left font-normal text-zinc-400 px-0',
              !value && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 size-5" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, 'LLL dd', { locale: ptBR })} -{' '}
                  {format(value.to, 'LLL dd, y', { locale: ptBR })}
                </>
              ) : (
                'Selecione um range'
              )
            ) : (
              <span>Quando?</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChangeValue}
            numberOfMonths={isDesktop ? 2 : 1}
            locale={ptBR}
            disabled={{ before: new Date() }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
