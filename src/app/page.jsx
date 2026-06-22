import DashboardPage from '@/presentation/pages/DashboardPage.jsx'

/**
 * Ruta raíz (server component). Solo monta la página de presentación, que es
 * un client component. Mantiene intacta la jerarquía de Atomic Design.
 */
export default function Page() {
  return <DashboardPage />
}
