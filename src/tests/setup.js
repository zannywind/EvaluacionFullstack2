import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// DEFENSA — AISLAMIENTO: desmonta componentes después de cada prueba para no mezclar pantallas.
// Esto no limpia localStorage: los tests que lo usan lo limpian por separado.
afterEach(cleanup)
