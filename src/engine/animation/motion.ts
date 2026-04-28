/**
 * Continuous motion helpers.
 */

/** Sine-wave motion for "alive" floating elements. */
export function waveMotion(
  frame: number,
  frequency: number = 0.05,
  amplitude: number = 1,
  phase: number = 0
): number {
  return Math.sin(frame * frequency + phase) * amplitude;
}

/** Breathing / pulsing scale effect. */
export function breathe(
  frame: number,
  minScale: number = 0.98,
  maxScale: number = 1.02,
  speed: number = 0.03
): number {
  const t = (Math.sin(frame * speed) + 1) / 2;
  return minScale + t * (maxScale - minScale);
}

/** Random glitch offset for a given frame. */
export function glitchOffset(
  frame: number,
  intensity: number = 3
): { x: number; y: number } {
  const glitchChance = Math.sin(frame * 0.3) > 0.7;
  if (!glitchChance) return { x: 0, y: 0 };
  return {
    x: Math.sin(frame * 1.7) * intensity,
    y: Math.cos(frame * 2.3) * intensity * 0.5,
  };
}
