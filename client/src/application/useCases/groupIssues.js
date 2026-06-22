/**
 * Casos de uso (capa application): agrupan/cuentan issues por distintas
 * dimensiones. Funciones puras y testeables.
 *
 * `countIssuesBy` es el motor genérico (DRY): recibe un selector que, para
 * cada issue, devuelve una o varias claves `{ name, color }`. Devuelve una
 * lista `{ name, value, color }` ordenada de mayor a menor.
 *
 * El `color` que viene de Linear (estado, label) se conserva como dato; las
 * dimensiones sin color propio (prioridad, responsable) lo dejan en null y la
 * capa de presentación les asigna paleta.
 */
export function countIssuesBy(issues, selector) {
  const groups = new Map()

  for (const issue of issues) {
    for (const key of selector(issue)) {
      const current = groups.get(key.name) ?? { name: key.name, value: 0, color: key.color ?? null }
      current.value += 1
      groups.set(key.name, current)
    }
  }

  return [...groups.values()].sort((a, b) => b.value - a.value)
}

export function groupByStatus(issues) {
  return countIssuesBy(issues, (issue) => [
    { name: issue.state.name, color: issue.state.color },
  ])
}

export function groupByLabel(issues) {
  return countIssuesBy(issues, (issue) =>
    issue.labels.length > 0
      ? issue.labels.map((label) => ({ name: label.name, color: label.color }))
      : [{ name: 'Sin label', color: '#cbd5e1' }],
  )
}

export function groupByPriority(issues) {
  return countIssuesBy(issues, (issue) => [
    { name: issue.priorityLabel, color: null },
  ])
}

export function groupByAssignee(issues) {
  return countIssuesBy(issues, (issue) => [
    { name: issue.assignee ?? 'Sin asignar', color: null },
  ])
}

const MONTHS_ES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

/**
 * Agrupa issues por mes de creación. A diferencia de `countIssuesBy`, ordena
 * cronológicamente (no por valor): una serie temporal debe leerse en el tiempo.
 * Ignora issues sin `createdAt`.
 */
export function groupByMonth(issues) {
  const groups = new Map()

  for (const issue of issues) {
    if (!issue.createdAt) continue
    const date = new Date(issue.createdAt)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    const current =
      groups.get(key) ?? { key, name: `${MONTHS_ES[date.getMonth()]} ${date.getFullYear()}`, value: 0 }
    current.value += 1
    groups.set(key, current)
  }

  return [...groups.values()]
    .sort((a, b) => a.key.localeCompare(b.key))
    .map(({ name, value }) => ({ name, value, color: null }))
}
