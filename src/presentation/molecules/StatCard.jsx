/**
 * Molecule: tarjeta de KPI. Muestra un valor grande con su etiqueta y un
 * acento de color a la izquierda.
 */
export default function StatCard({ label, value, accent = 'var(--color-primary)' }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-5 shadow-sm">
      <span className="absolute inset-y-0 left-0 w-1" style={{ backgroundColor: accent }} />
      <p className="text-xs font-medium uppercase tracking-wide text-text-muted">{label}</p>
      <p className="mt-1 text-3xl font-bold text-text">{value}</p>
    </div>
  )
}
