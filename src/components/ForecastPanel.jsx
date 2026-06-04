import { WeatherCard } from '../features/weather/index.jsx';
import { useForecast } from '../features/weather/hooks';
import { useSettings } from '../hooks/useSettings.js';
import { parse } from 'date-fns'
import Loading from './Loading.jsx';
import { t } from 'i18next';
import ErrorMessage from './ErrorMessage.jsx';

export default function ForecastPanel() {
  const settings = useSettings();
  const language = settings.language;
  const { weather, loading, error } = useForecast(language);

  if (loading)
    return (
      <li className="grid-span-all">
        <Loading />
      </li>
    );

  if (error)
    return (
      <li className="grid-span-all">
        <ErrorMessage error={error} />
      </li>
    );

  return (
    <>
      { weather?.weatherForecast?.map(item => {
        const iconUrl = item.ForecastIcon != null ? `./weather_icons/pic${item.ForecastIcon}.png` : null;
        return (
          <li key={item.forecastDate}>
            <WeatherCard
              date={parse(item.forecastDate, 'yyyyMMdd', new Date())}
              iconUrl={iconUrl}
              minTemp={item.forecastMintemp.value}
              maxTemp={item.forecastMaxtemp.value}
              minHumid={item.forecastMinrh.value}
              maxHumid={item.forecastMaxrh.value}
            />
          </li>
        )
      })}
    </>
  )
}
