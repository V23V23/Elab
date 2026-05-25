import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="relative py-40 bg-black overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-accent/5 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 tracking-tight">
            Ready to experience{' '}
            <span className="text-gradient">the future</span>?
          </h2>
          <p className="text-text-muted mb-10 max-w-md mx-auto leading-relaxed">
            Join our early access program and be the first to know about new products, features, and releases.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
            <div className="flex-1 glass rounded-full px-5 py-3.5 flex items-center gap-3 focus-within:border-white/20 transition-all">
              <Mail className="w-4 h-4 text-text-dim flex-shrink-0" />
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent text-white text-sm w-full outline-none placeholder:text-text-dim"
              />
            </div>
            <button className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-all duration-300 group">
              Subscribe
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <p className="text-xs text-text-dim">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
