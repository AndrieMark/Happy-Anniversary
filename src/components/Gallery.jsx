import React from "react";
import { motion } from "framer-motion";

export default function Gallery({ images }) {
  // ✅ Guard: always convert to array
  const safeImages = Array.isArray(images) ? images : [];

  if (safeImages.length === 0) {
    return (
      <div className="text-center text-rose-600 font-medium py-6">
        No photos to show 📷
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {safeImages.map((src, i) => (
        <motion.div
          key={`${i}-${src || "img"}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-2xl overflow-hidden shadow-lg bg-gray-100"
        >
          <img
            src={src}
            alt={`memory-${i + 1}`}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/photos/placeholder.png"; // fallback
            }}
            className="w-full h-48 sm:h-56 md:h-64 object-cover"
          />
        </motion.div>
      ))}
    </div>
  );
}
