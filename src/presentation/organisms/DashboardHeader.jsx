/**
 * Organism: cabecera del dashboard.
 */
export default function DashboardHeader({ subtitle }) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-5">
        <h1 className="text-xl font-bold text-text">Dashboard CS · Tickets de Linear</h1>
        <p className="text-sm text-text-muted">{subtitle}</p>
      </div>
    </header>
  )
}
