import ChartCard from '../molecules/ChartCard.jsx'
import {
  groupByStatus,
  groupByLabel,
  groupByPriority,
  groupByAssignee,
  groupByMonth,
} from '../../application/useCases/groupIssues.js'
import {
  issuesByStatus,
  issuesByLabel,
  issuesByPriority,
  issuesByAssignee,
} from '../../application/useCases/filterIssuesBySegment.js'
import {
  buildDonutOption,
  buildBarOption,
  buildMonthlyBarOption,
  topN,
} from '../../shared/chartOptions.js'

/**
 * Organism: grilla de desgloses de tickets. Compone los casos de uso de
 * agrupación (application) con los constructores de opciones (shared). El
 * gráfico mensual (serie temporal) ocupa el ancho completo; debajo van los
 * cuatro desgloses categóricos en dos columnas.
 *
 * Al hacer click en un segmento, resuelve los tickets de esa categoría (vía
 * los casos de uso de filtrado) y los emite con `onSegmentSelect`.
 */
export default function ChartsGrid({ issues, onSegmentSelect }) {
  const month = groupByMonth(issues)
  const status = groupByStatus(issues)
  const priority = groupByPriority(issues)
  const labels = topN(groupByLabel(issues), 10)
  const assignees = topN(groupByAssignee(issues), 10)

  const labelNames = labels.map((d) => d.name).filter((n) => n !== 'Otros')
  const assigneeNames = assignees.map((d) => d.name).filter((n) => n !== 'Otros')

  // Orden de prioridad pedido: estado → label → prioridad → responsable.
  const charts = [
    {
      title: 'Tickets por estado',
      option: buildDonutOption(status),
      data: status,
      resolve: (name) => issuesByStatus(issues, name),
    },
    {
      title: 'Tickets por label',
      option: buildBarOption(labels),
      data: labels,
      resolve: (name) => issuesByLabel(issues, name, labelNames),
    },
    {
      title: 'Tickets por prioridad',
      option: buildDonutOption(priority),
      data: priority,
      resolve: (name) => issuesByPriority(issues, name),
    },
    {
      title: 'Tickets por responsable',
      option: buildBarOption(assignees),
      data: assignees,
      resolve: (name) => issuesByAssignee(issues, name, assigneeNames),
    },
  ]

  const handleSelect = (chart) => (name) => {
    const subset = chart.resolve(name)
    if (subset.length > 0) {
      onSegmentSelect({ subtitle: chart.title, name, issues: subset })
    }
  }

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <ChartCard
          title="Tickets por mes (creación)"
          option={buildMonthlyBarOption(month)}
          isEmpty={month.length === 0}
        />
      </div>
      {charts.map((chart) => (
        <ChartCard
          key={chart.title}
          title={chart.title}
          option={chart.option}
          isEmpty={chart.data.length === 0}
          onSelect={handleSelect(chart)}
        />
      ))}
    </div>
  )
}
