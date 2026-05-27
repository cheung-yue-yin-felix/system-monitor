import { useEffect, useState } from 'react';
import { fetchForecastWeather } from '../../../api/weather.js';

export function useForecast(language) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isInitial = true;

    const fetchWeatherData = async () => {
      try {
        if (isInitial) {
          setLoading(true);
        }
        setError(null);

        const data = await fetchForecastWeather(language);
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
  }, [language]);

  return { weather, loading, error };
}