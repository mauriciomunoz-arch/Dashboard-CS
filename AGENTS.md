# AGENTS.md — Reglas del repositorio

Este repositorio usa un harness de subagentes para iterar de forma controlada.
**Todo agente lee este archivo antes de actuar.**

## Las 3 reglas de oro

1. **DRY + Clean.** No duplicar lógica. Nombres claros, funciones pequeñas,
   un caso de uso por archivo. Antes de escribir, busca si ya existe algo
   reutilizable (un hook, un caso de uso, un util).

2. **Clean Architecture + Atomic Design.**
   - Regla de dependencias: `presentation → application → domain`.
     `infrastructure` implementa contratos del `domain`. El `domain` no
     importa de ninguna otra capa.
   - Atomic Design en `presentation/`: `atoms → molecules → organisms →
     templates → pages`. Un nivel solo compone niveles inferiores.

3. **No actuar sin permiso.** El agente **nunca** hace nada que no se le haya
   pedido. Ante cualquier decisión (librería nueva, cambio de arquitectura,
   borrado de archivos, alcance ambiguo) **se detiene y confirma con el
   humano antes de continuar**. No improvisa workarounds.

## Roles (ver `.claude/agents/`)

| Agente        | Hace                                                        | NO hace                          |
|---------------|-------------------------------------------------------------|----------------------------------|
| `leader`      | Descompone y coordina; lanza subagentes                     | No escribe código, no marca done |
| `explorer`    | Investiga una pregunta acotada (read-only)                  | No edita código                  |
| `implementer` | Ejecuta UNA feature de inicio a verificación + tests        | No marca done; llama al reviewer |
| `reviewer`    | Aprueba/rechaza contra arquitectura, convenciones, tests    | No edita código                  |

## Flujo estándar

```
leader → [explorer(s) si hace falta] → implementer → reviewer → done
```

Nadie declara `done` sin un veredicto `APPROVED` del `reviewer`.

## Mapa del repo

- `server/` — backend proxy de Linear (guarda la API key, GraphQL).
- `client/` — React + Vite (Clean Architecture + Atomic Design).
- `docs/` — `architecture.md`, `conventions.md`.
- `feature_list.json` — backlog de features con estado y `acceptance`.
- `CHECKPOINTS.md` — checklist objetiva que recorre el reviewer.
- `progress/` — bitácora efímera entre agentes (`current.md`, `review.md`, …).
- `init.sh` — verificación: lint + build + tests.

## Seguridad

La API key de Linear vive **solo** en `server/.env` (en `.gitignore`).
Nunca debe aparecer en el cliente ni commitearse. El navegador habla con el
proxy local, jamás con `api.linear.app`.
