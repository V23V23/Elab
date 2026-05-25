import { motion } from 'framer-motion'
import {
  Heart, Droplets, MapPin, Wifi,
  Smartphone, Cloud, BatteryFull, Bell
} from 'lucide-react'
import ScrollReveal from '../../components/ScrollReveal'

const features = [
  {
    icon: Heart,
    title: 'Heart Rate Monitoring',
    description: 'Real-time 24/7 heart rate tracking with medical-grade optical sensors and intelligent anomaly detection.',
    color: 'text-red-400',
    glow: 'rgba(248, 113, 113, 0.1)',
  },
  {
    icon: Droplets,
    title: 'Blood Oxygen Detection',
    description: 'SpO2 blood oxygen saturation monitoring with infrared spectroscopy for precise health insights.',
    color: 'text-blue-400',
    glow: 'rgba(96, 165, 250, 0.1)',
  },
  {
    icon: MapPin,
    title: 'GPS Navigation',
    description: 'Dual-band GPS + BeiDou positioning with real-time route tracking and geofencing capabilities.',
    color: 'text-emerald-400',
    glow: 'rgba(52, 211, 153, 0.1)',
  },
  {
    icon: Wifi,
    title: 'WiFi / Bluetooth Mesh',
    description: 'Seamless connectivity with WiFi 6 and Bluetooth 5.3 for low-latency data transmission and mesh networking.',
    color: 'text-violet-400',
    glow: 'rgba(167, 139, 250, 0.1)',
  },
  {
    icon: Smartphone,
    title: 'App Data Sync',
    description: 'Instant synchronization with iOS and Android companion app for comprehensive health analytics.',
    color: 'text-amber-400',
    glow: 'rgba(251, 191, 36, 0.1)',
  },
  {
    icon: Cloud,
    title: 'Cloud Health Records',
    description: 'Encrypted end-to-end cloud storage with AI-powered health trend analysis and predictive alerts.',
    color: 'text-cyan-400',
    glow: 'rgba(34, 211, 238, 0.1)',
  },
  {
    icon: BatteryFull,
    title: 'Extended Battery Life',
    description: 'Ultra-efficient 14-day battery life with custom low-power chipset and adaptive refresh technology.',
    color: 'text-lime-400',
    glow: 'rgba(163, 230, 53, 0.1)',
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description: 'Intelligent notification filtering with priority alerts for calls, messages, and health warnings.',
    color: 'text-rose-400',
    glow: 'rgba(251, 113, 133, 0.1)',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <ScrollReveal className="text-center mb-20">
          <span className="text-xs tracking-[0.3em] text-text-dim uppercase">Features</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mt-4 mb-4 tracking-tight">
            Engineered for{' '}
            <span className="text-gradient">Precision</span>
          </h2>
          <p className="text-text-muted max-w-xl mx-auto leading-relaxed">
            Every sensor, every connection, every line of code — meticulously designed for uncompromising performance.
          </p>
        </ScrollReveal>

        {/* Feature grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group glass rounded-2xl p-6 hover:glass-hover transition-all duration-500 cursor-default"
              style={{
                '--glow-color': feature.glow,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110"
                style={{ background: feature.glow }}
              >
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
              </div>
              <h3 className="text-sm font-semibold mb-2 tracking-wide text-white/90 group-hover:text-white transition-colors">
                {feature.title}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
