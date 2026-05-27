import { useSettings } from '../../../hooks/useSettings.js';
import { useDateTime } from '../hooks';
import SecondsRing from './SecondsRing.jsx';
import WeekDay from './WeekDay.jsx';
import Year from './Year.jsx';
import MonthDate from './MonthDate.jsx';
import Time from './Time.jsx';

const DateTimeWidget = () => {
  const settings = useSettings();
  const { weekday, year, monthDate, timeStr, seconds } = useDateTime(settings);
  const dpr = window.devicePixelRatio;

  return (
    <div
      className="date-time-widget"
      style={{
        '--seconds': seconds,
        '--dpr': dpr,
        width: 'calc(300px / var(--dpr))',
        height: 'calc(300px / var(--dpr))',
        margin: '40px auto',
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        gap: '0px',
        alignItems: 'center',
        position: 'relative',
        borderRadius: '18px',
        padding: '18px 22px',
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: 'white',
      }}
    >
      {/* Seconds ring (animated border) */}
      <SecondsRing seconds={seconds} />

      {/* Weekday + Year */}
      <div
        style={{
          gridColumn: '1 / 3',
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          zIndex: 2,
          marginTop: '4px',
        }}
      >
        <WeekDay weekday={weekday} />
        <Year year={year} />
      </div>

      {/* Month + Date */}
      <MonthDate monthDate={monthDate} />

      {/* Time */}
      <div style={{ gridColumn: '1 / 3', zIndex: 2, marginTop: '-12px' }}>
        <Time timeStr={timeStr} />
      </div>
    </div>
  );
};

export default DateTimeWidget;
