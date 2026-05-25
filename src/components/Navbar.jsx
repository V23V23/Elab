import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Cpu } from 'lucide-react'

const navLinks = [
  { name: 'Features', href: '#features' },
  { name: 'Product', href: '#product' },
  { name: 'Data', href: '#dashboard' },
  { name: 'App', href: '#app' },
  { name: 'About', href: '#about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
            <Cpu className="w-4 h-4 text-accent" />
          </div>
          <span className="text-sm font-semibold tracking-widest text-white/90 group-hover:text-white transition-colors">
            XXX ELECTRONIC LAB
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm text-text-muted hover:text-white transition-colors duration-300 tracking-wide"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#product"
            className="text-sm px-5 py-2 rounded-full border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all duration-300 tracking-wide"
          >
            Explore
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/80 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass mt-3 mx-4 rounded-2xl p-6 animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-text-muted hover:text-white transition-colors text-sm tracking-wide"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#product"
            onClick={() => setMobileOpen(false)}
            className="block mt-4 text-center py-2.5 rounded-full border border-white/15 hover:border-white/30 transition-all text-sm"
          >
            Explore Product
          </a>
        </div>
      )}
    </nav>
  )
}
