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
      className="card"
      style={{
        '--dpr': dpr,
        display: 'grid',
        gridTemplateColumns: 'auto max-content auto',
        gap: '0px',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '24px',
      }}
    >
      <div
        style={{
          gridColumn: '1 / 4',
          fontSize: '18px',
        }}
      >
        {format(date, `${settings.weekDayFormat} ${settings.dateFormat}`, { locale })}
      </div>
      <div
        style={{
          gridColumn: '1 / 4',
        }}
      >
        <img src={iconUrl} alt="current-weather-icon" className="current-weather-icon" />
      </div>
      <div>{`${minTemp}°C`}</div>
      <div>~</div>
      <div>{`${maxTemp}°C`}</div>
      <div>{`${minHumid}%`}</div>
      <div>~</div>
      <div>{`${maxHumid}%`}</div>
    </div>
  )
}