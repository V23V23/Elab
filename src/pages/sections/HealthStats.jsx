import { motion } from 'framer-motion'
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar,
} from 'recharts'
import { Heart, Droplets, Moon, Footprints } from 'lucide-react'

const heartData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  value: 62 + Math.sin(i / 3) * 10 + Math.random() * 4,
}))

const spo2Data = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  value: 95 + Math.sin(i / 4) * 2.5 + Math.random() * 1.2,
}))

const sleepData = [
  { stage: 'Deep', hours: 2.1, fill: '#3B82F6' },
  { stage: 'Light', hours: 4.0, fill: '#60A5FA' },
  { stage: 'REM', hours: 1.5, fill: '#93C5FD' },
  { stage: 'Awake', hours: 0.6, fill: 'rgba(255,255,255,0.12)' },
]

const stepsData = [{ name: 'steps', value: 78, fill: '#3B82F6' }]

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="glass rounded-xl px-4 py-2.5 text-xs">
      <p className="text-text-dim mb-0.5">{label || payload[0].name}</p>
      <p className="text-white font-medium">{Math.round(payload[0].value * 10) / 10}{payload[0].name === 'hours' ? 'h' : ''}</p>
    </div>
  )
}

const cards = [
  {
    icon: Heart,
    color: 'text-red-400',
    bg: 'rgba(248,113,113,0.08)',
    label: 'Heart Rate',
    value: '78',
    unit: 'BPM',
    sub: 'Resting · 62 BPM',
    chart: (
      <ResponsiveContainer width="100%" height={140}>
        <LineChart data={heartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
          <XAxis dataKey="time" hide />
          <YAxis hide domain={[50, 85]} />
          <Tooltip content={<ChartTooltip />} />
          <Line type="monotone" dataKey="value" stroke="#F87171" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    ),
  },
  {
    icon: Droplets,
    color: 'text-blue-400',
    bg: 'rgba(96,165,250,0.08)',
    label: 'Blood Oxygen',
    value: '98',
    unit: '% SpO2',
    sub: 'Avg 24h · Healthy',
    chart: (
      <ResponsiveContainer width="100%" height={140}>
        <AreaChart data={spo2Data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
          <XAxis dataKey="time" hide />
          <YAxis hide domain={[92, 100]} />
          <Tooltip content={<ChartTooltip />} />
          <Area type="monotone" dataKey="value" stroke="#60A5FA" fill="rgba(59,130,246,0.08)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    ),
  },
  {
    icon: Moon,
    color: 'text-violet-400',
    bg: 'rgba(167,139,250,0.08)',
    label: 'Sleep',
    value: '7.5',
    unit: 'hours',
    sub: 'Quality · 92%',
    chart: (
      <ResponsiveContainer width="100%" height={140}>
        <BarChart data={sleepData} barSize={28}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
          <XAxis dataKey="stage" hide />
          <YAxis hide />
          <Tooltip content={<ChartTooltip />} />
          <Bar dataKey="hours" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    ),
  },
  {
    icon: Footprints,
    color: 'text-emerald-400',
    bg: 'rgba(52,211,153,0.08)',
    label: 'Steps Today',
    value: '8,432',
    unit: 'steps',
    sub: 'Goal · 10,000',
    chart: (
      <ResponsiveContainer width="100%" height={140}>
        <RadialBarChart
          innerRadius="80%"
          outerRadius="100%"
          data={stepsData}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar dataKey="value" fill="#34D399" cornerRadius={10} background={{ fill: 'rgba(255,255,255,0.04)' }} />
        </RadialBarChart>
      </ResponsiveContainer>
    ),
  },
]

export default function HealthStats() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: card.bg }}>
              <card.icon className={`w-4 h-4 ${card.color}`} />
            </div>
            <div>
              <div className="text-xs text-text-dim">{card.label}</div>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-xl font-semibold">{card.value}</span>
                <span className="text-[10px] text-text-dim">{card.unit}</span>
              </div>
            </div>
            <span className="ml-auto text-[10px] text-text-dim">{card.sub}</span>
          </div>
          {card.chart}
        </motion.div>
      ))}
    </div>
  )
}
