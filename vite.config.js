import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint(),
    splitVendorChunkPlugin()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // creating a chunk to @open-ish deps. Reducing the vendor chunk size
          // if (id.includes('react-tooltip')) {
          //   return 'react-tooltip';
          // }
          // creating a chunk to react routes deps. Reducing the vendor chunk size
          if (
            id.includes('react-tooltip') ||
            id.includes('react-select') ||
            id.includes('recharts')
          ) {
            return 'ui-components';
          }
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom'
  }
})
