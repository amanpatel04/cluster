import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.228.39:8000/api/', // Replace with your API's URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/files': {
        target: 'http://192.168.228.39:8000/files/', // Replace with your API's URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/files/, ''),
      }
    },
  },


})
