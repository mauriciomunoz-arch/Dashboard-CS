import { config } from '../config/env.js'

/**
 * Cliente GraphQL mínimo para Linear. Único punto que conoce la API key.
 * Reutilizable por cualquier query (DRY): el servicio solo pasa query + variables.
 */
export async function linearRequest(query, variables = {}) {
  // Se lee fuera del try para que la falta de API key dé su mensaje claro
  // (fail-fast) en vez de quedar enmascarada como "no se pudo contactar".
  const apiKey = config.linearApiKey

  let response
  try {
    response = await fetch(config.linearApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Las personal API keys de Linear se envían tal cual, sin "Bearer".
        Authorization: apiKey,
      },
      body: JSON.stringify({ query, variables }),
    })
  } catch (cause) {
    throw new LinearError(502, 'No se pudo contactar a la API de Linear.', cause)
  }

  if (response.status === 401 || response.status === 403) {
    throw new LinearError(
      502,
      'Linear rechazó la API key (401/403). ¿La rotaste? Revisa LINEAR_API_KEY en server/.env.',
    )
  }

  const body = await response.json().catch(() => null)

  // Los errores de GraphQL pueden venir con status 200 o 4xx; revísalos primero.
  if (body?.errors?.length) {
    throw new LinearError(502, body.errors.map((e) => e.message).join('; '))
  }

  if (!response.ok || !body?.data) {
    throw new LinearError(502, `Linear respondió con estado ${response.status}.`)
  }

  return body.data
}

export class LinearError extends Error {
  constructor(status, message, cause) {
    super(message)
    this.name = 'LinearError'
    this.status = status
    this.cause = cause
  }
}
