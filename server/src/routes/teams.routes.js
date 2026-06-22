import { Router } from 'express'
import { getTeams } from '../linear/linearService.js'

const router = Router()

// GET /api/teams
router.get('/', async (_req, res, next) => {
  try {
    const teams = await getTeams()
    res.json({ teams })
  } catch (error) {
    next(error)
  }
})

export default router
