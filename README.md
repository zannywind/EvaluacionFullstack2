# Proyecto React + Vite — repaso de 6 clases

Incluye React con Vite, React Bootstrap, componentes reutilizables, props, state,
React Router, formularios, localStorage, sessionStorage, pruebas unitarias y cobertura.

## Ejecutar

```bash
npm install
npm run dev
```

En EC2:

```bash
npm run dev -- --host 0.0.0.0
```

## Pruebas

```bash
npm test
npm run coverage
```

## Estructura

```text
src/
├── components/
│   ├── AppNavbar.jsx
│   ├── ProductCard.jsx
│   ├── StoragePanel.jsx
│   └── Counter.jsx
├── views/
│   ├── HomeView.jsx
│   ├── ProductsView.jsx
│   └── ProfileView.jsx
├── tests/
│   ├── setup.js
│   └── Counter.test.jsx
├── App.jsx
├── main.jsx
└── styles.css
```

`App.jsx` organiza las rutas. Las vistas y los componentes quedan separados visualmente
con bordes y colores distintos.


## Pruebas incluidas con Vitest

- `Counter.test.jsx`: estado inicial y clic sobre el botón.
- `ProductCard.test.jsx`: props y callback simulado con `vi.fn()`.
- `ProfileView.test.jsx`: formulario y `localStorage`.

Comandos:

```bash
npm test
npm run test:run
npm run coverage
```
