import { useState, Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wifi, TrendingUp, MapPin, Bell, Cloud, Shield } from 'lucide-react'
import ScrollReveal from '../../components/ScrollReveal'

const screens = [
  {
    id: 'sync',
    title: 'Data Sync',
    icon: Wifi,
    color: 'text-blue-400',
    content: (
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-400/10 flex items-center justify-center">
            <Wifi className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <div className="text-white text-xs font-medium">Connected</div>
            <div className="text-text-dim text-[10px]">BLE 5.3 &middot; 2ms latency</div>
          </div>
        </div>
        {['Heart Rate', 'Blood Oxygen', 'Steps', 'Sleep'].map((label) => (
          <div key={label} className="flex items-center justify-between">
            <span className="text-[10px] text-text-dim">{label}</span>
            <div className="flex items-center gap-1.5">
              <div className="w-16 h-1 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-blue-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${60 + Math.random() * 40}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
              <span className="text-[10px] text-text-dim">Synced</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'health',
    title: 'Health Stats',
    icon: TrendingUp,
    color: 'text-emerald-400',
    content: (
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-text-dim">Today</span>
          <span className="text-[10px] text-accent">+12% vs avg</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Steps', value: '8,432', unit: 'steps' },
            { label: 'Calories', value: '1,240', unit: 'kcal' },
            { label: 'Distance', value: '5.2', unit: 'km' },
            { label: 'Active', value: '2.4', unit: 'hours' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-xl p-3"
            >
              <div className="text-text-dim text-[10px] mb-1">{stat.label}</div>
              <div className="text-white text-sm font-semibold">{stat.value}</div>
              <div className="text-text-dim text-[10px]">{stat.unit}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gps',
    title: 'GPS Track',
    icon: MapPin,
    color: 'text-amber-400',
    content: (
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-text-dim">Morning Run</span>
          <span className="text-[10px] text-amber-400">5.2 km</span>
        </div>
        <div className="relative w-full h-28 rounded-xl bg-[#0A0A0F] border border-white/5 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
            {Array.from({ length: 6 }, (_, i) => (
              <Fragment key={i}>
                <line x1="0" y1={`${i * 20}%`} x2="100%" y2={`${i * 20}%`} stroke="white" />
                <line x1={`${i * 20}%`} y1="0" x2={`${i * 20}%`} y2="100%" stroke="white" />
              </Fragment>
            ))}
          </svg>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 112">
            <path
              d="M20,80 Q60,40 100,60 T180,30 T260,50 T280,20"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.8"
            />
            <circle cx="20" cy="80" r="4" fill="#F59E0B" />
            <circle cx="280" cy="20" r="4" fill="#F59E0B" />
          </svg>
          <div className="absolute bottom-2 left-2 text-[10px] text-text-dim">
            08:00 &mdash; 08:32 &middot; 5:12/km
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: Bell,
    color: 'text-rose-400',
    content: (
      <div className="flex flex-col gap-2 p-4">
        {[
          { title: 'Abnormal Heart Rate', time: '2 min ago', urgent: true },
          { title: 'Daily Goal Achieved', time: '1 hour ago' },
          { title: 'New Firmware Available', time: '3 hours ago' },
          { title: 'Weekly Health Report', time: 'Yesterday' },
        ].map((notif, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${notif.urgent ? 'bg-rose-400' : 'bg-white/20'}`} />
            <div>
              <div className="text-[10px] text-white/80">{notif.title}</div>
              <div className="text-[10px] text-text-dim">{notif.time}</div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
]


export default function AppIntegration() {
  const [activeScreen, setActiveScreen] = useState(0)

  return (
    <section id="app" className="relative py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-20">
          <span className="text-xs tracking-[0.3em] text-text-dim uppercase">App Ecosystem</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mt-4 mb-4 tracking-tight">
            Your Phone,{' '}
            <span className="text-gradient">Your Command Center</span>
          </h2>
          <p className="text-text-muted max-w-xl mx-auto leading-relaxed">
            Seamless integration between your smartwatch and smartphone. Data flows where you need it.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Phone mockup */}
          <ScrollReveal className="flex justify-center">
            <div className="relative">
              {/* Phone frame */}
              <div className="w-64 h-[32rem] rounded-[2.5rem] bg-[#0A0A0F] border-2 border-white/10 p-2.5 shadow-2xl shadow-black/50 relative overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-10" />
                {/* Screen */}
                <div className="w-full h-full rounded-[2rem] bg-gradient-to-b from-[#050510] to-[#0A0A12] overflow-hidden pt-8">
                  {/* Status bar */}
                  <div className="flex justify-between items-center px-5 py-2">
                    <span className="text-[10px] text-text-dim">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full border border-text-dim/30" />
                      <div className="w-3 h-3 rounded-full border border-text-dim/30" />
                      <div className="w-3 h-3 rounded-full border border-text-dim/30" />
                    </div>
                  </div>
                  {/* App header */}
                  <div className="px-5 py-3">
                    <div className="text-xs font-semibold tracking-wide">{screens[activeScreen].title}</div>
                  </div>
                  {/* Screen content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeScreen}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {screens[activeScreen].content}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Feature list */}
          <div>
            <ScrollReveal>
              <div className="space-y-2">
                {screens.map((screen, i) => (
                  <button
                    key={screen.id}
                    onClick={() => setActiveScreen(i)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group ${
                      activeScreen === i
                        ? 'border-white/15 bg-white/5'
                        : 'border-transparent hover:border-white/5 hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        activeScreen === i ? 'bg-white/10' : 'bg-white/5'
                      }`}>
                        <screen.icon className={`w-4 h-4 ${screen.color}`} />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{screen.title}</div>
                        <div className="text-xs text-text-dim mt-0.5">
                          {i === 0 && 'Real-time BLE sync'}
                          {i === 1 && 'Daily & weekly trends'}
                          {i === 2 && 'Route tracking & stats'}
                          {i === 3 && 'Smart alert filtering'}
                        </div>
                      </div>
                      {activeScreen === i && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="ml-auto w-1.5 h-1.5 rounded-full bg-accent"
                        />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-6 pt-6 border-t border-border">
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-text-dim" />
                  <span className="text-xs text-text-dim">End-to-end encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cloud className="w-3.5 h-3.5 text-text-dim" />
                  <span className="text-xs text-text-dim">Cloud backup</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
