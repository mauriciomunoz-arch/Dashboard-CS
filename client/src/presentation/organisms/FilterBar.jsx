import TeamFilter from '../molecules/TeamFilter.jsx'
import DateRangeFilter from '../molecules/DateRangeFilter.jsx'
import Spinner from '../atoms/Spinner.jsx'

/**
 * Organism: barra de filtros. Combina el filtro por equipo con el filtro por
 * rango de fecha de creación. Es "tonto": recibe valores y emite cambios.
 */
export default function FilterBar({
  teams,
  isLoading,
  selectedTeamId,
  onTeamChange,
  createdAfter,
  createdBefore,
  onCreatedAfterChange,
  onCreatedBeforeChange,
  onClearDates,
}) {
  return (
    <div className="flex flex-wrap items-end gap-4">
      {isLoading ? (
        <Spinner label="Cargando equipos…" />
      ) : (
        <TeamFilter teams={teams} value={selectedTeamId} onChange={onTeamChange} />
      )}
      <DateRangeFilter
        after={createdAfter}
        before={createdBefore}
        onAfterChange={onCreatedAfterChange}
        onBeforeChange={onCreatedBeforeChange}
        onClear={onClearDates}
      />
    </div>
  )
}
