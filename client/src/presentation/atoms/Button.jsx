/**
 * Atom: botón base con variantes. Estilo centralizado (DRY).
 */
const VARIANTS = {
  primary: 'bg-primary text-white hover:opacity-90',
  ghost: 'bg-transparent text-text border border-border hover:bg-bg',
}

export default function Button({ children, variant = 'primary', ...props }) {
  return (
    <button
      type="button"
      className={`rounded-lg px-3 py-2 text-sm font-medium transition disabled:opacity-50 ${VARIANTS[variant]}`}
      {...props}
    >
      {children}
    </button>
  )
}
