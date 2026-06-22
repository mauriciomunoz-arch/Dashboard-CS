/**
 * Atom: input de fecha accesible y controlado (YYYY-MM-DD).
 * value/onChange controlados desde afuera; emite el string del input.
 */
export default function DateInput({ id, label, value, onChange, min, max }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-text-muted">
          {label}
        </label>
      )}
      <input
        id={id}
        type="date"
        value={value}
        min={min}
        max={max}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
    </div>
  )
}
