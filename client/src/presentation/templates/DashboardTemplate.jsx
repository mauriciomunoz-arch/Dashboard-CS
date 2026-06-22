/**
 * Template: define el layout del dashboard (cabecera + filtros + contenido).
 * No conoce datos; solo coloca slots. Las páginas inyectan el contenido.
 */
export default function DashboardTemplate({ header, filters, children }) {
  return (
    <div className="min-h-full">
      {header}
      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6">
        {filters}
        {children}
      </main>
    </div>
  )
}
