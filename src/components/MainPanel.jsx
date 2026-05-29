import { WeatherWidget } from '../features/weather/index.jsx';
import { DateTimeWidget } from '../features/dateTime/index.jsx';
import { CalendarWidget } from '../features/calendar/index.jsx';

export default function MainPanel() {
  return (
    <>
      <li>
        <WeatherWidget />
      </li>
      <li>
        <DateTimeWidget />
      </li>
      <li>
        <CalendarWidget />
      </li>
    </>
  );
}
