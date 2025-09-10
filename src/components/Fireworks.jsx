import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function Fireworks({ trigger }) {
  useEffect(() => {
    if (!trigger) return
    const duration = 2000
    const end = Date.now() + duration

    ;(function frame() {
      confetti({
        particleCount: 6,
        startVelocity: 40,
        spread: 360,
        origin: { x: Math.random(), y: Math.random() - 0.2 }
      })
      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    })()
  }, [trigger])

  return null
}
