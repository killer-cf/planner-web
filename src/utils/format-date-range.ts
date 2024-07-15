import { format, isSameMonth } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formatDateRange = (
  startDate: Date | string,
  endDate: Date | string,
) => {
  if (isSameMonth(startDate, endDate)) {
    if (format(startDate, 'd') === format(endDate, 'd')) {
      return `${format(startDate, 'd')} de ${format(startDate, 'MMMM', { locale: ptBR })} de ${format(startDate, 'yyyy')}`
    }
    return `${format(startDate, 'd')} a ${format(endDate, 'd')} de ${format(startDate, 'MMMM', { locale: ptBR })} de ${format(startDate, 'yyyy')}`
  } else {
    return `${format(startDate, 'd')} de ${format(startDate, 'MMMM')} a ${format(endDate, 'd')} de ${format(endDate, 'MMMM', { locale: ptBR })} de ${format(endDate, 'yyyy')}`
  }
}
