import { useSettings} from '../../../hooks/useSettings.js';
import { format } from 'date-fns';
import { enGB, zhHK, zhCN } from 'date-fns/locale';

const localeMap = {
  en: enGB,
  tc: zhHK,
  sc: zhCN,
};

export default function WeatherCard({ date, iconUrl, minTemp, maxTemp, minHumid, maxHumid }) {
  const settings = useSettings();
  const locale = localeMap[settings.language];
  const dpr = window.devicePixelRatio;
  return (
    <div
      style={{
        '--dpr': dpr,
        width: 'calc(300px / var(--dpr))',
        height: 'calc(300px / var(--dpr))',
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        borderRadius: '18px',
        fontFamily: '"Tektur", sans-serif',
        color: 'white',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        gap: '0px',
        alignItems: 'center',
        position: 'relative',
        padding: '18px 22px',
        textAlign: 'center',
        fontSize: '24px',
      }}
    >
      <div
        style={{
          gridColumn: '1 / 3',
          fontSize: '18px',
        }}
      >
        {format(date, `${settings.weekDayFormat} ${settings.dateFormat}`, { locale })}
      </div>
      <div
        style={{
          gridColumn: '1 / 3',
        }}
      >
        <img src={iconUrl} alt="current-weather-icon" className="current-weather-icon" />
      </div>
      <div>{`${minTemp}°C`}</div>
      <div>{`${minHumid}%`}</div>
      <div>{`${maxTemp}°C`}</div>
      <div>{`${maxHumid}%`}</div>
    </div>
  )
}