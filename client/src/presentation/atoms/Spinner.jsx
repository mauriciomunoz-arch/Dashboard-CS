/**
 * Atom: indicador de carga.
 */
export default function Spinner({ label = 'Cargando…' }) {
  return (
    <div className="flex items-center gap-2 text-text-muted" role="status">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-primary" />
      <span>{label}</span>
    </div>
  )
}
