import DateInput from '../atoms/DateInput.jsx'
import Button from '../atoms/Button.jsx'

/**
 * Molecule: filtro por rango de fecha de creación. Combina dos atoms DateInput
 * (desde/hasta). Es "tonto": recibe el rango y emite cambios hacia arriba. El
 * "hasta" no puede ser anterior al "desde" (y viceversa) vía min/max.
 */
export default function DateRangeFilter({ after, before, onAfterChange, onBeforeChange, onClear }) {
  const hasValue = Boolean(after || before)
  return (
    <div className="flex flex-wrap items-end gap-4">
      <DateInput
        id="created-after"
        label="Creados desde"
        value={after}
        max={before || undefined}
        onChange={onAfterChange}
      />
      <DateInput
        id="created-before"
        label="Creados hasta"
        value={before}
        min={after || undefined}
        onChange={onBeforeChange}
      />
      {hasValue && (
        <Button variant="ghost" onClick={onClear}>
          Limpiar fechas
        </Button>
      )}
    </div>
  )
}
