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
      style={{
        width: '300px',
        height: '300px',
        margin: '0 auto',
        padding: '28px',
        borderRadius: '18px',
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        fontFamily: '"Tektur", sans-serif',
      }}
    >
      {/* Weekday Headers */}
      <WeekDaysHeader weekdays={weekdays} language={language} />

      {/* Calendar Grid - Only current month days are shown */}
      <CalendarGrid today={today} days={days} />
    </div>
  );
}
