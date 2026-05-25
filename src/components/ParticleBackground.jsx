import { useRef } from 'react'
import useParticles from '../hooks/useParticles'

export default function ParticleBackground() {
  const canvasRef = useRef(null)
  useParticles(canvasRef, { count: 80, speed: 0.3 })

  return (
    <>
      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-blue-500/3 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent/3 blur-[100px]" />
      </div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </>
  )
}
