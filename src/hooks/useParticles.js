import { useEffect, useRef } from 'react'

export default function useParticles(canvasRef, { count = 80, speed = 0.3 } = {}) {
  const particlesRef = useRef([])
  const animRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let w, h

    const resize = () => {
      w = canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1)
      h = canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1)
    }

    const createParticles = () => {
      const particles = []
      const isMobile = window.innerWidth < 768
      const n = isMobile ? Math.floor(count * 0.4) : count
      for (let i = 0; i < n; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
        })
      }
      particlesRef.current = particles
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h)
      const particles = particlesRef.current
      const mx = mouseRef.current.x * w
      const my = mouseRef.current.y * h

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Move toward mouse slightly
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          p.vx += (dx / dist) * 0.02
          p.vy += (dy / dist) * 0.02
        }

        p.vx *= 0.999
        p.vy *= 0.999
        p.x += p.vx
        p.y += p.vy

        // Wrap
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10

        // Draw
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`
        ctx.fill()
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 * (1 - dist / 100)})`
            ctx.stroke()
          }
        }
      }

      animRef.current = requestAnimationFrame(animate)
    }

    resize()
    createParticles()
    animate()

    const onResize = () => {
      resize()
      createParticles()
    }
    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      }
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouse)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [canvasRef, count, speed])
}
