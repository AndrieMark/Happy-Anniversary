import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import HeartField from "./components/HeartField.jsx";
import Fireworks from "./components/Fireworks.jsx";
import Gallery from "./components/Gallery.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";
import Modal from "./components/Modal.jsx";
import PuzzleGame from "./components/PuzzleGame.jsx";

export default function App() {
  const [revealed, setRevealed] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  // Passcode states
  const [enteredCode, setEnteredCode] = useState("");
  const [phase, setPhase] = useState("lock"); // "lock" | "unlocked"

  const correctCode = "143";

  const handleUnlock = () => {
    if (enteredCode === correctCode) {
      setPhase("unlocked"); // sabay na mag show app + doors
    } else {
      alert("❌ Wrong passcode! Try again.");
    }
  };

  const images = [
    "/Happy-Anniversary/photos/puzzle-sample.jpg",
    "/Happy-Anniversary/photos/puzzle-sample.jpg",
    "/Happy-Anniversary/photos/puzzle-sample.jpg",
  ];

  // 🔑 Passcode screen
  if (phase === "lock") {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-400 via-rose-300 to-red-200 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-white drop-shadow mb-6">
          🔒 Enter Passcode
        </h1>
        <input
          type="password"
          value={enteredCode}
          onChange={(e) => setEnteredCode(e.target.value)}
          placeholder="Enter code..."
          className="px-4 py-2 rounded-lg border border-pink-300 text-center"
        />
        <button
          onClick={handleUnlock}
          className="mt-4 px-6 py-2 rounded-2xl bg-white/90 text-rose-600 font-semibold shadow hover:scale-105 transition"
        >
          Unlock 💝
        </button>
      </div>
    );
  }

  // 🎉 Main Anniversary App (with doors + fireworks)
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative min-h-screen w-full bg-gradient-to-br from-pink-400 via-rose-300 to-red-200 flex flex-col overflow-hidden px-4 sm:px-6">
        <MusicPlayer />
        <HeartField />
        <Fireworks trigger={true} />

        {/* 🚪 Doors animation (overlay sa taas, sabay sa app) */}
        <AnimatePresence>
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 2 }}
            className="absolute top-0 left-0 w-1/2 h-full bg-pink-500 shadow-2xl z-50"
          />
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "100%" }}
            transition={{ duration: 2 }}
            className="absolute top-0 right-0 w-1/2 h-full bg-pink-500 shadow-2xl z-50"
          />
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center items-center text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="text-white text-3xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]"
          >
            ❤️ Happy Anniversary ❤️
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-white/95 text-sm sm:text-lg md:text-2xl mt-4 max-w-md sm:max-w-2xl drop-shadow-[0_0_10px_rgba(255,200,200,0.9)]"
          >
            Every moment with you is a beautiful memory. Thank you for being my
            favorite adventure. 💕
          </motion.p>

          <div className="mt-6 sm:mt-8">
            <button
              onClick={() => setRevealed(true)}
              disabled={revealed}
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-2xl bg-white/90 text-rose-600 font-semibold shadow-xl hover:shadow-2xl hover:scale-[1.05] transition disabled:opacity-60 text-sm sm:text-base"
            >
              {revealed ? "Surprise Unlocked ✨" : "Click for more Surprise 💝"}
            </button>
          </div>

          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-6 sm:mt-8 w-full space-y-6"
              >
                {/* Love Letter */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-md sm:max-w-2xl mx-auto bg-white/90 backdrop-blur rounded-3xl p-4 sm:p-6 shadow-2xl drop-shadow-[0_0_25px_rgba(255,150,150,0.7)]"
                >
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-rose-700 animate-pulse">
                    To My Love 💌
                  </h2>
                  <p className="mt-3 text-rose-700/90 leading-relaxed text-sm sm:text-base">
                    You are my today and all of my tomorrows. Here's to our past,
                    present, and every dream we chase together. I love you—now and
                    always.
                  </p>
                </motion.div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
                  <div
                    onClick={() => setActiveModal("memory")}
                    className="cursor-pointer bg-pink-100 rounded-2xl shadow-lg p-4 sm:p-6 hover:scale-[1.02] transition"
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-rose-700">
                      💭 Memory Together
                    </h3>
                    <p className="text-rose-700/80 mt-2 text-sm sm:text-base">
                      Click to see a sweet memory 💖
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveModal("puzzle")}
                    className="cursor-pointer bg-rose-100 rounded-2xl shadow-lg p-4 sm:p-6 hover:scale-[1.02] transition"
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-rose-700">
                      🧩 Puzzle
                    </h3>
                    <p className="text-rose-700/80 mt-2 text-sm sm:text-base">
                      Click to open puzzle surprise 💕
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveModal("song")}
                    className="cursor-pointer bg-red-100 rounded-2xl shadow-lg p-4 sm:p-6 hover:scale-[1.02] transition"
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-rose-700">
                      🎶 Our Song
                    </h3>
                    <p className="text-rose-700/80 mt-2 text-sm sm:text-base">
                      Click to listen 🎵
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveModal("photos")}
                    className="cursor-pointer bg-orange-100 rounded-2xl shadow-lg p-4 sm:p-6 hover:scale-[1.02] transition"
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-rose-700">
                      📸 Hidden Photos
                    </h3>
                    <p className="text-rose-700/80 mt-2 text-sm sm:text-base">
                      Click to reveal 📷
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Modals */}
        <Modal
          isOpen={activeModal === "memory"}
          onClose={() => setActiveModal(null)}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-rose-600">
            💭 Memory Together
          </h2>
          <p className="mt-3 text-rose-700 text-sm sm:text-base">
            Remember our first trip? Every moment is my favorite memory with you 💕
          </p>
          <img
            src="/photos/photo1.png"
            alt="memory"
            className="mt-4 rounded-xl shadow max-w-full h-auto"
          />
        </Modal>

        <Modal
          isOpen={activeModal === "puzzle"}
          onClose={() => setActiveModal(null)}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-rose-600 mb-4">
            🧩 Puzzle
          </h2>
          <PuzzleGame image="/Happy-Anniversary/photos/puzzle-sample.jpg" />
        </Modal>

        <Modal
          isOpen={activeModal === "song"}
          onClose={() => setActiveModal(null)}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-rose-600">
            🎶 Our Song
          </h2>
          <audio controls autoPlay className="mt-3 w-full">
            <source src="/Happy-Anniversary/music/romantic.mp3" type="audio/mpeg" />
          </audio>
        </Modal>

        <Modal
          isOpen={activeModal === "photos"}
          onClose={() => setActiveModal(null)}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-rose-600">
            📸 Hidden Photos
          </h2>
          <Gallery images={images || []} />
        </Modal>

        <footer className="text-white/80 text-xs sm:text-sm py-4 text-center relative z-10">
          Made with ❤️ just for you
        </footer>
      </div>
    </DndProvider>
  );
}
