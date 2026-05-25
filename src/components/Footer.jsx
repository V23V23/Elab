import { Cpu } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center">
              <Cpu className="w-3.5 h-3.5 text-accent" />
            </div>
            <span className="text-xs font-semibold tracking-widest text-text-muted">
              XXX ELECTRONIC LAB
            </span>
          </div>

          <div className="flex items-center gap-8">
            {['Privacy', 'Terms', 'Contact', 'GitHub'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-text-dim hover:text-text-muted transition-colors tracking-wide"
              >
                {item}
              </a>
            ))}
          </div>

          <p className="text-xs text-text-dim">
            &copy; {new Date().getFullYear()} XXX Electronic Lab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
