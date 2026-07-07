import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './build',
    emptyOutDir: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setup/tests/vitest-setup.ts'],
    alias: {
      // public-dir imports (e.g. `import viteLogo from '/vite.svg'`) don't
      // resolve outside the dev server, so point them at the file directly
      '/vite.svg': fileURLToPath(new URL('./public/vite.svg', import.meta.url)),
    },
  },
})
