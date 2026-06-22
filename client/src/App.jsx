import DashboardPage from './presentation/pages/DashboardPage.jsx'

/**
 * App es solo el punto de montaje. La composición real vive en la página
 * (capa de presentación), respetando la jerarquía de Atomic Design.
 */
export default function App() {
  return <DashboardPage />
}
