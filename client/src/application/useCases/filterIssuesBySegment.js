/**
 * Casos de uso (capa application): dado el conjunto de issues visible y el
 * nombre de un segmento de un gráfico, devuelven los issues de ese segmento.
 * Funciones puras y testeables. Reflejan exactamente los selectores usados en
 * `groupIssues.js` (DRY conceptual: misma definición de pertenencia).
 *
 * `topNames` es la lista de categorías mostradas (sin "Otros"); se usa para
 * resolver el segmento agregado "Otros".
 */
export function issuesByStatus(issues, name) {
  return issues.filter((issue) => issue.state.name === name)
}

export function issuesByPriority(issues, name) {
  return issues.filter((issue) => issue.priorityLabel === name)
}

export function issuesByAssignee(issues, name, topNames = []) {
  if (name === 'Otros') {
    const top = new Set(topNames)
    return issues.filter((issue) => !top.has(issue.assignee ?? 'Sin asignar'))
  }
  return issues.filter((issue) => (issue.assignee ?? 'Sin asignar') === name)
}

export function issuesByLabel(issues, name, topNames = []) {
  if (name === 'Sin label') {
    return issues.filter((issue) => issue.labels.length === 0)
  }
  if (name === 'Otros') {
    const top = new Set(topNames)
    return issues.filter(
      (issue) => issue.labels.length > 0 && issue.labels.some((label) => !top.has(label.name)),
    )
  }
  return issues.filter((issue) => issue.labels.some((label) => label.name === name))
}
