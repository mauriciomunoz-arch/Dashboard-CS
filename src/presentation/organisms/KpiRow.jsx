import StatCard from '../molecules/StatCard.jsx'

/**
 * Organism: fila de indicadores (KPIs) calculados sobre los issues visibles.
 */
export default function KpiRow({ kpis }) {
  const cards = [
    { label: 'Total tickets', value: kpis.total, accent: '#5e6ad2' },
    { label: 'Solucionados', value: kpis.completed, accent: '#10b981' },
    { label: 'Abiertos', value: kpis.open, accent: '#8b5cf6' },
    { label: 'En curso', value: kpis.started, accent: '#f59e0b' },
    { label: '% completado', value: `${kpis.percentDone}%`, accent: '#3b82f6' },
  ]
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
      {cards.map((card) => (
        <StatCard key={card.label} label={card.label} value={card.value} accent={card.accent} />
      ))}
    </div>
  )
}
