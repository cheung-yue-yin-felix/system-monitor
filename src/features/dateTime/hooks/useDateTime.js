import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { enGB, zhHK, zhCN } from 'date-fns/locale';

const localeMap = {
  en: enGB,
  tc: zhHK,
  sc: zhCN,
};

export const useDateTime = ({ language, dateFormat, timeFormat, weekDayFormat }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const locale = localeMap[language];

  return {
    weekday: format(date, weekDayFormat, { locale }),
    year: format(date, 'yyyy', { locale }),
    monthDate: format(date, dateFormat, { locale }),
    timeStr: format(date, timeFormat, { locale }),
    seconds: date.getSeconds(),
  };
};
