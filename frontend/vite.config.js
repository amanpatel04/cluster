import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000/api/', // Replace with your API's URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/files': {
        target: 'http://localhost:8000/files/', // Replace with your API's URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/files/, ''),
      }
    },
  },
});
