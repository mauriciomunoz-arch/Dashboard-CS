import { useEffect, useRef } from 'react'
import * as echarts from 'echarts/core'
import { PieChart, BarChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// Registramos solo los módulos que usamos (tree-shaking → bundle más liviano).
echarts.use([
  PieChart,
  BarChart,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  CanvasRenderer,
])

/**
 * Atom: lienzo de gráfico. Inicializa ECharts directamente sobre un div
 * (sin wrappers) para ser compatible con React 19 y controlar el ciclo de vida.
 * Recibe `option` ya construida; no conoce datos de negocio.
 *
 * `onSelect(name)` se invoca al hacer click en un segmento (slice o barra);
 * `name` es la categoría clickeada.
 */
export default function Chart({ option, height = 280, onSelect }) {
  const containerRef = useRef(null)
  const instanceRef = useRef(null)
  // Ref a la última callback para no re-inicializar el chart cuando cambia.
  const onSelectRef = useRef(onSelect)
  useEffect(() => {
    onSelectRef.current = onSelect
  })

  // Crea/destruye la instancia y la mantiene responsive al tamaño del contenedor.
  useEffect(() => {
    const chart = echarts.init(containerRef.current)
    instanceRef.current = chart
    chart.on('click', (params) => onSelectRef.current?.(params.name))

    const observer = new ResizeObserver(() => chart.resize())
    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
      chart.dispose()
      instanceRef.current = null
    }
  }, [])

  // Aplica la opción cada vez que cambia (notMerge para reemplazo limpio).
  useEffect(() => {
    instanceRef.current?.setOption(option, true)
  }, [option])

  return <div ref={containerRef} style={{ height, width: '100%' }} />
}
