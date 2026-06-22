import express from 'express'
import cors from 'cors'
import { config } from './config/env.js'
import { LinearError } from './linear/linearClient.js'
import teamsRoutes from './routes/teams.routes.js'
import issuesRoutes from './routes/issues.routes.js'

const app = express()

app.use(cors({ origin: config.clientOrigin }))
app.use(express.json())

app.get('/health', (_req, res) => res.json({ status: 'ok' }))
app.use('/api/teams', teamsRoutes)
app.use('/api/issues', issuesRoutes)

// Manejador de errores centralizado (DRY): traduce LinearError a HTTP.
// eslint-disable-next-line no-unused-vars
app.use((error, _req, res, _next) => {
  const status = error instanceof LinearError ? error.status : 500
  console.error(`[${status}]`, error.message)
  res.status(status).json({ error: error.message })
})

app.listen(config.port, () => {
  console.log(`Backend proxy escuchando en http://localhost:${config.port}`)
})
