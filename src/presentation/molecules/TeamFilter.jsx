import Select from '../atoms/Select.jsx'

/**
 * Molecule: filtro principal por equipo. Combina el atom Select con la lista
 * de equipos. Es "tonto": recibe equipos + valor y emite cambios hacia arriba.
 */
export default function TeamFilter({ teams, value, onChange }) {
  const options = teams.map((team) => ({ value: team.id, label: team.name }))
  return (
    <Select
      id="team-filter"
      label="Filtrar por equipo"
      placeholder="Todos los equipos"
      value={value}
      onChange={onChange}
      options={options}
    />
  )
}
