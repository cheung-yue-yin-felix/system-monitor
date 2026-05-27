import { RouterProvider } from 'react-router-dom';
import SettingsProvider from './context/SettingsProvider.jsx';
import { router } from './router';
import './App.css';

function App() {
  return (
    <SettingsProvider>
      <RouterProvider router={router} />
    </SettingsProvider>
  );
}

export default App;
