# Dashboard CS · Tickets de Linear

Dashboard en **Next.js** que visualiza los **tickets (issues)** de un workspace
de Linear en **gráficos** y permite **filtrar por proyecto**. Muestra KPIs y
cuatro desgloses: por **estado**, por **label**, por **prioridad** y por
**responsable**. Construido con **Clean Architecture + Atomic Design**, patrones
**DRY/Clean** y **Apache ECharts** para los gráficos. Los **Route Handlers** de
Next actúan como proxy para que la API key de Linear nunca llegue al navegador.

```
Navegador ──fetch /api──> Route Handlers (server) ──GraphQL──> api.linear.app
   client components            guardan LINEAR_API_KEY
```

Cliente y API viven en el **mismo origen** (una sola app Next), así que no hay
CORS ni URL de backend que configurar.

## Requisitos

- Node.js 20+
- Una **personal API key** de Linear (`lin_api_...`):
  Linear → Settings → Security & access → API.

> ⚠️ Si una API key se expone (chat, captura, commit), **rótala** de inmediato
> en esa misma pantalla. La key vive solo en `.env.local`, que está en `.gitignore`.

## Puesta en marcha

```bash
cp .env.example .env.local   # pega tu LINEAR_API_KEY en .env.local
npm install
npm run dev                  # http://localhost:3000
```

Abre http://localhost:3000 y usa el selector **"Filtrar por equipo"**.

> Nota: "Todos los equipos" trae todos los tickets del workspace y puede tardar
> en la carga inicial (paginación). Seleccionar un equipo es inmediato.

### Producción

```bash
npm run build
npm run start                # http://localhost:3000
```

## Estructura

```
src/app/              Next.js App Router: layout, page, providers, globals.css
src/app/api/          Route Handlers (proxy a Linear): teams, issues
src/server/           Capa Linear server-side (única que conoce la API key)
src/domain/           Entities (Issue, Team)
src/application/      Casos de uso (KPIs, agrupaciones, CSV)
src/infrastructure/   Cliente HTTP + repositorio (habla con /api)
src/presentation/     Atomic Design: atoms / molecules / organisms / templates / pages / hooks
src/shared/           Utilidades (opciones de chart, descarga CSV)
docs/                 architecture.md, conventions.md
```

Detalle de capas y flujo de datos: [docs/architecture.md](docs/architecture.md).
Convenciones de código: [docs/conventions.md](docs/conventions.md).

## Iterar con el harness de subagentes

Las reglas y los roles viven en [AGENTS.md](AGENTS.md). El flujo es:

```
leader → [explorer(s) si hace falta] → implementer → reviewer → done
```

- El **leader** descompone el trabajo y coordina; nunca implementa.
- El **explorer** investiga una pregunta acotada (read-only).
- El **implementer** ejecuta UNA feature de `feature_list.json` con tests y se
  autoverifica; **no marca `done`**, llama al **reviewer**.
- El **reviewer** aprueba/rechaza contra arquitectura, convenciones y
  `CHECKPOINTS.md`; no edita código.

Reglas de oro: **DRY/Clean**, **Clean Architecture + Atomic Design**, y
**no tomar decisiones no solicitadas — confirmar siempre antes de decidir**.
