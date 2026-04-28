/**
 * Ken Burns cinematic motion presets and transforms.
 */

export interface KenBurnsPreset {
  scaleFrom: number;
  scaleTo: number;
  txFrom: number;
  txTo: number;
  tyFrom: number;
  tyTo: number;
}

/** Predefined cinematic camera-motion presets for background footage. */
export const KEN_BURNS_PRESETS: KenBurnsPreset[] = [
  { scaleFrom: 1.0, scaleTo: 1.15, txFrom: 0, txTo: -3, tyFrom: 0, tyTo: -1 },
  { scaleFrom: 1.15, scaleTo: 1.0, txFrom: 3, txTo: 0, tyFrom: 0, tyTo: 1 },
  { scaleFrom: 1.0, scaleTo: 1.12, txFrom: 2, txTo: -2, tyFrom: 0, tyTo: 0 },
  { scaleFrom: 1.05, scaleTo: 1.15, txFrom: 0, txTo: 0, tyFrom: 1, tyTo: -2 },
  { scaleFrom: 1.0, scaleTo: 1.1, txFrom: -2, txTo: 2, tyFrom: 0, tyTo: 0 },
  { scaleFrom: 1.12, scaleTo: 1.02, txFrom: 0, txTo: 0, tyFrom: -1, tyTo: 1 },
  { scaleFrom: 1.0, scaleTo: 1.15, txFrom: 2, txTo: -1, tyFrom: -1, tyTo: 1 },
  { scaleFrom: 1.1, scaleTo: 1.0, txFrom: -2, txTo: 1, tyFrom: 1, tyTo: -1 },
];

/** Interpolate a Ken Burns transform for a given progress (0-1). */
export function getKenBurnsTransform(
  preset: KenBurnsPreset,
  progress: number
): { scale: number; translateX: number; translateY: number } {
  const eased = 0.5 - 0.5 * Math.cos(Math.PI * progress); // ease-in-out
  const scale = preset.scaleFrom + (preset.scaleTo - preset.scaleFrom) * eased;
  const translateX = preset.txFrom + (preset.txTo - preset.txFrom) * eased;
  const translateY = preset.tyFrom + (preset.tyTo - preset.tyFrom) * eased;
  return { scale, translateX, translateY };
}
