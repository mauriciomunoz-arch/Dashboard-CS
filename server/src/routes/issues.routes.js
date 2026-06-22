import { Router } from 'express'
import { getIssues } from '../linear/linearService.js'

const router = Router()

// GET /api/issues?teamId=<id>&createdAfter=YYYY-MM-DD&createdBefore=YYYY-MM-DD
// Todos los parámetros son opcionales (sin ellos → todos los equipos / fechas).
router.get('/', async (req, res, next) => {
  try {
    const { teamId, createdAfter, createdBefore } = req.query
    const issues = await getIssues({
      teamId: teamId || undefined,
      createdAfter: createdAfter || undefined,
      createdBefore: createdBefore || undefined,
    })
    res.json({ issues })
  } catch (error) {
    next(error)
  }
})

export default router
