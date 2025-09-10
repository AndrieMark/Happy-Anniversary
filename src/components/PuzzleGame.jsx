import React, { useEffect, useMemo, useState } from "react";
import Confetti from "react-confetti";

// Shuffle utility
const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function PuzzleGame({ image, grid = 4 }) {
  const total = grid * grid;

  // ✅ Strict mobile/tablet detection only
  const isTouch =
    ("ontouchstart" in window || navigator.maxTouchPoints > 0) &&
    /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  // Generate ordered list of tile IDs
  const allTiles = useMemo(() => Array.from({ length: total }, (_, i) => i), [total]);

  const [placed, setPlaced] = useState(() => Array(total).fill(null));
  const [won, setWon] = useState(false);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const [selected, setSelected] = useState(null); // ✅ For tap-to-place mode

  // Update viewport size
  useEffect(() => {
    setViewport({ w: window.innerWidth, h: window.innerHeight });
    const onResize = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Reset puzzle when image/grid changes
  useEffect(() => {
    setPlaced(Array(total).fill(null));
    setWon(false);
    setSelected(null);
  }, [image, grid, total]);

  // Pool contains unplaced tiles
  const pool = useMemo(() => {
    const used = new Set(placed.filter((v) => v !== null));
    const remaining = allTiles.filter((id) => !used.has(id));
    return shuffle(remaining);
  }, [placed, allTiles]);

  const bgSize = `${grid * 100}% ${grid * 100}%`;

  // Get background position for a tile index
  const getPos = (id) => {
    const r = Math.floor(id / grid);
    const c = id % grid;
    return `${(c * 100) / (grid - 1)}% ${(r * 100) / (grid - 1)}%`;
  };

  // Move handler
  const move = ({ from, fromIndex = null, id }, toIndex = null) => {
    const next = [...placed];

    if (from === "board" && fromIndex !== null) {
      next[fromIndex] = null;
    }

    if (toIndex !== null) {
      if (next[toIndex] !== null) return; // avoid overwriting
      next[toIndex] = id;
    }

    setPlaced(next);
    setSelected(null);

    // ✅ Win check
    const solved = next.every((tile, index) => {
      if (tile === null) return false;
      return getPos(tile) === getPos(index);
    });

    setWon(solved);
  };

  // Drag helpers (desktop only)
  const setDragData = (e, payload) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(payload));
    e.dataTransfer.effectAllowed = "move";
  };

  const readDragData = (e) => {
    try {
      return JSON.parse(e.dataTransfer.getData("text/plain"));
    } catch {
      return null;
    }
  };

  const reset = () => {
    setPlaced(Array(total).fill(null));
    setWon(false);
    setSelected(null);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {won && <Confetti width={viewport.w} height={viewport.h} />}

      <h2 className="text-lg md:text-xl font-bold">🧩 Jigsaw Puzzle</h2>

      {/* reference image */}
      <img
        src={image}
        alt="reference"
        className="w-28 h-28 md:w-40 md:h-40 object-cover border rounded shadow"
      />

      {/* pool */}
      <div
        className="flex flex-wrap justify-center gap-2 border p-2 rounded-md bg-white shadow min-h-[72px] w-full md:w-auto"
        onDragOver={!isTouch ? (e) => e.preventDefault() : undefined}
        onDrop={
          !isTouch
            ? (e) => {
                const data = readDragData(e);
                if (!data) return;
                move(data, null);
              }
            : undefined
        }
      >
        {pool.map((id) => (
          <div
            key={id}
            draggable={!isTouch}
            onDragStart={
              !isTouch ? (e) => setDragData(e, { from: "pool", id }) : undefined
            }
            onClick={
              isTouch
                ? () =>
                    setSelected((s) =>
                      s?.source === "pool" && s.id === id ? null : { source: "pool", id }
                    )
                : undefined
            }
            className={`relative w-12 h-12 md:w-16 md:h-16 rounded border shadow-sm ${
              isTouch ? "cursor-pointer" : "cursor-grab"
            } ${
              selected?.source === "pool" && selected.id === id ? "ring-4 ring-blue-400" : ""
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: bgSize,
              backgroundPosition: getPos(id),
              backgroundRepeat: "no-repeat",
            }}
          >
            <span className="absolute bottom-0.5 right-0.5 text-[10px] md:text-xs font-bold bg-white/70 px-1 rounded">
              {id + 1}
            </span>
          </div>
        ))}
      </div>

      {/* board */}
      <div
        className="grid rounded-2xl overflow-hidden shadow-lg bg-slate-200 w-full max-w-xs md:max-w-md"
        style={{
          gridTemplateColumns: `repeat(${grid}, 1fr)`,
          aspectRatio: "1/1",
          gap: "2px",
        }}
      >
        {placed.map((tile, i) => (
          <div
            key={i}
            className={`relative bg-white border ${
              isTouch && selected?.source === "board" && selected.fromIndex === i
                ? "ring-4 ring-blue-400"
                : ""
            }`}
            onClick={
              isTouch
                ? () => {
                    if (tile === null) {
                      if (selected) move(selected, i); // place from pool or board
                    } else {
                      if (!selected) {
                        move({ from: "board", fromIndex: i, id: tile }, null); // remove
                      } else {
                        setSelected({ source: "board", id: tile, fromIndex: i }); // select board tile
                      }
                    }
                  }
                : undefined
            }
            onDragOver={!isTouch ? (e) => placed[i] === null && e.preventDefault() : undefined}
            onDrop={
              !isTouch
                ? (e) => {
                    const data = readDragData(e);
                    if (!data) return;
                    if (placed[i] === null) move(data, i);
                  }
                : undefined
            }
            style={{
              backgroundImage: tile !== null ? `url(${image})` : "none",
              backgroundSize: bgSize,
              backgroundPosition: tile !== null ? getPos(tile) : "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* ✅ Show grid index always */}
            <span className="absolute top-0.5 left-0.5 text-[10px] md:text-xs font-bold text-gray-500">
              {i + 1}
            </span>

            {/* ✅ Show tile number if placed */}
            {tile !== null && (
              <>
                <span className="absolute bottom-0.5 right-0.5 text-[10px] md:text-xs font-bold bg-white/70 px-1 rounded">
                  {tile + 1}
                </span>
                {!isTouch && (
                  <div
                    className="absolute inset-0 cursor-grab"
                    draggable
                    onDragStart={(e) =>
                      setDragData(e, { from: "board", fromIndex: i, id: tile })
                    }
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Reset button */}
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-3 py-2 text-sm md:px-4 md:py-2 rounded bg-blue-600 text-white shadow hover:bg-blue-700"
        >
          🔄 Reset
        </button>
      </div>

      {won && (
        <div className="text-lg md:text-2xl font-bold text-green-600 mt-2">
          🎉 You made it!
        </div>
      )}
    </div>
  );
}
