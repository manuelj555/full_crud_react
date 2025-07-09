import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      ignored: ['**/db.json']
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js', // este archivo lo crearás en el siguiente paso
    globals: true,
  },
})
