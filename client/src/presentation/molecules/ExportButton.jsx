import Button from '../atoms/Button.jsx'
import { issuesToCsv } from '../../application/useCases/issuesToCsv.js'
import { downloadCsv } from '../../shared/downloadCsv.js'

/**
 * Molecule: botón que exporta una lista de issues a CSV.
 * Combina el caso de uso puro (issuesToCsv) con la descarga (downloadCsv).
 */
export default function ExportButton({
  issues,
  filename = 'tickets.csv',
  label = 'Exportar CSV',
  variant = 'primary',
}) {
  const handleExport = () => {
    if (!issues?.length) return
    downloadCsv(filename, issuesToCsv(issues))
  }

  return (
    <Button variant={variant} onClick={handleExport} disabled={!issues?.length}>
      {label}
    </Button>
  )
}
