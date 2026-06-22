/**
 * Caso de uso (capa application): serializa una lista de issues a CSV.
 * Función pura (devuelve string); la descarga (DOM) vive en presentación.
 */
const HEADERS = [
  'Identificador',
  'Título',
  'Estado',
  'Prioridad',
  'Responsable',
  'Labels',
  'Creado',
  'URL',
]

function toRow(fields) {
  // Comillas dobles + escape de comillas: CSV seguro ante comas y saltos de línea.
  return fields.map((field) => `"${String(field ?? '').replace(/"/g, '""')}"`).join(',')
}

export function issuesToCsv(issues) {
  const rows = issues.map((issue) => [
    issue.identifier,
    issue.title,
    issue.state.name,
    issue.priorityLabel,
    issue.assignee ?? 'Sin asignar',
    issue.labels.map((label) => label.name).join('; '),
    issue.createdAt ? issue.createdAt.slice(0, 10) : '',
    issue.url,
  ])
  return [toRow(HEADERS), ...rows.map(toRow)].join('\n')
}
