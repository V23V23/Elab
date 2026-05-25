import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, Loader2, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function AuthModal({ isOpen, onClose }) {
  const { user, signIn, signUp, resetPassword } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')

  // Close modal and navigate home when user logs in successfully
  useEffect(() => {
    if (user && isOpen) {
      onClose()
      navigate('/')
    }
  }, [user])

  function clear() {
    setEmail('')
    setPassword('')
    setUsername('')
    setError('')
    setMsg('')
    setBusy(false)
  }

  function dismiss() {
    clear()
    setTab('signin')
    onClose()
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setMsg('')
    setBusy(true)

    try {
      if (tab === 'forgot') {
        await resetPassword(email)
        setMsg('Password reset link sent to your email.')
        setBusy(false)
        return
      }

      if (tab === 'signup') {
        if (!username.trim()) throw new Error('Username is required')
        if (password.length < 6) throw new Error('Password must be at least 6 characters')
        const result = await signUp(email, password, username)
        // If Supabase returned a session, user is auto-logged in (email confirm disabled)
        // The useEffect above will close the modal
        if (!result?.session) {
          setMsg('Account created! Check your email to verify.')
        }
        setBusy(false)
        return
      }

      // Sign in
      await signIn(email, password)
      // useEffect above handles closing when user state updates
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  function switchTab(t) {
    clear()
    setTab(t)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={dismiss} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-md glass rounded-2xl p-8 shadow-2xl shadow-black/50"
          >
            <button onClick={dismiss} className="absolute top-4 right-4 text-text-dim hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-accent/10 mb-4">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-xl font-semibold tracking-tight">
                {tab === 'signin' && 'Welcome Back'}
                {tab === 'signup' && 'Create Account'}
                {tab === 'forgot' && 'Reset Password'}
              </h2>
              <p className="text-text-dim text-sm mt-1.5">
                {tab === 'signin' && 'Sign in to sync your wearable data'}
                {tab === 'signup' && 'Join the smart wearable platform'}
                {tab === 'forgot' && "We'll send a reset link to your email"}
              </p>
            </div>

            {msg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-xl p-4 mb-6 border-accent/30 text-sm text-accent text-center"
              >
                {msg}
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 text-sm text-red-400 text-center"
              >
                {error}
              </motion.div>
            )}

            {!msg && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {tab === 'signup' && (
                  <div>
                    <label className="block text-xs text-text-dim mb-1.5 tracking-wide">Username</label>
                    <input
                      type="text" value={username}
                      onChange={e => setUsername(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-accent/50 focus:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300 placeholder:text-text-dim"
                      placeholder="Your username"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs text-text-dim mb-1.5 tracking-wide">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
                    <input
                      type="email" value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-10 pr-4 py-3 text-sm text-white outline-none focus:border-accent/50 focus:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300 placeholder:text-text-dim"
                      placeholder="you@example.com" required
                    />
                  </div>
                </div>

                {tab !== 'forgot' && (
                  <div>
                    <label className="block text-xs text-text-dim mb-1.5 tracking-wide">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
                      <input
                        type="password" value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-10 pr-4 py-3 text-sm text-white outline-none focus:border-accent/50 focus:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300 placeholder:text-text-dim"
                        placeholder="••••••••" required
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit" disabled={busy}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black font-medium text-sm hover:bg-white/90 transition-all duration-300 disabled:opacity-50"
                >
                  {busy && <Loader2 className="w-4 h-4 animate-spin" />}
                  {tab === 'signin' && 'Sign In'}
                  {tab === 'signup' && 'Create Account'}
                  {tab === 'forgot' && 'Send Reset Link'}
                </button>
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-border text-center space-y-2">
              {tab === 'signin' && (
                <>
                  <button onClick={() => switchTab('forgot')} className="block w-full text-xs text-text-dim hover:text-accent transition-colors">
                    Forgot your password?
                  </button>
                  <p className="text-xs text-text-dim">
                    Don&apos;t have an account?{' '}
                    <button onClick={() => switchTab('signup')} className="text-accent hover:text-blue-400 transition-colors">
                      Create one
                    </button>
                  </p>
                </>
              )}
              {tab === 'signup' && (
                <p className="text-xs text-text-dim">
                  Already have an account?{' '}
                  <button onClick={() => switchTab('signin')} className="text-accent hover:text-blue-400 transition-colors">
                    Sign in
                  </button>
                </p>
              )}
              {tab === 'forgot' && (
                <p className="text-xs text-text-dim">
                  Remember your password?{' '}
                  <button onClick={() => switchTab('signin')} className="text-accent hover:text-blue-400 transition-colors">
                    Sign in
                  </button>
                </p>
              )}
              <p className="text-[10px] text-text-dim mt-3">
                Sync your wearable data securely.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
