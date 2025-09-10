import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const togglePlay = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setPlaying(!playing)
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-white/70 backdrop-blur px-3 py-2 rounded-2xl shadow-lg cursor-pointer">
      <audio ref={audioRef} loop>
        <source src="/music/romantic.mp3" type="audio/mpeg" />
      </audio>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="text-rose-600"
      >
        {playing ? <Volume2 size={22} /> : <VolumeX size={22} />}
      </motion.button>
      <span className="text-sm font-medium text-rose-600">
        {playing ? "Playing..." : "Muted"}
      </span>
    </div>
  )
}
