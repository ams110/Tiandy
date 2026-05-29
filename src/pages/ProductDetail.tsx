import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductBySlug } from '../lib/api'
import type { Product } from '../lib/types'

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    getProductBySlug(slug)
      .then(setProduct)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div className="container py-20 text-slate-500">טוען…</div>
  if (!product)
    return (
      <div className="container py-20 text-center">
        <p className="text-slate-600">המוצר לא נמצא.</p>
        <Link to="/products" className="btn-outline mt-4">
          חזרה למוצרים
        </Link>
      </div>
    )

  const specs = Object.entries(product.specs ?? {})

  return (
    <div className="container py-12">
      <nav className="mb-6 text-sm text-slate-500">
        <Link to="/" className="hover:text-brand-600">דף הבית</Link> ·{' '}
        <Link to="/products" className="hover:text-brand-600">מוצרים</Link> ·{' '}
        <span className="text-slate-700">{product.name_he}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
          {product.image_url && (
            <img src={product.image_url} alt={product.name_he} className="w-full object-cover" />
          )}
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">{product.name_he}</h1>
          {product.short_desc_he && (
            <p className="mt-3 text-lg text-slate-600">{product.short_desc_he}</p>
          )}
          {product.description_he && (
            <p className="mt-4 leading-relaxed text-slate-700">{product.description_he}</p>
          )}

          {specs.length > 0 && (
            <div className="mt-6">
              <h2 className="mb-2 text-sm font-bold text-slate-800">מפרט טכני</h2>
              <dl className="overflow-hidden rounded-lg border border-slate-200">
                {specs.map(([k, v], i) => (
                  <div
                    key={k}
                    className={`flex justify-between px-4 py-2 text-sm ${
                      i % 2 ? 'bg-white' : 'bg-slate-50'
                    }`}
                  >
                    <dt className="font-medium text-slate-600">{k}</dt>
                    <dd className="text-slate-800">{String(v)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <Link to="/contact" className="btn-primary mt-8">
            בקשת הצעת מחיר
          </Link>
        </div>
      </div>
    </div>
  )
}
