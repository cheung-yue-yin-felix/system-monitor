const isElectron = typeof window !== 'undefined' && !!window.electronAPI;

export const config = {
  weatherApi: {
    baseUrl: 'https://data.weather.gov.hk/weatherAPI/opendata',
    defaultHeaders: {
      Accept: 'application/json'
    },
    dataTypeKey: {
      currentWeather: 'rhrread',
      forecastWeather: 'fnd'
    }
  },
  systemMonitorApi: isElectron
    ? window.electronAPI.systemMonitorApi
    : {
        baseUrl: import.meta.env.VITE_BACKEND_URL,
        apiKey: import.meta.env.VITE_API_KEY,
      }
};
