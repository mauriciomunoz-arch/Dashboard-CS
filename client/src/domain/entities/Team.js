/**
 * Entidad Team (capa domain). Pura: el dashboard la usa para poblar el
 * selector del filtro principal por equipo.
 */
export function createTeam(raw) {
  return {
    id: raw.id,
    name: raw.name,
    key: raw.key,
  }
}
