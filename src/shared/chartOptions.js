/**
 * Constructores de opciones para ECharts. Centralizan el "look premium"
 * (paleta, tipografía, bordes redondeados, tooltips) en un solo sitio (DRY),
 * para que todos los gráficos se vean consistentes.
 *
 * Entrada: data = [{ name, value, color }] (color puede ser null).
 */

const FONT = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'

// Paleta de respaldo para dimensiones sin color propio.
const PALETTE = [
  '#5e6ad2', '#10b981', '#f59e0b', '#ef4444', '#3b82f6',
  '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#64748b',
]

// Colores fijos por prioridad (coinciden con la semántica de Linear).
const PRIORITY_COLORS = {
  Urgent: '#ef4444',
  High: '#f59e0b',
  Medium: '#eab308',
  Low: '#3b82f6',
  'No priority': '#94a3b8',
}

/** Asigna color a cada item: el propio → mapa fijo → paleta rotativa. */
function withColors(data) {
  let i = 0
  return data.map((d) => ({
    ...d,
    color: d.color ?? PRIORITY_COLORS[d.name] ?? PALETTE[i++ % PALETTE.length],
  }))
}

/** Recorta a los top N y agrupa el resto en "Otros" (legibilidad). */
export function topN(data, n = 10) {
  if (data.length <= n) return data
  const head = data.slice(0, n)
  const rest = data.slice(n).reduce((sum, d) => sum + d.value, 0)
  return [...head, { name: 'Otros', value: rest, color: '#cbd5e1' }]
}

const baseTooltip = {
  backgroundColor: '#1f2430',
  borderWidth: 0,
  textStyle: { color: '#fff', fontFamily: FONT, fontSize: 12 },
  padding: [8, 12],
}

/** Donut premium — ideal para estado y prioridad. */
export function buildDonutOption(rawData) {
  const data = withColors(rawData)
  const total = data.reduce((sum, d) => sum + d.value, 0)
  return {
    tooltip: { ...baseTooltip, trigger: 'item', formatter: '{b}: <b>{c}</b> ({d}%)' },
    legend: {
      type: 'scroll',
      bottom: 0,
      icon: 'circle',
      itemWidth: 9,
      itemHeight: 9,
      textStyle: { color: '#6b7280', fontFamily: FONT, fontSize: 12 },
    },
    series: [
      {
        type: 'pie',
        radius: ['58%', '80%'],
        center: ['50%', '44%'],
        avoidLabelOverlap: true,
        padAngle: 2,
        itemStyle: { borderColor: '#ffffff', borderWidth: 2, borderRadius: 6 },
        label: {
          show: true,
          position: 'center',
          formatter: () => `${total}\ntickets`,
          color: '#1f2430',
          fontSize: 22,
          fontWeight: 700,
          lineHeight: 18,
          fontFamily: FONT,
        },
        emphasis: {
          scale: true,
          scaleSize: 6,
          label: { show: true, fontSize: 22, fontWeight: 700 },
        },
        labelLine: { show: false },
        data: data.map((d) => ({
          name: d.name,
          value: d.value,
          itemStyle: { color: d.color },
        })),
      },
    ],
  }
}

/** Barras verticales premium — ideal para series temporales (tickets por mes). */
export function buildMonthlyBarOption(data) {
  return {
    tooltip: { ...baseTooltip, trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: 8, right: 16, top: 16, bottom: 6, containLabel: true },
    xAxis: {
      type: 'category',
      data: data.map((d) => d.name),
      axisTick: { show: false },
      axisLine: { lineStyle: { color: '#eef0f2' } },
      axisLabel: {
        color: '#4b5563',
        fontFamily: FONT,
        fontSize: 11,
        rotate: data.length > 8 ? 45 : 0,
      },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: '#eef0f2' } },
      axisLabel: { color: '#9ca3af', fontFamily: FONT, fontSize: 11 },
    },
    series: [
      {
        type: 'bar',
        barWidth: '55%',
        itemStyle: { color: PALETTE[0], borderRadius: [6, 6, 0, 0] },
        data: data.map((d) => d.value),
      },
    ],
  }
}

/** Barras horizontales premium — ideal para labels y responsables. */
export function buildBarOption(rawData) {
  const data = withColors(rawData)
  // ECharts dibuja la categoría de abajo hacia arriba; invertimos para que el
  // valor más alto quede arriba.
  const ordered = [...data].reverse()
  return {
    tooltip: { ...baseTooltip, trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: 8, right: 28, top: 10, bottom: 6, containLabel: true },
    xAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: '#eef0f2' } },
      axisLabel: { color: '#9ca3af', fontFamily: FONT, fontSize: 11 },
    },
    yAxis: {
      type: 'category',
      data: ordered.map((d) => d.name),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#4b5563', fontFamily: FONT, fontSize: 12 },
    },
    series: [
      {
        type: 'bar',
        barWidth: '58%',
        label: { show: true, position: 'right', color: '#6b7280', fontFamily: FONT, fontSize: 11 },
        data: ordered.map((d) => ({
          value: d.value,
          itemStyle: { color: d.color, borderRadius: [0, 6, 6, 0] },
        })),
      },
    ],
  }
}
