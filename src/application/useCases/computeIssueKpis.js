import { isCompleted, isStarted, isCanceled } from '../../domain/entities/Issue.js'

/**
 * Caso de uso (capa application): calcula los indicadores del encabezado.
 * Función pura.
 *
 * "Abiertos" = tickets que no están ni completados ni cancelados (sigue
 * habiendo trabajo pendiente: backlog + sin empezar + en curso).
 */
export function computeIssueKpis(issues) {
  const total = issues.length
  const completed = issues.filter(isCompleted).length
  const started = issues.filter(isStarted).length
  const canceled = issues.filter(isCanceled).length
  const open = total - completed - canceled
  const percentDone = total === 0 ? 0 : Math.round((completed / total) * 100)

  return { total, completed, started, open, percentDone }
}
