import { WeatherWidget } from '../features/weather/index.js';
import { DateTimeWidget } from '../features/dateTime/index.jsx';
import { CalendarWidget } from '../features/calendar/index.jsx';

export default function MainPanel() {
  return (
    <ul className="flex-container">
      <li className="flex-item">
        <WeatherWidget />
      </li>
      <li className="flex-item">
        <DateTimeWidget />
      </li>
      <li className="flex-item">
        <CalendarWidget />
      </li>
    </ul>
  );
}
