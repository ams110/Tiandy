import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'
import ProductCard from '../components/ProductCard'
import { getFeaturedProducts } from '../lib/api'
import type { Product } from '../lib/types'
import { hero, stats, solutions } from '../data/content'

export default function Home() {
  const [featured, setFeatured] = useState<Product[]>([])

  useEffect(() => {
    getFeaturedProducts()
      .then(setFeatured)
      .catch((e) => console.error(e))
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-bl from-brand-700 via-brand-600 to-brand-800 text-white">
        <div className="container grid items-center gap-10 py-20 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
              {hero.title}
            </h1>
            <p className="mt-5 max-w-lg text-lg text-brand-50/90">{hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={hero.primaryCta.to} className="btn bg-white text-brand-700 hover:bg-brand-50">
                {hero.primaryCta.label}
              </Link>
              <Link
                to={hero.secondaryCta.to}
                className="btn border border-white/60 text-white hover:bg-white/10"
              >
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=900&q=80"
              alt="מצלמת אבטחה"
              className="rounded-2xl shadow-2xl ring-1 ring-white/20"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold text-brand-600">{s.value}</div>
              <div className="mt-1 text-sm text-slate-600">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="container py-16">
        <SectionTitle
          eyebrow="המוצרים שלנו"
          title="מוצרים נבחרים"
          subtitle="מבחר פתרונות מובילים למעקב ואבטחה."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
          {featured.length === 0 && (
            <p className="text-slate-500">לא נמצאו מוצרים נבחרים כרגע.</p>
          )}
        </div>
        <div className="mt-8 text-center">
          <Link to="/products" className="btn-outline">
            לכל המוצרים
          </Link>
        </div>
      </section>

      {/* Solutions */}
      <section className="bg-slate-50 py-16">
        <div className="container">
          <SectionTitle
            center
            eyebrow="פתרונות"
            title="פתרונות לכל תחום"
            subtitle="התאמה מדויקת לצרכים של כל ענף ותעשייה."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s) => (
              <div key={s.slug} className="card p-6">
                <div className="text-3xl">{s.icon}</div>
                <h3 className="mt-3 text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16">
        <div className="rounded-2xl bg-brand-600 px-8 py-12 text-center text-white">
          <h2 className="text-2xl font-extrabold md:text-3xl">
            מחפשים פתרון אבטחה לעסק שלכם?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-50/90">
            צוות המומחים שלנו ישמח לבנות עבורכם מערכת מותאמת אישית.
          </p>
          <Link to="/contact" className="btn mt-6 bg-white text-brand-700 hover:bg-brand-50">
            לקבלת ייעוץ חינם
          </Link>
        </div>
      </section>
    </>
  )
}
