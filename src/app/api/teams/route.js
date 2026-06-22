import { NextResponse } from 'next/server'
import { getTeams } from '@/server/linear/linearService.js'
import { errorResponse } from '@/server/httpError.js'

// La API key de Linear vive server-side; nunca llega al navegador.
// force-dynamic: datos en vivo, sin caché estática del build.
export const dynamic = 'force-dynamic'

// GET /api/teams
export async function GET() {
  try {
    const teams = await getTeams()
    return NextResponse.json({ teams })
  } catch (error) {
    return errorResponse(error)
  }
}
