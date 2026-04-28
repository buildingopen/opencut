/**
 * Audio-reactivity simulation utilities.
 */

/**
 * Simulate audio reactivity without actual audio analysis.
 * Returns a 0-1 value that pulses like bass hits.
 */
export function simulateAudioReactivity(
  frame: number,
  intensity: number = 1
): number {
  const bassCycle = frame % 30;
  const bassHit = bassCycle < 5 ? (5 - bassCycle) / 5 : 0;
  const midFreq = Math.sin(frame * 0.15) * 0.3 + 0.3;
  return (bassHit * 0.6 + midFreq * 0.4) * intensity;
}
