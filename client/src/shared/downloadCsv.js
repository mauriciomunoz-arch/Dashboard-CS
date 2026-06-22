// Prepende un BOM (U+FEFF) para que Excel respete los acentos (UTF-8).
const BOM = '﻿'

/**
 * Util de presentación: dispara la descarga de un CSV en el navegador.
 */
export function downloadCsv(filename, csv) {
  const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
