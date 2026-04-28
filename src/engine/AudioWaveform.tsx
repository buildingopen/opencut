/**
 * Audio waveform visualization overlay.
 *
 * Generates symmetric bars with seeded random heights and animates
 * them using simulateAudioReactivity for a music-reactive look.
 * Supports top, bottom, or center positioning.
 */

import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { simulateAudioReactivity } from "./animation/audio";

interface AudioWaveformProps {
  barCount?: number;
  color?: string;
  height?: number;
  position?: "bottom" | "top" | "center";
  intensity?: number;
}

/** Seeded pseudo-random number generator. */
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
  barCount = 64,
  color = "#4ade80",
  height = 120,
  position = "bottom",
  intensity = 1.0,
}) => {
  const frame = useCurrentFrame();

  const halfCount = Math.ceil(barCount / 2);

  const baseHeights = React.useMemo(() => {
    const rand = seededRandom(42);
    const arr: number[] = [];
    for (let i = 0; i < halfCount; i++) {
      arr.push(0.3 + rand() * 0.7);
    }
    return arr;
  }, [halfCount]);

  // Smooth reactivity by blending consecutive frames
  const raw = simulateAudioReactivity(frame, intensity);
  const lag1 = simulateAudioReactivity(frame - 1, intensity);
  const lag2 = simulateAudioReactivity(frame - 2, intensity);
  const smoothReactivity = raw * 0.5 + lag1 * 0.3 + lag2 * 0.2;

  const alignItems =
    position === "top"
      ? "flex-start"
      : position === "center"
        ? "center"
        : "flex-end";

  const padding =
    position === "top"
      ? "40px 40px 0"
      : position === "bottom"
        ? "0 40px 40px"
        : "0 40px";

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems,
        justifyContent: "center",
        gap: 2,
        padding,
        pointerEvents: "none",
      }}
    >
      {Array.from({ length: barCount }, (_, i) => {
        // Mirror index so bars are symmetric from the center outward
        const mirrorIndex =
          i < halfCount ? i : barCount - 1 - i;
        const base = baseHeights[mirrorIndex] ?? 0.5;

        // Per-bar phase variation for organic movement
        const phase = mirrorIndex * 0.3;
        const barReactivity =
          smoothReactivity *
          (0.8 + Math.sin(frame * 0.1 + phase) * 0.2);

        // Minimum baseline so bars never fully vanish
        const barHeight =
          (0.15 + base * barReactivity * 0.85) * height;

        return (
          <div
            key={i}
            style={{
              flex: 1,
              maxWidth: 10,
              height: Math.max(2, barHeight),
              background: color,
              borderRadius: 4,
              opacity: 0.85,
              flexShrink: 0,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
