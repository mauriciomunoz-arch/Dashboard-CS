# Dashboard CS · Tickets de Linear

Dashboard en React que visualiza los **tickets (issues)** de un workspace de
Linear en **gráficos** y permite **filtrar por proyecto**. Muestra KPIs y cuatro
desgloses: por **estado**, por **label**, por **prioridad** y por **responsable**.
Construido con **Clean Architecture + Atomic Design**, patrones **DRY/Clean** y
**Apache ECharts** para los gráficos. Incluye un **backend proxy** para que la
API key de Linear nunca llegue al navegador.

```
Navegador ──HTTP──> server/ (proxy) ──GraphQL──> api.linear.app
   client/                guarda LINEAR_API_KEY
```

## Requisitos

- Node.js 20+
- Una **personal API key** de Linear (`lin_api_...`):
  Linear → Settings → Security & access → API.

> ⚠️ Si una API key se expone (chat, captura, commit), **rótala** de inmediato
> en esa misma pantalla. La key vive solo en `server/.env`, que está en `.gitignore`.

## Puesta en marcha

### 1) Backend proxy

```bash
cd server
cp .env.example .env        # pega tu LINEAR_API_KEY en .env
npm install
npm run dev                 # http://localhost:4000
```

Prueba: `curl http://localhost:4000/api/issues` debe devolver tickets.

### 2) Cliente

```bash
cd client
cp .env.example .env        # VITE_API_BASE_URL=http://localhost:4000
npm install
npm run dev                 # http://localhost:5173
```

Abre http://localhost:5173 y usa el selector **"Filtrar por proyecto"**.

> Nota: "Todos los proyectos" trae todos los tickets del workspace y puede
> tardar en la carga inicial (paginación). Seleccionar un proyecto es inmediato.
> Optimizar esto es la feature **F5** en `feature_list.json`.

## Estructura

```
server/   Backend proxy (Express). Único que conoce la API key.
client/   React + Vite + ECharts. Capas domain / application / infrastructure / presentation.
docs/     architecture.md, conventions.md
.claude/agents/   Subagentes: leader, explorer, implementer, reviewer
feature_list.json, CHECKPOINTS.md, init.sh
```

Detalle de capas y flujo de datos: [docs/architecture.md](docs/architecture.md).
Convenciones de código: [docs/conventions.md](docs/conventions.md).

## Verificación

```bash
./init.sh        # lint + build + checks (debe terminar verde)
```

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
