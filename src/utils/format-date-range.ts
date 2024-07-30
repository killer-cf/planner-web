import { format, isSameMonth, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formatDateRange = (
  startDate: string,
  endDate: string,
  shortFormat?: boolean,
) => {
  const initialDate = parseISO(startDate)
  const finalDate = parseISO(endDate)

  if (shortFormat) {
    if (isSameMonth(initialDate, finalDate)) {
      if (format(initialDate, 'd') === format(finalDate, 'd')) {
        return `${format(initialDate, 'd')} ${format(initialDate, 'MMM', { locale: ptBR })} ${format(initialDate, 'yyyy')}`
      }
      return `${format(initialDate, 'd')} - ${format(finalDate, 'd')} ${format(initialDate, 'MMM', { locale: ptBR })} ${format(initialDate, 'yyyy')}`
    } else {
      return `${format(initialDate, 'd')} ${format(initialDate, 'MMM', { locale: ptBR })} ${format(initialDate, 'yyyy')} - ${format(finalDate, 'd')} ${format(finalDate, 'MMM', { locale: ptBR })} ${format(finalDate, 'yyyy')}`
    }
  } else {
    if (isSameMonth(initialDate, finalDate)) {
      if (format(initialDate, 'd') === format(finalDate, 'd')) {
        return `${format(initialDate, 'd')} de ${format(initialDate, 'MMMM', { locale: ptBR })} de ${format(initialDate, 'yyyy')}`
      }
      return `${format(initialDate, 'd')} a ${format(finalDate, 'd')} de ${format(initialDate, 'MMMM', { locale: ptBR })} de ${format(initialDate, 'yyyy')}`
    } else {
      return `${format(initialDate, 'd')} de ${format(initialDate, 'MMMM', { locale: ptBR })} a ${format(finalDate, 'd')} de ${format(finalDate, 'MMMM', { locale: ptBR })} de ${format(finalDate, 'yyyy')}`
    }
  }
}
