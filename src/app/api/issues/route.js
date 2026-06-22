import { NextResponse } from 'next/server'
import { getIssues } from '@/server/linear/linearService.js'
import { errorResponse } from '@/server/httpError.js'

export const dynamic = 'force-dynamic'

// GET /api/issues?teamId=<id>&createdAfter=YYYY-MM-DD&createdBefore=YYYY-MM-DD
// Todos los parámetros son opcionales (sin ellos → todos los equipos / fechas).
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const issues = await getIssues({
      teamId: searchParams.get('teamId') || undefined,
      createdAfter: searchParams.get('createdAfter') || undefined,
      createdBefore: searchParams.get('createdBefore') || undefined,
    })
    return NextResponse.json({ issues })
  } catch (error) {
    return errorResponse(error)
  }
}
