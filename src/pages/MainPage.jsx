import MainPanel from '../components/MainPanel.jsx';
import ForecastPanel from '../components/ForecastPanel.jsx';

export default function MainPage() {
  return (
    <ul className="main-grid">
      <MainPanel />
      <ForecastPanel />
    </ul>
  )
}
