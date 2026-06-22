import Chart from '../atoms/Chart.jsx'

/**
 * Molecule: tarjeta con título que contiene un gráfico. Maneja el estado vacío.
 * Si recibe `onSelect`, muestra una pista de que el gráfico es interactivo.
 */
export default function ChartCard({ title, option, isEmpty, height, onSelect }) {
  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold text-text">{title}</h2>
        {onSelect && !isEmpty && (
          <span className="text-xs text-text-muted">Click para ver tickets</span>
        )}
      </div>
      {isEmpty ? (
        <div className="flex h-[280px] items-center justify-center text-sm text-text-muted">
          Sin datos para este filtro
        </div>
      ) : (
        <Chart option={option} height={height} onSelect={onSelect} />
      )}
    </section>
  )
}
