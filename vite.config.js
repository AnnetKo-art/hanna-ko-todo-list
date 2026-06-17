//import { defineConfig } from 'vite'
//import react from '@vitejs/plugin-react'

// https://vite.dev/config/
//export default defineConfig({
  //plugins: [react()],
//})

//This NEW config creates a smooth local authentication setup:

// React frontend runs on port 3001
// API calls automatically forwarded to backend
// No CORS headaches
// Cookies work locally
// Authentication behaves similarly to production

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/ for more info about configuration options
export default ({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return defineConfig({
    plugins: [react(),tailwindcss()],
    server: {
      port: 3001,
      proxy: {
        '/api': {
          target: env.VITE_TARGET,
          secure: false,
          changeOrigin: true,
          configure: (proxy) => {
            proxy.on('proxyRes', (proxyRes) => {
              const cookies = proxyRes.headers['set-cookie'];

              if (!cookies) {
                return;
              }

              const cookieArray = Array.isArray(cookies) ? cookies : [cookies];
              proxyRes.headers['set-cookie'] = cookieArray.map((cookie) =>
                cookie
                  .replace(/; *Secure/gi, '')
                  .replace(/; *SameSite=None/gi, '')
                  .replace(/; *Domain=[^;]+/gi, '')
              );
            });
          },
        },
      },
    },
  });
};