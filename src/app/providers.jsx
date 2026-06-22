'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

/**
 * Proveedor cliente de React Query. Crea una sola instancia por montaje
 * (useState con inicializador perezoso) para no recrearla en cada render.
 * Reemplaza la configuración que vivía en main.jsx.
 */
export default function Providers({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 60_000, refetchOnWindowFocus: false },
        },
      }),
  )

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
