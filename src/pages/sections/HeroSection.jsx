import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Smartphone } from 'lucide-react'
import ParticleBackground from '../../components/ParticleBackground'

const titleWords = 'Redefining Smart Wearable Technology'.split(' ')

function scrollTo(id) {
  const el = document.querySelector(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function HeroSection() {
  const watchRef = useRef(null)

  const handleMouseMove = (e) => {
    const el = watchRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1000px) rotateY(${x * 25}deg) rotateX(${-y * 15}deg) translateZ(20px)`
  }

  const handleMouseLeave = () => {
    const el = watchRef.current
    if (el) el.style.transform = 'perspective(1000px) rotateY(15deg) rotateX(-5deg) translateZ(0px)'
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <ParticleBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-24">
          {/* Left: Text */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface mb-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-xs tracking-widest text-text-muted uppercase">
                  Next Generation Smartwatch
                </span>
              </motion.div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.08] tracking-tight mb-6">
                {titleWords.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.5 + i * 0.08,
                      duration: 0.7,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="inline-block mr-[0.25em] text-gradient"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="text-lg text-text-muted max-w-md mx-auto lg:mx-0 mb-10 leading-relaxed"
              >
                智能联网 &middot; 健康监测 &middot; GPS定位 &middot; 实时数据同步
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <button
                  onClick={() => scrollTo('#product')}
                  className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                >
                  Explore Product
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </button>
                <button
                  onClick={() => scrollTo('#app')}
                  className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/20 text-white font-medium text-sm hover:bg-white/5 hover:border-white/30 transition-all duration-300"
                >
                  <Smartphone className="w-4 h-4" />
                  Download APP
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Smartwatch */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center justify-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              ref={watchRef}
              className="relative transition-transform duration-200 ease-out"
              style={{ transform: 'perspective(1000px) rotateY(15deg) rotateX(-5deg)' }}
            >
              {/* Smartwatch CSS illustration */}
              <div className="relative w-72 h-80 sm:w-80 sm:h-96">
                {/* Ambient glow */}
                <div className="absolute inset-0 rounded-[3rem] bg-accent/10 blur-3xl scale-125" />

                {/* Watch body */}
                <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-[#1a1a2e] to-[#0d0d1a] border border-white/10 overflow-hidden shadow-2xl shadow-black/50">
                  {/* Screen area */}
                  <div className="absolute inset-3 rounded-[2.5rem] bg-gradient-to-br from-[#0A0A1A] to-[#050510] overflow-hidden">
                    {/* Screen content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      {/* Time display */}
                      <div className="text-white/90 text-4xl font-light tracking-widest mb-2">
                        12:38
                      </div>
                      <div className="text-text-dim text-xs tracking-[0.3em] mb-6">
                        MON 25 MAY
                      </div>

                      {/* Heart rate ring */}
                      <div className="relative w-24 h-24 mb-4">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50" cy="50" r="42"
                            fill="none"
                            stroke="rgba(255,255,255,0.06)"
                            strokeWidth="3"
                          />
                          <motion.circle
                            cx="50" cy="50" r="42"
                            fill="none"
                            stroke="#3B82F6"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray="264"
                            initial={{ strokeDashoffset: 264 }}
                            animate={{ strokeDashoffset: 52 }}
                            transition={{ delay: 1.8, duration: 2, ease: 'easeInOut' }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-white text-lg font-medium">78</span>
                          <span className="text-text-dim text-[10px]">BPM</span>
                        </div>
                      </div>

                      {/* Steps */}
                      <div className="text-text-dim text-[10px] tracking-widest">
                        8,432 STEPS
                      </div>
                    </div>

                    {/* Glass reflection */}
                    <div className="absolute top-0 left-2 right-2 h-1/3 rounded-b-[2rem] bg-gradient-to-b from-white/8 to-transparent" />
                  </div>

                  {/* Side button */}
                  <div className="absolute right-0 top-1/3 w-1.5 h-10 bg-white/15 rounded-l-sm -mr-0.5" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.4em] text-text-dim uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-text-dim" />
        </motion.div>
      </motion.div>
    </section>
  )
}
