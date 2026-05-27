import { useContext } from 'react';
import SettingsContext from '../context/settings-context.js';

const STORAGE_KEY = 'system-monitor-settings';

const DEFAULT_SETTINGS = {
  language: 'en',
  dateFormat: 'MMM d',
  timeFormat: 'HH:mm',
  weekDayFormat: 'cccc',
  district: 'KT',
  tempStation: 'KTG',
};

export function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
    };
  } catch (error) {
    console.error(error);
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // ignore
  }
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
