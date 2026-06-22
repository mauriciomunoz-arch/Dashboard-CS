/**
 * Configuración server-side centralizada y validada.
 *
 * Next.js carga las variables de .env.local / .env automáticamente, así que ya
 * no usamos dotenv. La API key se valida de forma PEREZOSA (getter): solo se
 * exige al usarla en una petición, no en tiempo de build (fail-fast en runtime
 * con un mensaje claro si falta).
 */
function required(name) {
  const value = process.env[name]
  if (!value) {
    throw new Error(
      `Falta la variable de entorno ${name}. Cópiala en .env.local (ver .env.example).`,
    )
  }
  return value
}

export const config = {
  get linearApiKey() {
    return required('LINEAR_API_KEY')
  },
  linearApiUrl: 'https://api.linear.app/graphql',
}
