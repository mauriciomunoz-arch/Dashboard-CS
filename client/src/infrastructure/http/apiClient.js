/**
 * Cliente HTTP hacia el backend proxy (NO hacia Linear).
 * Punto único de acceso a red (DRY): maneja base URL, JSON y errores.
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000'

export async function getJson(path, params = {}) {
  const url = new URL(path, BASE_URL)
  Object.entries(params).forEach(([key, value]) => {
    if (value != null && value !== '') url.searchParams.set(key, value)
  })

  const response = await fetch(url)
  const body = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(body?.error ?? `Error ${response.status} al llamar a ${path}`)
  }
  return body
}
