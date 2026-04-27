/**
 * OpenCut -- Remotion-based video production engine.
 *
 * Import the components and types you need:
 *
 *   import { VideoComposition, type TimelineSegment, type VideoConfig } from "./engine";
 */

// Components
export { VideoComposition } from "./Composition";
export { Segment } from "./Segment";
export { FaceBubble } from "./FaceBubble";
export { SubtitleOverlay } from "./SubtitleOverlay";
export { KeywordOverlay } from "./KeywordOverlay";
export { TitleCard } from "./TitleCard";
export { EndCard } from "./EndCard";
export { NotificationBanner } from "./NotificationBanner";
export { InlinePanelOverlay } from "./InlinePanelOverlay";
export { SplitScreenBackground } from "./SplitScreenBackground";
export { AnimatedDiagram } from "./AnimatedDiagram";
export { BackgroundEffects } from "./BackgroundEffects";
export { CrossfadeScene } from "./CrossfadeScene";
export { TypingText } from "./TypingText";

// Types
export type {
  // Core data
  TimelineSegment,
  VideoConfig,
  SegmentType,
  FaceBubblePosition,
  KeywordEntry,
  CalloutEntry,
  NotificationMessage,
  NotificationStyle,
  Word,
  SubtitleSegment,
  // Phase 2 types
  InlinePanel,
  SplitContent,
  DiagramStep,
  // Phase 3 types
  BackgroundEffectConfig,
  BackgroundEffectType,
  // Styles
  SubtitleStyle,
  KeywordStyle,
  CardStyle,
  EndCardStyle,
} from "./types";

// Animation utilities
export {
  generateParticles,
  updateParticlePosition,
  easing,
  waveMotion,
  breathe,
  glitchOffset,
  lerpColor,
  stagger,
  typewriter,
  animatedCounter,
  drawConnectionProgress,
  simulateAudioReactivity,
  springPresets,
  KEN_BURNS_PRESETS,
  getKenBurnsTransform,
} from "./animations";

// Music sync utilities
export {
  getGridBPM as getMusicGridBPM,
  getBeatSyncPlaybackRate as getMusicSyncRate,
  beatsToFrames as musicBeatsToFrames,
  barsToFrames as musicBarsToFrames,
  buildSceneStarts,
  getSyncedMusicVolume,
} from "./MusicSync";

// Utility: compute total output frames from a timeline + config
export function computeTotalFrames(
  timeline: import("./types").TimelineSegment[],
  config: import("./types").VideoConfig,
): number {
  return timeline.reduce((sum, seg) => {
    const outputDurationSec = seg.durationSec / config.playbackRate;
    return sum + Math.round(outputDurationSec * config.fps);
  }, 0);
}
