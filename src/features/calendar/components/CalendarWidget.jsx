import CalendarGrid from './CalendarGrid.jsx';
import WeekDaysHeader from './WeekDaysHeader.jsx';
import { useSettings } from '../../../hooks/useSettings.js';
import { useCalendar } from '../hooks';

export default function CurrentMonthCalendar() {
  const { language } = useSettings();
  const today = new Date();
  const { days, weekdays } = useCalendar(today, language);

  return (
    <div
      className="card"
      style={{
        width: '300px',
        height: '300px',
        padding: '28px',
      }}
    >
      {/* Weekday Headers */}
      <WeekDaysHeader weekdays={weekdays} language={language} />

      {/* Calendar Grid - Only current month days are shown */}
      <CalendarGrid today={today} days={days} />
    </div>
  );
}
