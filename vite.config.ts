import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// On GitHub Pages the site is served from https://<user>.github.io/Tiandy/
// so production assets need the "/Tiandy/" base. Local dev stays at "/".
// If the repo name ever changes, update the base value below.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Tiandy/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
}))
