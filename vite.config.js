import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  // DEFENSA 14 — TESTING: jsdom simula el DOM; no verifica el diseño visual de un navegador real.
  test: {
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',
    // V8 mide ejecución: lines (líneas), statements (instrucciones),
    // functions (funciones) y branches (alternativas). Cobertura alta no garantiza ausencia de errores.
    // HTML genera el informe navegable; json-summary entrega los totales.
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary'],
    },
  },
})
