import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container py-24 text-center">
      <div className="text-6xl font-extrabold text-brand-500">404</div>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">הדף לא נמצא</h1>
      <p className="mt-2 text-slate-600">ייתכן שהקישור שגוי או שהדף הוסר.</p>
      <Link to="/" className="btn-primary mt-6">
        חזרה לדף הבית
      </Link>
    </div>
  )
}
