import reactRefresh from '@vitejs/plugin-react-refresh'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), react(), tsconfigPaths()],
})
