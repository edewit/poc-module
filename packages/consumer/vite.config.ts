import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
  },
  define: {
    // Mock the federated module for development
    // In a real setup, you would use @module-federation/vite or similar
    'import.meta.env.VITE_REMOTE_URL': JSON.stringify('http://localhost:3001/remoteEntry.js'),
  },
})
