import { useSettings } from '../../../hooks/useSettings.js';
import { useDateTime } from '../hooks';
import SecondsRing from './SecondsRing.jsx';

const DateTimeWidget = () => {
  const settings = useSettings();
  const { weekDayYear, monthDate, timeStr, seconds } = useDateTime(settings);
  const dpr = window.devicePixelRatio;

  return (
    <div
      className="date-time-widget"
      style={{
        '--dpr': dpr,
        width: 'calc(300px / var(--dpr))',
        height: 'calc(300px / var(--dpr))',
        margin: '0 auto',
        alignItems: 'center',
        position: 'relative',
        borderRadius: '18px',
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: 'white'
      }}
    >
      {/* Seconds ring (animated border) */}
      <SecondsRing seconds={seconds} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          paddingTop: '76px',
        }}
      >
        <div style={{ fontSize: '24px' }}>{weekDayYear}</div>
        <div style={{ fontSize: '48px' }}>{monthDate}</div>
        <div style={{ fontSize: '48px' }}>{timeStr}</div>
      </div>
    </div>
  );
};

export default DateTimeWidget;
