import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import ScrollReveal from '../../components/ScrollReveal'

const heartRateData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  bpm: 62 + Math.sin(i / 3) * 12 + Math.random() * 6,
}))

const spo2Data = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  spo2: 95 + Math.sin(i / 4) * 3 + Math.random() * 1.5,
}))

const sleepData = [
  { stage: 'Deep', hours: 2.3, color: '#3B82F6' },
  { stage: 'Light', hours: 3.8, color: '#60A5FA' },
  { stage: 'REM', hours: 1.7, color: '#93C5FD' },
  { stage: 'Awake', hours: 0.4, color: 'rgba(255,255,255,0.15)' },
]

const gpsPoints = [
  { x: 200, y: 120 }, { x: 230, y: 100 }, { x: 260, y: 130 },
  { x: 290, y: 110 }, { x: 320, y: 140 }, { x: 310, y: 170 },
  { x: 340, y: 160 }, { x: 370, y: 190 }, { x: 400, y: 170 },
  { x: 430, y: 150 }, { x: 460, y: 180 }, { x: 490, y: 140 },
]

const chartVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null
  return (
    <div className="glass rounded-xl px-4 py-2.5 text-xs">
      <p className="text-text-dim mb-0.5">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-white font-medium">{p.value}{p.name === 'bpm' ? ' BPM' : '%'}</p>
      ))}
    </div>
  )
}

export default function DataDashboard() {
  return (
    <section id="dashboard" className="relative py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-20">
          <span className="text-xs tracking-[0.3em] text-text-dim uppercase">Health Data</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mt-4 mb-4 tracking-tight">
            Your Body in{' '}
            <span className="text-gradient">Numbers</span>
          </h2>
          <p className="text-text-muted max-w-xl mx-auto leading-relaxed">
            Real-time biometric data visualized with precision. Every data point tells a story.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Heart Rate */}
          <motion.div
            custom={0}
            variants={chartVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <h3 className="text-sm font-semibold tracking-wide">Heart Rate</h3>
            </div>
            <div className="flex items-end gap-2 mb-6">
              <span className="text-3xl font-light">78</span>
              <span className="text-text-dim text-sm mb-1">BPM avg</span>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={heartRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="time" hide />
                <YAxis hide domain={[50, 90]} />
                <Tooltip content={<ChartTooltip />} />
                <Line
                  type="monotone"
                  dataKey="bpm"
                  stroke="#F87171"
                  strokeWidth={2}
                  dot={false}
                  animationDuration={2000}
                  animationEasing="ease"
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* SpO2 */}
          <motion.div
            custom={1}
            variants={chartVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <h3 className="text-sm font-semibold tracking-wide">Blood Oxygen</h3>
            </div>
            <div className="flex items-end gap-2 mb-6">
              <span className="text-3xl font-light">98</span>
              <span className="text-text-dim text-sm mb-1">% SpO2</span>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={spo2Data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="time" hide />
                <YAxis hide domain={[92, 100]} />
                <Tooltip content={<ChartTooltip />} />
                <Area
                  type="monotone"
                  dataKey="spo2"
                  stroke="#60A5FA"
                  fill="rgba(59,130,246,0.1)"
                  strokeWidth={2}
                  animationDuration={2000}
                  animationEasing="ease"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Sleep */}
          <motion.div
            custom={2}
            variants={chartVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-violet-400" />
              <h3 className="text-sm font-semibold tracking-wide">Sleep Analysis</h3>
            </div>
            <div className="flex items-end gap-2 mb-6">
              <span className="text-3xl font-light">8.2</span>
              <span className="text-text-dim text-sm mb-1">hours</span>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={sleepData} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="stage" hide />
                <YAxis hide />
                <Tooltip content={<ChartTooltip />} />
                <Bar
                  dataKey="hours"
                  fill="#8B5CF6"
                  radius={[6, 6, 0, 0]}
                  animationDuration={2000}
                  animationEasing="ease"
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* GPS Map */}
          <motion.div
            custom={3}
            variants={chartVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <h3 className="text-sm font-semibold tracking-wide">GPS Tracking</h3>
            </div>
            <div className="flex items-end gap-2 mb-6">
              <span className="text-3xl font-light">5.2</span>
              <span className="text-text-dim text-sm mb-1">km today</span>
            </div>
            {/* Stylized map */}
            <div className="relative w-full h-40 rounded-xl bg-[#0A0A0F] border border-white/5 overflow-hidden">
              {/* Grid lines */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
                {Array.from({ length: 8 }, (_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 25 + '%'} x2="100%" y2={i * 25 + '%'} stroke="white" />
                ))}
                {Array.from({ length: 10 }, (_, i) => (
                  <line key={`v${i}`} x1={i * 10 + '%'} y1="0" x2={i * 10 + '%'} y2="100%" stroke="white" />
                ))}
              </svg>
              {/* Route path */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 200">
                <path
                  d="M200,120 Q230,100 260,130 T320,140 T370,190 T430,150 T490,140"
                  fill="none"
                  stroke="#34D399"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="1000"
                  strokeDashoffset="1000"
                  opacity="0.8"
                >
                  <animate attributeName="stroke-dashoffset" from="1000" to="0" dur="2s" fill="freeze" begin="0.5s" />
                </path>
                {/* Start point */}
                <circle cx="200" cy="120" r="5" fill="#34D399">
                  <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" />
                </circle>
                {/* End point */}
                <circle cx="490" cy="140" r="5" fill="#34D399" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
