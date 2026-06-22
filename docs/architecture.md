# Arquitectura

## Visión general

```
Navegador ──HTTP──> server/ (proxy Express) ──GraphQL──> api.linear.app
   client/                  guarda LINEAR_API_KEY
```

El cliente **nunca** conoce la API key. Toda llamada a Linear pasa por el proxy.

## Cliente — Clean Architecture

Regla de dependencias (las flechas indican "puede importar de"):

```
presentation ──> application ──> domain <── infrastructure
```

| Capa             | Carpeta                          | Responsabilidad                                   | Puede importar de        |
|------------------|----------------------------------|---------------------------------------------------|--------------------------|
| `domain`         | `client/src/domain/`             | Entidades puras y reglas de negocio               | nada                     |
| `application`    | `client/src/application/`        | Casos de uso (orquestan dominio)                  | domain                   |
| `infrastructure` | `client/src/infrastructure/`     | HTTP, repositorios (detalles externos)            | domain                   |
| `presentation`   | `client/src/presentation/`       | UI (Atomic Design) + hooks de datos               | application, infra, domain |

- El `domain` es puro: sin React, sin `fetch`, sin Linear.
- La `presentation` accede a datos **solo** vía hooks (`hooks/`), que usan el
  repositorio. Los componentes nunca llaman `fetch` directo.

### Atomic Design (dentro de `presentation/`)

```
atoms → molecules → organisms → templates → pages
```

- **atoms**: piezas mínimas (`Button`, `Spinner`, `Select`, `Chart` [ECharts]).
- **molecules**: combinan atoms (`ProjectFilter`, `ChartCard`, `StatCard`).
- **organisms**: secciones (`FilterBar`, `KpiRow`, `ChartsGrid`, `DashboardHeader`).
- **templates**: layout sin datos (`DashboardTemplate`).
- **pages**: orquestan hooks + estado y componen organisms (`DashboardPage`).

Un nivel solo compone niveles inferiores; nunca al revés.

## Servidor — capas

| Carpeta                 | Responsabilidad                                         |
|-------------------------|---------------------------------------------------------|
| `config/`               | Carga y valida variables de entorno (fail-fast)         |
| `linear/linearClient`   | Cliente GraphQL; único punto que conoce la API key      |
| `linear/linearService`  | Queries de negocio (getProjects, getIssues) + paginación |
| `routes/`               | Endpoints HTTP que exponen el servicio                  |
| `app.js`                | Composición: express + cors + rutas + manejo de errores |

## Flujo de datos: gráficos filtrados por proyecto

```
DashboardPage (estado selectedProjectId)
  ├─ useProjects()          → repository → apiClient → proxy → Linear   (selector)
  ├─ useIssues(projectId)   → repository → apiClient → proxy → Linear   (tickets)
  ├─ computeIssueKpis(issues)                         [caso de uso puro]
  └─ ChartsGrid: groupByStatus/Label/Priority/Assignee(issues)  [casos de uso puros]
       └─ buildDonutOption / buildBarOption (shared/chartOptions) → Chart (ECharts)
```

El filtro por proyecto se aplica server-side (`?projectId=`) y recorta KPIs y
los 4 gráficos a la vez. Añadir un nuevo desglose = otro selector en
`groupIssues.js` + un `ChartCard`, sin tocar `domain` ni `infra`.
