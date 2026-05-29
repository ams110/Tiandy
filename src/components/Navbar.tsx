import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { nav } from '../data/content'
import Logo from './Logo'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo variant="color" className="h-9 w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive ? 'text-brand-600' : 'text-slate-600 hover:text-brand-600'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link to="/contact" className="btn-primary">
            בקשת הצעת מחיר
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-slate-600 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="תפריט"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white md:hidden">
          <div className="container flex flex-col py-2">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-sm font-medium ${
                    isActive ? 'bg-brand-50 text-brand-600' : 'text-slate-700'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-2">
              בקשת הצעת מחיר
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
