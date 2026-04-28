/**
 * Animation utilities for the OpenCut engine.
 *
 * This file re-exports all animation helpers from domain-specific
 * sub-modules for backward compatibility. Prefer importing directly
 * from `./animation/<domain>` in new code.
 */

export {
  Particle,
  generateParticles,
  updateParticlePosition,
} from "./animation/particles";

export { easing } from "./animation/easing";

export { waveMotion, breathe, glitchOffset } from "./animation/motion";

export { lerpColor } from "./animation/color";

export {
  stagger,
  typewriter,
  animatedCounter,
  drawConnectionProgress,
} from "./animation/timing";

export { simulateAudioReactivity } from "./animation/audio";

export { springPresets } from "./animation/spring";

export {
  KenBurnsPreset,
  KEN_BURNS_PRESETS,
  getKenBurnsTransform,
} from "./animation/kenburns";
