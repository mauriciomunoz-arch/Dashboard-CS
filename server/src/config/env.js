import dotenv from 'dotenv'

dotenv.config()

/**
 * Configuración centralizada y validada. Si falta la API key, el server
 * no arranca con un mensaje claro (fail-fast) en vez de fallar en runtime.
 */
function required(name) {
  const value = process.env[name]
  if (!value) {
    throw new Error(
      `Falta la variable de entorno ${name}. Cópiala en server/.env (ver server/.env.example).`,
    )
  }
  return value
}

export const config = {
  linearApiKey: required('LINEAR_API_KEY'),
  port: Number(process.env.PORT) || 4000,
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  linearApiUrl: 'https://api.linear.app/graphql',
}
