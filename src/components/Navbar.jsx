import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Cpu, User, LogOut, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import AuthModal from './AuthModal'

const navLinks = [
  { name: 'Features', id: '#features' },
  { name: 'Product', id: '#product' },
  { name: 'Data', id: '#dashboard' },
  { name: 'App', id: '#app' },
  { name: 'About', id: '#about' },
]

function scrollTo(id) {
  const el = document.querySelector(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass py-3' : 'bg-transparent py-5'
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
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.id)}
                className="text-sm text-text-muted hover:text-white transition-colors duration-300 tracking-wide"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Auth buttons — desktop */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1.5 text-sm text-text-muted hover:text-white transition-colors tracking-wide"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Dashboard
                </Link>
                <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/20 flex items-center justify-center text-xs font-medium text-accent">
                  {user.user_metadata?.username?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-sm text-text-dim hover:text-white transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="text-sm text-text-muted hover:text-white transition-colors duration-300 tracking-wide"
                >
                  Sign In
                </button>
                <Link
                  to="/register"
                  className="text-sm px-5 py-2 rounded-full border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all duration-300 tracking-wide"
                >
                  Create Account
                </Link>
              </>
            )}
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
          <div className="md:hidden glass mt-3 mx-4 rounded-2xl p-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => { scrollTo(link.id); setMobileOpen(false) }}
                className="block w-full text-left py-3 text-text-muted hover:text-white transition-colors text-sm tracking-wide"
              >
                {link.name}
              </button>
            ))}

            <div className="border-t border-border mt-3 pt-3 space-y-2">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 py-2 text-sm text-text-muted hover:text-white transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { handleSignOut(); setMobileOpen(false) }}
                    className="flex items-center gap-2 py-2 text-sm text-text-muted hover:text-white transition-colors w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { setAuthModalOpen(true); setMobileOpen(false) }}
                    className="block w-full text-left py-3 text-text-muted hover:text-white transition-colors text-sm tracking-wide"
                  >
                    Sign In
                  </button>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="block mt-2 text-center py-2.5 rounded-full border border-white/15 hover:border-white/30 transition-all text-sm"
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  )
}
