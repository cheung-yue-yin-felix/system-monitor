import React from 'react';

const SettingsContext = React.createContext({
  language: '',
  dateFormat: '',
  timeFormat: '',
  weekDayFormat: '',
  district: '',
  tempStation: '',
});

export default SettingsContext;
