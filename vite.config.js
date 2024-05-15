import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/crypto-explorer-website/",
  resolve: {
    alias: {
      // Add any necessary aliases here
    },
    mainFields: ['module', 'main'], // Ensure module field is prioritized
  },
})
