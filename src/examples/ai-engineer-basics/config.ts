/**
 * AI Engineer Basics video configuration.
 *
 * 8.8-minute facecam recording (1280x720 source), rendered at 1920x1080.
 * Playback speed 1.2x to tighten pacing.
 */
import type { VideoConfig } from "../../engine";

export const AI_ENGINEER_CONFIG: VideoConfig = {
  playbackRate: 1.2,
  fps: 30,
  width: 1920,
  height: 1080,
  crossfadeFrames: 10,
  facecamAsset: "ai-engineer-basics.mov",
  // bgMusicAsset: "bg-music.mp3", // TODO: add once music is selected
};

/** Audio offset correction in seconds (Whisper timestamps vs. actual audio). */
export const AUDIO_OFFSET_SEC = 0.0;
