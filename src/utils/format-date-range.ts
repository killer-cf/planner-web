import { format, isSameMonth, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formatDateRange = (startDate: string, endDate: string) => {
  const initialDate = parseISO(startDate)
  const finalDate = parseISO(endDate)

  if (isSameMonth(initialDate, finalDate)) {
    if (format(initialDate, 'd') === format(finalDate, 'd')) {
      return `${format(initialDate, 'd')} de ${format(initialDate, 'MMMM', { locale: ptBR })} de ${format(initialDate, 'yyyy')}`
    }
    return `${format(initialDate, 'd')} a ${format(finalDate, 'd')} de ${format(initialDate, 'MMMM', { locale: ptBR })} de ${format(initialDate, 'yyyy')}`
  } else {
    return `${format(initialDate, 'd')} de ${format(initialDate, 'MMMM')} a ${format(finalDate, 'd')} de ${format(finalDate, 'MMMM', { locale: ptBR })} de ${format(finalDate, 'yyyy')}`
  }
}
