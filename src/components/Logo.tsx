// Central logo component.
// Drop your official files in /public and they appear everywhere:
//   public/logo.svg        -> colored version (light backgrounds)
//   public/logo-white.svg  -> white version  (dark / brand backgrounds)
// PNG works too — just point `src` below to logo.png / logo-white.png.

export default function Logo({
  variant = 'color',
  className = 'h-9 w-auto',
}: {
  variant?: 'color' | 'white'
  className?: string
}) {
  const src = variant === 'white' ? '/logo-white.svg' : '/logo.svg'
  return <img src={src} alt="Tiandy ישראל" className={className} />
}
