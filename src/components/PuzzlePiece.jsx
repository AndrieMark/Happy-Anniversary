import React from "react";

export default function PuzzlePiece({ id, row, col, grid, image, size = 80 }) {
  const knob = size * 0.2;

  // Borders
  const isTop = row === 0;
  const isLeft = col === 0;
  const isRight = col === grid - 1;
  const isBottom = row === grid - 1;

  // Randomize knob direction consistently
  const rand = ((row + col) % 2 === 0 ? 1 : -1);

  let shape = `M0,0 `;

  // Top edge
  if (isTop) {
    shape += `h${size} `;
  } else {
    shape += `h${size / 3} q${knob * rand},-${knob} ${2 * (size / 3)},0 h${size / 3} `;
  }

  // Right edge
  if (isRight) {
    shape += `v${size} `;
  } else {
    shape += `v${size / 3} q${knob},${knob * rand} 0,${2 * (size / 3)} v${size / 3} `;
  }

  // Bottom edge
  if (isBottom) {
    shape += `h-${size} `;
  } else {
    shape += `h-${size / 3} q-${knob * rand},${knob} -${2 * (size / 3)},0 h-${size / 3} `;
  }

  // Left edge
  if (isLeft) {
    shape += `z`;
  } else {
    shape += `v-${size / 3} q-${knob},-${knob * rand} 0,-${2 * (size / 3)} v-${size / 3} z`;
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="block"
    >
      <defs>
        <clipPath id={`clip-${id}`}>
          <path d={shape} />
        </clipPath>
      </defs>
      <image
        xlinkHref={image}   // ✅ use xlinkHref instead of href
        x={-col * size}
        y={-row * size}
        width={grid * size}
        height={grid * size}
        clipPath={`url(#clip-${id})`}
        preserveAspectRatio="xMidYMid slice"
      />
    </svg>
  );
}
