import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({command}) => {
  return {
    // Base path for GitHub Pages: /Azhar-Chiniot-Pakwan/ in production build,
    // and '/' during local development to avoid breaking the local dev server.
    base: process.env.VITE_BASE_URL || (command === 'serve' ? '/' : '/Azhar-Chiniot-Pakwan/'),
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': import.meta.dirname || path.resolve(process.cwd(), '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
