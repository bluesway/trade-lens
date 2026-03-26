import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { localeJsonSplitPlugin } from './src/locales/vite-plugin-locale-split.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), localeJsonSplitPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/react/') || id.includes('/node_modules/react-dom/')) {
            return 'react-vendor';
          }

          if (
            id.includes('/node_modules/i18next/') ||
            id.includes('/node_modules/react-i18next/') ||
            id.includes('/node_modules/i18next-browser-languagedetector/') ||
            id.includes('/node_modules/i18next-http-backend/')
          ) {
            return 'i18n-vendor';
          }

          if (
            id.includes('/node_modules/chart.js/') ||
            id.includes('/node_modules/react-chartjs-2/') ||
            id.includes('/node_modules/html-to-image/') ||
            id.includes('/node_modules/lucide-react/')
          ) {
            return 'ui-vendor';
          }
        }
      }
    }
  }
});
