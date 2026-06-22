import './globals.css'
import Providers from './providers.jsx'

export const metadata = {
  title: 'Dashboard CS · Proyectos Linear',
  description:
    'Dashboard de tickets de Linear: KPIs y desgloses por estado, label, prioridad y responsable.',
  icons: { icon: '/favicon.svg' },
}

/**
 * Root layout (server component). Define el <html>/<body> y monta los
 * providers de cliente (React Query). Reemplaza a index.html + main.jsx.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
