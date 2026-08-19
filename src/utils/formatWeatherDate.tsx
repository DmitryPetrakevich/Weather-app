export const formatWeatherDate = (dateStr: string): string => {
  const date = new Date(dateStr) // "2026-08-19"

  const weekdays = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
  const weekday = weekdays[date.getDay()]
  const day = date.getDate() // 19

  return `${weekday}, ${day}`
}