# Convenciones

## Principios

- **DRY:** una sola fuente de verdad. El conteo de issues usa el motor genérico
  `countIssuesBy` (`application/useCases/groupIssues.js`); el "look" de los
  gráficos vive en `shared/chartOptions.js`. No repetir literales ni lógica.
- **Clean:** funciones pequeñas con un propósito; sin código muerto; sin
  comentarios obvios. Nombres descriptivos en español o inglés, consistentes
  por archivo.
- **No decidir sin permiso:** ante ambigüedad o necesidad de una dependencia
  nueva, detente y confirma. No agregues librerías por iniciativa propia.

## JavaScript / React

- ES modules (`import`/`export`). Componentes en `PascalCase.jsx`, un
  componente por archivo, `export default`.
- Casos de uso, hooks y utils en `camelCase.js`.
- Componentes de presentación "tontos": reciben props y emiten eventos hacia
  arriba; el estado vive en la `page`.
- Acceso a datos **solo** vía hooks de React Query (`presentation/hooks/`).
  Nunca `fetch` dentro de un componente.
- Estilos con utilidades de Tailwind usando los **tokens** definidos en
  `index.css` (`bg-surface`, `text-state-started`, …). No hardcodear hex.

## Backend

- Una responsabilidad por archivo (cliente GraphQL ≠ servicio ≠ ruta).
- Errores hacia el manejador central de `app.js` vía `next(error)`.
  Traducir fallos de Linear a `LinearError` con status HTTP claro.
- La API key se lee solo desde `config/env.js`.

## Tests

- Los casos de uso puros (`application/`) y entidades (`domain/`) son el
  objetivo principal de tests unitarios (son puros y fáciles de testear).
- Cada feature en `feature_list.json` lista su `acceptance`; el implementer
  escribe tests que lo validan.

## Verificación

- `./init.sh` debe terminar verde (lint + build + tests) antes de cualquier
  `APPROVED`. Si está en rojo, el trabajo no está listo.

## Git

- Ramas por feature. Commits pequeños y descriptivos.
- Nunca commitear `.env`, `node_modules/`, `dist/`.
