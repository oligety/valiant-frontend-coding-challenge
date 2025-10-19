import path from 'path'

import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [
    eslint(),
    vue(),
  ],
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
    },
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
