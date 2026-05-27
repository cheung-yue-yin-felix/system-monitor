import { useSettings } from '../../../hooks/useSettings.js';
import { useWeather } from '../hooks';
import { useTranslation } from 'react-i18next';

export default function WeatherWidget() {
  const dpr = window.devicePixelRatio;
  const { t } = useTranslation();
  const settings = useSettings();
  const { language, district, tempStation } = settings;

  const translatedDistrict = t(`districts.${district}`);
  const translatedTempStation = t(`stations.${tempStation}`);

  const { weather, loading, error } = useWeather(language, district, tempStation);

  if (loading) return <p>Loading weather...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  const iconUrl = weather.icon != null ? `./weather_icons/pic${weather.icon}.png` : null;

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
        margin: '40px auto',
        display: 'grid',
        gridTemplateColumns: 'auto auto auto',
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
          gridColumn: '1 / 4',
          fontSize: '18px',
        }}
      >
        {translatedTempStation}, {translatedDistrict}
      </div>
      <div
        style={{
          gridColumn: '1 / 4',
        }}
      >
        <img src={iconUrl} alt="current-weather-icon" className="current-weather-icon" />
      </div>
      <div>{`${weather.rainfall.max} ${weather.rainfall.unit}`}</div>
      <div>{`${weather.temperature.value}°${weather.temperature.unit}`}</div>
      <div>{`${weather.humidity.value}%`}</div>
    </div>
  );
}
