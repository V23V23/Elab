import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import DashboardHero from './sections/DashboardHero'
import HealthStats from './sections/HealthStats'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) navigate('/')
  }, [user, loading, navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-text-dim text-sm">Redirecting...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <DashboardHero />
        <HealthStats />
      </div>
    </div>
  )
}
