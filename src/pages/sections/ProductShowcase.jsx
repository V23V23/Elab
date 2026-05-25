import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../../components/ScrollReveal'

const variants = [
  {
    id: 'black',
    name: 'Deep Space Black',
    bg: 'from-[#1a1a1a] to-[#0a0a0a]',
    frame: '#2a2a2a',
    accent: '#555',
    label: 'Deep Black',
  },
  {
    id: 'silver',
    name: 'Stellar Silver',
    bg: 'from-[#c0c0c0] to-[#8a8a8a]',
    frame: '#d0d0d0',
    accent: '#999',
    label: 'Silver',
  },
  {
    id: 'explorer',
    name: 'Transparent Explorer',
    bg: 'from-[#1a1a2e] to-[#0d0d1a]',
    frame: 'rgba(255,255,255,0.15)',
    accent: 'rgba(255,255,255,0.3)',
    label: 'Explorer',
  },
]

export default function ProductShowcase() {
  const [active, setActive] = useState(0)
  const [angle, setAngle] = useState(0)
  const containerRef = useRef(null)
  const v = variants[active]

  const handleMouseMove = (e) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1200px) rotateY(${x * 30 + angle}deg) rotateX(${-y * 20}deg)`
  }

  const handleMouseLeave = () => {
    const el = containerRef.current
    if (el) el.style.transform = `perspective(1200px) rotateY(${angle}deg) rotateX(-5deg)`
  }

  return (
    <section id="product" className="relative py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-20">
          <span className="text-xs tracking-[0.3em] text-text-dim uppercase">Product</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mt-4 mb-4 tracking-tight">
            Crafted to{' '}
            <span className="text-gradient">Perfection</span>
          </h2>
          <p className="text-text-muted max-w-xl mx-auto leading-relaxed">
            Three distinct finishes. One uncompromising vision.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Product viewer */}
          <div className="flex justify-center">
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative transition-transform duration-200 ease-out cursor-grab active:cursor-grabbing"
              style={{ transform: `perspective(1200px) rotateY(${angle}deg) rotateX(-5deg)` }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-72 h-80 sm:w-80 sm:h-96"
                >
                  {/* Ambient glow */}
                  <div
                    className="absolute inset-0 rounded-[3rem] blur-3xl scale-125 transition-colors duration-500"
                    style={{
                      background:
                        active === 0
                          ? 'rgba(100, 100, 120, 0.08)'
                          : active === 1
                          ? 'rgba(200, 200, 220, 0.1)'
                          : 'rgba(59, 130, 246, 0.1)',
                    }}
                  />

                  {/* Watch body */}
                  <div
                    className={`absolute inset-0 rounded-[3rem] bg-gradient-to-b ${v.bg} border transition-colors duration-500 overflow-hidden shadow-2xl shadow-black/50`}
                    style={{ borderColor: v.frame }}
                  >
                    {/* Screen */}
                    <div className="absolute inset-3 rounded-[2.5rem] bg-gradient-to-br from-[#0A0A1A] to-[#050510] overflow-hidden">
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-white/90 text-4xl font-light tracking-widest mb-2">
                          12:38
                        </div>
                        <div className="text-text-dim text-xs tracking-[0.3em] mb-4">MON 25 MAY</div>
                        <div className="relative w-20 h-20">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                            <circle
                              cx="50" cy="50" r="42"
                              fill="none" stroke="#3B82F6"
                              strokeWidth="3" strokeLinecap="round"
                              strokeDasharray="264" strokeDashoffset="52"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-white text-lg font-medium">78</span>
                            <span className="text-text-dim text-[10px]">BPM</span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-0 left-2 right-2 h-1/3 rounded-b-[2rem] bg-gradient-to-b from-white/8 to-transparent" />
                    </div>

                    {/* Side button */}
                    <div
                      className="absolute right-0 top-1/3 w-1.5 h-10 rounded-l-sm -mr-0.5 transition-colors duration-500"
                      style={{ background: v.accent }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div>
            <ScrollReveal>
              <h3 className="text-2xl font-semibold mb-2">{v.name}</h3>
              <p className="text-text-muted mb-8 leading-relaxed">
                {active === 0 && 'A classic finish that absorbs light. The Deep Space Black edition features a matte DLC coating for ultimate scratch resistance.'}
                {active === 1 && 'Precision-machined from aerospace-grade titanium with a brushed finish that catches light at every angle.'}
                {active === 2 && 'A window into the engineering within. The transparent case reveals the custom-designed PCB and sensor array.'}
              </p>

              {/* Color dots */}
              <div className="flex gap-4 mb-8">
                {variants.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      setActive(i)
                      setAngle(0)
                    }}
                    className={`relative w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                      active === i
                        ? 'border-white scale-110'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                    aria-label={v.label}
                  >
                    <span
                      className={`absolute inset-1.5 rounded-full bg-gradient-to-br ${v.bg}`}
                      style={v.id === 'explorer' ? { background: '#0d0d1a' } : {}}
                    />
                  </button>
                ))}
              </div>

              {/* Angle buttons */}
              <div className="flex gap-3">
                {[0, 30, 60, 90].map((deg) => (
                  <button
                    key={deg}
                    onClick={() => setAngle(deg)}
                    className={`px-4 py-2 rounded-full text-xs border transition-all duration-300 ${
                      angle === deg
                        ? 'border-white/40 bg-white/10 text-white'
                        : 'border-white/10 text-text-muted hover:border-white/20'
                    }`}
                  >
                    {deg}&deg;
                  </button>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
