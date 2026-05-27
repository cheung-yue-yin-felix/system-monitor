import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchCurrentWeather } from '../../../api/weather.js';

export function useWeather(language, district, tempStation) {
  const { t } = useTranslation();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const translatedDistrict = t(`districts.${district}`);
  const translatedTempStation = t(`stations.${tempStation}`);

  useEffect(() => {
    let isInitial = true;

    const fetchWeatherData = async () => {
      try {
        if (isInitial) {
          setLoading(true);
        }
        setError(null);

        const data = await fetchCurrentWeather(language, translatedDistrict, translatedTempStation);
        setWeather(data);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Failed to fetch weather data');
      } finally {
        if (isInitial) {
          setLoading(false);
          isInitial = false;
        }
      }
    };

    fetchWeatherData();
    const intervalId = setInterval(fetchWeatherData, 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [language, district, tempStation, translatedDistrict, translatedTempStation]);

  return { weather, loading, error };
}
