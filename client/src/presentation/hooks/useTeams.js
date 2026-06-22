import { useQuery } from '@tanstack/react-query'
import { fetchTeams } from '../../infrastructure/repositories/linearRepository.js'

/**
 * Hook de datos (React Query): expone los equipos para el filtro principal.
 */
export function useTeams() {
  return useQuery({
    queryKey: ['teams'],
    queryFn: fetchTeams,
  })
}
