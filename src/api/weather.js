import createExternalApi from './external.js';
import config from '../config.json';

const BASE_URL = config.weatherApi.baseUrl;
const DEFAULT_HEADERS = config.weatherApi.defaultHeaders;
const CURRENT_WEATHER_DATA_TYPE = config.weatherApi.dataTypeKey.currentWeather;
const FORECAST_WEATHER_DATA_TYPE = config.weatherApi.dataTypeKey.forecastWeather;

const weatherApi = createExternalApi(BASE_URL, DEFAULT_HEADERS);

export const fetchCurrentWeather = async (language, district, tempStation) => {
  try {
    const data = await weatherApi('/weather.php', {
      params: {
        dataType: CURRENT_WEATHER_DATA_TYPE,
        lang: language,
      },
    });

    const { icon, temperature, rainfall, humidity, warningMessage } = data;

    return {
      icon: icon[0],
      temperature: temperature.data.filter((d) => d.place === tempStation)[0],
      rainfall: rainfall.data.filter((d) => d.place === district)[0],
      humidity: humidity.data[0],
      warningMessage: warningMessage,
    };
  } catch (error) {
    console.error('Weather API error:', error.message);
  }
};

export const fetchForecastWeather = async (language) => {
  try {
    return await weatherApi('/weather.php', {
      params: {
        dataType: FORECAST_WEATHER_DATA_TYPE,
        lang: language,
      },
    });
  } catch (error) {
    console.error('Weather API error:', error.message);
  }
};
