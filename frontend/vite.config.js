import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- this is the plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <-- using the plugin here
  ],
  // Enable environment variable replacement in HTML
  define: {
    'process.env': process.env
  }
})
