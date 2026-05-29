import { defineConfig, loadEnv } from 'vite'; // 1. Import loadEnv
import react from '@vitejs/plugin-react';

// 2. Change to an arrow function that accepts ({ mode })
export default defineConfig(({ mode }) => {

  // 3. Manually load the env file based on the current mode
  // The third argument '' loads all variables, regardless of the VITE_ prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    // 4. Use the loaded variable from the 'env' object
    base: env.VITE_APP_BASE || '/',
  };
});
