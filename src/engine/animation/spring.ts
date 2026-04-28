/**
 * Spring configuration presets.
 */

import { type SpringConfig } from "remotion";

/** Preset spring configs for common motion styles. */
export const springPresets = {
  gentle: { damping: 20, stiffness: 100, mass: 1, overshootClamping: false } satisfies SpringConfig,
  snappy: { damping: 12, stiffness: 200, mass: 0.5, overshootClamping: false } satisfies SpringConfig,
  bouncy: { damping: 8, stiffness: 150, mass: 0.8, overshootClamping: false } satisfies SpringConfig,
  slam: { damping: 8, stiffness: 200, mass: 1.2, overshootClamping: false } satisfies SpringConfig,
  overshoot: { damping: 10, stiffness: 150, mass: 0.8, overshootClamping: false } satisfies SpringConfig,
};
