import { NextResponse } from 'next/server'
import { LinearError } from './linear/linearClient.js'

/**
 * Traduce un error a una respuesta HTTP JSON (DRY). Reemplaza el manejador de
 * errores centralizado que antes vivía en el app.js de Express: los Route
 * Handlers lo invocan en su bloque catch.
 */
export function errorResponse(error) {
  const status = error instanceof LinearError ? error.status : 500
  console.error(`[${status}]`, error.message)
  return NextResponse.json({ error: error.message }, { status })
}
