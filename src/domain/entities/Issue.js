/**
 * Entidad Issue (capa domain). Pura: sin React, HTTP ni Linear.
 * Normaliza el nodo crudo de Linear a un shape estable para los gráficos.
 */
export function createIssue(raw) {
  return {
    id: raw.id,
    identifier: raw.identifier,
    title: raw.title ?? '',
    url: raw.url ?? '',
    createdAt: raw.createdAt ?? null,
    priority: raw.priority ?? 0,
    priorityLabel: raw.priorityLabel ?? 'No priority',
    state: {
      name: raw.state?.name ?? 'Sin estado',
      type: raw.state?.type ?? 'backlog',
      color: raw.state?.color ?? '#94a3b8',
    },
    assignee: raw.assignee?.name ?? null,
    labels: (raw.labels?.nodes ?? []).map((label) => ({
      name: label.name,
      color: label.color,
    })),
  }
}

/** Tipos de estado de Linear que cuentan como "completado". */
export function isCompleted(issue) {
  return issue.state.type === 'completed'
}

/** Tipos de estado de Linear que cuentan como "en curso". */
export function isStarted(issue) {
  return issue.state.type === 'started'
}

/** Tipos de estado de Linear que cuentan como "cancelado". */
export function isCanceled(issue) {
  return issue.state.type === 'canceled'
}
