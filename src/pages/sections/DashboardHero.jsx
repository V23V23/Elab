import { motion } from 'framer-motion'
import { Smartphone, BatteryFull, Wifi, Cloud, RefreshCw, Cpu } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function DashboardHero() {
  const { user } = useAuth()
  const username = user?.user_metadata?.username || user?.email?.split('@')[0] || 'User'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="grid lg:grid-cols-2 gap-6 mb-8"
    >
      {/* Welcome */}
      <div className="glass rounded-2xl p-8 flex flex-col justify-between">
        <div>
          <span className="text-xs tracking-[0.3em] text-text-dim uppercase">Dashboard</span>
          <h1 className="text-2xl sm:text-3xl font-semibold mt-3 mb-2 tracking-tight">
            Welcome back,{' '}
            <span className="text-gradient">{username}</span>
          </h1>
          <p className="text-text-muted text-sm leading-relaxed">
            Your smart wearable device is connected and syncing data in real time.
          </p>
        </div>

        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-text-dim">Online</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-3 h-3 text-text-dim" />
            <span className="text-xs text-text-dim">Synced 2 min ago</span>
          </div>
        </div>
      </div>

      {/* Device Card */}
      <div className="glass rounded-2xl p-8 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-accent/5 blur-3xl" />

        <div className="relative z-10 flex items-start justify-between mb-6">
          <div>
            <span className="text-xs tracking-[0.3em] text-text-dim uppercase">Device</span>
            <h3 className="text-lg font-semibold mt-1">SmartWatch Pro X</h3>
            <p className="text-text-dim text-xs mt-1">Firmware v3.2.1</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
            <Smartphone className="w-6 h-6 text-accent" />
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { icon: BatteryFull, label: 'Battery', value: '87%', color: 'text-emerald-400' },
            { icon: Wifi, label: 'Signal', value: 'Strong', color: 'text-blue-400' },
            { icon: Cloud, label: 'Cloud', value: 'Synced', color: 'text-accent' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className={`w-4 h-4 ${stat.color} mx-auto mb-1.5`} />
              <div className="text-white text-sm font-semibold">{stat.value}</div>
              <div className="text-text-dim text-[10px]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
