import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('src/locales/resources.js')) {
            return 'locale-base'
          }

          if (id.includes('src/locales/importTranslations.js')) {
            return 'locale-import-coverage'
          }

          if (
            id.includes('src/locales/voiceRefinements.js') ||
            id.includes('src/locales/deepVoiceRefinements.js')
          ) {
            return 'locale-voice'
          }

          if (id.includes('/node_modules/react/') || id.includes('/node_modules/react-dom/')) {
            return 'react-vendor'
          }

          if (
            id.includes('/node_modules/i18next/') ||
            id.includes('/node_modules/react-i18next/') ||
            id.includes('/node_modules/i18next-browser-languagedetector/')
          ) {
            return 'i18n-vendor'
          }

          if (
            id.includes('/node_modules/recharts/') ||
            id.includes('/node_modules/html-to-image/') ||
            id.includes('/node_modules/lucide-react/')
          ) {
            return 'ui-vendor'
          }
        }
      }
    }
  }
})
