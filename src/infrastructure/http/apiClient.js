/**
 * Cliente HTTP hacia los Route Handlers de Next (mismo origen, rutas /api/...).
 * Punto único de acceso a red (DRY): arma la query string, parsea JSON y errores.
 * Como cliente y API comparten origen, las rutas son relativas (sin base URL).
 */
export async function getJson(path, params = {}) {
  const search = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value != null && value !== '') search.set(key, value)
  })

  const query = search.toString()
  const response = await fetch(query ? `${path}?${query}` : path)
  const body = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(body?.error ?? `Error ${response.status} al llamar a ${path}`)
  }
  return body
}
