import { useQuery } from '@tanstack/react-query'
import { fetchIssues } from '../../infrastructure/repositories/linearRepository.js'

/**
 * Hook de datos (React Query): trae los issues del equipo seleccionado y/o del
 * rango de fecha de creación (cualquiera vacío → sin ese filtro). Cachea por la
 * combinación de filtros.
 */
export function useIssues({ teamId, createdAfter, createdBefore } = {}) {
  return useQuery({
    queryKey: ['issues', teamId || 'all', createdAfter || 'any', createdBefore || 'any'],
    queryFn: () =>
      fetchIssues({
        teamId: teamId || undefined,
        createdAfter: createdAfter || undefined,
        createdBefore: createdBefore || undefined,
      }),
  })
}
