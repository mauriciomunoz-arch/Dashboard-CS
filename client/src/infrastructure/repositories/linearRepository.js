import { getJson } from '../http/apiClient.js'
import { createTeam } from '../../domain/entities/Team.js'
import { createIssue } from '../../domain/entities/Issue.js'

/**
 * Repositorio (capa infrastructure): habla con el proxy y devuelve
 * ENTIDADES del dominio, no respuestas crudas. La presentación nunca
 * ve la forma de la API.
 */
export async function fetchTeams() {
  const { teams } = await getJson('/api/teams')
  return teams.map(createTeam)
}

export async function fetchIssues({ teamId, createdAfter, createdBefore } = {}) {
  const { issues } = await getJson('/api/issues', { teamId, createdAfter, createdBefore })
  return issues.map(createIssue)
}
