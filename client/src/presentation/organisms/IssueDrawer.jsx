import { useEffect } from 'react'
import ExportButton from '../molecules/ExportButton.jsx'

/** Convierte un nombre de segmento en un filename seguro. */
function toFilename(name) {
  const slug = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return `tickets-${slug || 'segmento'}.csv`
}

/**
 * Organism: panel lateral (drawer) con la lista de tickets de un segmento.
 * Cada ticket enlaza directo a Linear (issue.url). Se cierra con la X, el
 * overlay o la tecla Esc.
 */
export default function IssueDrawer({ data, onClose }) {
  useEffect(() => {
    if (!data) return undefined
    const onKey = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [data, onClose])

  if (!data) return null
  const { subtitle, name, issues } = data

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} aria-hidden="true" />
      <aside
        className="relative flex h-full w-full max-w-md flex-col bg-surface shadow-2xl"
        role="dialog"
        aria-label={`Tickets: ${name}`}
      >
        <header className="flex items-start justify-between gap-3 border-b border-border p-5">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-text-muted">{subtitle}</p>
            <h2 className="truncate text-lg font-bold text-text">{name}</h2>
            <p className="text-sm text-text-muted">{issues.length} tickets</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="rounded-lg px-2 py-1 text-text-muted hover:bg-bg"
          >
            ✕
          </button>
        </header>

        <div className="border-b border-border p-4">
          <ExportButton
            issues={issues}
            filename={toFilename(name)}
            label="Exportar estos tickets (CSV)"
            variant="ghost"
          />
        </div>

        <ul className="flex-1 divide-y divide-border overflow-y-auto">
          {issues.map((issue) => (
            <li key={issue.id}>
              <a
                href={issue.url}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col gap-0.5 px-5 py-3 transition hover:bg-bg"
              >
                <span className="font-mono text-xs text-text-muted">{issue.identifier}</span>
                <span className="text-sm text-text">{issue.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}
