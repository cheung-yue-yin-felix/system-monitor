import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

const weekDaysMap = {
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  tc: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  sc: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
};

export const useCalendar = (date, language) => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const weekdays = weekDaysMap[language];

  return { days, weekdays };
};
