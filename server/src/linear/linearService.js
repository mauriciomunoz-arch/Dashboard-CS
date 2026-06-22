import { linearRequest } from './linearClient.js'

/**
 * Capa de servicio: define las queries de negocio contra Linear.
 * Devuelve los nodos crudos; la normalización a entidades vive en el cliente.
 *
 * Linear limita la complejidad de la query (~10000). Con campos anidados, pedir
 * muchos registros a la vez la excede, así que paginamos en páginas pequeñas.
 */
const PAGE_SIZE = 50

// --- Equipos (filtro principal del dashboard) ---
const TEAMS_QUERY = `
  query Teams($first: Int!, $after: String) {
    teams(first: $first, after: $after) {
      nodes { id name key }
      pageInfo { hasNextPage endCursor }
    }
  }
`

// --- Issues (tickets) con su estado, labels, prioridad y responsable ---
const ISSUES_QUERY = `
  query Issues($filter: IssueFilter, $first: Int!, $after: String) {
    issues(first: $first, after: $after, filter: $filter) {
      nodes {
        id
        identifier
        title
        url
        createdAt
        priority
        priorityLabel
        state { name type color }
        assignee { name }
        labels { nodes { name color } }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
`

/**
 * Helper genérico de paginación por cursor (DRY): recorre todas las páginas
 * de una conexión GraphQL y devuelve la lista completa de nodos.
 */
async function fetchAllPages(query, pick, variables = {}) {
  const all = []
  let after = null
  let hasNextPage = true

  while (hasNextPage) {
    const data = await linearRequest(query, { ...variables, first: PAGE_SIZE, after })
    const connection = pick(data)
    all.push(...connection.nodes)
    hasNextPage = connection.pageInfo.hasNextPage
    after = connection.pageInfo.endCursor
  }

  return all
}

export function getTeams() {
  return fetchAllPages(TEAMS_QUERY, (d) => d.teams)
}

/**
 * Construye el IssueFilter de Linear a partir de los filtros del dashboard.
 * Devuelve undefined si no hay ninguno (equivale a "todos"). Las fechas son
 * YYYY-MM-DD; se expanden a inicio/fin de día (UTC) para que el rango sea
 * inclusivo en ambos extremos.
 */
function buildIssuesFilter({ teamId, createdAfter, createdBefore }) {
  const filter = {}
  if (teamId) filter.team = { id: { eq: teamId } }

  const createdAt = {}
  if (createdAfter) createdAt.gte = `${createdAfter}T00:00:00.000Z`
  if (createdBefore) createdAt.lte = `${createdBefore}T23:59:59.999Z`
  if (Object.keys(createdAt).length > 0) filter.createdAt = createdAt

  return Object.keys(filter).length > 0 ? filter : undefined
}

/**
 * Lista issues. Filtra server-side por equipo y/o rango de fecha de creación.
 */
export function getIssues({ teamId, createdAfter, createdBefore } = {}) {
  const filter = buildIssuesFilter({ teamId, createdAfter, createdBefore })
  return fetchAllPages(ISSUES_QUERY, (d) => d.issues, { filter })
}
