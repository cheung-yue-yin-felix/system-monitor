import SettingsContext from './settings-context.js';
import { useEffect, useState, useCallback } from 'react';
import { loadSettings, saveSettings } from '../hooks/useSettings.js';
import i18n from '../i18n/index.js';

const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(loadSettings());

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  useEffect(() => {
    document.documentElement.lang = settings.language;
    i18n.changeLanguage(settings.language);
  }, [settings.language]);

  const setLanguage = useCallback((language) => {
    setSettings((prev) => ({ ...prev, language: language }));
  }, []);

  const setDateFormat = useCallback((format) => {
    setSettings((prev) => ({ ...prev, dateFormat: format }));
  }, []);

  const setTimeFormat = useCallback((format) => {
    setSettings((prev) => ({ ...prev, timeFormat: format }));
  }, []);

  const setWeekDayFormat = useCallback((format) => {
    setSettings((prev) => ({ ...prev, weekDayFormat: format }));
  }, []);

  const setDistrict = useCallback((district) => {
    setSettings((prev) => ({ ...prev, district: district }));
  }, []);

  const setTempStation = useCallback((station) => {
    setSettings((prev) => ({ ...prev, tempStation: station }));
  }, []);

  const value = {
    language: settings.language,
    dateFormat: settings.dateFormat,
    timeFormat: settings.timeFormat,
    weekDayFormat: settings.weekDayFormat,
    district: settings.district,
    tempStation: settings.tempStation,
    setLanguage,
    setDateFormat,
    setTimeFormat,
    setWeekDayFormat,
    setDistrict,
    setTempStation,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export default SettingsProvider;
