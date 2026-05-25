import { Cpu, CircuitBoard, Microscope, Radio, CpuIcon } from 'lucide-react'
import ScrollReveal from '../../components/ScrollReveal'

const tags = [
  'Embedded Systems',
  'IoT',
  'Wearables',
  'AI Edge Computing',
  'PCB Design',
  'Firmware',
  'BLE / WiFi',
  'Sensor Fusion',
  'Low Power Design',
]

const galleryItems = [
  { icon: CircuitBoard, label: 'PCB Design', desc: 'Custom 4-layer PCB with precision routing' },
  { icon: Microscope, label: 'Lab Testing', desc: 'Oscilloscope signal integrity analysis' },
  { icon: Radio, label: 'RF Chamber', desc: 'Antenna tuning and wireless testing' },
  { icon: CpuIcon, label: 'Assembly', desc: 'Precision SMD component soldering' },
]

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-20">
          <span className="text-xs tracking-[0.3em] text-text-dim uppercase">About Us</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mt-4 mb-4 tracking-tight">
            Independent{' '}
            <span className="text-gradient">Engineering Studio</span>
          </h2>
          <p className="text-text-muted max-w-xl mx-auto leading-relaxed">
            We are a small, focused team of hardware engineers and software developers building the next generation of wearable technology.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
          {/* Intro */}
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-accent" />
              </div>
              <span className="text-sm font-semibold tracking-widest text-white/80">
                XXX ELECTRONIC LAB
              </span>
            </div>
            <p className="text-text-muted leading-relaxed mb-4">
              Founded by a team of passionate engineers, XXX Electronic Lab is an independent studio dedicated to pushing the boundaries of smart wearable technology. We combine expertise in embedded systems, IoT connectivity, and industrial design to create products that seamlessly integrate into daily life.
            </p>
            <p className="text-text-muted leading-relaxed">
              Our approach is rooted in first-principles engineering — every component, every sensor placement, every line of firmware is questioned and optimized. We believe technology should be invisible, powerful, and beautiful.
            </p>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '8+', label: 'Years Experience' },
                { value: '12', label: 'Team Members' },
                { value: '3', label: 'Active Products' },
                { value: '50K+', label: 'Units Shipped' },
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-2xl p-6 text-center">
                  <div className="text-2xl font-semibold text-gradient mb-1">{stat.value}</div>
                  <div className="text-xs text-text-dim">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Workbench gallery */}
        <ScrollReveal className="mb-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryItems.map((item) => (
              <div
                key={item.label}
                className="group glass rounded-2xl p-6 hover:glass-hover transition-all duration-500"
              >
                <div className="w-full aspect-[4/3] rounded-xl bg-[#0A0A0F] border border-white/5 flex items-center justify-center mb-4 overflow-hidden relative">
                  {/* Simulated dark engineering scene */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <item.icon className="w-8 h-8 text-text-dim group-hover:text-accent transition-colors duration-500" />
                    <div className="flex gap-1.5">
                      <div className="w-12 h-0.5 rounded-full bg-accent/40" />
                      <div className="w-1 h-0.5 rounded-full bg-accent/60 animate-pulse" />
                    </div>
                  </div>
                  {/* Subtle grid overlay */}
                  <div className="absolute inset-0 opacity-[0.02]"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                </div>
                <h4 className="text-xs font-semibold tracking-wide mb-1">{item.label}</h4>
                <p className="text-[11px] text-text-dim">{item.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Tech tags */}
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full border border-border text-xs text-text-muted hover:text-white hover:border-white/15 hover:bg-white/[0.02] transition-all duration-300 cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
