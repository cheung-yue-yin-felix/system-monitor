import { createHashRouter } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import MainPage from './pages/MainPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

export const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
]);
