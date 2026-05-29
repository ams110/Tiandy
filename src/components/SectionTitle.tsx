export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  center,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  center?: boolean
}) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <span className="text-sm font-bold uppercase tracking-wide text-brand-500">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-1 text-3xl font-extrabold text-slate-900">{title}</h2>
      {subtitle && <p className="mt-3 text-slate-600">{subtitle}</p>}
    </div>
  )
}
