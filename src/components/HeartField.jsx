import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function HeartField() {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => [...prev, { 
        id: Date.now() + Math.random(), 
        left: Math.random() * 100, 
        size: 20 + Math.random()*40,
        rotate: Math.random() * 360 
      }])
      if (hearts.length > 50) setHearts(prev => prev.slice(-50))
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map(h => (
        <motion.div
          key={h.id}
          initial={{ y: '100vh', opacity: 0, rotate: h.rotate }}
          animate={{ y: '-10vh', opacity: [0, 1, 1, 0], rotate: h.rotate + 180 }}
          transition={{ duration: 8, ease: 'easeOut' }}
          className="absolute text-pink-500 drop-shadow-lg"
          style={{ left: `${h.left}%`, fontSize: `${h.size}px` }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  )
}
